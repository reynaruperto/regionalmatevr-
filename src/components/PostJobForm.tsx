import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BottomNavigation from '@/components/BottomNavigation';
import { useToast } from '@/hooks/use-toast';

interface PostJobFormProps {
  onBack: () => void;
  editingJob?: {
    id: string;
    title: string;
    location: string;
    startDate: string;
    status: 'Active' | 'Closed';
  } | null;
}

const PostJobForm: React.FC<PostJobFormProps> = ({ onBack, editingJob }) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    jobTitle: editingJob?.title || '',
    jobDescription: 'We are looking for hardworking and reliable WHV holders to join our team for seasonal fruit picking. Duties include harvesting, sorting, and packing fruit. This role is outdoors and requires good physical fitness. Previous experience is welcome but not required. Accommodation is available on site at discounted rates.',
    industryType: 'Agriculture & Farming',
    jobType: 'Casual / Seasonal',
    fullTime: true,
    startDate: editingJob?.startDate || '10 September 2025',
    endDate: '30 November 2025',
    // Season fields
    seasonType: 'Harvest Season',
    seasonDescription: 'September 2025 onwards',
    // Pay Range fields
    payRateMin: '25',
    payRateMax: '30',
    payType: '/hour',
    superannuation: true,
    // Benefits fields
    accommodation: true,
    accommodationType: 'On-site available',
    meals: true,
    mealsType: 'Provided',
    transport: false,
    training: false,
    otherBenefits: '',
    hours: '30-38 hours per week',
    suburb: 'Clontarf',
    state: 'Queensland',
    postCode: '4116',
    requirements: [
      'Must hold a valid Working Holiday Visa (417/462)',
      'White Card preferred but not essential',
      'Prior fruit-picking experience is an advantage',
      'Ability to work outdoors in all weather conditions',
      'Physically fit and able to lift up to 20kg'
    ]
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveAndPost = () => {
    toast({
      title: editingJob ? "Job Updated" : "Job Posted",
      description: editingJob ? "Job has been successfully updated" : "Job has been successfully posted",
    });
    onBack();
  };

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
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-12 h-12 bg-white rounded-xl shadow-sm mr-4"
                  onClick={onBack}
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </Button>
                <h1 className="text-lg font-semibold text-gray-900">
                  {editingJob ? 'Edit Job' : 'Post Jobs'}
                </h1>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 overflow-y-auto pb-24">
              
              {/* Job Basics */}
              <div className="mb-6">
                <h2 className="text-base font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">Job Basics</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Job Title</label>
                  <Input
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    placeholder="Fruit Picker"
                    className="bg-white border-gray-200 rounded-xl"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Job Description</label>
                  <Textarea
                    value={formData.jobDescription}
                    onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                    className="bg-white border-gray-200 rounded-xl min-h-[120px] resize-none"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Industry Type</label>
                  <Select value={formData.industryType} onValueChange={(value) => handleInputChange('industryType', value)}>
                    <SelectTrigger className="bg-white border-gray-200 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Agriculture & Farming">Agriculture & Farming</SelectItem>
                      <SelectItem value="Hospitality">Hospitality</SelectItem>
                      <SelectItem value="Construction">Construction</SelectItem>
                      <SelectItem value="Tourism">Tourism</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Job Details and Requirements */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                
                {/* Job Details */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-3">Job Details</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div>
                      <span className="font-medium">Job Type:</span>
                      <div className="text-gray-600">{formData.jobType}</div>
                      <div className="text-gray-600">Full-time</div>
                    </div>
                    <div>
                      <span className="font-medium">Start Date:</span>
                      <div className="text-gray-600">{formData.startDate}</div>
                    </div>
                    <div>
                      <span className="font-medium">End Date:</span>
                      <div className="text-gray-600">{formData.endDate}</div>
                    </div>
                    <div>
                      <span className="font-medium">Pay Range:</span>
                      <div className="text-gray-600">${formData.payRateMin}-${formData.payRateMax}{formData.payType}</div>
                    </div>
                    <div>
                      <span className="font-medium">Hours:</span>
                      <div className="text-gray-600">{formData.hours}</div>
                    </div>
                  </div>
                </div>

                {/* Job Requirements */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-3">Job Requirements</h3>
                  <div className="space-y-2">
                    {formData.requirements.map((req, index) => (
                      <div key={index} className="text-xs text-gray-600 leading-tight">
                        -{req}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Season Information */}
              <div className="mb-6">
                <h2 className="text-base font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">Season & Availability</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Season Type</label>
                  <Select value={formData.seasonType} onValueChange={(value) => handleInputChange('seasonType', value)}>
                    <SelectTrigger className="bg-white border-gray-200 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Harvest Season">Harvest Season</SelectItem>
                      <SelectItem value="Planting Season">Planting Season</SelectItem>
                      <SelectItem value="Peak Season">Peak Season</SelectItem>
                      <SelectItem value="Year Round">Year Round</SelectItem>
                      <SelectItem value="Summer Season">Summer Season</SelectItem>
                      <SelectItem value="Winter Season">Winter Season</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Season Description</label>
                  <Input
                    value={formData.seasonDescription}
                    onChange={(e) => handleInputChange('seasonDescription', e.target.value)}
                    placeholder="e.g., September 2025 onwards"
                    className="bg-white border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Pay Range */}
              <div className="mb-6">
                <h2 className="text-base font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">Pay Range</h2>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Min Rate</label>
                    <Input
                      value={formData.payRateMin}
                      onChange={(e) => handleInputChange('payRateMin', e.target.value)}
                      placeholder="25"
                      className="bg-white border-gray-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Max Rate</label>
                    <Input
                      value={formData.payRateMax}
                      onChange={(e) => handleInputChange('payRateMax', e.target.value)}
                      placeholder="30"
                      className="bg-white border-gray-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Type</label>
                    <Select value={formData.payType} onValueChange={(value) => handleInputChange('payType', value)}>
                      <SelectTrigger className="bg-white border-gray-200 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="/hour">/hour</SelectItem>
                        <SelectItem value="/day">/day</SelectItem>
                        <SelectItem value="/week">/week</SelectItem>
                        <SelectItem value="/piece">/piece</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="superannuation"
                    checked={formData.superannuation}
                    onChange={(e) => handleInputChange('superannuation', e.target.checked.toString())}
                    className="rounded"
                  />
                  <label htmlFor="superannuation" className="text-sm text-gray-600">+ Superannuation</label>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-6">
                <h2 className="text-base font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">Benefits & Facilities</h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <input
                        type="checkbox"
                        id="accommodation"
                        checked={formData.accommodation}
                        onChange={(e) => handleInputChange('accommodation', e.target.checked.toString())}
                        className="rounded"
                      />
                      <label htmlFor="accommodation" className="text-sm font-medium text-gray-600">Accommodation</label>
                    </div>
                    {formData.accommodation && (
                      <Input
                        value={formData.accommodationType}
                        onChange={(e) => handleInputChange('accommodationType', e.target.value)}
                        placeholder="e.g., On-site available, Shared rooms"
                        className="bg-white border-gray-200 rounded-xl ml-6"
                      />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <input
                        type="checkbox"
                        id="meals"
                        checked={formData.meals}
                        onChange={(e) => handleInputChange('meals', e.target.checked.toString())}
                        className="rounded"
                      />
                      <label htmlFor="meals" className="text-sm font-medium text-gray-600">Meals</label>
                    </div>
                    {formData.meals && (
                      <Input
                        value={formData.mealsType}
                        onChange={(e) => handleInputChange('mealsType', e.target.value)}
                        placeholder="e.g., Provided, Breakfast included"
                        className="bg-white border-gray-200 rounded-xl ml-6"
                      />
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="transport"
                      checked={formData.transport}
                      onChange={(e) => handleInputChange('transport', e.target.checked.toString())}
                      className="rounded"
                    />
                    <label htmlFor="transport" className="text-sm font-medium text-gray-600">Transport Provided</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="training"
                      checked={formData.training}
                      onChange={(e) => handleInputChange('training', e.target.checked.toString())}
                      className="rounded"
                    />
                    <label htmlFor="training" className="text-sm font-medium text-gray-600">Training Provided</label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Other Benefits</label>
                    <Input
                      value={formData.otherBenefits}
                      onChange={(e) => handleInputChange('otherBenefits', e.target.value)}
                      placeholder="e.g., Gym access, social activities"
                      className="bg-white border-gray-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Location & Dates */}
              <div className="mb-8">
                <h2 className="text-base font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">Location & Dates</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Suburb/City</label>
                  <Input
                    value={formData.suburb}
                    onChange={(e) => handleInputChange('suburb', e.target.value)}
                    className="bg-white border-gray-200 rounded-xl"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">State</label>
                  <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                    <SelectTrigger className="bg-white border-gray-200 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Queensland">Queensland</SelectItem>
                      <SelectItem value="New South Wales">New South Wales</SelectItem>
                      <SelectItem value="Victoria">Victoria</SelectItem>
                      <SelectItem value="South Australia">South Australia</SelectItem>
                      <SelectItem value="Western Australia">Western Australia</SelectItem>
                      <SelectItem value="Tasmania">Tasmania</SelectItem>
                      <SelectItem value="Northern Territory">Northern Territory</SelectItem>
                      <SelectItem value="Australian Capital Territory">Australian Capital Territory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Post Code</label>
                  <Input
                    value={formData.postCode}
                    onChange={(e) => handleInputChange('postCode', e.target.value)}
                    className="bg-white border-gray-200 rounded-xl"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Start Date</label>
                  <Input
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="bg-white border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Save and Post Button */}
              <div className="flex justify-center mb-6">
                <Button 
                  onClick={handleSaveAndPost}
                  className="bg-[#1E293B] hover:bg-[#1E293B]/90 text-white rounded-2xl px-8 py-3 text-base font-medium"
                >
                  {editingJob ? 'Save Changes' : 'Save and Post'}
                </Button>
              </div>
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

export default PostJobForm;