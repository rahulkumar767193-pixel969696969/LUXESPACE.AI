
import React, { useState, useEffect, useMemo } from 'react';
import { DesignResult, RoomType, DesignStyle } from '../types';
import { designService } from '../services/designService';
import { ICONS } from '../constants';

interface HistoryProps {
  onView: (result: DesignResult) => void;
}

type SortOption = 'date-desc' | 'date-asc' | 'room-asc' | 'style-asc';

const History: React.FC<HistoryProps> = ({ onView }) => {
  const [history, setHistory] = useState<DesignResult[]>([]);
  const [filterRoom, setFilterRoom] = useState<RoomType | 'All'>('All');
  const [filterStyle, setFilterStyle] = useState<DesignStyle | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');

  useEffect(() => {
    setHistory(designService.getHistory());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Permanently remove this design from your private archive?')) {
      designService.deleteDesign(id);
      setHistory(designService.getHistory());
    }
  };

  const processedHistory = useMemo(() => {
    let result = [...history];

    // Filtering
    if (filterRoom !== 'All') {
      result = result.filter(item => item.roomType === filterRoom);
    }
    if (filterStyle !== 'All') {
      result = result.filter(item => item.style === filterStyle);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'date-asc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'room-asc':
          return a.roomType.localeCompare(b.roomType);
        case 'style-asc':
          return a.style.localeCompare(b.style);
        default:
          return 0;
      }
    });

    return result;
  }, [history, filterRoom, filterStyle, sortBy]);

  return (
    <div className="pt-32 min-h-screen bg-obsidian text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 animate-fade-in">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-[8px] font-bold uppercase tracking-[0.3em] border border-gold/20">Private Archive</span>
              <div className="h-px w-12 bg-gold/30"></div>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif italic tracking-tight">Design <span className="text-gold">Gallery</span></h1>
            <p className="text-slate-500 text-sm font-light max-w-md">Your curated history of neural architectural transformations and spatial visions.</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md px-8 py-6 rounded-[2rem] border border-white/10 flex items-center gap-10 shadow-2xl">
            <div className="text-center">
              <span className="block text-3xl font-serif italic text-gold">{history.length}</span>
              <span className="text-[9px] uppercase font-bold text-slate-500 tracking-widest">Masterpieces</span>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div className="text-center">
              <span className="block text-3xl font-serif italic text-white">Elite</span>
              <span className="text-[9px] uppercase font-bold text-slate-500 tracking-widest">Access Tier</span>
            </div>
          </div>
        </div>

        {/* Toolbar: Filtering & Sorting */}
        {history.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {/* Filter by Room */}
            <div className="space-y-2">
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600 ml-4">Room Type</label>
              <select 
                value={filterRoom}
                onChange={(e) => setFilterRoom(e.target.value as any)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-300 focus:outline-none focus:border-gold transition-all appearance-none cursor-pointer"
              >
                <option value="All">All Spaces</option>
                {Object.values(RoomType).map(room => <option key={room} value={room}>{room}</option>)}
              </select>
            </div>

            {/* Filter by Style */}
            <div className="space-y-2">
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600 ml-4">Design Dialect</label>
              <select 
                value={filterStyle}
                onChange={(e) => setFilterStyle(e.target.value as any)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-300 focus:outline-none focus:border-gold transition-all appearance-none cursor-pointer"
              >
                <option value="All">All Styles</option>
                {Object.values(DesignStyle).map(style => <option key={style} value={style}>{style}</option>)}
              </select>
            </div>

            {/* Sorting */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600 ml-4">Sequence Order</label>
              <div className="flex gap-2">
                {[
                  { id: 'date-desc', label: 'Newest First' },
                  { id: 'room-asc', label: 'By Room A-Z' },
                  { id: 'style-asc', label: 'By Style A-Z' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setSortBy(opt.id as SortOption)}
                    className={`flex-1 py-4 rounded-2xl text-[9px] font-bold uppercase tracking-widest border transition-all ${sortBy === opt.id ? 'bg-gold text-white border-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-white/5 border-white/10 text-slate-500 hover:text-white hover:border-white/20'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        {processedHistory.length === 0 ? (
          <div className="bg-white/5 rounded-[3.5rem] border border-white/10 py-32 text-center animate-fade-in shadow-2xl backdrop-blur-sm">
            <div className="w-24 h-24 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-10 border border-gold/20">
              <ICONS.History />
            </div>
            <h3 className="text-3xl font-serif italic text-white mb-4">No results found</h3>
            <p className="text-slate-500 text-sm font-light max-w-sm mx-auto mb-12">Try adjusting your filters or initiate a new neural design transformation.</p>
            <button 
              className="bg-white text-black px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.3em] hover:bg-gold hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95"
              onClick={() => window.location.hash = 'dashboard'}
            >
              Start New Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {processedHistory.map((item, idx) => (
              <div 
                key={item.id} 
                className="group relative bg-[#0F0F0F] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${idx * 0.05}s` }}
                onClick={() => onView(item)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={item.generatedImage} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out" alt={item.style} />
                  
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  
                  {/* Status Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg text-[8px] font-bold text-gold uppercase tracking-widest border border-gold/20 shadow-lg">{item.style}</span>
                    <span className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-lg text-[8px] font-bold text-white uppercase tracking-widest border border-white/10 shadow-lg">{item.roomType}</span>
                  </div>

                  {/* Delete Button */}
                  <div className="absolute top-6 right-6 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <button 
                      onClick={(e) => handleDelete(item.id, e)}
                      className="p-3 bg-red-500/10 backdrop-blur-md text-red-500 rounded-2xl hover:bg-red-500 hover:text-white border border-red-500/20 transition-all"
                    >
                      <ICONS.Trash />
                    </button>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-slate-500 text-[8px] font-bold uppercase tracking-[0.3em] block mb-1">Synthesized {new Date(item.createdAt).toLocaleDateString()}</span>
                        <h3 className="text-xl font-serif italic text-white">{item.roomType} Vision</h3>
                      </div>
                      <div className="flex -space-x-2">
                        {item.palette.slice(0, 4).map((c, i) => (
                          <div 
                            key={i} 
                            className="w-6 h-6 rounded-full border-2 border-[#0F0F0F] shadow-lg" 
                            style={{ backgroundColor: c }}
                            title={c}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 h-px w-0 bg-gold/50 group-hover:w-full transition-all duration-1000 delay-100"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
