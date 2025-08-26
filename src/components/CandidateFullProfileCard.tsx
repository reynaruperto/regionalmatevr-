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
      quote: 'Ready to work hard and experience the real Australia! I bring European farming expertise and enthusiasm for learning new techniques.',
      nationality: 'United States',
      location: 'Cairns, QLD 4870',
      willingToRelocate: 'Yes',
      industry: 'Agriculture and Farming',
      visa: '417 (Working Holiday)',
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
        'Driver\'s License',
        'Forklift License',
        'First Aid Certificate'
      ],
      availability: 'February 2025 (18 months)',
      stayDuration: '18 months',
      languages: ['English (Native)', 'French (Fluent)', 'Spanish (Basic)'],
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
    if (fromPage === 'whv-matches') {
      navigate(`/whv/matches?tab=${tab || 'matches'}`);
    } else if (fromPage === 'matches') {
      navigate(`/employer/matches?tab=${tab || 'matches'}`);
    } else {
      navigate('/whv/matches');
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
          <div className="w-full h-full flex flex-col relative bg-gray-200">
            
            {/* Scrollable Content */}
            <div className="flex-1 px-6 pt-16 pb-24 overflow-y-auto">
              
              {/* Profile Card */}
              <div className="w-full max-w-sm mx-auto bg-white rounded-3xl p-6 shadow-lg">
                
                {/* Match Header */}
                <div className="bg-green-500 text-white text-center py-4 rounded-2xl mb-6">
                  <h2 className="text-xl font-bold">🎉 IT'S A MATCH! 🎉</h2>
                  <p className="text-sm mt-1">with {candidate.name.toUpperCase()}</p>
                </div>

                {/* Profile Picture */}
                <div className="flex justify-center mb-6">
                  <div className="w-32 h-32 rounded-full border-4 border-green-500 overflow-hidden">
                    <img 
                      src={candidate.profileImage}
                      alt={candidate.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Quote */}
                <div className="text-center mb-6 bg-gray-50 rounded-2xl p-4">
                  <p className="text-gray-700 text-sm italic leading-relaxed">
                    {candidate.quote}
                  </p>
                </div>

                {/* Profile Details */}
                <div className="space-y-3 text-sm mb-6">
                  <div><span className="font-semibold">Nationality:</span> {candidate.nationality}</div>
                  <div><span className="font-semibold">Location (Current / Preferred):</span> {candidate.location}</div>
                  <div><span className="font-semibold">Willing to Relocate:</span> {candidate.willingToRelocate}</div>
                  <div><span className="font-semibold">Visa Type & Expiry:</span> {candidate.visa} - Expires {candidate.visaExpiry}</div>
                  <div><span className="font-semibold">Industry:</span> {candidate.industry}</div>
                  <div><span className="font-semibold">Licenses / Certificates:</span> {candidate.licenses.join(', ')}</div>
                  <div><span className="font-semibold">Availability:</span> {candidate.availability}</div>
                </div>

                {/* Work Experience */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Work Experience:</h3>
                  <div className="space-y-2 text-xs bg-gray-50 rounded-xl p-3">
                    {candidate.experience.map((exp, index) => (
                      <div key={index} className="text-gray-700">
                        <div className="font-medium">{exp.startDate} - {exp.endDate}</div>
                        <div>{exp.position} - {exp.company}</div>
                        <div className="text-gray-500">{exp.location}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* About Yourself Section */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Tell us about yourself:</h3>
                  <div className="text-gray-700 bg-gray-50 rounded-xl p-3 text-sm">
                    {candidate.workExperience}
                  </div>
                </div>

                {/* Job Reference */}
                <div className="mb-6 bg-blue-50 rounded-xl p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Job Reference:</h3>
                  <div className="space-y-1 text-sm text-blue-800">
                    <div>{candidate.jobReference.name}</div>
                    <div>{candidate.jobReference.contact}</div>
                    <div>{candidate.jobReference.phone}</div>
                  </div>
                </div>

                {/* Contact Details - Highlighted */}
                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl p-6 text-center">
                  <h3 className="font-bold text-lg mb-3">🎉 Contact Details Unlocked! 🎉</h3>
                  <div className="space-y-2">
                    <div className="bg-white/20 rounded-xl p-3">
                      <div className="font-semibold">Email:</div>
                      <div className="text-lg">{candidate.contactDetails.email}</div>
                    </div>
                    <div className="bg-white/20 rounded-xl p-3">
                      <div className="font-semibold">Phone:</div>
                      <div className="text-lg">{candidate.contactDetails.phone}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-white/90">
                    You can now contact {candidate.name} directly!
                  </p>
                </div>
              </div>

            </div>

            {/* Back Button - Fixed at bottom */}
            <div className="absolute bottom-8 left-6">
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-12 h-12 bg-white rounded-xl shadow-sm"
                onClick={handleBack}
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateFullProfileCard;