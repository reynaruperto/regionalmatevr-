import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  addressLine1: z.string().min(2, { message: "Address line 1 is required." }),
  addressLine2: z.string().optional(),
  suburb: z.string().min(2, { message: "Suburb is required." }),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(1, { message: "Please select a state." }),
  postCode: z.string().min(4, { message: "Please enter a valid post code." }).max(4, { message: "Post code must be 4 digits." })
});

type FormData = z.infer<typeof formSchema>;

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

const BusinessAddressForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: FormData) => {
    console.log('Address form submitted:', data);
    toast({
      title: "Business address saved!",
      description: "Proceeding to final step",
    });
    navigate('/employer-photo-upload');
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
                  onClick={() => navigate('/employer-about-business')}
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </Button>
                <div className="flex-1"></div>
              </div>

              {/* Progress indicator and title */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Business Address</h1>
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                    <span className="text-sm font-medium text-gray-600">4/4</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form content */}
            <div className="flex-1 px-6 overflow-y-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Business Address Line 1 field */}
                <div>
                  <Label htmlFor="addressLine1" className="text-base font-medium text-gray-900 mb-2 block">
                    Business Address Line 1
                  </Label>
                  <Input
                    id="addressLine1"
                    placeholder="11 Apple St."
                    className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                    {...register("addressLine1")}
                  />
                  {errors.addressLine1 && (
                    <p className="text-red-500 text-sm mt-1">{errors.addressLine1.message}</p>
                  )}
                </div>

                {/* Business Address Line 2 field */}
                <div>
                  <Label htmlFor="addressLine2" className="text-base font-medium text-gray-900 mb-2 block">
                    Street Address Line 2 (if applicable)
                  </Label>
                  <Input
                    id="addressLine2"
                    placeholder="Unit 5, Building B"
                    className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                    {...register("addressLine2")}
                  />
                  {errors.addressLine2 && (
                    <p className="text-red-500 text-sm mt-1">{errors.addressLine2.message}</p>
                  )}
                </div>

                {/* Suburb field */}
                <div>
                  <Label htmlFor="suburb" className="text-base font-medium text-gray-900 mb-2 block">
                    Suburb
                  </Label>
                  <Input
                    id="suburb"
                    placeholder="Spring Hill"
                    className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                    {...register("suburb")}
                  />
                  {errors.suburb && (
                    <p className="text-red-500 text-sm mt-1">{errors.suburb.message}</p>
                  )}
                </div>

                {/* City field */}
                <div>
                  <Label htmlFor="city" className="text-base font-medium text-gray-900 mb-2 block">
                    City
                  </Label>
                  <Input
                    id="city"
                    placeholder="Brisbane"
                    className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                    {...register("city")}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>

                {/* State field */}
                <div>
                  <Label htmlFor="state" className="text-base font-medium text-gray-900 mb-2 block">
                    State
                  </Label>
                  <Select onValueChange={(value) => setValue("state", value)}>
                    <SelectTrigger className="h-14 text-base bg-gray-100 border-0 rounded-xl">
                      <SelectValue placeholder="Queensland" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-[300px] overflow-y-auto">
                      {AUSTRALIAN_STATES.map((state) => (
                        <SelectItem 
                          key={state} 
                          value={state}
                          className="py-3 px-4 hover:bg-gray-50 cursor-pointer"
                        >
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                  )}
                </div>

                {/* Post Code field */}
                <div>
                  <Label htmlFor="postCode" className="text-base font-medium text-gray-900 mb-2 block">
                    Post Code
                  </Label>
                  <Input
                    id="postCode"
                    placeholder="4019"
                    maxLength={4}
                    className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                    {...register("postCode")}
                  />
                  {errors.postCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.postCode.message}</p>
                  )}
                </div>
              </form>
            </div>

            {/* Continue button */}
            <div className="px-6 pb-8 mt-8">
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

export default BusinessAddressForm;
