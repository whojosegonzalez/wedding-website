# Melinda & Jose - Wedding Archive

A custom digital photo album and memory archive for our wedding (July 29, 2023). Built to preserve our memories in high resolution without relying on paid website builders.

**Live Site:** [https://joseandmelinda.com](https://joseandmelinda.com)

## Tech Stack
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Gallery:** `react-photo-album` (Masonry Layout)
- **Lightbox:** `yet-another-react-lightbox` (Zoom/Swipe support)
- **Image Processing:** Node.js + Sharp

## Key Features
- **Smart Gallery:** A responsive masonry grid that organizes portrait and landscape photos without gaps.
- **Category Filtering:** Instantly filter moments (Ceremony, Reception, etc.) using a custom metadata pipeline.
- **Optimized Performance:** Uses a custom script to convert high-res source files into web-optimized JPEGs.
- **Mobile Experience:** Full swipe support, pinch-to-zoom, and "App-like" sticky navigation.
- **Preservation:** Download buttons allow family members to save high-quality versions of photos.

## Photo Workflow (How to Add Photos)

This project uses a custom "Source to Public" pipeline to keep the repository light and the website fast.

1.  **Source:** Place high-res photos into the `photos_source/` folder in the project root.
    * *Organization:* Create subfolders inside `photos_source` to create categories (e.g., `photos_source/Ceremony/`).
2.  **Process:** Run the optimization script:
    ```bash
    node src/scripts/process-photos.js
    ```
3.  **Result:** The script automatically:
    * Resizes images to 1920px (Full HD).
    * Converts them to optimized JPEGs.
    * Generates `src/data/photos.ts` with dimensions and category tags.
    * Saves the ready-to-use files in `public/gallery/`.

## Local Development

1.  **Install dependencies**
    ```bash
    npm install
    ```

2.  **Process Images** (Required first run)
    ```bash
    node src/scripts/process-photos.js
    ```

3.  **Start the Dev Server**
    ```bash
    npm run dev
    ```

## Deployment
This site is deployed on **Netlify**.
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Privacy:** Source code is held in a private GitHub repository.

---
*Built with ♥ by Jose Gonzalez*