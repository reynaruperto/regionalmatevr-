import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WHVLogin: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('WHV Login:', formData);
    toast({
      title: "Welcome back!",
      description: "Successfully signed in to Regional Mate",
    });
    navigate('/whv-dashboard');
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
                    <img 
                      src="/lovable-uploads/26827d2b-5f93-4b4e-9f49-77007dda53ca.png" 
                      alt="Regional Mate Logo" 
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-14 rounded-2xl border-gray-200 bg-gray-50 placeholder:text-gray-400 text-base"
                      placeholder="peterparker@gmail.com"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      className="h-14 rounded-2xl border-gray-200 bg-gray-50 placeholder:text-gray-400 text-base pr-12"
                      placeholder="••••••••••••••••"
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
                      className="w-full h-14 text-base rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-medium"
                    >
                      Sign in
                    </Button>
                  </div>
                </form>

                {/* Forgot Password */}
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    className="text-base text-blue-500 hover:text-blue-700 underline font-medium"
                  >
                    Forgot password?
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

export default WHVLogin;