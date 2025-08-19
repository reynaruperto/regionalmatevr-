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
                
                {/* Business Header */}
                <div className="bg-[#1E293B] text-white text-center py-4 rounded-2xl mb-6">
                  <h2 className="text-xl font-bold">KANGAFARM</h2>
                  <p className="text-sm opacity-90">Employer: John Doe</p>
                </div>

                {/* Profile Picture */}
                <div className="flex justify-center mb-6">
                  <div className="w-32 h-32 rounded-full border-4 border-[#1E293B] overflow-hidden">
                    <img 
                      src="/lovable-uploads/51369c33-1aa8-4f19-b8a1-e65e12f9ec9f.png" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="text-center mb-6">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Family-run farm in regional Queensland,<br />
                    offering seasonal work in fruit picking<br />
                    and packing
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm mb-6">
                  <div><span className="font-semibold">Location:</span> Clontarf, QLD 4017</div>
                  <div><span className="font-semibold">Industry:</span> Agriculture and Farming</div>
                  <div><span className="font-semibold">Jobs Offered:</span> Fruit Picking, Farm Hand</div>
                  <div><span className="font-semibold">Job Availability:</span> Ongoing, September 2025</div>
                  <div><span className="font-semibold">Pay & Benefits:</span> $28/hour + super</div>
                  <div><span className="font-semibold">Facilities / Extras:</span> Meals included, Accommodation available on discounted price</div>
                </div>

                {/* Locked Message */}
                <div className="bg-gray-200 text-center py-3 rounded-xl mb-4">
                  <p className="text-gray-600 text-sm">Full Details Unlocked if you both Match</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-[#1E293B] hover:bg-[#1E293B]/90 text-white rounded-xl h-12">
                    View Jobs
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="text-[#1E293B] font-semibold text-sm">Like to Match</span>
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <img 
                        src="/lovable-uploads/e71624ef-9964-4e25-bd6d-239d2fc301b9.png" 
                        alt="Like to Match" 
                        className="w-8 h-8 object-contain"
                      />
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
                className="w-12 h-12 bg-white rounded-xl shadow-sm"
                onClick={() => navigate('/edit-profile')}
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