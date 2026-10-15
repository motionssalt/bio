# MOTIONSALT Portfolio

[![Sync & Deploy](https://github.com/motionssalt/bio/actions/workflows/sync-and-deploy.yml/badge.svg)](https://github.com/motionssalt/bio/actions/workflows/sync-and-deploy.yml)

A high-velocity, cinematic portfolio for **Victor Jumbo** ([MOTIONSALT](https://motionssalt-portfolio.pages.dev/)), solo motion designer, video editor, and developer based in Nigeria.

The platform is dynamically powered by a **Zero-Config Public Google Drive Synchronization Engine** that automatically detects uploads, downloads assets, extracts metadata, optimizes video previews with FFmpeg, and deploys directly to Cloudflare Pages edge hosting.

---

## 🌐 Live Production Deployments

- **Official Portfolio:** [https://motionssalt-portfolio.pages.dev](https://motionssalt-portfolio.pages.dev)
- **Upwork TOS-Compliant Showcase:** [https://motionssalt-portfolio.pages.dev/#/upwork](https://motionssalt-portfolio.pages.dev/#/upwork)
- **GitHub Pages Fallback:** [https://motionssalt.github.io/bio/](https://motionssalt.github.io/bio/)

---

## ✨ Features & Architecture Highlights

1. **Zero-Config Public Google Drive Synchronization:**
   - No Google Cloud project, OAuth, or API keys required.
   - Crawls the public link-shared Drive folder (`1w2KqAMVrJrHiz4T55FQZaCuYGoFZc5g8`).
   - Automatically maps subfolders (`VIDEOS`, `ChimeraVFX`, `MOTION`, `GRAPHICS`) into three core client services: **Video Editing, Motion Graphics, Graphic Design**.
   - Generates WebP posters and short looping preview clips (3–5s H.264 MP4) via FFmpeg.
   - Built-in safety limits to prevent deploying empty sites if Drive markup fluctuates.

2. **Upwork Compliance (`/upwork/` / `#/upwork`):**
   - Built strictly according to Upwork's Pre-Contract Communication Policies.
   - Displays complete project reels, roles, and descriptions.
   - Omits all off-platform handles, Telegram, phone numbers, and emails.
   - Contains a direct "Hire Victor on Upwork" action.

3. **Dual Theme Engine & Kinetic Design:**
   - Seamless Light / Dark / System modes with zero flash of unstyled content (`data-theme` pre-paint script).
   - Space Grotesk 700 display typography + Inter body.
   - Signature easing `--ease-premium: cubic-bezier(0.16, 1, 0.3, 1)`.
   - Accessible video lightbox with deep linking (`#/work/<id>`), keyboard controls (`Esc`, `←`, `→`), and Google Drive embedded player.

---

## 🛠️ Tech Stack

- **Runtime & Build:** React 19, TypeScript, Vite, Tailwind CSS
- **Media Engine:** FFmpeg, FFprobe, Bun
- **Hosting:** Cloudflare Pages (Direct Upload) via GitHub Actions CI/CD
- **Automation:** Scheduled GitHub Actions (3-hour cron + manual trigger)

---

## 📂 Project Organization

```text
├── .github/workflows/
│   └── sync-and-deploy.yml      # Automated 3-hour cron + push + dispatch CI/CD
├── config/
│   ├── categories.json          # Google Drive subfolder matching rules
│   └── overrides.json           # Rich metadata, custom titles, roles & #featured tags
├── docs/
│   ├── ARCHITECTURE.md          # Complete pipeline and technical specification
│   ├── OPERATIONS.md            # User manual for uploading work from phone/Termux
│   └── RECON.md                 # Reconnaissance report and verified findings
├── public/
│   ├── media/                   # Locally cached WebP posters & MP4 preview clips
│   ├── catalog.json             # Generated stable catalogue schema
│   ├── _headers                 # Cloudflare cache & security headers
│   └── _redirects               # SPA routing fallback rules
├── scripts/
│   └── sync-drive.ts            # Keyless Google Drive parser and asset pipeline
├── src/
│   ├── components/              # UI components (Hero, Grid, Lightbox, Services, etc.)
│   ├── data/catalog.json        # Bundled catalogue fallback
│   └── types/catalog.ts         # TypeScript schema definitions
├── BUILD_STATE.json             # Resumable state tracker
└── README.md
```

---

## ⏱️ Sync Schedule & Latency

- **Automated Sync:** Runs every **3 hours** via GitHub Actions.
- **Immediate Update:** You can trigger a manual sync anytime via the GitHub Actions tab (`Sync Drive Catalogue & Deploy`) by clicking **Run workflow**. Updates deploy to Cloudflare Pages in under 2 minutes.

---

## 📄 License & Credits

Designed and maintained by **Victor Jumbo** (MOTIONSALT).  
All work showcased belongs to Victor Jumbo and respective commercial clients.
