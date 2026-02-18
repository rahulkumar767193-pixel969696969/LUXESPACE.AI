
import React, { useState, useEffect } from 'react';
import { DesignResult } from '../types';
import { designService } from '../services/designService';
import { ICONS } from '../constants';

interface HistoryProps {
  onView: (result: DesignResult) => void;
}

const History: React.FC<HistoryProps> = ({ onView }) => {
  const [history, setHistory] = useState<DesignResult[]>([]);

  useEffect(() => {
    setHistory(designService.getHistory());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this design?')) {
      designService.deleteDesign(id);
      setHistory(designService.getHistory());
    }
  };

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-6 md:px-12 py-12 transition-colors">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-2">My History</h1>
          <p className="text-slate-500 dark:text-slate-400">A collection of your AI-powered interior transformations.</p>
        </div>
        <div className="hidden md:block">
          <div className="bg-white dark:bg-slate-900 px-6 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-6 transition-colors">
            <div className="text-center">
              <span className="block text-2xl font-bold text-indigo-600 dark:text-indigo-400">{history.length}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Designs</span>
            </div>
            <div className="w-px h-8 bg-slate-100 dark:bg-slate-800"></div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-slate-900 dark:text-white">∞</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Credits Left</span>
            </div>
          </div>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 py-24 text-center transition-colors">
          <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 dark:text-slate-600">
            <ICONS.History />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">No history yet</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8">Your generated designs will appear here. Start your first transformation today!</p>
          <button 
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 dark:shadow-none"
            onClick={() => window.location.hash = '#dashboard'}
          >
            Create First Design
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {history.map((item) => (
            <div 
              key={item.id} 
              className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 border border-slate-100 dark:border-slate-800 cursor-pointer"
              onClick={() => onView(item)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={item.generatedImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.style} />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-2 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-lg text-[10px] font-bold text-slate-900 dark:text-white uppercase">{item.style}</span>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => handleDelete(item.id, e)}
                    className="p-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-600 dark:hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <ICONS.Trash />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{item.roomType} Redesign</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex -space-x-1.5">
                    {item.palette.slice(0, 3).map((c, i) => (
                      <div key={i} className="w-4 h-4 rounded-full border border-white dark:border-slate-800" style={{ backgroundColor: c }}></div>
                    ))}
                  </div>
                </div>
                <button className="w-full py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  View Full Design
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
