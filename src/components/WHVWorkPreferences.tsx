import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

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
// Full WHV Industries Dataset (417 + 462 visas)
// ==========================
const whvIndustries: Record<
  string,
  Record<string, { roles: string[]; states: string[]; areas: string[]; postcodes: string[] }>
> = {
  // --- 417 1st Visa (6-Month Exemption) ---
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
        "Manufacturing dairy produce",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Tourism & Hospitality": {
      roles: [
        "Hotel/motel/hostel staff",
        "Reception",
        "Housekeeping",
        "Chefs",
        "Waiters",
        "Bartenders",
        "Catering staff",
        "Tour guides",
        "Dive instructors",
        "Bus drivers",
        "Event/entertainment staff",
        "Gallery/museum staff",
        "Travel agents",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Construction": {
      roles: [
        "Residential builders",
        "Non-residential builders",
        "Heavy civil engineering staff",
        "Construction services",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Fishing & Pearling": {
      roles: ["Fishing deckhands", "Aquaculture workers", "Pearl farm workers"],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Tree Farming & Felling": {
      roles: [
        "Planting/tending plantation trees",
        "Felling trees",
        "Transporting logs to mills",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Mining": {
      roles: ["Coal miners", "Oil & gas workers", "Ore miners", "Quarry workers"],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Health": {
      roles: [
        "Doctors",
        "Nurses",
        "Dentists and dental staff",
        "Allied health workers",
        "Medical support/admin roles",
        "Medical imaging staff",
        "Mental health staff",
        "Radiology services staff",
        "Installation/maintenance of medical machinery",
        "Hospital/healthcare cleaning staff",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Aged & Disability Care": {
      roles: ["Disability carers", "Aged care workers", "Community support carers"],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Childcare": {
      roles: [
        "Daycare staff",
        "Nursery/crèche attendants",
        "Family day care workers",
        "Nannies/au pairs",
        "Out-of-school/vacation care staff",
        "Child protection/welfare staff",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Natural Disaster Recovery": {
      roles: [
        "Clean-up",
        "Construction repairs",
        "Demolition",
        "Land clearing",
        "Community recovery work",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
  },

  // --- 417 2nd Visa (3 months specified work) ---
  "417_2nd Visa (3 months specified work)": {
    "Plant & Animal Cultivation": {
      roles: [
        "Harvesting and/or packing of fruit and vegetable crops",
        "Pruning and trimming vines and trees (commercial horticulture)",
        "Maintaining crops",
        "Cultivating or propagating plants, fungi, or their products/parts",
        "Processing of plant products",
        "Maintaining animals for the purpose of selling them or their bodily produce (including natural increase)",
        "Processing of animal products (shearing, butchery, packing, tanning)",
        "Manufacturing dairy produce",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Tourism & Hospitality": {
      roles: [
        "Hotel/motel/hostel staff",
        "Reception",
        "Housekeeping",
        "Chefs",
        "Waiters",
        "Bartenders",
        "Catering staff",
        "Tour guides",
        "Dive instructors",
        "Bus drivers",
        "Event/entertainment staff",
        "Gallery/museum staff",
        "Travel agents",
      ],
      states: [
        "Queensland",
        "Northern Territory",
        "Western Australia",
        "Tasmania",
        "South Australia",
        "Victoria",
        "New South Wales",
      ],
      areas: ["Northern", "Remote", "Very Remote"],
      postcodes: ["Regional QLD/NT/WA/SA/VIC/NSW/TAS lists"],
    },
    "Bushfire Recovery": {
      roles: [
        "Rebuilding fences",
        "Demolition",
        "Land clearing",
        "Replanting",
        "Clearing debris",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["Regional NSW, VIC, ACT"],
    },
    "Fishing & Pearling": {
      roles: ["Fishing deckhands", "Aquaculture workers", "Pearl farm workers"],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: ["Regional QLD/NT/WA lists"],
    },
    "Tree Farming & Felling": {
      roles: [
        "Planting/tending plantation trees",
        "Felling trees",
        "Transporting logs to mills",
      ],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: ["Regional QLD/NT/WA lists"],
    },
    "Mining": {
      roles: ["Coal miners", "Oil & gas workers", "Ore miners", "Quarry workers"],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: ["Regional QLD/NT/WA lists"],
    },
    "Construction": {
      roles: [
        "Residential/non-residential builders",
        "Heavy civil engineering",
        "Construction services",
      ],
      states: ["All"],
      areas: ["Regional"],
      postcodes: ["All"],
    },
    "Natural Disaster Recovery": {
      roles: [
        "Flood/cyclone clean-up",
        "Demolition",
        "Construction repairs",
        "Land clearing",
        "Community recovery",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
  },
  // --- 417 3rd Visa (6 months specified work) ---
  "417_3rd Visa (6 months specified work)": {
    "Plant & Animal Cultivation": {
      roles: [
        "Harvesting and/or packing of fruit and vegetable crops",
        "Pruning and trimming vines and trees (commercial horticulture)",
        "Maintaining crops",
        "Cultivating or propagating plants, fungi, or their products/parts",
        "Processing of plant products",
        "Maintaining animals for the purpose of selling them or their bodily produce (including natural increase)",
        "Processing of animal products (shearing, butchery, packing, tanning)",
        "Manufacturing dairy produce",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Tourism & Hospitality": {
      roles: [
        "Hotel/motel/hostel staff",
        "Reception",
        "Housekeeping",
        "Chefs",
        "Waiters",
        "Bartenders",
        "Catering staff",
        "Tour guides",
        "Dive instructors",
        "Bus drivers",
        "Event/entertainment staff",
        "Gallery/museum staff",
        "Travel agents",
      ],
      states: [
        "Queensland",
        "Northern Territory",
        "Western Australia",
        "New South Wales",
        "Victoria",
        "South Australia",
        "Tasmania",
      ],
      areas: ["Northern", "Remote", "Very Remote"],
      postcodes: ["Regional QLD/NT/WA/NSW/VIC/SA/TAS lists"],
    },
    "Fishing & Pearling": {
      roles: ["Fishing deckhands", "Aquaculture workers", "Pearl farm workers"],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: ["Regional QLD/NT/WA lists"],
    },
    "Tree Farming & Felling": {
      roles: [
        "Planting/tending plantation trees",
        "Felling trees",
        "Transporting logs to mills",
      ],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: ["Regional QLD/NT/WA lists"],
    },
    "Mining": {
      roles: ["Coal miners", "Oil & gas workers", "Ore miners", "Quarry workers"],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: ["Regional QLD/NT/WA lists"],
    },
    "Construction": {
      roles: [
        "Residential/non-residential builders",
        "Heavy civil engineering",
        "Construction services",
      ],
      states: ["All"],
      areas: ["Regional"],
      postcodes: ["All"],
    },
    "Natural Disaster Recovery": {
      roles: [
        "Flood/cyclone clean-up",
        "Demolition",
        "Construction repairs",
        "Land clearing",
        "Community recovery",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
  },

  // --- 462 1st Visa (6-Month Exemption) ---
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
        "Manufacturing dairy produce",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Tourism & Hospitality": {
      roles: [
        "Hotel/motel/hostel staff",
        "Reception",
        "Housekeeping",
        "Chefs",
        "Waiters",
        "Bartenders",
        "Catering staff",
        "Tour guides",
        "Dive instructors",
        "Bus drivers",
        "Event/entertainment staff",
        "Gallery/museum staff",
        "Travel agents",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Construction": {
      roles: [
        "Residential builders",
        "Non-residential builders",
        "Heavy civil engineering staff",
        "Construction services",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Fishing & Pearling": {
      roles: ["Fishing deckhands", "Aquaculture workers", "Pearl farm workers"],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Tree Farming & Felling": {
      roles: [
        "Planting/tending plantation trees",
        "Felling trees",
        "Transporting logs to mills",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Mining": {
      roles: ["Coal miners", "Oil & gas workers", "Ore miners", "Quarry workers"],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Health": {
      roles: [
        "Doctors",
        "Nurses",
        "Dentists and dental staff",
        "Allied health workers",
        "Medical support/admin roles",
        "Medical imaging staff",
        "Mental health staff",
        "Radiology services staff",
        "Installation/maintenance of medical machinery",
        "Hospital/healthcare cleaning staff",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Aged & Disability Care": {
      roles: ["Disability carers", "Aged care workers", "Community support carers"],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Childcare": {
      roles: [
        "Daycare staff",
        "Nursery/crèche attendants",
        "Family day care workers",
        "Nannies/au pairs",
        "Out-of-school/vacation care staff",
        "Child protection/welfare staff",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Natural Disaster Recovery": {
      roles: [
        "Clean-up",
        "Construction repairs",
        "Demolition",
        "Land clearing",
        "Community recovery work",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
  },

  // --- 462 2nd Visa (3 months specified work) ---
  "462_2nd Visa (3 months specified work)": {
    "Plant & Animal Cultivation": {
      roles: [
        "Harvesting and/or packing of fruit and vegetable crops",
        "Pruning and trimming vines and trees (commercial horticulture)",
        "Maintaining crops",
        "Cultivating or propagating plants, fungi, or their products/parts",
        "Processing of plant products",
        "Maintaining animals for the purpose of selling them or their bodily produce (including natural increase)",
        "Processing of animal products (shearing, butchery, packing, tanning)",
        "Manufacturing dairy produce",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Tourism & Hospitality": {
      roles: [
        "Hotel/motel/hostel staff",
        "Reception",
        "Housekeeping",
        "Chefs",
        "Waiters",
        "Bartenders",
        "Catering staff",
        "Tour guides",
        "Dive instructors",
        "Bus drivers",
        "Event/entertainment staff",
        "Gallery/museum staff",
        "Travel agents",
      ],
      states: [
        "Queensland",
        "Northern Territory",
        "Western Australia",
        "Tasmania",
        "South Australia",
        "Victoria",
        "New South Wales",
      ],
      areas: ["Northern", "Remote", "Very Remote"],
      postcodes: ["Regional QLD/NT/WA/SA/VIC/NSW/TAS lists"],
    },
    "Fishing & Pearling": {
      roles: ["Fishing deckhands", "Aquaculture workers", "Pearl farm workers"],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: ["Regional QLD/NT/WA lists"],
    },
    "Tree Farming & Felling": {
      roles: [
        "Planting/tending plantation trees",
        "Felling trees",
        "Transporting logs to mills",
      ],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: ["Regional QLD/NT/WA lists"],
    },
    "Mining": {
      roles: ["Coal miners", "Oil & gas workers", "Ore miners", "Quarry workers"],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: ["Regional QLD/NT/WA lists"],
    },
    "Construction": {
      roles: [
        "Residential/non-residential builders",
        "Heavy civil engineering",
        "Construction services",
      ],
      states: ["All"],
      areas: ["Regional"],
      postcodes: ["All"],
    },
    "Natural Disaster Recovery": {
      roles: [
        "Flood/cyclone clean-up",
        "Demolition",
        "Construction repairs",
        "Land clearing",
        "Community recovery",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
  },

  // --- 462 3rd Visa (6 months specified work) ---
  "462_3rd Visa (6 months specified work)": {
    "Plant & Animal Cultivation": {
      roles: [
        "Harvesting and/or packing of fruit and vegetable crops",
        "Pruning and trimming vines and trees (commercial horticulture)",
        "Maintaining crops",
        "Cultivating or propagating plants, fungi, or their products/parts",
        "Processing of plant products",
        "Maintaining animals for the purpose of selling them or their bodily produce (including natural increase)",
        "Processing of animal products (shearing, butchery, packing, tanning)",
        "Manufacturing dairy produce",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
    "Tourism & Hospitality": {
      roles: [
        "Hotel/motel/hostel staff",
        "Reception",
        "Housekeeping",
        "Chefs",
        "Waiters",
        "Bartenders",
        "Catering staff",
        "Tour guides",
        "Dive instructors",
        "Bus drivers",
        "Event/entertainment staff",
        "Gallery/museum staff",
        "Travel agents",
      ],
      states: [
        "Queensland",
        "Northern Territory",
        "Western Australia",
        "Tasmania",
        "South Australia",
        "Victoria",
        "New South Wales",
      ],
      areas: ["Northern", "Remote", "Very Remote"],
      postcodes: ["Regional QLD/NT/WA/SA/VIC/NSW/TAS lists"],
    },
    "Fishing & Pearling": {
      roles: ["Fishing deckhands", "Aquaculture workers", "Pearl farm workers"],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: ["Regional QLD/NT/WA lists"],
    },
    "Tree Farming & Felling": {
      roles: [
        "Planting/tending plantation trees",
        "Felling trees",
        "Transporting logs to mills",
      ],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: ["Regional QLD/NT/WA lists"],
    },
    "Mining": {
      roles: ["Coal miners", "Oil & gas workers", "Ore miners", "Quarry workers"],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: ["Regional QLD/NT/WA lists"],
    },
    "Construction": {
      roles: [
        "Residential/non-residential builders",
        "Heavy civil engineering",
        "Construction services",
      ],
      states: ["All"],
      areas: ["Regional"],
      postcodes: ["All"],
    },
    "Natural Disaster Recovery": {
      roles: [
        "Flood/cyclone clean-up",
        "Demolition",
        "Construction repairs",
        "Land clearing",
        "Community recovery",
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"],
    },
  },
};
// ==========================
// Component
// ==========================
const WHVWorkPreferences: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { visaType, visaStage } =
    (location.state as { visaType: string; visaStage: string }) || {
      visaType: "417",
      visaStage: "1st",
    };

  const getVisaSubclass = (type: string, stage: string): string => {
    if (type === "417" && stage === "1st") return "417_6-Month Exemption";
    if (type === "417" && stage === "2nd") return "417_2nd Visa (3 months specified work)";
    if (type === "417" && stage === "3rd") return "417_3rd Visa (6 months specified work)";
    if (type === "462" && stage === "1st") return "462_6-Month Exemption";
    if (type === "462" && stage === "2nd") return "462_2nd Visa (3 months specified work)";
    if (type === "462" && stage === "3rd") return "462_3rd Visa (6 months specified work)";
    return "";
  };

  const [visaSubclass] = useState<string>(getVisaSubclass(visaType, visaStage));
  const [tagline, setTagline] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [preferredStates, setPreferredStates] = useState<string[]>([]);
  const [preferredAreas, setPreferredAreas] = useState<string[]>([]);

  // ==========================
  // Toggle helpers
  // ==========================
  const toggleIndustry = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(selectedIndustries.filter((i) => i !== industry));
      setSelectedRoles(
        selectedRoles.filter(
          (role) => !whvIndustries[visaSubclass]?.[industry]?.roles.includes(role)
        )
      );
    } else if (selectedIndustries.length < 3) {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };

  const toggleRole = (role: string) =>
    setSelectedRoles(
      selectedRoles.includes(role)
        ? selectedRoles.filter((r) => r !== role)
        : [...selectedRoles, role]
    );

  const togglePreferredState = (state: string) =>
    setPreferredStates(
      preferredStates.includes(state)
        ? preferredStates.filter((s) => s !== state)
        : preferredStates.length < 3
        ? [...preferredStates, state]
        : preferredStates
    );

  const togglePreferredArea = (area: string) =>
    setPreferredAreas(
      preferredAreas.includes(area)
        ? preferredAreas.filter((a) => a !== area)
        : preferredAreas.length < 3
        ? [...preferredAreas, area]
        : preferredAreas
    );

  // ==========================
  // Save to Supabase
  // ==========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Save tagline
    await supabase.from("whv_maker").update({ tagline }).eq("user_id", user.id);

    // Save preferences
    for (const industry of selectedIndustries) {
      const { data: industryRow } = await supabase
        .from("industry")
        .select("industry_id")
        .eq("name", industry)
        .single();
      const industryId = industryRow?.industry_id || null;

      const rolesForIndustry = selectedRoles.filter((r) =>
        whvIndustries[visaSubclass]?.[industry]?.roles.includes(r)
      );

      if (rolesForIndustry.length === 0) {
        await supabase.from("maker_preference").insert(
          preferredStates.map((s) => ({
            user_id: user.id,
            state: s,
            industry_id: industryId,
            industry_role_id: null,
          }))
        );
      } else {
        for (const role of rolesForIndustry) {
          const { data: roleRow } = await supabase
            .from("industry_role")
            .select("industry_role_id")
            .eq("role", role)
            .single();
          const roleId = roleRow?.industry_role_id || null;
          await supabase.from("maker_preference").insert(
            preferredStates.map((s) => ({
              user_id: user.id,
              state: s,
              industry_id: industryId,
              industry_role_id: roleId,
            }))
          );
        }
      }
    }

    navigate("/whv/work-experience");
  };

  // ==========================
  // Render
  // ==========================
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
              <h1 className="text-lg font-medium text-gray-900">Work Preferences</h1>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <span className="text-sm font-medium text-gray-600">4/6</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <form onSubmit={handleSubmit} className="space-y-8 pb-20">
              {/* Tagline */}
              <div className="space-y-2">
                <Label>Profile Tagline *</Label>
                <Input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="h-12 bg-gray-100 border-0"
                  maxLength={60}
                />
              </div>

              {/* Industries */}
              <div className="space-y-3">
                <Label>Select up to 3 industries *</Label>
                <div className="max-h-48 overflow-y-auto border rounded-md p-2">
                  {whvIndustries[visaSubclass] &&
                    Object.keys(whvIndustries[visaSubclass]).map((industry) => (
                      <label key={industry} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedIndustries.includes(industry)}
                          disabled={
                            selectedIndustries.length >= 3 &&
                            !selectedIndustries.includes(industry)
                          }
                          onChange={() => toggleIndustry(industry)}
                          className="h-4 w-4"
                        />
                        <span className="text-sm text-gray-700">{industry}</span>
                      </label>
                    ))}
                </div>
              </div>

              {/* Roles */}
              {selectedIndustries.length > 0 && (
                <div className="space-y-3">
                  <Label>Select roles</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedIndustries.flatMap((industry) =>
                      whvIndustries[visaSubclass]?.[industry]?.roles?.map((role) => (
                        <button
                          type="button"
                          key={`${industry}-${role}`}
                          onClick={() => toggleRole(role)}
                          className={`px-3 py-1.5 rounded-full text-xs border ${
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

              {/* States */}
              <div className="space-y-3">
                <Label>Preferred States (up to 3) *</Label>
                <div className="max-h-48 overflow-y-auto border rounded-md p-2">
                  {australianStates.map((state) => (
                    <label key={state} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={preferredStates.includes(state)}
                        disabled={
                          preferredStates.length >= 3 &&
                          !preferredStates.includes(state)
                        }
                        onChange={() => togglePreferredState(state)}
                        className="h-4 w-4"
                      />
                      <span className="text-sm text-gray-700">{state}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Areas */}
              <div className="space-y-3">
                <Label>Preferred Areas (up to 3) *</Label>
                <div className="max-h-32 overflow-y-auto border rounded-md p-2">
                  {Object.values(AreaRestriction).map((area) => (
                    <label key={area} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={preferredAreas.includes(area)}
                        disabled={
                          preferredAreas.length >= 3 &&
                          !preferredAreas.includes(area)
                        }
                        onChange={() => togglePreferredArea(area)}
                        className="h-4 w-4"
                      />
                      <span className="text-sm text-gray-700">{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Continue */}
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
