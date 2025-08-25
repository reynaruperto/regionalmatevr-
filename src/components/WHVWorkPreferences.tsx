import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';

const WHVWorkPreferences: React.FC = () => {
  const navigate = useNavigate();
  const [workPreferences, setWorkPreferences] = useState({
    availableStartDate: '',
    preferredIndustry: '',
    stayDuration: '',
    willingToRelocate: '',
    licenses: ''
  });

  // Industry options
  const industries = [
    'Agriculture & Farming',
    'Construction',
    'Hospitality & Tourism',
    'Healthcare',
    'Retail',
    'Manufacturing',
    'Mining',
    'Education',
    'Transport & Logistics',
    'Other'
  ];

  const stayDurations = [
    '3 months',
    '6 months',
    '12 months',
    '18 months',
    '2 years',
    'Flexible'
  ];

  // Date validation
  const validateDate = (dateStr: string): boolean => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(dateStr)) return false;
    
    const [day, month, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
  };

  const formatDateInput = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
  };

  const handleWorkPreferenceChange = (field: string, value: string) => {
    let processedValue = value;
    if (field === 'availableStartDate') {
      processedValue = formatDateInput(value);
    }
    setWorkPreferences({
      ...workPreferences,
      [field]: processedValue
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate dates
    if (workPreferences.availableStartDate && !validateDate(workPreferences.availableStartDate)) {
      alert('Please enter a valid start date in DD/MM/YYYY format');
      return;
    }

    console.log('Work Preferences:', workPreferences);
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
                onClick={() => navigate('/whv/about-you')}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h1 className="text-lg font-medium text-gray-900">Work Preferences</h1>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <span className="text-sm font-medium text-gray-600">5/7</span>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <form onSubmit={handleSubmit} className="space-y-6 pb-20">
              {/* Available Start Date */}
              <div className="space-y-2">
                <Label className="text-base font-medium text-gray-700">
                  Available Start Date (DD/MM/YYYY)
                </Label>
                <Input
                  type="text"
                  value={workPreferences.availableStartDate}
                  onChange={(e) => handleWorkPreferenceChange('availableStartDate', e.target.value)}
                  className="h-12 bg-gray-100 border-0 text-gray-900"
                  placeholder="10/10/2025"
                  maxLength={10}
                />
              </div>

              {/* Industry Interested In */}
              <div className="space-y-2">
                <Label className="text-base font-medium text-gray-700">
                  Industry Interested in
                </Label>
                <Select onValueChange={(value) => handleWorkPreferenceChange('preferredIndustry', value)}>
                  <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                    <SelectValue placeholder="Agriculture & Farming" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-50">
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry} className="hover:bg-gray-100">
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* How long staying in Australia */}
              <div className="space-y-2">
                <Label className="text-base font-medium text-gray-700">
                  How long are you planning to stay in Australia?
                </Label>
                <Select onValueChange={(value) => handleWorkPreferenceChange('stayDuration', value)}>
                  <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                    <SelectValue placeholder="12 months" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-50">
                    {stayDurations.map((duration) => (
                      <SelectItem key={duration} value={duration} className="hover:bg-gray-100">
                        {duration}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Willing to Relocate */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">
                  Willing to Relocate?
                </Label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleWorkPreferenceChange('willingToRelocate', 'yes')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                      workPreferences.willingToRelocate === 'yes' 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      workPreferences.willingToRelocate === 'yes' 
                        ? 'border-orange-500 bg-orange-500' 
                        : 'border-gray-300'
                    }`}>
                      {workPreferences.willingToRelocate === 'yes' && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-gray-700">Yes</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleWorkPreferenceChange('willingToRelocate', 'no')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                      workPreferences.willingToRelocate === 'no' 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      workPreferences.willingToRelocate === 'no' 
                        ? 'border-orange-500 bg-orange-500' 
                        : 'border-gray-300'
                    }`}>
                      {workPreferences.willingToRelocate === 'no' && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-gray-700">No</span>
                  </button>
                </div>
              </div>

              {/* Licenses/Tickets */}
              <div className="space-y-2">
                <Label className="text-base font-medium text-gray-700">
                  Licenses/Tickets
                </Label>
                <Textarea
                  value={workPreferences.licenses}
                  onChange={(e) => handleWorkPreferenceChange('licenses', e.target.value)}
                  className="min-h-[60px] bg-gray-100 border-0 text-gray-900 resize-none"
                  placeholder="N/A"
                  maxLength={200}
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

export default WHVWorkPreferences;