import React from 'react';
import { Edit, FileText, Shield, Bell, Lock, HelpCircle, Info, LogOut } from 'lucide-react';
import BottomNavigation from './BottomNavigation';

const Dashboard: React.FC = () => {
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
    <div className="min-h-screen bg-gray-100">
      {/* iPhone 16 Pro Max frame */}
      <div className="max-w-md mx-auto bg-black rounded-t-[60px] min-h-screen p-2 shadow-2xl">
        <div className="w-full h-full bg-background rounded-t-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          {/* Main content container */}
          <div className="w-full h-full flex flex-col relative bg-gray-200 pb-20">
            {/* Content */}
            <div className="flex-1 px-6 pt-16">
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
                      src="/lovable-uploads/031d587d-6ada-42f3-adda-58351781f00f.png" 
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
                  
                  <button className="flex items-center justify-center mx-auto text-gray-600 hover:text-gray-800 transition-colors">
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
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;