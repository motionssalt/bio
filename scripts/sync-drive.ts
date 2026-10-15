import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ROOT_FOLDER_ID = '1w2KqAMVrJrHiz4T55FQZaCuYGoFZc5g8';
const MEDIA_DIR = path.resolve('public/media');
const DATA_DIR = path.resolve('src/data');
const CATALOG_PATH_PUBLIC = path.resolve('public/catalog.json');
const CATALOG_PATH_SRC = path.resolve('src/data/catalog.json');
const CATEGORIES_PATH = path.resolve('config/categories.json');
const OVERRIDES_PATH = path.resolve('config/overrides.json');

interface CategoryConfig {
  id: string;
  title: string;
  prefix: string;
  shortDescription: string;
  folderPatterns: string[];
  icon: string;
}

interface CatalogItem {
  id: string;
  title: string;
  category: string;
  type: 'video' | 'motion' | 'image' | 'other';
  driveUrl: string;
  embedUrl: string;
  downloadUrl: string | null;
  downloadAllowed: boolean;
  poster: string;
  previewClip: string | null;
  width: number;
  height: number;
  durationSec: number | null;
  bytes: number | null;
  modifiedTime: string;
  description: string;
  role: string;
  featured: boolean;
  tools: string[];
}

interface Catalog {
  version: string;
  lastSyncedAt: string;
  totalItems: number;
  categories: CategoryConfig[];
  items: CatalogItem[];
}

async function fetchWithRetry(url: string, retries = 3, delay = 1000): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      });
      if (res.status === 429 || res.status >= 500) {
        throw new Error(`HTTP ${res.status}`);
      }
      return await res.text();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, delay * Math.pow(2, i)));
    }
  }
  throw new Error('Exceeded retries');
}

async function downloadBinary(url: string, destPath: string, maxSize = 80 * 1024 * 1024): Promise<boolean> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    if (!res.ok) return false;
    const arrayBuf = await res.arrayBuffer();
    if (arrayBuf.byteLength > maxSize) {
      console.warn(`File exceeds size limit: ${arrayBuf.byteLength} > ${maxSize}`);
      return false;
    }
    fs.writeFileSync(destPath, Buffer.from(arrayBuf));
    return true;
  } catch (err) {
    console.warn(`Error downloading ${url}:`, err);
    return false;
  }
}

async function parseFolder(folderId: string): Promise<Array<{ id: string; name: string }>> {
  const url = `https://drive.google.com/embeddedfolderview?id=${folderId}#list`;
  const html = await fetchWithRetry(url);
  const items: Array<{ id: string; name: string }> = [];

  // Match items: id="entry-ID" ... class="flip-entry-title">NAME<
  const regex = /id=["']entry-([^"']+)["'][^>]*>[\s\S]*?class=["']flip-entry-title["'][^>]*>([^<]+)</g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    items.push({
      id: match[1],
      name: match[2].trim()
    });
  }
  return items;
}

async function sync() {
  console.log('🔄 Starting Zero-Config Google Drive Sync...');
  const force = process.argv.includes('--force');

  if (!fs.existsSync(MEDIA_DIR)) fs.mkdirSync(MEDIA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  const categories: CategoryConfig[] = JSON.parse(fs.readFileSync(CATEGORIES_PATH, 'utf-8'));
  let overrides: { items: Record<string, Partial<CatalogItem>> } = { items: {} };
  if (fs.existsSync(OVERRIDES_PATH)) {
    try {
      overrides = JSON.parse(fs.readFileSync(OVERRIDES_PATH, 'utf-8'));
    } catch (e) {
      console.error('Warning: could not parse overrides.json', e);
    }
  }

  // 1. Read root folder to discover subfolders
  console.log(`📡 Inspecting root folder ${ROOT_FOLDER_ID}...`);
  const rootEntries = await parseFolder(ROOT_FOLDER_ID);
  console.log(
    `📁 Found ${rootEntries.length} root entries:`,
    rootEntries.map((e) => e.name).join(', ')
  );

  const allItems: CatalogItem[] = [];

  // Process ONLY folders that explicitly match one of the three configured categories
  for (const cat of categories) {
    console.log(`\n🔍 Looking for folder corresponding to category "${cat.title}" (${cat.id})...`);
    
    // Find matching folder in rootEntries
    const matchedFolder = rootEntries.find((entry) => {
      const entryName = entry.name.trim().toLowerCase();
      return cat.folderPatterns.some((pattern) => entryName === pattern.toLowerCase() || entryName.includes(pattern.toLowerCase()));
    });

    if (!matchedFolder) {
      console.log(`  ℹ️ No folder found matching patterns for "${cat.title}". Skipping category.`);
      continue;
    }

    console.log(`  📂 Found matching folder "${matchedFolder.name}" (${matchedFolder.id}) for category "${cat.title}"`);
    const folderFiles = await parseFolder(matchedFolder.id);
    console.log(`  📄 Found ${folderFiles.length} file(s) in "${matchedFolder.name}"`);

    // Sort files deterministically (e.g. by filename or original order)
    folderFiles.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

    let indexInFolder = 1;
    for (const file of folderFiles) {
      const ext = path.extname(file.name).toLowerCase();
      const isVideo = ['.mp4', '.mov', '.webm', '.mkv'].includes(ext);
      const isImage = ['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext);

      // Skip non-media files safely
      if (!isVideo && !isImage) {
        console.log(`  ⚠️ Skipping unsupported file type (${ext}): ${file.name}`);
        continue;
      }

      const fileType = isVideo ? (cat.id === 'motion-graphics' ? 'motion' : 'video') : (isImage ? 'image' : 'other');

      // Intelligent index naming: e.g. "Graphic Design #01", "Motion Graphic #01", "Video Edit #01"
      const formattedIndex = String(indexInFolder).padStart(2, '0');
      const intelligentTitle = `${cat.prefix || cat.title} #${formattedIndex}`;
      indexInFolder++;

      const override = overrides.items[file.id] || {};
      const title = override.title || intelligentTitle;
      const category = override.category || cat.id;
      // Statically, no item is featured; featuring is handled dynamically/randomly in the UI
      const featured = false;

      // Professional, clean roles and descriptions
      const defaultRole =
        category === 'video-editing'
          ? 'Video Editor & Colorist'
          : category === 'motion-graphics'
          ? 'Motion Designer'
          : 'Graphic Designer';

      const defaultDescription =
        category === 'video-editing'
          ? 'Cinematic edit, kinetic pacing, and visual storytelling crafted by Victor (MOTIONSALT).'
          : category === 'motion-graphics'
          ? 'Kinetic typography, dynamic animation, and visual motion crafted by Victor (MOTIONSALT).'
          : 'Graphic design artwork, composition, and visual aesthetic crafted by Victor (MOTIONSALT).';

      const defaultTools =
        category === 'video-editing'
          ? ['Premiere Pro', 'After Effects']
          : category === 'motion-graphics'
          ? ['After Effects', 'Illustrator']
          : ['Photoshop'];

      const role = override.role || defaultRole;
      const description = override.description || defaultDescription;
      const tools = override.tools || defaultTools;

      // Derived assets paths
      const posterLocalRel = `/media/${file.id}_poster.webp`;
      const posterLocalPath = path.join(MEDIA_DIR, `${file.id}_poster.webp`);
      const previewLocalRel = isVideo ? `/media/${file.id}_preview.mp4` : null;
      const previewLocalPath = isVideo ? path.join(MEDIA_DIR, `${file.id}_preview.mp4`) : null;

      // 1. Download and optimize poster
      if (!fs.existsSync(posterLocalPath)) {
        const tempThumb = path.join(MEDIA_DIR, `${file.id}_temp_thumb.jpg`);
        const thumbUrl = `https://drive.google.com/thumbnail?id=${file.id}&sz=w1200`;
        const downloaded = await downloadBinary(thumbUrl, tempThumb);
        if (downloaded) {
          try {
            execSync(`ffmpeg -y -i "${tempThumb}" -vf "scale='min(1280,iw)':-2" -q:v 80 "${posterLocalPath}" 2>/dev/null`);
            if (fs.existsSync(tempThumb)) fs.unlinkSync(tempThumb);
          } catch {
            fs.renameSync(tempThumb, posterLocalPath.replace('.webp', '.jpg'));
          }
        }
      }

      let width = 1920;
      let height = 1080;
      let durationSec: number | null = null;
      let bytes: number | null = null;

      // 2. If video, generate preview clip
      if (isVideo && previewLocalPath && !fs.existsSync(previewLocalPath)) {
        console.log(`  🎬 Generating preview clip for video: ${title}`);
        const tempVideo = path.join(MEDIA_DIR, `${file.id}_raw${ext}`);
        const videoDownloadUrl = `https://drive.google.com/uc?export=download&id=${file.id}`;
        const downloaded = await downloadBinary(videoDownloadUrl, tempVideo, 80 * 1024 * 1024);
        if (downloaded) {
          try {
            const probeOut = execSync(
              `ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration:format=size -of json "${tempVideo}"`
            ).toString();
            const probeData = JSON.parse(probeOut);
            if (probeData.streams?.[0]) {
              width = probeData.streams[0].width || 1920;
              height = probeData.streams[0].height || 1080;
              durationSec = parseFloat(probeData.streams[0].duration || '0') || null;
            }
            if (probeData.format?.size) {
              bytes = parseInt(probeData.format.size, 10);
            }

            // Encode high-quality fast-loading preview clip
            execSync(
              `ffmpeg -y -ss 00:00:00 -t 6 -i "${tempVideo}" -vf "scale=-2:'min(720,ih)'" -an -c:v libx264 -preset veryfast -crf 26 -movflags +faststart "${previewLocalPath}" 2>/dev/null`
            );
            if (fs.existsSync(tempVideo)) fs.unlinkSync(tempVideo);
          } catch (err) {
            console.warn(`Could not transcode preview for ${file.id}:`, err);
            if (fs.existsSync(tempVideo)) fs.unlinkSync(tempVideo);
          }
        }
      } else if (fs.existsSync(posterLocalPath)) {
        try {
          const probeOut = execSync(
            `ffprobe -v error -select_streams v:0 -show_entries stream=width,height:format=size -of json "${posterLocalPath}"`
          ).toString();
          const probeData = JSON.parse(probeOut);
          if (probeData.streams?.[0]) {
            width = probeData.streams[0].width || 1200;
            height = probeData.streams[0].height || 1200;
          }
          if (probeData.format?.size) {
            bytes = parseInt(probeData.format.size, 10);
          }
        } catch {
          // ignore
        }
      }

      const item: CatalogItem = {
        id: file.id,
        title,
        category,
        type: fileType,
        driveUrl: `https://drive.google.com/file/d/${file.id}/view`,
        embedUrl: `https://drive.google.com/file/d/${file.id}/preview`,
        downloadUrl: `https://drive.google.com/uc?export=download&id=${file.id}`,
        downloadAllowed: true,
        poster: fs.existsSync(posterLocalPath) ? posterLocalRel : `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
        previewClip: fs.existsSync(previewLocalPath || '') ? previewLocalRel : null,
        width,
        height,
        durationSec,
        bytes,
        modifiedTime: new Date().toISOString(),
        description,
        role,
        featured,
        tools
      };

      allItems.push(item);
    }
  }

  // Safety check
  let previousCatalog: Catalog | null = null;
  if (fs.existsSync(CATALOG_PATH_SRC)) {
    try {
      previousCatalog = JSON.parse(fs.readFileSync(CATALOG_PATH_SRC, 'utf-8'));
    } catch {
      // ignore
    }
  }

  if (allItems.length === 0 && !force) {
    if (previousCatalog && previousCatalog.items.length > 0) {
      console.error('⚠️ SAFETY CHECK TRIGGERED: sync returned 0 items. Keeping previous catalog!');
      return;
    }
    throw new Error('Sync failed: 0 items returned and no previous catalog exists.');
  }

  const catalog: Catalog = {
    version: '1.0.0',
    lastSyncedAt: new Date().toISOString(),
    totalItems: allItems.length,
    categories,
    items: allItems
  };

  fs.writeFileSync(CATALOG_PATH_PUBLIC, JSON.stringify(catalog, null, 2));
  fs.writeFileSync(CATALOG_PATH_SRC, JSON.stringify(catalog, null, 2));

  console.log(`\n✅ Sync complete! Generated catalogue with ${allItems.length} verified items from the 3 service folders.`);
  for (const cat of categories) {
    console.log(`  - ${cat.title}: ${allItems.filter((i) => i.category === cat.id).length}`);
  }
}

sync().catch((err) => {
  console.error('Fatal sync error:', err);
  process.exit(1);
});
