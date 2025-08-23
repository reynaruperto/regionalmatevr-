import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Phone, Mail } from 'lucide-react';
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
    '1': {
      id: '1',
      name: 'KANGAFARM',
      employerName: 'John Doe',
      description: 'Family-run farm in regional Queensland, offering seasonal work in fruit picking and packing. We pride ourselves on creating a supportive work environment for international workers.',
      location: 'Clontarf, QLD 4017',
      industry: 'Agriculture and Farming',
      rolesOffered: ['Fruit Picking', 'Farm Hand', 'Tractor Driver'],
      jobAvailability: 'Ongoing, September 2025',
      payBenefits: '$28/hour + super + performance bonuses',
      facilities: 'Meals included, On-site accommodation available, Transportation provided',
      profileImage: '/lovable-uploads/b18ec59d-46ed-4c8c-95cb-65e60d9aea25.png',
      contactEmail: 'john@kangafarm.com.au',
      contactPhone: '+61 7 3123 4567',
      companySize: '15-30 employees',
      establishedYear: '1995',
      certifications: ['Organic Certification', 'Fair Trade Certified'],
      workEnvironment: 'Outdoor work in beautiful rural Queensland. We provide all necessary equipment and training.'
    },
    '2': {
      id: '2',
      name: 'SUNNY WINES',
      employerName: 'Maria Santos',
      description: 'Boutique winery on the Sunshine Coast, offering wine production and farm supervision roles. Join our passionate team in creating premium wines.',
      location: 'Sunshine Coast, 4551',
      industry: 'Wine Production',
      rolesOffered: ['Farm Supervisor', 'Wine Production Assistant', 'Cellar Hand'],
      jobAvailability: 'Seasonal, October 2025',
      payBenefits: '$26/hour + super + wine allowance',
      facilities: 'Accommodation provided, Training included, Wine tasting experience',
      profileImage: '/lovable-uploads/07a3f593-64d9-4f5c-871d-4d9114963942.png',
      contactEmail: 'maria@sunnywines.com.au',
      contactPhone: '+61 7 5432 1098',
      companySize: '8-12 employees',
      establishedYear: '2008',
      certifications: ['Sustainable Winegrowing Certification'],
      workEnvironment: 'Beautiful vineyard setting with modern facilities and equipment.'
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

  if (!employer) {
    return <div>Employer not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone 16 Pro Max Frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-4 flex-shrink-0"></div>
          
          {/* Header */}
          <div className="px-4 py-3 flex-shrink-0">
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

              {/* Contact Action Buttons */}
              <div className="px-4 pb-6 space-y-3">
                <Button
                  onClick={() => handleContactEmployer('email')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-12 flex items-center justify-center gap-2"
                >
                  <Mail size={20} />
                  Send Email
                </Button>
                <Button
                  onClick={() => handleContactEmployer('phone')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg h-12 flex items-center justify-center gap-2"
                >
                  <Phone size={20} />
                  Call Now
                </Button>
                <Button
                  onClick={() => handleContactEmployer('message')}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg h-12 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Send Message
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