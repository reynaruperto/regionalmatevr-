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
    suburbCity: '',
    state: '',
    postCode: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

    if (name === 'postCode') {
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

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      state: value
    });

    if (errors.state) {
      setErrors({
        ...errors,
        state: ''
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address line 1 is required';
    if (!formData.suburbCity.trim()) newErrors.suburbCity = 'Suburb / City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.postCode.trim()) {
      newErrors.postCode = 'Post code is required';
    } else if (formData.postCode.length !== 4) {
      newErrors.postCode = 'Australian post code must be 4 digits';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Current Address:', formData);
    navigate('/whv/work-experience');
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

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Address Line 1 */}
              <div className="space-y-2">
                <Label htmlFor="addressLine1">
                  Address Line 1 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  type="text"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  className={`h-12 bg-gray-100 border-0 text-gray-900 ${errors.addressLine1 ? 'border-red-500' : ''}`}
                />
                {errors.addressLine1 && <p className="text-red-500 text-sm">{errors.addressLine1}</p>}
              </div>

              {/* Address Line 2 */}
              <div className="space-y-2">
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  name="addressLine2"
                  type="text"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  className="h-12 bg-gray-100 border-0 text-gray-900"
                />
              </div>

              {/* Suburb / City */}
              <div className="space-y-2">
                <Label htmlFor="suburbCity">
                  Suburb / City <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="suburbCity"
                  name="suburbCity"
                  type="text"
                  value={formData.suburbCity}
                  onChange={handleInputChange}
                  className={`h-12 bg-gray-100 border-0 text-gray-900 ${errors.suburbCity ? 'border-red-500' : ''}`}
                />
                {errors.suburbCity && <p className="text-red-500 text-sm">{errors.suburbCity}</p>}
              </div>

              {/* State */}
              <div className="space-y-2">
                <Label htmlFor="state">
                  State <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger className={`h-12 bg-gray-100 border-0 text-gray-900 ${errors.state ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-50">
                    {australianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
              </div>

              {/* Post Code */}
              <div className="space-y-2">
                <Label htmlFor="postCode">
                  Post Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="postCode"
                  name="postCode"
                  type="text"
                  value={formData.postCode}
                  onChange={handleInputChange}
                  className={`h-12 bg-gray-100 border-0 text-gray-900 ${errors.postCode ? 'border-red-500' : ''}`}
                  maxLength={4}
                />
                {errors.postCode && <p className="text-red-500 text-sm">{errors.postCode}</p>}
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

export default WHVCurrentAddress;
