import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LikeConfirmationModal from '@/components/LikeConfirmationModal';

interface CandidateProfileCardProps {
  candidateId: string;
}

const CandidateProfileCard: React.FC<CandidateProfileCardProps> = ({ candidateId }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showLikeModal, setShowLikeModal] = useState(false);

  // Mock data - in real app this would come from props or API
  const candidate = {
    id: candidateId,
    name: 'PETER PARKER',
    profileImage: '/lovable-uploads/b479a041-9b25-499f-b024-69aeaa75a882.png',
    description: 'Backpacker from Argentina with experience in farm work, currently in Brisbane, QLD',
    nationality: 'Argentina',
    location: 'Brisbane QLD 4000',
    industry: 'Agriculture and Farming',
    experience: [
      '2020-2025 - Farm Attendant - Villafarm',
      '2010-2020 - Marketing Head - Worksport',
      '2007-2010 - Winery Assistant - Bodegawinery'
    ],
    licenses: 'N/A',
    availability: 'Sep 2025'
  };

  const handleLikeToMatch = () => {
    setShowLikeModal(true);
  };

  const handleCloseLikeModal = () => {
    setShowLikeModal(false);
    const fromPage = searchParams.get('from');
    navigate(fromPage === 'matches' ? '/matches' : '/browse-candidates');
  };

  const handleBackToBrowse = () => {
    const fromPage = searchParams.get('from');
    navigate(fromPage === 'matches' ? '/matches' : '/browse-candidates');
  };

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
              <button onClick={handleBackToBrowse}>
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <h1 className="text-lg font-medium text-gray-900 truncate">
                Profile Card
              </h1>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {/* Header with Name */}
            <div className="bg-slate-800 text-white text-center py-3 rounded-t-lg mb-0">
              <h2 className="text-lg font-bold">{candidate.name}</h2>
            </div>

            {/* Profile Content */}
            <div className="bg-white border border-gray-200 rounded-b-lg p-4 shadow-sm">
              {/* Profile Photo */}
              <div className="flex justify-center mb-4">
                <img
                  src={candidate.profileImage}
                  alt={candidate.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-slate-200"
                />
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700 text-center mb-4">
                {candidate.description}
              </p>

              {/* Details */}
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-gray-900">Nationality:</span>
                  <span className="text-gray-700 ml-1">{candidate.nationality}</span>
                </div>

                <div>
                  <span className="font-semibold text-gray-900">Location (Current / Preferred):</span>
                  <span className="text-gray-700 ml-1">{candidate.location}</span>
                </div>

                <div>
                  <span className="font-semibold text-gray-900">Industry:</span>
                  <span className="text-gray-700 ml-1">{candidate.industry}</span>
                </div>

                <div>
                  <span className="font-semibold text-gray-900">Experience / Skills:</span>
                  <div className="mt-1 space-y-1">
                    {candidate.experience.map((exp, index) => (
                      <div key={index} className="text-gray-700 text-xs ml-1">
                        {exp}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-gray-900">Licenses / Certificates:</span>
                  <span className="text-gray-700 ml-1">{candidate.licenses}</span>
                </div>

                <div>
                  <span className="font-semibold text-gray-900">Availability (date, duration):</span>
                  <span className="text-gray-700 ml-1">{candidate.availability}</span>
                </div>
              </div>

              {/* Premium Content Teaser */}
              <div className="mt-6 bg-gray-100 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 font-medium">
                  Full Details Unlocked if you both Match
                </p>
              </div>

              {/* Like to Match Button */}
              <div className="mt-6 text-center">
                <button
                  onClick={handleLikeToMatch}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-b from-orange-400 to-slate-800 rounded-lg text-white font-medium hover:from-orange-500 hover:to-slate-900 transition-all duration-200 shadow-sm"
                >
                  <ThumbsUp size={20} />
                  <span>Like to Match</span>
                </button>
              </div>
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

export default CandidateProfileCard;