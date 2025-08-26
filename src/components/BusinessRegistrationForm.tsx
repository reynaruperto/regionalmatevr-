import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  abn: z.string()
    .min(11, { message: "ABN must be 11 digits." })
    .max(11, { message: "ABN must be 11 digits." })
    .regex(/^\d+$/, { message: "ABN must contain only numbers." }),
  businessPhone: z.string()
    .min(10, { message: "Please enter a valid phone number." })
    .regex(/^[\d\s\+\-\(\)]+$/, { message: "Please enter a valid phone number." }),
  businessEmail: z.string().email({ message: "Please enter a valid business email address." })
});

type FormData = z.infer<typeof formSchema>;

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

    setIsVerifyingAbn(true);
    
    // Simulate ABN verification API call
    setTimeout(() => {
      setIsVerifyingAbn(false);
      // Mock successful verification
      if (abnValue === "12345678901") {
        setBusinessName("Sample Business Pty Ltd");
        setAbnVerified(true);
        toast({
          title: "ABN Verified",
          description: "Business found: Sample Business Pty Ltd",
        });
      } else {
        setBusinessName("Regional Farm Business Pty Ltd");
        setAbnVerified(true);
        toast({
          title: "ABN Verified",
          description: "Business found: Regional Farm Business Pty Ltd",
        });
      }
    }, 2000);
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
    
    // Store business registration data
    localStorage.setItem('businessRegistration', JSON.stringify({
      ...data,
      businessName,
      abnVerified: true
    }));
    
    toast({
      title: "Business registration saved!",
      description: "Let's continue with your business address",
    });
    navigate('/business-address');
  };

  const handleSkip = () => {
    toast({
      title: "Step skipped",
      description: "You can complete this later in your profile settings",
    });
    navigate('/business-address');
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
                    <span className="text-sm font-medium text-gray-600">3/6</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form content */}
            <div className="flex-1 overflow-y-auto px-6 pb-20">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Register your business</h2>
                <p className="text-gray-600">We need to verify your business details and contact information.</p>
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
                      placeholder="12345678901"
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
                          : 'bg-blue-600 hover:bg-blue-700'
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

                {/* Business Phone */}
                <div>
                  <Label htmlFor="businessPhone" className="text-base font-medium text-gray-900 mb-2 block">
                    Business Phone Number *
                  </Label>
                  <Input
                    id="businessPhone"
                    type="tel"
                    placeholder="+61 2 1234 5678"
                    className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                    {...register("businessPhone")}
                  />
                  {errors.businessPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessPhone.message}</p>
                  )}
                </div>

                {/* Business Email */}
                <div>
                  <Label htmlFor="businessEmail" className="text-base font-medium text-gray-900 mb-2 block">
                    Business Email Address *
                  </Label>
                  <Input
                    id="businessEmail"
                    type="email"
                    placeholder="info@yourfarm.com.au"
                    className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                    {...register("businessEmail")}
                  />
                  {errors.businessEmail && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessEmail.message}</p>
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

export default BusinessRegistrationForm;