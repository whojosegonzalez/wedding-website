export default function Footer() {
  return (
    <footer className="py-16 text-center text-slate-500 font-serif bg-slate-50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        
        {/* Date / Branding */}
        <div>
          <p className="tracking-[0.2em] uppercase text-xs mb-3 text-slate-400">
            Forever & Always
          </p>
          <p className="text-2xl md:text-3xl text-slate-800">
            Melinda <span className="text-emerald-600 font-light">&</span> Jose
          </p>
          <p className="text-md text-slate-600 mt-2">
            July 29, 2023
          </p>
        </div>

        {/* Divider */}
        <div className="w-12 h-[1px] bg-slate-300 mx-auto opacity-50"></div>

        {/* Credit */}
        <p className="text-xs text-slate-400">
          Built with <span className="text-red-400 animate-pulse">♥</span> by{" "}
          <a 
            href="https://josegonzalez.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-emerald-600 transition underline decoration-1 underline-offset-4"
          >
            Jose Gonzalez
          </a>
        </p>
      </div>
    </footer>
  );
}