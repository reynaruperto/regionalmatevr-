import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
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
        willingToRelocate: 'Yes, anywhere in QLD/NSW',
        industry: 'Agriculture and Farming',
        visa: '417 (Working Holiday)',
        visaExpiry: 'Sep 2026',
        experience: [
          {
            startDate: '01/2020',
            endDate: '12/2025',
            position: 'Farm Attendant',
            company: 'VillaFarm',
            location: 'Brisbane, QLD'
          },
          {
            startDate: '03/2019',
            endDate: '12/2020',
            position: 'Marketing Head',
            company: 'Workspace',
            location: 'Buenos Aires, Argentina'
          },
          {
            startDate: '06/2007',
            endDate: '02/2019',
            position: 'Winery Assistant',
            company: 'BodegaWinery',
            location: 'Mendoza, Argentina'
          }
        ],
        licenses: 'Driver\'s License, First Aid',
        availability: 'Sep 2025 (8 months)',
        languages: ['Spanish', 'English'],
        workExperience: 'I have extensive experience in agriculture and marketing. Started in wineries and moved into farm operations in Australia. Passionate about sustainable farming and connecting with local communities.',
        skillsInterests: 'Farm operations, wine production, marketing, team leadership, sustainable agriculture, and learning about Australian farming techniques.',
        whyAustralia: 'Australia offers incredible opportunities to learn modern farming techniques and experience a multicultural work environment. I want to contribute my experience while learning new skills.'
      },
      '2': {
        id: '2',
        name: 'Daniel',
        profileImage: '/lovable-uploads/da0de5ef-7b36-4a46-8929-8ab1398fe7d6.png',
        description: 'German backpacker with construction and agriculture experience, currently in Tamworth, NSW',
        nationality: 'Germany',
        location: 'Tamworth, NSW 2340',
        willingToRelocate: 'Yes, within NSW/QLD',
        industry: 'Construction, Agriculture',
        visa: '462 (Work and Holiday)',
        visaExpiry: 'Oct 2026',
        experience: [
          {
            startDate: '01/2020',
            endDate: '12/2024',
            position: 'Construction Worker',
            company: 'Berlin Infrastructure',
            location: 'Berlin, Germany'
          },
          {
            startDate: '03/2019',
            endDate: '12/2020',
            position: 'Farm Equipment Technician',
            company: 'Bavaria Farms',
            location: 'Munich, Germany'
          },
          {
            startDate: '06/2018',
            endDate: '02/2019',
            position: 'Apprentice Carpenter',
            company: 'Munich Construction',
            location: 'Munich, Germany'
          }
        ],
        licenses: 'White Card, Forklift License, Driver\'s License',
        availability: 'Oct 2025 (12 months)',
        languages: ['German', 'English'],
        workExperience: 'I have 6 years of experience in construction and farm equipment maintenance. Strong technical skills and enjoy working with my hands on complex projects.',
        skillsInterests: 'Construction work, equipment maintenance, carpentry, technical problem-solving, outdoor activities, and learning new building techniques.',
        whyAustralia: 'I want to experience Australian construction standards and work on unique projects. Australia has amazing infrastructure and I want to contribute my skills while learning new techniques.'
      },
      '3': {
        id: '3',
        name: 'Hannah',
        profileImage: '/lovable-uploads/f8e06077-061a-45ec-b61f-f9f81d72b6ed.png',
        description: 'British hospitality professional exploring agriculture opportunities, currently in Mildura, VIC',
        nationality: 'United Kingdom',
        location: 'Mildura, VIC 3500',
        willingToRelocate: 'Yes, anywhere in Australia',
        industry: 'Hospitality, Agriculture',
        visa: '417 (Working Holiday)',
        visaExpiry: 'Nov 2026',
        experience: [
          {
            startDate: '01/2021',
            endDate: '12/2024',
            position: 'Restaurant Supervisor',
            company: 'London Bistro Chain',
            location: 'London, UK'
          },
          {
            startDate: '03/2020',
            endDate: '12/2021',
            position: 'Barista',
            company: 'Edinburgh Coffee House',
            location: 'Edinburgh, UK'
          },
          {
            startDate: '06/2019',
            endDate: '02/2020',
            position: 'Hotel Receptionist',
            company: 'Manchester Grand Hotel',
            location: 'Manchester, UK'
          }
        ],
        licenses: 'RSA, Food Safety Certificate, Driver\'s License',
        availability: 'Nov 2025 (10 months)',
        languages: ['English'],
        workExperience: 'I have 5 years of hospitality experience, from front-of-house to management roles. Excellent customer service skills and enjoy working in fast-paced environments.',
        skillsInterests: 'Customer service, team management, food safety, coffee preparation, hospitality operations, and exploring agricultural tourism.',
        whyAustralia: 'I want to combine my hospitality background with agricultural work, especially in rural tourism. Australia offers unique opportunities to work in diverse environments and meet people from around the world.'
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
      navigate(`/employer-matches?tab=${tab || 'matches'}`);
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
                  <span className="font-semibold text-slate-800">Willing to Relocate:</span>
                  <span className="text-gray-700 ml-1">{candidate.willingToRelocate}</span>
                </div>

                <div>
                  <span className="font-semibold text-slate-800">Visa Type & Expiry:</span>
                  <span className="text-gray-700 ml-1">{candidate.visa} - Expires {candidate.visaExpiry}</span>
                </div>

                <div>
                  <span className="font-semibold text-slate-800">Industry:</span>
                  <span className="text-gray-700 ml-1">{candidate.industry}</span>
                </div>

                <div>
                  <span className="font-semibold text-slate-800">Tell us about yourself:</span>
                  <div className="mt-1 text-gray-700 text-sm">
                    {candidate.workExperience}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-slate-800">Skills & Interests:</span>
                  <div className="mt-1 text-gray-700 text-sm">
                    {candidate.skillsInterests}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-slate-800">Why Australia:</span>
                  <div className="mt-1 text-gray-700 text-sm">
                    {candidate.whyAustralia}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-slate-800">Work Experience:</span>
                  <div className="mt-1 space-y-1">
                    {candidate.experience.map((exp, index) => (
                      <div key={index} className="text-gray-700 text-sm">
                        • {exp.startDate} - {exp.endDate}: {exp.position} - {exp.company} - {exp.location}
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

                <div>
                  <span className="font-semibold text-slate-800">Languages:</span>
                  <span className="text-gray-700 ml-1">{candidate.languages.join(', ')}</span>
                </div>
              </div>

              {/* Full Details Message */}
              <div className="bg-gray-200 rounded-2xl p-4 mb-6 text-center">
                <p className="text-gray-600 text-sm">
                  Full Details Unlocked if you both Match
                </p>
              </div>

              {/* Heart to Match Button */}
              <div className="text-center mb-6">
                <Button
                  onClick={handleLikeCandidate}
                  className="bg-gradient-to-r from-orange-400 to-slate-800 hover:from-orange-500 hover:to-slate-900 text-white px-8 py-3 rounded-2xl flex items-center gap-3 mx-auto"
                >
                  <span className="font-semibold">Heart to Match</span>
                  <div className="bg-orange-500 rounded-full p-2">
                    <Heart size={20} className="text-white fill-white" />
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