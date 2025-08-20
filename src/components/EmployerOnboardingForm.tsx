import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  givenName: z.string().min(2, { message: "Given name must be at least 2 characters." }),
  middleName: z.string().optional(),
  familyName: z.string().min(2, { message: "Family name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

const EmployerOnboardingForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    toast({
      title: "Account created successfully!",
      description: "Welcome to Regional Mate",
    });
    navigate('/employer-about-business');
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
                  onClick={() => navigate('/lets-begin')}
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </Button>
                <div className="flex-1"></div>
              </div>

              {/* Progress indicator and title */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Account Set Up</h1>
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                    <span className="text-sm font-medium text-gray-600">1/4</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form content */}
            <div className="flex-1 overflow-y-auto px-6 pb-20">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">About you</h2>
                <p className="text-gray-600">Find your RegionalMate. Let's get to know you!</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Given Name field */}
                <div>
                  <Label htmlFor="givenName" className="text-base font-medium text-gray-900 mb-2 block">
                    Given Name
                  </Label>
                  <Input
                    id="givenName"
                    placeholder="John"
                    className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                    {...register("givenName")}
                  />
                  {errors.givenName && (
                    <p className="text-red-500 text-sm mt-1">{errors.givenName.message}</p>
                  )}
                </div>

                {/* Middle Name field */}
                <div>
                  <Label htmlFor="middleName" className="text-base font-medium text-gray-900 mb-2 block">
                    Middle Name (if applicable)
                  </Label>
                  <Input
                    id="middleName"
                    placeholder="Michael"
                    className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                    {...register("middleName")}
                  />
                  {errors.middleName && (
                    <p className="text-red-500 text-sm mt-1">{errors.middleName.message}</p>
                  )}
                </div>

                {/* Family Name field */}
                <div>
                  <Label htmlFor="familyName" className="text-base font-medium text-gray-900 mb-2 block">
                    Family Name
                  </Label>
                  <Input
                    id="familyName"
                    placeholder="Doe"
                    className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                    {...register("familyName")}
                  />
                  {errors.familyName && (
                    <p className="text-red-500 text-sm mt-1">{errors.familyName.message}</p>
                  )}
                </div>

                {/* Email field */}
                <div>
                  <Label htmlFor="email" className="text-base font-medium text-gray-900 mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="johndoe@gmail.com"
                    className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Password field */}
                <div>
                  <Label htmlFor="password" className="text-base font-medium text-gray-900 mb-2 block">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••••••••••"
                      className="h-14 text-base bg-gray-100 border-0 rounded-xl pr-12"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-500" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password field */}
                <div>
                  <Label htmlFor="confirmPassword" className="text-base font-medium text-gray-900 mb-2 block">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••••••••••••••"
                      className="h-14 text-base bg-gray-100 border-0 rounded-xl pr-12"
                      {...register("confirmPassword")}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-500" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                  )}
                  {password && confirmPassword && password !== confirmPassword && !errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">Passwords don't match</p>
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

export default EmployerOnboardingForm;