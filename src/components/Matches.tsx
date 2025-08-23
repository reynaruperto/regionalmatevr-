import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/BottomNavigation';

interface MatchEmployer {
  id: string;
  name: string;
  skills: string[];
  country: string;
  location: string;
  availability: string;
  matchPercentage: number;
  profileImage: string;
  isMutualMatch?: boolean;
}

const Matches: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'topRecommended' | 'matches'>('topRecommended');

  // Check URL parameters to set initial tab
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    if (tab === 'matches' || tab === 'topRecommended') {
      setActiveTab(tab as 'topRecommended' | 'matches');
    }
  }, [location.search]);

  // Mock data for top recommended employers (same as browse employers)
  const topRecommendedEmployers: MatchEmployer[] = [
    {
      id: '1',
      name: 'KANGAFARM',
      skills: ['Agriculture & Farming', 'Fruit Picker'],
      country: 'Australia',
      location: 'Clontarf, QLD, 4017',
      availability: 'Start Date from Sep 2025',
      matchPercentage: 92,
      profileImage: '/lovable-uploads/b18ec59d-46ed-4c8c-95cb-65e60d9aea25.png'
    },
    {
      id: '2',
      name: 'SUNNY WINES',
      skills: ['Wine Production', 'Farm Supervisor'],
      country: 'Australia',
      location: 'Sunshine Coast, 4551',
      availability: 'Start Date from Oct 2025',
      matchPercentage: 88,
      profileImage: '/lovable-uploads/07a3f593-64d9-4f5c-871d-4d9114963942.png'
    },
    {
      id: '3',
      name: 'OAKRIDGE FARM',
      skills: ['Agriculture & Farming', 'Dairy Farm Assistant'],
      country: 'Australia',
      location: 'Toowoomba, 4350',
      availability: 'Start Date from Oct 2025',
      matchPercentage: 86,
      profileImage: '/lovable-uploads/5672fb16-6ddf-42ed-bddd-ea2395f6b999.png'
    }
  ];

  // Mock data for matches
  const matches: MatchEmployer[] = [
    {
      id: '4',
      name: 'Green Harvest Farms',
      skills: ['Agriculture & Farming', 'Farm Assistant'],
      country: 'Australia',
      location: 'Northrivers, NSW 2470',
      availability: 'Available from Aug 2025',
      matchPercentage: 95,
      profileImage: '/lovable-uploads/a8da007e-b9f6-4996-9a54-c5cb294d1f4f.png',
      isMutualMatch: true
    },
    {
      id: '5',
      name: 'Coastal Breeze Resort',
      skills: ['Hospitality and Tourism', 'Barista'],
      country: 'Australia',
      location: 'Coolangatta, QLD 4225',
      availability: 'Available from Sep 2025',
      matchPercentage: 91,
      profileImage: '/lovable-uploads/dde1f5c0-2bba-4180-ab2c-b05bcb7b7def.png',
      isMutualMatch: true
    },
    {
      id: '6',
      name: 'Gotall Estates',
      skills: ['Dairy Farm', 'Farm Maintenance'],
      country: 'Australia',
      location: 'Sunshine Coast, 4019',
      availability: 'Available from Oct 2025',
      matchPercentage: 89,
      profileImage: '/lovable-uploads/3961a45e-fda8-48f4-97cc-a5573079e6ac.png',
      isMutualMatch: true
    }
  ];

  const handleViewProfile = (employerId: string, isMutualMatch?: boolean) => {
    const route = isMutualMatch ? `/full-candidate-profile/${employerId}` : `/whv-employer-short-profile/${employerId}`;
    const tab = isMutualMatch ? 'matches' : activeTab;
    navigate(`${route}?from=matches&tab=${tab}`);
  };

  const currentEmployers = activeTab === 'topRecommended' ? topRecommendedEmployers : matches;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone 16 Pro Max Frame - Fixed dimensions */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-4 flex-shrink-0"></div>
          
          {/* Header - Fixed */}
          <div className="px-4 py-3 border-b bg-white flex-shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/whv/dashboard')}>
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <h1 className="text-sm font-medium text-gray-700 text-center flex-1 pr-6">
                Explore your Matches and Top Recommended Employers
              </h1>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-4 py-4 flex-shrink-0">
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setActiveTab('matches')}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'matches'
                    ? 'bg-slate-800 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Matches
              </button>
              <button
                onClick={() => setActiveTab('topRecommended')}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'topRecommended'
                    ? 'bg-slate-800 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Top Recommended
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 pb-20">
            <div className="space-y-4">
              {currentEmployers.map((employer) => (
                <div key={employer.id} className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="flex items-start gap-3">
                    <img
                      src={employer.profileImage}
                      alt={employer.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-base">{employer.name}</h3>
                          <p className="text-sm text-gray-600">
                            {employer.skills.join(', ')}
                          </p>
                          <p className="text-sm text-gray-600">{employer.location}</p>
                          <p className="text-sm text-gray-600">{employer.availability}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                          {employer.isMutualMatch ? (
                            <div className="text-right">
                              <div className="text-lg font-bold text-orange-500">
                                It's a
                              </div>
                              <div className="text-lg font-bold text-orange-500">
                                Match!
                              </div>
                            </div>
                          ) : (
                            <div className="text-right">
                              <div className="text-lg font-bold text-orange-500">
                                {employer.matchPercentage}%
                              </div>
                              <div className="text-sm font-semibold text-orange-500">
                                Match
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          onClick={() => handleViewProfile(employer.id, employer.isMutualMatch)}
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm h-10 rounded-full"
                        >
                          {employer.isMutualMatch ? 'View Full Profile Card' : 'View Profile Card'}
                        </Button>
                        {!employer.isMutualMatch && (
                          <button className="h-10 w-10 flex-shrink-0 bg-gradient-to-b from-orange-400 to-slate-800 rounded-md flex items-center justify-center hover:from-orange-500 hover:to-slate-900 transition-all duration-200 shadow-sm">
                            <ThumbsUp size={16} className="text-white" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Navigation - Fixed */}
          <div className="bg-white border-t flex-shrink-0 rounded-b-[48px]">
            <BottomNavigation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matches;