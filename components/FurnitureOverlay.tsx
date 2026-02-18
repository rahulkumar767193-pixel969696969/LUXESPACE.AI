
import React, { useState, useRef, useEffect } from 'react';
import { PlacedFurniture, FurnitureAsset } from '../types';
import { ICONS } from '../constants';

interface FurnitureOverlayProps {
  items: PlacedFurniture[];
  onUpdate: (items: PlacedFurniture[]) => void;
  activeItemId: string | null;
  setActiveItemId: (id: string | null) => void;
}

const FurnitureOverlay: React.FC<FurnitureOverlayProps> = ({ 
  items, 
  onUpdate, 
  activeItemId, 
  setActiveItemId 
}) => {
  const [dragging, setDragging] = useState<{ id: string; startX: number; startY: number; itemStartX: number; itemStartY: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, item: PlacedFurniture) => {
    e.stopPropagation();
    setActiveItemId(item.id);
    setDragging({
      id: item.id,
      startX: e.clientX,
      startY: e.clientY,
      itemStartX: item.x,
      itemStartY: item.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const dx = ((e.clientX - dragging.startX) / rect.width) * 100;
    const dy = ((e.clientY - dragging.startY) / rect.height) * 100;

    onUpdate(items.map(item => 
      item.id === dragging.id 
        ? { ...item, x: dragging.itemStartX + dx, y: dragging.itemStartY + dy } 
        : item
    ));
  };

  const handleMouseUp = () => setDragging(null);

  const updateItemProperty = (id: string, property: keyof PlacedFurniture, delta: number) => {
    onUpdate(items.map(item => 
      item.id === id 
        ? { ...item, [property]: (item[property] as number) + delta } 
        : item
    ));
  };

  const removeItem = (id: string) => {
    onUpdate(items.filter(item => item.id !== id));
    setActiveItemId(null);
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={`absolute cursor-move pointer-events-auto transition-shadow ${activeItemId === item.id ? 'ring-2 ring-gold shadow-[0_0_20px_rgba(212,175,55,0.4)] z-50' : 'z-10'}`}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            transform: `translate(-50%, -50%) rotate(${item.rotation}deg) scale(${item.scale})`,
            width: '150px',
            aspectRatio: '1/1',
          }}
          onMouseDown={(e) => handleMouseDown(e, item)}
        >
          <img 
            src={item.imageUrl} 
            alt="furniture" 
            className="w-full h-full object-contain drop-shadow-2xl filter brightness-110"
            draggable={false}
          />
          
          {activeItemId === item.id && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-2 glass-morphism p-2 rounded-xl border border-white/20 animate-fade-in">
              <button 
                onClick={(e) => { e.stopPropagation(); updateItemProperty(item.id, 'rotation', 15); }}
                className="p-1.5 hover:text-gold transition-colors"
                title="Rotate"
              >
                <ICONS.Rotate />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); updateItemProperty(item.id, 'scale', 0.1); }}
                className="p-1.5 hover:text-gold transition-colors"
                title="Enlarge"
              >
                <ICONS.Maximize />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); updateItemProperty(item.id, 'scale', -0.1); }}
                className="p-1.5 hover:text-gold transition-colors"
                title="Shrink"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v5a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
              </button>
              <div className="w-px h-4 bg-white/10 self-center"></div>
              <button 
                onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                className="p-1.5 text-red-400 hover:text-red-300 transition-colors"
                title="Remove"
              >
                <ICONS.Trash />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FurnitureOverlay;
