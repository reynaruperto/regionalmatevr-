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
          <div className="w-full h-full flex flex-col relative bg-gray-100">
            
            {/* Content */}
            <div className="flex-1 px-6 pt-16 pb-20 flex flex-col items-center justify-center">
              
              {/* Profile Card - Scrollable */}
              <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden" style={{height: '600px'}}>
                
                {/* Header with Name */}
                <div className="bg-orange-500 text-white text-center py-4 flex-shrink-0">
                  <h2 className="text-xl font-bold">PETER PARKER</h2>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6">

                  {/* Profile Photo */}
                  <div className="flex justify-center mb-6">
                    <img
                      src="/lovable-uploads/7911e593-bbbd-462d-9d13-95b476c84a6f.png"
                      alt="Peter Parker"
                      className="w-32 h-32 rounded-full object-cover border-4 border-gray-800"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-800 text-center mb-6 leading-relaxed">
                    Backpacker from Argentina with experience in farm work, currently in Brisbane, QLD
                  </p>

                  {/* Details */}
                  <div className="space-y-3 text-sm mb-6">
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
                      <div className="mt-1 text-gray-700 leading-tight space-y-1">
                        <div>2020-2025: Farm Attendant - VillaFarm</div>
                        <div>2010-2020: Marketing Head - Workspot</div>
                        <div>2007-2010: Winery Assistant - BodegaWinery</div>
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
                    <div className="inline-flex items-center gap-2 text-blue-600 font-medium">
                      <span>Like to Match</span>
                      <div className="w-8 h-8 bg-orange-500 rounded p-1">
                        <svg viewBox="0 0 24 24" className="w-full h-full text-white fill-current">
                          <path d="M14 2L16 6L21 6.5L17.5 10.5L18.5 16L14 13.5L9.5 16L10.5 10.5L7 6.5L12 6L14 2Z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
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