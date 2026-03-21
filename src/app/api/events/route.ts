import { NextResponse } from 'next/server';

const ALL_EVENTS = [
  { 
    id: 1, 
    title: 'AI Workshop: Future of Tech', 
    date: 'Mar 22, 2026', 
    time: '2:00 PM', 
    location: 'Hall A', 
    type: 'Workshop',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600',
    description: 'Explore the latest trends in AI and machine learning with industry experts.',
    attendees: 124
  },
  { 
    id: 2, 
    title: 'Unstop Hackathons', 
    date: 'Upcoming 2026', 
    time: 'Varies', 
    location: 'Online/Offline', 
    type: 'Competition',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600',
    description: 'Direct access to the latest hackathons on Unstop. Compete and win!',
    attendees: 450,
    externalUrl: 'https://unstop.com/hackathons'
  },
  { 
    id: 6, 
    title: 'HackerEarth Challenges', 
    date: 'Ongoing 2026', 
    time: '24/7', 
    location: 'Online', 
    type: 'Competition',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600',
    description: 'Solve real-world problems and get hired through HackerEarth hackathons.',
    attendees: 320,
    externalUrl: 'https://www.hackerearth.com/challenges/hackathon/'
  },
  { 
    id: 3, 
    title: 'Career Fair: Tech Giants', 
    date: 'Mar 25, 2026', 
    time: '10:00 AM', 
    location: 'Main Plaza', 
    type: 'Networking',
    category: 'Career',
    image: 'https://images.unsplash.com/photo-1540575861501-7ad05823c9f5?auto=format&fit=crop&q=80&w=600',
    description: 'Connect with top tech companies and find your dream job.',
    attendees: 800
  },
  { 
    id: 4, 
    title: 'Yoga & Mindfulness Session', 
    date: 'Mar 20, 2026', 
    time: '5:00 PM', 
    location: 'Gym Studio 2', 
    type: 'Wellness',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
    description: 'Relax and rejuvenate with a guided yoga session for students.',
    attendees: 45
  },
  { 
    id: 5, 
    title: 'Photography Club Meetup', 
    date: 'Mar 24, 2026', 
    time: '4:00 PM', 
    location: 'Art Wing', 
    type: 'Club',
    category: 'Art',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=600',
    description: 'Weekly meeting to discuss techniques and plan photo walks.',
    attendees: 32
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'All';
  
  let filtered = ALL_EVENTS;
  if (category !== 'All') {
    filtered = ALL_EVENTS.filter(e => e.category === category);
  }
  
  return NextResponse.json(filtered);
}
