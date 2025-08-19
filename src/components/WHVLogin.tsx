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
    navigate('/dashboard');
  };

  const handleGetStarted = () => {
    navigate('/lets-begin');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-4 flex-shrink-0"></div>
          
          {/* Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
            {/* Logo */}
            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-12">
              <div className="text-center">
                <div className="text-orange-500 text-sm font-bold">RM</div>
                <div className="text-xs text-gray-600 font-medium">REGIONAL</div>
                <div className="text-xs text-gray-600 font-medium">MATE</div>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
              {/* Email */}
              <div>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-14 bg-gray-100 border-0 text-gray-900 rounded-xl"
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
                  className="h-14 bg-gray-100 border-0 text-gray-900 rounded-xl pr-12"
                  placeholder="••••••••••••••••"
                  required
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

              {/* Sign In Button */}
              <div className="pt-4">
                <Button 
                  type="submit"
                  className="w-full h-14 text-lg rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium"
                >
                  Sign in
                </Button>
              </div>
            </form>

            {/* Get Started Link */}
            <div className="mt-16 text-center">
              <span className="text-gray-500">Don't have an account? </span>
              <button 
                onClick={handleGetStarted}
                className="text-gray-900 font-semibold hover:underline"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WHVLogin;