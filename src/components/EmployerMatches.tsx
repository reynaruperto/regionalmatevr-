import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/BottomNavigation';
import LikeConfirmationModal from '@/components/LikeConfirmationModal';

interface MatchCandidate {
  id: string;
  name: string;
  skills: string[];
  country: string;
  location: string;
  availability: string;
  profileImage: string;
  isMutualMatch?: boolean;
}

const EmployerMatches: React.FC = () => {
  const navigate = useNavigate();
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [likedCandidateName, setLikedCandidateName] = useState('');

  // Mock data for matches (mutual likes only)
  const matches: MatchCandidate[] = [
    {
      id: '4',
      name: 'Thomas',
      skills: ['Agriculture', 'Hospitality'],
      country: 'United States of America',
      location: 'Gold Coast, 4221',
      availability: 'Available from Aug 2025',
      profileImage: '/lovable-uploads/140ed1a1-12da-4d98-8f41-9aed46049366.png',
      isMutualMatch: true
    },
    {
      id: '5',
      name: 'Emma',
      skills: ['Maintenance', 'Farming'],
      country: 'Canada',
      location: 'N/A',
      availability: 'Available from Sep 2025',
      profileImage: '/lovable-uploads/76ee4cf4-2a7f-4575-a02c-ba69817bfa35.png',
      isMutualMatch: true
    },
    {
      id: '6',
      name: 'Megan',
      skills: ['Farming', 'Marketing'],
      country: 'Sweden',
      location: 'Moreton Bay, 4020',
      availability: 'Available from Aug 2025',
      profileImage: '/lovable-uploads/8ff82176-d379-4d34-b436-f2c63b90c153.png',
      isMutualMatch: true
    }
  ];

  const handleViewProfile = (candidateId: string) => {
    navigate(`/full-candidate-profile/${candidateId}?from=matches`);
  };

  const handleHeartClick = (candidateName: string) => {
    setLikedCandidateName(candidateName);
    setShowLikeModal(true);
  };

  const handleCloseLikeModal = () => {
    setShowLikeModal(false);
    setLikedCandidateName('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone 16 Pro Max Frame - Fixed dimensions */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-4 flex-shrink-0"></div>
          
          {/* Header */}
          <div className="px-4 py-3 border-b bg-white flex-shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/employer/dashboard')}>
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <h1 className="text-sm font-medium text-gray-700 text-center flex-1 pr-6">
                Your Mutual Likes with WHV Candidates
              </h1>
            </div>
          </div>

          {/* Matches List */}
          <div className="flex-1 overflow-y-auto px-4 pb-20">
            <div className="space-y-4">
              {matches.map((candidate) => (
                <div 
                  key={candidate.id} 
                  className="bg-white rounded-lg p-4 shadow-sm border-2 border-blue-300"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={candidate.profileImage}
                      alt={candidate.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-base">{candidate.name}</h3>
                          <p className="text-sm text-gray-600">{candidate.skills.join(', ')}</p>
                          <p className="text-sm text-gray-600">{candidate.country}</p>
                          <p className="text-sm text-gray-600">{candidate.location}</p>
                          <p className="text-sm text-gray-600">{candidate.availability}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-orange-500">It{"'"}s a</div>
                          <div className="text-lg font-bold text-orange-500">Match!</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          onClick={() => handleViewProfile(candidate.id)}
                          className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-sm h-10 rounded-full"
                        >
                          View Full Profile Card
                        </Button>
                        <button 
                          onClick={() => handleHeartClick(candidate.name)}
                          className="h-10 w-10 flex-shrink-0 bg-gradient-to-b from-orange-400 to-slate-800 rounded-md flex items-center justify-center hover:from-orange-500 hover:to-slate-900 transition-all duration-200 shadow-sm"
                        >
                          <Heart size={16} className="text-white" />
                        </button>
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

          {/* Like Confirmation Modal */}
          <LikeConfirmationModal
            candidateName={likedCandidateName}
            onClose={handleCloseLikeModal}
            isVisible={showLikeModal}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployerMatches;
