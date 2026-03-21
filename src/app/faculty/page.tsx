'use client';

import React, { useState } from 'react';
import { 
  Users, 
  BarChart3, 
  Calendar, 
  ShieldCheck, 
  TrendingUp, 
  ChevronRight,
  UserCheck,
  Award,
  Clock,
  Briefcase,
  Sparkles,
  AlertCircle,
  Plus,
  ArrowRight,
  BookOpen,
  Activity,
  Zap,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const classData = [
  { id: 1, name: 'Advanced Machine Learning', code: 'CS301', students: 120, attendance: '92%', passRate: 94, color: 'from-indigo-500 to-violet-500' },
  { id: 2, name: 'Data Structures & Algorithms', code: 'CS202', students: 150, attendance: '85%', passRate: 88, color: 'from-violet-500 to-rose-500' },
  { id: 3, name: 'Database Management Systems', code: 'CS205', students: 95, attendance: '80%', passRate: 72, color: 'from-emerald-500 to-teal-500' },
];

const pendingTasks = [
  { id: 1, title: 'Grade Mid-term Papers', deadline: 'Today, 5:00 PM', priority: 'High', category: 'Grading' },
  { id: 2, title: 'Update Course Material', deadline: 'Tomorrow', priority: 'Medium', category: 'Curriculum' },
  { id: 3, title: 'Faculty Meeting', deadline: 'Mar 25', priority: 'Low', category: 'Meeting' },
];

const notifications = [
  { id: 1, message: '3 students are at risk in CS205', type: 'alert', time: '1h ago' },
  { id: 2, message: 'New peer matching request approved', type: 'info', time: '3h ago' },
  { id: 3, message: 'Attendance report generated for CS301', type: 'success', time: '5h ago' },
];

export default function FacultyDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black tracking-tight text-slate-900"
          >
            Faculty <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Dashboard</span>
          </motion.h1>
          <p className="text-slate-500 font-medium mt-1">Manage your classes, track student performance, and view your schedule.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white border border-slate-200 p-2 rounded-2xl flex items-center space-x-1 shadow-sm">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('schedule')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'schedule' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total Students', value: '365', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50/50' },
          { label: 'Avg Attendance', value: '86%', icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
          { label: 'Avg Pass Rate', value: '84.6%', icon: Award, color: 'text-amber-600', bg: 'bg-amber-50/50' },
          { label: 'Pending Grades', value: '42', icon: FileText, color: 'text-rose-600', bg: 'bg-rose-50/50' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className={`w-14 h-14 ${stat.bg} rounded-[1.2rem] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Classes Section */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-600 p-2.5 rounded-2xl text-white">
                  <BookOpen size={22} />
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Active Classes</h2>
              </div>
              <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center">
                View All <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
            
            <div className="p-8 grid gap-6">
              {classData.map((cls) => (
                <motion.div 
                  key={cls.id}
                  whileHover={{ x: 10 }}
                  className="p-6 rounded-[2rem] bg-slate-50/50 border border-slate-100 flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center space-x-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cls.color} flex items-center justify-center text-white shadow-lg`}>
                      <span className="text-xl font-black">{cls.code}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900">{cls.name}</h4>
                      <p className="text-xs font-medium text-slate-500 mt-1">{cls.students} Students • {cls.attendance} Attendance</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Pass Rate</p>
                      <p className="text-lg font-black text-slate-900">{cls.passRate}%</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-300 group-hover:text-indigo-600 transition-colors shadow-sm">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Performance Insight */}
          <section className="p-10 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full -mr-20 -mt-20 group-hover:bg-indigo-600/30 transition-colors duration-700" />
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-indigo-500/20 p-2 rounded-xl text-indigo-400">
                  <Sparkles size={20} />
                </div>
                <h3 className="text-lg font-black tracking-tight">AI Insights</h3>
              </div>
              <p className="text-slate-300 font-medium leading-relaxed mb-8 max-w-lg">
                Your class <span className="text-white font-bold">CS202</span> has shown a 12% increase in peer matching activity this week. 
                Consider assigning Sarah Johnson as a mentor for the upcoming lab session.
              </p>
              <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-white/10">
                View detailed report
              </button>
            </div>
          </section>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-10">
          {/* Notifications */}
          <section className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-8">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.1em] mb-8">Pulse</h2>
            <div className="space-y-6">
              {notifications.map((note) => (
                <div key={note.id} className="flex space-x-4">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    note.type === 'alert' ? 'bg-rose-500 animate-pulse' : note.type === 'success' ? 'bg-emerald-500' : 'bg-indigo-500'
                  }`} />
                  <div>
                    <p className="text-xs font-bold text-slate-900 leading-tight mb-1">{note.message}</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase">{note.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tasks */}
          <section className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.1em]">To-Do</h2>
              <button className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all">
                <Plus size={18} />
              </button>
            </div>
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <div key={task.id} className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100 group cursor-pointer hover:border-indigo-100 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                      task.priority === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-indigo-100 text-indigo-600'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-[10px] font-black text-slate-400">{task.deadline}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{task.title}</h4>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
