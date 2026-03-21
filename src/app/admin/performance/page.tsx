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
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const facultyData = [
  { id: 1, name: 'Dr. Sarah Johnson', subject: 'Machine Learning', passRate: 94, avgGrade: 'A-', students: 120, status: 'Top Performer', color: 'bg-emerald-500' },
  { id: 2, name: 'Prof. Michael Lee', subject: 'Data Structures', passRate: 88, avgGrade: 'B+', students: 150, status: 'On Track', color: 'bg-indigo-500' },
  { id: 3, name: 'Dr. Emily Brown', subject: 'DBMS', passRate: 72, avgGrade: 'C+', students: 95, status: 'Needs Review', color: 'bg-rose-500' },
  { id: 4, name: 'Prof. David Wilson', subject: 'HCI', passRate: 91, avgGrade: 'A', students: 80, status: 'Top Performer', color: 'bg-violet-500' },
];

const duties = [
  { id: 1, faculty: 'Dr. Sarah Johnson', role: 'Exam Invigilator', location: 'Hall A', time: '09:00 AM', date: 'Mar 25' },
  { id: 2, faculty: 'Prof. Michael Lee', role: 'Lab Coordinator', location: 'CS Lab 2', time: '02:00 PM', date: 'Mar 26' },
];

export default function AdminPerformancePage() {
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);
  const [showDutyModal, setShowDutyModal] = useState(false);
  const [showPeerControl, setShowPeerControl] = useState(false);

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
            Admin <span className="bg-gradient-to-r from-rose-600 to-indigo-600 bg-clip-text text-transparent">Governance</span>
          </motion.h1>
          <p className="text-slate-500 font-medium mt-1">Control panel for faculty performance and campus operations.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowPeerControl(true)}
            className="bg-white text-indigo-600 border border-slate-200 px-6 py-4 rounded-[1.5rem] text-sm font-black hover:border-indigo-600 transition-all shadow-xl shadow-indigo-500/5 flex items-center space-x-2"
          >
            <Sparkles size={18} />
            <span>Peer Matching Logic</span>
          </button>
          <button 
            onClick={() => setShowDutyModal(true)}
            className="gradient-primary text-white px-8 py-4 rounded-[1.5rem] text-sm font-black hover:scale-105 transition-all shadow-xl shadow-indigo-500/20 flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Assign Duty</span>
          </button>
        </div>
      </div>

      {/* Faculty Performance Grid */}
      <section className="bg-white rounded-[3rem] border border-slate-200/50 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <div className="flex items-center space-x-3">
            <div className="bg-rose-600 p-2.5 rounded-2xl text-white">
              <BarChart3 size={22} />
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Faculty Performance Index</h2>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span>Filter by Pass Rate</span>
            <ChevronRight size={14} />
          </div>
        </div>
        
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {facultyData.map((faculty, index) => (
            <motion.div 
              key={faculty.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:border-rose-100 hover:shadow-2xl hover:shadow-rose-500/5 transition-all group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                    <img src={`https://i.pravatar.cc/150?u=${faculty.id}`} alt={faculty.name} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-rose-600 transition-colors">{faculty.name}</h3>
                    <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">{faculty.subject}</p>
                  </div>
                </div>
                <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${
                  faculty.passRate > 90 ? 'bg-emerald-100 text-emerald-600' : 
                  faculty.passRate > 80 ? 'bg-indigo-100 text-indigo-600' : 'bg-rose-100 text-rose-600'
                }`}>
                  {faculty.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Pass Rate</p>
                  <p className="text-xl font-black text-slate-900">{faculty.passRate}%</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg Grade</p>
                  <p className="text-xl font-black text-slate-900">{faculty.avgGrade}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Students</p>
                  <p className="text-xl font-black text-slate-900">{faculty.students}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Syllabus Progress</span>
                  <span className="text-slate-900">85%</span>
                </div>
                <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    className={`h-full ${faculty.color} rounded-full`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Schedule & Duty Assignment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <section className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-200/50 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-indigo-50/20">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2.5 rounded-2xl text-white">
                <Briefcase size={22} />
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Active Duty Roster</h2>
            </div>
          </div>
          <div className="p-8 space-y-4">
            {duties.map((duty) => (
              <div key={duty.id} className="flex items-center justify-between p-6 rounded-[2rem] border border-slate-100 hover:bg-slate-50 transition-all group">
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">{duty.role}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                      {duty.faculty} • {duty.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-slate-900">{duty.time}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{duty.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Stats Widget */}
        <section className="gradient-primary rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-500/20 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-[1.2rem] flex items-center justify-center mb-6">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-2xl font-black mb-2 tracking-tight">Campus Health</h3>
            <p className="text-indigo-100 text-sm font-medium mb-8 leading-relaxed opacity-90">
              Overall student pass rate across all departments is currently <span className="text-white font-black">86.4%</span>.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                <div className="flex justify-between text-[10px] text-indigo-200 mb-1 font-black uppercase tracking-widest">
                  <span>Faculty Satisfaction</span>
                  <span>92%</span>
                </div>
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-[92%]" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Duty Assignment Modal Simulation */}
      <AnimatePresence>
        {showDutyModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[3rem] shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-10">
                <h3 className="text-2xl font-black text-slate-900 mb-2">Assign Duty</h3>
                <p className="text-slate-500 text-sm mb-8">Select faculty and assign a role.</p>
                <div className="space-y-4">
                  <select className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm font-bold">
                    <option>Select Faculty</option>
                    {facultyData.map(f => <option key={f.id}>{f.name}</option>)}
                  </select>
                  <input type="text" placeholder="Duty Role (e.g. Invigilator)" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm" />
                  <button 
                    onClick={() => setShowDutyModal(false)}
                    className="w-full gradient-primary text-white py-5 rounded-3xl text-xs font-black uppercase tracking-widest mt-4"
                  >
                    Confirm Assignment
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
