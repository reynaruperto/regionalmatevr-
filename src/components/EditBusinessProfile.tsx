import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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
  abn: z.string().min(11, { message: "Please enter a valid ABN." }),
  industryType: z.string().min(1, { message: "Please select an industry type." }),
  businessPhone: z.string().min(10, { message: "Please enter a valid phone number." }),
  website: z.string().optional().or(z.literal("")),
  businessDescription: z.string().min(10, { message: "Please describe your business (minimum 10 characters)." }),
  yearsInBusiness: z.string().min(1, { message: "Please specify years in business." }),
  businessSize: z.string().min(1, { message: "Please select your business size." }),
  employeeQualities: z.string().min(10, { message: "Please describe what you look for in employees (minimum 10 characters)." }),
  addressLine1: z.string().min(2, { message: "Address line 1 is required." }),
  addressLine2: z.string().optional(),
  suburb: z.string().min(2, { message: "Suburb is required." }),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(1, { message: "Please select a state." }),
  postCode: z.string().min(4, { message: "Please enter a valid post code." }).max(4, { message: "Post code must be 4 digits." })
});

type FormData = z.infer<typeof formSchema>;

// Industry options from the existing BusinessOnboardingForm
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "Kangafarm",
      abn: "11 222 333 444", 
      industryType: "Agriculture & Farming",
      businessPhone: "+61 491 222 333",
      website: "www.kangafarm.com",
      businessDescription: "Family-run farm in regional Queensland, offering seasonal work in fruit picking and packing",
      yearsInBusiness: "5 years",
      businessSize: "1-10",
      employeeQualities: "We value hardworking individuals with a positive attitude, willingness to learn, and ability to work in a team environment",
      addressLine1: "11 Apple St.",
      addressLine2: "",
      suburb: "Spring Hill", 
      city: "Brisbane",
      state: "Queensland",
      postCode: "4019"
    }
  });

  const onSubmit = (data: FormData) => {
    console.log('Business profile updated:', data);
    toast({
      title: "Business Profile Updated",
      description: "Your business profile has been successfully updated",
    });
    navigate('/employer-dashboard');
  };

  const handleCancel = () => {
    navigate('/employer-dashboard');
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
                <h1 className="text-lg font-semibold text-gray-900">John Doe</h1>
                <button 
                  onClick={handleSubmit(onSubmit)}
                  className="flex items-center text-[#1E293B] font-medium underline"
                >
                  <Check size={16} className="mr-1" />
                  Save
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 overflow-y-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
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

                {/* ABN */}
                <div>
                  <Label htmlFor="abn" className="text-gray-600 mb-2 block text-sm">ABN</Label>
                  <Input
                    id="abn"
                    className="h-11 rounded-xl border-gray-200 bg-white text-sm"
                    {...register("abn")}
                  />
                  {errors.abn && (
                    <p className="text-red-500 text-xs mt-1">{errors.abn.message}</p>
                  )}
                </div>

                {/* Industry Type */}
                <div>
                  <Label htmlFor="industryType" className="text-gray-600 mb-2 block text-sm">Industry Type</Label>
                  <Select 
                    onValueChange={(value) => setValue("industryType", value, { shouldValidate: true })}
                    defaultValue="Agriculture & Farming"
                  >
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

                {/* Business Description */}
                <div>
                  <Label htmlFor="businessDescription" className="text-gray-600 mb-2 block text-sm">What does your business do?</Label>
                  <Textarea
                    id="businessDescription"
                    className="min-h-[80px] rounded-xl border-gray-200 bg-white resize-none text-sm"
                    {...register("businessDescription")}
                  />
                  {errors.businessDescription && (
                    <p className="text-red-500 text-xs mt-1">{errors.businessDescription.message}</p>
                  )}
                </div>

                {/* Years in Business */}
                <div>
                  <Label htmlFor="yearsInBusiness" className="text-gray-600 mb-2 block text-sm">How many years of trajectory does your business have?</Label>
                  <Input
                    id="yearsInBusiness"
                    className="h-11 rounded-xl border-gray-200 bg-white text-sm"
                    {...register("yearsInBusiness")}
                  />
                  {errors.yearsInBusiness && (
                    <p className="text-red-500 text-xs mt-1">{errors.yearsInBusiness.message}</p>
                  )}
                </div>

                {/* Business Size */}
                <div>
                  <Label htmlFor="businessSize" className="text-gray-600 mb-2 block text-sm">How many employees do you currently have?</Label>
                  <Input
                    id="businessSize"
                    placeholder="1-10, 11-50, 51-100, 100+"
                    className="h-11 rounded-xl border-gray-200 bg-white text-sm"
                    {...register("businessSize")}
                  />
                  {errors.businessSize && (
                    <p className="text-red-500 text-xs mt-1">{errors.businessSize.message}</p>
                  )}
                </div>

                {/* Employee Qualities */}
                <div>
                  <Label htmlFor="employeeQualities" className="text-gray-600 mb-2 block text-sm">What are you looking for as employee material?</Label>
                  <Textarea
                    id="employeeQualities"
                    className="min-h-[80px] rounded-xl border-gray-200 bg-white resize-none text-sm"
                    {...register("employeeQualities")}
                  />
                  {errors.employeeQualities && (
                    <p className="text-red-500 text-xs mt-1">{errors.employeeQualities.message}</p>
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