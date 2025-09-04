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

// ✅ Full industries & roles for Subclass 417
const industryRoles417: Record<string, string[]> = {
  "Aged & Disability Care": [
    "Disability carers",
    "aged care workers",
    "community support carers",
  ],
  "Bushfire Recovery": [
    "Rebuilding fences",
    "demolition",
    "land clearing",
    "wildlife care",
    "construction repairs",
    "volunteer/community support roles",
  ],
  Childcare: [
    "Daycare staff",
    "nursery/crèche attendants",
    "family day care workers",
    "nannies/au pairs",
    "out-of-school/vacation care staff",
    "child protection/welfare staff",
  ],
  Construction: [
    "Residential/non-residential builders",
    "heavy civil works",
    "land development",
    "building structure work",
    "carpenters",
    "plumbers",
    "electricians",
    "painters",
  ],
  "Fishing & Pearling": ["Deckhands", "aquaculture workers", "divers"],
  Forestry: ["Tree planters", "chainsaw operators", "forest workers"],
  "Plant & Animal Cultivation": [
    "Harvesting/packing fruit & vegetable crops",
    "pruning/trimming vines & trees",
    "general maintenance crop work",
    "cultivating/propagating plants",
    "feeding & herding livestock",
    "machine operation for planting/harvesting",
    "meat processing, packing & direct animal slaughter",
    "general livestock management",
  ],
  "Tourism & Hospitality": [
    "Hotel/motel/hostel staff",
    "reception",
    "housekeeping",
    "chefs",
    "waiters",
    "bartenders",
    "baristas",
    "catering staff",
    "tour guides",
    "event/entertainment staff",
    "gallery/museum staff",
    "travel agents",
  ],
  Health: [
    "Doctors",
    "nurses",
    "dentists and dental staff",
    "allied health professionals",
    "aged care staff",
    "hospital cleaners",
  ],
  Mining: [
    "Drillers",
    "truck operators",
    "plant operators",
    "trades assistants",
  ],
};

// ✅ Full industries & roles for Subclass 462
const industryRoles462: Record<string, string[]> = {
  "Aged & Disability Care": [
    "Disability carers",
    "aged care workers",
    "community support carers",
  ],
  "Bushfire Recovery": [
    "Rebuilding fences",
    "demolition",
    "land clearing",
    "wildlife care",
    "construction repairs",
    "volunteer/community support roles",
  ],
  Childcare: [
    "Daycare staff",
    "nursery/crèche attendants",
    "family day care workers",
    "nannies/au pairs",
    "out-of-school/vacation care staff",
    "child protection/welfare staff",
  ],
  "Construction (Northern + Regional Aus)": [
    "Residential/non-residential builders",
    "heavy civil works",
    "land development",
    "building structure work",
    "carpenters",
    "plumbers",
    "electricians",
    "painters",
  ],
  "Fishing & Pearling (Northern Aus only)": [
    "Deckhands",
    "aquaculture workers",
    "divers",
  ],
  Forestry: ["Tree planters", "chainsaw operators", "forest workers"],
  "Plant & Animal Cultivation": [
    "Harvesting/packing fruit & vegetable crops",
    "pruning/trimming vines & trees",
    "general maintenance crop work",
    "cultivating/propagating plants",
    "feeding & herding livestock",
    "machine operation for planting/harvesting",
    "meat processing, packing & direct animal slaughter",
    "general livestock management",
  ],
  "Tourism & Hospitality (Northern/Remote/Very Remote only)": [
    "Hotel/motel/hostel staff",
    "reception",
    "housekeeping",
    "chefs",
    "waiters",
    "bartenders",
    "baristas",
    "catering staff",
    "tour guides",
    "event/entertainment staff",
    "gallery/museum staff",
    "travel agents",
  ],
  Health: [
    "Doctors",
    "nurses",
    "dentists and dental staff",
    "allied health professionals",
    "aged care staff",
    "hospital cleaners",
  ],
};

// ✅ Areas for 2nd / 3rd visa
const areaOptions = ["Regional", "Remote", "Very Remote", "Northern Australia"];

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

// Example postcode data (replace with full list from Excel if needed)
const postcodeData: Record<string, string[]> = {
  Queensland: ["4124–4125", "4133", "4183–4184"],
  "New South Wales": ["2250–2251", "2256–2263", "2311–2312"],
};

interface Props {
  visaType: "417" | "462";
  visaStage: "1st" | "2nd" | "3rd";
}

const WHVWorkPreferences: React.FC<Props> = ({ visaType, visaStage }) => {
  const navigate = useNavigate();

  const [tagline, setTagline] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [preferredState, setPreferredState] = useState("");
  const [preferredArea, setPreferredArea] = useState("");
  const [showPostcodes, setShowPostcodes] = useState(false);

  const roles = visaType === "417" ? industryRoles417 : industryRoles462;

  const toggleIndustry = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(selectedIndustries.filter((i) => i !== industry));
      setSelectedRoles(
        selectedRoles.filter((role) => !roles[industry]?.includes(role))
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
    console.log("Visa:", visaType, visaStage);
    console.log("Industries:", selectedIndustries);
    console.log("Roles:", selectedRoles);
    console.log("Preferred State:", preferredState);
    console.log("Preferred Area:", preferredArea);
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
                  {Object.keys(roles).map((industry) => (
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
                      roles[industry].map((role) => (
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
                </div>
              )}

              {/* Preferred Location */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">
                  Preferred Working Location{" "}
                  <span className="text-red-500">*</span>
                </Label>

                {/* Always select state */}
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

                {/* Show Area + Postcodes only for 2nd / 3rd visa */}
                {(visaStage === "2nd" || visaStage === "3rd") && (
                  <>
                    <Select onValueChange={(value) => setPreferredArea(value)}>
                      <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900 mt-2">
                        <SelectValue placeholder="Select area type" />
                      </SelectTrigger>
                      <SelectContent>
                        {areaOptions.map((area) => (
                          <SelectItem key={area} value={area}>
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Expandable Postcodes */}
                    {preferredState && preferredArea && (
                      <div className="mt-3">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => setShowPostcodes(!showPostcodes)}
                        >
                          {showPostcodes
                            ? "Hide Eligible Postcodes"
                            : "View Eligible Postcodes"}
                        </Button>
                        {showPostcodes && postcodeData[preferredState] && (
                          <ul className="mt-2 text-sm text-gray-700 list-disc pl-5">
                            {postcodeData[preferredState].map((pc) => (
                              <li key={pc}>{pc}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </>
                )}
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

