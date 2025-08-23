import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  businessName: z.string().min(2, { message: "Business name must be at least 2 characters." }),
  abn: z.string().min(11, { message: "Please enter a valid ABN." }),
  industryType: z.string().min(1, { message: "Please select an industry type." }),
  businessPhone: z.string().min(10, { message: "Please enter a valid phone number." }),
  website: z.string().optional().or(z.literal(""))
});

type FormData = z.infer<typeof formSchema>;

// Official industries from Department of Home Affairs that are in demand for Working Holiday Visa holders
const INDUSTRY_OPTIONS = [
  "Agriculture & Farming",
  "Plant and Animal Cultivation", 
  "Horticulture",
  "Fruit & Vegetable Growing",
  "Livestock Farming",
  "Dairy Farming",
  "Fishing and Pearling",
  "Aquaculture",
  "Tree Farming and Felling",
  "Forestry",
  "Mining",
  "Coal Mining",
  "Metal Ore Mining", 
  "Oil and Gas Extraction",
  "Construction",
  "Building Construction",
  "Civil Engineering Construction",
  "Tourism and Hospitality",
  "Accommodation Services",
  "Food and Beverage Services",
  "Travel and Tourism Services",
  "Event and Entertainment",
  "Natural Disaster Recovery",
  "Bushfire Recovery",
  "Healthcare and Medical",
  "COVID-19 Critical Services",
  "Other Eligible Industries"
];

const BusinessOnboardingForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      abn: "",
      industryType: "",
      businessPhone: "",
      website: ""
    }
  });

  const onSubmit = (data: FormData) => {
    console.log('Business form submitted:', data);
    toast({
      title: "Business information saved!",
      description: "Proceeding to next step",
    });
    navigate('/employer/about-business');
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
                  onClick={() => navigate('/employer/onboarding')}
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </Button>
                <div className="flex-1"></div>
              </div>

              {/* Progress indicator and title */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Business Details</h1>
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                    <span className="text-sm font-medium text-gray-600">2/4</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form content */}
            <div className="flex-1 px-6 overflow-y-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Business Name field */}
                <div>
                  <Label htmlFor="businessName" className="text-base font-medium text-gray-900 mb-2 block">
                    Business Name
                  </Label>
                  <Input
                    id="businessName"
                    placeholder="Kangafarm"
                    className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                    {...register("businessName")}
                  />
                  {errors.businessName && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>
                  )}
                </div>

                {/* ABN field */}
                <div>
                  <Label htmlFor="abn" className="text-base font-medium text-gray-900 mb-2 block">
                    ABN
                  </Label>
                  <Input
                    id="abn"
                    placeholder="11 222 333 444"
                    className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                    {...register("abn")}
                  />
                  {errors.abn && (
                    <p className="text-red-500 text-sm mt-1">{errors.abn.message}</p>
                  )}
                </div>

                {/* Industry Type field */}
                <div>
                  <Label htmlFor="industryType" className="text-base font-medium text-gray-900 mb-2 block">
                    Industry Type
                  </Label>
                  <Select 
                    onValueChange={(value) => setValue("industryType", value, { shouldValidate: true })}
                    defaultValue=""
                  >
                    <SelectTrigger className="h-14 text-base bg-gray-100 border-0 rounded-xl">
                      <SelectValue placeholder="Agriculture & Farming" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-[300px] overflow-y-auto">
                      {INDUSTRY_OPTIONS.map((industry) => (
                        <SelectItem 
                          key={industry} 
                          value={industry}
                          className="py-3 px-4 hover:bg-gray-50 cursor-pointer"
                        >
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.industryType && (
                    <p className="text-red-500 text-sm mt-1">{errors.industryType.message}</p>
                  )}
                </div>

                {/* Business Phone field */}
                <div>
                  <Label htmlFor="businessPhone" className="text-base font-medium text-gray-900 mb-2 block">
                    Business Phone Number
                  </Label>
                  <Input
                    id="businessPhone"
                    placeholder="+61 491 222 333"
                    className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                    {...register("businessPhone")}
                  />
                  {errors.businessPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessPhone.message}</p>
                  )}
                </div>

                {/* Website field */}
                <div>
                  <Label htmlFor="website" className="text-base font-medium text-gray-900 mb-2 block">
                    Website
                  </Label>
                  <Input
                    id="website"
                    placeholder="www.kangafarm.com"
                    className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                    {...register("website")}
                  />
                  {errors.website && (
                    <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
                  )}
                </div>
              </form>
            </div>

            {/* Continue button */}
            <div className="px-6 pb-8 mt-4">
              <Button 
                onClick={handleSubmit(onSubmit)}
                className="w-full h-14 text-lg rounded-xl bg-slate-800 hover:bg-slate-700 text-white"
              >
                Continue
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessOnboardingForm;