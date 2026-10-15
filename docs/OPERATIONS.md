# MOTIONSALT Portfolio — Operations & Content Manual

This guide explains how to manage, add, update, and feature work in your portfolio directly from your phone.

---

## 📱 Adding New Work (From Your Android Phone)

Because the portfolio is connected to your public Google Drive folder, **you never need to edit code to update your portfolio**.

### Step 1: Open Google Drive on Your Phone
Open your Google Drive app or web browser and navigate to the root folder:  
`https://drive.google.com/drive/folders/1w2KqAMVrJrHiz4T55FQZaCuYGoFZc5g8`

### Step 2: Choose the Correct Subfolder
Upload your file into the folder matching the service:
- **`VIDEOS`** or **`ChimeraVFX`** → Appears under **Video Editing** (AMVs, commercial cuts, VFX).
- **`MOTION`** → Appears under **Motion Graphics** (kinetic typography, logo animations, product motion).
- **`GRAPHICS`** → Appears under **Graphic Design** (posters, YouTube thumbnails, album covers).

### Step 3: Filename Conventions for Automatic Title & Feature
- **Clean Titles:** Name your file cleanly before uploading (e.g. `Cyberpunk_Reel.mp4` will automatically format as `Cyberpunk Reel`).
- **Feature on Hero/Grid:** Add `#featured` or `[featured]` to the filename (e.g. `Investcore_Commercial_[featured].mp4`) to feature the project at the top of your portfolio!

---

## ⚡ Sync Schedule & Forcing an Immediate Update

### Automatic Schedule:
The GitHub Actions pipeline runs automatically **every 3 hours** in the background. Once you upload a file, it will appear on your live site on the next scheduled run.

### Need it Live Immediately? (Manual Force Sync):
1. On your phone browser, open GitHub: [https://github.com/motionssalt/bio/actions](https://github.com/motionssalt/bio/actions)
2. Tap on the workflow: **Sync Drive Catalogue & Deploy to Cloudflare Pages**.
3. Tap **Run workflow**.
4. (Optional) Check the **Force catalogue sync** box if you recently deleted files and want to override safety limits.
5. Tap the green **Run workflow** button.  
Your portfolio will sync, process new video previews with FFmpeg, and deploy live to Cloudflare Pages in ~2 minutes!

---

## 🛠️ Advanced Customization (`config/overrides.json`)

If you want custom client descriptions, exact role credits, or specific tool badges for any project:
1. Open `config/overrides.json` in GitHub or Termux.
2. Add an entry using the Google Drive File ID:
```json
"1mTYmpu3wVrnMQxccVtiCDmVxPDdDgQUO": {
  "title": "Investcore Commercial Motion Showcase",
  "category": "motion-graphics",
  "featured": true,
  "role": "Lead Motion Designer",
  "description": "High-energy commercial motion piece highlighting dynamic data visualization and 3D kinetic typography.",
  "tools": ["After Effects", "Illustrator"]
}
```
3. Commit the change. The site will immediately deploy your changes!

---

## 💼 Using the Upwork Safe Link

When submitting proposals on Upwork or adding a portfolio link to your Upwork profile:
- **Always use:** [https://motionssalt-portfolio.pages.dev/#/upwork](https://motionssalt-portfolio.pages.dev/#/upwork)
- **Do NOT use:** your social media links or main page with Telegram/social links in pre-contract Upwork messages.
- The `/upwork` page is designed to protect your account by presenting your entire work catalogue without any off-platform contact details.
