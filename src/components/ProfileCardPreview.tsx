import React from 'react';
import { ArrowLeft } from 'lucide-react';
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
          <div className="w-full h-full flex flex-col relative bg-gray-50">
            
            {/* Content */}
            <div className="flex-1 px-6 pt-16 flex flex-col items-center justify-center">
              
              {/* Profile Card */}
              <div className="w-full max-w-sm">
                
                {/* Header with Name */}
                <div className="bg-orange-500 text-white text-center py-4 rounded-t-2xl mb-0">
                  <h2 className="text-xl font-bold">PETER PARKER</h2>
                </div>

                {/* Profile Content */}
                <div className="bg-white border border-gray-200 rounded-b-2xl p-6 shadow-lg">
                  {/* Profile Photo */}
                  <div className="flex justify-center mb-4">
                    <img
                      src="/lovable-uploads/8ff82176-d379-4d34-b436-f2c63b90c153.png"
                      alt="Peter Parker"
                      className="w-32 h-32 rounded-full object-cover border-4 border-orange-200"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 text-center mb-6">
                    Backpacker from Argentina with experience in farm work, currently in Brisbane, QLD
                  </p>

                  {/* Details */}
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-semibold text-gray-900">Nationality:</span>
                      <span className="text-gray-700 ml-1">Argentina</span>
                    </div>

                    <div>
                      <span className="font-semibold text-gray-900">Location (Current / Preferred):</span>
                      <span className="text-gray-700 ml-1">Brisbane QLD 4000</span>
                    </div>

                    <div>
                      <span className="font-semibold text-gray-900">Industry:</span>
                      <span className="text-gray-700 ml-1">Agriculture and Farming</span>
                    </div>

                    <div>
                      <span className="font-semibold text-gray-900">Experience / Skills:</span>
                      <div className="mt-1 space-y-1">
                        <div className="text-gray-700 text-xs ml-1">2020-2025 - Farm Attendant - Villafarm</div>
                        <div className="text-gray-700 text-xs ml-1">2010-2020 - Marketing Head - Worksport</div>
                        <div className="text-gray-700 text-xs ml-1">2007-2010 - Winery Assistant - Bodegawinery</div>
                      </div>
                    </div>

                    <div>
                      <span className="font-semibold text-gray-900">Licenses / Certificates:</span>
                      <span className="text-gray-700 ml-1">N/A</span>
                    </div>

                    <div>
                      <span className="font-semibold text-gray-900">Availability (date, duration):</span>
                      <span className="text-gray-700 ml-1">Sep 2025</span>
                    </div>
                  </div>

                  {/* Premium Content Teaser */}
                  <div className="mt-6 bg-gray-100 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 font-medium">
                      Full Details Unlocked if you both Match
                    </p>
                  </div>

                  {/* Like to Match Button */}
                  <div className="mt-6 text-center">
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-b from-orange-400 to-orange-600 rounded-lg text-white font-medium hover:from-orange-500 hover:to-orange-700 transition-all duration-200 shadow-sm">
                      <span>Like to Match</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Back Button */}
            <div className="absolute bottom-8 left-6">
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-12 h-12 bg-white rounded-xl shadow-sm"
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