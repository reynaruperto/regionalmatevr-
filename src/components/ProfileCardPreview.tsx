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
          <div className="w-full h-full flex flex-col relative bg-gray-200">
            
            {/* Content */}
            <div className="flex-1 px-6 pt-16 flex flex-col items-center justify-center">
              
              {/* Profile Card */}
              <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-lg">
                
                {/* WHV Header */}
                <div className="bg-orange-500 text-white text-center py-4 rounded-2xl mb-6">
                  <h2 className="text-xl font-bold">PETER</h2>
                  <p className="text-sm opacity-90">Working Holiday Visa</p>
                </div>

                {/* Profile Picture */}
                <div className="flex justify-center mb-6">
                  <div className="w-32 h-32 rounded-full border-4 border-orange-500 overflow-hidden">
                    <img 
                      src="/lovable-uploads/8ff82176-d379-4d34-b436-f2c63b90c153.png" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="text-center mb-6">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Experienced farm worker from Argentina<br />
                    seeking opportunities in agriculture<br />
                    and outdoor work
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm mb-6">
                  <div><span className="font-semibold">Nationality:</span> Argentina</div>
                  <div><span className="font-semibold">Visa:</span> 462 (expires 01/01/2026)</div>
                  <div><span className="font-semibold">Available from:</span> 10/10/2025</div>
                  <div><span className="font-semibold">Location:</span> Brisbane, QLD</div>
                  <div><span className="font-semibold">Industry Interest:</span> Agriculture & Farming</div>
                  <div><span className="font-semibold">Willing to Relocate:</span> Yes</div>
                </div>

                {/* Locked Message */}
                <div className="bg-gray-200 text-center py-3 rounded-xl mb-4">
                  <p className="text-gray-600 text-sm">Full Profile Unlocked if you both Match</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-12">
                    View Profile
                  </Button>
                  <button className="bg-white rounded-xl p-3 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 h-12">
                    <span className="text-orange-500 font-medium text-sm">Like to Match</span>
                    <div className="flex items-center justify-center">
                      <img 
                        src="/lovable-uploads/e71624ef-9964-4e25-bd6d-239d2fc301b9.png" 
                        alt="Like to Match" 
                        className="w-8 h-10 object-contain"
                      />
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