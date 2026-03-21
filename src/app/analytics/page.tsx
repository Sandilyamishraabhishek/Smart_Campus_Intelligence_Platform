'use client';

import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  Activity, 
  Zap, 
  Clock, 
  ChevronRight,
  Target,
  Search,
  Filter,
  ArrowUpRight,
  ShieldAlert,
  PieChart,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

const engagementMetrics = [
  { label: 'Participation', value: '92%', trend: '+5%', color: 'text-indigo-600', bg: 'bg-indigo-50/50' },
  { label: 'Content Consumption', value: '78%', trend: '+12%', color: 'text-violet-600', bg: 'bg-violet-50/50' },
  { label: 'Peer Interaction', value: '65%', trend: '-2%', color: 'text-rose-600', bg: 'bg-rose-50/50' },
  { label: 'Resource Access', value: '84%', trend: '+8%', color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
];

const atRiskStudents = [
  { id: 1, name: 'John Doe', course: 'CS301', reason: 'Low attendance (65%)', risk: 'Medium', color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 2, name: 'Jane Smith', course: 'CS202', reason: 'Declining quiz scores', risk: 'High', color: 'text-rose-600', bg: 'bg-rose-50' },
  { id: 3, name: 'Michael Brown', course: 'CS205', reason: 'No LMS activity for 10 days', risk: 'Low', color: 'text-indigo-600', bg: 'bg-indigo-50' },
];

const activityTimeline = [
  { id: 1, event: 'Course Material Accessed', time: '2 hours ago', detail: 'Advanced ML Week 8', icon: Activity, color: 'text-indigo-500' },
  { id: 2, event: 'Quiz Completed', time: '5 hours ago', detail: 'Data Structures - Mock Test', icon: Zap, color: 'text-violet-500' },
  { id: 3, event: 'Forum Post Created', time: 'Yesterday', detail: 'Discussion on SQL Optimization', icon: TrendingUp, color: 'text-emerald-500' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black tracking-tight text-slate-900"
          >
            Predictive <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Analytics</span>
          </motion.h1>
          <p className="text-slate-500 font-medium mt-1">AI-driven macro-view of campus health and student engagement.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <select className="bg-white border border-slate-200 pl-12 pr-10 py-3.5 rounded-2xl text-sm font-black uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 shadow-sm transition-all appearance-none cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Current Term</option>
            </select>
          </div>
          <button className="gradient-primary text-white p-3.5 rounded-2xl hover:scale-110 transition-all shadow-xl shadow-indigo-500/20">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Engagement Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {engagementMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-200/50 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group cursor-default"
          >
            <div className={`w-14 h-14 ${metric.bg} rounded-[1.2rem] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
              <BarChart3 className={metric.color} size={24} />
            </div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2">{metric.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-black text-slate-900">{metric.value}</h3>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-[10px] font-black ${metric.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {metric.trend.startsWith('+') ? <TrendingUp size={12} /> : <ShieldAlert size={12} />}
                <span>{metric.trend}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Engagement Trends Chart (Mock) */}
        <section className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-200/50 shadow-sm overflow-hidden p-10 group">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6 mb-12">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Engagement Overview</h2>
              <p className="text-sm text-slate-500 font-medium">Daily active participation across all campus modules.</p>
            </div>
            <div className="flex items-center space-x-4 bg-slate-50 p-2 rounded-2xl border border-slate-100 shadow-inner">
              <div className="flex items-center space-x-2 px-3">
                <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active</span>
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <div className="flex items-center space-x-2 px-3">
                <div className="w-2 h-2 bg-slate-200 rounded-full" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Idle</span>
              </div>
            </div>
          </div>
          
          <div className="h-72 flex items-end justify-between gap-3 px-2">
            {[45, 62, 85, 54, 78, 92, 70, 65, 80, 55, 60, 95].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group/bar">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${val}%` }}
                  transition={{ delay: i * 0.05, duration: 1, ease: "easeOut" }}
                  className="w-full bg-slate-50 rounded-2xl relative overflow-hidden group-hover/bar:bg-indigo-50 transition-colors"
                >
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: '100%' }}
                    transition={{ delay: i * 0.05 + 0.5, duration: 1 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-600 to-violet-500 rounded-2xl shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/bar:opacity-100 transition-opacity z-10">
                    <span className="text-[10px] font-black text-white rotate-90">{val}%</span>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-8 px-2 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
            <span>Jan</span>
            <span>Mar</span>
            <span>May</span>
            <span>Jul</span>
            <span>Sep</span>
            <span>Nov</span>
          </div>
        </section>

        {/* Predictive Alert Widget */}
        <div className="space-y-10">
          <section className="bg-rose-50 rounded-[2.5rem] p-8 border border-rose-100 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-rose-600 shadow-xl shadow-rose-500/10 group-hover:scale-110 transition-transform">
                    <AlertTriangle size={24} />
                  </div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Risk Alerts</h2>
                </div>
                <div className="bg-rose-100 text-rose-700 text-[10px] font-black px-2 py-1 rounded-lg">3 NEW</div>
              </div>
              
              <div className="space-y-4">
                {atRiskStudents.map((student) => (
                  <motion.div 
                    key={student.id} 
                    whileHover={{ x: 5 }}
                    className="bg-white p-5 rounded-[1.8rem] border border-rose-100/50 shadow-sm hover:shadow-xl hover:shadow-rose-500/5 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-sm font-black text-slate-900 leading-none">{student.name}</h3>
                      <span className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest ${
                        student.risk === 'High' ? 'bg-rose-100 text-rose-700' : 
                        student.risk === 'Medium' ? 'bg-orange-100 text-orange-700' : 
                        'bg-indigo-100 text-indigo-700'
                      }`}>
                        {student.risk}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium mb-4 leading-relaxed">{student.course} • {student.reason}</p>
                    <button className="w-full py-2.5 bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-rose-600 hover:text-white transition-all">
                      Intervene
                    </button>
                  </motion.div>
                ))}
              </div>
              <button className="w-full mt-8 py-4 bg-white text-rose-600 text-xs font-black uppercase tracking-widest rounded-2xl border border-rose-100 hover:bg-rose-100 transition-all shadow-sm">
                AI Full Report
              </button>
            </div>
            {/* Abstract Shape */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/20 rounded-full blur-3xl -mr-10 -mt-10" />
          </section>

          {/* Activity Timeline */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200/50 shadow-sm overflow-hidden p-8 group">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center space-x-3">
                <div className="bg-indigo-600 p-2 rounded-xl text-white">
                  <Clock size={18} />
                </div>
                <span>Live Feed</span>
              </h2>
              <button className="text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:underline">Refresh</button>
            </div>
            
            <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
              {activityTimeline.map((item, index) => (
                <div key={item.id} className="relative pl-10 group/item">
                  <div className={`absolute left-0 top-1 w-6 h-6 rounded-lg bg-white border-2 border-slate-100 flex items-center justify-center z-10 group-hover/item:border-indigo-600 transition-colors shadow-sm`}>
                    <item.icon size={12} className={item.color} />
                  </div>
                  <p className="text-xs font-black text-slate-900 mb-1 group-hover/item:text-indigo-600 transition-colors">{item.event}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mb-1">{item.time}</p>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
