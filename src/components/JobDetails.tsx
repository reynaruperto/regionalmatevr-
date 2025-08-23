import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JobDetail {
  id: string;
  employerId: string;
  employerName: string;
  location: string;
  title: string;
  description: string;
  industryType: string;
  requirements: string;
  jobDetails: {
    type: string;
    startDate: string;
    endDate: string;
    payRate: string;
    hours: string;
  };
}

const JobDetails: React.FC = () => {
  const navigate = useNavigate();
  const { employerId, jobId } = useParams();
  const [searchParams] = useSearchParams();

  // Mock job details data
  const jobDetails: { [key: string]: { [key: string]: JobDetail } } = {
    '1': { // Kangafarm jobs
      '1': {
        id: '1',
        employerId: '1',
        employerName: 'KANGAFARM',
        location: 'Clontarf, Queensland 4017',
        title: 'Fruit Picker',
        description: 'We are looking for hardworking and reliable WHV holders to join our team for seasonal fruit picking. Duties include harvesting, sorting, and packing fruit. This role is outdoors and requires good physical fitness. Previous experience is welcome but not required. Accommodation is available on site at discounted rates.',
        industryType: 'Agriculture and Farming',
        requirements: '-Must hold a valid Working Holiday Visa (417/462)\n-White Card preferred but not essential\n-Prior fruit-picking experience is an advantage\n-Ability to work outdoors in all weather conditions\n-Physically fit and able to lift up to 20kg',
        jobDetails: {
          type: 'Casual / Seasonal / Full-time',
          startDate: '10 September 2025',
          endDate: '30 November 2025',
          payRate: '$28/hour + super',
          hours: '30-38 hours per week'
        }
      },
      '2': {
        id: '2',
        employerId: '1',
        employerName: 'KANGAFARM',
        location: 'Clontarf, Queensland 4017',
        title: 'Farm Hand',
        description: 'Join our farming team as a general farm hand. Responsibilities include general farm maintenance, animal care, equipment operation, and assisting with various farming activities. This is an ongoing position suitable for those looking for stable farm work.',
        industryType: 'Agriculture and Farming',
        requirements: '-Must hold a valid Working Holiday Visa (417/462)\n-Previous farm experience preferred\n-Ability to operate basic farm equipment\n-Physical fitness and stamina required\n-Reliable and punctual',
        jobDetails: {
          type: 'Full-time / Ongoing',
          startDate: 'Immediate start available',
          endDate: 'Ongoing',
          payRate: '$26/hour + super',
          hours: '38-40 hours per week'
        }
      },
      '3': {
        id: '3',
        employerId: '1',
        employerName: 'KANGAFARM',
        location: 'Clontarf, Queensland 4017',
        title: 'Tractor Driver',
        description: 'Experienced tractor driver needed for our farming operations. Must have experience operating various farm machinery and tractors. Responsible for field preparation, planting, and harvest operations.',
        industryType: 'Agriculture and Farming',
        requirements: '-Must hold a valid Working Holiday Visa (417/462)\n-Minimum 2 years tractor/machinery experience\n-Valid drivers license required\n-Mechanical knowledge preferred\n-Safety conscious and reliable',
        jobDetails: {
          type: 'Seasonal / Full-time',
          startDate: '15 May 2025',
          endDate: '30 September 2025',
          payRate: '$32/hour + super',
          hours: '40+ hours per week'
        }
      }
    },
    '2': { // Sunny Wines jobs
      '1': {
        id: '1',
        employerId: '2',
        employerName: 'SUNNY WINES',
        location: 'Sunshine Coast, 4551',
        title: 'Farm Supervisor',
        description: 'Join our boutique winery team as a Farm Supervisor. Oversee daily vineyard operations including grape cultivation, harvesting, and quality control. You will manage a small team of workers during peak seasons and ensure compliance with organic farming standards. This role combines hands-on farm work with leadership responsibilities.',
        industryType: 'Wine Production',
        requirements: '-Must hold a valid Working Holiday Visa (417/462)\n-Previous supervisory or team leadership experience required\n-Knowledge of viticulture or agriculture preferred\n-Ability to work outdoors in various weather conditions\n-Strong communication and organizational skills\n-Physical fitness for farm work',
        jobDetails: {
          type: 'Seasonal / Full-time',
          startDate: '5 October 2025',
          endDate: '30 March 2026',
          payRate: '$30/hour + super',
          hours: '35-42 hours per week'
        }
      },
      '2': {
        id: '2',
        employerId: '2',
        employerName: 'SUNNY WINES',
        location: 'Sunshine Coast, 4551',
        title: 'Wine Production Assistant',
        description: 'Support our wine production team in creating premium wines. Duties include grape processing, fermentation monitoring, bottling operations, and cellar maintenance. Training will be provided on wine-making techniques and quality control processes. Perfect opportunity to learn about the wine industry while working in a beautiful location.',
        industryType: 'Wine Production',
        requirements: '-Must hold a valid Working Holiday Visa (417/462)\n-Interest in wine production and agriculture\n-Attention to detail and quality focused\n-Ability to follow precise instructions and procedures\n-Physical ability to lift up to 25kg\n-Reliable and punctual attendance',
        jobDetails: {
          type: 'Casual / Seasonal',
          startDate: '15 October 2025',
          endDate: '15 April 2026',
          payRate: '$26/hour + super',
          hours: '30-35 hours per week'
        }
      }
    },
    '3': { // Oakridge Farm jobs
      '1': {
        id: '1',
        employerId: '3',
        employerName: 'OAKRIDGE FARM',
        location: 'Toowoomba, 4350',
        title: 'Dairy Farm Assistant',
        description: 'Join our modern dairy operation and learn sustainable farming practices. Responsibilities include milking cows, feeding livestock, maintaining clean facilities, and monitoring animal health. We use state-of-the-art equipment and focus on animal welfare. Great opportunity for those interested in agriculture and working with animals.',
        industryType: 'Agriculture and Farming',
        requirements: '-Must hold a valid Working Holiday Visa (417/462)\n-Interest in working with animals\n-Early morning availability (4:30 AM starts)\n-Physical fitness for farm work\n-Reliable transportation preferred\n-Willingness to learn new skills',
        jobDetails: {
          type: 'Full-time / Ongoing',
          startDate: '1 October 2025',
          endDate: 'Ongoing',
          payRate: '$30/hour + super',
          hours: '40 hours per week'
        }
      },
      '2': {
        id: '2',
        employerId: '3',
        employerName: 'OAKRIDGE FARM',
        location: 'Toowoomba, 4350',
        title: 'Farm Maintenance',
        description: 'Maintain and repair farm infrastructure, equipment, and facilities. Duties include fence repairs, equipment maintenance, building upkeep, and general farm improvements. Some mechanical knowledge is beneficial but training will be provided. Work alongside experienced team members in a supportive environment.',
        industryType: 'Agriculture and Farming',
        requirements: '-Must hold a valid Working Holiday Visa (417/462)\n-Basic mechanical or handyman skills preferred\n-Own basic tools is an advantage\n-Problem-solving abilities\n-Physical fitness for manual work\n-Valid driver\'s license preferred',
        jobDetails: {
          type: 'Full-time / Contract',
          startDate: '20 September 2025',
          endDate: '20 December 2025',
          payRate: '$28/hour + super',
          hours: '38 hours per week'
        }
      }
    }
  };

  const job = jobDetails[employerId || '1']?.[jobId || '1'];

  const handleViewEmployerProfile = () => {
    const fromPage = searchParams.get('from');
    const tab = searchParams.get('tab');
    navigate(`/employer/profile/${employerId}?from=${fromPage || 'job-details'}&tab=${tab || ''}`);
  };

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone 16 Pro Max Frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-4 flex-shrink-0"></div>
          
          {/* Header */}
          <div className="px-4 py-3 flex-shrink-0">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 pb-6">
            {/* Job Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-orange-500 text-white p-4 text-center">
                <h1 className="text-xl font-bold">{job.employerName}</h1>
                <p className="text-sm opacity-90">{job.location}</p>
                <p className="text-lg font-semibold mt-1">{job.title}</p>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Description */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description:</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Industry Type */}
                <div>
                  <span className="font-semibold text-gray-900">Industry Type: </span>
                  <span className="text-gray-700">{job.industryType}</span>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Requirements:</h3>
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {job.requirements}
                  </div>
                </div>

                {/* Job Details */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Job Details:</h3>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Job Type: </span>
                      <span className="text-gray-700">{job.jobDetails.type}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Start Date: </span>
                      <span className="text-gray-700">{job.jobDetails.startDate}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">End Date: </span>
                      <span className="text-gray-700">{job.jobDetails.endDate}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Pay Rate: </span>
                      <span className="text-gray-700">{job.jobDetails.payRate}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Hours: </span>
                      <span className="text-gray-700">{job.jobDetails.hours}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <Button
                    onClick={handleViewEmployerProfile}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full h-12"
                  >
                    View Employer Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;