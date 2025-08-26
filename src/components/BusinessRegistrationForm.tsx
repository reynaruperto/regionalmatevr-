import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  abn: z.string()
    .min(11, { message: "ABN must be 11 digits." })
    .max(11, { message: "ABN must be 11 digits." })
    .regex(/^\d+$/, { message: "ABN must contain only numbers." }),
  companyName: z.string().min(2, { message: "Company name is required." }),
  website: z.string().url({ message: "Please enter a valid website URL." }).optional().or(z.literal("")),
  businessPhone: z.string()
    .min(10, { message: "Please enter a valid phone number." })
    .regex(/^[\d\s\+\-\(\)]+$/, { message: "Please enter a valid phone number." }),
  
  addressLine1: z.string().min(2, { message: "Address line 1 is required." }),
  addressLine2: z.string().optional(),
  suburb: z.string().min(2, { message: "Suburb is required." }),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(1, { message: "Please select a state." }),
  postCode: z.string()
    .min(4, { message: "Please enter a valid post code." })
    .max(4, { message: "Post code must be 4 digits." })
    .regex(/^\d+$/, { message: "Post code must contain only numbers." })
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

const BusinessRegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [abnVerified, setAbnVerified] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [isVerifyingAbn, setIsVerifyingAbn] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const abnValue = watch("abn");

  const verifyAbn = async () => {
    if (!abnValue || abnValue.length !== 11) {
      toast({
        title: "Invalid ABN",
        description: "Please enter a valid 11-digit ABN",
        variant: "destructive"
      });
      return;
    }

    // For UX testing - automatically verify any 11-digit ABN
    setBusinessName("Sample Business Pty Ltd");
    setAbnVerified(true);
    toast({
      title: "ABN Verified",
      description: "Business found: Sample Business Pty Ltd",
    });
  };

  const onSubmit = (data: FormData) => {
    if (!abnVerified) {
      toast({
        title: "ABN Required",
        description: "Please verify your ABN before continuing",
        variant: "destructive"
      });
      return;
    }
    
    console.log('Business registration submitted:', { ...data, businessName });
    
    // Store business registration and address data
    localStorage.setItem('businessRegistration', JSON.stringify({
      ...data,
      businessName,
      abnVerified: true
    }));
    
    toast({
      title: "Business details saved!",
      description: "Let's continue with information about your business",
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
                  onClick={() => navigate('/employer/email-confirmation')}
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </Button>
                <div className="flex-1"></div>
              </div>

              {/* Progress indicator and title */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Business Registration</h1>
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                    <span className="text-sm font-medium text-gray-600">3/4</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form content */}
            <div className="flex-1 overflow-y-auto px-6 pb-20">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Register your business</h2>
                <p className="text-gray-600">We need to verify your business details, contact information and address.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* ABN Registration */}
                <div>
                  <Label htmlFor="abn" className="text-base font-medium text-gray-900 mb-2 block">
                    Australian Business Number (ABN) *
                  </Label>
                  <div className="flex gap-3">
                    <Input
                      id="abn"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Enter 11 digits"
                      maxLength={11}
                      disabled={abnVerified}
                      className={`h-14 text-base border-0 rounded-xl flex-1 ${
                        abnVerified ? 'bg-green-50 text-green-800' : 'bg-gray-100'
                      }`}
                      {...register("abn")}
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, '');
                        register("abn").onChange(e);
                      }}
                    />
                    <Button
                      type="button"
                      onClick={verifyAbn}
                      disabled={abnVerified || isVerifyingAbn}
                      className={`h-14 px-6 rounded-xl ${
                        abnVerified 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-orange-500 hover:bg-orange-600'
                      } text-white`}
                    >
                      {isVerifyingAbn ? (
                        "Verifying..."
                      ) : abnVerified ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        "Verify"
                      )}
                    </Button>
                  </div>
                  {errors.abn && (
                    <p className="text-red-500 text-sm mt-1">{errors.abn.message}</p>
                  )}
                  {abnVerified && businessName && (
                    <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 font-medium">✓ Business Name: {businessName}</p>
                    </div>
                  )}
                </div>

                {/* Website */}
                <div>
                  <Label htmlFor="website" className="text-base font-medium text-gray-900 mb-2 block">
                    Business Website (Optional)
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://www.yourfarm.com.au"
                    disabled={!abnVerified}
                    className={`h-14 text-base border-0 rounded-xl ${
                      !abnVerified ? 'bg-gray-200 text-gray-400' : 'bg-gray-100'
                    }`}
                    {...register("website")}
                  />
                  {errors.website && (
                    <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <Label htmlFor="companyName" className="text-base font-medium text-gray-900 mb-2 block">
                    Company Name *
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="Enter your company name"
                    disabled={!abnVerified}
                    className={`h-14 text-base border-0 rounded-xl ${
                      !abnVerified ? 'bg-gray-200 text-gray-400' : 'bg-gray-100'
                    }`}
                    {...register("companyName")}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
                  )}
                </div>

                {/* Business Phone */}
                <div>
                  <Label htmlFor="businessPhone" className="text-base font-medium text-gray-900 mb-2 block">
                    Business Phone Number *
                  </Label>
                  <Input
                    id="businessPhone"
                    type="tel"
                    placeholder="+61 2 1234 5678"
                    disabled={!abnVerified}
                    className={`h-14 text-base border-0 rounded-xl ${
                      !abnVerified ? 'bg-gray-200 text-gray-400' : 'bg-gray-100'
                    }`}
                    {...register("businessPhone")}
                  />
                  {errors.businessPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessPhone.message}</p>
                  )}
                </div>

                {/* Business Address Line 1 */}
                <div>
                  <Label htmlFor="addressLine1" className="text-base font-medium text-gray-900 mb-2 block">
                    Business Address Line 1 *
                  </Label>
                  <Input
                    id="addressLine1"
                    placeholder="11 Apple St."
                    disabled={!abnVerified}
                    className={`h-14 text-base border-0 rounded-xl ${
                      !abnVerified ? 'bg-gray-200 text-gray-400' : 'bg-gray-100'
                    }`}
                    {...register("addressLine1")}
                  />
                  {errors.addressLine1 && (
                    <p className="text-red-500 text-sm mt-1">{errors.addressLine1.message}</p>
                  )}
                </div>

                {/* Business Address Line 2 */}
                <div>
                  <Label htmlFor="addressLine2" className="text-base font-medium text-gray-900 mb-2 block">
                    Address Line 2 (Optional)
                  </Label>
                  <Input
                    id="addressLine2"
                    placeholder="Unit 5, Building B"
                    disabled={!abnVerified}
                    className={`h-14 text-base border-0 rounded-xl ${
                      !abnVerified ? 'bg-gray-200 text-gray-400' : 'bg-gray-100'
                    }`}
                    {...register("addressLine2")}
                  />
                  {errors.addressLine2 && (
                    <p className="text-red-500 text-sm mt-1">{errors.addressLine2.message}</p>
                  )}
                </div>

                {/* Suburb */}
                <div>
                  <Label htmlFor="suburb" className="text-base font-medium text-gray-900 mb-2 block">
                    Suburb *
                  </Label>
                  <Input
                    id="suburb"
                    placeholder="Spring Hill"
                    disabled={!abnVerified}
                    className={`h-14 text-base border-0 rounded-xl ${
                      !abnVerified ? 'bg-gray-200 text-gray-400' : 'bg-gray-100'
                    }`}
                    {...register("suburb")}
                  />
                  {errors.suburb && (
                    <p className="text-red-500 text-sm mt-1">{errors.suburb.message}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <Label htmlFor="city" className="text-base font-medium text-gray-900 mb-2 block">
                    City *
                  </Label>
                  <Input
                    id="city"
                    placeholder="Brisbane"
                    disabled={!abnVerified}
                    className={`h-14 text-base border-0 rounded-xl ${
                      !abnVerified ? 'bg-gray-200 text-gray-400' : 'bg-gray-100'
                    }`}
                    {...register("city")}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>

                {/* State */}
                <div>
                  <Label htmlFor="state" className="text-base font-medium text-gray-900 mb-2 block">
                    State *
                  </Label>
                  <Select onValueChange={(value) => setValue("state", value)} disabled={!abnVerified}>
                    <SelectTrigger className={`h-14 text-base border-0 rounded-xl ${!abnVerified ? 'bg-gray-200 text-gray-400' : 'bg-gray-100'}`}>
                      <SelectValue placeholder="Select a state" />
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

                {/* Post Code */}
                <div>
                  <Label htmlFor="postCode" className="text-base font-medium text-gray-900 mb-2 block">
                    Post Code *
                  </Label>
                  <Input
                    id="postCode"
                    placeholder="4019"
                    maxLength={4}
                    disabled={!abnVerified}
                    className={`h-14 text-base border-0 rounded-xl ${
                      !abnVerified ? 'bg-gray-200 text-gray-400' : 'bg-gray-100'
                    }`}
                    {...register("postCode")}
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, '');
                      register("postCode").onChange(e);
                    }}
                  />
                  {errors.postCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.postCode.message}</p>
                  )}
                </div>

                {/* Continue button */}
                <div className="pt-8">
                  <Button 
                    type="submit"
                    className="w-full h-14 text-lg rounded-xl bg-slate-800 hover:bg-slate-700 text-white"
                  >
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

export default BusinessRegistrationForm;