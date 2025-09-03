import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  businessName: z.string().min(2, { message: "Business name must be at least 2 characters." }),
  businessTagline: z.string().min(10).max(200),
  industryType: z.string().min(1, { message: "Please select an industry type." }),
  customIndustry: z.string().optional(),
  businessPhone: z.string().min(10),
  website: z.string().optional().or(z.literal("")),
  yearsInBusiness: z.string().min(1),
  businessSize: z.string().min(1),
  rolesOffered: z.array(z.string()).min(1, { message: "Please select at least one role." }),
  customRole: z.string().optional(),
  jobAvailability: z.array(z.string()).min(1, { message: "Please select at least one option." }),
  payMin: z.string().min(1),
  payMax: z.string().min(1),
  facilitiesAndExtras: z.array(z.string()).min(1),
  addressLine1: z.string().min(2),
  addressLine2: z.string().optional(),
  suburb: z.string().min(2),
  city: z.string().min(2),
  state: z.string().min(1),
  postCode: z.string().min(4).max(4)
});

type FormData = z.infer<typeof formSchema>;

const INDUSTRY_OPTIONS = [
  "Agriculture & Farming",
  "Tourism & Hospitality",
  "Construction & Building",
  "Mining & Resources",
  "Healthcare & Aged Care",
  "Other"
];

const roles = [
  "Farm Worker",
  "Fruit Picker",
  "Kitchen Hand",
  "Waitstaff",
  "Cleaner",
  "Construction Worker",
  "Driver",
  "Other"
];

const jobAvailabilityOptions = ["Full-time", "Part-time", "Casual", "Seasonal", "Contract"];

const facilitiesExtras = [
  "Accommodation provided",
  "Meals included",
  "Transport provided",
  "Training provided",
  "Flexible hours",
  "Career progression"
];

const yearsOptions = [
  'Less than 1 year', '1 year', '2 years', '3 years', '4 years',
  '5 years', '6-10 years', '11-15 years', '16-20 years', '20+ years'
];

const employeeCountOptions = [
  '1 employee', '2-5 employees', '6-10 employees', '11-20 employees',
  '21-50 employees', '51-100 employees', '100+ employees'
];

const AUSTRALIAN_STATES = [
  'Australian Capital Territory',
  'New South Wales',
  'Northern Territory',
  'Queensland',
  'South Australia',
  'Tasmania',
  'Victoria',
  'Western Australia'
];

const EditBusinessProfile: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "Kangafarm",
      businessTagline: "Family-run farm offering seasonal work",
      industryType: "Agriculture & Farming",
      businessPhone: "+61 491 222 333",
      website: "www.kangafarm.com",
      yearsInBusiness: "5 years",
      businessSize: "2-5 employees",
      rolesOffered: ["Farm Worker", "Fruit Picker"],
      jobAvailability: ["Seasonal"],
      payMin: "25",
      payMax: "30",
      facilitiesAndExtras: ["Accommodation provided", "Meals included"],
      addressLine1: "11 Apple St.",
      suburb: "Spring Hill",
      city: "Brisbane",
      state: "Queensland",
      postCode: "4019"
    }
  });

  const watchedIndustry = watch("industryType");
  const watchedRoles = watch("rolesOffered");

  const onSubmit = (data: FormData) => {
    console.log("Updated business profile:", data);
    toast({
      title: "Profile Updated",
      description: "Your business profile was updated successfully."
    });
    navigate('/employer/dashboard');
  };

  const handleCancel = () => navigate('/employer/dashboard');

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-background rounded-[48px] overflow-hidden relative">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          <div className="w-full h-full flex flex-col bg-white">
            {/* Header */}
            <div className="px-6 pt-16 pb-4">
              <div className="flex items-center justify-between">
                <button onClick={handleCancel} className="text-[#1E293B] font-medium underline">Cancel</button>
                <h1 className="text-lg font-semibold text-gray-900">Edit Business Profile</h1>
                <button type="submit" form="edit-form" className="flex items-center text-[#1E293B] font-medium underline">
                  <Check size={16} className="mr-1" /> Save
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 px-6 overflow-y-auto">
              <form id="edit-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-20">
                
                {/* ABN (locked) */}
                <div>
                  <Label className="text-sm text-gray-600">ABN (Cannot be edited)</Label>
                  <div className="h-14 px-4 flex items-center bg-gray-100 rounded-xl text-sm text-gray-500">
                    11 222 333 444
                  </div>
                </div>

                {/* Business Name */}
                <div>
                  <Label className="text-sm text-gray-600">Business Name</Label>
                  <Input className="h-14 bg-gray-100 border-0 rounded-xl text-sm" {...register("businessName")} />
                </div>

                {/* Tagline */}
                <div>
                  <Label className="text-sm text-gray-600">Business Tagline</Label>
                  <Input className="h-14 bg-gray-100 border-0 rounded-xl text-sm" {...register("businessTagline")} />
                </div>

                {/* Industry */}
                <div>
                  <Label className="text-sm text-gray-600">Industry</Label>
                  <Controller
                    name="industryType"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={(val) => { field.onChange(val); setSelectedIndustry(val); }} value={field.value}>
                        <SelectTrigger className="h-14 bg-gray-100 border-0 rounded-xl text-sm">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDUSTRY_OPTIONS.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {watchedIndustry === "Other" && (
                    <Input placeholder="Custom industry" className="mt-2 h-14 bg-gray-100 border-0 rounded-xl text-sm" {...register("customIndustry")} />
                  )}
                </div>

                {/* Roles Offered */}
                <div>
                  <Label className="text-sm text-gray-600">Roles Offered</Label>
                  <Controller
                    name="rolesOffered"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select onValueChange={(val) => {
                          const current = field.value || [];
                          if (!current.includes(val)) field.onChange([...current, val]);
                        }}>
                          <SelectTrigger className="h-14 bg-gray-100 border-0 rounded-xl text-sm">
                            <SelectValue placeholder="Select roles" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role} value={role}>{role}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {watchedRoles?.includes("Other") && (
                          <Input placeholder="Custom role" className="mt-2 h-14 bg-gray-100 border-0 rounded-xl text-sm" {...register("customRole")} />
                        )}
                        {field.value?.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {field.value.map((role, i) => (
                              <span key={i} className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center">
                                {role}
                                <button type="button" onClick={() => field.onChange(field.value.filter((_, idx) => idx !== i))} className="ml-2">×</button>
                              </span>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Job Availability */}
                <div>
                  <Label className="text-sm text-gray-600">Job Availability</Label>
                  <Controller
                    name="jobAvailability"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select onValueChange={(val) => {
                          const current = field.value || [];
                          if (!current.includes(val)) field.onChange([...current, val]);
                        }}>
                          <SelectTrigger className="h-14 bg-gray-100 border-0 rounded-xl text-sm">
                            <SelectValue placeholder="Select availability" />
                          </SelectTrigger>
                          <SelectContent>
                            {jobAvailabilityOptions.map((opt) => (
                              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {field.value?.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {field.value.map((opt, i) => (
                              <span key={i} className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs flex items-center">
                                {opt}
                                <button type="button" onClick={() => field.onChange(field.value.filter((_, idx) => idx !== i))} className="ml-2">×</button>
                              </span>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Pay */}
                <div>
                  <Label className="text-sm text-gray-600">Pay Range (per hour)</Label>
                  <div className="flex gap-3">
                    <Input placeholder="Min $" className="h-14 bg-gray-100 border-0 rounded-xl text-sm" {...register("payMin")} />
                    <Input placeholder="Max $" className="h-14 bg-gray-100 border-0 rounded-xl text-sm" {...register("payMax")} />
                  </div>
                </div>

                {/* Facilities & Extras */}
                <div>
                  <Label className="text-sm text-gray-600">Facilities & Extras</Label>
                  <Controller
                    name="facilitiesAndExtras"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select onValueChange={(val) => {
                          const current = field.value || [];
                          if (!current.includes(val)) field.onChange([...current, val]);
                        }}>
                          <SelectTrigger className="h-14 bg-gray-100 border-0 rounded-xl text-sm">
                            <SelectValue placeholder="Select facilities" />
                          </SelectTrigger>
                          <SelectContent>
                            {facilitiesExtras.map((fac) => (
                              <SelectItem key={fac} value={fac}>{fac}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {field.value?.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {field.value.map((fac, i) => (
                              <span key={i} className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs flex items-center">
                                {fac}
                                <button type="button" onClick={() => field.onChange(field.value.filter((_, idx) => idx !== i))} className="ml-2">×</button>
                              </span>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Business Address */}
                <div>
                  <Label className="text-sm text-gray-600">Address Line 1</Label>
                  <Input className="h-14 bg-gray-100 border-0 rounded-xl text-sm" {...register("addressLine1")} />
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Address Line 2 (optional)</Label>
                  <Input className="h-14 bg-gray-100 border-0 rounded-xl text-sm" {...register("addressLine2")} />
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Suburb</Label>
                  <Input className="h-14 bg-gray-100 border-0 rounded-xl text-sm" {...register("suburb")} />
                </div>
                <div>
                  <Label className="text-sm text-gray-600">City</Label>
                  <Input className="h-14 bg-gray-100 border-0 rounded-xl text-sm" {...register("city")} />
                </div>
                <div>
                  <Label className="text-sm text-gray-600">State</Label>
                  <Select onValueChange={(val) => setValue("state", val)} defaultValue="Queensland">
                    <SelectTrigger className="h-14 bg-gray-100 border-0 rounded-xl text-sm">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {AUSTRALIAN_STATES.map((st) => (
                        <SelectItem key={st} value={st}>{st}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Post Code</Label>
                  <Input maxLength={4} className="h-14 bg-gray-100 border-0 rounded-xl text-sm" {...register("postCode")} />
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
