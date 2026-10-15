export interface CategoryConfig {
  id: string;
  title: string;
  shortDescription: string;
  folderPatterns: string[];
  icon: string;
}

export interface CatalogItem {
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

export interface Catalog {
  version: string;
  lastSyncedAt: string;
  totalItems: number;
  categories: CategoryConfig[];
  items: CatalogItem[];
}
