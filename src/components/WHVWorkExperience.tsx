import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus, X } from "lucide-react";

// Work Experience entry
interface WorkExperience {
  id: string;
  startDate: string;
  endDate: string;
  industry: string;
  role: string;
  company: string;
  location: string;
}

// Job Reference entry
interface JobReference {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  role: string;
}

// Industry + roles mapping
const industryRoles: Record<string, string[]> = {
  "Agriculture & Farming": ["Fruit Picker", "Farm Hand", "Packer", "Other"],
  Construction: ["Labourer", "Painter", "Scaffolder", "Other"],
  "Hospitality & Tourism": [
    "Chef",
    "Bartender",
    "Waitstaff",
    "Housekeeper",
    "Tour Guide",
    "Other",
  ],
  Healthcare: ["Nurse", "Aged Care Worker", "Disability Support", "Other"],
  Retail: ["Sales Assistant", "Store Worker", "Other"],
  Manufacturing: ["Factory Worker", "Assembler", "Other"],
  Mining: ["Driller", "Truck Driver", "Quarry Operator", "Other"],
  Education: ["Tutor", "Childcare Assistant", "Other"],
  "Transport & Logistics": ["Driver", "Forklift Operator", "Delivery Worker", "Other"],
};

const industries = Object.keys(industryRoles);

const licenseOptions = [
  "N/A",
  "Driver's License",
  "Forklift License",
  "Working at Heights",
  "White Card (Construction)",
  "RSA (Responsible Service of Alcohol)",
  "RCG (Responsible Conduct of Gambling)",
  "Food Safety Certificate",
  "First Aid Certificate",
  "Heavy Vehicle License",
  "Crane License",
  "Electrical License",
  "Other",
];

const australianStates = [
  "Australian Capital Territory",
  "New South Wales",
  "Northern Territory",
  "Queensland",
  "South Australia",
  "Tasmania",
  "Victoria",
  "Western Australia",
];

const WHVWorkExperience: React.FC = () => {
  const navigate = useNavigate();

  const [aboutYourself, setAboutYourself] = useState({ tagline: "" });
  const [workPreferences, setWorkPreferences] = useState<{
    industries: string[];
    roles: Record<string, string[]>;
    otherRoles: Record<string, string>;
    location: { state: string; suburb: string };
    licenses: string[];
    otherLicense: string;
  }>({
    industries: [],
    roles: {},
    otherRoles: {},
    location: { state: "", suburb: "" },
    licenses: [],
    otherLicense: "",
  });

  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [jobReferences, setJobReferences] = useState<JobReference[]>([]);

  // Handlers
  const handleIndustryToggle = (industry: string) => {
    if (workPreferences.industries.includes(industry)) {
      const newIndustries = workPreferences.industries.filter((i) => i !== industry);
      const { [industry]: _, ...newRoles } = workPreferences.roles;
      const { [industry]: __, ...newOther } = workPreferences.otherRoles;
      setWorkPreferences({
        ...workPreferences,
        industries: newIndustries,
        roles: newRoles,
        otherRoles: newOther,
      });
    } else if (workPreferences.industries.length < 3) {
      setWorkPreferences({
        ...workPreferences,
        industries: [...workPreferences.industries, industry],
      });
    }
  };

  const handleRoleToggle = (industry: string, role: string) => {
    const currentRoles = workPreferences.roles[industry] || [];
    const newRoles = currentRoles.includes(role)
      ? currentRoles.filter((r) => r !== role)
      : [...currentRoles, role];
    setWorkPreferences({
      ...workPreferences,
      roles: { ...workPreferences.roles, [industry]: newRoles },
    });
  };

  const handleOtherRoleChange = (industry: string, value: string) => {
    setWorkPreferences({
      ...workPreferences,
      otherRoles: { ...workPreferences.otherRoles, [industry]: value },
    });
  };

  const toggleLicense = (license: string) => {
    if (workPreferences.licenses.includes(license)) {
      setWorkPreferences({
        ...workPreferences,
        licenses: workPreferences.licenses.filter((l) => l !== license),
      });
    } else {
      setWorkPreferences({
        ...workPreferences,
        licenses: [...workPreferences.licenses, license],
      });
    }
  };

  // Work Experience Handlers
  const addWorkExperience = () => {
    if (workExperiences.length < 8) {
      setWorkExperiences([
        ...workExperiences,
        {
          id: Date.now().toString(),
          startDate: "",
          endDate: "",
          industry: "",
          role: "",
          company: "",
          location: "",
        },
      ]);
    }
  };

  const updateWorkExperience = (id: string, field: string, value: string) => {
    setWorkExperiences(
      workExperiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeWorkExperience = (id: string) => {
    setWorkExperiences(workExperiences.filter((exp) => exp.id !== id));
  };

  // Job Reference Handlers
  const addJobReference = () => {
    if (jobReferences.length < 5) {
      setJobReferences([
        ...jobReferences,
        {
          id: Date.now().toString(),
          name: "",
          businessName: "",
          email: "",
          phone: "",
          role: "",
        },
      ]);
    }
  };

  const updateJobReference = (id: string, field: string, value: string) => {
    let processedValue = value;
    if (field === "phone") processedValue = value.replace(/\D/g, "");
    setJobReferences(
      jobReferences.map((ref) =>
        ref.id === id ? { ...ref, [field]: processedValue } : ref
      )
    );
  };

  const removeJobReference = (id: string) => {
    setJobReferences(jobReferences.filter((ref) => ref.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tagline:", aboutYourself);
    console.log("Work Preferences:", workPreferences);
    console.log("Work Experiences:", workExperiences);
    console.log("Job References:", jobReferences);
    navigate("/whv/photo-upload");
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
                onClick={() => navigate("/whv/current-address")}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h1 className="text-lg font-medium text-gray-900">
                Work Experience
              </h1>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <span className="text-sm font-medium text-gray-600">5/6</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <form onSubmit={handleSubmit} className="space-y-8 pb-20">
              {/* About Yourself */}
              <div className="space-y-2">
                <Label className="text-base font-medium text-gray-700">
                  Profile Tagline <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  value={aboutYourself.tagline}
                  onChange={(e) =>
                    setAboutYourself({ tagline: e.target.value })
                  }
                  className="h-12 bg-gray-100 border-0 text-gray-900"
                  maxLength={60}
                />
                <p className="text-xs text-gray-500">
                  This will appear under your profile photo (max 60 characters)
                </p>
              </div>

              {/* Work Preferences */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Work Preferences
                </h2>

                {/* Industry Selection */}
                <div className="space-y-2">
                  <Label className="text-base font-medium text-gray-700">
                    Select up to 3 Industries{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {industries.map((industry) => {
                      const selected = workPreferences.industries.includes(
                        industry
                      );
                      const disabled =
                        workPreferences.industries.length >= 3 && !selected;

                      return (
                        <button
                          key={industry}
                          type="button"
                          onClick={() => handleIndustryToggle(industry)}
                          disabled={disabled}
                          className={`p-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                            selected
                              ? "border-orange-500 bg-orange-50 text-gray-900"
                              : disabled
                              ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "border-gray-200 bg-white text-gray-700 hover:border-orange-300"
                          }`}
                        >
                          {industry}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Roles per Industry */}
                <div className="space-y-4">
                  {workPreferences.industries.map((industry) => (
                    <div
                      key={industry}
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                    >
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        Roles in {industry}
                      </h3>
                      <div className="space-y-2">
                        {industryRoles[industry].map((role) => (
                          <div key={role} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`${industry}-${role}`}
                              checked={
                                workPreferences.roles[industry]?.includes(
                                  role
                                ) || false
                              }
                              onChange={() => handleRoleToggle(industry, role)}
                              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                            />
                            <Label
                              htmlFor={`${industry}-${role}`}
                              className="text-sm text-gray-700 cursor-pointer"
                            >
                              {role}
                            </Label>
                          </div>
                        ))}
                      </div>

                      {/* "Other" text box if selected */}
                      {workPreferences.roles[industry]?.includes("Other") && (
                        <div className="mt-3">
                          <Input
                            type="text"
                            value={workPreferences.otherRoles[industry] || ""}
                            onChange={(e) =>
                              handleOtherRoleChange(industry, e.target.value)
                            }
                            className="h-10 bg-white border-gray-300 rounded-xl text-sm"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Note: Some roles may not qualify for visa
                            extensions.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Disclaimer */}
                {workPreferences.industries.length > 0 && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                    ⚠️ Disclaimer: Some roles are not eligible for visa
                    extensions. Please check with the Department of Home
                    Affairs.
                  </div>
                )}

                {/* Preferred Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-base font-medium text-gray-700">
                      State <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setWorkPreferences({
                          ...workPreferences,
                          location: { ...workPreferences.location, state: value },
                        })
                      }
                    >
                      <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        {australianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-base font-medium text-gray-700">
                      Suburb/City <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      value={workPreferences.location.suburb}
                      onChange={(e) =>
                        setWorkPreferences({
                          ...workPreferences,
                          location: {
                            ...workPreferences.location,
                            suburb: e.target.value,
                          },
                        })
                      }
                      className="h-12 bg-gray-100 border-0 text-gray-900"
                    />
                  </div>
                </div>

                {/* Licenses */}
                <div>
                  <Label className="text-base font-medium text-gray-700">
                    Licenses/Tickets (select all that apply)
                  </Label>
                  <div className="grid grid-cols-1 gap-2 bg-gray-100 rounded-lg p-3 max-h-40 overflow-y-auto">
                    {licenseOptions.map((license) => (
                      <div key={license} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={workPreferences.licenses.includes(license)}
                          onChange={() => toggleLicense(license)}
                          className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">{license}</span>
                      </div>
                    ))}
                  </div>
                  {workPreferences.licenses.includes("Other") && (
                    <Input
                      type="text"
                      value={workPreferences.otherLicense}
                      onChange={(e) =>
                        setWorkPreferences({
                          ...workPreferences,
                          otherLicense: e.target.value,
                        })
                      }
                      className="mt-2 h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                    />
                  )}
                </div>
              </div>

              {/* Work Experience */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Work Experience
                  </h2>
                  <Button
                    type="button"
                    onClick={addWorkExperience}
                    disabled={workExperiences.length >= 8}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>

                {workExperiences.map((exp, idx) => (
                  <div
                    key={exp.id}
                    className="border border-gray-200 rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        Experience {idx + 1}
                      </h3>
                      <Button
                        type="button"
                        onClick={() => removeWorkExperience(exp.id)}
                        variant="ghost"
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" /> Remove
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Start Date
                        </Label>
                        <Input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) =>
                            updateWorkExperience(exp.id, "startDate", e.target.value)
                          }
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                          maxLength={10}
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          End Date
                        </Label>
                        <Input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) =>
                            updateWorkExperience(exp.id, "endDate", e.target.value)
                          }
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                          maxLength={10}
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Industry
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          updateWorkExperience(exp.id, "industry", value)
                        }
                      >
                        <SelectTrigger className="h-10 bg-gray-100 border-0 text-gray-900 text-sm">
                          <SelectValue placeholder="Select Industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((ind) => (
                            <SelectItem key={ind} value={ind}>
                              {ind}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Role
                      </Label>
                      <Input
                        type="text"
                        value={exp.role}
                        onChange={(e) =>
                          updateWorkExperience(exp.id, "role", e.target.value)
                        }
                        className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                        maxLength={50}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Company
                      </Label>
                      <Input
                        type="text"
                        value={exp.company}
                        onChange={(e) =>
                          updateWorkExperience(exp.id, "company", e.target.value)
                        }
                        className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                        maxLength={50}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Location
                      </Label>
                      <Input
                        type="text"
                        value={exp.location}
                        onChange={(e) =>
                          updateWorkExperience(exp.id, "location", e.target.value)
                        }
                        className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                        maxLength={50}
                      />
                    </div>
                  </div>
                ))}

                {workExperiences.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    No work experience added yet.
                  </div>
                )}
              </div>

              {/* Job References */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Job References
                  </h2>
                  <Button
                    type="button"
                    onClick={addJobReference}
                    disabled={jobReferences.length >= 5}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>

                {jobReferences.map((ref, idx) => (
                  <div
                    key={ref.id}
                    className="border border-gray-200 rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        Reference {idx + 1}
                      </h3>
                      <Button
                        type="button"
                        onClick={() => removeJobReference(ref.id)}
                        variant="ghost"
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" /> Remove
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <Input
                        type="text"
                        value={ref.name}
                        onChange={(e) =>
                          updateJobReference(ref.id, "name", e.target.value)
                        }
                        placeholder="Name"
                        className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                      />
                      <Input
                        type="text"
                        value={ref.businessName}
                        onChange={(e) =>
                          updateJobReference(ref.id, "businessName", e.target.value)
                        }
                        placeholder="Business Name"
                        className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                      />
                      <Input
                        type="email"
                        value={ref.email}
                        onChange={(e) =>
                          updateJobReference(ref.id, "email", e.target.value)
                        }
                        placeholder="Email"
                        className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                      />
                      <Input
                        type="text"
                        value={ref.phone}
                        onChange={(e) =>
                          updateJobReference(ref.id, "phone", e.target.value)
                        }
                        placeholder="Phone"
                        className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                      />
                      <Input
                        type="text"
                        value={ref.role}
                        onChange={(e) =>
                          updateJobReference(ref.id, "role", e.target.value)
                        }
                        placeholder="Role"
                        className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 space-y-4">
                <Button
                  type="submit"
                  className="w-full h-14 text-lg rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium"
                >
                  Continue →
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate("/whv/photo-upload")}
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


