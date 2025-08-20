import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, Users, Heart, MessageCircle, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on an employer or WHV page to show appropriate navigation
  const isEmployerPage = location.pathname.includes('/employer') || 
                         location.pathname === '/post-jobs' || 
                         location.pathname === '/browse-candidates' ||
                         location.pathname.startsWith('/employer');
  
  const employerNavItems = [
    { id: 'post-jobs', label: 'Post Jobs', icon: Briefcase, path: '/post-jobs' },
    { id: 'browse', label: 'Browse Candidates', icon: Users, path: '/browse-candidates' },
    { id: 'matches', label: 'Matches', icon: Heart, path: '/matches' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, path: '/messages' },
    { id: 'profile', label: 'Profile', icon: User, path: '/employer-dashboard' },
  ];

  const whvNavItems = [
    { id: 'profile', label: 'Profile', icon: User, path: '/whv-dashboard' },
    { id: 'browse', label: 'Browse Employers', icon: Briefcase, path: '/browse-candidates' },
    { id: 'matches', label: 'Matches', icon: Heart, path: '/matches' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, path: '/messages' },
  ];

  const navItems = isEmployerPage ? employerNavItems : whvNavItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="px-4 py-3">
      <div className="flex justify-between items-stretch h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center px-3 rounded-lg transition-colors flex-1 mx-1 ${
                active 
                  ? 'bg-orange-500/10 text-orange-500' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium text-center leading-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;