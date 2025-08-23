import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
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

const WHVEmployerProfileCard: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [showLikeModal, setShowLikeModal] = useState(false);

  // Redirect mutual matches to full profile
  React.useEffect(() => {
    const isMutualMatch = ['4', '5', '6'].includes(id || '');
    if (isMutualMatch) {
      const fromPage = searchParams.get('from');
      const tab = searchParams.get('tab');
      navigate(`/whv/employer/full-profile/${id}?from=${fromPage}&tab=${tab}`, { replace: true });
      return;
    }
  }, [id, navigate, searchParams]);

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
    },
    '4': {
      id: '4',
      name: 'Green Harvest Farms',
      employerName: 'Sarah Mitchell',
      description: 'Sustainable organic farm in northern NSW, specializing in diverse crop production and eco-friendly farming practices',
      location: 'Northrivers, NSW 2470',
      industry: 'Agriculture & Farming',
      rolesOffered: ['Farm Assistant', 'Organic Crop Technician'],
      jobAvailability: 'Available from Aug 2025',
      payBenefits: '$29/hour + super + organic produce allowance',
      facilities: 'Shared accommodation on-farm, Meals provided, Equipment training',
      profileImage: '/lovable-uploads/a8da007e-b9f6-4996-9a54-c5cb294d1f4f.png'
    },
    '5': {
      id: '5',
      name: 'Coastal Breeze Resort',
      employerName: 'Marcus Thompson',
      description: 'Premier beachfront resort on the Gold Coast offering exceptional hospitality experiences and career development opportunities',
      location: 'Coolangatta, QLD 4225',
      industry: 'Hospitality and Tourism',
      rolesOffered: ['Barista', 'Front Desk Associate', 'Housekeeping Supervisor'],
      jobAvailability: 'Available from Sep 2025',
      payBenefits: '$27/hour + super + tips + staff discounts',
      facilities: 'Staff accommodation available, Meal allowances, Staff gym access',
      profileImage: '/lovable-uploads/dde1f5c0-2bba-4180-ab2c-b05bcb7b7def.png'
    },
    '6': {
      id: '6',
      name: 'Gotall Estates',
      employerName: 'Robert Williams',
      description: 'Family-owned dairy farm operation on the Sunshine Coast, combining traditional farming values with modern dairy technology',
      location: 'Sunshine Coast, QLD 4019',
      industry: 'Dairy Farm',
      rolesOffered: ['Farm Maintenance', 'Dairy Hand', 'Livestock Technician'],
      jobAvailability: 'Available from Oct 2025',
      payBenefits: '$30/hour + super + dairy products allowance',
      facilities: 'On-site cottage accommodation, Meals included, Equipment certification training',
      profileImage: '/lovable-uploads/3961a45e-fda8-48f4-97cc-a5573079e6ac.png'
    }
  };

  const employer = employerProfiles[id || '1'];

  const handleLikeEmployer = () => {
    console.log('Heart to Match clicked!');
    setShowLikeModal(true);
  };

  const handleCloseLikeModal = () => {
    setShowLikeModal(false);
  };

  const handleViewJobs = () => {
    const fromPage = searchParams.get('from');
    const tab = searchParams.get('tab');
    
    // If we came from matches (indicated by tab=topRecommended or tab=matches), preserve that info
    if (tab === 'topRecommended' || tab === 'matches') {
      navigate(`/whv/employer/jobs/${employer.id}?from=whv-employer-profile&originalFrom=whv-matches&tab=${tab}`);
    } else {
      navigate(`/whv/employer/jobs/${employer.id}?from=whv-employer-profile&tab=${tab || ''}`);
    }
  };

  const handleBackNavigation = () => {
    const fromPage = searchParams.get('from');
    const tab = searchParams.get('tab');
    
    console.log('Back navigation - fromPage:', fromPage, 'tab:', tab);
    
    // If tab indicates we came from matches, go back to matches regardless of fromPage
    if (tab === 'topRecommended' || tab === 'matches' || fromPage === 'whv-matches') {
      console.log('Navigating back to WHV matches with tab:', tab);
      navigate(`/whv/matches?tab=${tab || 'topRecommended'}`);
    } else if (fromPage === 'whv-employer-jobs') {
      const originalFrom = searchParams.get('originalFrom');
      if (originalFrom === 'whv-matches') {
        navigate(`/whv/matches?tab=${tab || 'topRecommended'}`);
      } else {
        navigate(`/whv/employer/jobs/${employer.id}?from=whv-browse-employers&tab=${tab || ''}`);
      }
    } else {
      console.log('Navigating back to WHV browse employers');
      navigate('/whv/browse-employers');
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
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-800 to-orange-500 text-white rounded-full hover:from-slate-700 hover:to-orange-600 transition-all shadow-lg min-w-[160px] justify-center"
                >
                  <span className="font-medium">Heart to Match</span>
                  <Heart size={20} className="text-white fill-white" />
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
                  You hearted {employer.name}'s profile!
                </h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  They'll be notified, and if they heart you back, you'll unlock full profile access.
                </p>
                <Button
                  onClick={handleCloseLikeModal}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white rounded-lg h-12 font-medium"
                >
                  Got It
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WHVEmployerProfileCard;