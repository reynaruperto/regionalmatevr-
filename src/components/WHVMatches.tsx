import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/BottomNavigation';
import LikeConfirmationModal from '@/components/LikeConfirmationModal';

// Employer profile type
interface Employer {
  id: string;
  name: string;
  skills: string[];
  country: string;
  location: string;
  availability: string;
  profileImage: string;
  isMutualMatch?: boolean;
  matchPercentage?: number;
}

// Mock WHV profile (to calculate % match)
const whvProfile = {
  skills: ['Agriculture', 'Hospitality'],
  availableStart: '2025-09-01',
  currentLocation: 'Queensland',
};

// Match algorithm (skills 50%, availability 25%, location 25%)
function calculateMatch(employer: Employer): number {
  let score = 0;

  // Skills
  const skillMatches = employer.skills.filter((s) =>
    whvProfile.skills.includes(s)
  ).length;
  score += (skillMatches / whvProfile.skills.length) * 50;

  // Availability
  if (new Date(employer.availability) <= new Date(whvProfile.availableStart)) {
    score += 25;
  }

  // Location
  if (employer.location.includes(whvProfile.currentLocation)) {
    score += 25;
  }

  return Math.round(score);
}

const WHVMatches: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'matches' | 'topRecommended'>('matches');
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [likedEmployerName, setLikedEmployerName] = useState('');

  // Sync tab from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    if (tab === 'matches' || tab === 'topRecommended') {
      setActiveTab(tab as 'matches' | 'topRecommended');
    }
  }, [location.search]);

  // Top Recommended (show %)
  const topRecommended: Employer[] = [
    {
      id: '1',
      name: 'Kangafarm',
      skills: ['Agriculture & Farming', 'Fruit Picker'],
      country: 'Australia',
      location: 'Clontarf, QLD 4017',
      availability: '2025-09-10',
      profileImage: '/lovable-uploads/b18ec59d-46ed-4c8c-95cb-65e60d9aea25.png',
    },
    {
      id: '2',
      name: 'Sunny Wines',
      skills: ['Wine Production', 'Farm Supervisor'],
      country: 'Australia',
      location: 'Sunshine Coast, QLD',
      availability: '2025-10-01',
      profileImage: '/lovable-uploads/07a3f593-64d9-4f5c-871d-4d9114963942.png',
    },
    {
      id: '3',
      name: 'Oakridge Farm',
      skills: ['Agriculture & Farming', 'Dairy Farm Assistant'],
      country: 'Australia',
      location: 'Toowoomba, QLD',
      availability: '2025-10-15',
      profileImage: '/lovable-uploads/5672fb16-6ddf-42ed-bddd-ea2395f6b999.png',
    },
  ].map((e) => ({ ...e, matchPercentage: calculateMatch(e) }));

  // Matches (mutual match, no % needed)
  const matches: Employer[] = [
    {
      id: '4',
      name: 'Green Harvest Farms',
      skills: ['Agriculture', 'Farm Assistant'],
      country: 'Australia',
      location: 'Northrivers, NSW',
      availability: '2025-08-20',
      profileImage: '/lovable-uploads/a8da007e-b9f6-4996-9a54-c5cb294d1f4f.png',
      isMutualMatch: true,
    },
    {
      id: '5',
      name: 'Blue River Organics',
      skills: ['Farming', 'Irrigation'],
      country: 'Australia',
      location: 'Bundaberg, QLD',
      availability: '2025-09-05',
      profileImage: '/lovable-uploads/5672fb16-6ddf-42ed-bddd-ea2395f6b999.png',
      isMutualMatch: true,
    },
  ];

  const handleViewProfile = (id: string, isMutualMatch?: boolean) => {
    const route = isMutualMatch
      ? `/whv/employer/full-profile/${id}`
      : `/whv/employer/profile/${id}`;
    navigate(`${route}?from=whv-matches&tab=${activeTab}`);
  };

  const handleLikeEmployer = (name: string) => {
    setLikedEmployerName(name);
    setShowLikeModal(true);
  };

  const currentList = activeTab === 'matches' ? matches : topRecommended;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      {/* iPhone frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl overflow-hidden">
        <div className="w-full h-full bg-white rounded-[48px] flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-2"></div>

          {/* Header */}
          <div className="px-4 py-3 border-b flex items-center gap-3 flex-shrink-0">
            <button onClick={() => navigate('/whv/dashboard')}>
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <h1 className="text-sm font-medium text-gray-700 flex-1 text-center">
              Explore Matches & Top Recommended Employers
            </h1>
          </div>

          {/* Tabs */}
          <div className="px-4 py-4 flex-shrink-0">
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setActiveTab('matches')}
                className={`flex-1 py-2 rounded-full text-sm font-medium ${
                  activeTab === 'matches'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600'
                }`}
              >
                Matches
              </button>
              <button
                onClick={() => setActiveTab('topRecommended')}
                className={`flex-1 py-2 rounded-full text-sm font-medium ${
                  activeTab === 'topRecommended'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600'
                }`}
              >
                Top Recommended
              </button>
            </div>
          </div>

          {/* Employer list */}
          <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-4">
            {currentList.map((e) => (
              <div key={e.id} className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="flex items-start gap-3">
                  <img
                    src={e.profileImage}
                    alt={e.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{e.name}</h3>
                    <p className="text-sm text-gray-600">{e.skills.join(', ')}</p>
                    <p className="text-sm text-gray-600">{e.location}</p>
                    <p className="text-sm text-gray-600">{e.availability}</p>

                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        onClick={() =>
                          handleViewProfile(e.id, e.isMutualMatch)
                        }
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm h-10 rounded-full"
                      >
                        {e.isMutualMatch ? 'View Full Profile' : 'View Profile'}
                      </Button>
                      {!e.isMutualMatch && (
                        <button
                          onClick={() => handleLikeEmployer(e.name)}
                          className="h-10 w-10 bg-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-600"
                        >
                          <Heart size={16} className="text-white" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Show % for Top Recommended only */}
                  {!e.isMutualMatch && (
                    <div className="text-right flex-shrink-0 ml-2">
                      <div className="text-lg font-bold text-orange-500">
                        {e.matchPercentage}%
                      </div>
                      <div className="text-xs font-semibold text-orange-500">
                        Match
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Nav */}
          <div className="bg-white border-t rounded-b-[48px] flex-shrink-0">
            <BottomNavigation />
          </div>

          {/* Like Modal */}
          <LikeConfirmationModal
            candidateName={likedEmployerName}
            onClose={() => setShowLikeModal(false)}
            isVisible={showLikeModal}
          />
        </div>
      </div>
    </div>
  );
};

export default WHVMatches;



