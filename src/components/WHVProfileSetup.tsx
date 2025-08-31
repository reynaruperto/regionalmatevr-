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
    givenName: '',
    middleName: '',
    familyName: '',
    dateOfBirth: '',
    nationality: '',
    visaType: '',
    visaExpiryDate: '',
    countryCode: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const formatDateInput = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 2) return numericValue;
    else if (numericValue.length <= 4) return `${numericValue.slice(0, 2)}/${numericValue.slice(2)}`;
    else return `${numericValue.slice(0, 2)}/${numericValue.slice(2, 4)}/${numericValue.slice(4, 8)}`;
  };

  const validateDate = (dateStr: string, isDateOfBirth = false) => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(dateStr)) return 'Please enter date in DD/MM/YYYY format';

    const [day, month, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
      return 'Please enter a valid date';
    }

    if (isDateOfBirth) {
      const today = new Date();
      const age = today.getFullYear() - year;
      const monthDiff = today.getMonth() - (month - 1);
      const dayDiff = today.getDate() - day;
      if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
        return 'You must be at least 18 years old';
      }
    } else {
      const today = new Date();
      if (date <= today) return 'Visa expiry date must be in the future';
    }

    return '';
  };

  const validatePhoneNumber = (phone: string) => {
    const numericPhone = phone.replace(/\D/g, '');
    if (numericPhone.length < 7 || numericPhone.length > 15) {
      return 'Please enter a valid phone number';
    }
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === 'dateOfBirth' || name === 'visaExpiryDate') formattedValue = formatDateInput(value);
    if (name === 'phoneNumber') formattedValue = value.replace(/\D/g, '');

    setFormData({ ...formData, [name]: formattedValue });

    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.givenName.trim()) newErrors.givenName = 'Given name is required';
    if (!formData.familyName.trim()) newErrors.familyName = 'Family name is required';

    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    else {
      const dobError = validateDate(formData.dateOfBirth, true);
      if (dobError) newErrors.dateOfBirth = dobError;
    }

    if (!formData.visaExpiryDate) newErrors.visaExpiryDate = 'Visa expiry date is required';
    else {
      const visaError = validateDate(formData.visaExpiryDate, false);
      if (visaError) newErrors.visaExpiryDate = visaError;
    }

    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    else {
      const phoneError = validatePhoneNumber(formData.phoneNumber);
      if (phoneError) newErrors.phoneNumber = phoneError;
    }

    if (!formData.nationality) newErrors.nationality = 'Nationality is required';
    if (!formData.visaType) newErrors.visaType = 'Visa type is required';
    if (!formData.countryCode) newErrors.countryCode = 'Country code is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('WHV Profile Setup:', formData);
    navigate('/whv/current-address');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-4 flex-shrink-0"></div>

          {/* Header */}
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

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Names */}
              <div className="space-y-2">
                <Label htmlFor="givenName">Given Name(s)</Label>
                <Input
                  id="givenName"
                  name="givenName"
                  value={formData.givenName}
                  onChange={handleInputChange}
                  className={`h-12 bg-gray-100 border-0 ${errors.givenName ? 'border-red-500' : ''}`}
                  placeholder="Peter"
                />
                {errors.givenName && <p className="text-red-500 text-sm">{errors.givenName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="middleName">Middle Name (Optional)</Label>
                <Input
                  id="middleName"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  className="h-12 bg-gray-100 border-0"
                  placeholder="Benjamin"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="familyName">Family Name(s)</Label>
                <Input
                  id="familyName"
                  name="familyName"
                  value={formData.familyName}
                  onChange={handleInputChange}
                  className={`h-12 bg-gray-100 border-0 ${errors.familyName ? 'border-red-500' : ''}`}
                  placeholder="Parker"
                />
                {errors.familyName && <p className="text-red-500 text-sm">{errors.familyName}</p>}
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth (DD/MM/YYYY)</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  maxLength={10}
                  placeholder="01/01/1990"
                  className={`h-12 bg-gray-100 border-0 ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
              </div>

              {/* Nationality */}
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality (Country of Passport)</Label>
                <Select onValueChange={(value) => handleSelectChange('nationality', value)}>
                  <SelectTrigger className={`h-12 bg-gray-100 border-0 ${errors.nationality ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {whvCountries.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.nationality && <p className="text-red-500 text-sm">{errors.nationality}</p>}
              </div>

              {/* Visa Type */}
              <div className="space-y-2">
                <Label htmlFor="visaType">Visa Type</Label>
                <Select onValueChange={(value) => handleSelectChange('visaType', value)}>
                  <SelectTrigger className={`h-12 bg-gray-100 border-0 ${errors.visaType ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select visa type" />
                  </SelectTrigger>
                  <SelectContent>
                    {visaTypes.map((v) => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.visaType && <p className="text-red-500 text-sm">{errors.visaType}</p>}
              </div>

              {/* Visa Expiry Date */}
              <div className="space-y-2">
                <Label htmlFor="visaExpiryDate">Visa Expiry Date (DD/MM/YYYY)</Label>
                <Input
                  id="visaExpiryDate"
                  name="visaExpiryDate"
                  value={formData.visaExpiryDate}
                  onChange={handleInputChange}
                  maxLength={10}
                  placeholder="01/01/2026"
                  className={`h-12 bg-gray-100 border-0 ${errors.visaExpiryDate ? 'border-red-500' : ''}`}
                />
                {errors.visaExpiryDate && <p className="text-red-500 text-sm">{errors.visaExpiryDate}</p>}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <div className="flex gap-2">
                  <Select onValueChange={(value) => handleSelectChange('countryCode', value)}>
                    <SelectTrigger className={`w-32 h-12 bg-gray-100 border-0 ${errors.countryCode ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="+61 🇦🇺" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((item) => (
                        <SelectItem key={`${item.code}-${item.country}`} value={item.code}>
                          {item.code} {item.flag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="492 333 444"
                    className={`flex-1 h-12 bg-gray-100 border-0 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                  />
                </div>
                {(errors.countryCode || errors.phoneNumber) && (
                  <p className="text-red-500 text-sm">{errors.countryCode || errors.phoneNumber}</p>
                )}
              </div>

              <div className="pt-8">
                <Button type="submit" className="w-full h-14 text-lg rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium">
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

