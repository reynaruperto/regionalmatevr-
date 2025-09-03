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

// ✅ Schema updated for arrays & pay object
const formSchema = z.object({
  businessTagline: z
    .string()
    .min(10, { message: "Please describe what your business does (minimum 10 characters)." })
    .max(200, { message: "Business tagline must be 200 characters or less." }),
  yearsInBusiness: z.string().min(1, { message: "Please select years in business." }),
  employeeCount: z.string().min(1, { message: "Please select number of employees." }),
  industry: z.string().min(1, { message: "Please select an industry." }),
  customIndustry: z.string().optional(),
  rolesOffered: z.array(z.string()).min(1, { message: "Please select at least one role." }),
  customRole: z.string().optional(),
  jobAvailability: z.array(z.string()).min(1, { message: "Please select job availability." }),
  pay: z.object({
    min: z.number().nonnegative(),
    max: z.number().nonnegative(),
    unit: z.enum(["hourly", "daily", "weekly", "piecework"]),
  }),
  facilitiesAndExtras: z.array(z.string()).min(1, { message: "Please select at least one facility or extra." }),
});

type FormData = z.infer<typeof formSchema>;

const EmployerAboutBusiness: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const yearsOptions = [
    "Less than 1 year",
    "1 year",
    "2 years",
    "3 years",
    "4 years",
    "5 years",
    "6-10 years",
    "11-15 years",
    "16-20 years",
    "20+ years",
  ];

  const employeeCountOptions = [
    "1 employee",
    "2-5 employees",
    "6-10 employees",
    "11-20 employees",
    "21-50 employees",
    "51-100 employees",
    "100+ employees",
  ];

  const industries = [
    "Plant & Animal Cultivation",
    "Tourism & Hospitality",
    "Construction",
    "Mining",
    "Healthcare & Medical",
    "Other",
  ];

  // Map industries → roles
  const industryRoles: Record<string, string[]> = {
    "Plant & Animal Cultivation": ["Fruit Picker", "Farm Worker", "Dairy Worker", "Packer"],
    "Tourism & Hospitality": ["Waitstaff", "Chef", "Cleaner", "Tour Guide"],
    Construction: ["Labourer", "Painter", "Scaffolder", "Site Cleaner"],
    Mining: ["Driller", "Truck Driver", "Maintenance Worker"],
    "Healthcare & Medical": ["Nurse", "Aged Care Worker", "Support Worker"],
    Other: ["Other"],
  };

  const jobAvailabilityOptions = ["Full-time", "Part-time", "Casual", "Seasonal", "Piecework"];

  const facilitiesExtras = [
    "Accommodation provided",
    "Meals included",
    "Transport provided",
    "Training provided",
    "Equipment provided",
    "Flexible hours",
  ];

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
      jobAvailability: [],
      facilitiesAndExtras: [],
      pay: { min: 0, max: 0, unit: "hourly" },
    },
  });

  const watchedIndustry = watch("industry");

  const onSubmit = (data: FormData) => {
    console.log("Business info submitted:", data);
    toast({
      title: "Business setup complete!",
      description: "Your employer profile has been created successfully",
    });
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
              </div>
              <div className="flex items-center justify-between mb-6">
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
                  <Input placeholder="Quality produce, sustainable farming" maxLength={200} {...register("businessTagline")} />
                  {errors.businessTagline && <p className="text-red-500 text-sm">{errors.businessTagline.message}</p>}
                </div>

                {/* Years in Business */}
                <div>
                  <Label>Years in Business *</Label>
                  <Controller
                    name="yearsInBusiness"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger><SelectValue placeholder="Select years" /></SelectTrigger>
                        <SelectContent>
                          {yearsOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Employee Count */}
                <div>
                  <Label>Employees *</Label>
                  <Controller
                    name="employeeCount"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger><SelectValue placeholder="Select employees" /></SelectTrigger>
                        <SelectContent>
                          {employeeCountOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Industry */}
                <div>
                  <Label>Industry *</Label>
                  <Controller
                    name="industry"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={(value) => { field.onChange(value); setSelectedIndustry(value); }} value={field.value}>
                        <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                        <SelectContent>
                          {industries.map((ind) => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Roles Offered */}
                {watchedIndustry && (
                  <div>
                    <Label>Roles Offered *</Label>
                    {industryRoles[watchedIndustry].map((role) => (
                      <div key={role} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={role}
                          checked={watch("rolesOffered")?.includes(role)}
                          onChange={(e) => {
                            const current = watch("rolesOffered") || [];
                            if (e.target.checked) setValue("rolesOffered", [...current, role]);
                            else setValue("rolesOffered", current.filter((r) => r !== role));
                          }}
                        />
                        <span>{role}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Job Availability */}
                <div>
                  <Label>Job Availability *</Label>
                  {jobAvailabilityOptions.map((opt) => (
                    <div key={opt} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={opt}
                        checked={watch("jobAvailability")?.includes(opt)}
                        onChange={(e) => {
                          const current = watch("jobAvailability") || [];
                          if (e.target.checked) setValue("jobAvailability", [...current, opt]);
                          else setValue("jobAvailability", current.filter((a) => a !== opt));
                        }}
                      />
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>

                {/* Pay */}
                <div>
                  <Label>Pay *</Label>
                  <div className="flex space-x-2">
                    <Input type="number" placeholder="Min" {...register("pay.min", { valueAsNumber: true })} />
                    <Input type="number" placeholder="Max" {...register("pay.max", { valueAsNumber: true })} />
                    <Controller
                      name="pay.unit"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger><SelectValue placeholder="Unit" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="piecework">Piecework</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                {/* Facilities */}
                <div>
                  <Label>Facilities & Extras *</Label>
                  {facilitiesExtras.map((facility) => (
                    <div key={facility} className="flex items-center space-x-2">
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
                    </div>
                  ))}
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
