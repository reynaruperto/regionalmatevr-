import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BottomNavigation from '@/components/BottomNavigation';
import FilterPage from '@/components/FilterPage';

interface Candidate {
  id: string;
  name: string;
  skills: string[];
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
  const [selectedFilters, setSelectedFilters] = useState([
    { label: 'Industry: Agriculture', value: 'agriculture' },
    { label: 'Availability: Sep-Dec', value: 'sep-dec' }
  ]);

  // Mock candidate data
  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'Peter',
      skills: ['Agriculture', 'Marketing'],
      country: 'Argentina',
      location: 'QLD - Bundaberg',
      availability: 'Available from Sep 2025',
      matchPercentage: 92,
      profileImage: '/lovable-uploads/51369c33-1aa8-4f19-b8a1-e65e12f9ec9f.png'
    },
    {
      id: '2',
      name: 'Daniel',
      skills: ['Construction', 'Agriculture'],
      country: 'Germany',
      location: 'NSW - Tamworth',
      availability: 'Available from Oct 2025',
      matchPercentage: 88,
      profileImage: '/lovable-uploads/7f241d90-ee65-4e5d-bf17-dee78ed2774e.png'
    },
    {
      id: '3',
      name: 'Hannah',
      skills: ['Hospitality', 'Agriculture'],
      country: 'United Kingdom',
      location: 'VIC - Mildura',
      availability: 'Available from Nov 2025',
      matchPercentage: 86,
      profileImage: '/lovable-uploads/3d82699d-3fd9-45d2-a5c9-c336f9b20745.png'
    }
  ];

  const removeFilter = (filterValue: string) => {
    setSelectedFilters(selectedFilters.filter(filter => filter.value !== filterValue));
  };

  const handleLikeCandidate = (candidateId: string) => {
    console.log('Liked candidate:', candidateId);
    // This will later handle the like functionality
  };

  const handleViewProfile = (candidateId: string) => {
    console.log('View profile for candidate:', candidateId);
    // This will later navigate to candidate profile view
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
          
          {/* Header - Fixed */}
          <div className="px-4 py-3 border-b bg-white flex-shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/dashboard')}>
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <h1 className="text-lg font-medium text-gray-900 truncate">
                Browse Candidates
              </h1>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <h2 className="text-xl font-bold text-primary mb-4">Browse Candidates</h2>
            
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search for candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-12 h-10"
              />
              <button 
                onClick={() => setShowFilters(true)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Filter className="text-gray-400" size={20} />
              </button>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedFilters.map((filter) => (
                <div
                  key={filter.value}
                  className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1"
                >
                  <span className="text-xs text-gray-700">{filter.label}</span>
                  <button
                    onClick={() => removeFilter(filter.value)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Candidates List */}
            <div className="space-y-3 pb-20">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="bg-white rounded-lg p-3 shadow-sm border">
                  <div className="flex items-start gap-3">
                    <img
                      src={candidate.profileImage}
                      alt={candidate.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm">{candidate.name}</h3>
                          <p className="text-xs text-gray-600 truncate">
                            {candidate.skills.join(', ')}
                          </p>
                          <p className="text-xs text-gray-600">{candidate.country}</p>
                          <p className="text-xs text-gray-600 truncate">{candidate.location}</p>
                          <p className="text-xs text-gray-600 truncate">{candidate.availability}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                          <div className="text-sm font-bold text-orange-500">
                            {candidate.matchPercentage}%
                          </div>
                          <div className="text-xs font-semibold text-orange-500">
                            Match
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          onClick={() => handleViewProfile(candidate.id)}
                          className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs h-7"
                        >
                          View Profile Card
                        </Button>
                        <button
                          onClick={() => handleLikeCandidate(candidate.id)}
                          className="h-7 w-7 flex-shrink-0 bg-gradient-to-b from-orange-400 to-slate-800 rounded-md flex items-center justify-center hover:from-orange-500 hover:to-slate-900 transition-all duration-200 shadow-sm"
                        >
                          <ThumbsUp size={14} className="text-white" />
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
        </div>
      </div>
    </div>
  );
};

export default BrowseCandidates;