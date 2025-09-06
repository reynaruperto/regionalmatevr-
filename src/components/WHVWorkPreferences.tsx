import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

// ==========================
// Enums & Constants
// ==========================
enum AreaRestriction {
  All = "All",
  Regional = "Regional",
  Northern = "Northern",
  Remote = "Remote",
  VeryRemote = "Very Remote",
}

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

// ==========================
// Full WHV Industries Dataset
// ==========================
const whvIndustries: Record<
  string,
  Record<
    string,
    { roles: string[]; states: string[]; areas: string[]; postcodes: string[] }
  >
> = {
  // --- 417 6-Month Exemption ---
  "417_6-Month Exemption": {
    "Plant & Animal Cultivation": {
      roles: [
        "Harvesting and/or packing of fruit and vegetable crops",
        "Pruning and trimming vines and trees (commercial horticulture)",
        "Maintaining crops",
        "Cultivating or propagating plants, fungi, or their products/parts",
        "Processing of plant products",
        "Maintaining animals for the purpose of selling them or their bodily produce (including natural increase)",
        "Processing of animal products (shearing, butchery, packing, tanning)",
        "Manufacturing dairy produce"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Agriculture": {
      roles: [
        "All general farming activities (cropping, livestock, mixed farming, etc.)"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Health": {
      roles: [
        "Doctors",
        "Nurses",
        "Dentists and dental support staff",
        "Allied health workers",
        "Medical support and administrative staff",
        "Medical imaging staff",
        "Mental health staff",
        "Radiology services staff",
        "Installation and maintenance of medical machinery",
        "Hospital and healthcare cleaning staff"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Aged & Disability Care": {
      roles: [
        "Aged care worker",
        "Disability support worker",
        "Community support worker"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Childcare": {
      roles: [
        "Daycare worker",
        "Nursery/crèche worker/aide/attendants",
        "Family daycare worker",
        "Nanny/au pair",
        "Out-of-school/vacation care worker",
        "Child protection/welfare staff"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Tourism & Hospitality": {
      roles: [
        "Accommodation: hotels, motels, bed and breakfasts, backpacker hostels",
        "Accommodation: caravan parks and camping grounds",
        "Hospitality: cafes, restaurants, takeaway shops, catering",
        "Hospitality: pubs, taverns, bars, clubs",
        "Hospitality: casinos",
        "Travel agents",
        "Tour guides",
        "Dive instructors",
        "Bus drivers",
        "Event/entertainment staff",
        "Gallery/museum staff"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    }
  },
  // --- 462 6-Month Exemption ---
  "462_6-Month Exemption": {
    "Plant & Animal Cultivation": {
      roles: [
        "Harvesting and/or packing of fruit and vegetable crops",
        "Pruning and trimming vines and trees (commercial horticulture)",
        "Maintaining crops",
        "Cultivating or propagating plants, fungi, or their products/parts",
        "Processing of plant products",
        "Maintaining animals for the purpose of selling them or their bodily produce (including natural increase)",
        "Processing of animal products (shearing, butchery, packing, tanning)",
        "Manufacturing dairy produce"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Agriculture": {
      roles: [
        "All general farming activities (cropping, livestock, mixed farming, etc.)"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Health": {
      roles: [
        "Doctors",
        "Nurses",
        "Dentists and dental support staff",
        "Allied health workers",
        "Medical support and administrative staff",
        "Medical imaging staff",
        "Mental health staff",
        "Radiology services staff",
        "Installation and maintenance of medical machinery",
        "Hospital and healthcare cleaning staff"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Aged & Disability Care": {
      roles: [
        "Aged care worker",
        "Disability support worker",
        "Community support worker"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Childcare": {
      roles: [
        "Daycare worker",
        "Nursery/crèche worker/aide/attendants",
        "Family daycare worker",
        "Nanny/au pair",
        "Out-of-school/vacation care worker",
        "Child protection/welfare staff"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Tourism & Hospitality": {
      roles: [
        "Accommodation: hotels, motels, bed and breakfasts, backpacker hostels",
        "Accommodation: caravan parks and camping grounds",
        "Hospitality: cafes, restaurants, takeaway shops, catering",
        "Hospitality: pubs, taverns, bars, clubs",
        "Hospitality: casinos",
        "Travel agents",
        "Tour guides",
        "Dive instructors",
        "Bus drivers",
        "Event/entertainment staff",
        "Gallery/museum staff"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    }
  }
};

// Map visa type and stage to visa subclass
const getVisaSubclass = (visaType: string, visaStage: string) => {
  if (visaType === "417" && visaStage === "1st") {
    return "417_6-Month Exemption";
  } else if (visaType === "462" && visaStage === "1st") {
    return "462_6-Month Exemption";
  }
  return "417_6-Month Exemption"; // Default fallback
};

// ==========================
// Tooltip Generator
// ==========================
const getIndustryTooltip = (
  visaSubclass: string,
  industry: string,
  state: string,
  area: string
): string => {
  const config = whvIndustries[visaSubclass]?.[industry];
  if (!config || !state || !area) return "";

  const validStates =
    config.states.includes("All") ? australianStates : config.states;

  const validAreas =
    config.areas.includes("All") ? [`Anywhere in ${state}`] : config.areas;

  if (!validStates.includes(state)) {
    return `⚠️ ${industry} may not count towards a visa extension in ${state}. Eligible in: ${validStates.join(", ")}.`;
  }

  if (!validAreas.includes(area)) {
    return `⚠️ ${industry} may only count in areas: ${validAreas.join(", ")}.`;
  }

  return `✅ ${industry} can be done in ${state} (${area}).`;
};

// ==========================
// Component
// ==========================
interface WHVWorkPreferencesProps {
  visaType: string;
  visaStage: string;
}

const WHVWorkPreferences: React.FC<WHVWorkPreferencesProps> = ({
  visaType,
  visaStage
}) => {
  const navigate = useNavigate();
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [preferredState, setPreferredState] = useState<string>("");
  const [preferredArea, setPreferredArea] = useState<string>("");

  const visaSubclass = getVisaSubclass(visaType, visaStage);
  const availableIndustries = whvIndustries[visaSubclass] || {};

  const handleIndustryToggle = (industry: string) => {
    setSelectedIndustries(prev =>
      prev.includes(industry)
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    );
  };

  const handleSubmit = () => {
    // Save preferences and navigate to next step
    console.log("Work preferences:", {
      industries: selectedIndustries,
      state: preferredState,
      area: preferredArea,
      visaType,
      visaStage
    });
    navigate("/whv/profile-setup");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-3"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Work Preferences</h1>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Industries */}
          <div>
            <Label className="text-base font-medium mb-4 block">
              What industries are you interested in?
            </Label>
            <div className="space-y-3">
              {Object.keys(availableIndustries).map((industry) => (
                <div
                  key={industry}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedIndustries.includes(industry)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                  onClick={() => handleIndustryToggle(industry)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{industry}</span>
                    <div className={`w-5 h-5 border-2 rounded ${
                      selectedIndustries.includes(industry)
                        ? "bg-primary border-primary"
                        : "border-muted-foreground"
                    }`}>
                      {selectedIndustries.includes(industry) && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                        </div>
                      )}
                    </div>
                  </div>
                  {preferredState && preferredArea && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {getIndustryTooltip(visaSubclass, industry, preferredState, preferredArea)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* State Preference */}
          <div>
            <Label htmlFor="state" className="text-base font-medium">
              Preferred State/Territory
            </Label>
            <select
              id="state"
              value={preferredState}
              onChange={(e) => setPreferredState(e.target.value)}
              className="w-full mt-2 p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select a state/territory</option>
              {australianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Area Preference */}
          <div>
            <Label htmlFor="area" className="text-base font-medium">
              Preferred Area Type
            </Label>
            <select
              id="area"
              value={preferredArea}
              onChange={(e) => setPreferredArea(e.target.value)}
              className="w-full mt-2 p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select an area type</option>
              <option value="All">Any area</option>
              <option value="Regional">Regional Australia</option>
              <option value="Northern">Northern Australia</option>
              <option value="Remote">Remote Australia</option>
              <option value="Very Remote">Very Remote Australia</option>
            </select>
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={selectedIndustries.length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WHVWorkPreferences;