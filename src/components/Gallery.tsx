import { useState, useMemo } from "react";
import PhotoAlbum from "react-photo-album";
import "react-photo-album/columns.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { photos } from "../data/photos";

const categories = ["All", ...new Set(photos.map((p) => p.category))];

export default function Gallery() {
  const [index, setIndex] = useState(-1);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "All") return photos;
    return photos.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="gallery">
      
      <div className="w-full bg-slate-50 border-y border-slate-200 py-12 relative z-20 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 text-center space-y-6">
          <h2 className="font-serif text-4xl md:text-5xl text-slate-800">The Gallery</h2>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-emerald-600 text-white shadow-md transform scale-105"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-white/80 backdrop-blur-sm relative z-10 min-h-[50vh]">
        <div className="max-w-[1600px] mx-auto px-4 py-12 pb-20">
          <PhotoAlbum
            layout="columns"
            photos={filteredPhotos}
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
                  style={{ ...style, width: "100%", height: "auto" }}
                  className="rounded-sm shadow-sm hover:brightness-95 hover:shadow-md transition-all duration-300 cursor-zoom-in"
                />
              ),
            }}
          />

          <Lightbox
            index={index}
            slides={filteredPhotos}
            open={index >= 0}
            close={() => setIndex(-1)}
            plugins={[Zoom, Download, Thumbnails]}
          />
        </div>
      </div>
    </section>
  );
}