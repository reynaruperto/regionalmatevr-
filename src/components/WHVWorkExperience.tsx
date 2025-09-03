import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, X } from 'lucide-react';

// -------------------- Types --------------------
interface WorkExperience {
  id: string;
  startDate: string;
  endDate: string;
  industry: string;
  role: string;
  otherRole: string;
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

// -------------------- Industry → Roles --------------------
const industryRoles: Record<string, string[]> = {
  "Agriculture & Farming": ["Fruit Picker", "Farm Hand", "Packer", "Other"],
  "Hospitality & Tourism": ["Bartender", "Waitstaff", "Chef / Cook", "Housekeeper", "Tour Guide", "Other"],
  "Construction": ["Construction Labourer", "Painter", "Scaffolder", "Cleaner", "Other"],
  "Healthcare": ["Aged Care Worker", "Disability Support", "Cleaner", "Nurse", "Other"],
  "Retail": ["Sales Assistant", "Cashier", "Storeperson", "Other"],
  "Manufacturing": ["Factory Worker", "Machine Operator", "Assembler", "Other"],
  "Mining": ["Truck Driver", "Driller", "Quarry Operator", "Other"],
  "Education": ["Childcare Worker", "Teacher Assistant", "Other"],
  "Transport & Logistics": ["Driver", "Forklift Operator", "Warehouse Worker", "Other"],
};

const allIndustries = Object.keys(industryRoles);

// -------------------- Component --------------------
const WHVWorkExperience: React.FC = () => {
  const navigate = useNavigate();

  // Work Preferences
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [otherRole, setOtherRole] = useState("");

  // Work Experience entries
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);

  // Job References
  const [jobReferences, setJobReferences] = useState<JobReference[]>([]);

  // -------------------- Handlers --------------------
  const toggleIndustry = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(selectedIndustries.filter(i => i !== industry));
      setSelectedRoles(selectedRoles.filter(r => !industryRoles[industry].includes(r)));
    } else if (selectedIndustries.length < 3) {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };

  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const addWorkExperience = () => {
    if (workExperiences.length < 8) {
      setWorkExperiences([...workExperiences, {
        id: Date.now().toString(),
        startDate: '',
        endDate: '',
        industry: '',
        role: '',
        otherRole: '',
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
    setJobReferences(jobReferences.map(ref =>
      ref.id === id ? { ...ref, [field]: value } : ref
    ));
  };

  const removeJobReference = (id: string) => {
    setJobReferences(jobReferences.filter(ref => ref.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Work Preferences:", { selectedIndustries, selectedRoles, otherRole });
    console.log("Work Experiences:", workExperiences);
    console.log("Job References:", jobReferences);
    navigate('/whv/photo-upload');
  };

  // -------------------- UI --------------------
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          
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
              
              {/* Work Preferences */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Work Preferences</h2>
                
                {/* Industry multi-select */}
                <div className="space-y-2">
                  <Label className="text-base font-medium text-gray-700">Select up to 3 Industries</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto bg-gray-100 rounded-lg p-3">
                    {allIndustries.map(ind => (
                      <div key={ind} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedIndustries.includes(ind)}
                          onChange={() => toggleIndustry(ind)}
                          disabled={!selectedIndustries.includes(ind) && selectedIndustries.length >= 3}
                          className="w-4 h-4 text-orange-500 bg-white border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">{ind}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Roles */}
                {selectedIndustries.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">Preferred Roles</Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto bg-gray-100 rounded-lg p-3">
                      {selectedIndustries.flatMap(ind => industryRoles[ind]).map(role => (
                        <div key={role} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedRoles.includes(role)}
                            onChange={() => toggleRole(role)}
                            className="w-4 h-4 text-orange-500 bg-white border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">{role}</span>
                        </div>
                      ))}
                    </div>
                    {selectedRoles.includes("Other") && (
                      <Input
                        type="text"
                        value={otherRole}
                        onChange={(e) => setOtherRole(e.target.value)}
                        className="h-10 bg-gray-100 border-0 text-gray-900 mt-2"
                      />
                    )}
                    <p className="text-xs text-red-500 mt-1">
                      ⚠️ Only specific industries/roles count toward WHV 2nd & 3rd year extensions. Please check Home Affairs for eligibility.
                    </p>
                  </div>
                )}
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
                        <X className="w-4 h-4" />
                        Remove
                      </Button>
                    </div>

                    {/* Industry */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Industry</Label>
                      <Select
                        onValueChange={(value) => updateWorkExperience(experience.id, "industry", value)}
                        value={experience.industry}
                      >
                        <SelectTrigger className="h-10 bg-gray-100 border-0 text-gray-900 text-sm">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {allIndustries.map(ind => (
                            <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Role */}
                    {experience.industry && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Role</Label>
                        <Select
                          onValueChange={(value) => updateWorkExperience(experience.id, "role", value)}
                          value={experience.role}
                        >
                          <SelectTrigger className="h-10 bg-gray-100 border-0 text-gray-900 text-sm">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {industryRoles[experience.industry].map(role => (
                              <SelectItem key={role} value={role}>{role}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {experience.role === "Other" && (
                          <Input
                            type="text"
                            value={experience.otherRole}
                            onChange={(e) => updateWorkExperience(experience.id, "otherRole", e.target.value)}
                            className="h-10 bg-gray-100 border-0 text-gray-900 text-sm mt-2"
                          />
                        )}
                      </div>
                    )}

                    {/* Company */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Company</Label>
                      <Input
                        type="text"
                        value={experience.company}
                        onChange={(e) => updateWorkExperience(experience.id, 'company', e.target.value)}
                        className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                      />
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Location</Label>
                      <Input
                        type="text"
                        value={experience.location}
                        onChange={(e) => updateWorkExperience(experience.id, 'location', e.target.value)}
                        className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                      />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Start Date (DD/MM/YYYY)</Label>
                        <Input
                          type="text"
                          value={experience.startDate}
                          onChange={(e) => updateWorkExperience(experience.id, 'startDate', e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                          maxLength={10}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">End Date (DD/MM/YYYY)</Label>
                        <Input
                          type="text"
                          value={experience.endDate}
                          onChange={(e) => updateWorkExperience(experience.id, 'endDate', e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                          maxLength={10}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Job References (unchanged) */}
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
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Business Name</Label>
                        <Input
                          type="text"
                          value={reference.businessName}
                          onChange={(e) => updateJobReference(reference.id, 'businessName', e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Email</Label>
                        <Input
                          type="email"
                          value={reference.email}
                          onChange={(e) => updateJobReference(reference.id, 'email', e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                        <Input
                          type="text"
                          value={reference.phone}
                          onChange={(e) => updateJobReference(reference.id, 'phone', e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Role</Label>
                        <Input
                          type="text"
                          value={reference.role}
                          onChange={(e) => updateJobReference(reference.id, 'role', e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                        />
                      </div>
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
