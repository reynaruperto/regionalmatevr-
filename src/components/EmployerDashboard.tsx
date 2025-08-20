import React, { useState, useEffect } from 'react';
import { Edit, Users, Briefcase, Eye, Settings, Bell, Lock, HelpCircle, Info, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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

  const quickActions = [
    { icon: Users, label: 'Browse Candidates', action: () => navigate('/browse-candidates'), color: 'bg-blue-500' },
    { icon: Briefcase, label: 'Post New Job', action: () => navigate('/post-jobs'), color: 'bg-green-500' },
    { icon: Eye, label: 'View My Jobs', action: () => navigate('/employer-jobs/1'), color: 'bg-purple-500' },
  ];

  const settingsItems = [
    { icon: Edit, label: 'Edit Business Profile', color: 'text-gray-600', action: () => navigate('/edit-business-profile') },
    { icon: Settings, label: 'Account Settings', color: 'text-gray-600', action: () => navigate('/security') },
    { icon: Bell, label: 'Notifications', color: 'text-gray-600', action: () => navigate('/notifications') },
    { icon: Lock, label: 'Privacy', color: 'text-gray-600', action: () => navigate('/privacy') },
    { icon: HelpCircle, label: 'Help & Support', color: 'text-gray-600', action: () => navigate('/help-support') },
    { icon: Info, label: 'Terms and Policies', color: 'text-gray-600', action: () => navigate('/terms-policies') },
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
          <div className="w-full h-full flex flex-col relative bg-white">
            
            {/* Header */}
            <div className="px-6 pt-16 pb-6 border-b border-gray-100">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Employer Dashboard</h1>
                <p className="text-gray-600">Manage your business and find the right candidates</p>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 pt-6 pb-8 overflow-y-auto">
              
              {/* Business Info Card */}
              <div className="bg-slate-800 rounded-xl p-6 mb-6 text-white">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4">
                    <img 
                      src="/lovable-uploads/533b9faf-8093-4e1d-b089-759120f751e1.png" 
                      alt="Business Logo" 
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Sunset Valley Farm</h2>
                    <p className="text-slate-200">Agricultural Business • Queensland</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-slate-200">Active Jobs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">48</div>
                    <div className="text-sm text-slate-200">Applications</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-sm text-slate-200">Matches</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-3">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={index}
                        onClick={action.action}
                        className={`${action.color} hover:opacity-90 text-white h-16 text-base rounded-xl justify-start px-6`}
                      >
                        <Icon size={24} className="mr-4" />
                        {action.label}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">New application received</p>
                        <p className="text-sm text-gray-600">Farm Hand position • Maria Santos</p>
                      </div>
                      <span className="text-xs text-gray-500">2h ago</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Job posting approved</p>
                        <p className="text-sm text-gray-600">Seasonal Fruit Picker position</p>
                      </div>
                      <span className="text-xs text-gray-500">1d ago</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">New match found</p>
                        <p className="text-sm text-gray-600">John Smith • 95% compatibility</p>
                      </div>
                      <span className="text-xs text-gray-500">2d ago</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
                
                <div className="space-y-1">
                  {settingsItems.map((item, index) => {
                    const Icon = item.icon;
                    const isLogout = item.label === 'Log out';
                    return (
                      <button
                        key={index}
                        onClick={item.action}
                        className={`flex items-center w-full p-4 ${isLogout ? 'bg-red-50' : 'bg-gray-50'} hover:bg-opacity-80 transition-colors rounded-xl`}
                      >
                        <Icon size={20} className={`mr-4 ${item.color}`} />
                        <span className={`text-left font-medium ${item.color}`}>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;