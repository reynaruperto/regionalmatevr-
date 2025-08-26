import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BottomNavigation from '@/components/BottomNavigation';
import WHVFilterPage from '@/components/WHVFilterPage';
import LikeConfirmationModal from '@/components/LikeConfirmationModal';

interface Employer {
  id: string;
  name: string;
  skills: string[];
  country: string;
  location: string;
  availability: string;
  matchPercentage: number;
  profileImage: string;
}

const BrowseEmployers: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [likedEmployerName, setLikedEmployerName] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([
    { label: 'Industry: Agriculture', value: 'agriculture' },
    { label: 'Start Date: Sep-Dec', value: 'sep-dec' }
  ]);

  // Mock employer data
  const employers: Employer[] = [
    {
      id: '1',
      name: 'Kangafarm',
      skills: ['Agriculture & Farming', 'Fruit Picker'],
      country: 'Australia',
      location: 'Clontarf, QLD, 4017',
      availability: 'Start Date from Sep 2025',
      matchPercentage: 92,
      profileImage: '/lovable-uploads/b479a041-9b25-499f-b024-69aeaa75a882.png'
    },
    {
      id: '2',
      name: 'Sunny Wines',
      skills: ['Wine Production', 'Farm Supervisor'],
      country: 'Australia',
      location: 'Sunshine Coast, 4551',
      availability: 'Start Date from Oct 2025',
      matchPercentage: 88,
      profileImage: '/lovable-uploads/07a3f593-64d9-4f5c-871d-4d9114963942.png'
    },
    {
      id: '3',
      name: 'Oakridge Farm',
      skills: ['Agriculture & Farming', 'Dairy Farm Assistant'],
      country: 'Australia',
      location: 'Toowoomba, 4350',
      availability: 'Start Date from Oct 2025',
      matchPercentage: 86,
      profileImage: '/lovable-uploads/5672fb16-6ddf-42ed-bddd-ea2395f6b999.png'
    }
  ];

  const removeFilter = (filterValue: string) => {
    setSelectedFilters(selectedFilters.filter(filter => filter.value !== filterValue));
  };

  const handleLikeEmployer = (employerId: string) => {
    const employer = employers.find(c => c.id === employerId);
    if (employer) {
      setLikedEmployerName(employer.name);
      setShowLikeModal(true);
    }
  };

  const handleViewProfile = (employerId: string) => {
    navigate(`/employer/profile/${employerId}`);
  };

  const handleCloseLikeModal = () => {
    setShowLikeModal(false);
    setLikedEmployerName('');
  };

  const handleApplyFilters = (filters: any) => {
    console.log('Applied filters:', filters);
    // This will later handle the filter application
  };

  if (showFilters) {
    return <WHVFilterPage onClose={() => setShowFilters(false)} onApplyFilters={handleApplyFilters} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone 16 Pro Max Frame - Fixed dimensions */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-4 flex-shrink-0"></div>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="text-center mb-4">
              <p className="text-gray-600 text-sm">Browse for employers</p>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => navigate('/whv/dashboard')}>
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Browse Employers</h1>
            </div>
            
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Browse for employers"
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

            {/* Employers List */}
            <div className="space-y-3 pb-20">
              {employers.map((employer) => (
                <div key={employer.id} className="bg-white rounded-lg p-3 shadow-sm border">
                  <div className="flex items-start gap-3">
                    <img
                      src={employer.profileImage}
                      alt={employer.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm">{employer.name}</h3>
                          <p className="text-xs text-gray-600 truncate">
                            {employer.skills.join(', ')}
                          </p>
                          <p className="text-xs text-gray-600">{employer.country}</p>
                          <p className="text-xs text-gray-600 truncate">{employer.location}</p>
                          <p className="text-xs text-gray-600 truncate">{employer.availability}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                          <div className="text-sm font-bold text-orange-500">
                            {employer.matchPercentage}%
                          </div>
                          <div className="text-xs font-semibold text-orange-500">
                            Match
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          onClick={() => handleViewProfile(employer.id)}
                          className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs h-7"
                        >
                          View Profile Card
                        </Button>
                        <button
                          onClick={() => handleLikeEmployer(employer.id)}
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

          {/* Like Confirmation Modal */}
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

export default BrowseEmployers;