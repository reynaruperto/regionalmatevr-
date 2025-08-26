import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  businessName: z.string().min(2, { message: "Business name must be at least 2 characters." }),
  businessTagline: z.string().min(10, { message: "Please describe what your business does (minimum 10 characters)." }).max(200, { message: "Business tagline must be 200 characters or less." }),
  industryType: z.string().min(1, { message: "Please select an industry type." }),
  customIndustry: z.string().optional(),
  businessPhone: z.string().min(10, { message: "Please enter a valid phone number." }),
  website: z.string().optional().or(z.literal("")),
  yearsInBusiness: z.string().min(1, { message: "Please specify years in business." }),
  businessSize: z.string().min(1, { message: "Please select your business size." }),
  rolesOffered: z.array(z.string()).min(1, { message: "Please select at least one role." }),
  customRole: z.string().optional(),
  jobAvailability: z.string().min(1, { message: "Please select job availability." }),
  payAndBenefits: z.string().min(1, { message: "Please select pay and benefits." }),
  facilitiesAndExtras: z.array(z.string()).min(1, { message: "Please select at least one facility or extra." }),
  addressLine1: z.string().min(2, { message: "Address line 1 is required." }),
  addressLine2: z.string().optional(),
  suburb: z.string().min(2, { message: "Suburb is required." }),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(1, { message: "Please select a state." }),
  postCode: z.string().min(4, { message: "Please enter a valid post code." }).max(4, { message: "Post code must be 4 digits." })
});

type FormData = z.infer<typeof formSchema>;

// Industry options from the onboarding
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

// Years options
const yearsOptions = [
  'Less than 1 year',
  '1 year',
  '2 years', 
  '3 years',
  '4 years',
  '5 years',
  '6-10 years',
  '11-15 years',
  '16-20 years',
  '20+ years'
];

// Employee count options
const employeeCountOptions = [
  '1 employee',
  '2-5 employees',
  '6-10 employees',
  '11-20 employees',
  '21-50 employees',
  '51-100 employees',
  '100+ employees'
];

// Role options
const roles = [
  "Farm Worker",
  "Fruit Picker",
  "Kitchen Hand",
  "Waitstaff",
  "Cleaner",
  "Construction Worker",
  "Laborer",
  "Driver",
  "Sales Assistant",
  "Other"
];

// Job availability options
const jobAvailabilityOptions = [
  "Full-time",
  "Part-time",
  "Casual",
  "Seasonal",
  "Contract"
];

// Pay and benefits options
const payBenefitsOptions = [
  "$20-25/hour",
  "$25-30/hour",
  "$30-35/hour", 
  "$35+/hour",
  "Competitive salary",
  "Benefits included"
];

// Facilities and extras options
const facilitiesExtras = [
  "Accommodation provided",
  "Meals included",
  "Transport provided",
  "Training provided",
  "Equipment provided",
  "Flexible hours",
  "Career progression",
  "Team environment"
];

// Australian states and territories  
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
      businessTagline: "Family-run farm in regional Queensland, offering seasonal work in fruit picking and packing",
      industryType: "Agriculture & Farming",
      businessPhone: "+61 491 222 333",
      website: "www.kangafarm.com",
      yearsInBusiness: "5 years",
      businessSize: "1-10 employees",
      rolesOffered: ["Farm Worker", "Fruit Picker"],
      jobAvailability: "Seasonal",
      payAndBenefits: "$25-30/hour",
      facilitiesAndExtras: ["Accommodation provided", "Meals included"],
      addressLine1: "11 Apple St.",
      addressLine2: "",
      suburb: "Spring Hill", 
      city: "Brisbane",
      state: "Queensland",
      postCode: "4019"
    }
  });

  const watchedIndustry = watch("industryType");
  const watchedRoles = watch("rolesOffered");

  const onSubmit = (data: FormData) => {
    console.log('Business profile updated:', data);
    toast({
      title: "Business Profile Updated",
      description: "Your business profile has been successfully updated",
    });
    navigate('/employer/dashboard');
  };

  const handleCancel = () => {
    navigate('/employer/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-background rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          {/* Main content container */}
          <div className="w-full h-full flex flex-col relative bg-gray-200">
            
            {/* Header */}
            <div className="px-6 pt-16 pb-4">
              <div className="flex items-center justify-between">
                <button 
                  onClick={handleCancel}
                  className="text-[#1E293B] font-medium underline"
                >
                  Cancel
                </button>
                <h1 className="text-lg font-semibold text-gray-900">Edit Business Profile</h1>
                <button 
                  type="submit"
                  form="business-profile-form"
                  className="flex items-center text-[#1E293B] font-medium underline"
                >
                  <Check size={16} className="mr-1" />
                  Save
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 overflow-y-auto">
              <form id="business-profile-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* ABN - Display only (non-editable) */}
                <div>
                  <Label className="text-gray-600 mb-2 block text-sm">ABN (Cannot be edited)</Label>
                  <div className="h-11 rounded-xl border border-gray-200 bg-gray-100 text-sm px-3 py-2 text-gray-500">
                    11 222 333 444
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Contact support to change your ABN</p>
                </div>

                {/* Business Name */}
                <div>
                  <Label htmlFor="businessName" className="text-gray-600 mb-2 block text-sm">Business Name</Label>
                  <Input
                    id="businessName"
                    className="h-11 rounded-xl border-gray-200 bg-white text-sm"
                    {...register("businessName")}
                  />
                  {errors.businessName && (
                    <p className="text-red-500 text-xs mt-1">{errors.businessName.message}</p>
                  )}
                </div>

                {/* Business Tagline */}
                <div>
                  <Label htmlFor="businessTagline" className="text-gray-600 mb-2 block text-sm">Business Tagline</Label>
                  <Input
                    id="businessTagline"
                    placeholder="Quality produce, sustainable farming"
                    maxLength={200}
                    className="h-11 rounded-xl border-gray-200 bg-white text-sm"
                    {...register("businessTagline")}
                  />
                  <p className="text-xs text-gray-500 mt-1">This will appear under your profile photo (max 200 characters)</p>
                  {errors.businessTagline && (
                    <p className="text-red-500 text-xs mt-1">{errors.businessTagline.message}</p>
                  )}
                </div>

                {/* Industry Type */}
                <div>
                  <Label htmlFor="industryType" className="text-gray-600 mb-2 block text-sm">Industry Type</Label>
                  <Controller
                    name="industryType"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedIndustry(value);
                        }} value={field.value}>
                          <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-white text-sm">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-[300px] overflow-y-auto">
                            {INDUSTRY_OPTIONS.map((industry) => (
                              <SelectItem 
                                key={industry} 
                                value={industry}
                                className="py-2 px-3 hover:bg-gray-50 cursor-pointer text-sm"
                              >
                                {industry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {watchedIndustry === "Other" && (
                          <div className="mt-2">
                            <Input
                              placeholder="Please specify your industry"
                              className="h-11 rounded-xl border-gray-200 bg-gray-50 text-sm"
                              {...register("customIndustry")}
                            />
                          </div>
                        )}
                      </>
                    )}
                  />
                  {errors.industryType && (
                    <p className="text-red-500 text-xs mt-1">{errors.industryType.message}</p>
                  )}
                </div>

                {/* Business Phone Number */}
                <div>
                  <Label htmlFor="businessPhone" className="text-gray-600 mb-2 block text-sm">Business Phone Number</Label>
                  <Input
                    id="businessPhone"
                    className="h-11 rounded-xl border-gray-200 bg-white text-sm"
                    {...register("businessPhone")}
                  />
                  {errors.businessPhone && (
                    <p className="text-red-500 text-xs mt-1">{errors.businessPhone.message}</p>
                  )}
                </div>

                {/* Website */}
                <div>
                  <Label htmlFor="website" className="text-gray-600 mb-2 block text-sm">Website</Label>
                  <Input
                    id="website"
                    className="h-11 rounded-xl border-gray-200 bg-white text-sm"
                    {...register("website")}
                  />
                  {errors.website && (
                    <p className="text-red-500 text-xs mt-1">{errors.website.message}</p>
                  )}
                </div>

                {/* Years in Business */}
                <div>
                  <Label className="text-gray-600 mb-2 block text-sm">How many years of trajectory does your business have?</Label>
                  <Select onValueChange={(value) => setValue("yearsInBusiness", value)} defaultValue="5 years">
                    <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-white text-sm">
                      <SelectValue placeholder="Select years in business" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                      {yearsOptions.map((year) => (
                        <SelectItem key={year} value={year} className="py-2 px-3 hover:bg-gray-50 cursor-pointer text-sm">
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.yearsInBusiness && (
                    <p className="text-red-500 text-xs mt-1">{errors.yearsInBusiness.message}</p>
                  )}
                </div>

                {/* Business Size */}
                <div>
                  <Label className="text-gray-600 mb-2 block text-sm">How many employees do you currently have?</Label>
                  <Select onValueChange={(value) => setValue("businessSize", value)} defaultValue="1-10 employees">
                    <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-white text-sm">
                      <SelectValue placeholder="Select number of employees" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                      {employeeCountOptions.map((count) => (
                        <SelectItem key={count} value={count} className="py-2 px-3 hover:bg-gray-50 cursor-pointer text-sm">
                          {count}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.businessSize && (
                    <p className="text-red-500 text-xs mt-1">{errors.businessSize.message}</p>
                  )}
                </div>

                {/* Roles Offered */}
                <div>
                  <Label className="text-gray-600 mb-2 block text-sm">Roles Offered</Label>
                  <Controller
                    name="rolesOffered"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select onValueChange={(value) => {
                          const currentValues = field.value || [];
                          if (!currentValues.includes(value)) {
                            const newValues = [...currentValues, value];
                            field.onChange(newValues);
                          }
                        }}>
                          <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-white text-sm">
                            <SelectValue placeholder={field.value?.length > 0 ? `${field.value.length} role(s) selected` : "Select roles offered"} />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                            {roles.map((role) => (
                              <SelectItem key={role} value={role} className="py-2 px-3 hover:bg-gray-50 cursor-pointer text-sm">
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {watchedRoles?.includes("Other") && (
                          <div className="mt-2">
                            <Input
                              placeholder="Please specify the role"
                              className="h-11 rounded-xl border-gray-200 bg-gray-50 text-sm"
                              {...register("customRole")}
                            />
                          </div>
                        )}
                        {field.value?.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {field.value.map((role, index) => (
                              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                {role}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newValues = field.value.filter((_, i) => i !== index);
                                    field.onChange(newValues);
                                  }}
                                  className="ml-2 text-blue-600 hover:text-blue-800"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  />
                  {errors.rolesOffered && (
                    <p className="text-red-500 text-xs mt-1">{errors.rolesOffered.message}</p>
                  )}
                </div>

                {/* Job Availability */}
                <div>
                  <Label className="text-gray-600 mb-2 block text-sm">Job Availability</Label>
                  <Controller
                    name="jobAvailability"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-white text-sm">
                          <SelectValue placeholder="Select job availability" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                          {jobAvailabilityOptions.map((option) => (
                            <SelectItem key={option} value={option} className="py-2 px-3 hover:bg-gray-50 cursor-pointer text-sm">
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.jobAvailability && (
                    <p className="text-red-500 text-xs mt-1">{errors.jobAvailability.message}</p>
                  )}
                </div>

                {/* Pay & Benefits */}
                <div>
                  <Label className="text-gray-600 mb-2 block text-sm">Pay & Benefits</Label>
                  <Controller
                    name="payAndBenefits"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-white text-sm">
                          <SelectValue placeholder="Select pay and benefits" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                          {payBenefitsOptions.map((option) => (
                            <SelectItem key={option} value={option} className="py-2 px-3 hover:bg-gray-50 cursor-pointer text-sm">
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.payAndBenefits && (
                    <p className="text-red-500 text-xs mt-1">{errors.payAndBenefits.message}</p>
                  )}
                </div>

                {/* Facilities & Extras */}
                <div>
                  <Label className="text-gray-600 mb-2 block text-sm">Facilities & Extras</Label>
                  <Controller
                    name="facilitiesAndExtras"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select onValueChange={(value) => {
                          const currentValues = field.value || [];
                          if (!currentValues.includes(value)) {
                            field.onChange([...currentValues, value]);
                          }
                        }}>
                          <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-white text-sm">
                            <SelectValue placeholder={field.value?.length > 0 ? `${field.value.length} facility(ies) selected` : "Select facilities & extras"} />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                            {facilitiesExtras.map((facility) => (
                              <SelectItem key={facility} value={facility} className="py-2 px-3 hover:bg-gray-50 cursor-pointer text-sm">
                                {facility}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {field.value?.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {field.value.map((facility, index) => (
                              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                {facility}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newValues = field.value.filter((_, i) => i !== index);
                                    field.onChange(newValues);
                                  }}
                                  className="ml-2 text-green-600 hover:text-green-800"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  />
                  {errors.facilitiesAndExtras && (
                    <p className="text-red-500 text-xs mt-1">{errors.facilitiesAndExtras.message}</p>
                  )}
                </div>

                {/* Business Address Line 1 */}
                <div>
                  <Label htmlFor="addressLine1" className="text-gray-600 mb-2 block text-sm">Business Address Line 1</Label>
                  <Input
                    id="addressLine1"
                    className="h-11 rounded-xl border-gray-200 bg-white text-sm"
                    {...register("addressLine1")}
                  />
                  {errors.addressLine1 && (
                    <p className="text-red-500 text-xs mt-1">{errors.addressLine1.message}</p>
                  )}
                </div>

                {/* Business Address Line 2 */}
                <div>
                  <Label htmlFor="addressLine2" className="text-gray-600 mb-2 block text-sm">Street Address Line 2 (if applicable)</Label>
                  <Input
                    id="addressLine2"
                    className="h-11 rounded-xl border-gray-200 bg-white text-sm"
                    {...register("addressLine2")}
                  />
                  {errors.addressLine2 && (
                    <p className="text-red-500 text-xs mt-1">{errors.addressLine2.message}</p>
                  )}
                </div>

                {/* Suburb */}
                <div>
                  <Label htmlFor="suburb" className="text-gray-600 mb-2 block text-sm">Suburb</Label>
                  <Input
                    id="suburb"
                    className="h-11 rounded-xl border-gray-200 bg-white text-sm"
                    {...register("suburb")}
                  />
                  {errors.suburb && (
                    <p className="text-red-500 text-xs mt-1">{errors.suburb.message}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <Label htmlFor="city" className="text-gray-600 mb-2 block text-sm">City</Label>
                  <Input
                    id="city"
                    className="h-11 rounded-xl border-gray-200 bg-white text-sm"
                    {...register("city")}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                  )}
                </div>

                {/* State */}
                <div>
                  <Label htmlFor="state" className="text-gray-600 mb-2 block text-sm">State</Label>
                  <Select 
                    onValueChange={(value) => setValue("state", value, { shouldValidate: true })}
                    defaultValue="Queensland"
                  >
                    <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-white text-sm">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-[300px] overflow-y-auto">
                      {AUSTRALIAN_STATES.map((state) => (
                        <SelectItem 
                          key={state} 
                          value={state}
                          className="py-2 px-3 hover:bg-gray-50 cursor-pointer text-sm"
                        >
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && (
                    <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
                  )}
                </div>

                {/* Post Code */}
                <div>
                  <Label htmlFor="postCode" className="text-gray-600 mb-2 block text-sm">Post Code</Label>
                  <Input
                    id="postCode"
                    maxLength={4}
                    className="h-11 rounded-xl border-gray-200 bg-white text-sm"
                    {...register("postCode")}
                  />
                  {errors.postCode && (
                    <p className="text-red-500 text-xs mt-1">{errors.postCode.message}</p>
                  )}
                </div>

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