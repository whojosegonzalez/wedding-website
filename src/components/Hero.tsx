export default function Hero() {
  return (
    <section id="hero" className="relative w-full h-[90vh] md:h-screen flex items-center justify-center overflow-hidden bg-slate-50">
      
      {/* Left Floral Border */}
      <img 
        src="/images/floral-left.png" 
        alt="Decorative leaves" 
        className="absolute left-0 top-0 h-full w-auto object-cover opacity-90 z-10 hidden md:block pointer-events-none"
      />

      {/* Right Floral Border */}
      <img 
        src="/images/floral-right.png" 
        alt="Decorative leaves" 
        className="absolute right-0 top-0 h-full w-auto object-cover opacity-90 z-10 hidden md:block pointer-events-none"
      />

      {/* Main Content */}
      <div className="relative z-20 text-center space-y-6 px-4 animate-in fade-in zoom-in duration-1000">
        <p className="text-slate-500 uppercase tracking-[0.2em] text-sm md:text-base">
          Together with their families
        </p>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-slate-800 tracking-tight">
          Melinda <span className="text-emerald-600 font-light">&</span> Jose
        </h1>

        <div className="w-16 h-[1px] bg-slate-300 mx-auto my-6"></div>

        <div className="space-y-2">
          <p className="text-xl md:text-2xl font-serif text-slate-700">
            July 29, 2023
          </p>
          <p className="text-slate-500 italic font-serif">
            Thank you for sharing our special day
          </p>
        </div>
      </div>

      {/* Optional: Background Fade for the very bottom */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10"></div>
    </section>
  );
}