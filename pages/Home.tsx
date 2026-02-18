
import React from 'react';
import ReviewsSection from '../components/ReviewsSection';

interface HomeProps {
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  const scrollToGallery = () => {
    document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const SHOWCASE_ITEMS = [
    { title: "Luxe Obsidian", style: "Modern Luxury", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d" },
    { title: "Azure Coast", style: "Mediterranean", img: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224" },
    { title: "Arctic Echo", style: "Nordic", img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c" },
    { title: "Zen Garden", style: "Japandi", img: "https://images.unsplash.com/photo-1615529328331-f8917597711f" },
    { title: "Gilded Era", style: "Art Deco", img: "https://images.unsplash.com/photo-1540518614846-7eded433c457" },
    { title: "Urban Concrete", style: "Industrial", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f" },
    { title: "Saffron Spirit", style: "Bohemian", img: "https://images.unsplash.com/photo-1484154218962-a197022b5858" },
    { title: "Marble Haven", style: "Luxe Bath", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a" },
    { title: "Purity Suite", style: "Minimalist", img: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe" }
  ];

  return (
    <div className="pt-20 min-h-screen bg-obsidian transition-colors overflow-x-hidden">
      {/* Hero Section - Split Layout */}
      <section className="px-6 md:px-12 py-20 md:py-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left Content */}
        <div className="animate-fade-in text-left flex flex-col items-start z-10">
          <div className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[#EAB308] text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
            AI-Powered Transformation
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] mb-8">
            <span className="text-[#FACC15]">Elevate</span> your<br />
            <span className="italic font-normal text-[#D1D5DB]">living experience.</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            LuxeSpace AI analyzes your room layout and style preferences to generate breathtaking, photorealistic interior designs in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <button 
              onClick={onStart}
              className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
            >
              Start Free Redesign
            </button>
            <button 
              onClick={scrollToGallery}
              className="px-10 py-5 rounded-full font-bold text-lg text-white transition-colors bg-white/5 border border-white/10 hover:bg-white/10"
            >
              Browse Gallery
            </button>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img key={i} src={`https://picsum.photos/seed/${i + 50}/64/64`} className="w-10 h-10 rounded-full border-2 border-obsidian shadow-sm" alt="Elite Member" />
              ))}
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              Join <span className="text-gold">500+</span> Premium Members
            </p>
          </div>
        </div>
        
        {/* Right Content - Enhanced Visual */}
        <div className="relative animate-fade-in flex justify-center lg:justify-end" style={{ animationDelay: '0.2s' }}>
          <div className="relative w-full max-w-sm sm:max-w-md animate-float z-10">
            <div className="aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden border border-white/10 relative group shadow-2xl bg-slate-900">
              <img 
                 src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80" 
                 className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2000ms] ease-out"
                 alt="Luxurious Interior Showcase"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-40"></div>
              <div className="absolute inset-x-0 h-[2px] bg-gold/50 shadow-[0_0_20px_rgba(234,179,8,0.5)] animate-scan z-20"></div>

              <div className="absolute bottom-8 left-8 right-8 glass-morphism p-4 rounded-2xl border border-white/10 z-30 flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
                <div className="flex flex-col">
                  <span className="text-[8px] text-gold font-bold uppercase tracking-widest">Neural Render</span>
                  <span className="text-white text-[10px] font-bold">128-bit Lighting Pass</span>
                </div>
              </div>
            </div>
            {/* Subtle glow behind the image */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-gold/10 rounded-full blur-[80px] -z-10 group-hover:bg-gold/20 transition-colors duration-1000"></div>
          </div>
        </div>
      </section>

      {/* Style Showcase Section */}
      <section id="gallery-section" className="py-32 px-6 md:px-12 bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl text-left">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 italic">Design Dialects</h2>
              <p className="text-slate-400">Our AI doesn't just copy. It understands the architectural syntax of over 20 global design philosophies.</p>
            </div>
            <div className="flex gap-12 text-center">
                <div>
                    <span className="block text-4xl font-serif text-[#EAB308]">24k+</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Transformations</span>
                </div>
                <div>
                    <span className="block text-4xl font-serif text-[#EAB308]">Retina</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Resolution Ready</span>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {SHOWCASE_ITEMS.map((item, i) => (
               <div key={i} className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/5 relative group bg-slate-900">
                  <img 
                    src={`${item.img}?auto=format&fit=crop&w=800&q=80`} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-left transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                    <span className="text-gold font-bold uppercase tracking-[0.2em] text-[10px] mb-2 block">{item.style}</span>
                    <h3 className="text-white text-2xl font-serif italic mb-4">{item.title}</h3>
                    <div className="h-px w-0 group-hover:w-full bg-gold transition-all duration-700"></div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>
      
      {/* Reviews Section */}
      <ReviewsSection />

      {/* Dark Footer Trust */}
      <section className="py-40 bg-obsidian border-t border-white/5">
         <div className="max-w-3xl mx-auto text-center px-6">
            <h2 className="text-5xl md:text-6xl font-serif text-white mb-10 italic">Your masterpiece awaits.</h2>
            <button 
              onClick={onStart}
              className="bg-white text-black px-12 py-6 rounded-full font-bold text-xl hover:bg-gold hover:text-white transition-all shadow-2xl shadow-gold/10"
            >
              Start Free Redesign
            </button>
         </div>
      </section>
    </div>
  );
};

export default Home;
