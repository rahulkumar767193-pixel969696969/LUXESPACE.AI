
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { DesignResult } from '../types';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

interface ChatWidgetProps {
  currentDesign?: DesignResult | null;
}

const STORAGE_KEY = 'luxespace_chat_v2';

const ChatWidget: React.FC<ChatWidgetProps> = ({ currentDesign }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        } else {
          loadWelcomeMessage();
        }
      } catch (e) {
        console.error("Failed to parse chat history", e);
        loadWelcomeMessage();
      }
    } else {
      loadWelcomeMessage();
    }
  }, []);

  // Save history on change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const loadWelcomeMessage = () => {
    setMessages([{
      text: "Greetings. I am the LuxeSpace Neural Concierge. I have access to world-class architectural principles and your current design context. How can I refine your vision today?",
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const clearHistory = () => {
    if (confirm("Clear all architectural dialogue history?")) {
      localStorage.removeItem(STORAGE_KEY);
      loadWelcomeMessage();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg: Message = {
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let systemInstruction = "You are the LuxeSpace Neural Concierge, an elite interior design AI. Your tone is sophisticated, architectural, and helpful. You provide specific, professional advice on materials, spatial flow, and lighting.";
      
      if (currentDesign) {
        systemInstruction += `\n\nCURRENT CONTEXT: The user is currently viewing a ${currentDesign.style} ${currentDesign.roomType}. The palette includes: ${currentDesign.palette.join(', ')}. Recommendations already provided: ${currentDesign.recommendations.join('; ')}.`;
      }

      const chatHistory = messages.slice(-6).map(m => 
        `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.text}`
      ).join('\n');

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Previous Conversation:\n${chatHistory}\n\nUser: ${currentInput}`,
        config: {
          systemInstruction,
          temperature: 0.7,
          topP: 0.9,
        },
      });

      const botText = response.text || "I apologize, my architectural synthesis engine encountered a momentary lapse. Please rephrase your query.";
      
      const botMsg: Message = {
        text: botText,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, {
        text: "My connection to the design cloud is unstable. Please check your network or try again shortly.",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      <div className={`mb-4 w-80 md:w-[400px] rounded-[2.5rem] bg-obsidian border border-white/10 shadow-2xl transition-all duration-500 overflow-hidden flex flex-col ${isOpen ? 'opacity-100 scale-100 translate-y-0 h-[550px]' : 'opacity-0 scale-95 translate-y-10 pointer-events-none h-0'}`}>
        <div className="p-6 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse shadow-[0_0_10px_#D4AF37]"></div>
             <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Neural Concierge</span>
                <span className="text-[8px] font-medium text-slate-500 uppercase tracking-widest">Active & Thinking</span>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={clearHistory}
              title="Clear History"
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-red-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-gradient-to-b from-transparent to-white/[0.02]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-[11px] leading-relaxed shadow-lg ${msg.sender === 'user' ? 'bg-gold text-black rounded-tr-none font-medium' : 'bg-white/5 text-slate-300 border border-white/10 rounded-tl-none'}`}>
                {msg.text}
              </div>
              <span className="text-[7px] text-slate-600 mt-2 font-bold uppercase tracking-widest px-2">{msg.time}</span>
            </div>
          ))}
          {isTyping && (
            <div className="flex flex-col items-start animate-fade-in">
              <div className="flex gap-1.5 p-4 bg-white/5 rounded-2xl rounded-tl-none border border-white/10 w-20 justify-center">
                 <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce"></div>
                 <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce delay-150"></div>
                 <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce delay-300"></div>
              </div>
              <span className="text-[7px] text-gold/50 mt-2 font-bold uppercase tracking-widest px-2">Synthesizing response...</span>
            </div>
          )}
        </div>

        {/* Design Context Indicator */}
        {currentDesign && (
          <div className="px-6 py-2 bg-gold/5 border-t border-white/5 flex items-center justify-between">
            <span className="text-[7px] font-bold uppercase tracking-widest text-gold/60">Context: {currentDesign.style} {currentDesign.roomType}</span>
            <div className="flex gap-1">
              {currentDesign.palette.slice(0, 3).map((c, i) => (
                <div key={i} className="w-2 h-2 rounded-full border border-white/10" style={{ backgroundColor: c }}></div>
              ))}
            </div>
          </div>
        )}

        <div className="p-6 bg-[#0E0E0E] border-t border-white/10 flex gap-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about materials, lighting, or layout..."
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xs text-white placeholder:text-slate-700 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all"
            disabled={isTyping}
          />
          <button 
            onClick={handleSend} 
            disabled={isTyping || !input.trim()}
            className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center hover:bg-gold hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black transition-all shrink-0 shadow-lg active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 group relative z-10 ${isOpen ? 'bg-white text-black rotate-90' : 'bg-gold text-black hover:scale-110 active:scale-95'}`}
      >
        <div className="absolute inset-0 bg-gold rounded-full animate-ping opacity-20 group-hover:opacity-40 transition-opacity"></div>
        <div className="relative z-20">
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
          )}
        </div>
      </button>
    </div>
  );
};

export default ChatWidget;
