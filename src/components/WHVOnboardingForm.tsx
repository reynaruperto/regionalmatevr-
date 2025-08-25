import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
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
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const validatePassword = (password: string, confirmPassword: string) => {
    const newErrors: {[key: string]: string} = {};
    
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    
    // Check if password contains name or birth date (basic check)
    const lowerPassword = password.toLowerCase();
    const lowerGivenName = formData.givenName.toLowerCase();
    const lowerFamilyName = formData.familyName.toLowerCase();
    
    if (lowerGivenName && lowerPassword.includes(lowerGivenName)) {
      newErrors.password = 'Password cannot contain your name';
    }
    if (lowerFamilyName && lowerPassword.includes(lowerFamilyName)) {
      newErrors.password = 'Password cannot contain your name';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Real-time password validation
    if (name === 'password' || name === 'confirmPassword') {
      const password = name === 'password' ? value : formData.password;
      const confirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;
      const passwordErrors = validatePassword(password, confirmPassword);
      setErrors({
        ...errors,
        ...passwordErrors
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    const passwordErrors = validatePassword(formData.password, formData.confirmPassword);
    
    // Check terms agreement
    if (!agreeToTerms) {
      setErrors({
        ...passwordErrors,
        terms: 'You must agree to the Terms and Conditions'
      });
      return;
    }
    
    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors);
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
                  className="h-12 bg-gray-100 border-0 text-gray-900"
                  placeholder="Peter"
                />
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
                  className="h-12 bg-gray-100 border-0 text-gray-900"
                  placeholder="Parker"
                />
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
                  className="h-12 bg-gray-100 border-0 text-gray-900"
                  placeholder="peterparker@gmail.com"
                />
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
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
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
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3 pt-4">
                <Checkbox 
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                  className="mt-0.5"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                  I agree to the{' '}
                  <button type="button" className="text-orange-500 underline hover:text-orange-600">
                    Terms and Conditions
                  </button>
                  {' '}and{' '}
                  <button type="button" className="text-orange-500 underline hover:text-orange-600">
                    Privacy Policy
                  </button>
                </label>
              </div>
              {errors.terms && (
                <p className="text-red-500 text-sm">{errors.terms}</p>
              )}

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