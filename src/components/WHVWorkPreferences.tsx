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

// ✅ Subclass 417 industries
const industryRoles417: Record<
  string,
  { roles: string[]; validStates: string[]; validAreas: string[] }
> = {
  "Plant & Animal Cultivation": {
    roles: [
      "Harvesting/packing fruit & vegetable crops",
      "Pruning/trimming vines and trees",
      "Crop maintenance",
      "Cultivating/propagating plants or fungi",
      "Processing plant products",
      "Feeding and herding livestock",
      "Animal slaughter and butchery",
      "Shearing, tanning, dairy processing",
      "Reforestation",
      "Zoo-based plant/animal care",
    ],
    validStates: ["All"],
    validAreas: ["All"],
  },
  "Fishing & Pearling": {
    roles: ["Deckhand", "Aquaculture Worker", "Diver"],
    validStates: ["All"],
    validAreas: ["All"],
  },
  "Tree Farming & Forestry": {
    roles: ["Tree Planter", "Chainsaw Operator", "Forest Worker"],
    validStates: ["All"],
    validAreas: ["All"],
  },
  Mining: {
    roles: ["Driller", "Truck Operator", "Plant Operator", "Trades Assistant"],
    validStates: ["All"],
    validAreas: ["All"],
  },
  Construction: {
    roles: [
      "Construction Labourer",
      "Carpenter",
      "Plumber",
      "Electrician",
      "Painter",
      "General Building Work",
    ],
    validStates: ["All"],
    validAreas: ["All"],
  },
  "Bushfire Recovery": {
    roles: [
      "Rebuilding fences",
      "Demolition",
      "Land clearing",
      "Wildlife care",
      "Construction repairs",
      "Volunteer/community support roles",
    ],
    validStates: ["All"],
    validAreas: ["All"],
  },
  "Tourism & Hospitality": {
    roles: [
      "Hotel/motel/hostel staff",
      "Reception",
      "Housekeeping",
      "Chefs",
      "Waiters",
      "Bartenders",
      "Baristas",
      "Catering staff",
      "Tour guides",
      "Event/entertainment staff",
      "Gallery/museum staff",
      "Travel agents",
    ],
    validStates: ["All"],
    validAreas: ["All"],
  },
  "Aged & Disability Care": {
    roles: ["Disability Carer", "Aged Care Worker", "Community Support Carer"],
    validStates: ["All"],
    validAreas: ["All"],
  },
  Childcare: {
    roles: [
      "Daycare Staff",
      "Nursery/Crèche Attendants",
      "Family Day Care Workers",
      "Nannies/Au Pairs",
      "Out-of-school/vacation care staff",
      "Child protection/welfare staff",
    ],
    validStates: ["All"],
    validAreas: ["All"],
  },
  Health: {
    roles: [
      "Doctors",
      "Nurses",
      "Dentists and dental staff",
      "Allied health professionals",
      "Hospital cleaners",
    ],
    validStates: ["All"],
    validAreas: ["All"],
  },
};

// ✅ Subclass 462 industries
const industryRoles462: Record<
  string,
  { roles: string[]; validStates: string[]; validAreas: string[] }
> = {
  "Plant & Animal Cultivation": {
    roles: [
      "Harvesting/packing fruit & vegetable crops",
      "Pruning/trimming vines and trees",
      "Crop maintenance",
      "Cultivating/propagating plants or fungi",
      "Processing plant products",
      "Feeding and herding livestock",
      "Animal slaughter and butchery",
      "Shearing, tanning, dairy processing",
      "Reforestation",
      "Zoo-based plant/animal care",
    ],
    validStates: ["All"],
    validAreas: ["All"],
  },
  "Fishing & Pearling": {
    roles: ["Deckhand", "Aquaculture Worker", "Diver"],
    validStates: ["Northern Territory", "Western Australia"],
    validAreas: ["Northern Australia"],
  },
  "Tree Farming & Forestry": {
    roles: ["Tree Planter", "Chainsaw Operator", "Forest Worker"],
    validStates: ["All"],
    validAreas: ["All"],
  },
  Mining: {
    roles: ["Driller", "Truck Operator", "Plant Operator", "Trades Assistant"],
    validStates: ["All"],
    validAreas: ["All"],
  },
  Construction: {
    roles: [
      "Construction Labourer",
      "Carpenter",
      "Plumber",
      "Electrician",
      "Painter",
      "General Building Work",
    ],
    validStates: ["Northern Territory", "Queensland", "Western Australia"],
    validAreas: ["Northern Australia", "Remote", "Very Remote"],
  },
  "Bushfire Recovery": {
    roles: [
      "Rebuilding fences",
      "Demolition",
      "Land clearing",
      "Wildlife care",
      "Construction repairs",
      "Volunteer/community support roles",
    ],
    validStates: ["All"],
    validAreas: ["All"],
  },
  "Tourism & Hospitality": {
    roles: [
      "Hotel/motel/hostel staff",
      "Reception",
      "Housekeeping",
      "Chefs",
      "Waiters",
      "Bartenders",
      "Baristas",
      "Catering staff",
      "Tour guides",
      "Event/entertainment staff",
      "Gallery/museum staff",
      "Travel agents",
    ],
    validStates: ["Northern Territory", "Queensland", "Western Australia"],
    validAreas: ["Northern Australia", "Remote", "Very Remote"],
  },
  "Aged & Disability Care": {
    roles: ["Disability Carer", "Aged Care Worker", "Community Support Carer"],
    validStates: ["All"],
    validAreas: ["All"],
  },
  Childcare: {
    roles: [
      "Daycare Staff",
      "Nursery/Crèche Attendants",
      "Family Day Care Workers",
      "Nannies/Au Pairs",
      "Out-of-school/vacation care staff",
      "Child protection/welfare staff",
    ],
    validStates: ["All"],
    validAreas: ["All"],
  },
  Health: {
    roles: [
      "Doctors",
      "Nurses",
      "Dentists and dental staff",
      "Allied health professionals",
      "Hospital cleaners",
    ],
    validStates: ["All"],
    validAreas: ["All"],
  },
};

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

interface Props {
  visaType: "417" | "462";
  visaStage: "1st" | "2nd" | "3rd";
}

const WHVWorkPreferences: React.FC<Props> = ({ visaType, visaStage }) => {
  const navigate = useNavigate();

  const [tagline, setTagline] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [preferredState, setPreferredState] = useState("");
  const [preferredArea, setPreferredArea] = useState("");
  const [warning, setWarning] = useState("");

  const industries = visaType === "417" ? industryRoles417 : industryRoles462;

  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const validateLocation = (state: string, area: string) => {
    if (!selectedIndustry) return;
    const { validStates, validAreas } = industries[selectedIndustry];

    const stateValid =
      validStates.includes("All") || validStates.includes(state);
    const areaValid =
      validAreas.includes("All") || validAreas.includes(area);

    if (!stateValid || (visaStage !== "1st" && !areaValid)) {
      setWarning(
        `⚠ ${selectedIndustry} work in ${state}${
          area ? " (" + area + ")" : ""
        } may not count towards visa extension.`
      );
    } else {
      setWarning("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tagline:", tagline);
    console.log("Visa:", visaType, visaStage);
    console.log("Industry:", selectedIndustry);
    console.log("Roles:", selectedRoles);
    console.log("Preferred State:", preferredState);
    console.log("Preferred Area:", preferredArea);
    navigate("/whv/work-experience");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden flex flex-col">
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
              </div>

              {/* Industry Selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">
                  Select an industry of interest{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(industries).map((industry) => (
                    <button
                      type="button"
                      key={industry}
                      onClick={() => {
                        setSelectedIndustry(industry);
                        setSelectedRoles([]);
                        setWarning("");
                        validateLocation(preferredState, preferredArea);
                      }}
                      className={`px-4 py-2 rounded-full text-sm border transition ${
                        selectedIndustry === industry
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>

              {/* Role Selection */}
              {selectedIndustry && (
                <div className="space-y-3">
                  <Label className="text-base font-medium text-gray-700">
                    Select roles within {selectedIndustry}
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {industries[selectedIndustry].roles.map((role) => (
                      <button
                        type="button"
                        key={role}
                        onClick={() => toggleRole(role)}
                        className={`px-4 py-2 rounded-full text-sm border transition ${
                          selectedRoles.includes(role)
                            ? "bg-orange-500 text-white border-orange-500"
                            : "bg-white text-gray-700 border-gray-300"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Preferred Location */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">
                  Preferred Working Location{" "}
                  <span className="text-red-500">*</span>
                </Label>

                <Select
                  onValueChange={(value) => {
                    setPreferredState(value);
                    validateLocation(value, preferredArea);
                  }}
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

                {(visaStage === "2nd" || visaStage === "3rd") && (
                  <Select
                    onValueChange={(value) => {
                      setPreferredArea(value);
                      validateLocation(preferredState, value);
                    }}
                  >
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
                )}

                {warning && (
                  <p className="text-xs text-red-600 mt-2">{warning}</p>
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
