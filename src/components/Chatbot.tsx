'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, X, MessageSquare, Sparkles, Loader2, Info, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isRAG?: boolean;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am your AI Campus Brain. Ask me anything about university life, policies, or technical help!',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: inputValue })
      });
      const data = await res.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.text,
        sender: 'bot',
        timestamp: new Date(),
        isRAG: data.isRAG,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting. Please ensure your OpenAI key is configured.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 40, filter: 'blur(10px)' }}
            className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-[22rem] sm:w-[28rem] flex flex-col overflow-hidden border border-slate-100 mb-6"
          >
            {/* Header */}
            <div className="bg-slate-900 p-8 text-white flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 blur-[60px] rounded-full" />
              </div>
              
              <div className="flex items-center space-x-4 relative z-10">
                <div className="bg-indigo-500 p-2.5 rounded-2xl shadow-lg shadow-indigo-500/20">
                  <Brain size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-black text-base tracking-tight leading-none">Campus Brain</h3>
                  <div className="flex items-center space-x-2 mt-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GPT-3.5 Turbo Active</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-white/10 hover:bg-white/20 p-2.5 rounded-xl transition-all border border-white/5 relative z-10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-8 h-[32rem] overflow-y-auto bg-slate-50/30 space-y-8 scrollbar-hide">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[90%] p-5 rounded-[2rem] text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-slate-900 text-white rounded-tr-none shadow-xl shadow-slate-900/10'
                        : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3 opacity-40">
                      <div className="flex items-center space-x-2">
                        {msg.sender === 'bot' ? <Bot size={12} /> : <User size={12} />}
                        <span className="text-[9px] font-black uppercase tracking-widest">
                          {msg.sender === 'bot' ? 'Brain' : 'You'}
                        </span>
                      </div>
                    </div>
                    <div className="font-medium">{msg.text}</div>
                    {msg.isRAG && (
                      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center space-x-2">
                        <div className="bg-indigo-50 p-1 rounded-md">
                          <Info size={10} className="text-indigo-500" />
                        </div>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Verified Campus Data</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-5 rounded-[2rem] rounded-tl-none shadow-sm border border-slate-100 flex items-center space-x-3">
                    <Loader2 size={18} className="text-indigo-500 animate-spin" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-8 bg-white border-t border-slate-50">
              <div className="flex items-center space-x-3 bg-slate-50 border border-slate-100 rounded-2xl p-2.5 pl-5 focus-within:ring-4 focus-within:ring-indigo-500/5 focus-within:bg-white focus-within:border-indigo-500/20 transition-all">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Query the campus brain..."
                  className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-800 font-medium placeholder:text-slate-400"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className={`p-3 rounded-xl transition-all shadow-lg ${
                    inputValue.trim() && !isTyping
                      ? 'bg-slate-900 text-white hover:bg-indigo-600'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-900 text-white w-16 h-16 rounded-[1.8rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] flex items-center justify-center relative z-50 group hover:bg-indigo-600 transition-colors"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="relative">
              <MessageSquare size={28} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-400 rounded-full border-2 border-slate-900 group-hover:border-indigo-600" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
