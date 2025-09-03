import React from "react";
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

// ✅ Shared constants
const INDUSTRY_OPTIONS = [
  "Agriculture & Farming",
  "Tourism & Hospitality",
  "Construction & Building",
  "Mining & Resources",
  "Healthcare & Aged Care",
  "Other",
];

const ROLE_OPTIONS = [
  "Farm Worker",
  "Fruit Picker",
  "Kitchen Hand",
  "Waitstaff",
  "Cleaner",
  "Construction Worker",
  "Driver",
  "Other",
];

const JOB_AVAILABILITY = ["Full-time", "Part-time", "Casual", "Seasonal", "Contract"];

const FACILITIES = [
  "Accommodation provided",
  "Meals included",
  "Transport provided",
  "Training provided",
  "Equipment provided",
  "Flexible hours",
  "Career progression",
  "Team environment",
];

// ✅ Shared schema
const formSchema = z.object({
  businessTagline: z.string().min(10, "Please describe your business (min 10 chars)").max(200),
  yearsInBusiness: z.string().min(1, "Please select years in business."),
  employeeCount: z.string().min(1, "Please select number of employees."),
  industry: z.string().min(1, "Please select an industry."),
  customIndustry: z.string().optional(),
  rolesOffered: z.array(z.string()).min(1, "Please select at least one role."),
  customRole: z.string().optional(),
  jobAvailability: z.array(z.string()).min(1, "Please select availability."),
  payMin: z.string().min(1, "Enter min pay."),
  payMax: z.string().min(1, "Enter max pay."),
  facilitiesAndExtras: z.array(z.string()).min(1, "Select at least one facility."),
});

type FormData = z.infer<typeof formSchema>;

const EmployerAboutBusiness: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rolesOffered: [],
      jobAvailability: [],
      facilitiesAndExtras: [],
    },
  });

  const watchedIndustry = watch("industry");
  const watchedRoles = watch("rolesOffered");

  const onSubmit = (data: FormData) => {
    console.log("Step 4 submitted:", data);
    toast({ title: "Business details saved", description: "Proceeding to photo upload" });
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
              <div className="flex items-center justify-between mb-8">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 bg-gray-100 rounded-xl shadow-sm"
                  onClick={() => navigate("/business-registration")}
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </Button>
                <div className="flex-1"></div>
              </div>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">About Your Business</h1>
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                    <span className="text-sm font-medium text-gray-600">4/5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto px-6 pb-20">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Tagline */}
                <div>
                  <Label htmlFor="businessTagline">Business Tagline *</Label>
                  <Input id="businessTagline" placeholder="Sustainable farming, local produce" {...register("businessTagline")} />
                  {errors.businessTagline && <p className="text-red-500 text-sm">{errors.businessTagline.message}</p>}
                </div>

                {/* Years in Business */}
                <div>
                  <Label>Years in Business *</Label>
                  <Select onValueChange={(v) => setValue("yearsInBusiness", v)} defaultValue="">
                    <SelectTrigger className="h-14 bg-gray-100 rounded-xl">
                      <SelectValue placeholder="Select years" />
                    </SelectTrigger>
                    <SelectContent>
                      {["<1 year", "1-2 years", "3-5 years", "6-10 years", "10+ years"].map((y) => (
                        <SelectItem key={y} value={y}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.yearsInBusiness && <p className="text-red-500 text-sm">{errors.yearsInBusiness.message}</p>}
                </div>

                {/* Employee Count */}
                <div>
                  <Label>Employee Count *</Label>
                  <Select onValueChange={(v) => setValue("employeeCount", v)} defaultValue="">
                    <SelectTrigger className="h-14 bg-gray-100 rounded-xl">
                      <SelectValue placeholder="Select count" />
                    </SelectTrigger>
                    <SelectContent>
                      {["1", "2-5", "6-10", "11-20", "21-50", "50+"].map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.employeeCount && <p className="text-red-500 text-sm">{errors.employeeCount.message}</p>}
                </div>

                {/* Industry */}
                <div>
                  <Label>Industry *</Label>
                  <Select onValueChange={(v) => setValue("industry", v)} defaultValue="">
                    <SelectTrigger className="h-14 bg-gray-100 rounded-xl">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRY_OPTIONS.map((ind) => (
                        <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {watchedIndustry === "Other" && (
                    <Input className="mt-2" placeholder="Enter your industry" {...register("customIndustry")} />
                  )}
                  {errors.industry && <p className="text-red-500 text-sm">{errors.industry.message}</p>}
                </div>

                {/* Roles Offered */}
                <div>
                  <Label>Roles Offered *</Label>
                  <Controller
                    name="rolesOffered"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select onValueChange={(value) => field.onChange([...field.value, value])}>
                          <SelectTrigger className="h-14 bg-gray-100 rounded-xl">
                            <SelectValue placeholder="Select roles" />
                          </SelectTrigger>
                          <SelectContent>
                            {ROLE_OPTIONS.map((r) => (
                              <SelectItem key={r} value={r}>{r}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {watchedRoles?.includes("Other") && (
                          <Input className="mt-2" placeholder="Enter custom role" {...register("customRole")} />
                        )}
                        {field.value?.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {field.value.map((role, i) => (
                              <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                {role}
                                <button type="button" onClick={() => field.onChange(field.value.filter((_, idx) => idx !== i))} className="ml-2">×</button>
                              </span>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  />
                  {errors.rolesOffered && <p className="text-red-500 text-sm">{errors.rolesOffered.message}</p>}
                </div>

                {/* Job Availability */}
                <div>
                  <Label>Job Availability *</Label>
                  <Controller
                    name="jobAvailability"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={(value) => field.onChange([...field.value, value])}>
                        <SelectTrigger className="h-14 bg-gray-100 rounded-xl">
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent>
                          {JOB_AVAILABILITY.map((a) => (
                            <SelectItem key={a} value={a}>{a}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.jobAvailability && <p className="text-red-500 text-sm">{errors.jobAvailability.message}</p>}
                </div>

                {/* Pay Range */}
                <div>
                  <Label>Pay Range (AUD/hr) *</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Min" {...register("payMin")} className="h-14 bg-gray-100 rounded-xl" />
                    <Input placeholder="Max" {...register("payMax")} className="h-14 bg-gray-100 rounded-xl" />
                  </div>
                  {(errors.payMin || errors.payMax) && <p className="text-red-500 text-sm">Enter valid pay range</p>}
                </div>

                {/* Facilities */}
                <div>
                  <Label>Facilities & Extras *</Label>
                  <Controller
                    name="facilitiesAndExtras"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select onValueChange={(value) => field.onChange([...field.value, value])}>
                          <SelectTrigger className="h-14 bg-gray-100 rounded-xl">
                            <SelectValue placeholder="Select facilities" />
                          </SelectTrigger>
                          <SelectContent>
                            {FACILITIES.map((f) => (
                              <SelectItem key={f} value={f}>{f}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {field.value?.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {field.value.map((f, i) => (
                              <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                {f}
                                <button type="button" onClick={() => field.onChange(field.value.filter((_, idx) => idx !== i))} className="ml-2">×</button>
                              </span>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  />
                  {errors.facilitiesAndExtras && <p className="text-red-500 text-sm">{errors.facilitiesAndExtras.message}</p>}
                </div>

                {/* Submit */}
                <div className="pt-6">
                  <Button type="submit" className="w-full h-14 bg-slate-800 text-white rounded-xl">
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

