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
  const whvCountries = [/* ... same as before ... */];

  // Visa types
  const visaTypes = [/* ... same as before ... */];

  // Country codes
  const countryCodes = [/* ... same as before ... */];

  const formatDateInput = (value: string) => { /* ... same as before ... */ };
  const validateDate = (dateStr: string, isDateOfBirth = false) => { /* ... same as before ... */ };
  const validatePhoneNumber = (phone: string) => { /* ... same as before ... */ };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'dateOfBirth' || name === 'visaExpiryDate') {
      formattedValue = formatDateInput(value);
    }
    if (name === 'phoneNumber') {
      formattedValue = value.replace(/\D/g, '');
    }

    setFormData({
      ...formData,
      [name]: formattedValue
    });

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

    const newErrors: { [key: string]: string } = {};

    // Validate required names
    if (!formData.givenName.trim()) newErrors.givenName = 'Given name is required';
    if (!formData.familyName.trim()) newErrors.familyName = 'Family name is required';

    // Validate date of birth
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const dobError = validateDate(formData.dateOfBirth, true);
      if (dobError) newErrors.dateOfBirth = dobError;
    }

    // Validate visa expiry date
    if (!formData.visaExpiryDate) {
      newErrors.visaExpiryDate = 'Visa expiry date is required';
    } else {
      const visaError = validateDate(formData.visaExpiryDate, false);
      if (visaError) newErrors.visaExpiryDate = visaError;
    }

    // Validate phone number
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else {
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

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Given Name */}
              <div className="space-y-2">
                <Label htmlFor="givenName" className="text-base font-medium text-gray-700">
                  Given Name(s)
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

              {/* Middle Name */}
              <div className="space-y-2">
                <Label htmlFor="middleName" className="text-base font-medium text-gray-700">
                  Middle Name (Optional)
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

              {/* Family Name */}
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

              {/* Rest of the form (DOB, nationality, visa, phone...) */}
              {/* ... existing inputs unchanged ... */}

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
