import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmployerProfile {
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
}

const EmployerProfileCard: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [showLikeModal, setShowLikeModal] = useState(false);

  // Determine if this is being accessed from WHV or employer context
  const isWHVContext = location.pathname.includes('whv-employer-short-profile');

  // Mock employer data - in real app this would come from API
  const employerProfiles: { [key: string]: EmployerProfile } = {
    '1': {
      id: '1',
      name: 'KANGAFARM',
      employerName: 'John Doe',
      description: 'Family-run farm in regional Queensland, offering seasonal work in fruit picking and packing',
      location: 'Clontarf, QLD 4017',
      industry: 'Agriculture and Farming',
      rolesOffered: ['Fruit Picking', 'Farm Hand'],
      jobAvailability: 'Ongoing, September 2025',
      payBenefits: '$28/hour + super',
      facilities: 'Meals included, Accommodation available on discounted price',
      profileImage: '/lovable-uploads/b18ec59d-46ed-4c8c-95cb-65e60d9aea25.png'
    },
    '2': {
      id: '2',
      name: 'SUNNY WINES',
      employerName: 'Maria Santos',
      description: 'Boutique winery on the Sunshine Coast, offering wine production and farm supervision roles',
      location: 'Sunshine Coast, 4551',
      industry: 'Wine Production',
      rolesOffered: ['Farm Supervisor', 'Wine Production Assistant'],
      jobAvailability: 'Seasonal, October 2025',
      payBenefits: '$26/hour + super',
      facilities: 'Accommodation provided, Training included',
      profileImage: '/lovable-uploads/07a3f593-64d9-4f5c-871d-4d9114963942.png'
    },
    '3': {
      id: '3',
      name: 'OAKRIDGE FARM',
      employerName: 'Dave Wilson',
      description: 'Modern dairy farm in Toowoomba, specializing in sustainable farming practices',
      location: 'Toowoomba, 4350',
      industry: 'Agriculture and Farming',
      rolesOffered: ['Dairy Farm Assistant', 'Farm Maintenance'],
      jobAvailability: 'Full-time, October 2025',
      payBenefits: '$30/hour + super',
      facilities: 'On-site accommodation, Equipment provided',
      profileImage: '/lovable-uploads/5672fb16-6ddf-42ed-bddd-ea2395f6b999.png'
    }
  };

  const employer = employerProfiles[id || '1'];

  const handleLikeEmployer = () => {
    setShowLikeModal(true);
  };

  const handleCloseLikeModal = () => {
    setShowLikeModal(false);
  };

  const handleViewJobs = () => {
    navigate(`/employer/jobs/${employer.id}`);
  };

  const handleBackNavigation = () => {
    if (isWHVContext) {
      navigate('/whv/browse-employers');
    } else {
      navigate('/employer/matches');
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
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gray-800 text-white p-4 text-center">
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

              {/* Details */}
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
              </div>

              {/* Unlock Message */}
              <div className="mx-4 mb-6 p-3 bg-gray-100 rounded-lg">
                <p className="text-center text-gray-600 text-sm">
                  Full Details Unlocked if you both Match
                </p>
              </div>

              {/* Action Buttons */}
              <div className="px-4 pb-6 flex gap-3">
                <Button
                  onClick={handleViewJobs}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg h-12"
                >
                  View Jobs
                </Button>
                <button
                  onClick={handleLikeEmployer}
                  className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg hover:from-orange-500 hover:to-orange-700 transition-all shadow-md"
                >
                  <span className="font-medium">Heart to Match</span>
                  <Heart size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Like Confirmation Modal */}
          {showLikeModal && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
              <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-orange-500 text-xl">⚡</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  You liked {employer.name}'s profile!
                </h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  They'll be notified, and if they like you back, you'll unlock full profile access.
                </p>
                <Button
                  onClick={handleCloseLikeModal}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg h-12"
                >
                  Got it
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerProfileCard;