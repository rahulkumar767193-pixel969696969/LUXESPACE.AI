
import React, { useState, useRef, useEffect } from 'react';
import { DesignResult, PlacedFurniture, FurnitureAsset } from '../types';
import { ICONS, FURNITURE_CATALOG } from '../constants';
import FurnitureOverlay from '../components/FurnitureOverlay';
import { GoogleGenAI } from "@google/genai";

interface ResultPageProps {
  result: DesignResult;
  onBack: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ result, onBack }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isFurnishMode, setIsFurnishMode] = useState(false);
  const [placedItems, setPlacedItems] = useState<PlacedFurniture[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [isRefining, setIsRefining] = useState(false);
  const [currentImage, setCurrentImage] = useState(result.generatedImage);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (isFurnishMode || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  const addFurniture = (asset: FurnitureAsset) => {
    const newItem: PlacedFurniture = {
      id: `placed_${Date.now()}`,
      assetId: asset.id,
      x: 50,
      y: 50,
      scale: 1,
      rotation: 0,
      imageUrl: asset.imageUrl
    };
    setPlacedItems([...placedItems, newItem]);
    setActiveItemId(newItem.id);
  };

  const handleRefineWithAI = async () => {
    if (placedItems.length === 0) return;
    setIsRefining(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // In a real scenario, we would send the base image + furniture positions
      // Here we simulate the AI "merging" the furniture into the scene using gemini-2.5-flash-image
      // but for this UI demo, we'll just show a loading state and keep the same image
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate success
      setIsFurnishMode(false);
      setPlacedItems([]);
    } catch (err) {
      console.error("AI Refinement Error:", err);
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-6 md:px-12 py-12 animate-fade-in relative">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-slate-500 hover:text-white font-bold uppercase tracking-widest text-[10px] transition-all group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          Back to Studio
        </button>
        <div className="flex gap-4">
           <button 
             onClick={() => setIsFurnishMode(!isFurnishMode)}
             className={`px-6 py-2.5 rounded-full flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${isFurnishMode ? 'bg-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
           >
             <ICONS.Furniture />
             {isFurnishMode ? 'Exiting Layout' : 'Furnish Space'}
           </button>
           <span className="px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest text-gold hidden sm:block">ID: {result.id.split('_')[1]}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Main Viewport */}
        <div className="lg:col-span-8 space-y-8">
          <div 
            ref={containerRef}
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
            className={`relative aspect-[16/9] w-full rounded-[2.5rem] overflow-hidden bg-slate-900 border border-white/10 shadow-2xl ${isFurnishMode ? 'cursor-default' : 'cursor-col-resize group'}`}
          >
            {/* Base Image */}
            <img 
              src={result.originalImage} 
              className="absolute inset-0 w-full h-full object-cover" 
              alt="Before" 
            />
            
            {/* Generated Image Layer */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-75 ease-out border-r-[1.5px] border-white/30"
              style={{ width: isFurnishMode ? '100%' : `${sliderPos}%` }}
            >
              <img 
                src={currentImage} 
                className="absolute inset-0 w-full h-full object-cover" 
                style={{ width: containerRef.current?.offsetWidth || '100vw' }}
                alt="After" 
              />
              
              {/* Furniture Interactive Overlay */}
              {isFurnishMode && (
                <FurnitureOverlay 
                  items={placedItems} 
                  onUpdate={setPlacedItems} 
                  activeItemId={activeItemId}
                  setActiveItemId={setActiveItemId}
                />
              )}
            </div>

            {/* Slider Handle (Hide in furnish mode) */}
            {!isFurnishMode && (
              <>
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white/50 pointer-events-none flex items-center justify-center transition-all duration-75 ease-out"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-2xl border-4 border-obsidian">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m18 8 4 4-4 4"/><path d="m6 8-4 4 4 4"/></svg>
                  </div>
                </div>
                <div className="absolute bottom-8 left-8 flex gap-4 pointer-events-none transition-opacity duration-300">
                   <div className={`px-4 py-2 rounded-xl glass-morphism text-[10px] font-bold uppercase tracking-widest text-white border border-white/10 ${sliderPos < 10 ? 'opacity-0' : 'opacity-100'}`}>
                     After (AI Design)
                   </div>
                </div>
                <div className="absolute bottom-8 right-8 flex gap-4 pointer-events-none transition-opacity duration-300">
                   <div className={`px-4 py-2 rounded-xl glass-morphism text-[10px] font-bold uppercase tracking-widest text-white border border-white/10 ${sliderPos > 90 ? 'opacity-0' : 'opacity-100'}`}>
                     Before (Original)
                   </div>
                </div>
              </>
            )}

            {/* AI Refining Overlay */}
            {isRefining && (
              <div className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in">
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 border-2 border-gold/20 rounded-full animate-spin-slow"></div>
                  <div className="absolute inset-2 border-2 border-gold/40 rounded-full animate-spin-reverse"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-gold">
                    <ICONS.Magic />
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white">Integrating Assets into Neural Scene...</span>
              </div>
            )}
          </div>

          {/* Catalog Drawer (Only visible in furnish mode) */}
          {isFurnishMode && (
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] animate-fade-in">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex flex-col">
                    <h3 className="text-xl font-serif italic text-white">Furniture Boutique</h3>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500">Premium Curation Suite</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleRefineWithAI}
                      disabled={placedItems.length === 0 || isRefining}
                      className="px-6 py-2.5 rounded-full bg-white text-black text-[9px] font-bold uppercase tracking-widest hover:bg-gold hover:text-white transition-all disabled:opacity-30 flex items-center gap-2"
                    >
                      <ICONS.Magic />
                      Bake into Design
                    </button>
                  </div>
               </div>
               
               <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
                  {FURNITURE_CATALOG.map((asset) => (
                    <button 
                      key={asset.id}
                      onClick={() => addFurniture(asset)}
                      className="flex-shrink-0 w-32 group"
                    >
                      <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 group-hover:border-gold transition-all mb-3 bg-[#111]">
                        <img src={asset.imageUrl} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" alt={asset.name} />
                      </div>
                      <span className="block text-[8px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-gold transition-colors text-center">{asset.name}</span>
                    </button>
                  ))}
                  <label className="flex-shrink-0 w-32 flex flex-col items-center justify-center aspect-square rounded-2xl border-2 border-dashed border-white/10 hover:border-gold/50 hover:bg-white/5 cursor-pointer transition-all group">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-gold transition-colors mb-2">
                      <ICONS.Plus />
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-white">Upload 3D</span>
                    <input type="file" className="hidden" accept="image/*" onChange={() => alert('Mock: Asset conversion service active.')} />
                  </label>
               </div>
            </div>
          )}

          {/* Stats Grid */}
          {!isFurnishMode && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                  <span className="block text-[8px] uppercase font-bold text-slate-500 tracking-widest mb-2">Room Type</span>
                  <span className="text-white font-serif italic text-lg">{result.roomType}</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                  <span className="block text-[8px] uppercase font-bold text-slate-500 tracking-widest mb-2">Aesthetic</span>
                  <span className="text-white font-serif italic text-lg">{result.style}</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl col-span-2">
                  <span className="block text-[8px] uppercase font-bold text-slate-500 tracking-widest mb-2">Design DNA</span>
                  <div className="flex gap-2 mt-2">
                    {result.palette.map((color, i) => (
                      <div 
                        key={i} 
                        className="h-6 flex-1 rounded-full border border-white/10" 
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] shadow-2xl">
            <h2 className="text-3xl font-serif text-white mb-6 italic">{isFurnishMode ? 'Layout Logic' : 'The Vision'}</h2>
            <div className="space-y-6">
              <p className="text-slate-400 text-sm leading-relaxed italic border-l-2 border-gold pl-6 py-2">
                {isFurnishMode 
                  ? "Select assets from our boutique catalog to virtually stage your environment. Adjust scale and rotation for optimal spatial syntax."
                  : `"${result.description}"`
                }
              </p>
              
              <div className="pt-6 space-y-6 border-t border-white/10">
                <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold">Curation Strategy</h3>
                <ul className="space-y-4">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex gap-4 items-start group">
                      <div className="w-5 h-5 rounded-full bg-gold/10 text-gold flex-shrink-0 flex items-center justify-center text-[10px] font-bold border border-gold/20">
                        {i + 1}
                      </div>
                      <p className="text-xs text-slate-400 leading-normal group-hover:text-slate-200 transition-colors">{rec}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-10 flex flex-col gap-4">
                <button className="w-full bg-white text-black py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  Export Portfolio Assets
                </button>
                <button className="w-full border border-white/10 text-white py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all">
                  Share Private Link
                </button>
              </div>
            </div>
          </div>

          <div className="p-8 bg-gold/5 border border-gold/10 rounded-[2rem] flex items-center gap-5">
             <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center text-gold">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
             </div>
             <div>
               <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">Authenticated Design</h4>
               <p className="text-[10px] text-slate-500">Verified by LuxeSpace Neural Engine</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
