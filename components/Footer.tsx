
import React from 'react';
import { APP_NAME } from '../constants';
import SocialMediaIcons from './SocialMediaIcons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-obsidian border-t border-white/5 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gold rounded flex items-center justify-center text-black font-bold text-sm">L</div>
            <span className="text-xl font-bold tracking-tight text-white">{APP_NAME}</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            Reimagining the world one room at a time with the power of generative AI and professional design principles.
          </p>
          <SocialMediaIcons />
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 text-[10px] uppercase tracking-[0.2em]">Product</h4>
          <ul className="space-y-4 text-xs text-slate-500">
            <li className="hover:text-gold cursor-pointer transition-colors font-bold uppercase tracking-widest">AI Studio</li>
            <li className="hover:text-gold cursor-pointer transition-colors font-bold uppercase tracking-widest">Style Gallery</li>
            <li className="hover:text-gold cursor-pointer transition-colors font-bold uppercase tracking-widest">Enterprise Access</li>
            <li className="hover:text-gold cursor-pointer transition-colors font-bold uppercase tracking-widest">API Docs</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 text-[10px] uppercase tracking-[0.2em]">Company</h4>
          <ul className="space-y-4 text-xs text-slate-500">
            <li className="hover:text-gold cursor-pointer transition-colors font-bold uppercase tracking-widest">Our Thesis</li>
            <li className="hover:text-gold cursor-pointer transition-colors font-bold uppercase tracking-widest">Curated Press</li>
            <li className="hover:text-gold cursor-pointer transition-colors font-bold uppercase tracking-widest">Careers</li>
            <li onClick={() => window.location.hash = 'support'} className="hover:text-gold cursor-pointer transition-colors font-bold uppercase tracking-widest">Concierge Support</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 text-[10px] uppercase tracking-[0.2em]">Intelligence Brief</h4>
          <p className="text-slate-500 text-xs mb-6 leading-relaxed">Join 20,000+ architects receiving our weekly neural rendering insights.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Identity email" 
              className="bg-white/5 border border-white/10 rounded-full px-5 py-3 text-xs w-full focus:outline-none focus:border-gold text-white transition-colors"
            />
            <button className="bg-white text-black px-6 py-3 rounded-full text-xs font-bold hover:bg-gold hover:text-white transition-all uppercase tracking-widest">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
        <p>© 2024 {APP_NAME}. Neural Design Protocol v4.2</p>
        <div className="flex gap-8">
          <span className="hover:text-white cursor-pointer transition-colors">Privacy Charter</span>
          <span className="hover:text-white cursor-pointer transition-colors">Ethics Agreement</span>
          <span className="hover:text-white cursor-pointer transition-colors">Compliance</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
