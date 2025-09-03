import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// ---------------- Schema ----------------
const formSchema = z.object({
  companyName: z.string().min(2, "Company name is required."),
  abn: z.string().min(11).max(11).regex(/^\d+$/, "ABN must be 11 digits."),
  businessTagline: z.string().min(10, "At least 10 characters.").max(200, "Max 200 characters."),
  yearsInBusiness: z.string().min(1, "Please select years in business."),
  employeeCount: z.string().min(1, "Please select employee count."),
  industry: z.string().min(1, "Please select an industry."),
  rolesOffered: z.array(z.string()).min(1, "Select at least one role."),
  jobType: z.array(z.string()).min(1, "Select at least one job type."),
  payRange: z.string().min(1, "Select a pay range."),
  facilitiesAndExtras: z.array(z.string()).min(1, "Select at least one facility."),
  businessPhone: z.string().min(10, "Enter a valid phone number."),
  website: z.string().optional().or(z.literal("")),
  addressLine1: z.string().min(2, "Address line 1 is required."),
  addressLine2: z.string().optional(),
  suburbCity: z.string().min(2, "Suburb / City is required."),
  state: z.string().min(1, "Select a state."),
  postCode: z.string().min(4).max(4, "Postcode must be 4 digits.").regex(/^\d+$/, "Must be numeric."),
});

type FormData = z.infer<typeof formSchema>;

// ---------------- Options ----------------
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

const jobTypes = ["Full-time", "Part-time", "Casual", "Seasonal", "Contract"];
const payRanges = ["$25–30/hour", "$30–35/hour", "$35–40/hour", "$40–45/hour", "$45+/hour"];
const facilitiesExtras = [
  "Accommodation provided", "Meals included", "Transport provided",
  "Training provided", "Equipment provided", "Flexible hours",
  "Career progression", "Team environment",
];
const yearsOptions = ["<1", "1", "2", "3", "4", "5", "6-10", "11-15", "16-20", "20+"];
const employeeCountOptions = ["1", "2-5", "6-10", "11-20", "21-50", "51-100", "100+"];
const AUSTRALIAN_STATES = [
  "Australian Capital Territory", "New South Wales", "Northern Territory",
  "Queensland", "South Australia", "Tasmania", "Victoria", "Western Australia",
];

// ---------------- Component ----------------
const EditBusinessProfile: React.FC = () => {
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

  const onSubmit = (data: FormData) => {
    console.log("Updated Business Profile:", data);
    toast({ title: "Profile Updated", description: "Your business profile has been updated." });
    navigate("/employer/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-background rounded-[48px] overflow-hidden relative">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>

          <div className="w-full h-full flex flex-col bg-white">
            {/* Header */}
            <div className="px-6 pt-16 pb-4">
              <div className="flex items-center justify-between">
                <button onClick={() => navigate("/employer/dashboard")} className="text-[#1E293B] underline">Cancel</button>
                <h1 className="text-lg font-semibold">Edit Business Profile</h1>
                <button type="submit" form="edit-business-form" className="flex items-center text-[#1E293B] underline">
                  <Check size={16} className="mr-1"/> Save
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 px-6 overflow-y-auto pb-20">
              <form id="edit-business-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* ABN (non-editable) */}
                <div>
                  <Label>ABN (non-editable)</Label>
                  <div className="h-14 bg-gray-100 rounded-xl flex items-center px-4 text-gray-500">11 222 333 444</div>
                  <p className="text-sm text-gray-500 mt-1">Contact support to update ABN</p>
                </div>

                {/* Company Name */}
                <div>
                  <Label>Company Name</Label>
                  <Input {...register("companyName")} className="h-14 bg-gray-100 rounded-xl" />
                  {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
                </div>

                {/* Tagline */}
                <div>
                  <Label>Business Tagline</Label>
                  <Input {...register("businessTagline")} className="h-14 bg-gray-100 rounded-xl" />
                  {errors.businessTagline && <p className="text-red-500 text-sm">{errors.businessTagline.message}</p>}
                </div>

                {/* Years */}
                <div>
                  <Label>Years in Business</Label>
                  <Controller
                    name="yearsInBusiness"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-14 bg-gray-100 rounded-xl"><SelectValue placeholder="Select years" /></SelectTrigger>
                        <SelectContent>{yearsOptions.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
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
                        <SelectContent>{employeeCountOptions.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
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
                        <SelectContent>{industries.map(ind => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}</SelectContent>
                      </Select>
                    )}
                  />
                  {errors.industry && <p className="text-red-500 text-sm">{errors.industry.message}</p>}
                </div>

                {/* Roles */}
                {watchedIndustry && (
                  <div>
                    <Label>Roles Offered</Label>
                    {industryRoles[watchedIndustry]?.map(role => (
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
                    {errors.rolesOffered && <p className="text-red-500 text-sm">{errors.rolesOffered.message}</p>}
                  </div>
                )}

                {/* Job Type */}
                <div>
                  <Label>Job Type</Label>
                  {jobTypes.map(t => (
                    <label key={t} className="flex items-center space-x-2 mt-2">
                      <input
                        type="checkbox"
                        value={t}
                        checked={watch("jobType")?.includes(t)}
                        onChange={e => {
                          const current = watch("jobType") || [];
                          if (e.target.checked) setValue("jobType", [...current, t]);
                          else setValue("jobType", current.filter(a => a !== t));
                        }}
                      />
                      <span>{t}</span>
                    </label>
                  ))}
                  {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType.message}</p>}
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
                        <SelectContent>{payRanges.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                      </Select>
                    )}
                  />
                  {errors.payRange && <p className="text-red-500 text-sm">{errors.payRange.message}</p>}
                </div>

                {/* Facilities */}
                <div>
                  <Label>Facilities & Extras</Label>
                  {facilitiesExtras.map(f => (
                    <label key={f} className="flex items-center space-x-2 mt-2">
                      <input
                        type="checkbox"
                        value={f}
                        checked={watch("facilitiesAndExtras")?.includes(f)}
                        onChange={e => {
                          const current = watch("facilitiesAndExtras") || [];
                          if (e.target.checked) setValue("facilitiesAndExtras", [...current, f]);
                          else setValue("facilitiesAndExtras", current.filter(x => x !== f));
                        }}
                      />
                      <span>{f}</span>
                    </label>
                  ))}
                  {errors.facilitiesAndExtras && <p className="text-red-500 text-sm">{errors.facilitiesAndExtras.message}</p>}
                </div>

                {/* Contact Info */}
                <div>
                  <Label>Business Phone</Label>
                  <Input {...register("businessPhone")} className="h-14 bg-gray-100 rounded-xl" />
                  {errors.businessPhone && <p className="text-red-500 text-sm">{errors.businessPhone.message}</p>}
                </div>

                <div>
                  <Label>Website</Label>
                  <Input {...register("website")} className="h-14 bg-gray-100 rounded-xl" />
                </div>

                {/* Address */}
                <div>
                  <Label>Address Line 1</Label>
                  <Input {...register("addressLine1")} className="h-14 bg-gray-100 rounded-xl" />
                </div>
                <div>
                  <Label>Address Line 2</Label>
                  <Input {...register("addressLine2")} className="h-14 bg-gray-100 rounded-xl" />
                </div>
                <div>
                  <Label>Suburb / City</Label>
                  <Input {...register("suburbCity")} className="h-14 bg-gray-100 rounded-xl" />
                </div>
                <div>
                  <Label>State</Label>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-14 bg-gray-100 rounded-xl"><SelectValue placeholder="Select state" /></SelectTrigger>
                        <SelectContent>{AUSTRALIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <Label>Postcode</Label>
                  <Input {...register("postCode")} maxLength={4} className="h-14 bg-gray-100 rounded-xl" />
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBusinessProfile;

