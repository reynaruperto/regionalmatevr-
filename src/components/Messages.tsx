import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/BottomNavigation';

const Messages: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone 16 Pro Max Frame - Fixed dimensions */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-4 flex-shrink-0"></div>
          
          {/* Header - Fixed */}
          <div className="px-4 py-3 border-b bg-white flex-shrink-0">
            <div className="flex items-center justify-between">
              <Search size={24} className="text-gray-600" />
              <h1 className="text-xl font-bold text-orange-500">Messages</h1>
              <div className="w-6"></div> {/* Spacer for balance */}
            </div>
          </div>

          {/* Content Area with Blur Background */}
          <div className="flex-1 relative overflow-hidden">
            {/* Blurred Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-300 backdrop-blur-sm"></div>
            
            {/* Centered Modal */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl">
                {/* Lightning Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <Zap className="w-8 h-8 text-orange-500" fill="currentColor" />
                  </div>
                </div>

                {/* Message */}
                <div className="text-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    These functions are for future phases
                  </h2>
                  <p className="text-gray-600">
                    We'll be back
                  </p>
                </div>

                {/* Back Button */}
                <Button
                  onClick={handleBack}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg font-medium"
                >
                  Back
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Navigation - Fixed */}
          <div className="bg-white border-t flex-shrink-0 rounded-b-[48px]">
            <BottomNavigation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;