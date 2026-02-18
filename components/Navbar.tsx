
import React from 'react';
import { APP_NAME } from '../constants';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onNavigate, currentPage }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-obsidian/80 backdrop-blur-md h-20 flex items-center px-6 md:px-12 justify-between transition-colors border-b border-white/5">
      <div 
        className="flex items-center gap-3 cursor-pointer group" 
        onClick={() => onNavigate('home')}
      >
        <div className="relative w-10 h-10 bg-obsidian border border-gold/30 rounded-lg flex items-center justify-center text-gold transition-transform group-hover:scale-105 group-hover:rotate-3 shadow-lg">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2zM12 15.5l-4.5 2 4.5-11 4.5 11-4.5-2z" />
          </svg>
        </div>
        <div className="flex flex-col -space-y-1">
          <span className="text-xl font-bold tracking-tighter text-white uppercase italic">LuxeSpace</span>
          <span className="text-[7px] font-bold uppercase tracking-[0.4em] text-gold/60">Neural Design</span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-10 text-sm font-medium">
        <button 
          onClick={() => onNavigate('home')}
          className={`${currentPage === 'home' ? 'text-gold' : 'text-slate-400 hover:text-white'} transition-colors uppercase tracking-widest text-[11px] font-bold`}
        >
          Home
        </button>
        <button 
          onClick={() => onNavigate('dashboard')}
          className={`${currentPage === 'dashboard' ? 'text-gold' : 'text-slate-400 hover:text-white'} transition-colors uppercase tracking-widest text-[11px] font-bold`}
        >
          Design Studio
        </button>
        {user && (
          <button 
            onClick={() => onNavigate('history')}
            className={`${currentPage === 'history' ? 'text-gold' : 'text-slate-400 hover:text-white'} transition-colors uppercase tracking-widest text-[11px] font-bold`}
          >
            My Gallery
          </button>
        )}
        <button 
          onClick={() => onNavigate('support')}
          className={`${currentPage === 'support' ? 'text-gold' : 'text-slate-400 hover:text-white'} transition-colors uppercase tracking-widest text-[11px] font-bold`}
        >
          Support
        </button>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Active Member</span>
              <span className="text-[10px] text-white font-bold uppercase tracking-widest">Hi, {user.name}</span>
            </div>
            <button 
              onClick={onLogout}
              className="px-4 py-2 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:border-white/20 transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex gap-6 items-center">
            <button 
              onClick={() => onNavigate('login')}
              className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => onNavigate('signup')}
              className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-white transition-all shadow-sm"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
