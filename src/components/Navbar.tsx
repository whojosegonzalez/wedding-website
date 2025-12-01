import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Adds a subtle shadow when the user scrolls down
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 shadow-md backdrop-blur-sm py-2" : "bg-transparent py-4"
      }`}
    >
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
          {/* We can add 'Wedding Party' or 'Registry' here later if you keep them */}
        </div>
      </div>
    </nav>
  );
}