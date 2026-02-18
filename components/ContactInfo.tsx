
import React from 'react';
import SocialMediaIcons from './SocialMediaIcons';

const ContactInfo: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h3 className="text-gold text-[10px] font-bold uppercase tracking-[0.2em]">Contact Channels</h3>
        <div className="space-y-4">
          <a href="mailto:support@luxespace.ai" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-gold transition-colors text-slate-400 group-hover:text-gold">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <div>
              <span className="block text-[8px] text-slate-500 font-bold uppercase tracking-widest">Email</span>
              <span className="text-white text-sm font-medium">support@luxespace.ai</span>
            </div>
          </a>
          
          <a href="tel:+18001234567" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-gold transition-colors text-slate-400 group-hover:text-gold">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <span className="block text-[8px] text-slate-500 font-bold uppercase tracking-widest">Hotline</span>
              <span className="text-white text-sm font-medium">+1 800 123 4567</span>
            </div>
          </a>

          {/* New Instagram Contact Row */}
          <a href="https://www.instagram.com/__heart_._chilling___/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-gold transition-colors text-slate-400 group-hover:text-gold">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div>
              <span className="block text-[8px] text-slate-500 font-bold uppercase tracking-widest">Instagram</span>
              <span className="text-white text-sm font-medium">@__heart_._chilling___</span>
            </div>
          </a>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-gold text-[10px] font-bold uppercase tracking-[0.2em]">Operational Hours</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Monday — Friday: 9am - 6pm EST<br />
          Saturday: 10am - 4pm EST<br />
          Sunday: Closed for maintenance
        </p>
      </div>

      <div className="space-y-4 pt-6 border-t border-white/5">
        <h3 className="text-gold text-[10px] font-bold uppercase tracking-[0.2em]">Follow Our Process</h3>
        <SocialMediaIcons />
      </div>
    </div>
  );
};

export default ContactInfo;
