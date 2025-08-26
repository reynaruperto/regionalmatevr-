import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

const WHVCurrentAddress: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    suburb: '',
    city: '',
    state: '',
    postCode: '',
    isInAustralia: true
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showSkipOption, setShowSkipOption] = useState(false);


  // Australian states and territories
  const australianStates = [
    'Australian Capital Territory',
    'New South Wales',
    'Northern Territory',
    'Queensland',
    'South Australia',
    'Tasmania',
    'Victoria',
    'Western Australia'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Format postcode (numbers only)
    if (name === 'postCode') {
      formattedValue = value.replace(/\D/g, '');
    }
    
    setFormData({
      ...formData,
      [name]: formattedValue
    });
    
    // Clear errors for this field
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
    
    // Only validate if in Australia
    if (formData.isInAustralia) {
      if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address line 1 is required';
      if (!formData.suburb.trim()) newErrors.suburb = 'Suburb is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.postCode.trim()) {
        newErrors.postCode = 'Post code is required';
      } else if (formData.postCode.length !== 4) {
        newErrors.postCode = 'Australian post code must be 4 digits';
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    console.log('Current Address:', formData);
    navigate('/whv/work-experience');
  };

  const handleSkip = () => {
    navigate('/whv/work-experience');
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
                onClick={() => navigate('/whv/profile-setup')}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h1 className="text-lg font-medium text-gray-900">Account Set Up</h1>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <span className="text-sm font-medium text-gray-600">4/6</span>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {/* Section Title */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Current Location</h2>
              <p className="text-gray-600">Let us know where you are now.</p>
            </div>

            {/* Location Toggle */}
            <div className="mb-6 space-y-4">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, isInAustralia: true})}
                  className={`flex-1 p-4 rounded-xl border-2 transition-colors ${
                    formData.isInAustralia 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">🇦🇺</div>
                    <div className="font-medium text-gray-900">I'm in Australia</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, isInAustralia: false})}
                  className={`flex-1 p-4 rounded-xl border-2 transition-colors ${
                    !formData.isInAustralia 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">🌍</div>
                    <div className="font-medium text-gray-900">I'm overseas</div>
                  </div>
                </button>
              </div>
            </div>

            {!formData.isInAustralia && (
              <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                <p className="text-blue-800 text-sm">
                  No worries! You can update your Australian address later when you arrive.
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="addressLine1" className="text-base font-medium text-gray-700">
                  {formData.isInAustralia ? 'Current Address Line 1' : 'Address Line 1'}
                </Label>
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  type="text"
                  required={formData.isInAustralia}
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  className={`h-12 bg-gray-100 border-0 text-gray-900 ${errors.addressLine1 ? 'border-red-500' : ''}`}
                  placeholder={formData.isInAustralia ? "22 Valley St." : "Your current address"}
                />
                {errors.addressLine1 && <p className="text-red-500 text-sm">{errors.addressLine1}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressLine2" className="text-base font-medium text-gray-700">
                  Street Address Line 2 (if applicable)
                </Label>
                <Input
                  id="addressLine2"
                  name="addressLine2"
                  type="text"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  className="h-12 bg-gray-100 border-0 text-gray-900"
                  placeholder="Unit 5, Building B"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="suburb" className="text-base font-medium text-gray-700">
                  {formData.isInAustralia ? 'Suburb' : 'District/Area'}
                </Label>
                <Input
                  id="suburb"
                  name="suburb"
                  type="text"
                  required={formData.isInAustralia}
                  value={formData.suburb}
                  onChange={handleInputChange}
                  className={`h-12 bg-gray-100 border-0 text-gray-900 ${errors.suburb ? 'border-red-500' : ''}`}
                  placeholder={formData.isInAustralia ? "Spring Hill" : "Your area/district"}
                />
                {errors.suburb && <p className="text-red-500 text-sm">{errors.suburb}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-base font-medium text-gray-700">
                  City
                </Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  required={formData.isInAustralia}
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`h-12 bg-gray-100 border-0 text-gray-900 ${errors.city ? 'border-red-500' : ''}`}
                  placeholder={formData.isInAustralia ? "Brisbane" : "Your city"}
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
              </div>

              {formData.isInAustralia ? (
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-base font-medium text-gray-700">
                    State
                  </Label>
                  <Select onValueChange={(value) => handleSelectChange('state', value)}>
                    <SelectTrigger className={`h-12 bg-gray-100 border-0 text-gray-900 ${errors.state ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Queensland" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-50">
                      {australianStates.map((state) => (
                        <SelectItem key={state} value={state} className="hover:bg-gray-100">
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-base font-medium text-gray-700">
                    State/Province/Country
                  </Label>
                  <Input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="h-12 bg-gray-100 border-0 text-gray-900"
                    placeholder="Your state/province/country"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="postCode" className="text-base font-medium text-gray-700">
                  {formData.isInAustralia ? 'Post Code' : 'Postal/Zip Code'}
                </Label>
                <Input
                  id="postCode"
                  name="postCode"
                  type="text"
                  required={formData.isInAustralia}
                  value={formData.postCode}
                  onChange={handleInputChange}
                  className={`h-12 bg-gray-100 border-0 text-gray-900 ${errors.postCode ? 'border-red-500' : ''}`}
                  placeholder={formData.isInAustralia ? "4000" : "Your postal/zip code"}
                  maxLength={formData.isInAustralia ? 4 : undefined}
                />
                {errors.postCode && <p className="text-red-500 text-sm">{errors.postCode}</p>}
              </div>

              <div className="pt-8 space-y-3">
                <Button 
                  type="submit"
                  className="w-full h-14 text-lg rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium"
                >
                  Continue →
                </Button>
                {!formData.isInAustralia && (
                  <Button 
                    type="button"
                    onClick={handleSkip}
                    variant="ghost"
                    className="w-full h-12 text-gray-600 hover:text-gray-800"
                  >
                    Skip for now
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WHVCurrentAddress;