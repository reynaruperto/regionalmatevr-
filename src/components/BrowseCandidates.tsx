import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BottomNavigation from '@/components/BottomNavigation';

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
      location: 'Brisbane, 4000',
      availability: 'Available from Sep 2025',
      matchPercentage: 92,
      profileImage: '/lovable-uploads/51369c33-1aa8-4f19-b8a1-e65e12f9ec9f.png'
    },
    {
      id: '2',
      name: 'Daniel',
      skills: ['Construction', 'Agriculture'],
      country: 'Germany',
      location: 'Sunshine Coast, 4551',
      availability: 'Available from Oct 2025',
      matchPercentage: 88,
      profileImage: '/lovable-uploads/57d1a927-999d-413d-8ed8-46c50ac0edde.png'
    },
    {
      id: '3',
      name: 'Hannah',
      skills: ['Hospitality', 'Agriculture'],
      country: 'United Kingdom',
      location: 'Gold Coast, 4224',
      availability: 'Available from Nov 2025',
      matchPercentage: 86,
      profileImage: '/lovable-uploads/8389e708-fc56-490f-a882-9c8c88e62de8.png'
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* iPhone Frame */}
      <div className="flex-1 max-w-sm mx-auto bg-white shadow-xl">
        {/* Dynamic Island */}
        <div className="w-32 h-6 bg-black rounded-full mx-auto mb-4"></div>
        
        {/* Header */}
        <div className="px-4 py-3 border-b bg-white">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => navigate('/dashboard')}>
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <h1 className="text-lg font-medium text-gray-900">
              Browse the right candidates for your Job
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 py-4">
          <h2 className="text-2xl font-bold text-primary mb-6">Browse Candidates</h2>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search for candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Filter className="text-gray-400" size={20} />
            </button>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedFilters.map((filter) => (
              <div
                key={filter.value}
                className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1"
              >
                <span className="text-sm text-gray-700">{filter.label}</span>
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
          <div className="space-y-4 mb-20">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="flex items-start gap-3">
                  <img
                    src={candidate.profileImage}
                    alt={candidate.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-gray-600">
                          {candidate.skills.join(', ')}
                        </p>
                        <p className="text-sm text-gray-600">{candidate.country}</p>
                        <p className="text-sm text-gray-600">{candidate.location}</p>
                        <p className="text-sm text-gray-600">{candidate.availability}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-orange-500">
                          {candidate.matchPercentage}%
                        </div>
                        <div className="text-sm font-semibold text-orange-500">
                          Match
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        onClick={() => handleViewProfile(candidate.id)}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-white"
                      >
                        View Profile Card
                      </Button>
                      <Button
                        onClick={() => handleLikeCandidate(candidate.id)}
                        variant="outline"
                        size="icon"
                        className="p-2"
                      >
                        <ThumbsUp size={20} className="text-orange-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t">
          <BottomNavigation />
        </div>
      </div>
    </div>
  );
};

export default BrowseCandidates;