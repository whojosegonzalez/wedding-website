# Project Structure – Wedding Website

A map of the project files and directories.

---

## Root
| Path | Purpose |
|------|----------|
| `/index.html` | Entry point (Updated with SEO metadata) |
| `/vite.config.ts` | Configuration for Vite + React + Tailwind |
| `/package.json` | Dependencies (React, Framer Motion, Photo Album, Sharp) |
| `/photos_source/` | **Local Only**: High-res original photos (Ignored by Git) |

---

## src/
| Path | Purpose |
|------|----------|
| `/src/main.tsx` | App entry point |
| `/src/App.tsx` | Main layout shell (Global floral borders + Content Container) |
| `/src/index.css` | Global styles (Wallpaper pattern + Tailwind imports) |

### src/components/
| Path | Purpose |
|------|---------|
| `/src/components/Navbar.tsx` | Sticky navigation with shadow effect |
| `/src/components/Hero.tsx` | Main visual with floral borders and fade effect |
| `/src/components/Gallery.tsx` | Masonry grid + Lightbox logic + Category Filter Ribbon |
| `/src/components/Footer.tsx` | "Forever & Always" branding and credits |

### src/data/
| Path | Purpose |
|------|---------|
| `/src/data/photos.ts` | **(Auto-Generated)** Typed array of all photo metadata |

### src/scripts/
| Path | Purpose |
|------|---------|
| `/src/scripts/process-photos.js` | Node script to scan subfolders, resize to JPG, and generate data |

---

## public/
| Path | Purpose |
|------|----------|
| `/public/404.html` | Custom "Page Not Found" for Netlify |
| `/public/images/` | Static assets (Floral borders, pattern.png) |
| `/public/gallery/` | **(Generated)** Optimized JPEG images served to the website |