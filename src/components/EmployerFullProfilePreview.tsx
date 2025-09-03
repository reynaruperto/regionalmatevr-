import React from 'react';
import { ArrowLeft, MapPin, Calendar, Users, DollarSign, Home, Phone, Mail, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const EmployerFullProfilePreview: React.FC = () => {
  const navigate = useNavigate();

  // Mock employer data (replace later with props/context/API)
  const employerData = {
    businessName: "Kangafarm",
    profilePhoto: "/lovable-uploads/b18ec59d-46ed-4c8c-95cb-65e60d9aea25.png",
    tagline: "Family-run farm in regional Queensland, offering seasonal work in fruit picking and packing",
    description: "We are a family-owned and operated farm that has been growing quality fruit for over 20 years. We provide a welcoming environment for working holiday visa holders and offer comprehensive training for all roles.",
    location: "Clontarf, QLD 4017",
    industry: "Agriculture & Farming",
    rolesOffered: ["Fruit Picker", "Farm Hand", "Packing Assistant"],
    jobAvailability: "Seasonal",
    payRange: "$28/hour + super",
    facilities: ["Meals included", "Accommodation available", "Transport provided", "Equipment provided"],
    abnVerified: true,
    companySize: "10-50 employees",
    established: "2003",
    contactEmail: "jobs@kangafarm.com.au",
    contactPhone: "+61 7 3283 0000",
    website: "www.kangafarm.com.au",
    workingHours: "6:00 AM - 4:00 PM",
    accommodationDetails: "On-site dormitory style accommodation with shared facilities, $150/week",
    trainingProvided: "Full training provided for all equipment and safety procedures"
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
                    <BadgeCheck size={18} className="text-green-400" />
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

                {/* Company Description */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">About Our Business</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {employerData.description}
                  </p>
                </div>

                {/* Basic Information */}
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-500" />
                    <span className="font-semibold">Location:</span> {employerData.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    <span className="font-semibold">Established:</span> {employerData.established}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-500" />
                    <span className="font-semibold">Company Size:</span> {employerData.companySize}
                  </div>
                  <div>
                    <span className="font-semibold">Industry:</span> {employerData.industry}
                  </div>
                </div>

                {/* Job Information */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Job Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-semibold">Roles Offered:</span> {employerData.rolesOffered.join(", ")}</div>
                    <div><span className="font-semibold">Availability:</span> {employerData.jobAvailability}</div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-gray-500" />
                      <span className="font-semibold">Pay Rate:</span> {employerData.payRange}
                    </div>
                    <div><span className="font-semibold">Working Hours:</span> {employerData.workingHours}</div>
                    <div><span className="font-semibold">Training:</span> {employerData.trainingProvided}</div>
                  </div>
                </div>

                {/* Facilities & Benefits */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Facilities & Benefits</h3>
                  <div className="space-y-2 text-sm">
                    {employerData.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accommodation Details */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Home size={16} className="text-gray-500" />
                    Accommodation
                  </h3>
                  <p className="text-gray-700 text-sm">
                    {employerData.accommodationDetails}
                  </p>
                </div>

                {/* Contact Information */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-500" />
                      <span>{employerData.contactEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-500" />
                      <span>{employerData.contactPhone}</span>
                    </div>
                    <div><span className="font-semibold">Website:</span> {employerData.website}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black text-white px-8 py-3 rounded-2xl"
                    onClick={() => navigate('/employer/edit-profile')}
                  >
                    Edit Profile
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white px-8 py-3 rounded-2xl"
                    onClick={() => navigate('/employer/jobs')}
                  >
                    Manage Jobs
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
                onClick={() => navigate(-1)}
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

export default EmployerFullProfilePreview;