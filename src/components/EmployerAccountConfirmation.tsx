import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmployerAccountConfirmation: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/employer/sign-in');
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
              {/* Success Modal Card */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 max-w-sm w-full text-center">
                
                {/* Lightning Icon */}
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-orange-500" />
                </div>

                {/* Title */}
                <h1 className="text-xl font-semibold text-gray-900 mb-4 leading-tight">
                  You have created your<br />
                  Regional Mate Account<br />
                  Successfully
                </h1>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                  Start posting Jobs and find the<br />
                  perfect candidate
                </p>

                {/* Sign In Button */}
                <Button 
                  onClick={handleSignIn}
                  className="w-full h-12 text-base rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium"
                >
                  Sign In
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerAccountConfirmation;