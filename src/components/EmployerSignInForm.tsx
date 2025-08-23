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
    
    // Navigate to dashboard
    navigate('/employer/dashboard');
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
        <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-300 rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          {/* Main content container */}
          <div className="w-full h-full flex flex-col relative">

            {/* Content */}
            <div className="flex-1 flex items-center justify-center px-6 pt-16">
              <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-lg">
                
                {/* Logo */}
                <div className="flex justify-center mb-12">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                    <AustraliaIcon className="w-10 h-10" />
                  </div>
                </div>

                {/* Sign In Form */}
                <form onSubmit={handleSignIn} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 rounded-2xl border-gray-200 bg-gray-50 placeholder:text-gray-400 text-base"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 rounded-2xl border-gray-200 bg-gray-50 placeholder:text-gray-400 text-base pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Sign In Button */}
                  <div className="pt-2">
                    <Button 
                      type="submit"
                      className="w-full h-14 text-base rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-medium"
                    >
                      Sign in
                    </Button>
                  </div>
                </form>

                {/* Forgot Password */}
                <div className="mt-6 text-center">
                  <button
                    onClick={handleForgotPassword}
                    className="text-base text-blue-500 hover:text-blue-700 underline font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Get Started Link */}
                <div className="mt-12 text-center">
                  <span className="text-gray-600 text-base">Don't have an account? </span>
                  <button
                    onClick={handleGetStarted}
                    className="text-base font-semibold text-gray-900 hover:text-gray-700"
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