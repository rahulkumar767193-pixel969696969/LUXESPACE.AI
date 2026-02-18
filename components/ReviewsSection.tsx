
import React from 'react';

const REVIEWS = [
  {
    name: "Elena Richardson",
    type: "Home Owner",
    text: "LuxeSpace AI literally saved me thousands in design consultations. The Japandi rendering it created for my living room was spot on.",
    img: "https://i.pravatar.cc/150?u=elena",
    rating: 5
  },
  {
    name: "Marcus Thorne",
    type: "Interior Designer",
    text: "As a professional, I use this to quickly prototype spatial flows for my clients. The material accuracy in the AI renders is industry-leading.",
    img: "https://i.pravatar.cc/150?u=marcus",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    type: "Real Estate Agent",
    text: "I use this to virtually stage empty listings. It adds an incredible level of luxury to our marketing materials that physically staging can't match.",
    img: "https://i.pravatar.cc/150?u=sarah",
    rating: 5
  }
];

const ReviewsSection: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Client Perspectives</span>
        <h2 className="text-4xl md:text-5xl font-serif text-white italic">Trusted by Visionaries</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {REVIEWS.map((review, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] flex flex-col items-start transition-all hover:border-white/20 hover:bg-white/10 group">
            <div className="flex gap-1 mb-6">
              {[...Array(review.rating)].map((_, j) => (
                <svg key={j} className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed italic mb-8 flex-grow">"{review.text}"</p>
            
            <div className="flex items-center gap-4 mt-auto">
              <img src={review.img} className="w-12 h-12 rounded-full border border-white/10 grayscale group-hover:grayscale-0 transition-all" alt={review.name} />
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-widest">{review.name}</h4>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{review.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
