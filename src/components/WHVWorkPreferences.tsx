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
// Full WHV Industries Dataset
// ==========================
const whvIndustries: Record<
  string,
  Record<
    string,
    { roles: string[]; states: string[]; areas: string[]; postcodes: string[] }
  >
> = {
  // --- 417 6-Month Exemption (10 industries) ---
  "417_6-Month Exemption": {
    "Plant & Animal Cultivation": {
      roles: [
        "Harvesting/packing fruit & vegetable crops",
        "pruning/trimming vines and trees (commercial horticulture)",
        "maintaining crops",
        "cultivating/propagating plants and fungi",
        "processing plant products",
        "maintaining animals for sale or produce",
        "processing animal products (shearing, butchery, packing, tanning)",
        "manufacturing dairy produce"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Health": {
      roles: [
        "Doctors",
        "nurses",
        "dentists and dental staff",
        "allied health workers",
        "medical support/admin roles",
        "medical imaging staff",
        "mental health staff",
        "radiology services staff",
        "installation/maintenance of medical machinery",
        "hospital/healthcare cleaning staff"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Aged & Disability Care": {
      roles: ["Disability carers", "aged care workers", "community support carers"],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Childcare": {
      roles: [
        "Daycare staff",
        "nursery/crèche attendants",
        "family day care workers",
        "nannies/au pairs",
        "out-of-school/vacation care staff",
        "child protection/welfare staff"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Tourism & Hospitality": {
      roles: [
        "Hotel/motel/hostel staff",
        "reception",
        "housekeeping",
        "chefs",
        "waiters",
        "bartenders",
        "catering staff",
        "tour guides",
        "dive instructors",
        "bus drivers",
        "event/entertainment staff",
        "gallery/museum staff",
        "travel agents"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Natural Disaster Recovery": {
      roles: [
        "Clean-up",
        "construction repairs",
        "demolition",
        "land clearing",
        "community recovery work"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Fishing & Pearling": {
      roles: ["Fishing deckhands", "aquaculture workers", "pearl farm workers"],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Tree Farming & Felling": {
      roles: [
        "Planting/tending plantation trees",
        "felling trees",
        "transporting logs to mills"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Mining": {
      roles: ["Coal miners", "oil & gas workers", "ore miners", "quarry workers"],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Construction": {
      roles: [
        "Residential builders",
        "non-residential builders",
        "heavy civil engineering staff",
        "construction services"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    }
  },

  // --- 462 6-Month Exemption (10 industries, same as 417) ---
  "462_6-Month Exemption": {
    // 👆 Duplicate all 10 industries from 417_6-Month Exemption
    "Plant & Animal Cultivation": { ... },
    "Health": { ... },
    "Aged & Disability Care": { ... },
    "Childcare": { ... },
    "Tourism & Hospitality": { ... },
    "Natural Disaster Recovery": { ... },
    "Fishing & Pearling": { ... },
    "Tree Farming & Felling": { ... },
    "Mining": { ... },
    "Construction": { ... }
  },
  // --- 417 2nd Visa (3 months specified work) ---
  "417_2nd Visa (3 months specified work)": {
    "Plant & Animal Cultivation": {
      roles: [
        "Harvesting/packing fruit & vegetable crops",
        "pruning/trimming vines and trees (commercial horticulture)",
        "cultivating plants and fungi",
        "maintaining crops",
        "processing plant products",
        "maintaining animals for sale or produce",
        "processing animal products (shearing, butchery, packing, tanning)",
        "manufacturing dairy produce"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Tourism & Hospitality": {
      roles: [
        "Hotel/motel/hostel staff",
        "reception",
        "housekeeping",
        "chefs",
        "waiters",
        "bartenders",
        "catering staff",
        "tour guides",
        "dive instructors",
        "bus drivers",
        "event/entertainment staff",
        "gallery/museum staff",
        "travel agents"
      ],
      states: [
        "Queensland",
        "Northern Territory",
        "Western Australia",
        "Tasmania",
        "South Australia",
        "Victoria",
        "New South Wales"
      ],
      areas: ["Northern", "Remote", "Very Remote"],
      postcodes: [
        "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
        "NT: All postcodes",
        "WA: 0872, 6121–6126, 6200–6799",
        "TAS: 7209, 7255–7257, 7321",
        "SA: 5220, 5222–5223, 5235, 5275, 5280, 5304, 5307, 5320, 5327, 5340, 5354, 5374, 5400, 5402, 5419, 5432, 5453–5455, 5470, 5473, 5495, 5501–5510, 5520–5734",
        "VIC: 3211–3334, 3340–3424, 3430–3649, 3658–3749, 3753, 3756, 3758, 3762, 3764, 3778–3781, 3783, 3797, 3799, 3810–3909, 3912–3921, 3926–3971, 3979, 3984",
        "NSW: 2311–2490, 2536–2551, 2575–2594, 2618–2739, 2787–2898"
      ]
    },
    "Fishing & Pearling": {
      roles: ["Fishing deckhands", "aquaculture workers", "pearl farm workers"],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: [
        "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
        "NT: All postcodes",
        "WA: 0872, 6121–6126, 6200–6799"
      ]
    },
    "Tree Farming & Felling": {
      roles: [
        "Planting/tending plantation trees",
        "felling trees",
        "transporting logs to mills"
      ],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: [
        "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
        "NT: All postcodes",
        "WA: 0872, 6121–6126, 6200–6799"
      ]
    },
    "Mining": {
      roles: ["Coal miners", "oil & gas workers", "ore miners", "quarry workers"],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: [
        "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
        "NT: All postcodes",
        "WA: 0872, 6121–6126, 6200–6799"
      ]
    },
    "Construction": {
      roles: [
        "Residential/non-residential builders",
        "heavy civil engineering",
        "construction services"
      ],
      states: ["All"],
      areas: ["Regional"],
      postcodes: ["All"]
    },
    "Bushfire Recovery": {
      roles: [
        "Rebuilding fences",
        "demolition",
        "land clearing",
        "replanting",
        "clearing debris"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: [
        "NSW: 2250–2251, 2256–2263, 2311–2490, 2536–2551, 2575–2594, 2618–2739, 2787–2898",
        "VIC: 3211–3334, 3340–3424, 3430–3649, 3658–3749, 3753, 3756, 3758, 3762, 3764, 3778–3781, 3783, 3797, 3799, 3810–3909, 3912–3921, 3926–3971, 3979, 3984",
        "ACT: All postcodes"
      ]
    },
    "Natural Disaster Recovery": {
      roles: [
        "Flood/cyclone clean-up",
        "demolition",
        "construction repairs",
        "land clearing",
        "community recovery"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    }
  },
  // --- 417 3rd Visa (6 months specified work) ---
  "417_3rd Visa (6 months specified work)": {
    "Plant & Animal Cultivation": {
      roles: [
        "Harvesting/packing fruit & vegetable crops",
        "pruning/trimming vines and trees (commercial horticulture)",
        "cultivating plants and fungi",
        "maintaining crops",
        "processing plant products",
        "maintaining animals for sale or produce",
        "processing animal products (shearing, butchery, packing, tanning)",
        "manufacturing dairy produce"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Tourism & Hospitality": {
      roles: [
        "Hotel/motel/hostel staff",
        "reception",
        "housekeeping",
        "chefs",
        "waiters",
        "bartenders",
        "catering staff",
        "tour guides",
        "dive instructors",
        "bus drivers",
        "event/entertainment staff",
        "gallery/museum staff",
        "travel agents"
      ],
      states: [
        "Queensland",
        "Northern Territory",
        "Western Australia",
        "New South Wales",
        "Victoria",
        "South Australia",
        "Tasmania"
      ],
      areas: ["Northern", "Remote", "Very Remote"],
      postcodes: [
        "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
        "NT: All postcodes",
        "WA: 0872, 6121–6126, 6200–6799",
        "NSW: 2311–2490, 2536–2551, 2575–2594, 2618–2739, 2787–2898",
        "VIC: 3211–3334, 3340–3424, 3430–3649, 3658–3749, 3753, 3756, 3758, 3762, 3764, 3778–3781, 3783, 3797, 3799, 3810–3909, 3912–3921, 3926–3971, 3979, 3984",
        "SA: 5220, 5222–5223, 5235, 5275, 5280, 5304, 5307, 5320, 5327, 5340, 5354, 5374, 5400, 5402, 5419, 5432, 5453–5455, 5470, 5473, 5495, 5501–5510, 5520–5734",
        "TAS: 7209, 7255–7257, 7321"
      ]
    },
    "Fishing & Pearling": {
      roles: ["Fishing deckhands", "aquaculture workers", "pearl farm workers"],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: [
        "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
        "NT: All postcodes",
        "WA: 0872, 6121–6126, 6200–6799"
      ]
    },
    "Tree Farming & Felling": {
      roles: [
        "Planting/tending plantation trees",
        "felling trees",
        "transporting logs to mills"
      ],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: [
        "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
        "NT: All postcodes",
        "WA: 0872, 6121–6126, 6200–6799"
      ]
    },
    "Mining": {
      roles: ["Coal miners", "oil & gas workers", "ore miners", "quarry workers"],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: [
        "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
        "NT: All postcodes",
        "WA: 0872, 6121–6126, 6200–6799"
      ]
    },
    "Construction": {
      roles: [
        "Residential/non-residential builders",
        "heavy civil engineering",
        "construction services"
      ],
      states: ["All"],
      areas: ["Regional"],
      postcodes: ["All"]
    },
    "Natural Disaster Recovery": {
      roles: [
        "Flood/cyclone clean-up",
        "demolition",
        "construction repairs",
        "land clearing",
        "community recovery"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    }
  },
  // --- 462 2nd Visa (3 months specified work) ---
  "462_2nd Visa (3 months specified work)": {
    "Plant & Animal Cultivation": {
      roles: [
        "Harvesting/packing fruit & vegetable crops",
        "pruning/trimming vines and trees (commercial horticulture)",
        "cultivating plants and fungi",
        "maintaining crops",
        "processing plant products",
        "maintaining animals for sale or produce",
        "processing animal products (shearing, butchery, packing, tanning)",
        "manufacturing dairy produce"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Tourism & Hospitality": {
      roles: [
        "Hotel/motel/hostel staff",
        "reception",
        "housekeeping",
        "chefs",
        "waiters",
        "bartenders",
        "catering staff",
        "tour guides",
        "dive instructors",
        "bus drivers",
        "event/entertainment staff",
        "gallery/museum staff",
        "travel agents"
      ],
      states: [
        "Queensland",
        "Northern Territory",
        "Western Australia",
        "Tasmania",
        "South Australia",
        "Victoria",
        "New South Wales"
      ],
      areas: ["Northern", "Remote", "Very Remote"],
      postcodes: [
        "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
        "NT: All postcodes",
        "WA: 0872, 6121–6126, 6200–6799",
        "TAS: 7209, 7255–7257, 7321",
        "SA: 5220, 5222–5223, 5235, 5275, 5280, 5304, 5307, 5320, 5327, 5340, 5354, 5374, 5400, 5402, 5419, 5432, 5453–5455, 5470, 5473, 5495, 5501–5510, 5520–5734",
        "VIC: 3211–3334, 3340–3424, 3430–3649, 3658–3749, 3753, 3756, 3758, 3762, 3764, 3778–3781, 3783, 3797, 3799, 3810–3909, 3912–3921, 3926–3971, 3979, 3984",
        "NSW: 2311–2490, 2536–2551, 2575–2594, 2618–2739, 2787–2898"
      ]
    },
    "Fishing & Pearling": {
      roles: ["Fishing deckhands", "aquaculture workers", "pearl farm workers"],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: [
        "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
        "NT: All postcodes",
        "WA: 0872, 6121–6126, 6200–6799"
      ]
    },
    "Tree Farming & Felling": {
      roles: [
        "Planting/tending plantation trees",
        "felling trees",
        "transporting logs to mills"
      ],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: [
        "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
        "NT: All postcodes",
        "WA: 0872, 6121–6126, 6200–6799"
      ]
    },
    "Mining": {
      roles: ["Coal miners", "oil & gas workers", "ore miners", "quarry workers"],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: [
        "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
        "NT: All postcodes",
        "WA: 0872, 6121–6126, 6200–6799"
      ]
    },
    "Construction": {
      roles: [
        "Residential/non-residential builders",
        "heavy civil engineering",
        "construction services"
      ],
      states: ["All"],
      areas: ["Regional"],
      postcodes: ["All"]
    },
    "Natural Disaster Recovery": {
      roles: [
        "Flood/cyclone clean-up",
        "demolition",
        "construction repairs",
        "land clearing",
        "community recovery"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    }
  },
  // --- 462 3rd Visa (6 months specified work) ---
  "462_3rd Visa (6 months specified work)": {
    "Plant & Animal Cultivation": {
      roles: [
        "Harvesting/packing fruit & vegetable crops",
        "pruning/trimming vines and trees (commercial horticulture)",
        "cultivating plants and fungi",
        "maintaining crops",
        "processing plant products",
        "maintaining animals for sale or produce",
        "processing animal products (shearing, butchery, packing, tanning)",
        "manufacturing dairy produce"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Tourism & Hospitality": {
      roles: [
        "Hotel/motel/hostel staff",
        "reception",
        "housekeeping",
        "chefs",
        "waiters",
        "bartenders",
        "catering staff",
        "tour guides",
        "dive instructors",
        "bus drivers",
        "event/entertainment staff",
        "gallery/museum staff",
        "travel agents"
      ],
      states: [
        "Queensland",
        "Northern Territory",
        "Western Australia",
        "Tasmania",
        "South Australia",
        "Victoria",
        "New South Wales"
      ],
      areas: ["Northern", "Remote", "Very Remote"],
      postcodes: [
        "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
        "NT: All postcodes",
        "WA: 0872, 6121–6126, 6200–6799",
        "TAS: 7209, 7255–7257, 7321",
        "SA: 5220, 5222–5223, 5235, 5275, 5280, 5304, 5307, 5320, 5327, 5340, 5354, 5374, 5400, 5402, 5419, 5432, 5453–5455, 5470, 5473, 5495, 5501–5510, 5520–5734",
        "VIC: 3211–3334, 3340–3424, 3430–3649, 3658–3749, 3753, 3756, 3758, 3762, 3764, 3778–3781, 3783, 3797, 3799, 3810–3909, 3912–3921, 3926–3971, 3979, 3984",
        "NSW: 2311–2490, 2536–2551, 2575–2594, 2618–2739, 2787–2898"
      ]
    },
    "Fishing & Pearling": {
      roles: ["Fishing deckhands", "aquaculture workers", "pearl farm workers"],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: [
        "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
        "NT: All postcodes",
        "WA: 0872, 6121–6126, 6200–6799"
      ]
    },
    "Tree Farming & Felling": {
      roles: [
        "Planting/tending plantation trees",
        "felling trees",
        "transporting logs to mills"
      ],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: [
        "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
        "NT: All postcodes",
        "WA: 0872, 6121–6126, 6200–6799"
      ]
    },
    "Mining": {
      roles: ["Coal miners", "oil & gas workers", "ore miners", "quarry workers"],
      states: ["Queensland", "Northern Territory", "Western Australia"],
      areas: ["Northern"],
      postcodes: [
        "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
        "NT: All postcodes",
        "WA: 0872, 6121–6126, 6200–6799"
      ]
    },
    "Construction": {
      roles: [
        "Residential/non-residential builders",
        "heavy civil engineering",
        "construction services"
      ],
      states: ["All"],
      areas: ["Regional"],
      postcodes: ["All"]
    },
    "Natural Disaster Recovery": {
      roles: [
        "Flood/cyclone clean-up",
        "demolition",
        "construction repairs",
        "land clearing",
        "community recovery"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    }
  }
}; // END of whvIndustries

// ==========================
// Main Component
// ==========================
const WHVWorkPreferences: React.FC = () => {
  const navigate = useNavigate();

  const [visaSubclass, setVisaSubclass] = useState<string>("417_2nd Visa (3 months specified work)");
  const [tagline, setTagline] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [preferredStates, setPreferredStates] = useState<string[]>([]);
  const [preferredAreas, setPreferredAreas] = useState<string[]>([]);

  // Toggle industries (max 3)
  const toggleIndustry = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(selectedIndustries.filter((i) => i !== industry));
      setSelectedRoles(
        selectedRoles.filter((role) => !whvIndustries[visaSubclass]?.[industry]?.roles.includes(role))
      );
    } else if (selectedIndustries.length < 3) {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };

  // Toggle roles
  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  // Toggle preferred states (max 3)
  const togglePreferredState = (state: string) => {
    if (preferredStates.includes(state)) {
      setPreferredStates(preferredStates.filter((s) => s !== state));
    } else if (preferredStates.length < 3) {
      setPreferredStates([...preferredStates, state]);
    }
  };

  // Toggle preferred areas (max 3)
  const togglePreferredArea = (area: string) => {
    if (preferredAreas.includes(area)) {
      setPreferredAreas(preferredAreas.filter((a) => a !== area));
    } else if (preferredAreas.length < 3) {
      setPreferredAreas([...preferredAreas, area]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Visa:", visaSubclass);
    console.log("Tagline:", tagline);
    console.log("Industries:", selectedIndustries);
    console.log("Roles:", selectedRoles);
    console.log("Preferred States:", preferredStates);
    console.log("Preferred Areas:", preferredAreas);
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
              <h1 className="text-lg font-medium text-gray-900">Work Preferences</h1>
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
                  Select up to 3 industries of interest <span className="text-red-500">*</span>
                </Label>
                <div className="max-h-48 overflow-y-auto border rounded-md p-2">
                  {Object.keys(whvIndustries[visaSubclass]).map((industry) => (
                    <label key={industry} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedIndustries.includes(industry)}
                        disabled={
                          selectedIndustries.length >= 3 && !selectedIndustries.includes(industry)
                        }
                        onChange={() => toggleIndustry(industry)}
                        className="h-4 w-4"
                      />
                      <span className="text-sm text-gray-700">{industry}</span>
                    </label>
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
                      whvIndustries[visaSubclass][industry].roles.map((role) => (
                        <button
                          type="button"
                          key={`${industry}-${role}`}
                          onClick={() => toggleRole(role)}
                          className={`px-3 py-1.5 rounded-full text-xs border transition ${
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

              {/* Preferred States */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">
                  Preferred Working States (up to 3) <span className="text-red-500">*</span>
                </Label>
                <div className="max-h-48 overflow-y-auto border rounded-md p-2">
                  {australianStates.map((state) => (
                    <label key={state} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={preferredStates.includes(state)}
                        disabled={
                          preferredStates.length >= 3 && !preferredStates.includes(state)
                        }
                        onChange={() => togglePreferredState(state)}
                        className="h-4 w-4"
                      />
                      <span className="text-sm text-gray-700">{state}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Preferred Areas */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">
                  Preferred Area Restrictions (up to 3) <span className="text-red-500">*</span>
                </Label>
                <div className="max-h-32 overflow-y-auto border rounded-md p-2">
                  {Object.values(AreaRestriction).map((area) => (
                    <label key={area} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={preferredAreas.includes(area)}
                        disabled={
                          preferredAreas.length >= 3 && !preferredAreas.includes(area)
                        }
                        onChange={() => togglePreferredArea(area)}
                        className="h-4 w-4"
                      />
                      <span className="text-sm text-gray-700">
                        {area === "All" && preferredStates.length > 0
                          ? preferredStates.map((s) => `Anywhere in ${s}`).join(", ")
                          : area}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tooltips */}
              {preferredStates.length > 0 &&
                preferredAreas.length > 0 &&
                selectedIndustries.length > 0 && (
                  <div className="space-y-2 bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm">
                    {selectedIndustries.map((industry) =>
                      preferredStates.map((state) =>
                        preferredAreas.map((area) => (
                          <p
                            key={`${industry}-${state}-${area}`}
                            className={`${
                              getIndustryTooltip(visaSubclass, industry, state, area).includes("⚠️")
                                ? "text-yellow-600"
                                : "text-green-600"
                            }`}
                          >
                            {getIndustryTooltip(visaSubclass, industry, state, area)}
                          </p>
                        ))
                      )
                    )}
                  </div>
                )}

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

