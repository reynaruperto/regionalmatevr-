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
    suburb: '',
    state: '',
    postCode: ''
  });

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
    console.log('Current Address:', formData);
    // Navigate to next step
    navigate('/whv-work-experience');
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
                onClick={() => navigate('/whv-profile-setup')}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h1 className="text-lg font-medium text-gray-900">Account Set Up</h1>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <span className="text-sm font-medium text-gray-600">3/5</span>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="addressLine1" className="text-base font-medium text-gray-700">
                  Current Address Line 1
                </Label>
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  type="text"
                  required
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  className="h-12 bg-gray-100 border-0 text-gray-900"
                  placeholder="22 Valley St."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="suburb" className="text-base font-medium text-gray-700">
                  Suburb/City
                </Label>
                <Input
                  id="suburb"
                  name="suburb"
                  type="text"
                  required
                  value={formData.suburb}
                  onChange={handleInputChange}
                  className="h-12 bg-gray-100 border-0 text-gray-900"
                  placeholder="Brisbane"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="text-base font-medium text-gray-700">
                  State
                </Label>
                <Select onValueChange={(value) => handleSelectChange('state', value)}>
                  <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                    <SelectValue placeholder="Queensland" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto">
                    {australianStates.map((state) => (
                      <SelectItem key={state} value={state} className="hover:bg-gray-100">
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="postCode" className="text-base font-medium text-gray-700">
                  Post Code
                </Label>
                <Input
                  id="postCode"
                  name="postCode"
                  type="text"
                  required
                  value={formData.postCode}
                  onChange={handleInputChange}
                  className="h-12 bg-gray-100 border-0 text-gray-900"
                  placeholder="4000"
                />
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