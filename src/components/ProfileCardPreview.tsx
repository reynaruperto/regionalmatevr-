import React from 'react';
import { ArrowLeft, Heart, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const ProfileCardPreview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isEmployerPreview = location.pathname === '/employer/profile-preview';

  // Mock employer data (replace later with props/context/API)
  const employerData = {
    businessName: "Kangafarm",
    profilePhoto: "/lovable-uploads/b18ec59d-46ed-4c8c-95cb-65e60d9aea25.png",
    tagline: "Family-run farm in regional Queensland, offering seasonal work in fruit picking and packing",
    location: "Clontarf, QLD 4017",
    industry: "Agriculture & Farming",
    rolesOffered: ["Fruit Picker", "Farm Hand"],
    jobAvailability: "Seasonal", // ✅ from onboarding/settings
    payRange: "$28/hour + super",
    facilities: ["Meals included", "Accommodation available"],
    abnVerified: true
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative">
          
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          <div className="w-full h-full flex flex-col relative bg-gray-200">
            
            {/* Scrollable Content */}
            <div className="flex-1 px-6 pt-16 pb-24 overflow-y-auto">
              
              <div className="w-full max-w-sm mx-auto bg-white rounded-3xl p-6 shadow-lg">
                
                {/* Header */}
                <div className="bg-slate-800 text-white text-center py-4 rounded-2xl mb-6 flex items-center justify-center gap-2">
                  <h2 className="text-xl font-bold uppercase">{employerData.businessName}</h2>
                  {employerData.abnVerified && (
                    <BadgeCheck size={18} className="text-green-400" title="ABN Verified" />
                  )}
                </div>

                {/* Profile Picture */}
                <div className="flex justify-center mb-6">
                  <div className="w-32 h-32 rounded-full border-4 border-slate-800 overflow-hidden">
                    <img 
                      src={employerData.profilePhoto}
                      alt="Employer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Tagline */}
                <div className="text-center mb-6">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {employerData.tagline}
                  </p>
                </div>

                {/* Key Details */}
                <div className="space-y-2 text-sm mb-6">
                  <div><span className="font-semibold">Location:</span> {employerData.location}</div>
                  <div><span className="font-semibold">Industry:</span> {employerData.industry}</div>
                  <div><span className="font-semibold">Roles Offered:</span> {employerData.rolesOffered.join(", ")}</div>
                  <div><span className="font-semibold">Job Availability:</span> {employerData.jobAvailability}</div>
                  <div><span className="font-semibold">Pay Range:</span> {employerData.payRange}</div>
                  <div><span className="font-semibold">Facilities / Extras:</span> {employerData.facilities.join(", ")}</div>
                </div>

                {/* Locked Message */}
                <div className="bg-gray-200 text-center py-3 rounded-xl mb-4">
                  <p className="text-gray-600 text-sm">Full details unlocked if you both Match</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black text-white px-8 py-3 rounded-2xl flex items-center gap-3 justify-center">
                    <span className="font-semibold">Like to Match</span>
                    <div className="bg-slate-600 rounded-full p-2">
                      <Heart size={20} className="text-white fill-white" />
                    </div>
                  </Button>
                </div>
              </div>

            </div>

            {/* Back Button */}
            <div className="absolute bottom-8 left-6">
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-12 h-12 bg-white rounded-xl shadow-sm"
                onClick={() => navigate('/employer/edit-profile')}
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

