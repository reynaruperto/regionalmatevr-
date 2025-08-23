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
    state: '',
    citySuburb: '',
    postcode: '',
    industry: '',
    jobType: '',
    seasonalTiming: '',
    workDuration: '',
    accommodationProvided: false,
    mealsProvided: false,
    transportProvided: false,
    trainingProvided: false,
    equipmentProvided: false,
    payRateMin: '',
    payRateMax: '',
    experienceRequired: '',
    physicalWork: '',
    workEnvironment: '',
    farmSize: '',
    acceptsWHV417: false,
    acceptsWHV462: false,
    acceptsStudentVisa: false,
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

  const industries = [
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

  const jobTypes = [
    'Casual / Seasonal',
    'Part-time',
    'Full-time',
    'Contract',
    'Temporary'
  ];

  const experienceRequiredLevels = [
    'No Experience Required',
    'Some Experience Preferred',
    '1+ Years Required',
    '2+ Years Required',
    '3+ Years Required'
  ];

  const seasonalTimingOptions = [
    'Spring (Sep-Nov)',
    'Summer (Dec-Feb)', 
    'Autumn (Mar-May)',
    'Winter (Jun-Aug)',
    'Year Round',
    'Peak Season Only',
    'Off Season Only'
  ];

  const workDurationOptions = [
    '1-2 weeks',
    '1 month',
    '2-3 months', 
    '3-6 months',
    '6+ months',
    'Ongoing'
  ];

  const physicalWorkLevels = [
    'Light Physical Work',
    'Moderate Physical Work',
    'Heavy Physical Work',
    'No Preference'
  ];

  const workEnvironmentOptions = [
    'Indoor Only',
    'Outdoor Only', 
    'Mixed Indoor/Outdoor',
    'No Preference'
  ];

  const farmSizeOptions = [
    'Family Farm (Small)',
    'Medium Commercial Farm',
    'Large Corporate Farm',
    'No Preference'
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
              <h1 className="text-lg font-medium text-gray-900">Filters</h1>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 px-4 py-4 overflow-y-auto">
            {/* Location Filters */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
              
              {/* State Selection */}
              <div className="mb-3">
                <Label className="text-sm text-gray-600 mb-2 block">State</Label>
                <Select 
                  value={selectedFilters.state} 
                  onValueChange={(value) => handleSelectChange('state', value)}
                >
                  <SelectTrigger className="w-full bg-white border border-gray-300 z-50">
                    <SelectValue placeholder="Select state (optional)" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                    {states.map((state) => (
                      <SelectItem key={state} value={state} className="hover:bg-gray-100">
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* City/Suburb Search */}
              <div className="mb-3">
                <Label className="text-sm text-gray-600 mb-2 block">City or Suburb</Label>
                <Input
                  type="text"
                  placeholder="e.g., Brisbane, Tamworth, Mildura..."
                  value={selectedFilters.citySuburb}
                  onChange={(e) => handleSelectChange('citySuburb', e.target.value)}
                  className="w-full bg-white border border-gray-300"
                />
              </div>

              {/* Postcode Search */}
              <div>
                <Label className="text-sm text-gray-600 mb-2 block">Postcode</Label>
                <Input
                  type="text"
                  placeholder="e.g., 4000, 2000, 3000..."
                  value={selectedFilters.postcode}
                  onChange={(e) => handleSelectChange('postcode', e.target.value)}
                  className="w-full bg-white border border-gray-300"
                />
              </div>
            </div>

            {/* Industry */}
            <DropdownSection 
              title="Industry" 
              items={industries} 
              category="industry" 
              placeholder="Select industry"
            />

            {/* Job Type */}
            <DropdownSection 
              title="Job Type" 
              items={jobTypes} 
              category="jobType" 
              placeholder="Select job type"
            />

            {/* Seasonal Timing */}
            <DropdownSection 
              title="Seasonal Timing" 
              items={seasonalTimingOptions} 
              category="seasonalTiming" 
              placeholder="Select season"
            />

            {/* Work Duration */}
            <DropdownSection 
              title="Work Duration" 
              items={workDurationOptions} 
              category="workDuration" 
              placeholder="Select duration"
            />

            {/* Experience Required */}
            <DropdownSection 
              title="Experience Required" 
              items={experienceRequiredLevels} 
              category="experienceRequired" 
              placeholder="Select experience level"
            />

            {/* Physical Work Level */}
            <DropdownSection 
              title="Physical Work Level" 
              items={physicalWorkLevels} 
              category="physicalWork" 
              placeholder="Select physical level"
            />

            {/* Work Environment */}
            <DropdownSection 
              title="Work Environment" 
              items={workEnvironmentOptions} 
              category="workEnvironment" 
              placeholder="Select environment"
            />

            {/* Farm Size */}
            <DropdownSection 
              title="Farm Size" 
              items={farmSizeOptions} 
              category="farmSize" 
              placeholder="Select farm size"
            />

            {/* Pay Rate Range */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Pay Rate (per hour)</h3>
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

            {/* Benefits & Facilities */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Benefits & Facilities</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="accommodation"
                    checked={selectedFilters.accommodationProvided}
                    onCheckedChange={(checked) => handleBooleanFilterChange('accommodationProvided', checked as boolean)}
                  />
                  <Label htmlFor="accommodation" className="text-sm text-gray-700">
                    Accommodation Provided
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="meals"
                    checked={selectedFilters.mealsProvided}
                    onCheckedChange={(checked) => handleBooleanFilterChange('mealsProvided', checked as boolean)}
                  />
                  <Label htmlFor="meals" className="text-sm text-gray-700">
                    Meals Provided
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="transport"
                    checked={selectedFilters.transportProvided}
                    onCheckedChange={(checked) => handleBooleanFilterChange('transportProvided', checked as boolean)}
                  />
                  <Label htmlFor="transport" className="text-sm text-gray-700">
                    Transport Provided
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="training"
                    checked={selectedFilters.trainingProvided}
                    onCheckedChange={(checked) => handleBooleanFilterChange('trainingProvided', checked as boolean)}
                  />
                  <Label htmlFor="training" className="text-sm text-gray-700">
                    Training Provided
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="equipment"
                    checked={selectedFilters.equipmentProvided}
                    onCheckedChange={(checked) => handleBooleanFilterChange('equipmentProvided', checked as boolean)}
                  />
                  <Label htmlFor="equipment" className="text-sm text-gray-700">
                    Equipment/Tools Provided
                  </Label>
                </div>
              </div>
            </div>

            {/* Visa Types Accepted */}
            <div className="mb-20">
              <h3 className="font-semibold text-gray-900 mb-3">Accepts My Visa Type</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="whv-417"
                    checked={selectedFilters.acceptsWHV417}
                    onCheckedChange={(checked) => handleBooleanFilterChange('acceptsWHV417', checked as boolean)}
                  />
                  <Label htmlFor="whv-417" className="text-sm text-gray-700">
                    Subclass 417 (Working Holiday)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="whv-462"
                    checked={selectedFilters.acceptsWHV462}
                    onCheckedChange={(checked) => handleBooleanFilterChange('acceptsWHV462', checked as boolean)}
                  />
                  <Label htmlFor="whv-462" className="text-sm text-gray-700">
                    Subclass 462 (Work and Holiday)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="student-visa"
                    checked={selectedFilters.acceptsStudentVisa}
                    onCheckedChange={(checked) => handleBooleanFilterChange('acceptsStudentVisa', checked as boolean)}
                  />
                  <Label htmlFor="student-visa" className="text-sm text-gray-700">
                    Student Visa (Subclass 500)
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Bottom Button */}
          <div className="bg-white border-t p-4 flex-shrink-0 rounded-b-[48px]">
            <Button
              onClick={applyFilters}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPage;