import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Job {
  id: string;
  title: string;
  location: string;
  startDate: string;
  status: 'Active' | 'Closed';
  employerId: string;
}

const EmployerJobs: React.FC = () => {
  const navigate = useNavigate();
  const { employerId } = useParams();

  // Mock job data for different employers
  const jobsByEmployer: { [key: string]: Job[] } = {
    '1': [ // Kangafarm jobs
      {
        id: '1',
        title: 'Fruit Picker - September Start',
        location: 'Clontarf, Queensland',
        startDate: 'Starts: September 2025',
        status: 'Active',
        employerId: '1'
      },
      {
        id: '2',
        title: 'Farm Hand',
        location: 'Clontarf, Queensland',
        startDate: 'Starts: Ongoing',
        status: 'Active',
        employerId: '1'
      },
      {
        id: '3',
        title: 'Tractor Driver',
        location: 'Clontarf, Queensland',
        startDate: 'Starts: May 2025',
        status: 'Closed',
        employerId: '1'
      }
    ]
  };

  const employerNames: { [key: string]: string } = {
    '1': 'Kangafarm'
  };

  const jobs = jobsByEmployer[employerId || '1'] || [];
  const employerName = employerNames[employerId || '1'] || 'Employer';

  const handleViewJob = (jobId: string) => {
    navigate(`/job-details/${employerId}/${jobId}`);
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-500' : 'bg-gray-400';
  };

  const getButtonColor = (status: string) => {
    return status === 'Active' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-400';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone 16 Pro Max Frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-4 flex-shrink-0"></div>
          
          {/* Header */}
          <div className="px-4 py-3 flex-shrink-0 flex items-center gap-3">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <div className="bg-orange-500 text-white px-4 py-2 rounded-full">
              <span className="font-medium">{employerName} Jobs</span>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 pb-6">
            <div className="space-y-4 mt-6">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-base mb-1">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-600">{job.location}</p>
                      <p className="text-sm text-gray-600">{job.startDate}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <Button
                      onClick={() => handleViewJob(job.id)}
                      disabled={job.status === 'Closed'}
                      className={`w-full rounded-full text-white text-sm h-10 ${getButtonColor(job.status)}`}
                    >
                      {job.status === 'Active' ? 'View Job' : 'View Job'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerJobs;