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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('WHV Profile Setup:', formData);
    // Navigate to next step
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
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="h-12 bg-gray-100 border-0 text-gray-900"
                  placeholder="01/01/1990"
                />
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
                  className="h-12 bg-gray-100 border-0 text-gray-900"
                  placeholder="01/01/2026"
                />
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
                    className="flex-1 h-12 bg-gray-100 border-0 text-gray-900"
                    placeholder="492 333 444"
                  />
                </div>
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