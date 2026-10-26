# CodeMitra – Free, Privacy-First QR Code Generator

> **"Create QR Codes. Share Anything."**  
> A high-precision, privacy-first QR code engine built for shop owners, students, cafes, restaurants, schools, and developers. Runs 100% locally in the browser with zero external server dependencies, no tracking, and no paywalls.

---

## 🌟 Key Features

### 1. 100% Client-Side Privacy
- All QR code math, SVG vector generation, image processing, and CSV batch processing run strictly inside the user's web browser using JavaScript and HTML5 Canvas.
- **Zero data transmission**: Wi-Fi passwords, contact addresses, and imported spreadsheets are never sent across the internet.
- No analytics trackers, no tracking cookies, and no database required.

### 2. Supported QR Content Types
- **Website URL**: Protocol helper (`https://` / `http://`), real-time destination preview, and strict validation.
- **Plain Text**: Unicode & multi-line support with real-time character counter.
- **Wi-Fi Network**: WPA/WPA2/WPA3, WEP, and Open security; hidden network flag; standard ZXing character escaping (`\`, `;`, `,`, `:`, `"`); password show/hide toggle; and scanning privacy warning.
- **Contact Card (vCard 3.0)**: Name, Organization, Job Title, Phone, Mobile, Email, Website, Postal Address, and Notes.
- **Phone Number**: Direct `tel:` links formatted for mobile dialers.
- **Email Address**: `mailto:` with optional pre-filled Subject and Message Body.
- **SMS Text**: `sms:` with optional pre-filled SMS message text.
- **Business Profile**: Dual-mode (structured vCard or plain-text summary) with clear notice that codes encode data directly without third-party hosting dependencies.

### 3. QR Customization Studio
- **Curated Color Presets**: Classic Black, Midnight Navy, Royal Indigo, Forest Emerald, High Contrast (Yellow on Black), and Crimson Burgundy.
- **Live WCAG 2.2 Contrast Evaluator**: Calculates foreground-to-background contrast ratio and warns if contrast is inadequate (< 4.5:1).
- **Dot Patterns**: Square, Dots, Rounded, Classy, Classy Rounded, Extra Rounded.
- **Corner Eye Shapes**: Square, Rounded, Dot/Circle.
- **Center Logo Overlay**:
  - Upload custom PNG, JPG, WebP, or SVG (< 3MB).
  - Quick preset icons (Web Link, Wi-Fi, Store/Menu, Contact Phone, Star, Nepal Flag Emblem).
  - Configurable logo size slider.
  - Automatic error correction level elevation to High (H) for maximum scan recovery.
- **Export Formats & Print Resolutions**:
  - High-Resolution PNG (512px, 1024px, 2048px for print).
  - Clean Vector SVG (sanitized, infinitely scalable for vinyl signs, table tents, and banners).
  - One-click copy image to clipboard.
  - One-click restore scan-safe defaults.

### 4. Bulk CSV-to-QR Generator
- Drag-and-drop CSV importer supporting UTF-8, quotes, and commas inside fields.
- Column selector for Content and optional Filenames.
- Sample CSV template download (`codemitra-bulk-sample.csv`).
- Interactive row selection table with live validation indicators.
- Non-blocking batch generation with responsive progress bar (% and item count).
- Packaged `.zip` download with collision-free sanitized filenames and an audit `manifest.json`.

---

## 🚀 Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/codemitra.git
cd codemitra

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 📦 Production Build

```bash
# Validate TypeScript and compile production bundle
npm run lint
npm run build
```

The optimized static production assets will be generated in the `dist/` directory.

---

## 🌐 Free Static Deployment

Because CodeMitra has no backend server or database requirements, it can be deployed to any static hosting provider's free tier:

### 1. Netlify (Recommended)

CodeMitra is pre-configured with `netlify.toml`, `.nvmrc`, and `public/_redirects`.

#### Option A: Connect via Git (Automatic Builds)
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Log into [Netlify](https://app.netlify.com) and click **"Add new site"** > **"Import an existing project"**.
3. Select your repository. Netlify automatically detects `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node.js version**: `20` (configured via `.nvmrc`)
4. Click **"Deploy site"**. Your site goes live in seconds!

#### Option B: Netlify Drop (Manual Drag & Drop)
1. Run `npm run build` in your terminal.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the generated `dist` folder onto the page.

### 2. Cloudflare Pages
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Environment variables**: None required.

### 3. Vercel
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

---

## 🛡️ Privacy & Technical Guarantees

CodeMitra strictly adheres to honest QR principles:
1. **No Artificial Expiration**: Static QR codes do not expire on their own. They continue working as long as the encoded destination or information remains active.
2. **Zero Ingestion**: User inputs and CSV spreadsheets are never stored in `localStorage`, never sent to telemetry endpoints, and remain in ephemeral browser RAM.

---

## 👨‍💻 Developer & Owner

Developed and owned by **Aakash Pathak** (`ramrajjnk75@gmail.com`). Built for Nepal and creators worldwide.

