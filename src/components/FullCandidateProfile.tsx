import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LikeConfirmationModal from '@/components/LikeConfirmationModal';
interface FullCandidateProfileProps {
  candidateId: string;
}

const FullCandidateProfile: React.FC<FullCandidateProfileProps> = ({ candidateId }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showLikeModal, setShowLikeModal] = useState(false);

  // Mock candidate data based on ID
  const getCandidateData = (id: string) => {
    const candidates = {
      '1': {
        id: '1',
        name: 'Peter',
        profileImage: '/lovable-uploads/bbc5bcc9-817f-41e3-a13b-fdf1a0031017.png',
        description: 'Backpacker from Argentina with experience in farm work, currently in Brisbane, QLD',
        nationality: 'Argentina',
        location: 'Brisbane, QLD 4000',
        industry: 'Agriculture and Farming',
        experience: [
          '2020-2025: Farm Attendant - VillaFarm',
          '2019-2020: Marketing Head - Workspace',
          '2007-2019: Winery Assistant - BodegaWinery'
        ],
        licenses: 'N/A',
        availability: 'Sep 2025'
      },
      '2': {
        id: '2',
        name: 'Daniel',
        profileImage: '/lovable-uploads/da0de5ef-7b36-4a46-8929-8ab1398fe7d6.png',
        description: 'German backpacker with construction and agriculture experience, currently in Tamworth, NSW',
        nationality: 'Germany',
        location: 'Tamworth, NSW 2340',
        industry: 'Construction, Agriculture',
        experience: [
          '2020-2024: Construction Worker - Berlin Infrastructure',
          '2019-2020: Farm Equipment Technician - Bavaria Farms',
          '2018-2019: Apprentice Carpenter - Munich Construction'
        ],
        licenses: 'White Card, Forklift License',
        availability: 'Oct 2025'
      },
      '3': {
        id: '3',
        name: 'Hannah',
        profileImage: '/lovable-uploads/f8e06077-061a-45ec-b61f-f9f81d72b6ed.png',
        description: 'British hospitality professional exploring agriculture opportunities, currently in Mildura, VIC',
        nationality: 'United Kingdom',
        location: 'Mildura, VIC 3500',
        industry: 'Hospitality, Agriculture',
        experience: [
          '2021-2024: Restaurant Supervisor - London Bistro Chain',
          '2020-2021: Barista - Edinburgh Coffee House',
          '2019-2020: Hotel Receptionist - Manchester Grand Hotel'
        ],
        licenses: 'RSA, Food Safety Certificate',
        availability: 'Nov 2025'
      }
    };
    
    return candidates[id as keyof typeof candidates] || candidates['1'];
  };

  const candidate = getCandidateData(candidateId);

  const handleLikeCandidate = () => {
    setShowLikeModal(true);
  };

  const handleCloseLikeModal = () => {
    setShowLikeModal(false);
  };

  const handleBack = () => {
    const fromPage = searchParams.get('from');
    const tab = searchParams.get('tab');
    if (fromPage === 'matches') {
      navigate(`/matches?tab=${tab || 'mutualLikes'}`);
    } else {
      navigate('/browse-candidates');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          {/* Main content container */}
          <div className="w-full h-full flex flex-col relative bg-gray-50">
            
            {/* Content */}
            <div className="flex-1 px-6 pt-16 pb-24 overflow-y-auto">
              
              {/* Header with name */}
              <div className="bg-slate-800 rounded-2xl p-4 mb-6 text-center">
                <h1 className="text-xl font-bold text-white">{candidate.name.toUpperCase()}</h1>
              </div>

              {/* Profile Image */}
              <div className="flex justify-center mb-6">
                <div className="w-40 h-40 rounded-full border-4 border-slate-800 overflow-hidden">
                  <img
                    src={candidate.profileImage}
                    alt={candidate.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="text-center mb-6">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {candidate.description}
                </p>
              </div>

              {/* Details */}
              <div className="space-y-4 text-sm mb-8">
                <div>
                  <span className="font-semibold text-slate-800">Nationality:</span>
                  <span className="text-gray-700 ml-1">{candidate.nationality}</span>
                </div>

                <div>
                  <span className="font-semibold text-slate-800">Location (Current / Preferred):</span>
                  <span className="text-gray-700 ml-1">{candidate.location}</span>
                </div>

                <div>
                  <span className="font-semibold text-slate-800">Industry:</span>
                  <span className="text-gray-700 ml-1">{candidate.industry}</span>
                </div>

                <div>
                  <span className="font-semibold text-slate-800">Experience / Skills:</span>
                  <div className="mt-1 space-y-1">
                    {candidate.experience.map((exp, index) => (
                      <div key={index} className="text-gray-700 text-sm">
                        {exp}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-slate-800">Licenses / Certificates:</span>
                  <span className="text-gray-700 ml-1">{candidate.licenses}</span>
                </div>

                <div>
                  <span className="font-semibold text-slate-800">Availability (date, duration):</span>
                  <span className="text-gray-700 ml-1">{candidate.availability}</span>
                </div>
              </div>

              {/* Full Details Message */}
              <div className="bg-gray-200 rounded-2xl p-4 mb-6 text-center">
                <p className="text-gray-600 text-sm">
                  Full Details Unlocked if you both Match
                </p>
              </div>

              {/* Like to Match Button */}
              <div className="text-center mb-6">
                <Button
                  onClick={handleLikeCandidate}
                  className="bg-gradient-to-r from-orange-400 to-slate-800 hover:from-orange-500 hover:to-slate-900 text-white px-8 py-3 rounded-2xl flex items-center gap-3 mx-auto"
                >
                  <span className="font-semibold">Like to Match</span>
                  <div className="bg-orange-500 rounded-full p-2">
                    <ThumbsUp size={20} className="text-white" />
                  </div>
                </Button>
              </div>
            </div>

            {/* Back Button */}
            <div className="absolute bottom-8 left-6">
              <button
                onClick={handleBack}
                className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Like Confirmation Modal */}
          <LikeConfirmationModal
            candidateName={candidate.name}
            onClose={handleCloseLikeModal}
            isVisible={showLikeModal}
          />
        </div>
      </div>
    </div>
  );
};

export default FullCandidateProfile;