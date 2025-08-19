import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import AustraliaIcon from './AustraliaIcon';
import { useToast } from '@/hooks/use-toast';

const EmployerSignInForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically validate credentials
    toast({
      title: "Success",
      description: "Signed in successfully",
    });
    
    // Navigate to dashboard or home
    navigate('/');
  };

  const handleForgotPassword = () => {
    toast({
      title: "Forgot Password",
      description: "Password reset functionality would be implemented here",
    });
  };

  const handleGetStarted = () => {
    navigate('/lets-begin');
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

            {/* Content */}
            <div className="flex-1 flex items-center justify-center px-6 pt-16">
              <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                
                {/* Logo */}
                <div className="flex justify-center mb-8">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center border border-gray-100">
                    <AustraliaIcon className="w-8 h-8" />
                  </div>
                </div>

                {/* Sign In Form */}
                <form onSubmit={handleSignIn} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="sr-only">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-xl border-gray-200 placeholder:text-gray-400"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2 relative">
                    <Label htmlFor="password" className="sr-only">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 rounded-xl border-gray-200 placeholder:text-gray-400 pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Sign In Button */}
                  <Button 
                    type="submit"
                    variant="navy"
                    className="w-full h-12 text-base rounded-xl"
                  >
                    Sign in
                  </Button>
                </form>

                {/* Forgot Password */}
                <div className="mt-4 text-center">
                  <button
                    onClick={handleForgotPassword}
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Get Started Link */}
                <div className="mt-8 text-center">
                  <span className="text-gray-500 text-sm">Don't have an account? </span>
                  <button
                    onClick={handleGetStarted}
                    className="text-sm font-semibold text-gray-900 hover:text-gray-700"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerSignInForm;