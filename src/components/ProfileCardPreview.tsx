import React from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ProfileCardPreview: React.FC = () => {
  const navigate = useNavigate();

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
            <div className="flex-1 px-6 pt-16 flex flex-col items-center justify-center">
              
              {/* Profile Card */}
              <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-lg">
                
                {/* Business Header */}
                <div className="bg-orange-500 text-white text-center py-4 rounded-2xl mb-6">
                  <h2 className="text-xl font-bold">PETER PARKER</h2>
                  <p className="text-sm opacity-90">WHV Backpacker</p>
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

                {/* Description */}
                <div className="text-center mb-6">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Backpacker from Argentina with experience<br />
                    in farm work, currently in Brisbane, QLD
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm mb-6">
                  <div><span className="font-semibold">Nationality:</span> Argentina</div>
                  <div><span className="font-semibold">Location (Current / Preferred):</span> Brisbane QLD 4000</div>
                  <div><span className="font-semibold">Industry:</span> Agriculture and Farming</div>
                  <div><span className="font-semibold">Experience / Skills:</span> Farm Work, Hospitality</div>
                  <div><span className="font-semibold">Licenses / Certificates:</span> N/A</div>
                  <div><span className="font-semibold">Availability (date, duration):</span> Sep 2025</div>
                </div>

                {/* Locked Message */}
                <div className="bg-gray-200 text-center py-3 rounded-xl mb-4">
                  <p className="text-gray-600 text-sm">Full Details Unlocked if you both Match</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-12">
                    Message
                  </Button>
                  <button className="bg-white rounded-xl p-3 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 h-12">
                    <span className="text-orange-500 font-medium text-sm">Heart to Match</span>
                    <div className="bg-orange-500 rounded-full p-2">
                      <Heart size={16} className="text-white fill-white" />
                    </div>
                  </button>
                </div>
              </div>

            </div>

            {/* Back Button */}
            <div className="absolute bottom-8 left-6">
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-12 h-12 bg-white rounded-xl shadow-sm"
                onClick={() => navigate('/whv-profile-edit')}
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardPreview;