import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MutualMatchCandidate {
  id: string;
  name: string;
  profileImage: string;
  quote: string;
  nationality: string;
  location: string;
  willingToRelocate: string;
  industry: string;
  visa: string;
  visaExpiry: string;
  experience: string[];
  licenses: string[];
  availability: string;
  contactDetails: {
    email: string;
    phone: string;
  };
  jobReference: {
    name: string;
    contact: string;
    phone: string;
  };
}

const MutualMatchProfile: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  // Mock mutual match candidate data
  const mutualMatchCandidates: { [key: string]: MutualMatchCandidate } = {
    '4': {
      id: '4',
      name: 'Thomas',
      profileImage: '/lovable-uploads/140ed1a1-12da-4d98-8f41-9aed46049366.png',
      quote: '"I\'m a motivated WHV holder who enjoys outdoor work and connecting with people. Looking to gain hands-on experience in agriculture while also working in hospitality to meet new people and learn Australian culture."',
      nationality: 'United States of America',
      location: 'Gold Coast, QLD 4221',
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
        'Driver\'s License'
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
    },
    '5': {
      id: '5',
      name: 'Emma',
      profileImage: '/lovable-uploads/76ee4cf4-2a7f-4575-a02c-ba69817bfa35.png',
      quote: '"Canadian farm girl ready to share my agricultural knowledge with Australian farmers! I bring hands-on experience and a strong work ethic to help your operations thrive."',
      nationality: 'Canada',
      location: 'Brisbane, QLD 4000',
      willingToRelocate: 'Yes, anywhere in Australia',
      industry: 'Maintenance, Farming',
      visa: '417',
      visaExpiry: '15/09/2026',
      experience: [
        '2020-2024: Farm Maintenance Technician - Prairie Farms Canada',
        '2018-2020: Equipment Operator - Alberta Agriculture',
        '2016-2018: Crop Assistant - Manitoba Co-op'
      ],
      licenses: [
        'Heavy Machinery License',
        'Driver\'s License',
        'First Aid Certificate'
      ],
      availability: 'September 2025 (12 months)',
      contactDetails: {
        email: 'emma.taylor@gmail.com',
        phone: '+61 423 789 012'
      },
      jobReference: {
        name: 'Michael Thompson - Farm Manager (Prairie Farms)',
        contact: 'michael@prairiefarms.ca',
        phone: '+1 204 555 6789'
      }
    },
    '6': {
      id: '6',
      name: 'Megan',
      profileImage: '/lovable-uploads/8ff82176-d379-4d34-b436-f2c63b90c153.png',
      quote: '"Swedish efficiency meets Australian farming! I\'m passionate about sustainable agriculture and marketing farm products to reach new markets and customers."',
      nationality: 'Sweden',
      location: 'Moreton Bay, 4020',
      willingToRelocate: 'Yes, within QLD/NSW',
      industry: 'Farming, Marketing',
      visa: '417',
      visaExpiry: '22/08/2026',
      experience: [
        '2021-2024: Agricultural Marketing Specialist - Nordic Farms Sweden',
        '2019-2021: Farm Operations Assistant - Stockholm Agriculture',
        '2017-2019: Greenhouse Technician - Swedish Organics'
      ],
      licenses: [
        'Driver\'s License',
        'Organic Certification',
        'Marketing Qualification'
      ],
      availability: 'August 2025 (10 months)',
      contactDetails: {
        email: 'megan.larsson@hotmail.com',
        phone: '+61 467 234 567'
      },
      jobReference: {
        name: 'Erik Andersson - Operations Manager (Nordic Farms)',
        contact: 'erik@nordicfarms.se',
        phone: '+46 8 123 45678'
      }
    }
  };

  const candidate = mutualMatchCandidates[id || '4'];

  if (!candidate) {
    return <div>Candidate not found</div>;
  }

  const handleBack = () => {
    const fromPage = searchParams.get('from');
    const tab = searchParams.get('tab');
    if (fromPage === 'matches') {
      navigate(`/employer-matches?tab=${tab || 'matches'}`);
    } else {
      navigate('/employer-matches');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-background rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          {/* Main content container */}
          <div className="w-full h-full flex flex-col relative bg-gray-50">
            
            {/* Header */}
            <div className="px-6 pt-16 pb-4">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-12 h-12 bg-white rounded-xl shadow-sm"
                  onClick={handleBack}
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </Button>
                <div className="flex items-center gap-3 flex-1">
                  <img
                    src={candidate.profileImage}
                    alt={candidate.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-800"
                  />
                  <div className="bg-slate-800 text-white px-4 py-2 rounded-xl">
                    <div className="text-sm font-medium">It{"'"}s a Match</div>
                    <div className="text-sm font-medium">with {candidate.name}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 overflow-y-auto pb-6">
              
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
    </div>
  );
};

export default MutualMatchProfile;