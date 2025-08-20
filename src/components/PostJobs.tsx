import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import PostJobForm from '@/components/PostJobForm';
import BottomNavigation from '@/components/BottomNavigation';

interface Job {
  id: string;
  title: string;
  location: string;
  startDate: string;
  status: 'Active' | 'Closed';
}

const PostJobs: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Fruit Picker - September Start',
      location: 'Clontarf, Queensland',
      startDate: 'September 2025',
      status: 'Active'
    },
    {
      id: '2',
      title: 'Farm Hand',
      location: 'Clontarf, Queensland',
      startDate: 'Ongoing',
      status: 'Active'
    },
    {
      id: '3',
      title: 'Tractor Driver',
      location: 'Clontarf, Queensland',
      startDate: 'May 2025',
      status: 'Closed'
    }
  ]);

  const handlePostJobs = () => {
    setEditingJob(null);
    setShowForm(true);
  };

  const handleEditJob = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setEditingJob(job);
      setShowForm(true);
    }
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
    toast({
      title: "Job Deleted",
      description: "Job has been successfully deleted",
    });
  };

  if (showForm) {
    return (
      <PostJobForm 
        onBack={() => setShowForm(false)} 
        editingJob={editingJob}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-background rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          {/* Main content container */}
          <div className="w-full h-full flex flex-col relative bg-gray-200">
            
            {/* Header */}
            <div className="px-6 pt-16 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-12 h-12 bg-white rounded-xl shadow-sm mr-4"
                    onClick={() => navigate('/employer-dashboard')}
                  >
                    <ArrowLeft className="w-6 h-6 text-gray-700" />
                  </Button>
                  <h1 className="text-lg font-semibold text-gray-900">Your jobs</h1>
                </div>
                <Button 
                  onClick={handlePostJobs}
                  className="bg-[#1E293B] hover:bg-[#1E293B]/90 text-white rounded-2xl px-4 py-2 flex items-center gap-2"
                >
                  <Plus size={16} />
                  Post Jobs
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 overflow-y-auto">
              
              {jobs.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Jobs Posted Yet</h3>
                    <p className="text-gray-600 mb-4">Create your first job posting to start finding the right candidates.</p>
                    <Button 
                      onClick={handlePostJobs}
                      className="bg-[#1E293B] hover:bg-[#1E293B]/90 text-white rounded-xl"
                    >
                      <Plus size={16} className="mr-2" />
                      Post Your First Job
                    </Button>
                  </div>
                </div>
              ) : (
                /* Jobs List */
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="bg-white rounded-2xl p-4 shadow-sm">
                      <div className="flex items-start justify-between">
                        
                        {/* Job Info */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                          <p className="text-gray-600 text-sm mb-1">{job.location}</p>
                          <p className="text-gray-600 text-sm">Starts: {job.startDate}</p>
                        </div>

                        {/* Status and Actions */}
                        <div className="flex flex-col items-end gap-3">
                          
                          {/* Status Badge */}
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            job.status === 'Active' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-300 text-gray-700'
                          }`}>
                            {job.status}
                          </span>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditJob(job.id)}
                              className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                              <Edit size={16} className="text-gray-600" />
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job.id)}
                              className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={16} className="text-gray-600 hover:text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="h-20"></div>
            </div>

            {/* Bottom Navigation */}
            <div className="absolute bottom-0 left-0 right-0 bg-white">
              <BottomNavigation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobs;