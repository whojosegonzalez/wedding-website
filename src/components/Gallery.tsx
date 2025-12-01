import { useState } from "react";
import PhotoAlbum from "react-photo-album";
import "react-photo-album/columns.css"; // Required for masonry layout
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Lightbox Plugins (Zoom, Download, etc.)
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// Import our auto-generated photo data
import { photos } from "../data/photos";

export default function Gallery() {
  const [index, setIndex] = useState(-1);

  return (
    <section id="gallery" className="min-h-screen py-20 px-4 bg-white">
      <div className="max-w-[1600px] mx-auto space-y-12">
        
        {/* Gallery Header */}
        <div className="text-center space-y-4">
          <h2 className="font-serif text-4xl text-slate-800">The Gallery</h2>
          <p className="text-slate-500 max-w-xl mx-auto italic font-serif">
            Favorite moments from our special day.
          </p>
        </div>

        {/* MASONRY GRID */}
        <PhotoAlbum
          layout="columns"
          photos={photos}
          columns={(containerWidth) => {
            if (containerWidth < 640) return 2;
            if (containerWidth < 1024) return 3;
            return 4;
          }}
          spacing={8}
          onClick={({ index }) => setIndex(index)}
          render={{
            image: ({ style, ...props }) => (
              <img
                {...props}
                style={style}
                className="rounded-sm shadow-sm hover:brightness-95 hover:shadow-md transition-all duration-300 cursor-zoom-in"
              />
            ),
          }}
        />

        {/* FULL SCREEN LIGHTBOX
          - Opens when 'index' is >= 0
          - Supports pinch-to-zoom and swipe
        */}
        <Lightbox
          index={index}
          slides={photos}
          open={index >= 0}
          close={() => setIndex(-1)}
          plugins={[Zoom, Download, Thumbnails]}
        />
      </div>
    </section>
  );
}