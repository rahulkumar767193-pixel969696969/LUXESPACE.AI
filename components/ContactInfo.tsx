
import React from 'react';
import SocialMediaIcons from './SocialMediaIcons';

const ContactInfo: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h3 className="text-gold text-[10px] font-bold uppercase tracking-[0.2em]">Contact Channels</h3>
        <div className="space-y-4">
          <a href="mailto:support@aiinteriordesign.com" className="flex items-center gap-4 group">
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
