import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, X } from 'lucide-react';

interface WorkExperience {
  id: string;
  startDate: string;
  endDate: string;
  position: string;
  company: string;
  location: string;
}

interface JobReference {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  role: string;
}

const WHVWorkExperience: React.FC = () => {
  const navigate = useNavigate();
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [jobReferences, setJobReferences] = useState<JobReference[]>([]);
  const [workPreferences, setWorkPreferences] = useState({
    availableStartDate: '',
    preferredIndustry: '',
    stayDuration: '',
    willingToRelocate: '',
    licenses: [] as string[]
  });

  const [aboutYourself, setAboutYourself] = useState({
    tagline: ''
  });

  // Industry options
  const industries = [
    'Agriculture & Farming',
    'Construction',
    'Hospitality & Tourism',
    'Healthcare',
    'Retail',
    'Manufacturing',
    'Mining',
    'Education',
    'Transport & Logistics',
    'Other'
  ];

  const stayDurations = [
    '3 months',
    '6 months',
    '12 months',
    '18 months',
    '2 years',
    'Flexible'
  ];

  const licenseOptions = [
    'N/A',
    'Driver\'s License',
    'Forklift License',
    'Working at Heights',
    'White Card (Construction)',
    'RSA (Responsible Service of Alcohol)',
    'RCG (Responsible Conduct of Gambling)',
    'Food Safety Certificate',
    'First Aid Certificate',
    'Heavy Vehicle License',
    'Crane License',
    'Electrical License',
    'Other'
  ];

  // Date validation
  const validateDate = (dateStr: string): boolean => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(dateStr)) return false;
    
    const [day, month, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
  };

  const formatDateInput = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
  };

  // Work Experience handlers
  const addWorkExperience = () => {
    if (workExperiences.length < 8) {
      setWorkExperiences([...workExperiences, {
        id: Date.now().toString(),
        startDate: '',
        endDate: '',
        position: '',
        company: '',
        location: ''
      }]);
    }
  };

  const updateWorkExperience = (id: string, field: string, value: string) => {
    setWorkExperiences(workExperiences.map(exp => 
      exp.id === id ? { ...exp, [field]: field.includes('Date') ? formatDateInput(value) : value } : exp
    ));
  };

  const removeWorkExperience = (id: string) => {
    setWorkExperiences(workExperiences.filter(exp => exp.id !== id));
  };

  // Job Reference handlers
  const addJobReference = () => {
    if (jobReferences.length < 5) {
      setJobReferences([...jobReferences, {
        id: Date.now().toString(),
        name: '',
        businessName: '',
        email: '',
        phone: '',
        role: ''
      }]);
    }
  };

  const updateJobReference = (id: string, field: string, value: string) => {
    let processedValue = value;
    if (field === 'phone') {
      processedValue = value.replace(/\D/g, '');
    }
    setJobReferences(jobReferences.map(ref => 
      ref.id === id ? { ...ref, [field]: processedValue } : ref
    ));
  };

  const removeJobReference = (id: string) => {
    setJobReferences(jobReferences.filter(ref => ref.id !== id));
  };

  const handleWorkPreferenceChange = (field: string, value: string) => {
    let processedValue: any = value;
    if (field === 'availableStartDate') {
      processedValue = formatDateInput(value);
    } else if (field === 'licenses') {
      // Handle multiple license selection
      const currentLicenses = workPreferences.licenses;
      if (currentLicenses.includes(value)) {
        processedValue = currentLicenses.filter(license => license !== value);
      } else {
        processedValue = [...currentLicenses, value];
      }
    }
    setWorkPreferences({
      ...workPreferences,
      [field]: processedValue
    });
  };

  const handleAboutYourselfChange = (field: string, value: string) => {
    setAboutYourself({
      ...aboutYourself,
      [field]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate dates
    if (workPreferences.availableStartDate && !validateDate(workPreferences.availableStartDate)) {
      alert('Please enter a valid start date in DD/MM/YYYY format');
      return;
    }

    // Validate work experience dates
    for (const exp of workExperiences) {
      if (exp.startDate && !validateDate(exp.startDate)) {
        alert('Please enter valid start dates in DD/MM/YYYY format');
        return;
      }
      if (exp.endDate && !validateDate(exp.endDate)) {
        alert('Please enter valid end dates in DD/MM/YYYY format');
        return;
      }
    }

    console.log('Work Preferences:', workPreferences);
    console.log('Work Experiences:', workExperiences);
    console.log('Job References:', jobReferences);
    navigate('/whv/photo-upload');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-4 flex-shrink-0"></div>
          
          {/* Header - Fixed */}
          <div className="px-4 py-3 border-b bg-white flex-shrink-0">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => navigate('/whv/current-address')}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h1 className="text-lg font-medium text-gray-900">Work Experience</h1>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <span className="text-sm font-medium text-gray-600">4/6</span>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <form onSubmit={handleSubmit} className="space-y-8 pb-20">
              
              {/* Tell us about yourself Section */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Tell us about yourself</h2>
                  <p className="text-gray-600 mt-1">This helps us match you with the right employers and opportunities.</p>
                </div>
                
                {/* Profile Tagline */}
                <div className="space-y-2">
                  <Label className="text-base font-medium text-gray-700">
                    Profile Tagline
                  </Label>
                  <Input
                    type="text"
                    value={aboutYourself.tagline}
                    onChange={(e) => handleAboutYourselfChange('tagline', e.target.value)}
                    className="h-12 bg-gray-100 border-0 text-gray-900"
                    placeholder="Hardworking farm enthusiast ready for adventure"
                    maxLength={60}
                  />
                  <p className="text-xs text-gray-500">This will appear under your profile photo (max 60 characters)</p>
                </div>
              </div>

              {/* Work Preferences Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Work Preferences</h2>
                
                {/* Available Start Date */}
                <div className="space-y-2">
                  <Label className="text-base font-medium text-gray-700">
                    Available Start Date (DD/MM/YYYY)
                  </Label>
                  <Input
                    type="text"
                    value={workPreferences.availableStartDate}
                    onChange={(e) => handleWorkPreferenceChange('availableStartDate', e.target.value)}
                    className="h-12 bg-gray-100 border-0 text-gray-900"
                    placeholder="10/10/2025"
                    maxLength={10}
                  />
                </div>

                {/* Industry Interested In */}
                <div className="space-y-2">
                  <Label className="text-base font-medium text-gray-700">
                    Industry Interested in
                  </Label>
                  <Select onValueChange={(value) => handleWorkPreferenceChange('preferredIndustry', value)}>
                    <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                      <SelectValue placeholder="Agriculture & Farming" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-50">
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry} className="hover:bg-gray-100">
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* How long staying in Australia */}
                <div className="space-y-2">
                  <Label className="text-base font-medium text-gray-700">
                    How long are you planning to stay in Australia?
                  </Label>
                  <Select onValueChange={(value) => handleWorkPreferenceChange('stayDuration', value)}>
                    <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                      <SelectValue placeholder="12 months" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-50">
                      {stayDurations.map((duration) => (
                        <SelectItem key={duration} value={duration} className="hover:bg-gray-100">
                          {duration}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Willing to Relocate */}
                <div className="space-y-3">
                  <Label className="text-base font-medium text-gray-700">
                    Willing to Relocate?
                  </Label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => handleWorkPreferenceChange('willingToRelocate', 'yes')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                        workPreferences.willingToRelocate === 'yes' 
                          ? 'border-orange-500 bg-orange-50' 
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        workPreferences.willingToRelocate === 'yes' 
                          ? 'border-orange-500 bg-orange-500' 
                          : 'border-gray-300'
                      }`}>
                        {workPreferences.willingToRelocate === 'yes' && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-gray-700">Yes</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => handleWorkPreferenceChange('willingToRelocate', 'no')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                        workPreferences.willingToRelocate === 'no' 
                          ? 'border-orange-500 bg-orange-50' 
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        workPreferences.willingToRelocate === 'no' 
                          ? 'border-orange-500 bg-orange-500' 
                          : 'border-gray-300'
                      }`}>
                        {workPreferences.willingToRelocate === 'no' && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-gray-700">No</span>
                    </button>
                  </div>
                </div>

                {/* Licenses/Tickets */}
                <div className="space-y-2">
                  <Label className="text-base font-medium text-gray-700">
                    Licenses/Tickets (Select all that apply)
                  </Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto bg-gray-100 rounded-lg p-3">
                    {licenseOptions.map((license) => (
                      <div key={license} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`license-${license}`}
                          checked={workPreferences.licenses.includes(license)}
                          onChange={() => handleWorkPreferenceChange('licenses', license)}
                          className="w-4 h-4 text-orange-500 bg-white border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                        />
                        <Label 
                          htmlFor={`license-${license}`}
                          className="text-sm text-gray-700 cursor-pointer flex-1"
                        >
                          {license}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {workPreferences.licenses.length > 0 && (
                    <div className="text-sm text-gray-600">
                      Selected: {workPreferences.licenses.join(', ')}
                    </div>
                  )}
                </div>
              </div>

              {/* Work Experience Details Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Work Experience Details</h2>
                  <Button
                    type="button"
                    onClick={addWorkExperience}
                    disabled={workExperiences.length >= 8}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Experience
                  </Button>
                </div>

                {workExperiences.map((experience, index) => (
                  <div key={experience.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Experience {index + 1}</h3>
                      <Button
                        type="button"
                        onClick={() => removeWorkExperience(experience.id)}
                        variant="ghost"
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Start Date</Label>
                        <Input
                          type="text"
                          value={experience.startDate}
                          onChange={(e) => updateWorkExperience(experience.id, 'startDate', e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                          placeholder="01/2020"
                          maxLength={10}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">End Date</Label>
                        <Input
                          type="text"
                          value={experience.endDate}
                          onChange={(e) => updateWorkExperience(experience.id, 'endDate', e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                          placeholder="12/2024"
                          maxLength={10}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Position</Label>
                      <Input
                        type="text"
                        value={experience.position}
                        onChange={(e) => updateWorkExperience(experience.id, 'position', e.target.value)}
                        className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                        placeholder="Farm Attendant"
                        maxLength={50}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Company</Label>
                      <Input
                        type="text"
                        value={experience.company}
                        onChange={(e) => updateWorkExperience(experience.id, 'company', e.target.value)}
                        className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                        placeholder="Villa Farm"
                        maxLength={50}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Location</Label>
                      <Input
                        type="text"
                        value={experience.location}
                        onChange={(e) => updateWorkExperience(experience.id, 'location', e.target.value)}
                        className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                        placeholder="Mendoza, Argentina"
                        maxLength={50}
                      />
                    </div>
                  </div>
                ))}

                {workExperiences.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No work experiences added yet.</p>
                    <p className="text-sm">Click "Add Experience" to get started.</p>
                  </div>
                )}
              </div>

              {/* Job References Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Job References</h2>
                  <Button
                    type="button"
                    onClick={addJobReference}
                    disabled={jobReferences.length >= 5}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Reference
                  </Button>
                </div>

                {jobReferences.map((reference, index) => (
                  <div key={reference.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Reference {index + 1}</h3>
                      <Button
                        type="button"
                        onClick={() => removeJobReference(reference.id)}
                        variant="ghost"
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Name</Label>
                        <Input
                          type="text"
                          value={reference.name}
                          onChange={(e) => updateJobReference(reference.id, 'name', e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                          placeholder="Elaine Smith"
                          maxLength={50}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Business Name</Label>
                        <Input
                          type="text"
                          value={reference.businessName}
                          onChange={(e) => updateJobReference(reference.id, 'businessName', e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                          placeholder="Villa Farm Pty Ltd"
                          maxLength={50}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Email</Label>
                        <Input
                          type="email"
                          value={reference.email}
                          onChange={(e) => updateJobReference(reference.id, 'email', e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                          placeholder="elaine.smith@villafarm.com"
                          maxLength={100}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                        <Input
                          type="text"
                          value={reference.phone}
                          onChange={(e) => updateJobReference(reference.id, 'phone', e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                          placeholder="61499888000"
                          maxLength={15}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Role</Label>
                        <Input
                          type="text"
                          value={reference.role}
                          onChange={(e) => updateJobReference(reference.id, 'role', e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                          placeholder="Head of HR"
                          maxLength={50}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {jobReferences.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No job references added yet.</p>
                    <p className="text-sm">Click "Add Reference" to get started.</p>
                  </div>
                )}
              </div>

              <div className="pt-8">
                <Button 
                  type="submit"
                  className="w-full h-14 text-lg rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium"
                >
                  Continue →
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WHVWorkExperience;