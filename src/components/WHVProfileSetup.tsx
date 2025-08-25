import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

const WHVProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    nationality: '',
    visaType: '',
    visaExpiryDate: '',
    countryCode: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // WHV eligible countries
  const whvCountries = [
    'Argentina', 'Austria', 'Belgium', 'Canada', 'Chile', 'Czech Republic',
    'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Hong Kong',
    'Hungary', 'Ireland', 'Israel', 'Italy', 'Japan', 'Latvia', 'Lithuania',
    'Luxembourg', 'Malta', 'Netherlands', 'Norway', 'Poland', 'Portugal',
    'Slovakia', 'Slovenia', 'South Korea', 'Spain', 'Sweden', 'Taiwan',
    'Turkey', 'United Kingdom', 'United States', 'Uruguay'
  ];

  // Working Holiday Visa types
  const visaTypes = [
    '417 (Working Holiday Visa)',
    '462 (Work and Holiday Visa)',
    '417 Second Year Extension',
    '462 Second Year Extension',
    '417 Third Year Extension',
    '462 Third Year Extension'
  ];

  // Country codes for phone numbers
  const countryCodes = [
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+1', country: 'United States', flag: '🇺🇸' },
    { code: '+1', country: 'Canada', flag: '🇨🇦' },
    { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+54', country: 'Argentina', flag: '🇦🇷' },
    { code: '+43', country: 'Austria', flag: '🇦🇹' },
    { code: '+32', country: 'Belgium', flag: '🇧🇪' },
    { code: '+56', country: 'Chile', flag: '🇨🇱' },
    { code: '+420', country: 'Czech Republic', flag: '🇨🇿' },
    { code: '+45', country: 'Denmark', flag: '🇩🇰' },
    { code: '+372', country: 'Estonia', flag: '🇪🇪' },
    { code: '+358', country: 'Finland', flag: '🇫🇮' },
    { code: '+852', country: 'Hong Kong', flag: '🇭🇰' },
    { code: '+36', country: 'Hungary', flag: '🇭🇺' },
    { code: '+353', country: 'Ireland', flag: '🇮🇪' },
    { code: '+972', country: 'Israel', flag: '🇮🇱' },
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+371', country: 'Latvia', flag: '🇱🇻' },
    { code: '+370', country: 'Lithuania', flag: '🇱🇹' },
    { code: '+352', country: 'Luxembourg', flag: '🇱🇺' },
    { code: '+356', country: 'Malta', flag: '🇲🇹' },
    { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
    { code: '+47', country: 'Norway', flag: '🇳🇴' },
    { code: '+48', country: 'Poland', flag: '🇵🇱' },
    { code: '+351', country: 'Portugal', flag: '🇵🇹' },
    { code: '+421', country: 'Slovakia', flag: '🇸🇰' },
    { code: '+386', country: 'Slovenia', flag: '🇸🇮' },
    { code: '+34', country: 'Spain', flag: '🇪🇸' },
    { code: '+46', country: 'Sweden', flag: '🇸🇪' },
    { code: '+886', country: 'Taiwan', flag: '🇹🇼' },
    { code: '+90', country: 'Turkey', flag: '🇹🇷' },
    { code: '+598', country: 'Uruguay', flag: '🇺🇾' }
  ];

  // Validation functions
  const validateDateFormat = (date: string) => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    return dateRegex.test(date);
  };

  const validateAge = (date: string) => {
    if (!validateDateFormat(date)) return false;
    const [day, month, year] = date.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return (age - 1) >= 18;
    }
    return age >= 18;
  };

  const validateVisaExpiry = (date: string) => {
    if (!validateDateFormat(date)) return false;
    const [day, month, year] = date.split('/').map(Number);
    const expiryDate = new Date(year, month - 1, day);
    const today = new Date();
    return expiryDate > today;
  };

  const formatDateInput = (value: string) => {
    // Remove all non-digits
    const numbers = value.replace(/\D/g, '');
    
    // Add slashes at appropriate positions
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    } else {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    return value.replace(/\D/g, '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Format date inputs
    if (name === 'dateOfBirth' || name === 'visaExpiryDate') {
      formattedValue = formatDateInput(value);
    }
    
    // Format phone number
    if (name === 'phoneNumber') {
      formattedValue = formatPhoneNumber(value);
    }
    
    setFormData({
      ...formData,
      [name]: formattedValue
    });
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: {[key: string]: string} = {};
    
    // Validate date of birth
    if (!validateDateFormat(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'Please enter date in DD/MM/YYYY format';
    } else if (!validateAge(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'You must be at least 18 years old';
    }
    
    // Validate visa expiry date
    if (!validateDateFormat(formData.visaExpiryDate)) {
      newErrors.visaExpiryDate = 'Please enter date in DD/MM/YYYY format';
    } else if (!validateVisaExpiry(formData.visaExpiryDate)) {
      newErrors.visaExpiryDate = 'Visa expiry date cannot be in the past';
    }
    
    // Validate phone number
    if (formData.phoneNumber && formData.phoneNumber.length < 8) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    console.log('WHV Profile Setup:', formData);
    navigate('/whv/current-address');
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
                onClick={() => navigate('/whv/email-confirmation')}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h1 className="text-lg font-medium text-gray-900">Account Set Up</h1>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <span className="text-sm font-medium text-gray-600">3/6</span>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-base font-medium text-gray-700">
                  Date of Birth (DD/MM/YYYY)
                </Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="text"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`h-12 bg-gray-100 border-0 text-gray-900 ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                  placeholder="01/01/1990"
                  maxLength={10}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality" className="text-base font-medium text-gray-700">
                  Nationality (Country of Passport)
                </Label>
                <Select onValueChange={(value) => handleSelectChange('nationality', value)}>
                  <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                    <SelectValue placeholder="Argentina" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto">
                    {whvCountries.map((country) => (
                      <SelectItem key={country} value={country} className="hover:bg-gray-100">
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="visaType" className="text-base font-medium text-gray-700">
                  Visa Type
                </Label>
                <Select onValueChange={(value) => handleSelectChange('visaType', value)}>
                  <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                    <SelectValue placeholder="462" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto">
                    {visaTypes.map((visa) => (
                      <SelectItem key={visa} value={visa} className="hover:bg-gray-100">
                        {visa}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="visaExpiryDate" className="text-base font-medium text-gray-700">
                  Visa Expiry Date (DD/MM/YYYY)
                </Label>
                <Input
                  id="visaExpiryDate"
                  name="visaExpiryDate"
                  type="text"
                  required
                  value={formData.visaExpiryDate}
                  onChange={handleInputChange}
                  className={`h-12 bg-gray-100 border-0 text-gray-900 ${errors.visaExpiryDate ? 'border-red-500' : ''}`}
                  placeholder="01/01/2026"
                  maxLength={10}
                />
                {errors.visaExpiryDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.visaExpiryDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-base font-medium text-gray-700">
                  Phone Number
                </Label>
                <div className="flex gap-2">
                  <Select onValueChange={(value) => handleSelectChange('countryCode', value)}>
                    <SelectTrigger className="w-32 h-12 bg-gray-100 border-0 text-gray-900">
                      <SelectValue placeholder="+61 🇦🇺" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-50">
                      {countryCodes.map((item) => (
                        <SelectItem key={`${item.code}-${item.country}`} value={item.code} className="hover:bg-gray-100">
                          {item.code} {item.flag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`flex-1 h-12 bg-gray-100 border-0 text-gray-900 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                    placeholder="492 333 444"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                )}
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

export default WHVProfileSetup;