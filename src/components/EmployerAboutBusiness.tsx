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
});

type FormData = z.infer<typeof formSchema>;

// ✅ Industries + roles (from WHV Home Affairs list)
const industries = [
  "Plant & Animal Cultivation",
  "Fishing & Pearling",
  "Tree Farming & Felling",
  "Mining",
  "Construction",
  "Tourism & Hospitality",
  "Natural Disaster Recovery",
  "Healthcare & Medical (Critical Sectors)",
];

const industryRoles: Record<string, string[]> = {
  "Plant & Animal Cultivation": ["Fruit Picker", "Packer", "Dairy Worker", "Livestock Worker", "Horse Breeder", "Reforestation Worker"],
  "Fishing & Pearling": ["Deckhand", "Aquaculture Worker", "Pearl Diver"],
  "Tree Farming & Felling": ["Tree Planter", "Logger", "Timber Transport Worker"],
  Mining: ["Driller", "Truck Driver", "Quarry Operator", "Exploration Worker"],
  Construction: ["Labourer", "Painter", "Scaffolder", "Site Cleaner"],
  "Tourism & Hospitality": ["Chef", "Bartender", "Waitstaff", "Housekeeper", "Tour Guide"],
  "Natural Disaster Recovery": ["Clean-up Crew", "Rebuilder", "Wildlife Carer"],
  "Healthcare & Medical (Critical Sectors)": ["Nurse", "Aged Care Worker", "Disability Support", "Childcare Worker", "Cleaner"],
};

// ✅ Job types
const jobTypes = ["Full-time", "Part-time", "Casual", "Seasonal", "Contract"];

// ✅ Pay ranges (AUD/hour, min $25/hr)
const payRanges = ["$25–30/hour", "$30–35/hour", "$35–40/hour", "$40–45/hour", "$45+/hour"];

// ✅ Facilities
const facilitiesExtras = [
  "Accommodation provided",
  "Meals included",
  "Transport provided",
  "Training provided",
  "Equipment provided",
  "Flexible hours",
  "Career progression",
  "Team environment",
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

  // ✅ Custom role handling
  const addCustomRole = () => setCustomRoles([...customRoles, ""]);
  const updateCustomRole = (i: number, value: string) => {
    const newRoles = [...customRoles];
    newRoles[i] = value;
    setCustomRoles(newRoles);
    const merged = [...watchedRoles.filter((r) => !customRoles.includes(r)), ...newRoles.filter((r) => r.trim() !== "")];
    setValue("rolesOffered", merged, { shouldValidate: true });
  };
  const removeCustomRole = (i: number) => {
    const newRoles = customRoles.filter((_, idx) => idx !== i);
    setCustomRoles(newRoles);
    const merged = watchedRoles.filter((r) => r !== customRoles[i]);
    setValue("rolesOffered", merged, { shouldValidate: true });
  };

  const onSubmit = (data: FormData) => {
    console.log("Business info submitted:", data);
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
                  <Label htmlFor="businessTagline">
                    Business Tagline <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="businessTagline"
                    placeholder="Quality produce, sustainable farming"
                    {...register("businessTagline")}
                    className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                  />
                  {errors.businessTagline && <p className="text-red-500 text-sm mt-1">{errors.businessTagline.message}</p>}
                </div>

                {/* Years in Business */}
                <div>
                  <Label>
                    Years in Business <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="yearsInBusiness"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-14 bg-gray-100 rounded-xl">
                          <SelectValue placeholder="Select years" />
                        </SelectTrigger>
                        <SelectContent>
                          {["<1", "1", "2", "3", "4", "5", "6-10", "11-15", "16-20", "20+"].map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.yearsInBusiness && <p className="text-red-500 text-sm mt-1">{errors.yearsInBusiness.message}</p>}
                </div>

                {/* Employee Count */}
                <div>
                  <Label>
                    Employees <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="employeeCount"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-14 bg-gray-100 rounded-xl">
                          <SelectValue placeholder="Select employees" />
                        </SelectTrigger>
                        <SelectContent>
                          {["1", "2-5", "6-10", "11-20", "21-50", "51-100", "100+"].map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.employeeCount && <p className="text-red-500 text-sm mt-1">{errors.employeeCount.message}</p>}
                </div>

                {/* Industry */}
                <div>
                  <Label>
                    Industry <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="industry"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-14 bg-gray-100 rounded-xl">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((ind) => (
                            <SelectItem key={ind} value={ind}>
                              {ind}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>}
                </div>

                {/* Roles Offered */}
                {watchedIndustry && (
                  <div>
                    <Label>
                      Roles Offered <span className="text-red-500">*</span>
                    </Label>
                    {industryRoles[watchedIndustry]?.map((role) => (
                      <label key={role} className="flex items-center space-x-2 mt-2 text-gray-700">
                        <input
                          type="checkbox"
                          value={role}
                          checked={watchedRoles.includes(role)}
                          onChange={(e) => {
                            const current = watchedRoles;
                            if (e.target.checked) setValue("rolesOffered", [...current, role]);
                            else setValue("rolesOffered", current.filter((r) => r !== role));
                          }}
                        />
                        <span>{role}</span>
                      </label>
                    ))}

                    {/* Custom roles */}
                    {customRoles.map((role, i) => (
                      <div key={i} className="flex items-center space-x-2 mt-2">
                        <Input
                          value={role}
                          onChange={(e) => updateCustomRole(i, e.target.value)}
                          placeholder="Enter custom role"
                          className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                        />
                        <Button type="button" variant="destructive" size="sm" onClick={() => removeCustomRole(i)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" className="mt-2" onClick={addCustomRole}>
                      + Add Another Role
                    </Button>
                    {errors.rolesOffered && <p className="text-red-500 text-sm mt-1">{errors.rolesOffered.message}</p>}
                  </div>
                )}

                {/* Job Type */}
                <div>
                  <Label>
                    Job Type <span className="text-red-500">*</span>
                  </Label>
                  {jobTypes.map((opt) => (
                    <label key={opt} className="flex items-center space-x-2 mt-2 text-gray-700">
                      <input
                        type="checkbox"
                        value={opt}
                        checked={watch("jobType")?.includes(opt)}
                        onChange={(e) => {
                          const current = watch("jobType") || [];
                          if (e.target.checked) setValue("jobType", [...current, opt]);
                          else setValue("jobType", current.filter((a) => a !== opt));
                        }}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                  {errors.jobType && <p className="text-red-500 text-sm mt-1">{errors.jobType.message}</p>}
                </div>

                {/* Pay Range */}
                <div>
                  <Label>
                    Pay Range <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="payRange"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-14 bg-gray-100 rounded-xl">
                          <SelectValue placeholder="Select pay range" />
                        </SelectTrigger>
                        <SelectContent>
                          {payRanges.map((range) => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.payRange && <p className="text-red-500 text-sm mt-1">{errors.payRange.message}</p>}
                </div>

                {/* Facilities */}
                <div>
                  <Label>
                    Facilities & Extras <span className="text-red-500">*</span>
                  </Label>
                  {facilitiesExtras.map((facility) => (
                    <label key={facility} className="flex items-center space-x-2 mt-2 text-gray-700">
                      <input
                        type="checkbox"
                        value={facility}
                        checked={watch("facilitiesAndExtras")?.includes(facility)}
                        onChange={(e) => {
                          const current = watch("facilitiesAndExtras") || [];
                          if (e.target.checked) setValue("facilitiesAndExtras", [...current, facility]);
                          else setValue("facilitiesAndExtras", current.filter((f) => f !== facility));
                        }}
                      />
                      <span>{facility}</span>
                    </label>
                  ))}
                  {errors.facilitiesAndExtras && <p className="text-red-500 text-sm mt-1">{errors.facilitiesAndExtras.message}</p>}
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


