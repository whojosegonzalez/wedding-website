import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="font-sans text-slate-900 min-h-screen selection:bg-emerald-100 relative">
      
      <img 
        src="/images/floral-left.png" 
        alt="" 
        className="fixed left-0 top-0 h-screen w-auto object-cover z-0 pointer-events-none opacity-30 md:opacity-100 transition-opacity duration-500"
      />

      <img 
        src="/images/floral-right.png" 
        alt="" 
        className="fixed right-0 top-0 h-screen w-auto object-cover z-0 pointer-events-none opacity-30 md:opacity-100 transition-opacity duration-500"
      />

      {/* MAIN CONTENT 
          - z-10: Sits ON TOP of the floral borders
          - relative: Essential for z-index to work
      */}
      <div className="relative z-10">
        <Navbar />
        
        <main>
          <Hero />
          <Gallery />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;