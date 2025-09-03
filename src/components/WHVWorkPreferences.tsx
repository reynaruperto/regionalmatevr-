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
import { ArrowLeft } from "lucide-react";

// ✅ Industries & Roles aligned with WHV-specified work
const industryRoles: Record<string, string[]> = {
  "Agriculture & Farming": [
    "Fruit Picker",
    "Farm Hand",
    "Packer",
    "Crop Harvester",
    "Irrigation Worker",
  ],
  Construction: [
    "Construction Labourer",
    "Carpenter",
    "Plumber",
    "Electrician",
    "Painter",
  ],
  Mining: ["Driller", "Truck Operator", "Plant Operator", "Trades Assistant"],
  "Hospitality & Tourism": [
    "Bartender",
    "Waitstaff",
    "Chef / Cook",
    "Housekeeper",
    "Tour Guide",
  ],
  "Fishing & Pearling": ["Deckhand", "Aquaculture Worker", "Diver"],
  Forestry: ["Tree Planter", "Chainsaw Operator", "Forest Worker"],
  "Aged Care & Disability Services": [
    "Personal Care Worker",
    "Support Worker",
    "Nurse Assistant",
  ],
};

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

const WHVWorkPreferences: React.FC = () => {
  const navigate = useNavigate();

  const [tagline, setTagline] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [otherRole, setOtherRole] = useState("");
  const [preferredState, setPreferredState] = useState("");
  const [preferredCity, setPreferredCity] = useState("");

  const toggleIndustry = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(selectedIndustries.filter((i) => i !== industry));
      setSelectedRoles(
        selectedRoles.filter((role) => !industryRoles[industry]?.includes(role))
      );
    } else if (selectedIndustries.length < 3) {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };

  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Tagline:", tagline);
    console.log("Industries:", selectedIndustries);
    console.log("Roles:", selectedRoles);
    console.log("Other Role:", otherRole);
    console.log("Preferred Location:", preferredCity, preferredState);

    navigate("/whv/work-experience");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-4 flex-shrink-0"></div>

          {/* Header */}
          <div className="px-4 py-4 border-b bg-white flex-shrink-0">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate("/whv/profile-setup")}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h1 className="text-lg font-medium text-gray-900">
                Work Preferences
              </h1>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <span className="text-sm font-medium text-gray-600">4/6</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <form onSubmit={handleSubmit} className="space-y-8 pb-20">
              {/* Profile Tagline */}
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

              {/* Industry Selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">
                  Select up to 3 industries of interest{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(industryRoles).map((industry) => (
                    <button
                      type="button"
                      key={industry}
                      onClick={() => toggleIndustry(industry)}
                      disabled={
                        selectedIndustries.length >= 3 &&
                        !selectedIndustries.includes(industry)
                      }
                      className={`px-4 py-2 rounded-full text-sm border transition ${
                        selectedIndustries.includes(industry)
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-white text-gray-700 border-gray-300"
                      } ${
                        selectedIndustries.length >= 3 &&
                        !selectedIndustries.includes(industry)
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>

              {/* Role Selection */}
              {selectedIndustries.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-base font-medium text-gray-700">
                    Select roles within chosen industries
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedIndustries.flatMap((industry) =>
                      industryRoles[industry].map((role) => (
                        <button
                          type="button"
                          key={`${industry}-${role}`}
                          onClick={() => toggleRole(role)}
                          className={`px-4 py-2 rounded-full text-sm border transition ${
                            selectedRoles.includes(role)
                              ? "bg-orange-500 text-white border-orange-500"
                              : "bg-white text-gray-700 border-gray-300"
                          }`}
                        >
                          {role}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Other Role input */}
                  <div className="space-y-2 mt-4">
                    <Label className="text-base font-medium text-gray-700">
                      Other Role (optional)
                    </Label>
                    <Input
                      type="text"
                      value={otherRole}
                      onChange={(e) => setOtherRole(e.target.value)}
                      className="h-12 bg-gray-100 border-0 text-gray-900"
                      maxLength={50}
                    />
                  </div>

                  {/* Softer Tip Disclaimer */}
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Tip: Some of these jobs can help you qualify for a visa
                    extension. Check the Department of Home Affairs website for
                    details.
                  </p>
                </div>
              )}

              {/* Preferred Location */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">
                  Preferred Working Location{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setPreferredState(value)}>
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
                  value={preferredCity}
                  onChange={(e) => setPreferredCity(e.target.value)}
                  className="h-12 bg-gray-100 border-0 text-gray-900 mt-2"
                  placeholder="Suburb / City"
                />
              </div>

              {/* Continue Button */}
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

export default WHVWorkPreferences;
