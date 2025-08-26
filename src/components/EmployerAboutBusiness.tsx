import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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
  businessDescription: z.string().min(10, { message: "Please describe your business (minimum 10 characters)." }),
  yearsInBusiness: z.string().min(1, { message: "Please select years in business." }),
  employeeCount: z.string().min(1, { message: "Please select number of employees." }),
  employeeQualities: z.string().min(10, { message: "Please describe what you look for in employees (minimum 10 characters)." }),
  businessTagline: z.string().max(200, { message: "Tagline must be 200 characters or less." }).optional()
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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: FormData) => {
    console.log('Business info submitted:', data);
    toast({
      title: "Business information saved!",
      description: "Let's upload your profile photo",
    });
    navigate('/employer/photo-upload');
  };

  const handleSkip = () => {
    toast({
      title: "Step skipped",
      description: "You can complete this later in your profile settings",
    });
    navigate('/employer/photo-upload');
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
                    <span className="text-sm font-medium text-gray-600">5/6</span>
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
                {/* Business Description */}
                <div>
                  <Label htmlFor="businessDescription" className="text-base font-medium text-gray-900 mb-2 block">
                    What does your business do? *
                  </Label>
                  <Textarea
                    id="businessDescription"
                    placeholder="We are a family-owned agricultural business specializing in organic fruit production..."
                    className="min-h-24 text-base bg-gray-100 border-0 rounded-xl resize-none"
                    {...register("businessDescription")}
                  />
                  {errors.businessDescription && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessDescription.message}</p>
                  )}
                </div>

                {/* Business Tagline */}
                <div>
                  <Label htmlFor="businessTagline" className="text-base font-medium text-gray-900 mb-2 block">
                    Business Tagline (Optional)
                  </Label>
                  <Input
                    id="businessTagline"
                    placeholder="Quality produce, sustainable farming"
                    maxLength={200}
                    className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                    {...register("businessTagline")}
                  />
                  <p className="text-sm text-gray-500 mt-1">Maximum 200 characters</p>
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

                {/* Employee Qualities */}
                <div>
                  <Label htmlFor="employeeQualities" className="text-base font-medium text-gray-900 mb-2 block">
                    What are you looking for as employee material? *
                  </Label>
                  <Textarea
                    id="employeeQualities"
                    placeholder="We value hardworking individuals with a positive attitude, willingness to learn, and ability to work in a team environment..."
                    className="min-h-24 text-base bg-gray-100 border-0 rounded-xl resize-none"
                    {...register("employeeQualities")}
                  />
                  <p className="text-sm text-gray-500 mt-1">Keywords will be extracted for better matching</p>
                  {errors.employeeQualities && (
                    <p className="text-red-500 text-sm mt-1">{errors.employeeQualities.message}</p>
                  )}
                </div>

                {/* Continue button */}
                <div className="pt-8 space-y-4">
                  <Button 
                    type="submit"
                    className="w-full h-14 text-lg rounded-xl bg-slate-800 hover:bg-slate-700 text-white"
                  >
                    Continue to Photo Upload
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