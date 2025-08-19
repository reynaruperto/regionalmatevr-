import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface FullCandidateProfileProps {
  candidateId: string;
}

const FullCandidateProfile: React.FC<FullCandidateProfileProps> = ({ candidateId }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Mock data - this would come from props or API in real app
  const candidate = {
    id: candidateId,
    name: 'Thomas Edison',
    profileImage: '/lovable-uploads/f43f9801-cb24-4f5a-a1d5-e3930b9d9db0.png',
    quote: '"I\'m a motivated WHV holder who enjoys outdoor work and connecting with people. Looking to gain hands-on experience in agriculture while also working in hospitality to meet new people and learn Australian culture."',
    nationality: 'United States of America',
    location: 'GoldCoast, QLD 4221',
    willingToRelocate: 'Yes',
    industry: 'Agriculture and Farming, Hospitality',
    visa: '462',
    visaExpiry: '02/02/2026',
    experience: [
      '2022-2025: Hotel assistant - Milton Group',
      '2019-2024: Farm Supervisor - 360 Farmers',
      '2011-2015: Agronomist - 360 Farmers'
    ],
    licenses: [
      'Forklift License',
      'Drivers License'
    ],
    availability: 'August 2025 (6 months)',
    contactDetails: {
      email: 'tomasedison@hotmail.com',
      phone: '+61 400 123 456'
    },
    jobReference: {
      name: 'Charles Ratmcelor - HR Manager (360 Farmers)',
      contact: 'charles@360farm.com',
      phone: '+1222 333 4444'
    }
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone 16 Pro Max Frame - Fixed dimensions */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-4 flex-shrink-0"></div>
          
          {/* Header - Fixed */}
          <div className="px-4 py-3 border-b bg-white flex-shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={handleBack}>
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <div className="flex items-center gap-3 flex-1">
                <img
                  src={candidate.profileImage}
                  alt={candidate.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="bg-slate-800 text-white px-4 py-2 rounded-lg">
                  <div className="text-sm font-medium">It's a Match</div>
                  <div className="text-sm font-medium">with {candidate.name}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {/* Quote */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-700 italic leading-relaxed">
                {candidate.quote}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-4 text-sm">
              <div>
                <span className="font-semibold text-gray-900">Nationality:</span>
                <span className="text-gray-700 ml-1">{candidate.nationality}</span>
              </div>

              <div>
                <span className="font-semibold text-gray-900">Location (Current / Preferred):</span>
                <span className="text-gray-700 ml-1">{candidate.location}</span>
              </div>

              <div>
                <span className="font-semibold text-gray-900">Willing to Relocate:</span>
                <span className="text-gray-700 ml-1">{candidate.willingToRelocate}</span>
              </div>

              <div>
                <span className="font-semibold text-gray-900">Industry:</span>
                <span className="text-gray-700 ml-1">{candidate.industry}</span>
              </div>

              <div>
                <span className="font-semibold text-gray-900">Visa:</span>
                <span className="text-gray-700 ml-1">{candidate.visa}</span>
              </div>

              <div>
                <span className="font-semibold text-gray-900">Visa Expiry:</span>
                <span className="text-gray-700 ml-1">{candidate.visaExpiry}</span>
              </div>

              <div>
                <span className="font-semibold text-gray-900">Experience / Skills:</span>
                <div className="mt-1 space-y-1">
                  {candidate.experience.map((exp, index) => (
                    <div key={index} className="text-gray-700 text-sm ml-1">
                      • {exp}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-semibold text-gray-900">Licenses / Certificates:</span>
                <div className="mt-1 space-y-1">
                  {candidate.licenses.map((license, index) => (
                    <div key={index} className="text-gray-700 text-sm ml-1">
                      • {license}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-semibold text-gray-900">Availability (date, duration):</span>
                <span className="text-gray-700 ml-1">{candidate.availability}</span>
              </div>

              <div>
                <span className="font-semibold text-gray-900">Contact Details (Unlocked):</span>
                <div className="mt-1 space-y-1">
                  <div className="text-gray-700 text-sm ml-1">
                    Email: {candidate.contactDetails.email}
                  </div>
                  <div className="text-gray-700 text-sm ml-1">
                    Phone: {candidate.contactDetails.phone}
                  </div>
                </div>
              </div>

              <div className="pb-4">
                <span className="font-semibold text-gray-900">Job Reference:</span>
                <div className="mt-1 space-y-1">
                  <div className="text-gray-700 text-sm ml-1">
                    {candidate.jobReference.name}
                  </div>
                  <div className="text-gray-700 text-sm ml-1">
                    {candidate.jobReference.contact}
                  </div>
                  <div className="text-gray-700 text-sm ml-1">
                    {candidate.jobReference.phone}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullCandidateProfile;