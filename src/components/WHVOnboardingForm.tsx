import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import AustraliaIcon from './AustraliaIcon';

const WHVOnboardingForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    givenName: '',
    middleName: '',
    familyName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validatePassword = (password: string, givenName: string, familyName: string) => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one uppercase letter, one lowercase letter, and one number');
    }
    
    // Check if password contains name parts
    const nameRegex = new RegExp(givenName.toLowerCase(), 'i');
    const familyRegex = new RegExp(familyName.toLowerCase(), 'i');
    if (givenName && nameRegex.test(password)) {
      errors.push('Password cannot contain your given name');
    }
    if (familyName && familyRegex.test(password)) {
      errors.push('Password cannot contain your family name');
    }
    
    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear errors for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: {[key: string]: string} = {};
    
    // Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    const passwordErrors = validatePassword(formData.password, formData.givenName, formData.familyName);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors[0];
    }
    
    // Required field validation
    if (!formData.givenName.trim()) newErrors.givenName = 'Given name is required';
    if (!formData.familyName.trim()) newErrors.familyName = 'Family name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = 'Password confirmation is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    console.log('WHV Registration:', formData);
    // Future: Handle WHV registration logic
    navigate('/whv/email-confirmation');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-4 flex-shrink-0"></div>
          
          {/* Header - Fixed */}
          <div className="px-4 py-3 border-b bg-white flex-shrink-0">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => navigate('/lets-begin')}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h1 className="text-lg font-medium text-gray-900">Account Set Up</h1>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <span className="text-sm font-medium text-gray-600">1/6</span>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 iphone-scroll-content px-4 py-6">
            {/* Section Title */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">About you</h2>
              <p className="text-gray-600">Find your RegionalMate. Let's get to know you!</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="givenName" className="text-base font-medium text-gray-700">
                  Given Name
                </Label>
                <Input
                  id="givenName"
                  name="givenName"
                  type="text"
                  required
                  value={formData.givenName}
                  onChange={handleInputChange}
                  className={`h-12 bg-gray-100 border-0 text-gray-900 ${errors.givenName ? 'border-red-500' : ''}`}
                  placeholder="Peter"
                />
                {errors.givenName && <p className="text-red-500 text-sm">{errors.givenName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="middleName" className="text-base font-medium text-gray-700">
                  Middle Name (if applicable)
                </Label>
                <Input
                  id="middleName"
                  name="middleName"
                  type="text"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  className="h-12 bg-gray-100 border-0 text-gray-900"
                  placeholder="Benjamin"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="familyName" className="text-base font-medium text-gray-700">
                  Family Name(s)
                </Label>
                <Input
                  id="familyName"
                  name="familyName"
                  type="text"
                  required
                  value={formData.familyName}
                  onChange={handleInputChange}
                  className={`h-12 bg-gray-100 border-0 text-gray-900 ${errors.familyName ? 'border-red-500' : ''}`}
                  placeholder="Parker"
                />
                {errors.familyName && <p className="text-red-500 text-sm">{errors.familyName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`h-12 bg-gray-100 border-0 text-gray-900 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="peterparker@gmail.com"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`h-12 bg-gray-100 border-0 text-gray-900 pr-12 ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="••••••••••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-base font-medium text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`h-12 bg-gray-100 border-0 text-gray-900 pr-12 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    placeholder="••••••••••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>

              <div className="pt-8">
                <Button 
                  type="submit"
                  className="w-full h-14 text-lg rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium"
                >
                  Continue →
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WHVOnboardingForm;