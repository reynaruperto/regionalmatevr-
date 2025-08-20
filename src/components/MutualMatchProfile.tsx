import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface MutualMatchEmployer {
  id: string;
  name: string;
  logo: string;
  description: string;
  abn: string;
  location: string;
  industry: string;
  jobOpenings: string[];
  visaAcceptance: string;
  experiencePreferred: string[];
  licenses: string[];
  salary: {
    hourlyRate: string;
    overtimeRate: string;
  };
  inclusions: string[];
  employmentType: string;
  contactDetails: {
    email: string;
    phone: string;
    website: string;
  };
}

const MutualMatchProfile: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock mutual match employer data
  const mutualMatchEmployers: { [key: string]: MutualMatchEmployer } = {
    '4': {
      id: '4',
      name: 'Green Harvest Farms',
      logo: '/lovable-uploads/a8da007e-b9f6-4996-9a54-c5cb294d1f4f.png',
      description: 'Green Harvest Farms is a family-owned agribusiness with over 25 years of experience in sustainable farming. We specialize in seasonal crop production, eco-friendly practices, and community engagement. Our farm is committed to providing WHV holders and local workers with safe, stable, and meaningful employment opportunities.',
      abn: '22 333 444 555',
      location: 'Northrivers, NSW 2470',
      industry: 'Agriculture and Farming, Hospitality',
      jobOpenings: [
        'Farm Assistant (Current Opening)',
        'Seasonal Harvest Workers (September–December)',
        'Packing & Sorting Operators'
      ],
      visaAcceptance: 'WHV (subclass 417 & 462) accepted',
      experiencePreferred: [
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
        overtimeRate: 'Overtime & Penalty Rates: Paid as per Fair Work standards'
      },
      inclusions: [
        'Accommodation available on-site at discounted rates',
        'Weekly transport to town provided',
        '2nd and 3rd year training included',
        'Eligible work for 2nd & 3rd year WHV extension'
      ],
      employmentType: 'Seasonal, Full-time (6 months), Extensions possible based on performance and farm needs',
      contactDetails: {
        email: 'hr@greenharvest.com.au',
        phone: '+61 2 4567 8900',
        website: 'www.greenharvest.com.au'
      }
    }
  };

  const employer = mutualMatchEmployers[id || '4'];

  if (!employer) {
    return <div>Employer not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone 16 Pro Max Frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-4 flex-shrink-0"></div>
          
          {/* Header */}
          <div className="px-4 py-3 flex-shrink-0 flex items-center justify-between">
            <button onClick={() => navigate('/matches?tab=mutualLikes')}>
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-orange-500 overflow-hidden">
                <img
                  src={employer.logo}
                  alt={employer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                <div className="text-center">
                  <div className="text-sm font-semibold">It's a Match</div>
                  <div className="text-sm font-medium">with</div>
                  <div className="text-sm font-semibold">Green Harvest</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 pb-6">
            <div className="space-y-4">
              {/* Company Description */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed text-center">
                  {employer.description}
                </p>
              </div>

              {/* Details */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-3">
                <div>
                  <span className="font-bold text-gray-900">ABN: </span>
                  <span className="text-gray-700">{employer.abn}</span>
                </div>

                <div>
                  <span className="font-bold text-gray-900">Location (Current / Preferred): </span>
                  <span className="text-gray-700">{employer.location}</span>
                </div>

                <div>
                  <span className="font-bold text-gray-900">Industry: </span>
                  <span className="text-gray-700">{employer.industry}</span>
                </div>

                <div>
                  <span className="font-bold text-gray-900">Job Openings / Roles:</span>
                  <ul className="mt-1 ml-4 space-y-1">
                    {employer.jobOpenings.map((job, index) => (
                      <li key={index} className="text-gray-700 text-sm">• {job}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-gray-900">Visa Acceptance: </span>
                  <span className="text-gray-700">{employer.visaAcceptance}</span>
                </div>

                <div>
                  <span className="font-bold text-gray-900">Experience Preferred / Skills Sought:</span>
                  <ul className="mt-1 ml-4 space-y-1">
                    {employer.experiencePreferred.map((skill, index) => (
                      <li key={index} className="text-gray-700 text-sm">• {skill}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-gray-900">Licenses / Certificates (Preferred):</span>
                  <ul className="mt-1 ml-4 space-y-1">
                    {employer.licenses.map((license, index) => (
                      <li key={index} className="text-gray-700 text-sm">• {license}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-gray-900">Salary & Inclusions:</span>
                  <div className="mt-1 space-y-1">
                    <div className="text-gray-700 text-sm">• {employer.salary.hourlyRate}</div>
                    <div className="text-gray-700 text-sm">• {employer.salary.overtimeRate}</div>
                    <div className="text-gray-700 text-sm font-medium">Inclusions:</div>
                    {employer.inclusions.map((inclusion, index) => (
                      <div key={index} className="text-gray-700 text-sm ml-4">• {inclusion}</div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-gray-900">Employment Type / Duration:</span>
                  <div className="text-gray-700 text-sm mt-1">• {employer.employmentType}</div>
                </div>

                <div>
                  <span className="font-bold text-gray-900">Contact Details:</span>
                  <div className="mt-1 space-y-1">
                    <div className="text-gray-700 text-sm">• Email: {employer.contactDetails.email}</div>
                    <div className="text-gray-700 text-sm">• Phone: {employer.contactDetails.phone}</div>
                    <div className="text-gray-700 text-sm">• Website: {employer.contactDetails.website}</div>
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