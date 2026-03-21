'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  GraduationCap, 
  BarChart3, 
  Settings, 
  LogOut,
  ShieldCheck,
  UserCircle,
  Users,
  Compass,
  Zap,
  Star,
  ChevronRight,
  Hexagon,
  Lock,
  Mail,
  ArrowRight,
  Shield
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

// Mock Auth State
const useAuth = () => {
  const [user, setUser] = useState<any>(null);

  const login = (role: string) => {
    setUser({ name: 'Abhishek S.', role, email: 'abhishek@campus.edu' });
  };

  const logout = () => setUser(null);

  return { user, login, logout };
};

export default function Sidebar() {
  const pathname = usePathname();
  const { user, login, logout } = useAuth();
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getSidebarItems = () => {
    const baseItems = [
      { icon: Compass, label: 'Overview', href: '/' },
      { icon: Calendar, label: 'Events', href: '/events' },
    ];

    if (user?.role === 'student') {
      return [
        ...baseItems,
        { icon: GraduationCap, label: 'Academics', href: '/academics' },
        { icon: Zap, label: 'Activity', href: '/analytics' },
      ];
    }

    if (user?.role === 'faculty') {
      return [
        ...baseItems,
        { icon: Compass, label: 'Dashboard', href: '/faculty' },
        { icon: ShieldCheck, label: 'Attendance', href: '/academics' },
        { icon: BarChart3, label: 'Performance', href: '/analytics' },
      ];
    }

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        { icon: BarChart3, label: 'Faculty Index', href: '/admin/performance' },
        { icon: ShieldCheck, label: 'Operations', href: '/admin/performance' },
        { icon: Users, label: 'Directory', href: '/admin/users' },
      ];
    }

    return baseItems;
  };

  const sidebarItems = getSidebarItems();

  if (!user) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-900 dark:bg-indigo-600 flex items-center justify-center p-4 md:p-6 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 blur-[120px] rounded-full" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring' as const, damping: 20, stiffness: 100 }}
          className="bg-card/95 backdrop-blur-xl rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] w-full max-w-4xl flex flex-col md:flex-row overflow-hidden border border-white/20"
        >
          {/* Left Side - Visual */}
          <div className="md:w-1/2 bg-slate-900 dark:bg-indigo-600 p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 to-transparent" />
              <div className="grid grid-cols-8 gap-4 p-4">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-card/20 rounded-full" />
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <div className="bg-indigo-500 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-500/20">
                <Shield size={24} />
              </div>
              <h2 className="text-4xl font-black text-white tracking-tighter mb-4 leading-tight">
                Secure Campus <br /><span className="text-indigo-400 italic">Access.</span>
              </h2>
              <p className="text-slate-400 dark:text-slate-500 font-medium text-lg leading-relaxed">
                Enter your credentials to access the intelligent digital twin of your campus.
              </p>
            </div>

            <div className="relative z-10">
              <div className="flex -space-x-3 mb-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden shadow-xl">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-indigo-600 flex items-center justify-center text-[10px] font-black text-white shadow-xl">
                  +2k
                </div>
              </div>
              <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">Trusted by 2,000+ students</p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="md:w-1/2 p-12 md:p-16 bg-card flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!showRoleSelection ? (
                <motion.div 
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-black text-foreground tracking-tight">Identity Login</h3>
                    <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm font-medium mt-1">Please enter your institutional email.</p>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-indigo-500">Institutional Email</label>
                      <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={18} />
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@university.edu"
                          className="w-full bg-slate-50 dark:bg-[#0a0f1c] border border-border pl-14 pr-6 py-5 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner font-medium"
                        />
                      </div>
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-indigo-500">Security Key</label>
                      <div className="relative">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={18} />
                        <input 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-slate-50 dark:bg-[#0a0f1c] border border-border pl-14 pr-6 py-5 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => email && password && setShowRoleSelection(true)}
                    disabled={!email || !password}
                    className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-600 active:scale-[0.98] transition-all shadow-xl shadow-slate-900/10 mt-4 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <span>Proceed to Verification</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="role"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-black text-foreground tracking-tight">Identity Verified</h3>
                    <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm font-medium mt-1">Select your primary role for this session.</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { id: 'student', label: 'Student Learner', desc: 'Academic tools & resources', icon: UserCircle, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                      { id: 'faculty', label: 'Academic Faculty', desc: 'Instruction & management', icon: ShieldCheck, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50' },
                      { id: 'admin', label: 'System Admin', desc: 'Governance & operations', icon: Settings, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50' }
                    ].map((role) => (
                      <button 
                        key={role.id}
                        onClick={() => login(role.id)}
                        className="w-full flex items-center justify-between p-5 rounded-2xl border border-border hover:border-indigo-200 hover:bg-slate-50 dark:bg-[#0a0f1c] transition-all group text-left shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-center space-x-5">
                          <div className={`w-14 h-14 ${role.bg} ${role.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                            <role.icon size={28} />
                          </div>
                          <div>
                            <h4 className="text-base font-black text-foreground leading-tight">{role.label}</h4>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">{role.desc}</p>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-500 transition-colors group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => setShowRoleSelection(false)}
                    className="w-full text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-foreground transition-colors"
                  >
                    Back to Credentials
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-64 bg-card border-r border-border p-6 fixed left-0 top-0 z-40">
      <div className="flex items-center space-x-3 mb-10 px-2">
        <div className="bg-slate-900 dark:bg-indigo-600 p-2 rounded-xl text-white shadow-lg">
          <Star size={18} fill="currentColor" />
        </div>
        <h1 className="text-xl font-black tracking-tight text-foreground">Campus.</h1>
      </div>

      <nav className="flex-1 space-y-1.5">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.label} href={item.href} className="group block">
              <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-lg'
                  : 'text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:bg-[#0a0f1c] hover:text-foreground'
              }`}>
                <item.icon size={18} className={isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600'} />
                <span className="text-sm font-semibold tracking-tight">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <div className="p-4 bg-slate-50 dark:bg-[#0a0f1c] rounded-2xl border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-sm">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-black text-foreground truncate">{user.name}</p>
              <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">{user.role}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between w-full mt-2">
          <ThemeToggle />
          <button 
            onClick={logout}
            className="flex items-center justify-center space-x-2 py-3 px-4 text-slate-400 dark:text-slate-500 hover:text-rose-500 transition-all text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 dark:bg-[#0a0f1c]"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
