## The "Road to Launch" Feature List
Here is our exact roadmap to finish this project. We are currently at Step 0 (Foundation Complete).

## Feature 1: The Photo Pipeline (Prerequisite)
**Task:** Select your top ~50 favorite photos from your 1TB archive.

**Technical Step:** We need to "optimize" them (convert large 10MB JPEGs into small 200KB WebP files) so the site loads instantly on mobile.

**Output:** A folder ``public/gallery/`` filled with optimized images.

## Feature 2: The Gallery Data Structure
**Task:** Create a TypeScript file (``src/data/photos.ts``) that acts as our "database."

**Details:** It will list every photo's filename, width, height, and category (e.g., "Ceremony", "Reception", "Details").

## Feature 3: The Masonry Grid Layout
**Task:** Implement ``react-photo-album``.

**Details:** This will arrange your portrait and landscape photos into perfect columns (2 columns on mobile, 3 or 4 on desktop), removing ugly gaps.

## Feature 4: The "Pro" Lightbox
**Task:** Implement ``yet-another-react-lightbox``.

**Details:**
* **Click-to-Open:** Photos expand to full screen.

* **Gestures:** Swipe left/right on phones.

* **Zoom:** Pinch-to-zoom support.

* **Download:** A discrete button for family members to save the high-res version.

## Feature 5: Category Filters
**Task:** Add a sticky bar (or buttons) above the gallery.

**Details:** Buttons for "All", "Getting Ready", "Ceremony", "Reception". Clicking one instantly reshuffles the masonry grid to show only those moments.

## Feature 6: The Footer
**Task:** A simple, elegant sign-off at the bottom.

**Text:** "Forever & Always | July 29, 2023" + a link to your portfolio ("Built with ♥ by Jose").

## Feature 7: Deployment (The Switch)
**Task:** Connect ``wedding-website`` repo to Netlify.

**Task:** Update Cloudflare to point ``JoseAndMelinda.com`` to the new Netlify app.