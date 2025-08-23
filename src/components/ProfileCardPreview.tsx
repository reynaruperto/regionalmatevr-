import React from 'react';
import { ArrowLeft, ThumbsUp } from 'lucide-react';
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
          <div className="w-full h-full flex flex-col relative bg-gray-100">
            
            {/* Content */}
            <div className="flex-1 px-6 pt-16 pb-20 flex flex-col items-center justify-center">
              
              {/* Profile Card */}
              <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-lg">
                
                {/* Header with Name */}
                <div className="bg-orange-500 text-white text-center py-3 rounded-xl mb-6">
                  <h2 className="text-lg font-bold">PETER PARKER</h2>
                </div>

                {/* Profile Photo */}
                <div className="flex justify-center mb-4">
                  <img
                    src="/lovable-uploads/8ff82176-d379-4d34-b436-f2c63b90c153.png"
                    alt="Peter Parker"
                    className="w-24 h-24 rounded-full object-cover border-4 border-orange-500"
                  />
                </div>

                {/* Description */}
                <p className="text-sm text-gray-800 text-center mb-6 leading-relaxed">
                  Backpacker from Argentina with experience in farm work, currently in Brisbane, QLD
                </p>

                {/* Details */}
                <div className="space-y-2 text-sm mb-6">
                  <div>
                    <span className="font-semibold text-gray-900">Nationality: </span>
                    <span className="text-gray-700">Argentina</span>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-900">Location (Current / Preferred): </span>
                    <span className="text-gray-700">Brisbane</span>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-900">Industry: </span>
                    <span className="text-gray-700">Agriculture and Farming</span>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-900">Experience / Skills:</span>
                    <div className="mt-1 text-gray-700 leading-tight">
                      2020-2025 - Farm Attendant - VillaFarm<br />
                      2010-2020 - Marketing Head - Workspot<br />
                      2007-2010 - Winery Assistant - BodegaWinery
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-900">Licenses / Certificates: </span>
                    <span className="text-gray-700">N/A</span>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-900">Availability (date, duration): </span>
                    <span className="text-gray-700">Sep 2025</span>
                  </div>
                </div>

                {/* Premium Content Teaser */}
                <div className="bg-gray-200 rounded-xl p-4 text-center mb-6">
                  <p className="text-sm text-gray-600 font-medium">
                    Full Details Unlocked if you both Match
                  </p>
                </div>

                {/* Like to Match Button */}
                <div className="text-center">
                  <button className="inline-flex items-center gap-2 text-blue-600 font-medium">
                    <span>Like to Match</span>
                    <ThumbsUp size={20} className="text-orange-500" />
                  </button>
                </div>
              </div>

            </div>

            {/* Back Button */}
            <div className="absolute bottom-8 left-6">
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-10 h-10 bg-transparent"
                onClick={() => navigate('/whv-edit-profile')}
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