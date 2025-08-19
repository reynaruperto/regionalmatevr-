import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AccountConfirmation: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/employer-sign-in');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-background rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          {/* Main content container with background */}
          <div 
            className="w-full h-full flex flex-col relative"
            style={{
              backgroundImage: `url(/lovable-uploads/c250e98e-db6b-418e-a60f-e42559ce2ef4.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >

            {/* Content */}
            <div className="flex-1 flex items-center justify-center px-6">
              <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                <div className="text-center mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    You have created your Regional Mate Account Successfully
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Start posting Jobs and find the perfect candidate
                  </p>
                </div>

                {/* Sign In Button */}
                <Button 
                  onClick={handleSignIn}
                  className="w-full h-12 text-base rounded-xl bg-slate-800 hover:bg-slate-700 text-white"
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

export default AccountConfirmation;