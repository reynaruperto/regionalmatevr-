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

// ---------------------- Schema ----------------------
const formSchema = z.object({
  // Step 3
  businessName: z.string().min(2, { message: "Business name must be at least 2 characters." }),
  abn: z.string().min(11, { message: "ABN must be 11 digits." }).max(11, { message: "ABN must be 11 digits." }),
  businessPhone: z.string().min(10, { message: "Please enter a valid phone number." }),
  website: z.string().optional().or(z.literal("")),
  addressLine1: z.string().min(2, { message: "Address line 1 is required." }),
  addressLine2: z.string().optional(),
  suburbCity: z.string().min(2, { message: "Suburb/City is required." }),
  state: z.string().min(1, { message: "Please select a state." }),
  postCode: z.string().min(4, { message: "Please enter a valid post code." }).max(4, { message: "Post code must be 4 digits." }),

  // Step 4
  businessTagline: z.string().min(10, { message: "Please describe what your business does (minimum 10 characters)." }).max(200, { message: "Business tagline must be 200 characters or less." }),
  yearsInBusiness: z.string().min(1, { message: "Please select years in business." }),
  employeeCount: z.string().min(1, { message: "Please select number of employees." }),
  industryType: z.string().min(1, { message: "Please select an industry type." }),
  customIndustry: z.string().optional(),
  rolesOffered: z.array(z.string()).min(1, { message: "Please select at least one role." }),
  customRole: z.string().optional(),
  jobAvailability: z.array(z.string()).min(1, { message: "Please select at least one job availability type." }),
  payRangeMin: z.string().min(1, { message: "Enter min pay." }),
  payRangeMax: z.string().min(1, { message: "Enter max pay." }),
  facilitiesAndExtras: z.array(z.string()).min(1, { message: "Please select at least one facility or extra." })
});

type FormData = z.infer<typeof formSchema>;

// ---------------------- Options ----------------------
const INDUSTRY_OPTIONS = [
  "Agriculture & Farming",
  "Tourism & Hospitality",
  "Construction & Building",
  "Mining & Resources",
  "Healthcare & Aged Care",
  "Education & Training",
  "Retail & Sales",
  "Manufacturing",
  "Transport & Logistics",
  "Other"
];

const yearsOptions = ["Less than 1 year", "1 year", "2 years", "3 years", "4 years", "5 years", "6-10 years", "11-15 years", "16-20 years", "20+ years"];
const employeeCountOptions = ["1 employee", "2-5 employees", "6-10 employees", "11-20 employees", "21-50 employees", "51-100 employees", "100+ employees"];

const roles = ["Farm Worker", "Fruit Picker", "Kitchen Hand", "Waitstaff", "Cleaner", "Construction Worker", "Driver", "Sales Assistant", "Other"];
const jobAvailabilityOptions = ["Full-time", "Part-time", "Casual", "Seasonal", "Contract"];
const facilitiesExtras = ["Accommodation provided", "Meals included", "Transport provided", "Training provided", "Equipment provided", "Flexible hours", "Career progression", "Team environment"];
const AUSTRALIAN_STATES = ["Australian Capital Territory", "New South Wales", "Northern Territory", "Queensland", "South Australia", "Tasmania", "Victoria", "Western Australia"];

// ---------------------- Component ----------------------
const EditBusinessProfile: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const { register, handleSubmit, control, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rolesOffered: [],
      jobAvailability: [],
      facilitiesAndExtras: []
    }
  });

  const watchedIndustry = watch("industryType");
  const watchedRoles = watch("rolesOffered");

  const onSubmit = (data: FormData) => {
    console.log("Business profile updated:", data);
    toast({
      title: "Business Profile Updated",
      description: "Your business profile has been successfully updated"
    });
    navigate("/employer/dashboard");
  };

  const handleCancel = () => {
    navigate("/employer/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-background rounded-[48px] overflow-hidden relative">
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>

          <div className="w-full h-full flex flex-col relative bg-white">
            {/* Header */}
            <div className="px-6 pt-16 pb-4">
              <div className="flex items-center justify-between">
                <button onClick={handleCancel} className="text-[#1E293B] font-medium underline">Cancel</button>
                <h1 className="text-lg font-semibold text-gray-900">Edit Business Profile</h1>
                <button type="submit" form="business-profile-form" className="flex items-center text-[#1E293B] font-medium underline">
                  <Check size={16} className="mr-1" /> Save
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 px-6 overflow-y-auto">
              <form id="business-profile-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* ABN */}
                <div>
                  <Label className="text-gray-600 text-sm">ABN (Cannot be edited)</Label>
                  <div className="h-11 rounded-xl border border-gray-200 bg-gray-100 text-sm px-3 py-2 text-gray-500">11 222 333 444</div>
                  <p className="text-xs text-gray-500 mt-1">Contact support to change your ABN</p>
                </div>

                {/* Step 3 fields */}
                <Input {...register("businessName")} placeholder="Business Name" className="h-11 rounded-xl bg-gray-100" />
                <Input {...register("businessPhone")} placeholder="Business Phone" className="h-11 rounded-xl bg-gray-100" />
                <Input {...register("website")} placeholder="Website" className="h-11 rounded-xl bg-gray-100" />
                <Input {...register("addressLine1")} placeholder="Address Line 1" className="h-11 rounded-xl bg-gray-100" />
                <Input {...register("addressLine2")} placeholder="Address Line 2 (Optional)" className="h-11 rounded-xl bg-gray-100" />
                <Input {...register("suburbCity")} placeholder="Suburb/City" className="h-11 rounded-xl bg-gray-100" />
                <Select onValueChange={(value) => setValue("state", value)}><SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger><SelectContent>{AUSTRALIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
                <Input {...register("postCode")} placeholder="Post Code" className="h-11 rounded-xl bg-gray-100" maxLength={4} />

                {/* Step 4 fields */}
                <Input {...register("businessTagline")} placeholder="Business Tagline" className="h-11 rounded-xl bg-gray-100" />
                <Select onValueChange={(v) => setValue("yearsInBusiness", v)}><SelectTrigger><SelectValue placeholder="Years in Business" /></SelectTrigger><SelectContent>{yearsOptions.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent></Select>
                <Select onValueChange={(v) => setValue("employeeCount", v)}><SelectTrigger><SelectValue placeholder="Employee Count" /></SelectTrigger><SelectContent>{employeeCountOptions.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
                <Select onValueChange={(v) => { setValue("industryType", v); setSelectedIndustry(v); }}><SelectTrigger><SelectValue placeholder="Industry" /></SelectTrigger><SelectContent>{INDUSTRY_OPTIONS.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent></Select>
                {watchedIndustry === "Other" && <Input {...register("customIndustry")} placeholder="Custom Industry" className="h-11 rounded-xl bg-gray-100" />}
                
                {/* Roles */}
                <Controller name="rolesOffered" control={control} render={({ field }) => (
                  <>
                    <Select onValueChange={(value) => { const current = field.value || []; if (!current.includes(value)) field.onChange([...current, value]); }}>
                      <SelectTrigger><SelectValue placeholder="Select Roles" /></SelectTrigger>
                      <SelectContent>{roles.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                    </Select>
                    {watchedRoles?.includes("Other") && <Input {...register("customRole")} placeholder="Custom Role" className="h-11 rounded-xl bg-gray-100" />}
                  </>
                )} />

                {/* Job Availability */}
                <Controller name="jobAvailability" control={control} render={({ field }) => (
                  <Select onValueChange={(value) => { const current = field.value || []; if (!current.includes(value)) field.onChange([...current, value]); }}>
                    <SelectTrigger><SelectValue placeholder="Select Job Availability" /></SelectTrigger>
                    <SelectContent>{jobAvailabilityOptions.map(j => <SelectItem key={j} value={j}>{j}</SelectItem>)}</SelectContent>
                  </Select>
                )} />

                {/* Pay Range */}
                <div className="flex gap-2">
                  <Input {...register("payRangeMin")} placeholder="Min $" className="h-11 rounded-xl bg-gray-100" />
                  <Input {...register("payRangeMax")} placeholder="Max $" className="h-11 rounded-xl bg-gray-100" />
                </div>

                {/* Facilities */}
                <Controller name="facilitiesAndExtras" control={control} render={({ field }) => (
                  <Select onValueChange={(value) => { const current = field.value || []; if (!current.includes(value)) field.onChange([...current, value]); }}>
                    <SelectTrigger><SelectValue placeholder="Select Facilities & Extras" /></SelectTrigger>
                    <SelectContent>{facilitiesExtras.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                  </Select>
                )} />

                <div className="h-6"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBusinessProfile;
