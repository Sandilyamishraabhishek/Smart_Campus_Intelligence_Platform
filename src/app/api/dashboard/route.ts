import { NextResponse } from 'next/server';

export async function GET() {
  // Simulation of a MongoDB call: db.engagement_insights.findOne(...)
  const stats = [
    { label: 'Attendance', value: '88%', icon: 'Clock', color: 'text-indigo-600', bg: 'bg-indigo-50/50' },
    { label: 'Campus Coins', value: '1,240', icon: 'Coins', color: 'text-amber-600', bg: 'bg-amber-50/50' },
    { label: 'Assignments', value: '4 Pending', icon: 'BookOpen', color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
    { label: 'Events', value: '3 Today', icon: 'Calendar', color: 'text-rose-600', bg: 'bg-rose-50/50' },
  ];

  const recommendations = [
    { id: '1', title: 'Unstop: National Coding Challenge', description: 'Match your performance in DS/Algo. Win 1,000 Coins!', icon: 'Trophy', tags: ['Hackathon', 'Unstop'] },
    { id: '2', title: 'HackerEarth: AI Innovation Hub', description: 'Recommended based on your 3.8 GPA in ML.', icon: 'Zap', tags: ['Competition', 'AI'] },
    { id: '3', title: 'Peer Study: Sarah Chen (Topper)', description: 'Sarah is online and excels in Neural Networks.', icon: 'Users', tags: ['Study', 'AI Match'] },
  ];

  const upcomingEvents = [
    { id: 1, title: 'AI Workshop: Future of Tech', time: '2:00 PM', location: 'Hall A', type: 'Workshop', color: 'bg-indigo-500' },
    { id: 2, title: 'Campus Hackathon 2026', time: 'Tomorrow', location: 'Innovation Hub', type: 'Competition', color: 'bg-violet-500' },
    { id: 3, title: 'Career Fair: Tech Giants', time: 'Mar 25', location: 'Main Plaza', type: 'Networking', color: 'bg-emerald-500' },
  ];

  const heatmap = [
    { id: 'cafeteria', name: 'Main Cafeteria', crowd: 85, status: 'Very Busy', trend: 'increasing', icon: 'Coffee', tracking: 'Wi-Fi' },
    { id: 'library', name: 'Central Library', crowd: 30, status: 'Quiet', trend: 'stable', icon: 'Library', tracking: 'GPS (Wi-Fi Failed)' },
    { id: 'gym', name: 'Campus Gym', crowd: 12, status: 'Empty', trend: 'decreasing', icon: 'Dumbbell', tracking: 'Wi-Fi' },
  ];

  const rewards = [
    { id: 1, title: 'Morning Coffee', cost: 150, category: 'Cafeteria', image: '☕' },
    { id: 2, title: 'Tech Hub Voucher', cost: 500, category: 'Store', image: '🎟️' },
    { id: 3, title: 'Healthy Snack', cost: 100, category: 'Cafeteria', image: '🍎' },
  ];

  return NextResponse.json({
    stats,
    recommendations,
    upcomingEvents,
    heatmap,
    rewards,
    performance: {
      weeklyGoal: '85%',
      globalRank: 'Top 10%',
      momentum: '+15%',
      gpa: '3.85'
    }
  });
}
