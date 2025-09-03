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
  industry: string;
  role: string;
  company: string;
  location: string;
  otherRole?: string;
}

interface JobReference {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  role: string;
}

const industryRoles: Record<string, string[]> = {
  'Agriculture & Farming': ['Fruit Picker', 'Farm Hand', 'Packer', 'Other'],
  'Hospitality & Tourism': ['Chef', 'Bartender', 'Waitstaff', 'Housekeeper', 'Tour Guide', 'Other'],
  'Construction': ['Labourer', 'Painter', 'Scaffolder', 'Site Cleaner', 'Other'],
  'Healthcare': ['Nurse', 'Aged Care Worker', 'Disability Support', 'Cleaner', 'Other'],
  'Retail': ['Sales Assistant', 'Cashier', 'Stock Replenisher', 'Other'],
  'Transport & Logistics': ['Driver', 'Forklift Operator', 'Delivery Assistant', 'Other'],
  'Manufacturing': ['Factory Worker', 'Machine Operator', 'Assembler', 'Other'],
  'Mining': ['Driller', 'Truck Driver', 'Quarry Operator', 'Other'],
};

const australianStates = [
  'Australian Capital Territory',
  'New South Wales',
  'Northern Territory',
  'Queensland',
  'South Australia',
  'Tasmania',
  'Victoria',
  'Western Australia',
];

// Date validation helpers
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

const WHVWorkExperience: React.FC = () => {
  const navigate = useNavigate();

  const [tagline, setTagline] = useState('');
  const [preferredLocation, setPreferredLocation] = useState({ state: '', suburb: '' });
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [otherRole, setOtherRole] = useState('');

  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [jobReferences, setJobReferences] = useState<JobReference[]>([]);

  // Work Experience handlers
  const addWorkExperience = () => {
    if (workExperiences.length < 8) {
      setWorkExperiences([
        ...workExperiences,
        {
          id: Date.now().toString(),
          startDate: '',
          endDate: '',
          industry: '',
          role: '',
          company: '',
          location: '',
        },
      ]);
    }
  };

  const updateWorkExperience = (id: string, field: string, value: string) => {
    setWorkExperiences(
      workExperiences.map((exp) =>
        exp.id === id
          ? { ...exp, [field]: field.includes('Date') ? formatDateInput(value) : value }
          : exp
      )
    );
  };

  const removeWorkExperience = (id: string) => {
    setWorkExperiences(workExperiences.filter((exp) => exp.id !== id));
  };

  // Job Reference handlers
  const addJobReference = () => {
    if (jobReferences.length < 5) {
      setJobReferences([
        ...jobReferences,
        { id: Date.now().toString(), name: '', businessName: '', email: '', phone: '', role: '' },
      ]);
    }
  };

  const updateJobReference = (id: string, field: string, value: string) => {
    setJobReferences(
      jobReferences.map((ref) =>
        ref.id === id
          ? { ...ref, [field]: field === 'phone' ? value.replace(/\D/g, '') : value }
          : ref
      )
    );
  };

  const removeJobReference = (id: string) => {
    setJobReferences(jobReferences.filter((ref) => ref.id !== id));
  };

  // Preferences handlers
  const handleIndustryToggle = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(selectedIndustries.filter((i) => i !== industry));
      setSelectedRoles(selectedRoles.filter((role) => !industryRoles[industry]?.includes(role)));
    } else {
      if (selectedIndustries.length < 3) {
        setSelectedIndustries([...selectedIndustries, industry]);
      }
    }
  };

  const handleRoleToggle = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate tagline
    if (!tagline.trim()) {
      alert('Profile tagline is required');
      return;
    }

    // Validate preferred location
    if (!preferredLocation.state || !preferredLocation.suburb.trim()) {
      alert('Preferred location (state + suburb/city) is required');
      return;
    }

    // Validate industries & roles
    if (selectedIndustries.length === 0 || selectedRoles.length === 0) {
      alert('Please select at least one industry and one role');
      return;
    }

    // Validate dates
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

    console.log('Tagline:', tagline);
    console.log('Preferred Location:', preferredLocation);
    console.log('Selected Industries:', selectedIndustries);
    console.log('Selected Roles:', selectedRoles, otherRole);
    console.log('Work Experiences:', workExperiences);
    console.log('Job References:', jobReferences);

    navigate('/whv/photo-upload');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone Frame */}
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

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <form onSubmit={handleSubmit} className="space-y-8 pb-20">
              {/* Tagline */}
              <div className="space-y-2">
                <Label className="text-base font-medium text-gray-700">
                  Profile Tagline <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="h-12 bg-gray-100 border-0 text-gray-900"
                  maxLength={60}
                />
                <p className="text-xs text-gray-500">
                  This will appear under your profile photo (max 60 characters)
                </p>
              </div>

              {/* Preferred Location */}
              <div className="space-y-2">
                <Label className="text-base font-medium text-gray-700">
                  Preferred Working Location <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) => setPreferredLocation({ ...preferredLocation, state: value })}
                >
                  <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {australianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  value={preferredLocation.suburb}
                  onChange={(e) => setPreferredLocation({ ...preferredLocation, suburb: e.target.value })}
                  className="h-12 bg-gray-100 border-0 text-gray-900 mt-2"
                  placeholder="City / Suburb"
                />
              </div>

              {/* Work Preferences */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Work Preferences</h2>

                {/* Industries */}
                <div className="space-y-2">
                  <Label>
                    Select up to 3 Industries <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(industryRoles).map((industry) => (
                      <button
                        type="button"
                        key={industry}
                        onClick={() => handleIndustryToggle(industry)}
                        className={`px-3 py-2 rounded-lg text-sm border ${
                          selectedIndustries.includes(industry)
                            ? 'bg-orange-50 border-orange-500 text-orange-700'
                            : 'bg-white border-gray-300 text-gray-700'
                        }`}
                      >
                        {industry}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    You can select up to 3 industries you’re interested in.
                  </p>
                </div>

                {/* Roles */}
                {selectedIndustries.length > 0 && (
                  <div className="space-y-2">
                    <Label>
                      Select Roles <span className="text-red-500">*</span>
                    </Label>
                    <div className="space-y-3">
                      {selectedIndustries.map((industry) => (
                        <div key={industry}>
                          <p className="text-sm font-medium text-gray-700">{industry}</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {industryRoles[industry].map((role) => (
                              <button
                                type="button"
                                key={role}
                                onClick={() => handleRoleToggle(role)}
                                className={`px-3 py-1 rounded-full text-sm border ${
                                  selectedRoles.includes(role)
                                    ? 'bg-orange-500 text-white border-orange-600'
                                    : 'bg-white border-gray-300 text-gray-700'
                                }`}
                              >
                                {role}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {selectedRoles.includes('Other') && (
                      <div className="mt-2">
                        <Input
                          type="text"
                          value={otherRole}
                          onChange={(e) => setOtherRole(e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900"
                          placeholder="Please specify other role"
                        />
                        <p className="text-xs text-red-500 mt-1">
                          Roles under “Other” may not count toward visa extension eligibility.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Work Experience Details */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
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
                  <div
                    key={experience.id}
                    className="border border-gray-200 rounded-lg p-4 space-y-4"
                  >
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

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Start Date <span className="text-red-500">*</span></Label>
                        <Input
                          type="text"
                          value={experience.startDate}
                          onChange={(e) =>
                            updateWorkExperience(experience.id, 'startDate', e.target.value)
                          }
                          className="h-10 bg-gray-100 border-0 text-sm"
                          maxLength={10}
                        />
                      </div>
                      <div>
                        <Label>End Date</Label>
                        <Input
                          type="text"
                          value={experience.endDate}
                          onChange={(e) =>
                            updateWorkExperience(experience.id, 'endDate', e.target.value)
                          }
                          className="h-10 bg-gray-100 border-0 text-sm"
                          maxLength={10}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Industry <span className="text-red-500">*</span></Label>
                      <Select
                        onValueChange={(value) =>
                          updateWorkExperience(experience.id, 'industry', value)
                        }
                      >
                        <SelectTrigger className="h-10 bg-gray-100 border-0 text-sm">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(industryRoles).map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Role <span className="text-red-500">*</span></Label>
                      <Input
                        type="text"
                        value={experience.role}
                        onChange={(e) =>
                          updateWorkExperience(experience.id, 'role', e.target.value)
                        }
                        className="h-10 bg-gray-100 border-0 text-sm"
                      />
                    </div>

                    <div>
                      <Label>Company</Label>
                      <Input
                        type="text"
                        value={experience.company}
                        onChange={(e) =>
                          updateWorkExperience(experience.id, 'company', e.target.value)
                        }
                        className="h-10 bg-gray-100 border-0 text-sm"
                      />
                    </div>

                    <div>
                      <Label>Location</Label>
                      <Input
                        type="text"
                        value={experience.location}
                        onChange={(e) =>
                          updateWorkExperience(experience.id, 'location', e.target.value)
                        }
                        className="h-10 bg-gray-100 border-0 text-sm"
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

                {jobReferences.map((ref, index) => (
                  <div
                    key={ref.id}
                    className="border border-gray-200 rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Reference {index + 1}</h3>
                      <Button
                        type="button"
                        onClick={() => removeJobReference(ref.id)}
                        variant="ghost"
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" /> Remove
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        type="text"
                        value={ref.name}
                        onChange={(e) => updateJobReference(ref.id, 'name', e.target.value)}
                        className="h-10 bg-gray-100 border-0 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Business Name</Label>
                      <Input
                        type="text"
                        value={ref.businessName}
                        onChange={(e) =>
                          updateJobReference(ref.id, 'businessName', e.target.value)
                        }
                        className="h-10 bg-gray-100 border-0 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={ref.email}
                        onChange={(e) => updateJobReference(ref.id, 'email', e.target.value)}
                        className="h-10 bg-gray-100 border-0 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        type="text"
                        value={ref.phone}
                        onChange={(e) => updateJobReference(ref.id, 'phone', e.target.value)}
                        className="h-10 bg-gray-100 border-0 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Input
                        type="text"
                        value={ref.role}
                        onChange={(e) => updateJobReference(ref.id, 'role', e.target.value)}
                        className="h-10 bg-gray-100 border-0 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit */}
              <div className="pt-8 space-y-4">
                <Button
                  type="submit"
                  className="w-full h-14 text-lg rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium"
                >
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
