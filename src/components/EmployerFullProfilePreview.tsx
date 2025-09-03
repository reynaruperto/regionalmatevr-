import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmployerFullProfilePreview: React.FC = () => {
  const navigate = useNavigate();

  // Mocked employer data (replace with Supabase/props later)
  const [employerProfile] = useState({
    businessName: "Kangafarm",
    employerName: "John Doe",
    businessTagline: "Family-run farm in regional Queensland, offering seasonal work in fruit picking and packing",
    location: "Clontarf, QLD 4017",
    industry: "Agriculture & Farming",
    rolesOffered: ["Fruit Picker", "Farm Hand"],
    jobAvailability: "Seasonal, Available Sep 2025",
    payRange: "$25–30/hour + super",
    facilities: ["Accommodation provided", "Meals included", "Transport provided"],
    abn: "11 222 333 444",
    profileImage: "/lovable-uploads/b18ec59d-46ed-4c8c-95cb-65e60d9aea25.png",
    companySize: "1–10 employees",
    yearsInBusiness: "5 years",
    website: "www.kangafarm.com"
  });

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>

          {/* Header */}
          <div className="px-4 py-3 flex-shrink-0 sticky top-0 bg-white border-b z-10">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {/* Profile Card */}
            <div className="w-full max-w-sm mx-auto bg-white rounded-3xl p-6 shadow-lg">
              
              {/* Profile Header */}
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto rounded-full border-4 border-slate-800 overflow-hidden mb-4">
                  <img 
                    src={employerProfile.profileImage}
                    alt={employerProfile.businessName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{employerProfile.businessName}</h2>
                <p className="text-sm text-gray-600">{employerProfile.businessTagline}</p>
              </div>

              {/* Key Details */}
              <div className="space-y-3 text-sm text-gray-800 mb-6">
                <div><span className="font-semibold">Employer:</span> {employerProfile.employerName}</div>
                <div><span className="font-semibold">Location:</span> {employerProfile.location}</div>
                <div><span className="font-semibold">Industry:</span> {employerProfile.industry}</div>
                <div><span className="font-semibold">Roles Offered:</span> {employerProfile.rolesOffered.join(", ")}</div>
                <div><span className="font-semibold">Job Availability:</span> {employerProfile.jobAvailability}</div>
                <div><span className="font-semibold">Pay Range:</span> {employerProfile.payRange}</div>
                <div><span className="font-semibold">Facilities / Extras:</span> {employerProfile.facilities.join(", ")}</div>
                <div><span className="font-semibold">ABN Provided:</span> ✔ Yes</div>
                <div><span className="font-semibold">Company Size:</span> {employerProfile.companySize}</div>
                <div><span className="font-semibold">Years in Business:</span> {employerProfile.yearsInBusiness}</div>
                {employerProfile.website && (
                  <div><span className="font-semibold">Website:</span> {employerProfile.website}</div>
                )}
              </div>

              {/* Disabled View Jobs Button */}
              <div className="mt-6">
                <Button
                  disabled
                  className="w-full bg-gray-300 text-gray-600 rounded-lg h-12 flex items-center justify-center gap-2 font-medium cursor-not-allowed"
                >
                  View Jobs (Preview Only)
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerFullProfilePreview;
