import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface FullCandidateProfileProps {
  candidateId: string;
}

const FullCandidateProfile: React.FC<FullCandidateProfileProps> = ({ candidateId }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Mock candidate data based on ID
  const getCandidateData = (id: string) => {
    const candidates = {
      '1': {
        id: '1',
        name: 'Peter',
        profileImage: '/lovable-uploads/bbc5bcc9-817f-41e3-a13b-fdf1a0031017.png',
        quote: '"I\'m passionate about agriculture and marketing, bringing experience from Argentina to help Australian farms grow their business and reach new markets."',
        nationality: 'Argentina',
        location: 'QLD - Bundaberg',
        willingToRelocate: 'Yes',
        industry: 'Agriculture, Marketing',
        visa: '417 (Working Holiday)',
        visaExpiry: '15/09/2026',
        experience: [
          '2021-2024: Marketing Coordinator - AgriVentures Argentina',
          '2020-2021: Farm Assistant - Mendoza Vineyards',
          '2019-2020: Sales Representative - Buenos Aires Markets'
        ],
        licenses: [
          'Driver\'s License',
          'First Aid Certificate'
        ],
        availability: 'Available from Sep 2025 (8 months)',
        contactDetails: {
          email: 'peter.martinez@gmail.com',
          phone: '+61 456 789 123'
        },
        jobReference: {
          name: 'Carlos Rodriguez - Farm Manager (Mendoza Vineyards)',
          contact: 'carlos@mendozavineyards.com.ar',
          phone: '+54 9 261 123 4567'
        }
      },
      '2': {
        id: '2',
        name: 'Daniel',
        profileImage: '/lovable-uploads/da0de5ef-7b36-4a46-8929-8ab1398fe7d6.png',
        quote: '"German engineering meets Australian agriculture! I bring technical skills and strong work ethic to help build and maintain farm infrastructure."',
        nationality: 'Germany',
        location: 'NSW - Tamworth',
        willingToRelocate: 'Yes, within NSW/QLD',
        industry: 'Construction, Agriculture',
        visa: '462 (Work and Holiday)',
        visaExpiry: '22/10/2026',
        experience: [
          '2020-2024: Construction Worker - Berlin Infrastructure GmbH',
          '2019-2020: Farm Equipment Technician - Bavaria Farms',
          '2018-2019: Apprentice Carpenter - Munich Construction'
        ],
        licenses: [
          'Driver\'s License',
          'White Card (Construction)',
          'Forklift License'
        ],
        availability: 'Available from Oct 2025 (12 months)',
        contactDetails: {
          email: 'daniel.mueller@gmail.com',
          phone: '+61 423 567 890'
        },
        jobReference: {
          name: 'Hans Weber - Site Supervisor (Berlin Infrastructure)',
          contact: 'hans.weber@berlininfra.de',
          phone: '+49 30 123 45678'
        }
      },
      '3': {
        id: '3',
        name: 'Hannah',
        profileImage: '/lovable-uploads/f8e06077-061a-45ec-b61f-f9f81d72b6ed.png',
        quote: '"British hospitality expertise meets Australian agriculture! I love working with people and am excited to learn about farming while sharing great customer service."',
        nationality: 'United Kingdom',
        location: 'VIC - Mildura',
        willingToRelocate: 'Yes',
        industry: 'Hospitality, Agriculture',
        visa: '417 (Working Holiday)',
        visaExpiry: '08/11/2026',
        experience: [
          '2021-2024: Restaurant Supervisor - London Bistro Chain',
          '2020-2021: Barista - Edinburgh Coffee House',
          '2019-2020: Hotel Receptionist - Manchester Grand Hotel'
        ],
        licenses: [
          'RSA (Responsible Service of Alcohol)',
          'Food Safety Certificate',
          'Driver\'s License'
        ],
        availability: 'Available from Nov 2025 (10 months)',
        contactDetails: {
          email: 'hannah.smith@hotmail.co.uk',
          phone: '+61 467 123 456'
        },
        jobReference: {
          name: 'James Thompson - Manager (London Bistro Chain)',
          contact: 'j.thompson@londonbistro.co.uk',
          phone: '+44 20 7123 4567'
        }
      }
    };
    
    return candidates[id as keyof typeof candidates] || candidates['1'];
  };

  const candidate = getCandidateData(candidateId);

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