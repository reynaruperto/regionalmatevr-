import React, { useState } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
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
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [likedEmployerName, setLikedEmployerName] = useState('');

  // Mock data for matches only
  const matches: MatchEmployer[] = [
    {
      id: '4',
      name: 'Green Harvest Farms',
      skills: ['Agriculture & Farming', 'Farm Assistant'],
      country: 'Australia',
      location: 'Northrivers, NSW 2470',
      availability: 'Available from Aug 2025',
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
      profileImage: '/lovable-uploads/3961a45e-fda8-48f4-97cc-a5573079e6ac.png',
      isMutualMatch: true
    }
  ];

  const handleViewProfile = (employerId: string) => {
    navigate(`/whv/employer/full-profile/${employerId}?from=whv-matches`);
  };

  const handleCloseLikeModal = () => {
    setShowLikeModal(false);
    setLikedEmployerName('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone 16 Pro Max Frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-4 flex-shrink-0"></div>
          
          {/* Header */}
          <div className="px-4 py-3 border-b bg-white flex-shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/whv/dashboard')}>
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <h1 className="text-sm font-medium text-gray-700 text-center flex-1 pr-6">
                Explore your Matches with Employers
              </h1>
            </div>
          </div>

          {/* Matches Content */}
          <div className="flex-1 overflow-y-auto px-4 pb-20">
            <div className="space-y-4">
              {matches.map((employer) => (
                <div key={employer.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-start gap-4">
                    <img
                      src={employer.profileImage}
                      alt={employer.name}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-base mb-1">{employer.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{employer.skills.join(', ')}</p>
                      <p className="text-sm text-gray-600 mb-1">{employer.country}</p>
                      <p className="text-sm text-gray-600 mb-1">{employer.location}</p>
                      <p className="text-sm text-gray-600">{employer.availability}</p>

                      <div className="flex items-center gap-3 mt-4">
                        <Button
                          onClick={() => handleViewProfile(employer.id)}
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white h-11 rounded-xl"
                        >
                          View Full Profile Card
                        </Button>
                        {employer.isMutualMatch && (
                          <div className="text-right">
                            <span className="text-sm font-semibold text-orange-500">It’s a Match!</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="bg-white border-t flex-shrink-0 rounded-b-[48px]">
            <BottomNavigation />
          </div>

          {/* Like Confirmation Modal (kept for future use, but unused now) */}
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
