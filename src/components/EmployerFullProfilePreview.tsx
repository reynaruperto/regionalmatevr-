import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmployerFullProfilePreview: React.FC = () => {
  const navigate = useNavigate();

  // Mocked employer data (replace later with props/context/API)
  const employer = {
    name: "Kangafarm",
    employerName: "John Doe",
    tagline:
      "Family-run farm in regional Queensland, offering seasonal work in fruit picking and packing.",
    description:
      "We specialize in seasonal fruit picking, packing, and sustainable farming practices. Our farm offers accommodation and meals, and provides training for WHV workers to gain skills while enjoying life in the countryside.",
    profileImage:
      "/lovable-uploads/5171768d-7ee5-4242-8d48-29d87d896302.png",
    abn: "11 222 333 444",
    location: "Clontarf, QLD 4017",
    industry: "Agriculture & Farming",
    companySize: "1–10 employees",
    establishedYear: "2015",
    rolesOffered: ["Fruit Picker", "Farm Hand"],
    jobAvailability: "Seasonal – September 2025 onwards",
    payRange: "$25–30/hour + super",
    facilities: ["Accommodation provided", "Meals included", "Training provided"],
    certifications: ["Fair Work Compliant"],
    workEnvironment: "Outdoor farm work, supportive small team, flexible shifts.",
    contactEmail: "kangafarm@gmail.com",
    contactPhone: "+61 491 222 333",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      {/* iPhone 16 Pro Max Frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden flex flex-col relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>

          {/* Header */}
          <div className="px-4 py-3 flex-shrink-0 sticky top-6 z-10 bg-white border-b">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {/* Card */}
            <div className="w-full max-w-sm mx-auto bg-white rounded-3xl p-6 shadow-lg">
              {/* Match Header */}
              <div className="bg-gradient-to-r from-orange-500 to-slate-800 text-white text-center py-4 rounded-2xl mb-6">
                <h2 className="text-xl font-bold">It’s a Match!</h2>
                <p className="text-sm mt-1">{employer.name.toUpperCase()}</p>
              </div>

              {/* Profile Photo */}
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-orange-500 overflow-hidden">
                  <img
                    src={employer.profileImage}
                    alt={employer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Tagline */}
              <div className="text-center mb-6 bg-gray-50 rounded-2xl p-4">
                <p className="text-gray-700 text-sm italic leading-relaxed">
                  {employer.tagline}
                </p>
              </div>

              {/* Key Details */}
              <div className="space-y-3 text-sm mb-6">
                <div>
                  <span className="font-semibold">ABN:</span> {employer.abn}
                </div>
                <div>
                  <span className="font-semibold">Location:</span>{" "}
                  {employer.location}
                </div>
                <div>
                  <span className="font-semibold">Industry:</span>{" "}
                  {employer.industry}
                </div>
                <div>
                  <span className="font-semibold">Company Size:</span>{" "}
                  {employer.companySize}
                </div>
                <div>
                  <span className="font-semibold">Established:</span>{" "}
                  {employer.establishedYear}
                </div>
                <div>
                  <span className="font-semibold">Roles Offered:</span>{" "}
                  {employer.rolesOffered.join(", ")}
                </div>
                <div>
                  <span className="font-semibold">Job Availability:</span>{" "}
                  {employer.jobAvailability}
                </div>
                <div>
                  <span className="font-semibold">Pay Range:</span>{" "}
                  {employer.payRange}
                </div>
                <div>
                  <span className="font-semibold">Facilities:</span>{" "}
                  {employer.facilities.join(", ")}
                </div>
                <div>
                  <span className="font-semibold">Certifications:</span>{" "}
                  {employer.certifications.join(", ")}
                </div>
                <div>
                  <span className="font-semibold">Work Environment:</span>{" "}
                  {employer.workEnvironment}
                </div>
              </div>

              {/* Contact info unlocked in full profile */}
              <div className="bg-gradient-to-r from-orange-500 to-slate-800 text-white rounded-2xl p-6 text-center mb-6">
                <h3 className="font-bold text-lg mb-3">Contact Details</h3>
                <div className="space-y-2">
                  <div className="bg-white/20 rounded-xl p-3">
                    <div className="font-semibold">Email:</div>
                    <div className="text-lg">{employer.contactEmail}</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-3">
                    <div className="font-semibold">Phone:</div>
                    <div className="text-lg">{employer.contactPhone}</div>
                  </div>
                </div>
              </div>

              {/* View Jobs Button - Disabled for preview */}
              <div className="mt-4">
                <Button
                  disabled
                  className="w-full bg-gray-400 cursor-not-allowed text-white rounded-lg h-12 flex items-center justify-center font-medium"
                >
                  View Available Jobs (Preview)
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


