'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Users, 
  Sparkles,
  ChevronRight,
  Tag,
  Bookmark,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Technology', 'Career', 'Lifestyle', 'Art', 'Wellness'];

  useEffect(() => {
    setLoading(true);
    fetch(`/api/events?category=${activeCategory}`)
      .then(res => res.json())
      .then(setEvents)
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const filteredEvents = events.filter(event => {
    const matchesSearch = (event?.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event?.description?.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  // Mock recommendations for UI
  const RECOMMENDED_EVENTS = events.slice(0, 2).map((e, i) => ({
    ...e,
    reason: i === 0 ? 'Based on your interest in coding.' : 'Matches your current enrollment.',
    color: i === 0 ? 'from-indigo-600 to-violet-600' : 'from-violet-600 to-rose-600'
  }));

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-20">
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black tracking-tight text-slate-900"
          >
            Event <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Discovery</span>
          </motion.h1>
          <p className="text-slate-500 font-medium mt-1">Personalized clubs, workshops, and competitions for you.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 max-w-2xl">
          <div className="relative group w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by event name, category, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-slate-200 pl-12 pr-6 py-4 rounded-3xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all w-full shadow-sm"
            />
          </div>
          <button className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-slate-600 hover:text-indigo-600 shrink-0">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* AI Recommendations Section */}
      {!searchQuery && activeCategory === 'All' && !loading && (
        <section className="relative">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-indigo-600 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-200">
              <Sparkles size={22} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Smart Picks for You</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {RECOMMENDED_EVENTS.map((rec, index) => (
              <motion.div 
                key={rec.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative overflow-hidden rounded-[3rem] group cursor-pointer h-72 shadow-2xl shadow-indigo-500/10 border border-white/20`}
              >
                <img src={rec.image} alt={rec.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className={`absolute inset-0 bg-gradient-to-t ${rec.color} opacity-80 group-hover:opacity-90 transition-opacity`} />
                <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-xl border border-white/20 text-[10px] font-black uppercase tracking-widest">Recommended</div>
                  </div>
                  <h3 className="text-3xl font-black mb-3 leading-tight">{rec.title}</h3>
                  <p className="text-indigo-50 text-sm font-medium mb-6 line-clamp-2 max-w-md opacity-90 leading-relaxed">
                    {rec.reason}
                  </p>
                  <div 
                    onClick={() => rec.externalUrl ? window.open(rec.externalUrl, '_blank') : null}
                    className="flex items-center text-xs font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform"
                  >
                    {rec.externalUrl ? 'Go to Website' : 'View Details'} <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Category Filters */}
      <div className="flex items-center space-x-4 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-3.5 rounded-2xl text-sm font-black transition-all shrink-0 uppercase tracking-widest ${
              activeCategory === cat
                ? 'gradient-primary text-white shadow-xl shadow-indigo-500/30 ring-4 ring-indigo-500/10'
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200 shadow-sm'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, index) => (
              <motion.div
                layout
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-[3rem] border border-slate-200/50 shadow-sm overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
              >
                <div className="h-60 relative overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute top-6 left-6 flex space-x-2">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[10px] font-black text-indigo-600 uppercase tracking-widest shadow-xl border border-white/50">
                      {event.type}
                    </span>
                  </div>
                  <button className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-xl border border-white/50 group-hover:scale-110">
                    <Bookmark size={18} />
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <button 
                      onClick={() => event.externalUrl ? window.open(event.externalUrl, '_blank') : null}
                      className="w-full bg-white text-slate-900 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-xl"
                    >
                      {event.externalUrl ? 'Visit Website' : 'Quick Register'}
                    </button>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center space-x-2 text-[10px] text-indigo-600 font-black mb-3 uppercase tracking-[0.2em]">
                    <Tag size={12} />
                    <span>{event.category}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 leading-tight mb-3">
                    {event.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed h-10 mb-8">
                    {event.description}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                      <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                        <Calendar size={14} className="mr-2 text-indigo-500" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                        <MapPin size={14} className="mr-2 text-indigo-500" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-9 h-9 rounded-2xl border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold overflow-hidden shadow-lg group-hover:-translate-y-1 transition-transform" style={{ transitionDelay: `${i * 50}ms` }}>
                          <img src={`https://i.pravatar.cc/100?img=${i + 30}`} alt="User" />
                        </div>
                      ))}
                      <div className="w-9 h-9 rounded-2xl border-4 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-black text-indigo-600 shadow-lg group-hover:-translate-y-1 transition-transform transition-delay-250">
                        +{event.attendees > 99 ? '99' : event.attendees}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Popularity</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <div key={s} className={`w-1 h-3 rounded-full ${s <= 4 ? 'bg-indigo-500' : 'bg-slate-100'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && filteredEvents.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-32 text-center"
        >
          <div className="bg-slate-100 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Search size={32} className="text-slate-300" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">No results found</h3>
          <p className="text-slate-500 font-medium max-w-xs mx-auto mt-2">Try rephrasing your search or changing the filters.</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            className="mt-8 text-indigo-600 font-black uppercase tracking-widest text-xs hover:underline"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
