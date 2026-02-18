
import React, { useState } from 'react';
import ContactInfo from '../components/ContactInfo';

const FAQS = [
  {
    q: "How accurate are the material renders?",
    a: "Our neural engine uses high-fidelity texture synthesis mapped from real-world photography. Accuracy is roughly 94% for textures and 98% for spatial dimensions."
  },
  {
    q: "Can I export designs for architectural software?",
    a: "Yes, our 'Export Portfolio Assets' feature allows you to download high-resolution PNGs and depth maps compatible with most professional design suites."
  },
  {
    q: "Why did my generation result in an 'unknown environment'?",
    a: "This typically occurs when the source image is too low-light or lacks clear spatial boundaries. Ensure your camera is steady and the room is well-lit."
  },
  {
    q: "What is the policy on commercial usage?",
    a: "Members of our Elite tier have full commercial rights. Basic users are restricted to personal portfolio use only."
  }
];

const CATEGORIES = [
  { icon: "🔑", title: "Access Issues", desc: "Problems with login, password resets, or authentication keys." },
  { icon: "🎨", title: "AI Design Support", desc: "Inquiries about style accuracy or specific generation errors." },
  { icon: "💳", title: "Subscription", desc: "Billing, tier upgrades, and invoice management." },
  { icon: "🛠️", title: "Technical Support", desc: "Platform performance, bug reporting, and device compatibility." }
];

const Support: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-left mb-20 animate-fade-in">
          {/* Custom Concierge Brand Mark for Support Page */}
          <div className="flex flex-col gap-6 mb-12">
            <div className="flex items-center gap-5">
              <div className="relative group">
                {/* Multi-layered glow for depth */}
                <div className="absolute -inset-1 bg-gradient-to-r from-gold to-yellow-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="absolute -inset-4 bg-gold/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                
                <div className="relative w-20 h-20 bg-obsidian border border-gold/30 rounded-2xl flex items-center justify-center text-gold shadow-2xl transition-transform group-hover:scale-105 duration-500">
                  {/* Stylized Help/Concierge Mark combining Brand A and Info Bell */}
                  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current" xmlns="http://www.w3.org/2000/svg">
                    {/* Architectural Bell/Shield background */}
                    <path d="M12 2C8 2 4 5 4 10v4l-2 2v1h20v-1l-2-2v-4c0-5-4-8-8-8z" className="opacity-10" />
                    {/* Integrated Brand 'A' shape */}
                    <path d="M12 4l-4 14.5.7.5 3.3-3.5 3.3 3.5.7-.5L12 4z" />
                    {/* Concierge 'i' Detail */}
                    <circle cx="12" cy="11" r="1.5" className="animate-pulse" />
                    <rect x="11.25" y="13.5" width="1.5" height="4" rx="0.5" className="opacity-80" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold tracking-tighter text-white uppercase italic">Concierge</h2>
                  <span className="px-2 py-0.5 rounded-md bg-gold/10 text-gold text-[8px] font-bold uppercase tracking-widest border border-gold/20">Protocol</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-px w-8 bg-gold/50"></div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-500">LuxeSpace Support Tier</span>
                </div>
              </div>
            </div>
            
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-gold/5 border border-gold/20 w-fit backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></div>
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-gold">Neural Engineer Online</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 italic tracking-tight">How may we guide <span className="text-gold">your vision?</span></h1>
          <p className="text-slate-400 max-w-2xl text-lg leading-relaxed font-light">
            Whether you're troubleshooting a spatial render or seeking architectural advice, our specialized concierge team is dedicated to your design excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-20">
            {/* Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {CATEGORIES.map((cat, i) => (
                <button key={i} className="text-left p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-white/[0.07] transition-all group shadow-xl hover:-translate-y-1 duration-300">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block grayscale group-hover:grayscale-0">{cat.icon}</div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-gold transition-colors">{cat.title}</h4>
                  <p className="text-slate-500 text-[10px] leading-relaxed font-bold uppercase tracking-widest">{cat.desc}</p>
                </button>
              ))}
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-2xl font-serif text-white italic">Intelligence Repository</h3>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>
              
              {FAQS.map((faq, i) => (
                <div key={i} className="border-b border-white/10 pb-6 group">
                  <button 
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex justify-between items-center text-left py-4 hover:text-gold transition-colors"
                  >
                    <span className="text-lg text-white font-medium group-hover:text-gold transition-colors flex items-center gap-4">
                      <span className="text-[10px] text-gold/40 font-mono">0{i+1}</span>
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${openIndex === i ? 'rotate-45 border-gold text-gold' : 'group-hover:border-white/30'}`}>
                      <span className="text-xl">+</span>
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-slate-400 text-sm leading-relaxed py-4 pl-10 pr-12 font-light border-l border-gold/20 ml-5">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-1">
             <div className="sticky top-32 p-10 rounded-[3rem] bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md">
                <div className="mb-8 pb-8 border-b border-white/5">
                  <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-2">Direct Channel</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                    Premium and Enterprise members receive priority bandwidth for all technical inquiries.
                  </p>
                </div>
                <ContactInfo />
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Support;
