import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, X } from 'lucide-react';

// ----------------- Types -----------------
interface WorkExperience {
  id: string;
  startDate: string;
  endDate: string;
  industry: string;
  role: string;
  company: string;
  location: string;
}

// ----------------- Options -----------------
const INDUSTRIES: Record<string, string[]> = {
  "Agriculture & Farming": ["Fruit Picker", "Farm Hand", "Packer", "Other"],
  "Construction": ["Labourer", "Painter", "Scaffolder", "Other"],
  "Hospitality & Tourism": ["Waitstaff", "Bartender", "Chef", "Housekeeper", "Tour Guide", "Other"],
  "Healthcare": ["Aged Care Worker", "Disability Support", "Cleaner", "Other"],
  "Retail": ["Sales Assistant", "Store Worker", "Other"],
  "Manufacturing": ["Factory Worker", "Assembler", "Other"],
  "Mining": ["Truck Driver", "Driller", "Other"],
  "Transport & Logistics": ["Driver", "Warehouse Worker", "Other"],
  "Other": ["Other"],
};

const AUSTRALIAN_STATES = [
  'Australian Capital Territory', 'New South Wales', 'Northern Territory',
  'Queensland', 'South Australia', 'Tasmania', 'Victoria', 'Western Australia'
];

const LICENSES = [
  'Driver\'s License',
  'Forklift License',
  'White Card (Construction)',
  'RSA (Responsible Service of Alcohol)',
  'Food Safety Certificate',
  'First Aid Certificate',
  'Heavy Vehicle License',
  'Other'
];

// ----------------- Component -----------------
const WHVWorkExperience: React.FC = () => {
  const navigate = useNavigate();

  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [otherRole, setOtherRole] = useState('');
  const [preferredLocation, setPreferredLocation] = useState({ state: '', suburb: '' });
  const [licenses, setLicenses] = useState<string[]>([]);
  const [otherLicense, setOtherLicense] = useState('');
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);

  // ----------------- Handlers -----------------
  const toggleIndustry = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(selectedIndustries.filter(i => i !== industry));
      setSelectedRoles(selectedRoles.filter(r => !(INDUSTRIES[industry] || []).includes(r)));
    } else if (selectedIndustries.length < 3) {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };

  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
      if (role === "Other") setOtherRole('');
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const toggleLicense = (license: string) => {
    if (licenses.includes(license)) {
      setLicenses(licenses.filter(l => l !== license));
      if (license === "Other") setOtherLicense('');
    } else {
      setLicenses([...licenses, license]);
    }
  };

  const addWorkExperience = () => {
    setWorkExperiences([...workExperiences, {
      id: Date.now().toString(),
      startDate: '',
      endDate: '',
      industry: '',
      role: '',
      company: '',
      location: ''
    }]);
  };

  const updateWorkExperience = (id: string, field: keyof WorkExperience, value: string) => {
    setWorkExperiences(workExperiences.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeWorkExperience = (id: string) => {
    setWorkExperiences(workExperiences.filter(exp => exp.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Industries:", selectedIndustries);
    console.log("Roles:", selectedRoles, otherRole);
    console.log("Preferred Location:", preferredLocation);
    console.log("Licenses:", licenses, otherLicense);
    console.log("Work Experiences:", workExperiences);
    navigate('/whv/photo-upload');
  };

  // ----------------- Render -----------------
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <button onClick={() => navigate('/whv/current-address')} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-lg font-medium">Work Experience</h1>
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full">
              <span className="text-sm">5/6</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Work Preferences */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Work Preferences</h2>

                {/* Industries */}
                <div>
                  <Label>Select up to 3 Industries <span className="text-red-500">*</span></Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Object.keys(INDUSTRIES).map(ind => {
                      const selected = selectedIndustries.includes(ind);
                      const disabled = !selected && selectedIndustries.length >= 3;
                      return (
                        <button
                          key={ind}
                          type="button"
                          onClick={() => toggleIndustry(ind)}
                          className={`px-4 py-2 rounded-full text-sm font-medium border 
                            ${selected ? "bg-orange-500 text-white border-orange-500" : "bg-gray-100 text-gray-700 border-gray-300"} 
                            ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          {ind}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Roles */}
                {selectedIndustries.map(ind => (
                  <div key={ind}>
                    <Label>Roles in {ind}</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {INDUSTRIES[ind].map(role => {
                        const selected = selectedRoles.includes(role);
                        return (
                          <button
                            key={role}
                            type="button"
                            onClick={() => toggleRole(role)}
                            className={`px-3 py-1 rounded-full text-sm border
                              ${selected ? "bg-orange-500 text-white border-orange-500" : "bg-gray-100 text-gray-700 border-gray-300"}`}
                          >
                            {role}
                          </button>
                        );
                      })}
                    </div>
                    {selectedRoles.includes("Other") && (
                      <Input
                        value={otherRole}
                        onChange={(e) => setOtherRole(e.target.value)}
                        className="mt-2 h-10 bg-gray-100"
                        maxLength={50}
                      />
                    )}
                  </div>
                ))}
                <p className="text-xs text-gray-500">
                  💡 Some industries/roles may be required for visa extensions. Please confirm with Home Affairs.
                </p>

                {/* Preferred Location */}
                <div>
                  <Label>Preferred Location in Australia <span className="text-red-500">*</span></Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Select onValueChange={(v) => setPreferredLocation({ ...preferredLocation, state: v })}>
                      <SelectTrigger className="h-10 bg-gray-100">
                        <SelectValue placeholder="Choose State" />
                      </SelectTrigger>
                      <SelectContent>
                        {AUSTRALIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Input
                      value={preferredLocation.suburb}
                      onChange={(e) => setPreferredLocation({ ...preferredLocation, suburb: e.target.value })}
                      className="h-10 bg-gray-100"
                      placeholder="City/Suburb"
                    />
                  </div>
                </div>

                {/* Licenses */}
                <div>
                  <Label>Licenses/Tickets</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {LICENSES.map(lic => (
                      <label key={lic} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={licenses.includes(lic)}
                          onChange={() => toggleLicense(lic)}
                          className="accent-orange-500"
                        />
                        {lic}
                      </label>
                    ))}
                  </div>
                  {licenses.includes("Other") && (
                    <Input
                      value={otherLicense}
                      onChange={(e) => setOtherLicense(e.target.value)}
                      className="mt-2 h-10 bg-gray-100"
                      placeholder="Specify other license"
                    />
                  )}
                </div>
              </div>

              {/* Work Experience */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Work Experience</h2>
                  <Button
                    type="button"
                    onClick={addWorkExperience}
                    disabled={workExperiences.length >= 8}
                    className="bg-orange-500 text-white text-sm rounded-full px-3 py-1"
                  >
                    <Plus size={14} /> Add
                  </Button>
                </div>

                {workExperiences.map((exp, i) => (
                  <div key={exp.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Experience {i + 1}</h3>
                      <button type="button" onClick={() => removeWorkExperience(exp.id)} className="text-red-500">
                        <X size={16} />
                      </button>
                    </div>

                    <Select onValueChange={(v) => updateWorkExperience(exp.id, 'industry', v)}>
                      <SelectTrigger className="h-10 bg-gray-100">
                        <SelectValue placeholder="Select Industry *" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(INDUSTRIES).map(ind => (
                          <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Input
                      value={exp.role}
                      onChange={(e) => updateWorkExperience(exp.id, 'role', e.target.value)}
                      className="h-10 bg-gray-100"
                      placeholder="Role/Position *"
                    />
                    <Input
                      value={exp.company}
                      onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                      className="h-10 bg-gray-100"
                      placeholder="Company *"
                    />
                    <Input
                      value={exp.location}
                      onChange={(e) => updateWorkExperience(exp.id, 'location', e.target.value)}
                      className="h-10 bg-gray-100"
                      placeholder="Location *"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={exp.startDate}
                        onChange={(e) => updateWorkExperience(exp.id, 'startDate', e.target.value)}
                        className="h-10 bg-gray-100"
                        placeholder="Start Date (MM/YYYY)"
                      />
                      <Input
                        value={exp.endDate}
                        onChange={(e) => updateWorkExperience(exp.id, 'endDate', e.target.value)}
                        className="h-10 bg-gray-100"
                        placeholder="End Date (MM/YYYY)"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button type="submit" className="w-full h-12 bg-orange-500 text-white rounded-xl">
                Continue →
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WHVWorkExperience;


