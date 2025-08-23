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
            
            {/* Header */}
            <div className="px-4 py-3 border-b bg-white flex-shrink-0">
              <div className="flex items-center gap-3">
                <button onClick={() => navigate('/whv-edit-profile')}>
                  <ArrowLeft size={24} className="text-gray-600" />
                </button>
                <h1 className="text-lg font-medium text-gray-900">
                  Profile Preview
                </h1>
              </div>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col items-center">
              
              {/* Profile Card */}
              <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-lg">
                
                {/* Header with Name */}
                <div className="bg-orange-500 text-white text-center py-4 rounded-xl mb-6">
                  <h2 className="text-xl font-bold">PETER</h2>
                </div>

                {/* Profile Photo */}
                <div className="flex justify-center mb-6">
                  <img
                    src="/lovable-uploads/7911e593-bbbd-462d-9d13-95b476c84a6f.png"
                    alt="Peter"
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
                    <span className="text-gray-700">Brisbane, QLD 4000</span>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-900">Willing to Relocate: </span>
                    <span className="text-gray-700">Yes, anywhere in QLD/NSW</span>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-900">Visa Type & Expiry: </span>
                    <span className="text-gray-700">417 (Working Holiday) - Expires Sep 2026</span>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-900">Industry: </span>
                    <span className="text-gray-700">Agriculture and Farming</span>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-900">Experience / Skills:</span>
                    <div className="mt-1 text-gray-700 leading-tight space-y-1">
                      <div>2020-2025: Farm Attendant - VillaFarm</div>
                      <div>2019-2020: Marketing Head - Workspace</div>
                      <div>2007-2019: Winery Assistant - BodegaWinery</div>
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-900">Licenses / Certificates: </span>
                    <span className="text-gray-700">Driver's License, First Aid</span>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-900">Availability (date, duration): </span>
                    <span className="text-gray-700">Sep 2025 (8 months)</span>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-900">Languages: </span>
                    <span className="text-gray-700">Spanish (Native), English (Fluent)</span>
                  </div>
                </div>

                {/* Premium Content Teaser */}
                <div className="bg-gray-200 rounded-xl p-4 text-center mb-6">
                  <p className="text-sm text-gray-600 font-medium">
                    Full Details Unlocked if you both Match
                  </p>
                </div>

                {/* Heart to Match Button */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-400 to-gray-800 px-8 py-3 rounded-full text-white font-medium">
                    <span>Heart to Match</span>
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <Heart size={16} className="text-white fill-white" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardPreview;