import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    targetRole: '',
    otherTargetRole: '',
    preferredIndustry: '',
    preferredLocationState: '',
    preferredLocationCity: '',
    licenses: [] as string[],
    otherLicense: ''
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

  // WHV Target Roles
  const targetRoles = [
    'Fruit Picker / Packer',
    'Farm Hand',
    'Bartender',
    'Waitstaff',
    'Chef / Cook',
    'Construction Labourer',
    'Cleaner',
    'Housekeeper',
    'Tour Guide',
    'Other'
  ];

  const licenseOptions = [
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
      exp.id === id ? { ...exp, [field]: value } : exp
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
    if (field === 'licenses') {
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

          {/* Header */}
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
                <span className="text-sm font-medium text-gray-600">5/6</span>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <form onSubmit={handleSubmit} className="space-y-8 pb-20">

              {/* About Yourself */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Tell us about yourself</h2>
                <div className="space-y-2">
                  <Label className="text-base font-medium text-gray-700">
                    Profile Tagline <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    value={aboutYourself.tagline}
                    onChange={(e) => handleAboutYourselfChange('tagline', e.target.value)}
                    className="h-12 bg-gray-100 border-0 text-gray-900"
                    maxLength={60}
                  />
                  <p className="text-xs text-gray-500">Shown under your profile photo (max 60 characters)</p>
                </div>
              </div>

              {/* Work Preferences */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Work Preferences</h2>

                {/* Target Role */}
                <div className="space-y-2">
                  <Label className="text-base font-medium text-gray-700">
                    Target Role <span className="text-red-500">*</span>
                  </Label>
                  <Select onValueChange={(value) => handleWorkPreferenceChange('targetRole', value)}>
                    <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                      <SelectValue placeholder="Select your preferred role" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-50">
                      {targetRoles.map((role) => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {workPreferences.targetRole === 'Other' && (
                    <div className="mt-2 space-y-1">
                      <Input
                        type="text"
                        value={workPreferences.otherTargetRole}
                        onChange={(e) => handleWorkPreferenceChange('otherTargetRole', e.target.value)}
                        className="h-12 bg-gray-100 border-0 text-gray-900"
                        maxLength={50}
                      />
                      <p className="text-xs text-gray-500 text-orange-600">
                        ⚠️ Custom roles may not count towards WHV 2nd & 3rd year extensions unless approved by Home Affairs.
                      </p>
                    </div>
                  )}
                </div>

                {/* Industry Interested In */}
                <div className="space-y-2">
                  <Label className="text-base font-medium text-gray-700">
                    Industry <span className="text-red-500">*</span>
                  </Label>
                  <Select onValueChange={(value) => handleWorkPreferenceChange('preferredIndustry', value)}>
                    <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-50">
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Preferred Working Location */}
                <div className="space-y-2">
                  <Label className="text-base font-medium text-gray-700">
                    Preferred Working Location <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="text"
                      value={workPreferences.preferredLocationState}
                      onChange={(e) => handleWorkPreferenceChange('preferredLocationState', e.target.value)}
                      className="h-12 bg-gray-100 border-0 text-gray-900"
                      placeholder="State"
                    />
                    <Input
                      type="text"
                      value={workPreferences.preferredLocationCity}
                      onChange={(e) => handleWorkPreferenceChange('preferredLocationCity', e.target.value)}
                      className="h-12 bg-gray-100 border-0 text-gray-900"
                      placeholder="City/Suburb"
                    />
                  </div>
                </div>

                {/* Licenses/Tickets */}
                <div className="space-y-2">
                  <Label className="text-base font-medium text-gray-700">
                    Licenses/Tickets
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
                        <Label htmlFor={`license-${license}`} className="text-sm text-gray-700 cursor-pointer flex-1">
                          {license}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {workPreferences.licenses.includes('Other') && (
                    <Input
                      type="text"
                      value={workPreferences.otherLicense}
                      onChange={(e) => handleWorkPreferenceChange('otherLicense', e.target.value)}
                      className="h-10 bg-gray-100 border-0 text-gray-900 mt-2"
                      maxLength={50}
                    />
                  )}
                </div>
              </div>

              {/* Work Experience Details */}
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
                        <X className="w-4 h-4" /> Remove
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Start Date</Label>
                      <Input
                        type="text"
                        value={experience.startDate}
                        onChange={(e) => updateWorkExperience(experience.id, 'startDate', e.target.value)}
                        className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
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
                        maxLength={10}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Position</Label>
                      <Input
                        type="text"
                        value={experience.position}
                        onChange={(e) => updateWorkExperience(experience.id, 'position', e.target.value)}
                        className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
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
                        maxLength={50}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Job References */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Job References</h2>
                  <Button
                    type="button"
                    onClick={addJobReference}
                    disabled={jobReferences.length >= 5}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Reference
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
                        <X className="w-4 h-4" /> Remove
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Name</Label>
                      <Input
                        type="text"
                        value={reference.name}
                        onChange={(e) => updateJobReference(reference.id, 'name', e.target.value)}
                        className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
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
                        maxLength={100}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Phone</Label>
                      <Input
                        type="text"
                        value={reference.phone}
                        onChange={(e) => updateJobReference(reference.id, 'phone', e.target.value)}
                        className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
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
                        maxLength={50}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit */}
              <div className="pt-8 space-y-4">
                <Button type="submit" className="w-full h-14 text-lg rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium">
                  Continue →
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate('/whv/photo-upload')}
                  variant="ghost"
                  className="w-full h-12 text-base text-gray-600 hover:text-gray-800"
                >
                  Skip for now
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
