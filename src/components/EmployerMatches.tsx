import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '@/components/BottomNavigation';
import LikeConfirmationModal from '@/components/LikeConfirmationModal';

interface MatchEmployer {
  id: string;
  name: string;
  skills: string[];
  country: string;
  location: string;
  availability: string;
  profileImage: string;
  isMutualMatch?: boolean;
}

const WHVMatches: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'matches' | 'topRecommended'>('matches');
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [likedEmployerName, setLikedEmployerName] = useState('');

  // Tab selection from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    if (tab === 'matches' || tab === 'topRecommended') {
      setActiveTab(tab as 'matches' | 'topRecommended');
    }
  }, [location.search]);

  // Top Recommended mock data
  const topRecommended: MatchEmployer[] = [
    {
      id: '1',
      name: 'Kangafarm',
      skills: ['Agriculture & Farming', 'Fruit Picker'],
      country: 'Australia',
      location: 'Clontarf, QLD 4017',
      availability: 'Start Date Sep 2025',
      profileImage: '/lovable-uploads/b18ec59d-46ed-4c8c-95cb-65e60d9aea25.png'
    }
  ];

  // Matches mock data
  const matches: MatchEmployer[] = [
    {
      id: '2',
      name: 'Green Harvest Farms',
      skills: ['Agriculture', 'Farm Assistant'],
      country: 'Australia',
      location: 'Northrivers, NSW 2470',
      availability: 'Available from Aug 2025',
      profileImage: '/lovable-uploads/a8da007e-b9f6-4996-9a54-c5cb294d1f4f.png',
      isMutualMatch: true
    }
  ];

  const handleViewProfile = (employerId: string, isMutualMatch?: boolean) => {
    const route = isMutualMatch ? `/whv/employer/full-profile/${employerId}` : `/whv/employer/profile/${employerId}`;
    navigate(`${route}?from=whv-matches&tab=${activeTab}`);
  };

  const handleLikeEmployer = (employerName: string) => {
    setLikedEmployerName(employerName);
    setShowLikeModal(true);
  };

  const handleCloseLikeModal = () => {
    setShowLikeModal(false);
    setLikedEmployerName('');
  };

  const currentEmployers = activeTab === 'matches' ? matches : topRecommended;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone Frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b bg-white">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/whv/dashboard')}>
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <h1 className="text-sm font-medium text-gray-700 flex-1 text-center">
                Explore Matches & Top Recommended Employers
              </h1>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-4 py-4">
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setActiveTab('matches')}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium ${
                  activeTab === 'matches'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Matches
              </button>
              <button
                onClick={() => setActiveTab('topRecommended')}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium ${
                  activeTab === 'topRecommended'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Top Recommended
              </button>
            </div>
          </div>

          {/* Employer List */}
          <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-4">
            {currentEmployers.map((e) => (
              <div key={e.id} className="bg-white p-4 rounded-2xl shadow-sm border">
                <div className="flex items-start gap-3">
                  <img src={e.profileImage} alt={e.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{e.name}</h3>
                    <p className="text-sm text-gray-600">{e.skills.join(', ')}</p>
                    <p className="text-sm text-gray-600">{e.country}</p>
                    <p className="text-sm text-gray-600">{e.location}</p>
                    <p className="text-sm text-gray-600">{e.availability}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        onClick={() => handleViewProfile(e.id, e.isMutualMatch)}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm h-10 rounded-full"
                      >
                        {e.isMutualMatch ? 'View Full Profile' : 'View Profile'}
                      </Button>
                      {!e.isMutualMatch && (
                        <button
                          onClick={() => handleLikeEmployer(e.name)}
                          className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center"
                        >
                          <Heart size={16} className="text-white" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Nav */}
          <BottomNavigation />

          {/* Like Modal */}
          <LikeConfirmationModal
            candidateName={likedEmployerName}
            onClose={handleCloseLikeModal}
            isVisible={showLikeModal}
          />
        </div>
      </div>
    </div>
  );
};

export default WHVMatches;
