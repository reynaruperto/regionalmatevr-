import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LikeConfirmationModal from '@/components/LikeConfirmationModal';

interface ShortCandidateProfileCardProps {
  candidateId: string;
}

const ShortCandidateProfileCard: React.FC<ShortCandidateProfileCardProps> = ({ candidateId }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showLikeModal, setShowLikeModal] = useState(false);

  // Mock candidate data
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
          { startDate: '01/2020', endDate: '12/2025', position: 'Farm Attendant', company: 'VillaFarm', location: 'Brisbane, QLD' },
          { startDate: '03/2019', endDate: '12/2020', position: 'Marketing Head', company: 'Workspace', location: 'Buenos Aires, Argentina' },
          { startDate: '06/2007', endDate: '02/2019', position: 'Winery Assistant', company: 'BodegaWinery', location: 'Mendoza, Argentina' }
        ],
        licenses: 'Driver\'s License, First Aid',
        availability: 'Sep 2025 (8 months)',
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
          { startDate: '01/2020', endDate: '12/2024', position: 'Construction Worker', company: 'Berlin Infrastructure', location: 'Berlin, Germany' },
          { startDate: '03/2019', endDate: '12/2020', position: 'Farm Equipment Technician', company: 'Bavaria Farms', location: 'Munich, Germany' },
          { startDate: '06/2018', endDate: '02/2019', position: 'Apprentice Carpenter', company: 'Munich Construction', location: 'Munich, Germany' }
        ],
        licenses: 'White Card, Forklift License, Driver\'s License',
        availability: 'Oct 2025 (12 months)',
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
          { startDate: '01/2021', endDate: '12/2024', position: 'Restaurant Supervisor', company: 'London Bistro Chain', location: 'London, UK' },
          { startDate: '03/2020', endDate: '12/2021', position: 'Barista', company: 'Edinburgh Coffee House', location: 'Edinburgh, UK' },
          { startDate: '06/2019', endDate: '02/2020', position: 'Hotel Receptionist', company: 'Manchester Grand Hotel', location: 'Manchester, UK' }
        ],
        licenses: 'RSA, Food Safety Certificate, Driver\'s License',
        availability: 'Nov 2025 (10 months)',
      }
    };
    return candidates[id as keyof typeof candidates] || candidates['1'];
  };

  const candidate = getCandidateData(candidateId);

  const handleLikeCandidate = () => setShowLikeModal(true);
  const handleCloseLikeModal = () => setShowLikeModal(false);

  // ✅ Clean back button logic
  const handleBack = () => {
    const fromPage = searchParams.get('from');
    const tab = searchParams.get('tab');

    if (fromPage === 'employer-matches') {
      navigate(`/employer/matches?tab=${tab || 'matches'}`);
    } else if (fromPage === 'browse-candidates') {
      navigate('/browse-candidates');
    } else {
      navigate('/browse-candidates'); // fallback
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative">
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          <div className="w-full h-full flex flex-col relative bg-gray-200">
            <div className="flex-1 px-6 pt-16 pb-24 overflow-y-auto">
              <div className="w-full max-w-sm mx-auto bg-white rounded-3xl p-6 shadow-lg">
                
                <div className="bg-slate-800 text-white text-center py-4 rounded-2xl mb-6">
                  <h2 className="text-xl font-bold">{candidate.name.toUpperCase()}</h2>
                </div>

                <div className="flex justify-center mb-6">
                  <div className="w-32 h-32 rounded-full border-4 border-slate-800 overflow-hidden">
                    <img src={candidate.profileImage} alt={candidate.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <p className="text-gray-700 text-sm leading-relaxed">{candidate.description}</p>
                </div>

                <div className="space-y-2 text-sm mb-6">
                  <div><span className="font-semibold">Nationality:</span> {candidate.nationality}</div>
                  <div><span className="font-semibold">Location:</span> {candidate.location}</div>
                  <div><span className="font-semibold">Relocate:</span> {candidate.willingToRelocate}</div>
                  <div><span className="font-semibold">Visa:</span> {candidate.visa} - Expires {candidate.visaExpiry}</div>
                  <div><span className="font-semibold">Industry:</span> {candidate.industry}</div>
                  <div>
                    <span className="font-semibold">Experience:</span>
                    <div className="mt-1 space-y-1 text-xs">
                      {candidate.experience.map((exp, index) => (
                        <div key={index}>{exp.startDate}-{exp.endDate}: {exp.position} - {exp.company}</div>
                      ))}
                    </div>
                  </div>
                  <div><span className="font-semibold">Licenses:</span> {candidate.licenses}</div>
                  <div><span className="font-semibold">Availability:</span> {candidate.availability}</div>
                </div>

                <div className="bg-gray-200 text-center py-3 rounded-xl mb-4">
                  <p className="text-gray-600 text-sm">Full Details Unlocked if you both Match</p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleLikeCandidate}
                    className="w-full bg-gradient-to-r from-orange-400 to-slate-800 hover:from-orange-500 hover:to-slate-900 text-white px-8 py-3 rounded-2xl flex items-center gap-3 justify-center"
                  >
                    <span className="font-semibold">Heart to Match</span>
                    <div className="bg-orange-500 rounded-full p-2">
                      <Heart size={20} className="text-white fill-white" />
                    </div>
                  </Button>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-6">
              <button
                onClick={handleBack}
                className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>

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

export default ShortCandidateProfileCard;
