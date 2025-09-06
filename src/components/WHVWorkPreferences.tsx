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
// (to be completed in Stages 2–4)
// ==========================
const whvIndustries: Record<
  string,
  Record<
    string,
    { roles: string[]; states: string[]; areas: string[]; postcodes: string[] }
  >
> = {};

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
    },
    "Natural Disaster Recovery": {
      roles: [
        "Clean-up work (wiping down items, moving furniture, clearing debris)",
        "Construction repairs",
        "Demolition",
        "Land clearing",
        "Community recovery work"
      ],
      states: ["All"],
      areas: ["All"],
      postcodes: ["All"]
    },
    "Fishing & Pearling": {
      roles: [
        "Fishing deckhands (trawlers, longliners, net boats)",
        "Aquaculture workers",
        "Pearl farm workers"
      ],
      states: ["QLD", "NT", "WA"],
      areas: ["Northern Australia"],
      postcodes: [
        "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
        "NT: All postcodes",
        "WA: 0872, 6121–6126, 6200–6799"
      ]
    },
    "Tree Farming & Felling": {
      roles: [
        "Planting or tending trees in a plantation/forest",
        "Felling trees in a plantation or forest",
        "Transporting trees or parts of trees to the mill"
      ],
      states: ["QLD", "NT", "WA"],
      areas: ["Northern Australia"],
      postcodes: [
        "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
        "NT: All postcodes",
        "WA: 0872, 6121–6126, 6200–6799"
      ]
    },
    "Mining": {
      roles: [
        "Coal mining",
        "Oil and gas extraction",
        "Metal ore mining",
        "Quarrying and construction material mining"
      ],
      states: ["QLD", "NT", "WA"],
      areas: ["Northern Australia"],
      postcodes: [
        "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
        "NT: All postcodes",
        "WA: 0872, 6121–6126, 6200–6799"
      ]
    },
    "Construction": {
      roles: [
        "Residential building construction",
        "Non-residential building construction",
        "Heavy and civil engineering construction",
        "Construction services"
      ],
      states: ["QLD", "NT", "WA"],
      areas: ["Northern Australia"],
      postcodes: [
        "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
        "NT: All postcodes",
        "WA: 0872, 6121–6126, 6200–6799"
      ]
    }
  },
};
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
  },
  "Natural Disaster Recovery": {
    roles: [
      "Clean-up work (wiping down items, moving furniture, clearing debris)",
      "Construction repairs",
      "Demolition",
      "Land clearing",
      "Community recovery work"
    ],
    states: ["All"],
    areas: ["All"],
    postcodes: ["All"]
  },
  "Fishing & Pearling": {
    roles: [
      "Fishing deckhands (trawlers, longliners, net boats)",
      "Aquaculture workers",
      "Pearl farm workers"
    ],
    states: ["QLD", "NT", "WA"],
    areas: ["Northern Australia"],
    postcodes: [
      "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "NT: All postcodes",
      "WA: 0872, 6121–6126, 6200–6799"
    ]
  },
  "Tree Farming & Felling": {
    roles: [
      "Planting or tending trees in a plantation/forest",
      "Felling trees in a plantation or forest",
      "Transporting trees or parts of trees to the mill"
    ],
    states: ["QLD", "NT", "WA"],
    areas: ["Northern Australia"],
    postcodes: [
      "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "NT: All postcodes",
      "WA: 0872, 6121–6126, 6200–6799"
    ]
  },
  "Mining": {
    roles: [
      "Coal mining",
      "Oil and gas extraction",
      "Metal ore mining",
      "Quarrying and construction material mining"
    ],
    states: ["QLD", "NT", "WA"],
    areas: ["Northern Australia"],
    postcodes: [
      "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "NT: All postcodes",
      "WA: 0872, 6121–6126, 6200–6799"
    ]
  },
  "Construction": {
    roles: [
      "Residential building construction",
      "Non-residential building construction",
      "Heavy and civil engineering construction",
      "Construction services"
    ],
    states: ["QLD", "NT", "WA"],
    areas: ["Northern Australia"],
    postcodes: [
      "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "NT: All postcodes",
      "WA: 0872, 6121–6126, 6200–6799"
    ]
  }
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
      "Manufacturing dairy produce"
    ],
    states: ["All"],
    areas: ["Regional Australia"],
    postcodes: [
      "NSW: 2250–2251, 2256–2263, 2311–2490, 2536–2551, 2575–2594, 2618–2739, 2787–2898",
      "VIC: 3211–3334, 3340–3424, 3430–3649, 3658–3749, 3753, 3756, 3758, 3762, 3764, 3778–3781, 3783, 3797, 3799, 3810–3909, 3912–3921, 3926–3971, 3979, 3984",
      "QLD: 4124–4125, 4133, 4211, 4270, 4272, 4275, 4280, 4285, 4287, 4307, 4309, 4310, 4313, 4340, 4342, 4345–4346, 4350–4352, 4355–4359, 4361–4362, 4364–4365, 4370–4375, 4380–4383, 4385, 4400–4407, 4410–4413, 4415–4420, 4422–4424, 4426–4428, 4454–4471, 4472, 4474–4478, 4480–4498, 4507, 4515, 4517–4519, 4521, 4550–4551, 4553–4562, 4565–4575, 4580, 4581, 4600–4601, 4605–4612, 4614–4618, 4620–4621, 4625–4630, 4650, 4655, 4659–4662, 4670–4678, 4694–4698, 4700–4717, 4720–4728, 4730–4732, 4735–4746, 4754, 4800–4812, 4814–4825, 4828–4830, 4849–4850, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "SA: 5220–5734",
      "WA: 6041–6044, 6055, 6069, 6076, 6083–6084, 6111, 6121–6126, 6200–6799",
      "TAS: 7017, 7030, 7054, 7056, 7070, 7072–7999, 7209, 7255–7257, 7321",
      "NT: All postcodes",
      "ACT: None"
    ]
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
    states: ["QLD", "NT", "WA", "TAS", "SA", "VIC", "NSW"],
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
    roles: [
      "Fishing deckhands (trawlers, longliners, net boats)",
      "Aquaculture workers",
      "Pearl farm workers"
    ],
    states: ["QLD", "NT", "WA"],
    areas: ["Northern"],
    postcodes: [
      "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "NT: All postcodes",
      "WA: 0872, 6121–6126, 6200–6799"
    ]
  },
  "Tree Farming & Felling": {
    roles: [
      "Planting or tending trees in a plantation/forest",
      "Felling trees in a plantation or forest",
      "Transporting trees or parts of trees to the mill"
    ],
    states: ["QLD", "NT", "WA"],
    areas: ["Northern"],
    postcodes: [
      "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "NT: All postcodes",
      "WA: 0872, 6121–6126, 6200–6799"
    ]
  },
  "Mining": {
    roles: [
      "Coal mining",
      "Oil and gas extraction",
      "Metal ore mining",
      "Quarrying and construction material mining"
    ],
    states: ["QLD", "NT", "WA"],
    areas: ["Northern"],
    postcodes: [
      "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "NT: All postcodes",
      "WA: 0872, 6121–6126, 6200–6799"
    ]
  },
  "Construction": {
    roles: [
      "Residential building construction",
      "Non-residential building construction",
      "Heavy and civil engineering construction",
      "Construction services"
    ],
    states: ["All"],
    areas: ["Regional Australia"],
    postcodes: ["All"]
  },
  "Bushfire Recovery": {
    roles: [
      "Rebuilding fences",
      "Demolition",
      "Land clearing",
      "Replanting",
      "Clearing debris"
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
      "Flood and cyclone clean-up",
      "Demolition",
      "Construction repairs",
      "Land clearing",
      "Community recovery work"
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
    areas: ["Regional Australia"],
    postcodes: [
      "NSW: 2250–2251, 2256–2263, 2311–2490, 2536–2551, 2575–2594, 2618–2739, 2787–2898",
      "VIC: 3211–3334, 3340–3424, 3430–3649, 3658–3749, 3753, 3756, 3758, 3762, 3764, 3778–3781, 3783, 3797, 3799, 3810–3909, 3912–3921, 3926–3971, 3979, 3984",
      "QLD: 4124–4125, 4133, 4211, 4270, 4272, 4275, 4280, 4285, 4287, 4307, 4309, 4310, 4313, 4340, 4342, 4345–4346, 4350–4352, 4355–4359, 4361–4362, 4364–4365, 4370–4375, 4380–4383, 4385, 4400–4407, 4410–4413, 4415–4420, 4422–4424, 4426–4428, 4454–4471, 4472, 4474–4478, 4480–4498, 4507, 4515, 4517–4519, 4521, 4550–4551, 4553–4562, 4565–4575, 4580, 4581, 4600–4601, 4605–4612, 4614–4618, 4620–4621, 4625–4630, 4650, 4655, 4659–4662, 4670–4678, 4694–4698, 4700–4717, 4720–4728, 4730–4732, 4735–4746, 4754, 4800–4812, 4814–4825, 4828–4830, 4849–4850, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "SA: 5220–5734",
      "WA: 6041–6044, 6055, 6069, 6076, 6083–6084, 6111, 6121–6126, 6200–6799",
      "TAS: 7017, 7030, 7054, 7056, 7070, 7072–7999, 7209, 7255–7257, 7321",
      "NT: All postcodes",
      "ACT: None"
    ]
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
    states: ["QLD", "NT", "WA", "NSW", "VIC", "SA", "TAS"],
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
    roles: [
      "Fishing deckhands (trawlers, longliners, net boats)",
      "Aquaculture workers",
      "Pearl farm workers"
    ],
    states: ["QLD", "NT", "WA"],
    areas: ["Northern"],
    postcodes: [
      "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "NT: All postcodes",
      "WA: 0872, 6121–6126, 6200–6799"
    ]
  },
  "Tree Farming & Felling": {
    roles: [
      "Planting or tending trees in a plantation/forest",
      "Felling trees in a plantation or forest",
      "Transporting trees or parts of trees to the mill"
    ],
    states: ["QLD", "NT", "WA"],
    areas: ["Northern"],
    postcodes: [
      "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "NT: All postcodes",
      "WA: 0872, 6121–6126, 6200–6799"
    ]
  },
  "Mining": {
    roles: [
      "Coal mining",
      "Oil and gas extraction",
      "Metal ore mining",
      "Quarrying and construction material mining"
    ],
    states: ["QLD", "NT", "WA"],
    areas: ["Northern"],
    postcodes: [
      "QLD: 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "NT: All postcodes",
      "WA: 0872, 6121–6126, 6200–6799"
    ]
  },
  "Construction": {
    roles: [
      "Residential building construction",
      "Non-residential building construction",
      "Heavy and civil engineering construction",
      "Construction services"
    ],
    states: ["All"],
    areas: ["Regional Australia"],
    postcodes: ["All"]
  },
  "Natural Disaster Recovery": {
    roles: [
      "Flood and cyclone clean-up",
      "Demolition",
      "Construction repairs",
      "Land clearing",
      "Community recovery work"
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
    areas: ["Regional Australia"],
    postcodes: [
      "NSW: 2311–2312, 2328, 2336, 2338, 2340, 2350, 2352, 2354, 2356–2357, 2360, 2365, 2369, 2370, 2379–2382, 2386–2387, 2395, 2397, 2401, 2404–2406, 2409–2411, 2415, 2421–2423, 2425, 2427–2429, 2439, 2446–2449, 2452–2454, 2456, 2460, 2462–2463, 2465–2466, 2469–2471, 2474–2476, 2480, 2482–2484, 2486–2490",
      "VIC: 3211–3334, 3340–3424, 3430–3649, 3658–3749, 3753, 3756, 3758, 3762, 3764, 3778–3781, 3783, 3797, 3799, 3810–3909, 3912–3921, 3926–3971, 3979, 3984",
      "QLD: 4124–4125, 4133, 4211, 4270, 4272, 4275, 4280, 4285, 4287, 4307, 4309, 4310, 4313, 4340, 4342, 4345–4346, 4350–4352, 4355–4359, 4361–4362, 4364–4365, 4370–4375, 4380–4383, 4385, 4400–4407, 4410–4413, 4415–4420, 4422–4424, 4426–4428, 4454–4471, 4472, 4474–4478, 4480–4498, 4507, 4515, 4517–4519, 4521, 4550–4551, 4553–4562, 4565–4575, 4580, 4581, 4600–4601, 4605–4612, 4614–4618, 4620–4621, 4625–4630, 4650, 4655, 4659–4662, 4670–4678, 4694–4698, 4700–4717, 4720–4728, 4730–4732, 4735–4746, 4754, 4800–4812, 4814–4825, 4828–4830, 4849–4850, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "SA: 5220–5734",
      "WA: 6041–6044, 6055, 6069, 6076, 6083–6084, 6111, 6121–6126, 6200–6799",
      "TAS: 7017, 7030, 7054, 7056, 7070, 7072–7999, 7209, 7255–7257, 7321",
      "NT: All postcodes"
    ]
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
    states: ["QLD", "NT", "WA", "NSW", "VIC", "SA", "TAS"],
    areas: ["Northern Australia", "Remote Australia", "Very Remote Australia"],
    postcodes: [
      "NT: All postcodes",
      "QLD (Northern): 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "WA: 0872, 6121–6126, 6200–6799",
      "TAS: 7209, 7255–7257, 7321",
      "SA: 5220–5734",
      "VIC: 3211–3334, 3340–3424, 3430–3649, 3658–3749, 3753, 3756, 3758, 3762, 3764, 3778–3781, 3783, 3797, 3799, 3810–3909, 3912–3921, 3926–3971, 3979, 3984",
      "NSW: 2311–2490, 2536–2551, 2575–2594, 2618–2739, 2787–2898"
    ]
  },
  "Fishing & Pearling": {
    roles: [
      "Fishing deckhands (trawlers, longliners, net boats)",
      "Aquaculture workers",
      "Pearl farm workers"
    ],
    states: ["QLD", "NT", "WA"],
    areas: ["Northern Australia"],
    postcodes: [
      "NT: All postcodes",
      "QLD (Northern): 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "WA: 0872, 6121–6126, 6200–6799"
    ]
  },
  "Tree Farming & Felling": {
    roles: [
      "Planting or tending trees in a plantation/forest",
      "Felling trees in a plantation or forest",
      "Transporting trees or parts of trees to the mill"
    ],
    states: ["QLD", "NT", "WA"],
    areas: ["Northern Australia"],
    postcodes: [
      "NT: All postcodes",
      "QLD (Northern): 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "WA: 0872, 6121–6126, 6200–6799"
    ]
  },
  "Mining": {
    roles: [
      "Coal mining",
      "Oil and gas extraction",
      "Metal ore mining",
      "Quarrying and construction material mining"
    ],
    states: ["QLD", "NT", "WA"],
    areas: ["Northern Australia"],
    postcodes: [
      "NT: All postcodes",
      "QLD (Northern): 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "WA: 0872, 6121–6126, 6200–6799"
    ]
  },
  "Construction": {
    roles: [
      "Residential building construction",
      "Non-residential building construction",
      "Heavy and civil engineering construction",
      "Construction services"
    ],
    states: ["All"],
    areas: ["Regional Australia"],
    postcodes: ["All"]
  },
  "Natural Disaster Recovery": {
    roles: [
      "Flood and cyclone clean-up",
      "Demolition",
      "Construction repairs",
      "Land clearing",
      "Community recovery work"
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
    areas: ["Regional Australia"],
    postcodes: [
      "NSW: 2311–2312, 2328, 2336, 2338, 2340, 2350, 2352, 2354, 2356–2357, 2360, 2365, 2369, 2370, 2379–2382, 2386–2387, 2395, 2397, 2401, 2404–2406, 2409–2411, 2415, 2421–2423, 2425, 2427–2429, 2439, 2446–2449, 2452–2454, 2456, 2460, 2462–2463, 2465–2466, 2469–2471, 2474–2476, 2480, 2482–2484, 2486–2490",
      "VIC: 3211–3334, 3340–3424, 3430–3649, 3658–3749, 3753, 3756, 3758, 3762, 3764, 3778–3781, 3783, 3797, 3799, 3810–3909, 3912–3921, 3926–3971, 3979, 3984",
      "QLD: 4124–4125, 4133, 4211, 4270, 4272, 4275, 4280, 4285, 4287, 4307, 4309, 4310, 4313, 4340, 4342, 4345–4346, 4350–4352, 4355–4359, 4361–4362, 4364–4365, 4370–4375, 4380–4383, 4385, 4400–4407, 4410–4413, 4415–4420, 4422–4424, 4426–4428, 4454–4471, 4472, 4474–4478, 4480–4498, 4507, 4515, 4517–4519, 4521, 4550–4551, 4553–4562, 4565–4575, 4580, 4581, 4600–4601, 4605–4612, 4614–4618, 4620–4621, 4625–4630, 4650, 4655, 4659–4662, 4670–4678, 4694–4698, 4700–4717, 4720–4728, 4730–4732, 4735–4746, 4754, 4800–4812, 4814–4825, 4828–4830, 4849–4850, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "SA: 5220–5734",
      "WA: 6041–6044, 6055, 6069, 6076, 6083–6084, 6111, 6121–6126, 6200–6799",
      "TAS: 7017, 7030, 7054, 7056, 7070, 7072–7999, 7209, 7255–7257, 7321",
      "NT: All postcodes"
    ]
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
    states: ["QLD", "NT", "WA", "NSW", "VIC", "SA", "TAS"],
    areas: ["Northern Australia", "Remote Australia", "Very Remote Australia"],
    postcodes: [
      "NT: All postcodes",
      "QLD (Northern): 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "WA: 0872, 6121–6126, 6200–6799",
      "TAS: 7209, 7255–7257, 7321",
      "SA: 5220–5734",
      "VIC: 3211–3334, 3340–3424, 3430–3649, 3658–3749, 3753, 3756, 3758, 3762, 3764, 3778–3781, 3783, 3797, 3799, 3810–3909, 3912–3921, 3926–3971, 3979, 3984",
      "NSW: 2311–2490, 2536–2551, 2575–2594, 2618–2739, 2787–2898"
    ]
  },
  "Fishing & Pearling": {
    roles: [
      "Fishing deckhands (trawlers, longliners, net boats)",
      "Aquaculture workers",
      "Pearl farm workers"
    ],
    states: ["QLD", "NT", "WA"],
    areas: ["Northern Australia"],
    postcodes: [
      "NT: All postcodes",
      "QLD (Northern): 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "WA: 0872, 6121–6126, 6200–6799"
    ]
  },
  "Tree Farming & Felling": {
    roles: [
      "Planting or tending trees in a plantation/forest",
      "Felling trees in a plantation or forest",
      "Transporting trees or parts of trees to the mill"
    ],
    states: ["QLD", "NT", "WA"],
    areas: ["Northern Australia"],
    postcodes: [
      "NT: All postcodes",
      "QLD (Northern): 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "WA: 0872, 6121–6126, 6200–6799"
    ]
  },
  "Mining": {
    roles: [
      "Coal mining",
      "Oil and gas extraction",
      "Metal ore mining",
      "Quarrying and construction material mining"
    ],
    states: ["QLD", "NT", "WA"],
    areas: ["Northern Australia"],
    postcodes: [
      "NT: All postcodes",
      "QLD (Northern): 4472, 4478, 4481–4482, 4680, 4694–4707, 4709–4712, 4717, 4720–4721, 4737, 4800–4816, 4819–4825, 4828–4830, 4849, 4852, 4854–4861, 4865, 4868–4888, 4890–4895",
      "WA: 0872, 6121–6126, 6200–6799"
    ]
  },
  "Construction": {
    roles: [
      "Residential building construction",
      "Non-residential building construction",
      "Heavy and civil engineering construction",
      "Construction services"
    ],
    states: ["All"],
    areas: ["Regional Australia"],
    postcodes: ["All"]
  },
  "Natural Disaster Recovery": {
    roles: [
      "Flood and cyclone clean-up",
      "Demolition",
      "Construction repairs",
      "Land clearing",
      "Community recovery work"
    ],
    states: ["All"],
    areas: ["All"],
    postcodes: ["All"]
  }
},
// ==========================
// Props Interface
// ==========================
interface WHVWorkPreferencesProps {
  visaType: string;
  visaStage: string;
}

// ==========================
// Main Component
// ==========================
const WHVWorkPreferences: React.FC<WHVWorkPreferencesProps> = ({
  visaType,
  visaStage,
}) => {
  const navigate = useNavigate();

  // Map the visa type and stage to the correct key in whvIndustries
  const getVisaSubclass = (type: string, stage: string): string => {
    if (type === "417" && stage === "1st") return "417_6-Month Exemption";
    if (type === "417" && stage === "2nd") return "417_2nd Visa (3 months specified work)";
    if (type === "417" && stage === "3rd") return "417_3rd Visa (6 months specified work)";
    if (type === "462" && stage === "1st") return "462_6-Month Exemption";
    if (type === "462" && stage === "2nd") return "462_2nd Visa (3 months specified work)";
    if (type === "462" && stage === "3rd") return "462_3rd Visa (6 months specified work)";
    // fallback
    return `${type}_${stage}`;
  };

  const [visaSubclass] = useState<string>(getVisaSubclass(visaType, visaStage));

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
        selectedRoles.filter(
          (role) =>
            !whvIndustries[visaSubclass]?.[industry]?.roles.includes(role)
        )
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
                <div className="max-h-48 overflow-y-auto border rounded-md p-2">
                  {whvIndustries[visaSubclass] ? Object.keys(whvIndustries[visaSubclass]).map((industry) => (
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
                  )) : (
                    <div className="text-sm text-gray-500 p-2">
                      No industries available for the selected visa type.
                    </div>
                  )}
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
                      whvIndustries[visaSubclass]?.[industry]?.roles?.map((role) => (
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
                  Preferred Working States (up to 3){" "}
                  <span className="text-red-500">*</span>
                </Label>
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

              {/* Preferred Areas */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">
                  Preferred Area Restrictions (up to 3){" "}
                  <span className="text-red-500">*</span>
                </Label>
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
                              getIndustryTooltip(
                                visaSubclass,
                                industry,
                                state,
                                area
                              ).includes("⚠️")
                                ? "text-yellow-600"
                                : "text-green-600"
                            }`}
                          >
                            {getIndustryTooltip(
                              visaSubclass,
                              industry,
                              state,
                              area
                            )}
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

