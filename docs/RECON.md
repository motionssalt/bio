# Reconnaissance Report — MOTIONSALT Portfolio

**Date:** 2026-10-15  
**Repo:** `motionssalt/bio`  
**Brand:** MOTIONSALT (Victor, Solo Motion Designer & Developer, Nigeria)

---

## 1. VERIFIED FACTS

### A. GitHub Repository & Environment
- **Account:** `motionssalt`
- **Repository:** `motionssalt/bio` (Public)
- **Default Branch:** `main`
- **Initial Commits:**
  - `5e41816`: Add files via upload (`image_ad6e6f.png`, `index.html`)
  - `f572e7b`: Update index.html
  - `eebd31e`: Create index.html
- **Tag Created:** `v0-linkinbio` created on commit `5e41816f6ccd2e4cb9513e474f3ee482c8291bbb` to preserve legacy link-in-bio page.
- **GitHub Pages:** Active at `https://motionssalt.github.io/bio/` (built).
- **GitHub Actions Secrets Configured:**
  - `CLOUDFLARE_API_TOKEN`: Encrypted via Libsodium sealed box and stored.
  - `CLOUDFLARE_ACCOUNT_ID`: Encrypted via Libsodium sealed box and stored.
- **Local Tooling Verified:** Node v22.23.3, Bun v1.4.2, Python 3.10.12, ffmpeg v4.4.2.

### B. Cloudflare Pages Project
- **Account ID:** `[REDACTED_ACCOUNT_ID]` (verified active with 3 existing projects).
- **Pages Project Created:** `motionssalt-portfolio` created via Cloudflare API v4.
- **Live URL Target:** `https://motionssalt-portfolio.pages.dev` (with fallback to `https://motionssalt.github.io/bio/`).

### C. Public Google Drive Catalogue Tree
- **Root Folder ID:** `1w2KqAMVrJrHiz4T55FQZaCuYGoFZc5g8` (Title: "Edits – Google Drive", Link-shared, public access verified without sign-in).
- **Subfolder Layout Discovered:**
  1. `ChimeraVFX` (`1OHjvjY-Z0tUgTrELfdHfpsSQVqjCY2Re`) — 4 items (PNGs/visual effects graphics).
  2. `GRAPHICS` (`1Er-agNMd4jHgT3naehLFGV4oqsioXCwE`) — 10 items (PNGs/JPEGs graphic designs & promos).
  3. `MOTION` (`12JjZMc_IEmGOtAq7YdEx3-jwu0-lapzT`) — 2 items (`Investcore.mp4`, `Simple quick edit.mp4`).
  4. `VIDEOS` (`1mB5OyGcb-jgSVa0K6vlf96jq7nZaHgXg`) — 0 items currently (staging folder for video uploads).
- **Public Fetching Mechanics Verified:**
  - Embedded folder listing via `https://drive.google.com/embeddedfolderview?id=<ID>#list` works keylessly with 200 OK and HTML entry markers.
  - Direct thumbnail generation via `https://drive.google.com/thumbnail?id=<ID>&sz=w1000` returns valid JPEG images directly.
  - File binary streaming via `https://drive.google.com/uc?export=download&id=<ID>` returns direct binary stream (tested with `Investcore.mp4` returning 200 OK `video/mp4`).

### D. Verified Social Handles (Do NOT alter)
- **YouTube:** `https://www.youtube.com/@motionssalt`
- **TikTok:** `https://tiktok.com/@motionssalt`
- **Instagram:** `https://instagram.com/motionssalt/`
- **X (Twitter):** `https://x.com/motionssalt`
- **Telegram:** `https://t.me/motionssalt`

---

## 2. ASSUMPTIONS & DESIGN DECISIONS

1. **Category Mapping:**
   - `MOTION` maps to **Motion Graphics**.
   - `VIDEOS` + `ChimeraVFX` map to **Video Editing / VFX / Anime Edits**.
   - `GRAPHICS` maps to **Graphic Design**.
2. **Upwork Route:** `/upwork/` is designed for strict Upwork Terms of Service compliance, omitting all direct social media handles, phone, and off-platform messaging. Canonical URL on `/upwork/` points to itself with `noindex, nofollow` meta tag to prevent search engine indexing while allowing direct client proposal viewing.
3. **Typography & Styling:** Space Grotesk 700 + Inter, enhanced with `--ease-premium: cubic-bezier(0.16, 1, 0.3, 1)` and high-contrast dark/light mode with zero flash of unstyled content (`data-theme` pre-render script).
