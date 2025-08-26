import React, { useState, useEffect } from 'react';
import { Edit, Settings, Bell, Lock, HelpCircle, Info, LogOut, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/BottomNavigation';

const EmployerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the uploaded photo from localStorage
    const storedPhoto = localStorage.getItem('businessProfilePhoto');
    if (storedPhoto) {
      setProfilePhoto(storedPhoto);
    }
  }, []);

  const settingsItems = [
    { icon: FileText, label: 'Edit Business Profile', color: 'text-gray-600', action: () => navigate('/employer/edit-business-profile') },
    { icon: Settings, label: 'Security', color: 'text-gray-600', action: () => navigate('/employer/security') },
    { icon: Bell, label: 'Notifications', color: 'text-gray-600', action: () => navigate('/employer/notifications') },
    { icon: Lock, label: 'Privacy', color: 'text-gray-600', action: () => navigate('/employer/privacy') },
    { icon: HelpCircle, label: 'Help & Support', color: 'text-gray-600', action: () => navigate('/employer/help-support') },
    { icon: Info, label: 'Terms and Policies', color: 'text-gray-600', action: () => navigate('/employer/terms-policies') },
    { icon: LogOut, label: 'Log out', color: 'text-red-500', action: () => navigate('/') },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-background rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          {/* Main content container */}
          <div className="w-full h-full flex flex-col relative bg-gray-100">
            
            {/* Content */}
            <div className="flex-1 px-6 pt-16 pb-20 overflow-y-auto">
              
              {/* Welcome Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome Back</h1>
                
                {/* User Name Badge */}
                <div className="inline-block bg-slate-800 text-white px-6 py-2 rounded-lg mb-6">
                  <span className="font-medium">John Doe</span>
                </div>
                
                {/* Profile Picture */}
                <div className="flex justify-center mb-6">
                  <div className="w-32 h-32 rounded-full border-4 border-slate-800 overflow-hidden">
                    <img 
                      src={profilePhoto || "/lovable-uploads/533b9faf-8093-4e1d-b089-759120f751e1.png"} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Business Info */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Kangafarm</h2>
                  <p className="text-gray-700 text-sm leading-relaxed italic">
                    "Family-run farm in regional Queensland, offering<br />
                    seasonal work in fruit picking and packing"
                  </p>
                </div>
                
                {/* Edit Profile Button */}
                <Button
                  onClick={() => navigate('/employer/edit-profile')}
                  variant="outline"
                  className="mb-8 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </Button>
              </div>

              {/* Settings Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
                
                <div className="space-y-2">
                  {settingsItems.map((item, index) => {
                    const Icon = item.icon;
                    const isLogout = item.label === 'Log out';
                    return (
                      <button
                        key={index}
                        onClick={item.action}
                        className="flex items-center w-full p-4 hover:bg-gray-50 transition-colors"
                      >
                        <Icon size={20} className={`mr-4 ${item.color}`} />
                        <span className={`text-left font-medium ${item.color}`}>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Bottom Navigation */}
            <BottomNavigation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;