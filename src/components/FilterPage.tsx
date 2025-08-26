import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterPageProps {
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

const FilterPage: React.FC<FilterPageProps> = ({ onClose, onApplyFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    candidateLocation: '',
    candidateIndustryExperience: '',
    candidateAvailability: '',
    candidateWorkDuration: '',
    candidateExperienceLevel: '',
    candidateVisaType: '',
    candidateNationality: '',
    willingToProvideAccommodation: false,
    willingToProvideMeals: false,
    willingToProvideTransport: false,
    willingToProvideTraining: false,
    payRateMin: '',
    payRateMax: '',
  });

  const states = [
    'Queensland (QLD)',
    'New South Wales (NSW)', 
    'Victoria (VIC)',
    'Western Australia (WA)',
    'South Australia (SA)',
    'Tasmania (TAS)',
    'Northern Territory (NT)',
    'Australian Capital Territory (ACT)'
  ];

  const candidateIndustryExperience = [
    'Agriculture & Farming',
    'Horticulture & Fruit Picking', 
    'Livestock & Dairy Farming',
    'Viticulture & Wine Production',
    'Aquaculture & Fishing',
    'Forestry & Logging',
    'Hospitality & Food Service',
    'Accommodation & Tourism',
    'Event Management',
    'Entertainment & Recreation',
    'Construction & Building',
    'Road Construction & Maintenance',
    'Plumbing & Electrical',
    'Landscaping & Gardening',
    'Mining Operations',
    'Oil & Gas',
    'Resource Processing',
    'Healthcare & Medical',
    'Aged Care & Disability Services',
    'Childcare & Education',
    'Food Processing & Manufacturing',
    'Industrial Manufacturing',
    'Packaging & Warehousing',
    'Transport & Delivery',
    'Warehousing & Distribution',
    'Freight & Logistics',
    'Retail & Customer Service',
    'Sales & Marketing',
    'Cleaning Services',
    'Administration & Office',
    'General Labour'
  ];

  const candidateAvailabilityOptions = [
    'Available Now',
    'Available in 1 Month',
    'Available in 2-3 Months',
    'Available in 4-6 Months',
    'Available Next Year',
    'Flexible Start Date'
  ];

  const candidateWorkDurationOptions = [
    '1-2 weeks',
    '1 month',
    '2-3 months', 
    '3-6 months',
    '6+ months',
    'Long-term / Ongoing'
  ];

  const candidateExperienceLevels = [
    'No Experience',
    'Some Experience',
    '1-2 Years Experience',
    '3-5 Years Experience',
    '5+ Years Experience'
  ];

  const candidatePhysicalWorkLevels = [
    'Light Physical Work Only',
    'Moderate Physical Work',
    'Heavy Physical Work',
    'Any Physical Level'
  ];

  const candidateWorkEnvironmentPreferences = [
    'Indoor Work Only',
    'Outdoor Work Only', 
    'Mixed Indoor/Outdoor',
    'Any Environment'
  ];

  const candidateVisaTypes = [
    '417 (Working Holiday Visa)',
    '462 (Work and Holiday Visa)',
    '417 Second Year Extension',
    '462 Second Year Extension',
    '417 Third Year Extension',
    '462 Third Year Extension'
  ];

  const candidateNationalities = [
    'United Kingdom',
    'Germany',
    'France',
    'Ireland',
    'Canada',
    'South Korea',
    'Japan',
    'Taiwan',
    'Hong Kong',
    'Belgium',
    'Denmark',
    'Estonia',
    'Finland',
    'Italy',
    'Netherlands',
    'Norway',
    'Sweden',
    'Chile',
    'Argentina',
    'Uruguay',
    'Other'
  ];

  const candidateAgeRanges = [
    '18-20 years',
    '21-25 years',
    '26-30 years',
    'Any age'
  ];

  const candidateGenderOptions = [
    'Male',
    'Female',
    'Any'
  ];

  const candidateLanguageOptions = [
    'English (Native)',
    'English (Fluent)',
    'English (Conversational)',
    'English (Basic)',
    'Multiple Languages',
    'Any Level'
  ];

  const handleSelectChange = (category: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleBooleanFilterChange = (category: string, checked: boolean) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: checked
    }));
  };

  const applyFilters = () => {
    onApplyFilters(selectedFilters);
    onClose();
  };

  const DropdownSection = ({ title, items, category, placeholder }: { 
    title: string; 
    items: string[]; 
    category: string; 
    placeholder: string; 
  }) => (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
      <Select 
        value={selectedFilters[category] as string} 
        onValueChange={(value) => handleSelectChange(category, value)}
      >
        <SelectTrigger className="w-full bg-white border border-gray-300 z-50">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-300 shadow-lg z-50 max-h-60 overflow-y-auto">
          {items.map((item) => (
            <SelectItem key={item} value={item} className="hover:bg-gray-100">
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone 16 Pro Max Frame - Fixed dimensions */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-4 flex-shrink-0"></div>
          
          {/* Header - Fixed */}
          <div className="px-4 py-3 border-b bg-white flex-shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={onClose}>
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <h1 className="text-lg font-medium text-gray-900">Candidate Filters</h1>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 px-4 py-4 overflow-y-auto">
            {/* Candidate Location */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Candidate Location</h3>
              <Select 
                value={selectedFilters.candidateLocation} 
                onValueChange={(value) => handleSelectChange('candidateLocation', value)}
              >
                <SelectTrigger className="w-full bg-white border border-gray-300 z-50">
                  <SelectValue placeholder="Any location" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                  <SelectItem value="in-australia" className="hover:bg-gray-100">
                    Currently in Australia
                  </SelectItem>
                  <SelectItem value="outside-australia" className="hover:bg-gray-100">
                    Outside Australia
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Candidate Industry Experience */}
            <DropdownSection 
              title="Candidate Industry Experience" 
              items={candidateIndustryExperience} 
              category="candidateIndustryExperience" 
              placeholder="Any industry experience"
            />

            {/* Candidate Availability */}
            <DropdownSection 
              title="Candidate Availability" 
              items={candidateAvailabilityOptions} 
              category="candidateAvailability" 
              placeholder="Any availability"
            />

            {/* Candidate Work Duration */}
            <DropdownSection 
              title="Candidate Work Duration" 
              items={candidateWorkDurationOptions} 
              category="candidateWorkDuration" 
              placeholder="Any duration"
            />

            {/* Candidate Experience Level */}
            <DropdownSection 
              title="Candidate Experience Level" 
              items={candidateExperienceLevels} 
              category="candidateExperienceLevel" 
              placeholder="Any experience level"
            />

            {/* Candidate Visa Type */}
            <DropdownSection 
              title="Candidate Visa Type" 
              items={candidateVisaTypes} 
              category="candidateVisaType" 
              placeholder="Any working holiday visa"
            />

            {/* Candidate Nationality */}
            <DropdownSection 
              title="Candidate Nationality" 
              items={candidateNationalities} 
              category="candidateNationality" 
              placeholder="Any nationality"
            />

            {/* Pay Rate Range */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Pay Rate Offering (per hour)</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-sm text-gray-600 mb-2 block">Min $</Label>
                  <Input
                    type="number"
                    placeholder="25"
                    value={selectedFilters.payRateMin}
                    onChange={(e) => handleSelectChange('payRateMin', e.target.value)}
                    className="w-full bg-white border border-gray-300"
                  />
                </div>
                <div>
                  <Label className="text-sm text-gray-600 mb-2 block">Max $</Label>
                  <Input
                    type="number"
                    placeholder="35"
                    value={selectedFilters.payRateMax}
                    onChange={(e) => handleSelectChange('payRateMax', e.target.value)}
                    className="w-full bg-white border border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* What We Can Provide - Simplified */}
            <div className="mb-20">
              <h3 className="font-semibold text-gray-900 mb-3">What We Can Provide</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="willing-accommodation"
                    checked={selectedFilters.willingToProvideAccommodation}
                    onCheckedChange={(checked) => handleBooleanFilterChange('willingToProvideAccommodation', checked as boolean)}
                  />
                  <Label htmlFor="willing-accommodation" className="text-sm text-gray-700">
                    Accommodation
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="willing-meals"
                    checked={selectedFilters.willingToProvideMeals}
                    onCheckedChange={(checked) => handleBooleanFilterChange('willingToProvideMeals', checked as boolean)}
                  />
                  <Label htmlFor="willing-meals" className="text-sm text-gray-700">
                    Meals
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="willing-transport"
                    checked={selectedFilters.willingToProvideTransport}
                    onCheckedChange={(checked) => handleBooleanFilterChange('willingToProvideTransport', checked as boolean)}
                  />
                  <Label htmlFor="willing-transport" className="text-sm text-gray-700">
                    Transport
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="willing-training"
                    checked={selectedFilters.willingToProvideTraining}
                    onCheckedChange={(checked) => handleBooleanFilterChange('willingToProvideTraining', checked as boolean)}
                  />
                  <Label htmlFor="willing-training" className="text-sm text-gray-700">
                    Training
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Bottom Button */}
          <div className="bg-white border-t p-4 flex-shrink-0 rounded-b-[48px]">
            <Button
              onClick={applyFilters}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white"
            >
              Find Candidates
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPage;