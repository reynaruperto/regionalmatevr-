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

const industryRoles: Record<string, string[]> = {
  "Agriculture & Farming": ["Fruit Picker", "Packer", "Farm Hand", "Dairy Worker", "Other"],
  "Construction": ["Labourer", "Scaffolder", "Painter", "Other"],
  "Hospitality & Tourism": ["Chef", "Bartender", "Waitstaff", "Housekeeper", "Cleaner", "Tour Guide", "Other"],
  "Healthcare": ["Nurse", "Aged Care Worker", "Disability Support", "Childcare Worker", "Other"],
  "Retail": ["Sales Assistant", "Storeperson", "Other"],
  "Manufacturing": ["Factory Worker", "Machine Operator", "Other"],
  "Mining": ["Driller", "Truck Driver", "Other"],
  "Education": ["Tutor", "Teacher Aide", "Other"],
  "Transport & Logistics": ["Driver", "Forklift Operator", "Other"],
};

const licenseOptions = [
  'Driver\'s License',
  'Forklift License',
  'White Card (Construction)',
  'RSA (Responsible Service of Alcohol)',
  'RCG (Responsible Conduct of Gambling)',
  'Food Safety Certificate',
  'First Aid Certificate',
  'Heavy Vehicle License',
  'Other'
];

const WHVWorkExperience: React.FC = () => {
  const navigate = useNavigate();
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [jobReferences, setJobReferences] = useState<JobReference[]>([]);
  const [workPreferences, setWorkPreferences] = useState({
    industries: [] as string[],
    roles: [] as string[],
    preferredLocation: { state: '', suburb: '' },
    licenses: [] as string[],
    otherLicense: ''
  });

  const [aboutYourself, setAboutYourself] = useState({ tagline: '' });

  const australianStates = [
    'Australian Capital Territory',
    'New South Wales',
    'Northern Territory',
    'Queensland',
    'South Australia',
    'Tasmania',
    'Victoria',
    'Western Australia'
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

  const handleIndustryToggle = (industry: string) => {
    setWorkPreferences(prev => {
      let newIndustries = [...prev.industries];
      if (newIndustries.includes(industry)) {
        newIndustries = newIndustries.filter(i => i !== industry);
      } else if (newIndustries.length < 3) {
        newIndustries.push(industry);
      }
      return { ...prev, industries: newIndustries, roles: [] };
    });
  };

  const handleRoleToggle = (role: string) => {
    setWorkPreferences(prev => {
      let newRoles = [...prev.roles];
      if (newRoles.includes(role)) {
        newRoles = newRoles.filter(r => r !== role);
      } else {
        newRoles.push(role);
      }
      return { ...prev, roles: newRoles };
    });
  };

  const handleLicenseToggle = (license: string) => {
    setWorkPreferences(prev => {
      let newLicenses = [...prev.licenses];
      if (newLicenses.includes(license)) {
        newLicenses = newLicenses.filter(l => l !== license);
      } else {
        newLicenses.push(license);
      }
      return { ...prev, licenses: newLicenses };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Work Preferences (for matching algorithm):', workPreferences.industries);
    console.log('Roles (extra refinement only):', workPreferences.roles);
    console.log('Preferred Location:', workPreferences.preferredLocation);
    console.log('Licenses:', workPreferences.licenses);
    console.log('Other License:', workPreferences.otherLicense);
    console.log('Work Experiences:', workExperiences);
    console.log('Job References:', jobReferences);
    navigate('/whv/photo-upload');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
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

          <div className="flex-1 overflow-y-auto px-4 py-6">
            <form onSubmit={handleSubmit} className="space-y-8 pb-20">
              
              {/* Profile Tagline */}
              <div className="space-y-2">
                <Label className="text-base font-medium text-gray-700">Profile Tagline</Label>
                <Input
                  type="text"
                  value={aboutYourself.tagline}
                  onChange={(e) => setAboutYourself({ tagline: e.target.value })}
                  className="h-12 bg-gray-100 border-0 text-gray-900"
                  maxLength={60}
                />
                <p className="text-xs text-gray-500">This will appear under your profile photo (max 60 characters)</p>
              </div>

              {/* Industry Selection */}
              <div className="space-y-2">
                <Label className="text-base font-medium text-gray-700">Select up to 3 industries</Label>
                <div className="grid grid-cols-1 gap-2">
                  {Object.keys(industryRoles).map(industry => (
                    <div key={industry} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={workPreferences.industries.includes(industry)}
                        onChange={() => handleIndustryToggle(industry)}
                      />
                      <span>{industry}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Roles Selection */}
              {workPreferences.industries.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-base font-medium text-gray-700">Select preferred roles</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {workPreferences.industries.flatMap(ind => industryRoles[ind]).map(role => (
                      <div key={role} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={workPreferences.roles.includes(role)}
                          onChange={() => handleRoleToggle(role)}
                        />
                        <span>{role}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-red-500 mt-1">
                    ⚠️ Not all roles in your chosen industry may count toward 2nd/3rd year visa eligibility. 
                    Please check Home Affairs for official criteria.
                  </p>
                </div>
              )}

              {/* Preferred Location */}
              <div className="space-y-2">
                <Label className="text-base font-medium text-gray-700">Preferred Working Location</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Select onValueChange={(value) => setWorkPreferences(prev => ({
                    ...prev, preferredLocation: { ...prev.preferredLocation, state: value }
                  }))}>
                    <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {australianStates.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="text"
                    value={workPreferences.preferredLocation.suburb}
                    onChange={(e) => setWorkPreferences(prev => ({
                      ...prev, preferredLocation: { ...prev.preferredLocation, suburb: e.target.value }
                    }))}
                    className="h-12 bg-gray-100 border-0 text-gray-900"
                  />
                </div>
              </div>

              {/* Licenses/Tickets */}
              <div className="space-y-2">
                <Label className="text-base font-medium text-gray-700">Licenses/Tickets</Label>
                <div className="grid grid-cols-1 gap-2">
                  {licenseOptions.map(license => (
                    <div key={license} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={workPreferences.licenses.includes(license)}
                        onChange={() => handleLicenseToggle(license)}
                      />
                      <span>{license}</span>
                    </div>
                  ))}
                </div>
                {workPreferences.licenses.includes('Other') && (
                  <Input
                    type="text"
                    value={workPreferences.otherLicense}
                    onChange={(e) => setWorkPreferences(prev => ({ ...prev, otherLicense: e.target.value }))}
                    className="h-12 bg-gray-100 border-0 text-gray-900 mt-2"
                  />
                )}
              </div>

              {/* Work Experiences */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Work Experience Details</h2>
                  <Button type="button" onClick={addWorkExperience} disabled={workExperiences.length >= 8}>
                    <Plus className="w-4 h-4 mr-1" /> Add Experience
                  </Button>
                </div>
                {workExperiences.map((exp, index) => (
                  <div key={exp.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">Experience {index + 1}</h3>
                      <Button type="button" onClick={() => removeWorkExperience(exp.id)} variant="ghost">
                        <X className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                    <Input value={exp.startDate} onChange={(e) => updateWorkExperience(exp.id, 'startDate', e.target.value)} placeholder="Start Date" />
                    <Input value={exp.endDate} onChange={(e) => updateWorkExperience(exp.id, 'endDate', e.target.value)} placeholder="End Date" />
                    <Input value={exp.position} onChange={(e) => updateWorkExperience(exp.id, 'position', e.target.value)} placeholder="Position" />
                    <Input value={exp.company} onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)} placeholder="Company" />
                    <Input value={exp.location} onChange={(e) => updateWorkExperience(exp.id, 'location', e.target.value)} placeholder="Location" />
                  </div>
                ))}
              </div>

              {/* Job References */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Job References</h2>
                  <Button type="button" onClick={addJobReference} disabled={jobReferences.length >= 5}>
                    <Plus className="w-4 h-4 mr-1" /> Add Reference
                  </Button>
                </div>
                {jobReferences.map((ref, index) => (
                  <div key={ref.id} className="border border-gray-200 rounded-lg p-4 space-y-2">
                    <Input value={ref.name} onChange={(e) => updateJobReference(ref.id, 'name', e.target.value)} placeholder="Name" />
                    <Input value={ref.businessName} onChange={(e) => updateJobReference(ref.id, 'businessName', e.target.value)} placeholder="Business Name" />
                    <Input value={ref.email} onChange={(e) => updateJobReference(ref.id, 'email', e.target.value)} placeholder="Email" />
                    <Input value={ref.phone} onChange={(e) => updateJobReference(ref.id, 'phone', e.target.value)} placeholder="Phone" />
                    <Input value={ref.role} onChange={(e) => updateJobReference(ref.id, 'role', e.target.value)} placeholder="Role" />
                  </div>
                ))}
              </div>

              <div className="pt-8 space-y-4">
                <Button type="submit" className="w-full h-14 text-lg rounded-xl bg-orange-500 text-white">
                  Continue →
                </Button>
                <Button type="button" onClick={() => navigate('/whv/photo-upload')} variant="ghost" className="w-full h-12 text-gray-600">
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

