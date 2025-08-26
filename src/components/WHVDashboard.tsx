import React, { useState, useEffect } from 'react';
import { Edit, FileText, Shield, Bell, Lock, HelpCircle, Info, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [profileTagline, setProfileTagline] = useState<string>('Backpacker from Argentina with experience in farm work, currently in Brisbane, QLD');

  useEffect(() => {
    // Retrieve the uploaded photo from localStorage
    const storedPhoto = localStorage.getItem('userProfilePhoto');
    if (storedPhoto) {
      setProfilePhoto(storedPhoto);
    }

    // Retrieve the profile tagline from localStorage
    const storedTagline = localStorage.getItem('profileTagline');
    if (storedTagline) {
      setProfileTagline(storedTagline);
    }
  }, []);

  const settingsItems = [
    { icon: FileText, label: 'Edit WHV Profile', color: 'text-gray-600' },
    { icon: Shield, label: 'Security', color: 'text-gray-600' },
    { icon: Bell, label: 'Notifications', color: 'text-gray-600' },
    { icon: Lock, label: 'Privacy', color: 'text-gray-600' },
    { icon: HelpCircle, label: 'Help & Support', color: 'text-gray-600' },
    { icon: Info, label: 'Terms and Policies', color: 'text-gray-600' },
    { icon: LogOut, label: 'Log out', color: 'text-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          {/* Main content container */}
          <div className="w-full h-full flex flex-col relative bg-gray-100">
            {/* Content */}
            <div className="flex-1 px-6 pt-16 pb-24 overflow-y-auto">
              {/* Welcome Back Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">Welcome Back</h1>
              </div>

              {/* User Name Badge */}
              <div className="flex justify-center mb-6">
                <div className="bg-orange-500 text-white px-6 py-3 rounded-2xl">
                  <span className="font-medium text-base">Peter Parker</span>
                </div>
              </div>

              {/* Profile Picture */}
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-orange-500 overflow-hidden">
                  <img 
                    src="/lovable-uploads/5171768d-7ee5-4242-8d48-29d87d896302.png" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Profile Description */}
              <div className="text-center mb-6">
                <p className="text-gray-700 text-base leading-relaxed">
                  {profileTagline}
                </p>
              </div>

              {/* Edit Profile Button */}
              <div className="flex justify-center mb-8">
                <button 
                  onClick={() => navigate('/whv/edit-profile')}
                  className="flex items-center bg-gray-200 px-6 py-3 rounded-2xl hover:bg-gray-300 transition-colors"
                >
                  <Edit size={16} className="mr-2 text-gray-700" />
                  <span className="text-gray-700 font-medium">Edit Profile</span>
                </button>
              </div>

              {/* Settings Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 px-2">Settings</h3>
                
                <div className="space-y-1">
                  {settingsItems.map((item, index) => {
                    const Icon = item.icon;
                    const isLogout = item.label === 'Log out';
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          if (item.label === 'Security') {
                            navigate('/security');
                          } else if (item.label === 'Edit WHV Profile') {
                            navigate('/whv/edit-profile');
                          } else if (item.label === 'Notifications') {
                            navigate('/notifications');
                          } else if (item.label === 'Privacy') {
                            navigate('/privacy');
                          } else if (item.label === 'Help & Support') {
                            navigate('/help-support');
                          } else if (item.label === 'Terms and Policies') {
                            navigate('/terms-policies');
                          } else if (item.label === 'Log out') {
                            navigate('/');
                          }
                        }}
                        className={`flex items-center w-full p-4 ${isLogout ? 'bg-red-50' : 'bg-white'} hover:bg-opacity-80 transition-colors`}
                      >
                        <Icon size={20} className={`mr-4 ${item.color}`} />
                        <span className={`text-left font-medium ${item.color}`}>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Navigation - Inside phone frame */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 rounded-b-[48px]">
              <BottomNavigation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;