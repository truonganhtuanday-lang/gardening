/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

interface AssistantProps {
  systemInstruction?: string;
}

const Assistant: React.FC<AssistantProps> = ({ systemInstruction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to Josh Jones Gardening. I am the lead consultant. How may I assist with your estate today?', timestamp: Date.now() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await sendMessageToGemini(history, userMsg.text, systemInstruction);
      const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <a 
        href="https://wa.me/16045550192" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#F2F4F0] text-[#1B2616] w-[50px] h-[50px] flex items-center justify-center rounded-full shadow-2xl border border-[#1B2616]/10 hover:border-[#25D366]/50 hover:text-[#25D366] transition-all duration-300 group hover:scale-110"
        aria-label="Contact on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      <div className="fixed bottom-8 right-24 z-50 flex flex-col items-end">
        {isOpen && (
          <div className="bg-[#F2F4F0] rounded-sm shadow-2xl w-[90vw] sm:w-[380px] h-[500px] mb-6 flex flex-col overflow-hidden border border-[#D9D4CC] animate-fade-in-up">
            <div className="bg-[#1B2616] p-5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="font-serif italic text-white text-lg">Consultant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white/50" ref={scrollRef}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[#1B2616] text-white' : 'bg-white border border-[#D9D4CC] text-[#1B2616]'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isThinking && (
                 <div className="flex justify-start">
                   <div className="bg-white border border-[#D9D4CC] p-4 flex gap-1 items-center">
                     <div className="w-1.5 h-1.5 bg-[#4A5B63] rounded-full animate-bounce"></div>
                     <div className="w-1.5 h-1.5 bg-[#4A5B63] rounded-full animate-bounce delay-75"></div>
                     <div className="w-1.5 h-1.5 bg-[#4A5B63] rounded-full animate-bounce delay-150"></div>
                   </div>
                 </div>
              )}
            </div>

            <div className="p-5 bg-white border-t border-[#D9D4CC]">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about our services..." 
                  className="flex-1 bg-transparent border-b border-[#D9D4CC] py-2 text-sm outline-none focus:border-[#1B2616] transition-colors placeholder-[#4A5B63]/40"
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isThinking}
                  className="text-[#1B2616] hover:opacity-60 transition-opacity disabled:opacity-30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#1B2616] text-white w-[50px] h-[50px] flex items-center justify-center rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
          aria-label="Toggle AI Consultant"
        >
          {isOpen ? (
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 100 100" className="fill-current" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M50 10 C27.9 10, 10 27.9, 10 50 C10 72.1, 27.9 90, 50 90 C72.1 90, 90 72.1, 90 50 C90 27.9, 72.1 10, 50 10 Z"
                stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"
              />
              <path
                d="M50 32 C40 32, 32 40, 32 50 C32 61, 40 70, 50 74 C50 60, 50 46, 50 32 Z"
                stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"
              />
              <path
                d="M50 32 C60 32, 68 40, 68 50 C68 61, 60 70, 50 74 C50 60, 50 46, 50 32 Z"
                stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"
              />
              <path d="M50 32 L50 74" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M38 78 C44 76, 56 76, 62 78" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
};

export default Assistant;
