import { useState, useEffect } from "react";

export default function Navbar() {
  // We can keep the scroll logic if you want the shadow to appear/disappear, 
  // OR just force the background always. Let's force it for stability.
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset by 80px so the navbar doesn't cover the section title
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    // CHANGED: Removed transparent logic. It is now always white with a shadow.
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-100 py-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 flex justify-center md:justify-between items-center text-slate-800">
        <div className="hidden md:block text-xl font-serif tracking-widest uppercase">
          M & J
        </div>
        
        <div className="flex gap-8 text-sm font-medium tracking-wide uppercase font-serif">
          <button onClick={() => scrollToSection("hero")} className="hover:text-emerald-600 transition">
            Home
          </button>
          <button onClick={() => scrollToSection("gallery")} className="hover:text-emerald-600 transition">
            Gallery
          </button>
        </div>
      </div>
    </nav>
  );
}