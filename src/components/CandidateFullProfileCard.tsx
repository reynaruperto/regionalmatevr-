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
  experience: {
    startDate: string;
    endDate: string;
    position: string;
    company: string;
    location: string;
  }[];
  licenses: string[];
  availability: string;
  stayDuration: string;
  languages: string[];
  workExperience: string;
  skillsInterests: string;
  whyAustralia: string;
  workPreferences: string;
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

const CandidateFullProfileCard: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  // Mock mutual match candidate data
  const mutualMatchCandidates: { [key: string]: MutualMatchCandidate } = {
    '4': {
      id: '4',
      name: 'Thomas',
      profileImage: '/lovable-uploads/616bea44-f5b8-46dc-8948-70e269f076a0.png',
      quote: '"Ready to work hard and experience the real Australia! I bring European farming expertise and enthusiasm for learning new agricultural techniques."',
      nationality: 'France',
      location: 'Cairns, QLD 4870',
      willingToRelocate: 'Yes, anywhere in QLD/NT',
      industry: 'Agriculture and Farming, Construction',
      visa: '417',
      visaExpiry: 'Aug 2026',
      experience: [
        {
          startDate: '03/2020',
          endDate: '12/2024',
          position: 'Farm Supervisor',
          company: 'Bordeaux Organic Farms',
          location: 'Bordeaux, France'
        },
        {
          startDate: '06/2019',
          endDate: '02/2020',
          position: 'Vineyard Worker',
          company: 'Château Margaux',
          location: 'Margaux, France'
        },
        {
          startDate: '04/2018',
          endDate: '05/2019',
          position: 'Construction Assistant',
          company: 'Rural Construction Co.',
          location: 'Lyon, France'
        }
      ],
      licenses: [
        'French Driver\'s License (International)',
        'Forklift License',
        'Organic Farming Certificate'
      ],
      availability: 'February 2025 (18 months)',
      stayDuration: '18 months',
      languages: ['French (Native)', 'English (Fluent)', 'Spanish (Basic)'],
      workExperience: 'I have 4 years of experience working in organic farms and vineyards in France. I started as a seasonal worker and became a team supervisor. I also have construction experience helping with farm building projects and maintenance. I love working with my hands and being outdoors.',
      skillsInterests: 'Organic farming, vineyard maintenance, basic construction, equipment operation, team leadership, outdoor work, learning new agricultural techniques, and experiencing different farming methods.',
      whyAustralia: 'I chose Australia because of its reputation for innovative farming techniques and diverse agricultural opportunities. I want to learn about Australian farming methods, work in different climates, and experience the multicultural work environment while contributing my European farming knowledge.',
      workPreferences: 'Agriculture & Farming, Construction',
      contactDetails: {
        email: 'thomas.dubois@email.com',
        phone: '+61 456 789 012'
      },
      jobReference: {
        name: 'Marie Dubois - Farm Manager (Bordeaux Organic Farms)',
        contact: 'marie.dubois@bordeauxfarms.fr',
        phone: '+33 5 56 00 00 00'
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
        {
          startDate: '03/2020',
          endDate: '12/2024',
          position: 'Farm Maintenance Technician',
          company: 'Prairie Farms Canada',
          location: 'Manitoba, Canada'
        },
        {
          startDate: '06/2018',
          endDate: '02/2020',
          position: 'Equipment Operator',
          company: 'Alberta Agriculture',
          location: 'Alberta, Canada'
        },
        {
          startDate: '04/2016',
          endDate: '05/2018',
          position: 'Crop Assistant',
          company: 'Manitoba Co-op',
          location: 'Manitoba, Canada'
        }
      ],
      licenses: [
        'Heavy Machinery License',
        'Driver\'s License',
        'First Aid Certificate'
      ],
      availability: 'September 2025 (12 months)',
      stayDuration: '12 months',
      languages: ['English', 'French'],
      workExperience: 'I have 8 years of hands-on farm experience in Canada, specializing in equipment maintenance and crop management. Skilled in operating heavy machinery and troubleshooting technical issues.',
      skillsInterests: 'Heavy machinery operation, equipment maintenance, crop management, technical troubleshooting, first aid, and sustainable farming practices.',
      whyAustralia: 'Australia offers incredible farming innovation and technology. I want to learn from Australian farmers and bring new techniques back to Canada while experiencing the amazing landscapes.',
      workPreferences: 'Farm maintenance, equipment operation, crop management',
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
        {
          startDate: '01/2021',
          endDate: '12/2024',
          position: 'Agricultural Marketing Specialist',
          company: 'Nordic Farms Sweden',
          location: 'Stockholm, Sweden'
        },
        {
          startDate: '03/2019',
          endDate: '12/2021',
          position: 'Farm Operations Assistant',
          company: 'Stockholm Agriculture',
          location: 'Stockholm, Sweden'
        },
        {
          startDate: '06/2017',
          endDate: '02/2019',
          position: 'Greenhouse Technician',
          company: 'Swedish Organics',
          location: 'Gothenburg, Sweden'
        }
      ],
      licenses: [
        'Driver\'s License',
        'Organic Certification',
        'Marketing Qualification'
      ],
      availability: 'August 2025 (10 months)',
      stayDuration: '10 months',
      languages: ['Swedish', 'English', 'Norwegian'],
      workExperience: 'I have 7 years of combined experience in agricultural marketing and greenhouse operations. I specialize in connecting farm products with markets and understanding sustainable growing practices.',
      skillsInterests: 'Marketing strategy, greenhouse management, organic farming, customer relations, social media marketing, and sustainable agriculture practices.',
      whyAustralia: 'Australia has an amazing agricultural export market and innovative farming techniques. I want to learn how Australian farms market their products globally and experience the diverse agricultural regions.',
      workPreferences: 'Agricultural marketing, greenhouse work, farm operations',
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
      navigate(`/employer/matches?tab=${tab || 'matches'}`);
    } else {
      navigate('/employer/matches');
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
                    <div className="text-sm font-medium">It's a Match</div>
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
                  <span className="font-semibold text-gray-900">Tell us about yourself:</span>
                  <div className="mt-1 text-gray-700 text-sm ml-1">
                    {candidate.workExperience}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-gray-900">Skills & Interests:</span>
                  <div className="mt-1 text-gray-700 text-sm ml-1">
                    {candidate.skillsInterests}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-gray-900">Why Australia:</span>
                  <div className="mt-1 text-gray-700 text-sm ml-1">
                    {candidate.whyAustralia}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-gray-900">Work Experience:</span>
                  <div className="mt-1 space-y-1">
                    {candidate.experience.map((exp, index) => (
                      <div key={index} className="text-gray-700 text-sm ml-1">
                        • {exp.startDate} - {exp.endDate}: {exp.position} - {exp.company} - {exp.location}
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
                  <span className="font-semibold text-gray-900">Languages:</span>
                  <span className="text-gray-700 ml-1">{candidate.languages.join(', ')}</span>
                </div>

                <div>
                  <span className="font-semibold text-gray-900">Preferred Work Types:</span>
                  <span className="text-gray-700 ml-1">{candidate.workPreferences}</span>
                </div>

                <div>
                  <span className="font-semibold text-gray-900">Stay Duration:</span>
                  <span className="text-gray-700 ml-1">{candidate.stayDuration}</span>
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

export default CandidateFullProfileCard;