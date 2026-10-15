# MOTIONSALT Portfolio — Architecture Specification

## 1. System Overview

```text
[ Google Drive Public Folder ] (Root: 1w2KqAMVrJrHiz4T55FQZaCuYGoFZc5g8)
               │
               ▼
[ GitHub Actions Runner ] (Cron every 3h / Manual Dispatch / Push)
   ├── 1. Discover subfolders (embeddedfolderview #list)
   ├── 2. Map folders to categories via config/categories.json
   ├── 3. Download thumbnails & derive WebP posters (scale min 1280px)
   ├── 4. Download video snippets & generate 4-sec looping MP4 previews (FFmpeg)
   ├── 5. Extract dimensions, duration & file sizes (FFprobe)
   ├── 6. Apply overrides & title normalization from config/overrides.json
   ├── 7. Run Safety Invariants (prevents empty deployment)
   └── 8. Build Vite bundle into dist/
               │
               ▼
[ Cloudflare Pages Edge Deployment ]
   ├── Direct upload to motionssalt-portfolio.pages.dev
   ├── Caching policy (_headers: assets 1y, media 7d, catalog 5m)
   └── SPA fallback (_redirects)
```

## 2. Zero-Config Public Drive Discovery Engine

### Principles:
1. **Zero Setup for User:** The portfolio owner works solely from an Android phone (Termux/browser) and does not need to configure GCP projects, service accounts, or OAuth keys.
2. **Resilience & Parsing:**
   - The sync crawler requests `https://drive.google.com/embeddedfolderview?id=<ID>#list` with standard browser headers.
   - Files are parsed using stable regex extracting `id="entry-ID"` and `class="flip-entry-title"`.
   - Google Drive thumbnail links (`https://drive.google.com/thumbnail?id=<ID>&sz=w1200`) provide base poster images.
   - For links over the download threshold, the engine gracefully falls back to the poster without failing the pipeline.
3. **Safety Limits:**
   - If the crawler finds 0 items or drops more than 50% of known catalog items, it rejects the new batch, preserves the existing `src/data/catalog.json`, and emits an error in the CI log unless the `--force` flag is specified.

## 3. Upwork Compliance Architecture

Upwork's Terms of Service strictly forbid pre-contract communication outside of Upwork. To safeguard Victor's account:
- `/upwork/` and `#/upwork` load the dedicated `UpworkView` component.
- The view isolates the work showcase while completely stripping out Telegram, YouTube, Instagram, X, TikTok, email, phone numbers, and WhatsApp.
- It includes a direct button to Victor's Upwork profile and clearly notes on-platform compliance.
- `robots.txt` disallows `/upwork/` to prevent external search engines from indexing the client proposal link.

## 4. Dual-Theme Performance Design

- Pure CSS variables defined in `:root` and `[data-theme="dark"]`.
- Inlined `<script>` in `<head>` queries `localStorage` and `matchMedia('(prefers-color-scheme: dark)')` before DOM painting, preventing theme flicker (FOUC).
- Dynamic synchronization with `<meta name="theme-color">` for mobile browser chrome.
