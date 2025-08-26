import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  businessTagline: z.string().min(10, { message: "Please describe what your business does (minimum 10 characters)." }).max(200, { message: "Business tagline must be 200 characters or less." }),
  yearsInBusiness: z.string().min(1, { message: "Please select years in business." }),
  employeeCount: z.string().min(1, { message: "Please select number of employees." }),
  industry: z.string().min(1, { message: "Please select an industry." }),
  rolesOffered: z.array(z.string()).min(1, { message: "Please select at least one role." }),
  jobAvailability: z.string().min(1, { message: "Please select job availability." }),
  payAndBenefits: z.string().min(1, { message: "Please select pay and benefits." }),
  facilitiesAndExtras: z.array(z.string()).min(1, { message: "Please select at least one facility or extra." })
});

type FormData = z.infer<typeof formSchema>;

const EmployerAboutBusiness: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const employeeCountOptions = [
    '1 employee',
    '2-5 employees',
    '6-10 employees',
    '11-20 employees',
    '21-50 employees',
    '51-100 employees',
    '100+ employees'
  ];

  // Industry options
  const industries = [
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

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rolesOffered: [],
      facilitiesAndExtras: []
    }
  });

  const onSubmit = (data: FormData) => {
    console.log('Business info submitted:', data);
    toast({
      title: "Business setup complete!",
      description: "Your employer profile has been created successfully",
    });
    navigate('/employer/account-confirmation');
  };

  const handleSkip = () => {
    toast({
      title: "Step skipped",
      description: "You can complete this later in your profile settings",
    });
    navigate('/employer/account-confirmation');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-background rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          {/* Main content container */}
          <div className="w-full h-full flex flex-col relative bg-white">
            
            {/* Header with back button and title */}
            <div className="px-6 pt-16 pb-6">
              <div className="flex items-center justify-between mb-8">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-12 h-12 bg-gray-100 rounded-xl shadow-sm"
                  onClick={() => navigate('/business-address')}
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </Button>
                <div className="flex-1"></div>
              </div>

              {/* Progress indicator and title */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">About Your Business</h1>
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                    <span className="text-sm font-medium text-gray-600">6/6</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form content */}
            <div className="flex-1 overflow-y-auto px-6 pb-20">
              <div className="mb-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Tell us about your business</h2>
                  <p className="text-gray-600">Help us understand your business to better match you with candidates.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Business Tagline */}
                <div>
                  <Label htmlFor="businessTagline" className="text-base font-medium text-gray-900 mb-2 block">
                    Business Tagline
                  </Label>
                  <Input
                    id="businessTagline"
                    placeholder="Quality produce, sustainable farming"
                    maxLength={200}
                    className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                    {...register("businessTagline")}
                  />
                  <p className="text-sm text-gray-500 mt-1">This will appear under your profile photo (max 200 characters)</p>
                  {errors.businessTagline && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessTagline.message}</p>
                  )}
                </div>

                {/* Years in Business */}
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-2 block">
                    How many years of trajectory does your business have? *
                  </Label>
                  <Select onValueChange={(value) => setValue("yearsInBusiness", value)}>
                    <SelectTrigger className="h-14 text-base bg-gray-100 border-0 rounded-xl">
                      <SelectValue placeholder="Select years in business" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                      {yearsOptions.map((year) => (
                        <SelectItem key={year} value={year} className="hover:bg-gray-100">
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.yearsInBusiness && (
                    <p className="text-red-500 text-sm mt-1">{errors.yearsInBusiness.message}</p>
                  )}
                </div>

                {/* Employee Count */}
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-2 block">
                    How many employees do you currently have? *
                  </Label>
                  <Select onValueChange={(value) => setValue("employeeCount", value)}>
                    <SelectTrigger className="h-14 text-base bg-gray-100 border-0 rounded-xl">
                      <SelectValue placeholder="Select number of employees" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                      {employeeCountOptions.map((count) => (
                        <SelectItem key={count} value={count} className="hover:bg-gray-100">
                          {count}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.employeeCount && (
                    <p className="text-red-500 text-sm mt-1">{errors.employeeCount.message}</p>
                  )}
                </div>

                {/* Industry field */}
                <div>
                  <Label htmlFor="industry" className="text-base font-medium text-gray-900 mb-2 block">
                    Industry *
                  </Label>
                  <Controller
                    name="industry"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-14 text-base bg-gray-100 border-0 rounded-xl">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry} className="hover:bg-gray-50">
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.industry && (
                    <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>
                  )}
                </div>

                {/* Roles Offered field */}
                <div>
                  <Label htmlFor="rolesOffered" className="text-base font-medium text-gray-900 mb-2 block">
                    Roles Offered *
                  </Label>
                  <Controller
                    name="rolesOffered"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select onValueChange={(value) => {
                          const currentValues = field.value || [];
                          if (!currentValues.includes(value)) {
                            field.onChange([...currentValues, value]);
                          }
                        }}>
                          <SelectTrigger className="h-14 text-base bg-gray-100 border-0 rounded-xl">
                            <SelectValue placeholder={field.value?.length > 0 ? `${field.value.length} role(s) selected` : "Select roles offered"} />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                            {roles.map((role) => (
                              <SelectItem key={role} value={role} className="hover:bg-gray-50">
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {field.value?.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {field.value.map((role, index) => (
                              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
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
                    <p className="text-red-500 text-sm mt-1">{errors.rolesOffered.message}</p>
                  )}
                </div>

                {/* Job Availability field */}
                <div>
                  <Label htmlFor="jobAvailability" className="text-base font-medium text-gray-900 mb-2 block">
                    Job Availability *
                  </Label>
                  <Controller
                    name="jobAvailability"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-14 text-base bg-gray-100 border-0 rounded-xl">
                          <SelectValue placeholder="Select job availability" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                          {jobAvailabilityOptions.map((option) => (
                            <SelectItem key={option} value={option} className="hover:bg-gray-50">
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.jobAvailability && (
                    <p className="text-red-500 text-sm mt-1">{errors.jobAvailability.message}</p>
                  )}
                </div>

                {/* Pay and Benefits field */}
                <div>
                  <Label htmlFor="payAndBenefits" className="text-base font-medium text-gray-900 mb-2 block">
                    Pay & Benefits *
                  </Label>
                  <Controller
                    name="payAndBenefits"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-14 text-base bg-gray-100 border-0 rounded-xl">
                          <SelectValue placeholder="Select pay and benefits" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                          {payBenefitsOptions.map((option) => (
                            <SelectItem key={option} value={option} className="hover:bg-gray-50">
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.payAndBenefits && (
                    <p className="text-red-500 text-sm mt-1">{errors.payAndBenefits.message}</p>
                  )}
                </div>

                {/* Facilities and Extras field */}
                <div>
                  <Label htmlFor="facilitiesAndExtras" className="text-base font-medium text-gray-900 mb-2 block">
                    Facilities & Extras *
                  </Label>
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
                          <SelectTrigger className="h-14 text-base bg-gray-100 border-0 rounded-xl">
                            <SelectValue placeholder={field.value?.length > 0 ? `${field.value.length} facility(ies) selected` : "Select facilities & extras"} />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                            {facilitiesExtras.map((facility) => (
                              <SelectItem key={facility} value={facility} className="hover:bg-gray-50">
                                {facility}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {field.value?.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {field.value.map((facility, index) => (
                              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
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
                    <p className="text-red-500 text-sm mt-1">{errors.facilitiesAndExtras.message}</p>
                  )}
                </div>

                {/* Continue button */}
                <div className="pt-8 space-y-4">
                  <Button 
                    type="submit"
                    className="w-full h-14 text-lg rounded-xl bg-slate-800 hover:bg-slate-700 text-white"
                  >
                    Continue
                  </Button>
                  
                  {/* Skip for now link */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleSkip}
                      className="text-gray-600 hover:text-gray-800 underline text-sm"
                    >
                      Skip for now
                    </button>
                  </div>
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