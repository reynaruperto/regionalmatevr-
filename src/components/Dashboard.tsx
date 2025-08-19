import React, { useState, useEffect } from 'react';
import { Edit, FileText, Shield, Bell, Lock, HelpCircle, Info, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the uploaded photo from localStorage
    const storedPhoto = localStorage.getItem('userProfilePhoto');
    if (storedPhoto) {
      setProfilePhoto(storedPhoto);
    }
  }, []);

  const settingsItems = [
    { icon: FileText, label: 'Edit Business Profile', color: 'text-gray-600' },
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
        <div className="w-full h-full bg-background rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          {/* Main content container */}
          <div className="w-full h-full flex flex-col relative bg-gray-200">
            {/* Content */}
            <div className="flex-1 px-6 pt-16 pb-24 overflow-y-auto">
              {/* Welcome Section */}
              <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
                <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Welcome Back</h1>
                
                {/* User Badge */}
                <div className="flex justify-center mb-4">
                  <div className="bg-[#1E293B] text-white px-6 py-2 rounded-2xl">
                    <span className="font-medium">John Doe</span>
                  </div>
                </div>

                {/* Profile Picture */}
                <div className="flex justify-center mb-4">
                  <div className="w-32 h-32 rounded-full border-4 border-[#1E293B] overflow-hidden">
                    <img 
                      src="/lovable-uploads/51369c33-1aa8-4f19-b8a1-e65e12f9ec9f.png" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Business Info */}
                <div className="text-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Kangafarm</h2>
                  <p className="text-gray-600 text-sm italic mb-4">
                    "Family-run farm in regional Queensland, offering seasonal work in fruit picking and packing"
                  </p>
                  
                  <button 
                    onClick={() => navigate('/edit-profile')}
                    className="flex items-center justify-center mx-auto text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <Edit size={16} className="mr-2" />
                    <span className="text-sm">Edit Profile</span>
                  </button>
                </div>
              </div>

              {/* Settings Section */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
                
                <div className="space-y-4">
                  {settingsItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          if (item.label === 'Security') {
                            navigate('/security');
                          } else if (item.label === 'Edit Business Profile') {
                            navigate('/edit-business-profile');
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
                        className="flex items-center w-full p-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <Icon size={20} className={`mr-4 ${item.color}`} />
                        <span className={`text-left ${item.color}`}>{item.label}</span>
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