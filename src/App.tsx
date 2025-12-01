import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery"; // <-- Import the new component

function App() {
  return (
    <div className="font-sans text-slate-900 bg-white min-h-screen selection:bg-emerald-100">
      <Navbar />
      
      <main>
        <Hero />
        <Gallery /> 
      </main>
    </div>
  );
}

export default App;