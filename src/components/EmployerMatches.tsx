import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/BottomNavigation';
import LikeConfirmationModal from '@/components/LikeConfirmationModal';

// Mock WHV + Employer profiles for matching algorithm
interface Profile {
  id: string;
  skills: string[];
  availability: string;
  location: string;
}

interface MatchCandidate extends Profile {
  name: string;
  country: string;
  profileImage: string;
  isMutualMatch?: boolean;
  matchPercentage?: number;
}

// Basic mock employer requirement (simulate logged-in employer)
const employerProfile = {
  requiredSkills: ['Agriculture', 'Hospitality'],
  startDate: '2025-09-01',
  jobLocation: 'Queensland'
};

// Matching algorithm
function calculateMatch(whv: Profile, employer: typeof employerProfile): number {
  let score = 0;
  let maxScore = 0;

  // Skills (50%)
  maxScore += 50;
  const skillMatches = whv.skills.filter((s) =>
    employer.requiredSkills.includes(s)
  ).length;
  score += (skillMatches / employer.requiredSkills.length) * 50;

  // Availability (25%)
  maxScore += 25;
  if (new Date(whv.availability) <= new Date(employer.startDate)) {
    score += 25;
  }

  // Location (25%)
  maxScore += 25;
  if (whv.location.includes(employer.jobLocation)) {
    score += 25;
  }

  return Math.round((score / maxScore) * 100);
}

const EmployerMatches: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'matches' | 'topRecommended'>('matches');
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [likedCandidateName, setLikedCandidateName] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    if (tab === 'matches' || tab === 'topRecommended') {
      setActiveTab(tab as 'matches' | 'topRecommended');
    }
  }, [location.search]);

  const topRecommended: MatchCandidate[] = [
    {
      id: '1',
      name: 'Peter',
      skills: ['Agriculture', 'Marketing'],
      country: 'Argentina',
      location: 'Brisbane, Queensland',
      availability: '2025-09-15',
      profileImage: '/lovable-uploads/bbc5bcc9-817f-41e3-a13b-fdf1a0031017.png'
    },
    {
      id: '2',
      name: 'Daniel',
      skills: ['Construction', 'Agriculture'],
      country: 'Germany',
      location: 'Sunshine Coast, Queensland',
      availability: '2025-10-01',
      profileImage: '/lovable-uploads/da0de5ef-7b36-4a46-8929-8ab1398fe7d6.png'
    },
    {
      id: '3',
      name: 'Hannah',
      skills: ['Hospitality', 'Agriculture'],
      country: 'UK',
      location: 'Mildura, VIC',
      availability: '2025-11-01',
      profileImage: '/lovable-uploads/f8e06077-061a-45ec-b61f-f9f81d72b6ed.png'
    }
  ].map((c) => ({ ...c, matchPercentage: calculateMatch(c, employerProfile) }));

  const matches: MatchCandidate[] = [
    {
      id: '4',
      name: 'Thomas',
      skills: ['Agriculture', 'Hospitality'],
      country: 'USA',
      location: 'Gold Coast, Queensland',
      availability: '2025-08-01',
      profileImage: '/lovable-uploads/140ed1a1-12da-4d98-8f41-9aed46049366.png',
      isMutualMatch: true
    },
    {
      id: '5',
      name: 'Emma',
      skills: ['Maintenance', 'Farming'],
      country: 'Canada',
      location: 'N/A',
      availability: '2025-09-20',
      profileImage: '/lovable-uploads/76ee4cf4-2a7f-4575-a02c-ba69817bfa35.png',
      isMutualMatch: true
    },
    {
      id: '6',
      name: 'Megan',
      skills: ['Farming', 'Marketing'],
      country: 'Sweden',
      location: 'Moreton Bay, Queensland',
      availability: '2025-08-15',
      profileImage: '/lovable-uploads/8ff82176-d379-4d34-b436-f2c63b90c153.png',
      isMutualMatch: true
    }
  ].map((c) => ({ ...c, matchPercentage: calculateMatch(c, employerProfile) }));

  const handleViewProfile = (id: string, isMutualMatch?: boolean) => {
    const route = isMutualMatch ? `/full-candidate-profile/${id}` : `/short-candidate-profile/${id}`;
    navigate(`${route}?from=employer-matches&tab=${activeTab}`);
  };

  const handleLike = (name: string) => {
    setLikedCandidateName(name);
    setShowLikeModal(true);
  };

  const currentList = activeTab === 'matches' ? matches : topRecommended;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] flex flex-col overflow-hidden">
          
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-2"></div>

          {/* Header */}
          <div className="px-4 py-3 border-b flex items-center gap-3 flex-shrink-0">
            <button onClick={() => navigate('/employer/dashboard')}>
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <h1 className="text-sm font-medium text-gray-700 flex-1 text-center">
              Matches & Top Recommended WHV Candidates
            </h1>
          </div>

          {/* Tabs */}
          <div className="px-4 py-4 flex-shrink-0">
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setActiveTab('matches')}
                className={`flex-1 py-2 rounded-full text-sm font-medium ${
                  activeTab === 'matches' ? 'bg-slate-800 text-white' : 'text-gray-600'
                }`}
              >
                Matches
              </button>
              <button
                onClick={() => setActiveTab('topRecommended')}
                className={`flex-1 py-2 rounded-full text-sm font-medium ${
                  activeTab === 'topRecommended' ? 'bg-slate-800 text-white' : 'text-gray-600'
                }`}
              >
                Top Recommended
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-4">
            {currentList.map((c) => (
              <div key={c.id} className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="flex items-start gap-3">
                  <img src={c.profileImage} alt={c.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{c.name}</h3>
                    <p className="text-sm text-gray-600">{c.skills.join(', ')}</p>
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
                          onClick={() => handleLike(c.name)}
                          className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700"
                        >
                          <Heart size={16} className="text-white" />
                        </button>
                      )}
                    </div>
                  </div>
                  {!c.isMutualMatch && (
                    <div className="text-right flex-shrink-0 ml-2">
                      <div className="text-lg font-bold text-orange-500">{c.matchPercentage}%</div>
                      <div className="text-xs font-semibold text-orange-500">Match</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Navigation */}
          <div className="bg-white border-t rounded-b-[48px] flex-shrink-0">
            <BottomNavigation />
          </div>

          <LikeConfirmationModal
            candidateName={likedCandidateName}
            onClose={() => setShowLikeModal(false)}
            isVisible={showLikeModal}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployerMatches;



