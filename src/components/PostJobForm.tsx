import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
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
    // Basic Job Info
    jobTitle: editingJob?.title || '',
    jobDescription: '',
    industryType: 'Agriculture & Farming',
    jobType: 'Casual / Seasonal',
    
    // Schedule & Duration
    fullTime: true,
    startDate: editingJob?.startDate || '',
    endDate: '',
    hours: '',
    
    // Pay Information
    payRateMin: '',
    payRateMax: '',
    payType: '/hour',
    superannuation: true,
    
    // Location
    suburb: '',
    state: 'Queensland',
    postCode: '',
    
    // Experience Requirements (YES/NO FLAGS)
    previousExperienceRequired: false,
    experienceDetails: '',
    
    // Tickets & Certifications (YES/NO FLAGS)
    ticketsRequired: false,
    requiredTickets: [] as string[],
    
    // Physical Requirements (YES/NO FLAGS)
    physicalConditionsRequired: false,
    physicalDetails: '',
    
    // Skills Requirements (YES/NO FLAGS)
    specificSkillsRequired: false,
    skillsDetails: '',
    
    // Visa Preferences
    preferredVisaTypes: [] as string[],
    visaRequired: true,
    
    // Benefits & Facilities
    accommodationProvided: false,
    accommodationDetails: '',
    mealsProvided: false,
    mealsDetails: '',
    transportProvided: false,
    trainingProvided: false,
    otherBenefits: ''
  });

  const commonTickets = [
    'White Card (Construction)',
    'RSA (Responsible Service of Alcohol)',
    'RSG (Responsible Service of Gaming)',
    'Food Safety Supervisor',
    'First Aid Certificate',
    'Driver\'s License',
    'Forklift License',
    'Working at Heights',
    'Manual Handling',
    'Chemical Handling'
  ];

  const whvVisaTypes = [
    'Subclass 417 (Working Holiday)',
    'Subclass 462 (Work and Holiday)',
    'Any Valid Work Visa'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTicketToggle = (ticket: string) => {
    setFormData(prev => ({
      ...prev,
      requiredTickets: prev.requiredTickets.includes(ticket)
        ? prev.requiredTickets.filter(t => t !== ticket)
        : [...prev.requiredTickets, ticket]
    }));
  };

  const handleVisaToggle = (visa: string) => {
    setFormData(prev => ({
      ...prev,
      preferredVisaTypes: prev.preferredVisaTypes.includes(visa)
        ? prev.preferredVisaTypes.filter(v => v !== visa)
        : [...prev.preferredVisaTypes, visa]
    }));
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
              
              {/* Basic Job Information */}
              <div className="bg-white rounded-2xl p-3 mb-3 shadow-sm">
                <h2 className="text-sm font-semibold text-[#1E293B] mb-3">Basic Job Information</h2>
                
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Job Title</label>
                    <Input
                      value={formData.jobTitle}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                      placeholder="e.g., Fruit Picker"
                      className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Job Description</label>
                    <Textarea
                      value={formData.jobDescription}
                      onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                      placeholder="Describe the role, duties, and work environment..."
                      className="bg-gray-50 border-gray-200 rounded-xl text-sm min-h-[60px] resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Industry</label>
                      <Select value={formData.industryType} onValueChange={(value) => handleInputChange('industryType', value)}>
                        <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                          <SelectItem value="Agriculture & Farming">Agriculture & Farming</SelectItem>
                          <SelectItem value="Hospitality">Hospitality</SelectItem>
                          <SelectItem value="Construction">Construction</SelectItem>
                          <SelectItem value="Tourism">Tourism</SelectItem>
                          <SelectItem value="Mining">Mining</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Job Type</label>
                      <Select value={formData.jobType} onValueChange={(value) => handleInputChange('jobType', value)}>
                        <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                          <SelectItem value="Casual / Seasonal">Casual / Seasonal</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule & Duration */}
              <div className="bg-white rounded-2xl p-3 mb-3 shadow-sm">
                <h2 className="text-sm font-semibold text-[#1E293B] mb-3">Schedule & Duration</h2>
                
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                      <Input
                        value={formData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                        placeholder="e.g., September 2025"
                        className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                      <Input
                        value={formData.endDate}
                        onChange={(e) => handleInputChange('endDate', e.target.value)}
                        placeholder="e.g., November 2025"
                        className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Hours per Week</label>
                    <Input
                      value={formData.hours}
                      onChange={(e) => handleInputChange('hours', e.target.value)}
                      placeholder="e.g., 30-38 hours per week"
                      className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9"
                    />
                  </div>
                </div>
              </div>

              {/* Pay Information */}
              <div className="bg-white rounded-2xl p-3 mb-3 shadow-sm">
                <h2 className="text-sm font-semibold text-[#1E293B] mb-3">Pay Information</h2>
                
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Min Rate</label>
                      <Input
                        value={formData.payRateMin}
                        onChange={(e) => handleInputChange('payRateMin', e.target.value)}
                        placeholder="25"
                        className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Max Rate</label>
                      <Input
                        value={formData.payRateMax}
                        onChange={(e) => handleInputChange('payRateMax', e.target.value)}
                        placeholder="30"
                        className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                      <Select value={formData.payType} onValueChange={(value) => handleInputChange('payType', value)}>
                        <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                          <SelectItem value="/hour">/hour</SelectItem>
                          <SelectItem value="/day">/day</SelectItem>
                          <SelectItem value="/week">/week</SelectItem>
                          <SelectItem value="/piece">/piece</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-600">Superannuation Included</span>
                    <Switch
                      checked={formData.superannuation}
                      onCheckedChange={(checked) => handleInputChange('superannuation', checked)}
                      className="data-[state=checked]:bg-[#1E293B]"
                    />
                  </div>
                </div>
              </div>

              {/* Experience Requirements */}
              <div className="bg-white rounded-2xl p-3 mb-3 shadow-sm">
                <h2 className="text-sm font-semibold text-[#1E293B] mb-3">Experience Requirements</h2>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-600">Previous Experience Required?</span>
                    <Switch
                      checked={formData.previousExperienceRequired}
                      onCheckedChange={(checked) => handleInputChange('previousExperienceRequired', checked)}
                      className="data-[state=checked]:bg-[#1E293B]"
                    />
                  </div>

                  {formData.previousExperienceRequired && (
                    <Textarea
                      value={formData.experienceDetails}
                      onChange={(e) => handleInputChange('experienceDetails', e.target.value)}
                      placeholder="Specify what kind of experience is required..."
                      className="bg-gray-50 border-gray-200 rounded-xl text-sm min-h-[50px] resize-none"
                    />
                  )}
                </div>
              </div>

              {/* Tickets & Certifications */}
              <div className="bg-white rounded-2xl p-3 mb-3 shadow-sm">
                <h2 className="text-sm font-semibold text-[#1E293B] mb-3">Tickets & Certifications</h2>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-600">Any Tickets Required?</span>
                    <Switch
                      checked={formData.ticketsRequired}
                      onCheckedChange={(checked) => handleInputChange('ticketsRequired', checked)}
                      className="data-[state=checked]:bg-[#1E293B]"
                    />
                  </div>

                  {formData.ticketsRequired && (
                    <div className="grid grid-cols-1 gap-1 max-h-24 overflow-y-auto">
                      {commonTickets.map((ticket) => (
                        <div key={ticket} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={ticket}
                            checked={formData.requiredTickets.includes(ticket)}
                            onChange={() => handleTicketToggle(ticket)}
                            className="rounded text-[#1E293B] focus:ring-[#1E293B]"
                          />
                          <label htmlFor={ticket} className="text-xs text-gray-600 cursor-pointer">
                            {ticket}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Physical Requirements */}
              <div className="bg-white rounded-2xl p-3 mb-3 shadow-sm">
                <h2 className="text-sm font-semibold text-[#1E293B] mb-3">Physical Requirements</h2>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-600">Physical Conditions Required?</span>
                    <Switch
                      checked={formData.physicalConditionsRequired}
                      onCheckedChange={(checked) => handleInputChange('physicalConditionsRequired', checked)}
                      className="data-[state=checked]:bg-[#1E293B]"
                    />
                  </div>

                  {formData.physicalConditionsRequired && (
                    <Textarea
                      value={formData.physicalDetails}
                      onChange={(e) => handleInputChange('physicalDetails', e.target.value)}
                      placeholder="e.g., Ability to lift 20kg, work outdoors, stand for long periods..."
                      className="bg-gray-50 border-gray-200 rounded-xl text-sm min-h-[50px] resize-none"
                    />
                  )}
                </div>
              </div>

              {/* Skills Requirements */}
              <div className="bg-white rounded-2xl p-3 mb-3 shadow-sm">
                <h2 className="text-sm font-semibold text-[#1E293B] mb-3">Skills Requirements</h2>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-600">Specific Skills Required?</span>
                    <Switch
                      checked={formData.specificSkillsRequired}
                      onCheckedChange={(checked) => handleInputChange('specificSkillsRequired', checked)}
                      className="data-[state=checked]:bg-[#1E293B]"
                    />
                  </div>

                  {formData.specificSkillsRequired && (
                    <Textarea
                      value={formData.skillsDetails}
                      onChange={(e) => handleInputChange('skillsDetails', e.target.value)}
                      placeholder="e.g., Equipment operation, computer skills, language requirements..."
                      className="bg-gray-50 border-gray-200 rounded-xl text-sm min-h-[50px] resize-none"
                    />
                  )}
                </div>
              </div>

              {/* Visa Preferences */}
              <div className="bg-white rounded-2xl p-3 mb-3 shadow-sm">
                <h2 className="text-sm font-semibold text-[#1E293B] mb-3">Visa Preferences</h2>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-600">Valid Work Visa Required?</span>
                    <Switch
                      checked={formData.visaRequired}
                      onCheckedChange={(checked) => handleInputChange('visaRequired', checked)}
                      className="data-[state=checked]:bg-[#1E293B]"
                    />
                  </div>

                  {formData.visaRequired && (
                    <div className="grid grid-cols-1 gap-1 max-h-32 overflow-y-auto">
                      {whvVisaTypes.map((visa) => (
                        <div key={visa} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={visa}
                            checked={formData.preferredVisaTypes.includes(visa)}
                            onChange={() => handleVisaToggle(visa)}
                            className="rounded text-[#1E293B] focus:ring-[#1E293B]"
                          />
                          <label htmlFor={visa} className="text-xs text-gray-600 cursor-pointer">
                            {visa}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-2xl p-3 mb-3 shadow-sm">
                <h2 className="text-sm font-semibold text-[#1E293B] mb-3">Job Location</h2>
                
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Suburb/City</label>
                      <Input
                        value={formData.suburb}
                        onChange={(e) => handleInputChange('suburb', e.target.value)}
                        placeholder="e.g., Clontarf"
                        className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Post Code</label>
                      <Input
                        value={formData.postCode}
                        onChange={(e) => handleInputChange('postCode', e.target.value)}
                        placeholder="e.g., 4116"
                        className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">State</label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                      <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50">
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
                </div>
              </div>

              {/* Save Button */}
              <div className="pb-6">
                <Button 
                  onClick={handleSaveAndPost}
                  className="w-full bg-[#1E293B] hover:bg-[#1E293B]/90 text-white rounded-xl h-12 text-base font-medium"
                >
                  {editingJob ? 'Update Job' : 'Post Job'}
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