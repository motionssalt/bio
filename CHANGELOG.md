# Changelog — MOTIONSALT Portfolio

All notable changes to this project are documented here.

## [1.1.0] — 2026-10-15 (Catalogue Indexing, Video Player Overhaul & Image Fullscreen)

### Fixed & Refined
- **Intelligent Folder-Based Indexing:** Replaced all artificial AI-invented titles with clean, structured sequential index names per folder (`Video Edit #01`, `Motion Graphic #01`, `Graphic Design #01`...). Cleared `config/overrides.json` of hardcoded titles.
- **Three Core Service Folders Enforced:** The sync pipeline now strictly catalogs files only within the three service folders (`VIDEOS`, `MOTION`, `GRAPHICS`). Files directly in the root folder and extraneous folders (e.g. `ChimeraVFX`) are completely excluded.
- **Randomized Showcase Featuring:** Removed static featured flags. The Hero showreel now picks a showcase item dynamically/randomly from across the three service folders on page load, with an interactive **Randomize** button.
- **Video Player Rebuild:** Replaced the cramped, buggy Google Drive preview iframe with a high-performance native HTML5 video player component (`VideoPlayer.tsx`). Fixes the mobile control overlap bug shown in user Chrome screenshots (no colliding buttons, no duplicate seekbars, clean touch-friendly scrub bar, volume, and fullscreen).
- **Image Full Screen Viewer:** Added dedicated Full Screen button to image project cards and modal. Launches an immersive high-res lightbox with zoom controls (100% to 300%), previous/next navigation, and Esc key exit.

## [1.0.0] — 2026-10-15 (Full Portfolio Refurbishment)

### Added
- **Zero-Config Public Google Drive Engine:** Keyless crawler discovering folders and media from root Drive ID `1w2KqAMVrJrHiz4T55FQZaCuYGoFZc5g8` with zero GCP setup required.
- **Automated Media Pipeline:** FFmpeg/FFprobe WebP poster generation and looping muted MP4 preview clips.
- **Upwork TOS Compliance View (`/upwork/` and `#/upwork`):** Complete portfolio showcase strictly stripped of external social handles and messaging links to safeguard pre-contract compliance.
- **Cloudflare Pages Production Target:** Direct upload deployment to `motionssalt-portfolio.pages.dev`.
- **Scheduled CI/CD (`.github/workflows/sync-and-deploy.yml`):** 3-hour cron sync, manual dispatch with force safety override, and keep-alive catalogue commit.
- **Dual-Theme Engine:** High-contrast light and dark modes with pre-render zero-flash script and system preference sync.
- **Accessible Video Lightbox:** Fullscreen modal with Google Drive embedded player, deep linking (`#/work/<id>`), and keyboard navigation (`Esc`, `←`, `→`).
- **Comprehensive Documentation:** `docs/RECON.md`, `docs/ARCHITECTURE.md`, and `docs/OPERATIONS.md`.

### Tagged
- Legacy link-in-bio page preserved permanently at Git tag `v0-linkinbio` on commit `5e41816`.
