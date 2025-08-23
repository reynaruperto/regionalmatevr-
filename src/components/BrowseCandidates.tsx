import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BottomNavigation from '@/components/BottomNavigation';
import FilterPage from '@/components/FilterPage';
import LikeConfirmationModal from '@/components/LikeConfirmationModal';

interface Candidate {
  id: string;
  name: string;
  industries: string[];
  country: string;
  location: string;
  availability: string;
  matchPercentage: number;
  profileImage: string;
}

const BrowseCandidates: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [likedCandidateName, setLikedCandidateName] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([
    { label: 'Industry: Agriculture', value: 'agriculture' },
    { label: 'Availability: Sep-Dec', value: 'sep-dec' }
  ]);

  // Mock candidate data
  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'Peter',
      industries: ['Agriculture', 'Marketing'],
      country: 'Argentina',
      location: 'QLD - Bundaberg',
      availability: 'Available from Sep 2025',
      matchPercentage: 92,
      profileImage: '/lovable-uploads/b479a041-9b25-499f-b024-69aeaa75a882.png'
    },
    {
      id: '2',
      name: 'Daniel',
      industries: ['Construction', 'Agriculture'],
      country: 'Germany',
      location: 'NSW - Tamworth',
      availability: 'Available from Oct 2025',
      matchPercentage: 88,
      profileImage: '/lovable-uploads/07a3f593-64d9-4f5c-871d-4d9114963942.png'
    },
    {
      id: '3',
      name: 'Hannah',
      industries: ['Hospitality', 'Agriculture'],
      country: 'United Kingdom',
      location: 'VIC - Mildura',
      availability: 'Available from Nov 2025',
      matchPercentage: 86,
      profileImage: '/lovable-uploads/5672fb16-6ddf-42ed-bddd-ea2395f6b999.png'
    }
  ];

  const removeFilter = (filterValue: string) => {
    setSelectedFilters(selectedFilters.filter(filter => filter.value !== filterValue));
  };

  const handleLikeCandidate = (candidateId: string) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      setLikedCandidateName(candidate.name);
      setShowLikeModal(true);
    }
  };

  const handleViewProfile = (candidateId: string) => {
    navigate(`/full-candidate-profile/${candidateId}`);
  };

  const handleCloseLikeModal = () => {
    setShowLikeModal(false);
    setLikedCandidateName('');
  };

  const handleApplyFilters = (filters: any) => {
    console.log('Applied filters:', filters);
    // This will later handle the filter application
  };

  if (showFilters) {
    return <FilterPage onClose={() => setShowFilters(false)} onApplyFilters={handleApplyFilters} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone 16 Pro Max Frame - Fixed dimensions */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-4 flex-shrink-0"></div>
          
          {/* Header */}
          <div className="px-6 pt-4 pb-2 flex-shrink-0">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => navigate('/employer-dashboard')}>
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Browse Candidates</h1>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 px-6 pb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Browse Candidates</h2>
            
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search for candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-12 h-12 rounded-xl border-gray-200"
              />
              <button 
                onClick={() => setShowFilters(true)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Filter className="text-gray-400" size={20} />
              </button>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedFilters.map((filter) => (
                <div
                  key={filter.value}
                  className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2"
                >
                  <span className="text-sm text-gray-700">{filter.label}</span>
                  <button
                    onClick={() => removeFilter(filter.value)}
                    className="text-gray-500 hover:text-gray-700 text-lg"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Candidates List */}
            <div className="space-y-4 pb-20 overflow-y-auto flex-1">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-start gap-4">
                    <img
                      src={candidate.profileImage}
                      alt={candidate.name}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-lg mb-1">{candidate.name}</h3>
                          <p className="text-sm text-gray-600 mb-1">
                            {candidate.industries.join(', ')}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">{candidate.country}</p>
                          <p className="text-sm text-gray-600 mb-1">{candidate.location}</p>
                          <p className="text-sm text-gray-600">{candidate.availability}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <div className="text-2xl font-bold text-orange-500">
                            {candidate.matchPercentage}%
                          </div>
                          <div className="text-sm font-semibold text-orange-500">
                            Match
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-4">
                        <Button
                          onClick={() => handleViewProfile(candidate.id)}
                          className="flex-1 bg-slate-800 hover:bg-slate-700 text-white h-11 rounded-xl"
                        >
                          View Profile Card
                        </Button>
                        <button
                          onClick={() => handleLikeCandidate(candidate.id)}
                          className="h-11 w-11 flex-shrink-0 bg-white border-2 border-orange-200 rounded-xl flex items-center justify-center hover:bg-orange-50 transition-all duration-200"
                        >
                          <Heart size={20} className="text-orange-500" />
                        </button>
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

export default BrowseCandidates;