import React, { useEffect } from "react";
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

// ✅ Schema (same as EmployerAboutBusiness + registration where needed)
const formSchema = z.object({
  companyName: z.string().min(2, "Company name is required."),
  abn: z.string().min(11).max(11).regex(/^\d+$/, "ABN must be 11 digits."),
  businessTagline: z.string().min(10, "At least 10 characters.").max(200, "Max 200 characters."),
  yearsInBusiness: z.string().min(1, "Please select years in business."),
  employeeCount: z.string().min(1, "Please select employee count."),
  industry: z.string().min(1, "Please select an industry."),
  rolesOffered: z.array(z.string()).min(1, "Select at least one role."),
  customRole: z.string().optional(),
  jobType: z.array(z.string()).min(1, "Select at least one job type."),
  payRange: z.string().min(1, "Select a pay range."),
  facilitiesAndExtras: z.array(z.string()).min(1, "Select at least one facility."),
  customFacility: z.string().optional(),
  businessPhone: z.string().min(10, "Enter a valid phone number."),
  website: z.string().optional().or(z.literal("")),
  addressLine1: z.string().min(2, "Address line 1 is required."),
  addressLine2: z.string().optional(),
  suburbCity: z.string().min(2, "Suburb / City is required."),
  state: z.string().min(1, "Select a state."),
  postCode: z.string().min(4).max(4, "Postcode must be 4 digits.").regex(/^\d+$/, "Must be numeric."),
});

type FormData = z.infer<typeof formSchema>;

// ✅ Options (same as AboutBusiness)
const industries = [...];
const industryRoles = {...};
const jobTypes = ["Full-time", "Part-time", "Casual", "Seasonal", "Contract"];
const payRanges = ["$25–30/hour", "$30–35/hour", "$35–40/hour", "$40–45/hour", "$45+/hour"];
const facilitiesExtras = ["Accommodation provided", "Meals included", "Transport provided", "Training provided", "Equipment provided", "Flexible hours", "Career progression", "Team environment", "Other"];
const yearsOptions = ["<1", "1", "2", "3", "4", "5", "6-10", "11-15", "16-20", "20+"];
const employeeCountOptions = ["1", "2-5", "6-10", "11-20", "21-50", "51-100", "100+"];
const AUSTRALIAN_STATES = ["Australian Capital Territory","New South Wales","Northern Territory","Queensland","South Australia","Tasmania","Victoria","Western Australia"];

const EditBusinessProfile: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    reset,
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

  // ✅ Load existing data into form on mount
  useEffect(() => {
    const aboutData = JSON.parse(localStorage.getItem("aboutBusiness") || "{}");
    const regData = JSON.parse(localStorage.getItem("businessRegistration") || "{}");
    const merged = { ...regData, ...aboutData };
    reset(merged);
  }, [reset]);

  const watchedIndustry = watch("industry");
  const watchedRoles = watch("rolesOffered") || [];
  const watchedFacilities = watch("facilitiesAndExtras") || [];

  const onSubmit = (data: FormData) => {
    console.log("Updated Business Profile:", data);

    // ✅ Save updates
    localStorage.setItem("aboutBusiness", JSON.stringify(data));

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
            <div className="px-6 pt-16 pb-4 flex items-center justify-between">
              <button onClick={() => navigate("/employer/dashboard")} className="text-[#1E293B] underline">Cancel</button>
              <h1 className="text-lg font-semibold">Edit Business Profile</h1>
              <button type="submit" form="edit-business-form" className="flex items-center text-[#1E293B] underline">
                <Check size={16} className="mr-1"/> Save
              </button>
            </div>

            {/* Form */}
            <div className="flex-1 px-6 overflow-y-auto pb-20">
              <form id="edit-business-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* ABN (disabled) */}
                <div>
                  <Label>ABN</Label>
                  <Input {...register("abn")} disabled className="h-14 bg-gray-100 rounded-xl text-gray-500" />
                </div>

                {/* ... the rest of your fields (same as AboutBusiness) ... */}

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBusinessProfile;


