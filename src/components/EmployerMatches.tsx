import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'matches' | 'topRecommended'>('matches');
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [likedCandidateName, setLikedCandidateName] = useState('');

  // Tab selection from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    if (tab === 'matches' || tab === 'topRecommended') {
      setActiveTab(tab as 'matches' | 'topRecommended');
    }
  }, [location.search]);

  // Top Recommended mock data
  const topRecommended: MatchCandidate[] = [
    {
      id: '1',
      name: 'Peter',
      skills: ['Agriculture', 'Marketing'],
      country: 'Argentina',
      location: 'Brisbane, QLD',
      availability: 'Available from Sep 2025',
      profileImage: '/lovable-uploads/bbc5bcc9-817f-41e3-a13b-fdf1a0031017.png'
    },
    {
      id: '2',
      name: 'Daniel',
      skills: ['Construction', 'Agriculture'],
      country: 'Germany',
      location: 'Sunshine Coast, QLD',
      availability: 'Available from Oct 2025',
      profileImage: '/lovable-uploads/da0de5ef-7b36-4a46-8929-8ab1398fe7d6.png'
    }
  ];

  // Matches mock data
  const matches: MatchCandidate[] = [
    {
      id: '3',
      name: 'Hannah',
      skills: ['Hospitality', 'Agriculture'],
      country: 'UK',
      location: 'Gold Coast, QLD',
      availability: 'Available from Sep 2025',
      profileImage: '/lovable-uploads/f8e06077-061a-45ec-b61f-f9f81d72b6ed.png',
      isMutualMatch: true
    }
  ];

  const handleViewProfile = (candidateId: string, isMutualMatch?: boolean) => {
    const route = isMutualMatch ? `/full-candidate-profile/${candidateId}` : `/short-candidate-profile/${candidateId}`;
    navigate(`${route}?from=employer-matches&tab=${activeTab}`);
  };

  const handleLikeCandidate = (candidateName: string) => {
    setLikedCandidateName(candidateName);
    setShowLikeModal(true);
  };

  const handleCloseLikeModal = () => {
    setShowLikeModal(false);
    setLikedCandidateName('');
  };

  const currentCandidates = activeTab === 'matches' ? matches : topRecommended;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone Frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b bg-white">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/employer/dashboard')}>
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <h1 className="text-sm font-medium text-gray-700 flex-1 text-center">
                Explore Matches & Top Recommended WHV Candidates
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
                    ? 'bg-slate-800 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Matches
              </button>
              <button
                onClick={() => setActiveTab('topRecommended')}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium ${
                  activeTab === 'topRecommended'
                    ? 'bg-slate-800 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Top Recommended
              </button>
            </div>
          </div>

          {/* Candidate List */}
          <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-4">
            {currentCandidates.map((c) => (
              <div key={c.id} className="bg-white p-4 rounded-2xl shadow-sm border">
                <div className="flex items-start gap-3">
                  <img src={c.profileImage} alt={c.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{c.name}</h3>
                    <p className="text-sm text-gray-600">{c.skills.join(', ')}</p>
                    <p className="text-sm text-gray-600">{c.country}</p>
                    <p className="text-sm text-gray-600">{c.location}</p>
                    <p className="text-sm text-gray-600">{c.availability}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        onClick={() => handleViewProfile(c.id, c.isMutualMatch)}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-sm h-10 rounded-full"
                      >
                        {c.isMutualMatch ? 'View Full Profile' : 'View Profile'}
                      </Button>
                      {!c.isMutualMatch && (
                        <button
                          onClick={() => handleLikeCandidate(c.name)}
                          className="h-10 w-10 bg-orange-500 rounded-lg flex items-center justify-center"
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
