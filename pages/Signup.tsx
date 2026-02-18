
import React, { useState } from 'react';
import { authService } from '../services/authService';
import { User } from '../types';

interface SignupProps {
  onSuccess: (user: User) => void;
  onNavigate: (page: string) => void;
}

const Signup: React.FC<SignupProps> = ({ onSuccess, onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await authService.signup(name, email, password);
      onSuccess(user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 bg-obsidian">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif text-white mb-4 italic">Begin journey.</h1>
          <p className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Join the elite network of digital architects.</p>
        </div>

        <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Full Designation</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Arthur Morgan"
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-gold transition-all text-white placeholder:text-slate-600"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Email Identity</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@architect.com"
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-gold transition-all text-white placeholder:text-slate-600"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Access Key</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 characters"
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-gold transition-all text-white placeholder:text-slate-600"
              />
            </div>
            
            {error && <p className="text-red-400 text-[10px] uppercase font-bold tracking-widest bg-red-950/20 p-4 rounded-xl border border-red-500/20">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white text-black py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-slate-200 transition-all disabled:opacity-50"
            >
              {loading ? 'Initializing...' : 'Establish Account'}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">
              Existing member? {' '}
              <button 
                onClick={() => onNavigate('login')}
                className="text-gold font-bold hover:underline"
              >
                Authenticate
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
