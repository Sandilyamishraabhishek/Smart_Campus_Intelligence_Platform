'use client';

import React, { useEffect, useState } from 'react';
import { 
  Calendar, 
  GraduationCap, 
  Users, 
  Clock, 
  BookOpen,
  Award,
  Zap,
  ArrowUpRight,
  Search,
  Loader2,
  Map,
  MapPin,
  Signal,
  Navigation,
  Activity,
  Coins,
  ArrowRight,
  Bell,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showRedeem, setShowRedeem] = useState(false);
  const [redeemingItem, setRedeemingItem] = useState<any>(null);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  const { stats, recommendations, upcomingEvents, heatmap, rewards } = data;

  const handleRedeem = (item: any) => {
    setRedeemingItem(item);
    setShowRedeem(true);
    setTimeout(() => {
      setShowRedeem(false);
      setRedeemingItem(null);
    }, 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Welcome back, Abhishek</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-card border border-border pl-10 pr-4 py-2 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/10 w-48 transition-all"
            />
          </div>
          <button className="bg-card p-2.5 rounded-xl border border-border text-slate-400 dark:text-slate-500 hover:text-indigo-600 transition-all relative">
            <Bell size={18} />
            <div className="absolute top-2 right-2 w-2 h-2 bg-rose-500 border-2 border-white rounded-full" />
          </button>
        </div>
      </div>

      {/* Stats Grid - Compact */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat: any) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -2 }}
            className="compact-card p-5 rounded-2xl"
          >
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-xl font-black text-foreground">{stat.value}</h3>
            <div className="mt-3 flex items-center text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
              <TrendingUp size={12} className="mr-1" /> +12% this week
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Section */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Heatmap Section - Compact */}
          <section className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center">
              <h2 className="text-sm font-black text-foreground uppercase tracking-tight">Crowd Heatmap</h2>
              <div className="flex items-center space-x-2 text-[10px] font-black text-indigo-500">
                <Activity size={12} className="animate-pulse" />
                <span>Live</span>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {heatmap.map((place: any) => (
                <div key={place.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors shadow-sm">
                      <MapPin size={16} />
                    </div>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                      place.crowd > 70 ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      {place.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-2">{place.name}</h4>
                  <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        place.crowd > 70 ? 'bg-rose-500' : 'bg-indigo-500'
                      }`}
                      style={{ width: `${place.crowd}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommendations - Refined */}
          <section className="space-y-4">
            <h2 className="text-sm font-black text-foreground uppercase tracking-tight ml-2">Smart Picks</h2>
            <div className="grid gap-3">
              {recommendations.map((item: any) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 rounded-2xl bg-card border border-border hover:border-indigo-100 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                    <Zap size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{item.description}</p>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-slate-50 dark:bg-[#0a0f1c] text-slate-400 dark:text-slate-500 hover:text-indigo-600 transition-all">
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          {/* Rewards - Compact */}
          <section className="bg-card rounded-3xl border border-border shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-black text-foreground uppercase tracking-tight">Vault</h2>
              <div className="flex items-center text-amber-600 space-x-1">
                <Coins size={14} />
                <span className="text-xs font-black">1,240</span>
              </div>
            </div>
            <div className="space-y-4">
              {rewards.map((reward: any) => (
                <div key={reward.id} className="flex items-center justify-between group">
                  <div className="flex items-center space-x-3">
                    <div className="text-xl">{reward.image}</div>
                    <div>
                      <p className="text-xs font-bold text-foreground leading-none">{reward.title}</p>
                      <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase mt-1">{reward.category}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRedeem(reward)}
                    className="text-[9px] font-black text-indigo-600 uppercase hover:underline"
                  >
                    {reward.cost} CC
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline - Simple */}
          <section className="bg-card rounded-3xl border border-border shadow-sm p-6">
            <h2 className="text-sm font-black text-foreground uppercase tracking-tight mb-6">Schedule</h2>
            <div className="space-y-6">
              {upcomingEvents.map((event: any) => (
                <div key={event.id} className="flex space-x-4">
                  <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 w-12 pt-1">{event.time}</div>
                  <div>
                    <p className="text-xs font-bold text-foreground leading-tight mb-1">{event.title}</p>
                    <p className="text-[9px] text-indigo-500 font-black uppercase tracking-widest">{event.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Redemption Toast */}
      <AnimatePresence>
        {showRedeem && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 bg-slate-900 dark:bg-indigo-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-4 z-[100]"
          >
            <div className="bg-emerald-500 p-1.5 rounded-lg"><Award size={16} /></div>
            <p className="text-xs font-bold">Voucher issued for {redeemingItem?.title}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

