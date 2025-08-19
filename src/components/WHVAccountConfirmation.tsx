import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const WHVAccountConfirmation: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/whv-login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-background rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          {/* Main content container */}
          <div className="w-full h-full flex flex-col relative bg-white">
            
            {/* Content */}
            <div className="flex-1 px-6 flex flex-col items-center justify-center">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-8">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Success Message */}
              <div className="text-center mb-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  You have created your Regional Mate Account Successfully
                </h2>
                
                <p className="text-gray-600 mb-8">
                  Start looking for employers and your Working Holiday visa Journey
                </p>
              </div>
            </div>

            {/* Continue button */}
            <div className="px-6 pb-8">
              <Button 
                onClick={handleContinue}
                className="w-full h-14 text-lg rounded-xl bg-slate-800 hover:bg-slate-700 text-white"
              >
                Sign In
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WHVAccountConfirmation;