# Changelog — MOTIONSALT Portfolio

All notable changes to this project are documented here.

## [1.0.0] — 2026-10-15 (Full Portfolio Refurbishment)

### Added
- **Zero-Config Public Google Drive Engine:** Keyless crawler discovering folders and media from root Drive ID `1w2KqAMVrJrHiz4T55FQZaCuYGoFZc5g8` with zero GCP setup required.
- **Automated Media Pipeline:** FFmpeg/FFprobe WebP poster generation and 4-second looping muted MP4 preview clips.
- **Upwork TOS Compliance View (`/upwork/` and `#/upwork`):** Complete portfolio showcase strictly stripped of external social handles and messaging links to safeguard pre-contract compliance.
- **Cloudflare Pages Production Target:** Direct upload deployment to `motionssalt-portfolio.pages.dev`.
- **Scheduled CI/CD (`.github/workflows/sync-and-deploy.yml`):** 3-hour cron sync, manual dispatch with force safety override, and keep-alive catalogue commit.
- **Dual-Theme Engine:** High-contrast light and dark modes with pre-render zero-flash script and system preference sync.
- **Accessible Video Lightbox:** Fullscreen modal with Google Drive embedded player, deep linking (`#/work/<id>`), and keyboard navigation (`Esc`, `←`, `→`).
- **Comprehensive Documentation:** `docs/RECON.md`, `docs/ARCHITECTURE.md`, and `docs/OPERATIONS.md`.

### Tagged
- Legacy link-in-bio page preserved permanently at Git tag `v0-linkinbio` on commit `5e41816`.
