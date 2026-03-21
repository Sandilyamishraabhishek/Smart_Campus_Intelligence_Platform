'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  FileText, 
  Clock, 
  GraduationCap, 
  ChevronRight,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Download,
  Activity,
  Award,
  Scan,
  Camera,
  CheckCircle2,
  AlertCircle,
  RefreshCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const courses = [
  { id: 1, name: 'Advanced Machine Learning', code: 'CS301', instructor: 'Dr. Sarah Johnson', progress: 75, grade: 'A', attendance: '92%', color: 'from-indigo-500 to-violet-500' },
  { id: 2, name: 'Data Structures & Algorithms', code: 'CS202', instructor: 'Prof. Michael Lee', progress: 88, grade: 'A-', attendance: '85%', color: 'from-violet-500 to-rose-500' },
  { id: 3, name: 'Database Management Systems', code: 'CS205', instructor: 'Dr. Emily Brown', progress: 62, grade: 'B+', attendance: '80%', color: 'from-emerald-500 to-teal-500' },
  { id: 4, name: 'Human-Computer Interaction', code: 'CS310', instructor: 'Prof. David Wilson', progress: 45, grade: 'A', attendance: '95%', color: 'from-orange-500 to-amber-500' },
];

const studyResources = [
  { id: 1, title: 'Neural Networks Fundamentals', type: 'PDF', size: '2.4 MB', course: 'CS301', date: 'Mar 15' },
  { id: 2, title: 'B-Tree & Graph Algorithms', type: 'Video', size: '45 mins', course: 'CS202', date: 'Mar 12' },
  { id: 3, title: 'SQL Optimization Guide', type: 'Article', size: '15 mins', course: 'CS205', date: 'Mar 10' },
];

const peerGroups = [
  { id: 1, name: 'ML Study Hub', members: 12, topic: 'Neural Networks', status: 'Active Now', isMatchingEnabled: true },
  { id: 2, name: 'Algo Practice', members: 8, topic: 'Dynamic Programming', status: 'Meeting in 2h', isMatchingEnabled: true },
  { id: 3, name: 'DBMS Lab Group', members: 4, topic: 'Final Project', status: 'Inactive', isMatchingEnabled: false },
];

export default function AcademicsPage() {
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [checkInStatus, setCheckInStatus] = useState<'idle' | 'scanning' | 'verifying' | 'success' | 'error'>('idle');
  const [identity, setIdentity] = useState<string | null>(null);
  const [showPeerMatch, setShowPeerMatch] = useState(false);
  const [matchData, setMatchData] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handlePeerMatch = (group: any) => {
    setShowPeerMatch(true);
    // Simulate AI peer matching logic: matching a "weak" student with a "topper"
    setTimeout(() => {
      setMatchData({
        student: "Abhishek",
        role: "Mentee",
        topper: "Sarah Chen",
        topperImage: "https://i.pravatar.cc/150?img=32",
        matchScore: "94%",
        reason: "Sarah excels in Neural Networks, which matches your current learning gap."
      });
    }, 1500);
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      setCheckInStatus('error');
    }
  };

  const handleCheckIn = async () => {
    setIsCheckingIn(true);
    setCheckInStatus('scanning');
    setIdentity(null);
    await startCamera();
    
    // Simulate some scanning time
    setTimeout(async () => {
      if (!videoRef.current || !canvasRef.current) return;
      
      setCheckInStatus('verifying');
      
      // Capture frame from video
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg');
      stopCamera();

      try {
        const res = await fetch('/api/attendance', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: imageData })
        });
        const data = await res.json();
        
        if (data.status === 'success') {
          setCheckInStatus('success');
          setIdentity(data.identity || 'Abhishek');
          setTimeout(() => {
            setIsCheckingIn(false);
            setCheckInStatus('idle');
          }, 4000);
        } else {
          setCheckInStatus('error');
        }
      } catch (err) {
        setCheckInStatus('error');
      }
    }, 3000);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

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
            Academic <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Support</span>
          </motion.h1>
          <p className="text-slate-500 font-medium mt-1">AI-driven course tracking and intelligent resource matching.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckIn}
            disabled={isCheckingIn}
            className={`px-8 py-4 rounded-[1.5rem] text-sm font-black transition-all shadow-xl flex items-center space-x-3 ${
              checkInStatus === 'success' 
                ? 'bg-emerald-600 text-white shadow-emerald-500/20' 
                : 'bg-white text-indigo-600 border border-slate-200 hover:border-indigo-600 shadow-indigo-500/5'
            }`}
          >
            {checkInStatus === 'idle' && (
              <>
                <Scan size={20} />
                <span>AI Face Check-in</span>
              </>
            )}
            {(checkInStatus === 'scanning' || checkInStatus === 'verifying') && (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Activity size={20} />
                </motion.div>
                <span>{checkInStatus === 'scanning' ? 'Scanning Face...' : 'Verifying Identity...'}</span>
              </>
            )}
            {checkInStatus === 'success' && (
              <>
                <CheckCircle2 size={20} />
                <span>Attendance Verified!</span>
              </>
            )}
          </motion.button>
          
          <button className="gradient-primary text-white px-8 py-4 rounded-[1.5rem] text-sm font-black hover:scale-105 transition-all shadow-xl shadow-indigo-500/20 flex items-center space-x-2">
            <Plus size={20} />
            <span>Join Study Session</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Course Progress */}
        <div className="lg:col-span-2 space-y-10">
          <section className="bg-white rounded-[3rem] border border-slate-200/50 shadow-sm overflow-hidden group">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-600 p-2.5 rounded-2xl text-white">
                  <BookOpen size={22} />
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Active Courses</h2>
              </div>
              <button className="text-indigo-600 text-sm font-bold hover:underline flex items-center">
                Full Transcript <ChevronRight size={18} />
              </button>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {courses.map((course, index) => (
                <motion.div 
                  key={course.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group/card relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <ArrowUpRight size={20} className="text-slate-300" />
                  </div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 leading-tight mb-1 group-hover/card:text-indigo-600 transition-colors">{course.name}</h3>
                      <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">{course.code} • {course.instructor}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black bg-gradient-to-br from-indigo-600 to-violet-600 bg-clip-text text-transparent">{course.grade}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>Course Progress</span>
                      <span className="text-slate-900">{course.progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full bg-gradient-to-r ${course.color} rounded-full`}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                      <Clock size={14} className="text-indigo-500" />
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Attendance: <span className="text-indigo-600">{course.attendance}</span></span>
                    </div>
                    <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Syllabus</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* AI-Recommended Resources */}
          <section className="bg-white rounded-[3rem] border border-slate-200/50 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-indigo-50/20">
              <div className="flex items-center space-x-3">
                <div className="bg-violet-600 p-2.5 rounded-2xl text-white">
                  <TrendingUp size={22} />
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">AI Smart Resources</h2>
              </div>
            </div>
            
            <div className="p-8 grid gap-6">
              {studyResources.map((resource, index) => (
                <motion.div 
                  key={resource.id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between p-6 rounded-[2rem] bg-white border border-slate-100 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/5 transition-all group"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-all shadow-sm">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 leading-snug">{resource.title}</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                        {resource.type} • {resource.size} • For <span className="text-violet-600">{resource.course}</span>
                      </p>
                    </div>
                  </div>
                  <button className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-violet-600 hover:text-white transition-all shadow-inner">
                    <Download size={20} />
                  </button>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Peer Groups & Insights */}
        <div className="space-y-10">
          {/* Peer Study Groups */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200/50 shadow-sm overflow-hidden group">
            <div className="p-8 border-b border-slate-50">
              <div className="flex items-center space-x-3">
                <div className="bg-emerald-600 p-2.5 rounded-2xl text-white">
                  <Users size={22} />
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Peer Hub</h2>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              {peerGroups.map((group) => (
                <div key={group.id} className="p-6 rounded-[2rem] border border-slate-100 hover:bg-slate-50 transition-all group/item">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-black text-slate-900 group-hover/item:text-emerald-600 transition-colors">{group.name}</h3>
                    <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${
                      group.status === 'Active Now' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {group.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mb-6">{group.topic}</p>
                  
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-8 h-8 rounded-xl border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                            <img src={`https://i.pravatar.cc/100?img=${i + 40}`} alt="User" />
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-xl border-2 border-white bg-emerald-50 flex items-center justify-center text-[9px] font-black text-emerald-600 shadow-sm">
                          +{group.members - 3}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {group.isMatchingEnabled && (
                          <button 
                            onClick={() => handlePeerMatch(group)}
                            className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center"
                          >
                            <Sparkles size={12} className="mr-1" /> Match Peer
                          </button>
                        )}
                        <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Join Lab</button>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full py-4 bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-600 hover:text-white transition-all shadow-inner">
                  Discover More Groups
                </button>
              </div>
            </section>

          {/* Academic Insight Widget */}
          <section className="gradient-primary rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-500/20 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-[1.2rem] flex items-center justify-center mb-6 ring-1 ring-white/30">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-2xl font-black mb-2 tracking-tight">GPA Predictor</h3>
              <p className="text-indigo-100 text-sm font-medium mb-8 leading-relaxed opacity-90">
                Based on your current performance, your predicted end-of-term GPA is <span className="text-white font-black">3.85</span>.
              </p>
              
              <div className="space-y-6">
                <div className="p-5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md group-hover:bg-white/20 transition-all">
                  <div className="flex justify-between text-[10px] text-indigo-200 mb-2 font-black uppercase tracking-widest">
                    <span>AI Confidence</span>
                    <span>High (92%)</span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '92%' }}
                      transition={{ duration: 1.5, delay: 1 }}
                      className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Abstract Shape */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
          </section>
        </div>
      </div>

      {/* Attendance Check-in Modal Simulation */}
      <AnimatePresence>
        {isCheckingIn && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[3rem] shadow-2xl w-full max-w-lg overflow-hidden border border-white/20 shadow-indigo-500/20"
            >
              <div className="p-10 text-center">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="w-48 h-48 rounded-[2.5rem] bg-slate-100 flex items-center justify-center overflow-hidden border-4 border-slate-200 relative group">
                      {checkInStatus === 'scanning' ? (
                        <>
                          <video 
                            ref={videoRef} 
                            autoPlay 
                            playsInline 
                            className="w-full h-full object-cover grayscale brightness-75"
                          />
                          <canvas ref={canvasRef} className="hidden" />
                          <div className="absolute inset-0 bg-indigo-500/10" />
                          <motion.div 
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-1 bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.8)] z-10"
                          />
                        </>
                      ) : checkInStatus === 'verifying' ? (
                        <div className="flex flex-col items-center">
                          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Running OpenCV Engine...</p>
                        </div>
                      ) : checkInStatus === 'success' ? (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 shadow-lg shadow-emerald-200">
                            <CheckCircle2 size={48} />
                          </div>
                          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Match Found!</p>
                        </motion.div>
                      ) : checkInStatus === 'error' ? (
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mb-4">
                            <AlertCircle size={48} />
                          </div>
                          <button 
                            onClick={() => handleCheckIn()}
                            className="text-[10px] font-black text-rose-600 uppercase tracking-widest hover:underline flex items-center"
                          >
                            <RefreshCcw size={12} className="mr-1" /> Retry
                          </button>
                        </div>
                      ) : (
                        <Camera size={48} className="text-slate-300" />
                      )}
                    </div>
                    {checkInStatus === 'scanning' && (
                      <div className="absolute -top-4 -left-4 -right-4 -bottom-4 border-2 border-indigo-500/30 rounded-[3rem] animate-pulse" />
                    )}
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                  {checkInStatus === 'scanning' ? 'Scanning Identity' : 
                   checkInStatus === 'verifying' ? 'AI Facial Recognition' : 
                   checkInStatus === 'success' ? `Welcome, ${identity}!` : 
                   checkInStatus === 'error' ? 'Verification Failed' : 'Ready to Check-in'}
                </h3>
                <p className="text-slate-500 font-medium text-sm mb-10 max-w-[280px] mx-auto leading-relaxed">
                  {checkInStatus === 'scanning' ? 'Align your face within the frame. Our OpenCV engine is analyzing live biometrics.' : 
                   checkInStatus === 'verifying' ? 'Processing facial embeddings and cross-referencing with university records.' : 
                   checkInStatus === 'success' ? `Successfully verified identity for ${identity}. Attendance marked for today.` : 
                   checkInStatus === 'error' ? 'We couldn\'t recognize your face. Please ensure you are in a well-lit area.' : 
                   'Use AI Face ID to mark your attendance instantly.'}
                </p>
                
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <Scan size={12} className="text-indigo-500" />
                    <span>Geo-fenced</span>
                  </div>
                  <div className="w-1 h-1 bg-slate-300 rounded-full" />
                  <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <Activity size={12} className="text-indigo-500" />
                    <span>Live Biometrics</span>
                  </div>
                </div>
              </div>
              
              {checkInStatus === 'success' && (
                <div className="bg-emerald-50 p-6 flex items-center justify-center space-x-3 border-t border-emerald-100">
                  <Award className="text-emerald-600" size={20} />
                  <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">Scholarship eligibility maintained</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Peer Matching Modal */}
      <AnimatePresence>
        {showPeerMatch && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[3rem] shadow-2xl w-full max-w-lg overflow-hidden border border-white/20"
            >
              <div className="p-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">AI Peer Matching</h3>
                    <p className="text-slate-500 font-medium text-sm">Matching profiles for optimized learning.</p>
                  </div>
                  <button 
                    onClick={() => { setShowPeerMatch(false); setMatchData(null); }}
                    className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all"
                  >
                    <Plus size={20} className="rotate-45" />
                  </button>
                </div>

                {!matchData ? (
                  <div className="py-20 flex flex-col items-center justify-center">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Analyzing academic profiles...</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                          <img src="https://i.pravatar.cc/150?img=12" alt="You" />
                        </div>
                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{matchData.student}</span>
                        <span className="text-[8px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-full">{matchData.role}</span>
                      </div>

                      <div className="flex flex-col items-center space-y-1">
                        <div className="text-xl font-black text-indigo-600">{matchData.matchScore}</div>
                        <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Match Score</div>
                        <motion.div 
                          animate={{ x: [-5, 5, -5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <ArrowRight size={20} className="text-indigo-300" />
                        </motion.div>
                      </div>

                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                          <img src={matchData.topperImage} alt="Topper" />
                        </div>
                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{matchData.topper}</span>
                        <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full">Topper</span>
                      </div>
                    </div>

                    <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
                      <div className="flex items-center space-x-2 mb-2">
                        <Sparkles size={16} className="text-indigo-600" />
                        <span className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">AI Insight</span>
                      </div>
                      <p className="text-sm text-indigo-700 font-medium leading-relaxed">
                        {matchData.reason}
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button className="flex-1 py-4 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">
                        Connect with {matchData.topper.split(' ')[0]}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simple Loader component for the modal
function Loader2({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
  );
}
