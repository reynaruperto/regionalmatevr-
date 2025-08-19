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
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number." }),
  businessDescription: z.string().min(10, { message: "Description must be at least 10 characters." }),
  website: z.string().optional().or(z.literal("")),
  industryType: z.string().min(1, { message: "Please select an industry type." }),
  addressLine1: z.string().min(5, { message: "Please enter a valid address." }),
  regionalArea: z.string().min(1, { message: "Please select a regional area." }),
  postCode: z.string().min(4, { message: "Please enter a valid post code." })
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

// Regional areas recognized by Department of Home Affairs for Working Holiday visa
const REGIONAL_AREAS = [
  // Queensland Regional Areas
  'QLD - Bundaberg', 'QLD - Cairns', 'QLD - Charleville', 'QLD - Emerald',
  'QLD - Gladstone', 'QLD - Mackay', 'QLD - Maryborough', 'QLD - Mount Isa',
  'QLD - Rockhampton', 'QLD - Toowoomba', 'QLD - Townsville', 'QLD - Warwick',
  
  // New South Wales Regional Areas  
  'NSW - Albury', 'NSW - Armidale', 'NSW - Bathurst', 'NSW - Broken Hill',
  'NSW - Dubbo', 'NSW - Goulburn', 'NSW - Grafton', 'NSW - Orange',
  'NSW - Port Macquarie', 'NSW - Tamworth', 'NSW - Wagga Wagga',
  
  // Victoria Regional Areas
  'VIC - Ballarat', 'VIC - Bendigo', 'VIC - Geelong', 'VIC - Horsham',
  'VIC - Latrobe Valley', 'VIC - Mildura', 'VIC - Shepparton', 'VIC - Warrnambool',
  
  // Western Australia Regional Areas
  'WA - Albany', 'WA - Broome', 'WA - Bunbury', 'WA - Carnarvon',
  'WA - Esperance', 'WA - Geraldton', 'WA - Kalgoorlie', 'WA - Karratha',
  'WA - Port Hedland',
  
  // South Australia Regional Areas
  'SA - Mount Gambier', 'SA - Port Augusta', 'SA - Port Lincoln', 'SA - Whyalla',
  
  // Tasmania (All Areas Regional)
  'TAS - Burnie', 'TAS - Devonport', 'TAS - Hobart', 'TAS - Launceston',
  
  // Northern Territory (All Areas Regional)
  'NT - Alice Springs', 'NT - Darwin', 'NT - Katherine',
  
  // Australian Capital Territory
  'ACT - Canberra (Limited Regional Work)'
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
      phoneNumber: "+61 491 222 333",
      businessDescription: "Family-run farm in regional Queensland, offering seasonal work in fruit picking and packing",
      website: "www.kangafarm.com",
      industryType: "Agriculture & Farming",
      addressLine1: "11 Apple St.",
      regionalArea: "QLD - Bundaberg",
      postCode: "4019"
    }
  });

  const onSubmit = (data: FormData) => {
    console.log('Business profile updated:', data);
    toast({
      title: "Business Profile Updated",
      description: "Your business profile has been successfully updated",
    });
    navigate('/dashboard');
  };

  const handleCancel = () => {
    navigate('/dashboard');
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
                  <Label htmlFor="businessName" className="text-gray-600 mb-2 block">Business Name</Label>
                  <Input
                    id="businessName"
                    className="h-12 rounded-xl border-gray-200 bg-white"
                    {...register("businessName")}
                  />
                  {errors.businessName && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>
                  )}
                </div>

                {/* ABN */}
                <div>
                  <Label htmlFor="abn" className="text-gray-600 mb-2 block">ABN</Label>
                  <Input
                    id="abn"
                    className="h-12 rounded-xl border-gray-200 bg-white"
                    {...register("abn")}
                  />
                  {errors.abn && (
                    <p className="text-red-500 text-sm mt-1">{errors.abn.message}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <Label htmlFor="phoneNumber" className="text-gray-600 mb-2 block">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    className="h-12 rounded-xl border-gray-200 bg-white"
                    {...register("phoneNumber")}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                  )}
                </div>

                {/* Add Business Description */}
                <div>
                  <Label htmlFor="businessDescription" className="text-gray-600 mb-2 block">Add Business Description</Label>
                  <Textarea
                    id="businessDescription"
                    className="min-h-[80px] rounded-xl border-gray-200 bg-white resize-none"
                    {...register("businessDescription")}
                  />
                  {errors.businessDescription && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessDescription.message}</p>
                  )}
                </div>

                {/* Website */}
                <div>
                  <Label htmlFor="website" className="text-gray-600 mb-2 block">Website</Label>
                  <Input
                    id="website"
                    className="h-12 rounded-xl border-gray-200 bg-white"
                    {...register("website")}
                  />
                  {errors.website && (
                    <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
                  )}
                </div>

                {/* Industry Type */}
                <div>
                  <Label htmlFor="industryType" className="text-gray-600 mb-2 block">Industry Type</Label>
                  <Select 
                    onValueChange={(value) => setValue("industryType", value, { shouldValidate: true })}
                    defaultValue="Agriculture & Farming"
                  >
                    <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white">
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

                {/* Business Address Line 1 */}
                <div>
                  <Label htmlFor="addressLine1" className="text-gray-600 mb-2 block">Business Address Line 1</Label>
                  <Input
                    id="addressLine1"
                    className="h-12 rounded-xl border-gray-200 bg-white"
                    {...register("addressLine1")}
                  />
                  {errors.addressLine1 && (
                    <p className="text-red-500 text-sm mt-1">{errors.addressLine1.message}</p>
                  )}
                </div>

                {/* Regional Area */}
                <div>
                  <Label htmlFor="regionalArea" className="text-gray-600 mb-2 block">Regional Area</Label>
                  <Select 
                    onValueChange={(value) => setValue("regionalArea", value, { shouldValidate: true })}
                    defaultValue="QLD - Bundaberg"
                  >
                    <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white">
                      <SelectValue placeholder="QLD - Bundaberg" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-[300px] overflow-y-auto">
                      {REGIONAL_AREAS.map((area) => (
                        <SelectItem 
                          key={area} 
                          value={area}
                          className="py-3 px-4 hover:bg-gray-50 cursor-pointer"
                        >
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.regionalArea && (
                    <p className="text-red-500 text-sm mt-1">{errors.regionalArea.message}</p>
                  )}
                </div>

                {/* Post Code */}
                <div>
                  <Label htmlFor="postCode" className="text-gray-600 mb-2 block">Post Code</Label>
                  <Input
                    id="postCode"
                    className="h-12 rounded-xl border-gray-200 bg-white"
                    {...register("postCode")}
                  />
                  {errors.postCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.postCode.message}</p>
                  )}
                </div>

                <div className="h-20"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBusinessProfile;