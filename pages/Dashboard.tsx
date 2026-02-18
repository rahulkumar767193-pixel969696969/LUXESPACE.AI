
import React, { useState, useEffect, useRef } from 'react';
import { RoomType, DesignStyle, DesignResult, LightingType } from '../types';
import { designService } from '../services/designService';
import { ICONS } from '../constants';

interface DashboardProps {
  onResult: (result: DesignResult) => void;
}

const COLOR_OPTIONS = [
  'Sage', 'Beige', 'Navy', 'Terracotta', 'Charcoal', 'Gold', 'Cream', 'Olive'
];

const SAMPLE_ROOMS = [
  { url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=400&q=80', label: 'Luxe Loft' },
  { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80', label: 'Modern Shell' },
  { url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=400&q=80', label: 'Nordic Suite' },
  { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80', label: 'Tech Office' },
  { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80', label: 'Marble Bath' },
  { url: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=400&q=80', label: 'Compact Living' },
  { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=400&q=80', label: 'Elite Dining' },
  { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=400&q=80', label: 'Urban Study' }
];

const ATMOSPHERES = [
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1920&q=80',
];

const Dashboard: React.FC<DashboardProps> = ({ onResult }) => {
  const [image, setImage] = useState<string | null>(null);
  const [studioBg, setStudioBg] = useState<string>(ATMOSPHERES[0]);
  const [roomType, setRoomType] = useState<RoomType>(RoomType.LIVING_ROOM);
  const [style, setStyle] = useState<DesignStyle>(DesignStyle.MODERN);
  const [lighting, setLighting] = useState<LightingType>(LightingType.NATURAL);
  const [selectedColors, setSelectedColors] = useState<string[]>(['Sage']);
  const [usage, setUsage] = useState('Relaxation');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [genLogs, setGenLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);
  const genIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [genLogs]);

  useEffect(() => {
    return () => {
      if (genIntervalRef.current) clearInterval(genIntervalRef.current);
    };
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setStudioBg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleGenerate = async () => {
    if (!image || isGenerating) return;
    
    if (genIntervalRef.current) {
      clearInterval(genIntervalRef.current);
    }

    setIsGenerating(true);
    setError('');
    setGenLogs([]);
    setProgress(0);
    
    const steps = [
      { p: 10, s: 'Initializing Neural Engine...', l: 'SYS: BOOT_V4.2_AUTH' },
      { p: 20, s: 'Mapping Spatial Contours...', l: 'SCAN: GEOM_ARRAY_SCAN' },
      { p: 30, s: 'Identifying Light Sources...', l: 'RAY: SOURCE_MAP_LITE' },
      { p: 45, s: 'Simulating Ray Traces...', l: 'RAY: BOUNCE_ITER_X64' },
      { p: 55, s: `Injecting ${style} DNA...`, l: 'AESTHETIC: APPLY_DNA_HASH' },
      { p: 65, s: 'Applying Color Theory...', l: 'PALETTE: CHROM_MAP_SET' },
      { p: 80, s: 'Synthesizing Textures...', l: 'PBR: TEX_GEN_BUFFER' },
      { p: 90, s: 'Denoising Output...', l: 'FILT: NEURAL_DENOISE' },
      { p: 100, s: 'Finalizing Vision...', l: 'GEN: FLUSH_OUTPUT_PASS' }
    ];

    try {
      let stepIndex = 0;
      genIntervalRef.current = window.setInterval(() => {
        if (stepIndex < steps.length) {
          const currentStep = steps[stepIndex];
          if (currentStep) {
            setStatus(currentStep.s);
            setProgress(currentStep.p);
            setGenLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${currentStep.l}`]);
          }
          stepIndex++;
        }
      }, 700);

      const result = await designService.generateDesign(image, roomType, style);
      
      if (genIntervalRef.current) clearInterval(genIntervalRef.current);
      
      setProgress(100);
      setTimeout(() => onResult({
        ...result,
        lighting,
        colors: selectedColors,
        usage
      }), 500);
    } catch (err) {
      setError("Transformation failed. Neural engine conflict.");
      if (genIntervalRef.current) clearInterval(genIntervalRef.current);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div 
      className="pt-32 min-h-screen bg-[#0A0A0A] text-white relative transition-all duration-1000 overflow-x-hidden"
      style={{
        backgroundImage: `url('${studioBg}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Immersive Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl z-0"></div>

      {/* Studio Controls Floating Menu */}
      {!isGenerating && (
        <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-3xl shadow-2xl flex flex-col gap-3">
            <span className="text-[7px] font-bold uppercase tracking-[0.4em] text-gold text-center mb-1">Atmosphere</span>
            <div className="flex gap-2">
              {ATMOSPHERES.map((url, i) => (
                <button 
                  key={i} 
                  onClick={() => setStudioBg(url)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${studioBg === url ? 'border-gold scale-110' : 'border-white/10'}`}
                  style={{ backgroundImage: `url('${url}')`, backgroundSize: 'cover' }}
                />
              ))}
              <label className="w-8 h-8 rounded-full border-2 border-white/10 flex items-center justify-center bg-white/5 cursor-pointer hover:border-white/30 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                <input type="file" className="hidden" accept="image/*" onChange={handleBgUpload} />
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 relative z-10">
        
        {/* State 1: No Image - Upload View */}
        {!image && !isGenerating && (
          <div className="flex flex-col items-center justify-center min-h-[600px] animate-fade-in">
             <div className="text-center mb-16 max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-serif italic mb-6">Start your transformation.</h1>
                <p className="text-slate-500 uppercase tracking-[0.3em] text-[10px] font-bold">Upload a photo of your existing space to begin the neural redesign.</p>
             </div>

             <label className="cursor-pointer group relative">
                <div className="w-64 h-64 rounded-[3rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 transition-all hover:bg-white/[0.04] hover:border-gold animate-pulse-gold relative overflow-hidden">
                   {/* Background dynamic effect */}
                   <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   
                   <div className="relative w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-gold border border-white/5 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <div className="absolute inset-0 bg-gold rounded-2xl animate-ping opacity-10 group-hover:opacity-25"></div>
                      <ICONS.Plus />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-white transition-colors relative z-10">Upload Room Image</span>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
             </label>

             <div className="mt-16 grid grid-cols-4 sm:grid-cols-8 gap-4 max-w-3xl w-full">
                {SAMPLE_ROOMS.map((sample, i) => (
                  <button 
                    key={i} 
                    onClick={() => setImage(sample.url)}
                    className="aspect-square rounded-2xl overflow-hidden border border-white/5 hover:border-gold transition-all"
                  >
                    <img src={sample.url} className="w-full h-full object-cover grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all" alt="sample" />
                  </button>
                ))}
             </div>
          </div>
        )}

        {/* State 2: Image Present - Design Settings View */}
        {image && !isGenerating && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 animate-fade-in">
            {/* Left: Design Settings Panel */}
            <div className="lg:col-span-7 space-y-12">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-serif italic text-gold">Design Settings</h2>
                <button 
                  onClick={() => setImage(null)}
                  className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                >
                  Change Image
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {/* Room Type */}
                <div className="space-y-4">
                  <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600">Room Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(RoomType).map(type => (
                      <button
                        key={type}
                        onClick={() => setRoomType(type)}
                        className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${roomType === type ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-transparent border-white/10 text-slate-400 hover:text-white'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div className="space-y-4">
                  <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600">Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_OPTIONS.map(color => (
                      <button
                        key={color}
                        onClick={() => toggleColor(color)}
                        className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${selectedColors.includes(color) ? 'bg-white text-black border-white' : 'bg-[#151515] border-white/5 text-slate-500 hover:text-white'}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vibe */}
                <div className="space-y-4">
                  <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600">Vibe</h3>
                  <div className="flex flex-wrap gap-2">
                    {[DesignStyle.MODERN, DesignStyle.MINIMALIST, DesignStyle.SCANDINAVIAN, DesignStyle.LUXURY].map(v => (
                      <button
                        key={v}
                        onClick={() => setStyle(v)}
                        className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${style === v ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-transparent border-white/10 text-slate-400 hover:text-white'}`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Usage */}
                <div className="space-y-4">
                  <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600">Usage</h3>
                  <div className="relative">
                    <input 
                      type="text"
                      value={usage}
                      onChange={(e) => setUsage(e.target.value)}
                      className="w-full bg-[#151515] border border-white/5 rounded-2xl px-6 py-4 text-xs text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-slate-800"
                      placeholder="e.g. Relaxation, Work"
                    />
                  </div>
                </div>

                {/* Lighting */}
                <div className="space-y-4 md:col-span-2">
                  <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600">Lighting</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(LightingType).map(l => (
                      <button
                        key={l}
                        onClick={() => setLighting(l)}
                        className={`flex items-center gap-3 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${lighting === l ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-transparent border-white/10 text-slate-400 hover:text-white'}`}
                      >
                        {lighting === l && <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_#D4AF37]"></div>}
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-12">
                <button
                  onClick={handleGenerate}
                  className="w-full max-w-sm bg-white text-black py-6 rounded-full font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-gold hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95"
                >
                  Generate Transformation
                </button>
                {error && <p className="text-red-500 text-[10px] mt-4 font-bold uppercase tracking-widest">{error}</p>}
              </div>
            </div>

            {/* Right: Preview & Image Handle */}
            <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-8">
                <div className="relative aspect-[4/5] w-full rounded-[3rem] overflow-hidden border border-white/10 bg-[#111] shadow-2xl group">
                  <img src={image} className="w-full h-full object-cover opacity-80" alt="Room preview" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-10 left-10">
                    <span className="text-gold font-bold uppercase tracking-[0.3em] text-[8px] block mb-1">Source Frame</span>
                    <h4 className="text-xl font-serif italic">{roomType} View</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* State 3: Generating - Enhanced Progress View */}
        {isGenerating && (
          <div className="max-w-6xl mx-auto py-12 flex flex-col items-center justify-center animate-fade-in relative">
            <div className="w-full aspect-[16/9] mb-16 rounded-[3.5rem] border border-white/10 bg-black overflow-hidden relative shadow-2xl flex">
                
                {/* Secondary Data Sidebar (Elite Touch) */}
                <div className="w-48 bg-white/[0.02] border-r border-white/5 flex flex-col p-6 space-y-8 hidden md:flex relative z-10">
                   <div className="space-y-4">
                      <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">Mem_Pool</span>
                      <div className="space-y-1">
                        {[1,2,3,4,5].map(i => (
                          <div key={i} className="h-1 bg-white/5 rounded-full w-full overflow-hidden">
                            <div className="h-full bg-gold/20 animate-pulse" style={{ width: `${Math.random() * 100}%`, animationDelay: `${i*0.2}s` }}></div>
                          </div>
                        ))}
                      </div>
                   </div>
                   <div className="flex-1 flex flex-col justify-end space-y-4">
                      <div className="flex flex-col">
                        <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">Stability</span>
                        <span className="text-[10px] font-mono text-gold">98.4%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">Lat_Sync</span>
                        <span className="text-[10px] font-mono text-white">4ms</span>
                      </div>
                   </div>
                </div>

                {/* Main Synthesis Arena */}
                <div className="flex-1 relative overflow-hidden">
                    {/* Holographic Background */}
                    <div className="absolute inset-0 holographic-grid animate-grid-scroll opacity-40"></div>
                    
                    {/* Visual Neural Core */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative w-80 h-80 flex items-center justify-center scale-110 lg:scale-125">
                            {/* Rotating Rings */}
                            <div className="absolute inset-0 border border-gold/20 rounded-full animate-spin-slow"></div>
                            <div className="absolute inset-6 border border-gold/10 rounded-full animate-spin-reverse"></div>
                            <div className="absolute inset-12 border border-white/5 rounded-full animate-spin-slow" style={{ animationDuration: '24s' }}></div>
                            
                            {/* Central Glow */}
                            <div className="w-24 h-24 bg-gold rounded-full blur-[60px] opacity-10 animate-pulse"></div>
                            <div className="w-6 h-6 bg-gold rounded-full shadow-[0_0_40px_#D4AF37] animate-pulse"></div>

                            {/* Floating Nodes */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-gold rounded-full animate-node-flicker"></div>
                            <div className="absolute bottom-12 right-24 w-1.5 h-1.5 bg-white rounded-full animate-node-flicker" style={{ animationDelay: '0.6s' }}></div>
                            <div className="absolute top-24 left-12 w-1.5 h-1.5 bg-white rounded-full animate-node-flicker" style={{ animationDelay: '1.4s' }}></div>
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 p-10 flex flex-col relative z-10">
                       <div className="flex justify-between items-start border-b border-white/10 pb-6 mb-6">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
                              <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-white">Neural Synthesis Active</span>
                            </div>
                            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-[0.3em] ml-5">V4.2 Protocol Engagement // Core-ID: 0x9F42</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-mono text-slate-600 block">ENCRYPTION: AES-256</span>
                            <span className="text-[10px] font-mono text-gold block">SYNAPSE_RATE: 4.8 GHz</span>
                          </div>
                       </div>
                       
                       {/* Enhanced Logs */}
                       <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide font-mono text-[10px] text-slate-400 p-2">
                          {genLogs.map((log, i) => (
                            <div key={i} className="animate-fade-in flex gap-4 bg-white/[0.03] border-l-2 border-gold/30 py-3 px-5 rounded-r-xl group hover:bg-white/[0.05] transition-colors">
                               <span className="text-gold/40 flex-shrink-0 font-bold">[{i.toString().padStart(2, '0')}]</span>
                               <span className="uppercase tracking-widest leading-relaxed flex-1">{log}</span>
                               <span className="text-[8px] text-slate-700 font-bold hidden sm:block">ACK_TRUE</span>
                            </div>
                          ))}
                          <div ref={logEndRef}></div>
                       </div>
                    </div>
                    
                    {/* Horizontal Scan Overlay */}
                    <div className="absolute inset-x-0 h-[2px] bg-gold/40 shadow-[0_0_25px_rgba(212,175,55,0.6)] animate-scan pointer-events-none z-20"></div>
                </div>
            </div>

            <div className="w-full text-center space-y-12 relative z-10">
               <div className="space-y-4">
                 <h2 className="text-5xl md:text-6xl font-serif italic text-white animate-glitch key-[status]" key={status}>{status}</h2>
                 <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.6em]">Awaiting final neural confirmation</p>
               </div>
               
               <div className="w-full max-w-3xl mx-auto space-y-8">
                  <div className="relative group">
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors">
                      <div 
                        className="h-full bg-gradient-to-r from-gold via-yellow-200 to-gold shadow-[0_0_25px_#D4AF37] transition-all duration-700 ease-out" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    {/* Grid Markers */}
                    {[...Array(11)].map((_, i) => (
                      <div key={i} className="absolute top-1/2 -translate-y-1/2 w-px h-3 bg-white/10" style={{ left: `${i*10}%` }}></div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.5em] text-slate-500 px-2">
                     <div className="flex items-center gap-4">
                        <span className="text-gold/60 font-mono">STATUS:</span>
                        <span className="text-white/80">Processing Volumetric Pass</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden mr-2 hidden sm:block">
                           <div className="h-full bg-gold" style={{ width: `${progress}%` }}></div>
                        </div>
                        <span className="text-gold font-mono text-sm">{progress}%</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
