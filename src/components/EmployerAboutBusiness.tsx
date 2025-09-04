import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// ✅ Schema
const formSchema = z.object({
  businessTagline: z.string().min(10, "Please enter at least 10 characters").max(200, "Max 200 characters"),
  yearsInBusiness: z.string().min(1, "Required"),
  employeeCount: z.string().min(1, "Required"),
  industry: z.string().min(1, "Required"),
  rolesOffered: z.array(z.string()).min(1, "Select at least one role"),
  jobType: z.array(z.string()).min(1, "Select at least one job type"),
  payRange: z.string().min(1, "Select a pay range"),
  facilitiesAndExtras: z.array(z.string()).min(1, "Select at least one facility"),
  customRole: z.string().optional(),
  customFacility: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

// ✅ Industry list
const industries = [
  "Plant & Animal Cultivation",
  "Health",
  "Aged & Disability Care",
  "Childcare",
  "Tourism & Hospitality",
  "Natural Disaster Recovery",
  "Fishing & Pearling",
  "Tree Farming & Felling",
  "Mining",
  "Construction",
];

// ✅ Full roles per industry
const industryRoles: Record<string, string[]> = {
  "Plant & Animal Cultivation": [
    "Harvesting & packing fruit/vegetable crops",
    "Pruning & trimming vines/trees (commercial horticulture)",
    "Cultivating/propagating plants, fungi, parts/products",
    "Maintaining crops",
    "Processing plant products",
    "Maintaining animals for sale/produce (including natural increase)",
    "Feeding/herding livestock",
    "Horse breeding and stud farming",
    "Shearing",
    "Butchery",
    "Packing & tanning animal products",
    "Manufacturing dairy produce",
    "Conservation & reforestation work",
    "Zoo work involving plant/animal cultivation",
  ],
  Health: [
    "Doctors",
    "Nurses",
    "Dentists & dental staff (clinical + admin)",
    "Allied health workers",
    "Medical imaging staff",
    "Mental health workers",
    "Radiology staff",
    "Installation/maintenance of complex medical machinery",
    "Hospital & healthcare cleaners",
    "Medical support & admin staff",
  ],
  "Aged & Disability Care": [
    "Aged care workers",
    "Disability carers",
    "Aged/disabled support workers",
    "Community care workers",
  ],
  Childcare: [
    "Daycare staff",
    "Nursery/crèche attendants",
    "Family day care workers",
    "Nannies / au pairs",
    "Out-of-school/vacation care staff",
    "Child protection / welfare staff",
  ],
  "Tourism & Hospitality": [
    "Hotel, motel, hostel, B&B staff",
    "Caravan park & camping ground staff",
    "Boarding house & reception centre staff",
    "Housekeeping staff",
    "Receptionists & guest service agents",
    "Chefs & cooks",
    "Waiters, bartenders & baristas",
    "Catering staff",
    "Pub/tavern/bar/hospitality club staff",
    "Tour guides & operators",
    "Adventure/outdoor instructors (e.g. dive instructors)",
    "Tourist transport workers (e.g. bus/tour drivers)",
    "Event & entertainment venue staff",
    "Gallery/museum workers, curators & guides",
    "Travel agents & tourist information staff",
  ],
  "Natural Disaster Recovery": [
    "Clean-up staff (wiping, hosing, mopping, rubbish removal)",
    "Demolition workers",
    "Land clearing & earthmoving staff",
    "Construction/repair workers (residential & non-residential)",
    "Road, bridge, railway, dam, irrigation, sewage, drainage repair staff",
    "Farm & wildlife recovery staff",
    "Animal carers (rescue, transport, management)",
    "Volunteer support staff",
    "Insurance & claims staff",
    "Call centre & admin recovery staff",
    "Government/community recovery coordinators",
    "Logistics staff (food/medication/essentials delivery)",
  ],
  "Fishing & Pearling": [
    "Fishing deckhands",
    "Aquaculture workers",
    "Pearl divers",
    "Pearl culturing workers",
  ],
  "Tree Farming & Felling": [
    "Planting/tending plantation/forest trees",
    "Felling plantation/forest trees",
    "Transporting logs to mills/processing facilities",
  ],
  Mining: [
    "Coal miners",
    "Oil & gas extraction workers",
    "Metal ore miners",
    "Quarry/construction material miners",
    "Non-metallic mineral miners",
    "Exploration staff",
    "Mining support staff",
  ],
  Construction: [
    "Residential builders",
    "Non-residential builders",
    "Heavy & civil engineering workers",
    "Land development/site prep staff",
    "Building structure workers",
    "Building installation workers",
    "Building completion staff",
    "Landscapers (on construction sites only)",
    "Painters (on construction sites only)",
    "Scaffolders",
    "Fencers",
  ],
};

const jobTypes = ["Full-time", "Part-time", "Casual", "Seasonal", "Contract"];
const payRanges = ["$25–30/hour", "$30–35/hour", "$35–40/hour", "$40–45/hour", "$45+/hour"];
const facilitiesExtras = [
  "Accommodation provided", "Meals included", "Transport provided",
  "Training provided", "Equipment provided", "Flexible hours",
  "Career progression", "Team environment", "Other"
];

const EmployerAboutBusiness: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [customRoles, setCustomRoles] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rolesOffered: [],
      jobType: [],
      facilitiesAndExtras: [],
    },
  });

  const watchedIndustry = watch("industry");
  const watchedRoles = watch("rolesOffered") || [];
  const watchedFacilities = watch("facilitiesAndExtras") || [];

  const onSubmit = (data: FormData) => {
    console.log("Business info submitted:", data);
    localStorage.setItem("aboutBusiness", JSON.stringify(data));
    toast({ title: "Business setup complete!", description: "Your employer profile has been created successfully" });
    navigate("/employer/photo-upload");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-background rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>

          <div className="w-full h-full flex flex-col relative bg-white">
            {/* Header */}
            <div className="px-6 pt-16 pb-6">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 bg-gray-100 rounded-xl shadow-sm"
                onClick={() => navigate("/business-registration")}
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </Button>
              <div className="flex items-center justify-between mt-6">
                <h1 className="text-2xl font-bold text-gray-900">About Your Business</h1>
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                  <span className="text-sm font-medium text-gray-600">4/5</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto px-6 pb-20">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Tagline */}
                <div>
                  <Label>Business Tagline</Label>
                  <Input placeholder="Quality produce, sustainable farming" {...register("businessTagline")} className="h-14 bg-gray-100 rounded-xl" />
                  {errors.businessTagline && <p className="text-red-500 text-sm">{errors.businessTagline.message}</p>}
                </div>

                {/* Years in Business */}
                <div>
                  <Label>Years in Business</Label>
                  <Controller
                    name="yearsInBusiness"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-14 bg-gray-100 rounded-xl"><SelectValue placeholder="Select years" /></SelectTrigger>
                        <SelectContent>
                          {["<1", "1", "2", "3", "4", "5", "6-10", "11-15", "16-20", "20+"].map(opt => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.yearsInBusiness && <p className="text-red-500 text-sm">{errors.yearsInBusiness.message}</p>}
                </div>

                {/* Employee Count */}
                <div>
                  <Label>Employees</Label>
                  <Controller
                    name="employeeCount"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-14 bg-gray-100 rounded-xl"><SelectValue placeholder="Select employees" /></SelectTrigger>
                        <SelectContent>
                          {["1", "2-5", "6-10", "11-20", "21-50", "51-100", "100+"].map(opt => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.employeeCount && <p className="text-red-500 text-sm">{errors.employeeCount.message}</p>}
                </div>

                {/* Industry */}
                <div>
                  <Label>Industry</Label>
                  <Controller
                    name="industry"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-14 bg-gray-100 rounded-xl"><SelectValue placeholder="Select industry" /></SelectTrigger>
                        <SelectContent>
                          {industries.map(ind => (
                            <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.industry && <p className="text-red-500 text-sm">{errors.industry.message}</p>}
                </div>

                {/* Roles */}
                {watchedIndustry && (
                  <div>
                    <Label>Roles Offered</Label>
                    <div className="max-h-48 overflow-y-auto border p-2 rounded-lg bg-gray-50">
                      {industryRoles[watchedIndustry]?.concat("Other").map(role => (
                        <label key={role} className="flex items-center space-x-2 mt-2">
                          <input
                            type="checkbox"
                            value={role}
                            checked={watchedRoles.includes(role)}
                            onChange={e => {
                              const current = watchedRoles;
                              if (e.target.checked) setValue("rolesOffered", [...current, role]);
                              else setValue("rolesOffered", current.filter(r => r !== role));
                            }}
                          />
                          <span>{role}</span>
                        </label>
                      ))}
                    </div>
                    {watchedRoles.includes("Other") && (
                      <Input placeholder="Enter custom role" {...register("customRole")} className="mt-2 h-14 bg-gray-100 rounded-xl" />
                    )}
                  </div>
                )}

                {/* Job Type */}
                <div>
                  <Label>Job Type</Label>
                  {jobTypes.map(type => (
                    <label key={type} className="flex items-center space-x-2 mt-2">
                      <input
                        type="checkbox"
                        value={type}
                        checked={watch("jobType")?.includes(type)}
                        onChange={e => {
                          const current = watch("jobType") || [];
                          if (e.target.checked) setValue("jobType", [...current, type]);
                          else setValue("jobType", current.filter(a => a !== type));
                        }}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>

                {/* Pay */}
                <div>
                  <Label>Pay Range</Label>
                  <Controller
                    name="payRange"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-14 bg-gray-100 rounded-xl"><SelectValue placeholder="Select pay" /></SelectTrigger>
                        <SelectContent>
                          {payRanges.map(range => (
                            <SelectItem key={range} value={range}>{range}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Facilities */}
                <div>
                  <Label>Facilities & Extras</Label>
                  {facilitiesExtras.map(facility => (
                    <label key={facility} className="flex items-center space-x-2 mt-2">
                      <input
                        type="checkbox"
                        value={facility}
                        checked={watchedFacilities.includes(facility)}
                        onChange={e => {
                          const current = watchedFacilities;
                          if (e.target.checked) setValue("facilitiesAndExtras", [...current, facility]);
                          else setValue("facilitiesAndExtras", current.filter(x => x !== facility));
                        }}
                      />
                      <span>{facility}</span>
                    </label>
                  ))}
                  {watchedFacilities.includes("Other") && (
                    <Input placeholder="Enter custom facility" {...register("customFacility")} className="mt-2 h-14 bg-gray-100 rounded-xl" />
                  )}
                </div>

                {/* Continue */}
                <div className="pt-8">
                  <Button type="submit" className="w-full h-14 text-lg rounded-xl bg-slate-800 text-white">
                    Continue
                  </Button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerAboutBusiness;



