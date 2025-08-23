import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface JobDetails {
  id: string;
  companyName: string;
  companyLogo: string;
  description: string;
  abn: string;
  location: string;
  industry: string;
  jobOpenings: {
    title: string;
    status: string;
    period?: string;
  }[];
  visaAcceptance: string[];
  experienceSkills: string[];
  licenses: string[];
  salary: {
    hourlyRate: string;
    overtimeRate: string;
    inclusions: string[];
  };
  employmentType: string;
  duration: string;
  extensions: string;
  contactDetails: {
    email: string;
    phone: string;
    website: string;
  };
}

const WHVEmployerJobDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  // Job details based on employer onboarding data
  const jobDetails: { [key: string]: JobDetails } = {
    '4': {
      id: '4',
      companyName: 'Green Harvest Farms',
      companyLogo: '/lovable-uploads/a8da007e-b9f6-4996-9a54-c5cb294d1f4f.png',
      description: 'Green Harvest Farms is a family-owned agribusiness with over 25 years of experience in sustainable farming. We specialize in organic produce, eco-friendly practices, and community engagement. Our farm is committed to providing WHV holders and local workers with safe, fair, and meaningful employment opportunities.',
      abn: '22 333 444 555',
      location: 'Northrivers, NSW 2470',
      industry: 'Agriculture and Farming, Hospitality',
      jobOpenings: [
        {
          title: 'Farm Assistant',
          status: 'Current Opening'
        },
        {
          title: 'Seasonal Harvest Workers',
          status: 'September-December',
          period: 'September-December'
        },
        {
          title: 'Packing & Sorting Operators',
          status: 'Available'
        }
      ],
      visaAcceptance: ['WHV (subclass 417 & 462) accepted'],
      experienceSkills: [
        'Prior farm or outdoor work (preferred, not required)',
        'Physically fit for manual labor',
        'Team-oriented, punctual, safety-conscious'
      ],
      licenses: [
        'Forklift License (advantage)',
        'Drivers License (advantage)'
      ],
      salary: {
        hourlyRate: 'AUD $28.26 (per Fair Work casual rate, Agriculture Award)',
        overtimeRate: 'Overtime & Penalty Rates: Paid as per Fair Work standards',
        inclusions: [
          'Accommodation available on-site at discounted rates',
          'Weekly transport to town provided',
          'Farm safety training included',
          'Eligible work for 2nd & 3rd year WHV extension'
        ]
      },
      employmentType: 'Seasonal, Full-time (6 months)',
      duration: 'Extensions possible based on performance and farm needs',
      extensions: 'Extensions possible based on performance and farm needs',
      contactDetails: {
        email: 'hr@greenharvest.com.au',
        phone: '+61 2 4567 8900',
        website: 'www.greenharvest.com.au'
      }
    },
    '5': {
      id: '5',
      companyName: 'Coastal Breeze Resort',
      companyLogo: '/lovable-uploads/dde1f5c0-2bba-4180-ab2c-b05bcb7b7def.png',
      description: 'Coastal Breeze Resort is a premier beachfront destination offering luxury hospitality services. We pride ourselves on exceptional guest experiences and providing comprehensive training opportunities for international staff in the hospitality industry.',
      abn: '33 444 555 666',
      location: 'Coolangatta, QLD 4225',
      industry: 'Hospitality and Tourism',
      jobOpenings: [
        {
          title: 'Barista',
          status: 'Current Opening'
        },
        {
          title: 'Front Desk Associate',
          status: 'Available'
        },
        {
          title: 'Housekeeping Supervisor',
          status: 'Current Opening'
        }
      ],
      visaAcceptance: ['WHV (subclass 417 & 462) accepted'],
      experienceSkills: [
        'Hospitality experience preferred',
        'Excellent English communication',
        'Customer service focused',
        'Professional presentation'
      ],
      licenses: [
        'RSA Certificate (Required)',
        'Food Safety Certificate (advantage)'
      ],
      salary: {
        hourlyRate: 'AUD $27.50 (per Hospitality Award)',
        overtimeRate: 'Penalty rates apply for weekends and public holidays',
        inclusions: [
          'Staff accommodation available',
          'Meal allowances during shifts',
          'Staff gym and facilities access',
          'Professional development programs'
        ]
      },
      employmentType: 'Full-time, Permanent',
      duration: 'Minimum 6 months commitment',
      extensions: 'Career progression opportunities available',
      contactDetails: {
        email: 'careers@coastalbreeze.com.au',
        phone: '+61 7 5536 8901',
        website: 'www.coastalbreeze.com.au'
      }
    },
    '6': {
      id: '6',
      companyName: 'Gotall Estates',
      companyLogo: '/lovable-uploads/3961a45e-fda8-48f4-97cc-a5573079e6ac.png',
      description: 'Gotall Estates is a family-owned dairy farm operation with over 35 years of experience. We combine traditional farming values with modern dairy technology to provide quality training and employment in sustainable dairy farming practices.',
      abn: '44 555 666 777',
      location: 'Sunshine Coast, QLD 4019',
      industry: 'Dairy Farm, Agriculture',
      jobOpenings: [
        {
          title: 'Dairy Hand',
          status: 'Current Opening'
        },
        {
          title: 'Farm Maintenance',
          status: 'Available'
        },
        {
          title: 'Livestock Technician',
          status: 'Current Opening'
        }
      ],
      visaAcceptance: ['WHV (subclass 417 & 462) accepted'],
      experienceSkills: [
        'Farm work experience preferred',
        'Early morning availability (4:30 AM starts)',
        'Animal handling experience (advantage)',
        'Mechanical aptitude helpful'
      ],
      licenses: [
        'Drivers License (Required)',
        'Chemical Handling Certificate (provided)'
      ],
      salary: {
        hourlyRate: 'AUD $30.15 (per Pastoral Award)',
        overtimeRate: 'Overtime rates apply after 38 hours per week',
        inclusions: [
          'On-site cottage accommodation',
          'Fresh dairy products included',
          'Equipment operation training',
          'Eligible for 2nd year visa extension'
        ]
      },
      employmentType: 'Full-time, Ongoing',
      duration: '12 months minimum commitment',
      extensions: 'Long-term opportunities for suitable candidates',
      contactDetails: {
        email: 'jobs@gotallestates.com.au',
        phone: '+61 7 5494 7234',
        website: 'www.gotallestates.com.au'
      }
    }
  };

  const job = jobDetails[id || '4'];

  const handleBackNavigation = () => {
    const fromPage = searchParams.get('from');
    const tab = searchParams.get('tab');
    
    // IDs 4, 5, 6 are mutual matches and should always go to full profile
    const isMutualMatch = ['4', '5', '6'].includes(id || '');
    
    if (isMutualMatch) {
      // Always navigate to full profile for mutual matches
      navigate(`/whv/employer/full-profile/${id}?from=whv-matches&tab=${tab || 'matches'}`);
    } else if (fromPage === 'whv-matches') {
      navigate(`/whv/employer/profile/${id}?from=whv-matches&tab=${tab || 'matches'}`);
    } else {
      navigate(`/whv/employer/profile/${id}`);
    }
  };

  if (!job) {
    return <div>Job details not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone 16 Pro Max Frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-4 flex-shrink-0"></div>
          
          {/* Header */}
          <div className="px-4 py-3 flex-shrink-0 border-b">
            <div className="flex items-center gap-3">
              <button onClick={handleBackNavigation}>
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-orange-500 overflow-hidden bg-white">
                  <img
                    src={job.companyLogo}
                    alt={job.companyName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-orange-500 text-white px-3 py-1 rounded-full">
                  <span className="text-sm font-medium">It's a Match with {job.companyName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="space-y-4">
              {/* Company Description */}
              <div>
                <p className="text-sm text-gray-700 leading-relaxed">{job.description}</p>
              </div>

              {/* Company Details */}
              <div className="space-y-2">
                <div><span className="font-semibold">ABN:</span> {job.abn}</div>
                <div><span className="font-semibold">Location (Current / Preferred):</span> {job.location}</div>
                <div><span className="font-semibold">Industry:</span> {job.industry}</div>
              </div>

              {/* Job Openings */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Job Openings / Roles:</h3>
                <ul className="space-y-1">
                  {job.jobOpenings.map((opening, index) => (
                    <li key={index} className="text-sm">
                      • {opening.title} ({opening.status}){opening.period && ` - ${opening.period}`}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visa Acceptance */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Visa Acceptance:</h3>
                <ul className="space-y-1">
                  {job.visaAcceptance.map((visa, index) => (
                    <li key={index} className="text-sm">• {visa}</li>
                  ))}
                </ul>
              </div>

              {/* Experience / Skills */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Experience Preferred / Skills Sought:</h3>
                <ul className="space-y-1">
                  {job.experienceSkills.map((skill, index) => (
                    <li key={index} className="text-sm">• {skill}</li>
                  ))}
                </ul>
              </div>

              {/* Licenses */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Licenses / Certificates (Preferred):</h3>
                <ul className="space-y-1">
                  {job.licenses.map((license, index) => (
                    <li key={index} className="text-sm">• {license}</li>
                  ))}
                </ul>
              </div>

              {/* Salary & Inclusions */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Salary & Inclusions:</h3>
                <div className="space-y-1 text-sm">
                  <div>• <span className="font-medium">Hourly Rate:</span> {job.salary.hourlyRate}</div>
                  <div>• {job.salary.overtimeRate}</div>
                  <div>• <span className="font-medium">Inclusions:</span></div>
                  <ul className="ml-4 space-y-1">
                    {job.salary.inclusions.map((inclusion, index) => (
                      <li key={index}>• {inclusion}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Employment Type */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Employment Type / Duration:</h3>
                <div className="space-y-1 text-sm">
                  <div>• {job.employmentType}</div>
                  <div>• {job.extensions}</div>
                </div>
              </div>

              {/* Contact Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Contact Details:</h3>
                <div className="space-y-1 text-sm">
                  <div>• <span className="font-medium">Email:</span> {job.contactDetails.email}</div>
                  <div>• <span className="font-medium">Phone:</span> {job.contactDetails.phone}</div>
                  <div>• <span className="font-medium">Website:</span> {job.contactDetails.website}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WHVEmployerJobDetails;