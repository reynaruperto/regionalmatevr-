import React from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const ProfileCardPreview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isEmployerPreview = location.pathname === '/employer/profile-preview';

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
                <div className={`${isEmployerPreview ? 'bg-slate-800' : 'bg-orange-500'} text-white text-center py-4 rounded-2xl mb-6`}>
                  <h2 className="text-xl font-bold">{isEmployerPreview ? 'KANGAFARM' : 'PETER'}</h2>
                </div>

                {/* Profile Picture */}
                <div className="flex justify-center mb-6">
                  <div className={`w-32 h-32 rounded-full border-4 ${isEmployerPreview ? 'border-slate-800' : 'border-orange-500'} overflow-hidden`}>
                    <img 
                      src={isEmployerPreview ? "/lovable-uploads/b18ec59d-46ed-4c8c-95cb-65e60d9aea25.png" : "/lovable-uploads/5171768d-7ee5-4242-8d48-29d87d896302.png"}
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="text-center mb-6">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {isEmployerPreview 
                      ? "Family-run farm in regional Queensland, offering seasonal work in fruit picking and packing"
                      : "Backpacker from Argentina with experience in farm work, currently in Brisbane, QLD"
                    }
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm mb-6">
                  {isEmployerPreview ? (
                    <>
                      <div><span className="font-semibold">Employer:</span> John Doe</div>
                      <div><span className="font-semibold">Location:</span> Clontarf, QLD 4017</div>
                      <div><span className="font-semibold">Industry:</span> Agriculture and Farming</div>
                      <div><span className="font-semibold">Roles Offered:</span> Fruit Picker, Farm Hand</div>
                      <div><span className="font-semibold">Job Availability:</span> Ongoing, September 2025</div>
                      <div><span className="font-semibold">Pay & Benefits:</span> $28/hour + super</div>
                      <div><span className="font-semibold">Facilities / Extras:</span> Meals included, Accommodation available on discounted price</div>
                    </>
                  ) : (
                    <>
                      <div><span className="font-semibold">Nationality:</span> Argentina</div>
                      <div><span className="font-semibold">Location (Current / Preferred):</span> Brisbane, QLD 4000</div>
                      <div><span className="font-semibold">Willing to Relocate:</span> Yes, anywhere in QLD/NSW</div>
                      <div><span className="font-semibold">Visa Type & Expiry:</span> 417 (Working Holiday) - Expires Sep 2026</div>
                      <div><span className="font-semibold">Industry:</span> Agriculture and Farming</div>
                      <div>
                        <span className="font-semibold">Experience / Skills:</span>
                        <div className="mt-1 space-y-1 text-xs">
                          <div>2020-2025: Farm Attendant - VillaFarm</div>
                          <div>2019-2020: Marketing Head - Workspace</div>
                          <div>2007-2019: Winery Assistant - BodegaWinery</div>
                        </div>
                      </div>
                      <div><span className="font-semibold">Licenses / Certificates:</span> Driver's License, First Aid</div>
                      <div><span className="font-semibold">Availability (date, duration):</span> Sep 2025 (8 months)</div>
                      <div><span className="font-semibold">Languages:</span> Spanish (Native), English (Fluent)</div>
                    </>
                  )}
                </div>

                {/* Locked Message */}
                <div className="bg-gray-200 text-center py-3 rounded-xl mb-4">
                  <p className="text-gray-600 text-sm">Full Details Unlocked if you both Match</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className={`w-full ${isEmployerPreview ? 'bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black' : 'bg-gradient-to-r from-orange-400 to-slate-800 hover:from-orange-500 hover:to-slate-900'} text-white px-8 py-3 rounded-2xl flex items-center gap-3 justify-center`}>
                    <span className="font-semibold">{isEmployerPreview ? 'Like to Match' : 'Heart to Match'}</span>
                    <div className={`${isEmployerPreview ? 'bg-slate-600' : 'bg-orange-500'} rounded-full p-2`}>
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
                onClick={() => navigate(isEmployerPreview ? '/employer/edit-profile' : '/whv/edit-WHVdetails')}
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