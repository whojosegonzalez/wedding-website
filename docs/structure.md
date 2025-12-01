# Project Structure – Wedding Website

A map of the project files and directories.

---

## Root
| Path | Purpose |
|------|----------|
| `/index.html` | Entry point (Vite) |
| `/vite.config.ts` | Configuration for Vite + React + Tailwind |
| `/package.json` | Dependencies (React, Framer Motion, Photo Album) |
| `/tailwind.config.js` | (If using v3) or standard CSS config |
| `/photos_source/` | **Local Only**: High-res original photos (Not committed to Git) |

---

## src/
| Path | Purpose |
|------|----------|
| `/src/main.tsx` | App entry point, renders App into root div |
| `/src/App.tsx` | Main layout shell (Navbar + Hero + Gallery Placeholder) |
| `/src/index.css` | Global styles (Tailwind imports + Custom font rules) |

### src/components/
| Path | Purpose |
|------|---------|
| `/src/components/Navbar.tsx` | Sticky navigation with smooth scroll links |
| `/src/components/Hero.tsx` | "Melinda & Jose" main visual with floral borders |
| `/src/components/Gallery.tsx` | **(Todo)** Main photo grid (Masonry layout) |
| `/src/components/Lightbox.tsx` | **(Todo)** Full-screen image viewer (Swipe/Zoom) |
| `/src/components/RSVP.tsx` | **(Optional)** Simple Netlify form for guestbook/messages |

### src/data/
| Path | Purpose |
|------|---------|
| `/src/data/photos.ts` | **(Auto-Generated)** JSON list of all photo filenames, sizes, and categories |

### src/scripts/
| Path | Purpose |
|------|---------|
| `/src/scripts/process-photos.js` | **(Todo)** Node script to resize/convert images from source to public |

---

## public/
| Path | Purpose |
|------|----------|
| `/public/images/` | Static assets (Floral borders, icons, hero bg) |
| `/public/gallery/` | **(Generated)** Optimized WebP images served to the website |