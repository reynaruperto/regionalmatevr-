import React from 'react';
import { ArrowLeft, Heart, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const ProfileCardPreview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isEmployerPreview = location.pathname === '/employer/profile-preview';

  // Mock employer data — replace with real onboarding state later
  const employer = {
    businessName: "Kangafarm",
    tagline: "Family-run farm in regional Queensland, offering seasonal work in fruit picking and packing",
    industry: "Agriculture & Farming",
    rolesOffered: ["Fruit Picker", "Farm Hand"],
    jobAvailability: "Seasonal (Sep 2025 – Mar 2026)",
    payRange: "$25 – $30/hour",
    facilities: ["Accommodation provided", "Meals included"],
    location: "Clontarf, QLD 4017",
    abnProvided: true,
    profilePhoto: "/lovable-uploads/b18ec59d-46ed-4c8c-95cb-65e60d9aea25.png"
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          {/* Main content container */}
          <div className="w-full h-full flex flex-col relative bg-gray-200">
            
            {/* Scrollable Content */}
            <div className="flex-1 px-6 pt-16 pb-24 overflow-y-auto">
              
              {/* Profile Card */}
              <div className="w-full max-w-sm mx-auto bg-white rounded-3xl p-6 shadow-lg">
                
                {/* Business Header */}
                <div className="bg-slate-800 text-white text-center py-4 rounded-2xl mb-6 flex items-center justify-center gap-2">
                  <h2 className="text-xl font-bold">{employer.businessName.toUpperCase()}</h2>
                  {employer.abnProvided && (
                    <span className="flex items-center text-xs bg-green-600 px-2 py-1 rounded-full">
                      <CheckCircle size={14} className="mr-1" />
                      ABN Provided
                    </span>
                  )}
                </div>

                {/* Profile Picture */}
                <div className="flex justify-center mb-6">
                  <div className="w-32 h-32 rounded-full border-4 border-slate-800 overflow-hidden">
                    <img 
                      src={employer.profilePhoto}
                      alt="Business Logo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Tagline */}
                <div className="text-center mb-6">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {employer.tagline}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm mb-6">
                  <div><span className="font-semibold">Location:</span> {employer.location}</div>
                  <div><span className="font-semibold">Industry:</span> {employer.industry}</div>
                  <div><span className="font-semibold">Roles Offered:</span> {employer.rolesOffered.join(", ")}</div>
                  <div><span className="font-semibold">Job Availability:</span> {employer.jobAvailability}</div>
                  <div><span className="font-semibold">Pay Range:</span> {employer.payRange}</div>
                  <div><span className="font-semibold">Facilities & Extras:</span> {employer.facilities.join(", ")}</div>
                </div>

                {/* Locked Message */}
                <div className="bg-gray-200 text-center py-3 rounded-xl mb-4">
                  <p className="text-gray-600 text-sm">Full Details Unlocked if you both Match</p>
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

            {/* Back Button - Fixed at bottom */}
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
