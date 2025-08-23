import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmployerFullProfile {
  id: string;
  name: string;
  employerName: string;
  description: string;
  location: string;
  industry: string;
  rolesOffered: string[];
  jobAvailability: string;
  payBenefits: string;
  facilities: string;
  profileImage: string;
  contactEmail: string;
  contactPhone: string;
  companySize: string;
  establishedYear: string;
  certifications: string[];
  workEnvironment: string;
}

const WHVEmployerFullProfileCard: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [showLikeModal, setShowLikeModal] = useState(false);

  // Mock employer data with full details for mutual matches
  const employerProfiles: { [key: string]: EmployerFullProfile } = {
    '4': {
      id: '4',
      name: 'Green Harvest Farms',
      employerName: 'Sarah Mitchell',
      description: 'Sustainable organic farm in northern NSW, specializing in diverse crop production and eco-friendly farming practices. We offer hands-on experience in modern sustainable agriculture with opportunities for skill development and organic certification training.',
      location: 'Northrivers, NSW 2470',
      industry: 'Agriculture & Farming',
      rolesOffered: ['Farm Assistant', 'Organic Crop Technician', 'Equipment Operator', 'Quality Control Inspector'],
      jobAvailability: 'Available from Aug 2025 - March 2026',
      payBenefits: '$29/hour + super + organic produce allowance + overtime rates',
      facilities: 'Shared accommodation on-farm, Meals provided, Equipment training, Transport to town weekly',
      profileImage: '/lovable-uploads/a8da007e-b9f6-4996-9a54-c5cb294d1f4f.png',
      contactEmail: 'sarah@greenharvest.com.au',
      contactPhone: '+61 2 6687 5432',
      companySize: '25-40 employees',
      establishedYear: '2010',
      certifications: ['Organic Certification Australia', 'Sustainable Agriculture Initiative', 'Fair Work Standards'],
      workEnvironment: 'Outdoor sustainable farming in beautiful northern NSW. Modern equipment and techniques with focus on environmental responsibility and worker wellbeing.'
    },
    '5': {
      id: '5',
      name: 'Coastal Breeze Resort',
      employerName: 'Marcus Thompson',
      description: 'Premier beachfront resort on the Gold Coast offering exceptional hospitality experiences. We provide comprehensive training in hospitality service excellence and career development opportunities in a luxury tourism environment.',
      location: 'Coolangatta, QLD 4225',
      industry: 'Hospitality and Tourism',
      rolesOffered: ['Barista', 'Front Desk Associate', 'Housekeeping Supervisor', 'Food Service Attendant', 'Event Coordinator'],
      jobAvailability: 'Available from Sep 2025 - May 2026',
      payBenefits: '$27/hour + super + tips + staff discounts + performance bonuses',
      facilities: 'Staff accommodation available, Meal allowances, Staff gym access, Professional development programs',
      profileImage: '/lovable-uploads/dde1f5c0-2bba-4180-ab2c-b05bcb7b7def.png',
      contactEmail: 'marcus@coastalbreeze.com.au',
      contactPhone: '+61 7 5536 8901',
      companySize: '80-120 employees',
      establishedYear: '2005',
      certifications: ['Tourism Industry Council', 'Hospitality Excellence Award', 'Green Tourism Certification'],
      workEnvironment: 'Dynamic beachfront resort environment with international guests. Modern facilities and professional team culture focused on service excellence.'
    },
    '6': {
      id: '6',
      name: 'Gotall Estates',
      employerName: 'Robert Williams',
      description: 'Family-owned dairy farm operation on the Sunshine Coast, combining traditional farming values with modern dairy technology. We offer comprehensive dairy farming experience with opportunities to learn cutting-edge agricultural techniques.',
      location: 'Sunshine Coast, QLD 4019',
      industry: 'Dairy Farm',
      rolesOffered: ['Farm Maintenance', 'Dairy Hand', 'Livestock Technician', 'Equipment Operator', 'Quality Assurance'],
      jobAvailability: 'Available from Oct 2025 - September 2026',
      payBenefits: '$30/hour + super + dairy products allowance + skill development bonuses',
      facilities: 'On-site cottage accommodation, Meals included, Equipment certification training, Transport provided',
      profileImage: '/lovable-uploads/3961a45e-fda8-48f4-97cc-a5573079e6ac.png',
      contactEmail: 'robert@gotallestates.com.au',
      contactPhone: '+61 7 5494 7234',
      companySize: '12-18 employees',
      establishedYear: '1987',
      certifications: ['Australian Dairy Standards', 'Animal Welfare Certification', 'Sustainable Farming Practices'],
      workEnvironment: 'Traditional dairy farm with modern equipment on beautiful Sunshine Coast. Close-knit team environment with focus on quality dairy production and animal welfare.'
    }
  };

  const employer = employerProfiles[id || '1'];

  const handleBackNavigation = () => {
    const fromPage = searchParams.get('from');
    const tab = searchParams.get('tab');
    
    if (fromPage === 'whv-matches') {
      navigate(`/whv/matches?tab=${tab || 'matches'}`);
    } else {
      navigate('/whv/matches?tab=matches');
    }
  };

  const handleContactEmployer = (method: 'email' | 'phone' | 'message') => {
    if (method === 'email') {
      window.location.href = `mailto:${employer.contactEmail}`;
    } else if (method === 'phone') {
      window.location.href = `tel:${employer.contactPhone}`;
    } else {
      // Handle messaging functionality
      console.log('Open messaging with employer');
    }
  };

  const handleViewJobs = () => {
    navigate(`/whv/employer/jobs/${id}?from=whv-full-profile&tab=matches`);
  };

  if (!employer) {
    return <div>Employer not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone 16 Pro Max Frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island - Fixed */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-4 flex-shrink-0 sticky top-2 z-10"></div>
          
          {/* Header - Fixed */}
          <div className="px-4 py-3 flex-shrink-0 sticky top-8 z-10 bg-white border-b">
            <button onClick={handleBackNavigation}>
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {/* Match Badge */}
            <div className="text-center mb-4">
              <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                It's a Match! 🎉
              </span>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-orange-500 text-white p-4 text-center">
                <h1 className="text-xl font-bold">{employer.name}</h1>
                <p className="text-sm opacity-90">Employer: {employer.employerName}</p>
              </div>

              {/* Profile Image */}
              <div className="flex justify-center mt-6 mb-6">
                <div className="w-24 h-24 rounded-full border-4 border-gray-800 overflow-hidden bg-white shadow-lg">
                  <img
                    src={employer.profileImage}
                    alt={employer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="px-4 mb-6">
                <p className="text-center text-gray-700 text-sm leading-relaxed">
                  {employer.description}
                </p>
              </div>

              {/* Full Details - Available because it's a match */}
              <div className="px-4 space-y-3 mb-6">
                <div>
                  <span className="font-semibold text-gray-900">Location: </span>
                  <span className="text-gray-700">{employer.location}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Industry: </span>
                  <span className="text-gray-700">{employer.industry}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Roles Offered: </span>
                  <span className="text-gray-700">{employer.rolesOffered.join(', ')}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Job Availability: </span>
                  <span className="text-gray-700">{employer.jobAvailability}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Pay & Benefits: </span>
                  <span className="text-gray-700">{employer.payBenefits}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Facilities / Extras: </span>
                  <span className="text-gray-700">{employer.facilities}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Company Size: </span>
                  <span className="text-gray-700">{employer.companySize}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Established: </span>
                  <span className="text-gray-700">{employer.establishedYear}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Certifications: </span>
                  <span className="text-gray-700">{employer.certifications.join(', ')}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Work Environment: </span>
                  <span className="text-gray-700">{employer.workEnvironment}</span>
                </div>
              </div>

              {/* Contact Information - Available because it's a match */}
              <div className="px-4 mb-6 bg-green-50 rounded-lg p-4 mx-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-center">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Email: </span>
                    <span className="text-blue-600">{employer.contactEmail}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Phone: </span>
                    <span className="text-blue-600">{employer.contactPhone}</span>
                  </div>
                </div>
              </div>

              {/* View Jobs Button */}
              <div className="px-4 mb-4">
                <Button
                  onClick={handleViewJobs}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg h-12 flex items-center justify-center gap-2"
                >
                  View Available Jobs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WHVEmployerFullProfileCard;