# MOTIONSALT Portfolio — Operations & Content Manual

This guide explains how to manage, add, update, and showcase your work directly from your phone.

---

## 📁 The Three Service Folders (Google Drive)

Your portfolio operates exclusively on the **three core creative service folders**:

| Service | Google Drive Folder | Intelligent Index Name Generated |
| :--- | :--- | :--- |
| **Video Editing** | **`VIDEOS`** | `Video Edit #01`, `Video Edit #02`... |
| **Motion Graphics** | **`MOTION`** | `Motion Graphic #01`, `Motion Graphic #02`... |
| **Graphic Design** | **`GRAPHICS`** | `Graphic Design #01`, `Graphic Design #02`... |

### ⚠️ Strict Invariant Rules:
1. **Root Folder Exclusion:** Anything placed directly in the Google Drive root folder is ignored and will **never** appear on the site. Files must be placed into one of the three service folders above.
2. **Other Folders Excluded:** Any folders outside the three services (e.g. `ChimeraVFX` or unrelated project dumps) are automatically skipped.
3. **No Artificial AI Names:** All files receive clean, sequential index names per folder (e.g. `Motion Graphic #01`, `Graphic Design #01`) instead of arbitrary AI-invented titles.
4. **Randomized Featuring:** No file is statically locked as "featured". Instead, the Hero showreel features work **randomly from the three folders** on every visit or refresh, and visitors can click **Randomize** to cycle through your catalogue.

---

## 📱 Adding New Work (From Your Android Phone)

Because the portfolio is connected to your public Google Drive, **you never need to edit code to update your portfolio**:

1. Open your Google Drive app or phone browser to the root folder:  
   `https://drive.google.com/drive/folders/1w2KqAMVrJrHiz4T55FQZaCuYGoFZc5g8`
2. Open either **`VIDEOS`**, **`MOTION`**, or **`GRAPHICS`**.
3. Upload your video (`.mp4`, `.mov`) or image (`.png`, `.jpg`, `.webp`).
4. The system automatically indexes the file, extracts resolution and duration, generates a lightweight WebP poster and fast MP4 preview clip, and updates your site!

---

## 🎬 Video Player Controls

The video player has been rebuilt from scratch as a high-performance native HTML5 player:
- **Zero Control Collisions:** Clean custom controls designed specifically for mobile touch screens (no overlapping Google Drive preview bars or cut-off buttons).
- **Time Scrubber:** Smooth scrub bar showing current time and total video length (e.g. `0:04 / 0:40`).
- **Volume & Fullscreen:** Touch-friendly mute/volume slider and instant fullscreen toggle.
- **Drive Embed Toggle:** If you ever wish to view the original Google Drive embed, a one-tap button switches views smoothly.

---

## 🖼️ Image Full Screen Viewer

Every graphic design piece now features a dedicated **Full Screen** button:
- Tap **Full Screen** on any image card or inside the modal to open the full-viewport lightbox.
- Includes **Zoom In / Zoom Out** (100% to 300%) with tap-to-zoom.
- Includes **Previous / Next** arrows to browse through the entire graphic design catalogue in fullscreen.
- Press **Esc** or tap the exit button to return.

---

## ⚡ Sync Schedule & Forcing an Immediate Update

### Automatic Schedule:
The GitHub Actions pipeline runs automatically **every 3 hours** in the background.

### Need it Live Immediately? (Manual Force Sync):
1. On your phone browser, open GitHub: [https://github.com/motionssalt/bio/actions](https://github.com/motionssalt/bio/actions)
2. Tap on the workflow: **Sync Drive Catalogue & Deploy to Cloudflare Pages**.
3. Tap **Run workflow**.
4. (Optional) Check the **Force catalogue sync** box if you recently deleted files and want to override safety limits.
5. Tap the green **Run workflow** button.  
Your portfolio will sync, process new video previews with FFmpeg, and deploy live to Cloudflare Pages in ~2 minutes!

---

## 💼 Using the Upwork Safe Link

When submitting proposals on Upwork or adding a portfolio link to your Upwork profile:
- **Always use:** [https://motionssalt-portfolio.pages.dev/#/upwork](https://motionssalt-portfolio.pages.dev/#/upwork)
- **Do NOT use:** your social media links or main page with Telegram/social links in pre-contract Upwork messages.
- The `/upwork` page presents your entire work catalogue without any off-platform contact details, keeping your Upwork account 100% policy-compliant.
