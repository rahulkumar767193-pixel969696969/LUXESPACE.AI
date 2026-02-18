
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { DesignResult } from '../types';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

interface ChatWidgetProps {
  currentDesign?: DesignResult | null;
}

const STORAGE_KEY = 'luxespace_neural_chat_v1';

const QUICK_IDEAS = [
  "Discuss spatial syntax",
  "Biophilic integration",
  "Material honesty study",
  "Parametric lighting"
];

const ChatWidget: React.FC<ChatWidgetProps> = ({ currentDesign }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage on initial mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        } else {
          loadWelcomeMessage();
        }
      } catch (err) {
        console.error("Error parsing chat history:", err);
        loadWelcomeMessage();
      }
    } else {
      loadWelcomeMessage();
    }
  }, []);

  // Persist messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
    // Auto-scroll to bottom of chat
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const loadWelcomeMessage = () => {
    const baseWelcome = "Welcome to the LuxeSpace Architectural Intelligence Suite. I am your Senior Design Concierge.";
    const designSpecific = currentDesign 
      ? ` I see we are currently exploring a ${currentDesign.style} ${currentDesign.roomType}. How shall we further refine this vision?`
      : " Whether we are discussing the nuanced interplay of shadow and form or the tectonic integrity of your material palette, I am here to curate your spatial vision. How shall we interrogate your environment today?";
    
    setMessages([{
      text: baseWelcome + designSpecific,
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const clearHistory = () => {
    if (window.confirm("Purge architectural dialogue history? This action cannot be undone.")) {
      localStorage.removeItem(STORAGE_KEY);
      loadWelcomeMessage();
    }
  };

  const handleSend = async (customInput?: string) => {
    const textToSend = customInput || input;
    if (!textToSend.trim() || isTyping) return;
    
    const userMessage: Message = {
      text: textToSend,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    if (!customInput) setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // PREPEND context if currentDesign exists
      let designContext = "";
      if (currentDesign) {
        designContext = `DESIGN CONTEXT (MANDATORY): The user is currently engaged with a ${currentDesign.style} ${currentDesign.roomType} design. 
        Palette: ${currentDesign.palette.join(', ')}. 
        Existing Recommendations: ${currentDesign.recommendations.join('; ')}. 
        Base your architectural critique and support on these specific parameters.\n\n`;
      }

      const systemInstruction = `${designContext}You are the LuxeSpace Neural Concierge, a world-class architectural and interior design consultant. 
      Your tone is elite, sophisticated, and technically proficient. Use professional terminology such as "spatial syntax," "volumetric flow," "material honesty," "chromatic balance," "tectonic language," "vernacular," and "biophilic integration." 
      You offer deep insights into how architecture shapes human experience. Avoid generic advice; instead, provide evocative, precision-focused critiques and suggestions.`;

      // Convert local message history to Gemini history format
      const history = messages.slice(-12).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const chat: Chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction,
          temperature: 0.75,
        },
        history
      });

      const response = await chat.sendMessage({ message: textToSend });
      const responseText = response.text || "I apologize, my synthesis engine is currently recalibrating its spatial logic. Please restate your architectural inquiry.";
      
      const botMessage: Message = {
        text: responseText,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Neural Consultation Error:", error);
      const errorMessage: Message = {
        text: "The direct uplink to our high-fidelity design servers is temporarily experiencing latency. Please retry your consultation shortly.",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {/* Main Chat Interface */}
      <div className={`mb-6 w-80 md:w-[450px] rounded-[3rem] bg-obsidian border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.7)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden flex flex-col origin-bottom-right ${isOpen ? 'opacity-100 scale-100 translate-y-0 h-[650px]' : 'opacity-0 scale-90 translate-y-12 pointer-events-none h-0'}`}>
        
        {/* Header Section */}
        <div className="p-8 bg-white/[0.03] border-b border-white/5 flex items-center justify-between backdrop-blur-xl">
          <div className="flex items-center gap-4">
             <div className="relative">
                <div className="w-3 h-3 rounded-full bg-gold animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-gold animate-ping opacity-40"></div>
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">Neural Concierge</span>
                <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">Protocol V4.2 ACTIVE</span>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={clearHistory}
              title="Purge History"
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-red-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>

        {/* Conversation Feed */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide bg-gradient-to-b from-transparent to-white/[0.01]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}>
              <div className={`max-w-[85%] p-5 rounded-[1.8rem] text-[11px] leading-relaxed shadow-lg ${msg.sender === 'user' ? 'bg-white text-black rounded-tr-none font-medium' : 'bg-white/[0.04] text-slate-300 border border-white/5 rounded-tl-none'}`}>
                {msg.text}
              </div>
              <span className="text-[6px] text-slate-600 mt-3 font-bold uppercase tracking-[0.2em] px-2">{msg.sender === 'user' ? 'Client' : 'Concierge'} • {msg.time}</span>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex flex-col items-start animate-fade-in">
              <div className="flex gap-2 p-5 bg-white/[0.04] rounded-2xl rounded-tl-none border border-white/5 w-20 justify-center">
                 <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce"></div>
                 <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce delay-150"></div>
                 <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce delay-300"></div>
              </div>
              <span className="text-[6px] text-gold/60 mt-3 font-bold uppercase tracking-[0.2em] px-2">Consulting Knowledge Base...</span>
            </div>
          )}
        </div>

        {/* Active Context Marker */}
        {currentDesign && (
          <div className="px-8 py-3 bg-gold/5 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
              <span className="text-[7px] font-bold uppercase tracking-[0.3em] text-gold/80">Design Target: {currentDesign.roomType} / {currentDesign.style}</span>
            </div>
            <div className="flex gap-1.5">
              {currentDesign.palette.slice(0, 3).map((c, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full border border-white/10" style={{ backgroundColor: c }}></div>
              ))}
            </div>
          </div>
        )}

        {/* Input Interface */}
        <div className="p-8 bg-[#0D0D0D] border-t border-white/5">
          {/* Contextual Suggestions */}
          {!isTyping && (
            <div className="flex flex-wrap gap-2 mb-6">
              {(currentDesign ? ["Explain this palette", "Lighting ideas", "Furniture sourcing", "Material advice"] : QUICK_IDEAS).map(idea => (
                <button 
                  key={idea}
                  onClick={() => handleSend(idea)}
                  className="px-4 py-2 rounded-full border border-white/10 text-[8px] font-bold uppercase tracking-widest text-slate-400 hover:text-gold hover:border-gold transition-all"
                >
                  {idea}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Inquire about architectural style..."
              className="flex-1 bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4 text-[10px] text-white focus:outline-none focus:border-gold/40 transition-all"
              disabled={isTyping}
            />
            <button 
              onClick={() => handleSend()} 
              disabled={isTyping || !input.trim()}
              className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center hover:bg-gold hover:text-white disabled:opacity-10 transition-all shrink-0 shadow-xl active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-[0_24px_48px_-12px_rgba(212,175,55,0.4)] flex items-center justify-center transition-all duration-700 group relative z-10 ${isOpen ? 'bg-white text-black rotate-[135deg]' : 'bg-gold text-black hover:scale-105 active:scale-95'}`}
      >
        <div className="absolute inset-0 bg-gold rounded-full animate-ping opacity-10 group-hover:opacity-20 transition-opacity"></div>
        <div className="relative z-20">
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          )}
        </div>
      </button>
    </div>
  );
};

export default ChatWidget;
