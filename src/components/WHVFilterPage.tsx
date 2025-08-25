import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WHVFilterPageProps {
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

const WHVFilterPage: React.FC<WHVFilterPageProps> = ({ onClose, onApplyFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    state: '',
    citySuburb: '',
    postcode: '',
    interestedIndustry: '',
    lookingForJobType: '',
    availableSeasons: '',
    workDuration: '',
    needsAccommodation: false,
    needsMeals: false,
    needsTransport: false,
    needsTraining: false,
    hasEquipment: false,
    minPayRate: '',
    maxPayRate: '',
    myExperienceLevel: '',
    physicalWorkPreference: '',
    workEnvironmentPreference: '',
    farmSizePreference: '',
    myVisaType: '',
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

  const interestedIndustries = [
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

  const lookingForJobTypes = [
    'Casual / Seasonal',
    'Part-time',
    'Full-time',
    'Contract',
    'Temporary'
  ];

  const myExperienceLevels = [
    'No Experience',
    'Some Experience',
    '1+ Years Experience',
    '2+ Years Experience',
    '3+ Years Experience'
  ];

  const availableSeasonOptions = [
    'Spring (Sep-Nov)',
    'Summer (Dec-Feb)', 
    'Autumn (Mar-May)',
    'Winter (Jun-Aug)',
    'Year Round',
    'Peak Season',
    'Off Season'
  ];

  const workDurationOptions = [
    '1-2 weeks',
    '1 month',
    '2-3 months', 
    '3-6 months',
    '6+ months',
    'Ongoing'
  ];

  const physicalWorkPreferences = [
    'Light Physical Work Only',
    'Moderate Physical Work OK',
    'Heavy Physical Work OK',
    'Any Physical Level'
  ];

  const workEnvironmentPreferences = [
    'Indoor Work Preferred',
    'Outdoor Work Preferred', 
    'Mixed Indoor/Outdoor OK',
    'No Preference'
  ];

  const farmSizePreferences = [
    'Family Farm (Small)',
    'Medium Commercial Farm',
    'Large Corporate Farm',
    'No Preference'
  ];

  const visaTypes = [
    'Subclass 417 (Working Holiday)',
    'Subclass 462 (Work and Holiday)'
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
              <h1 className="text-lg font-medium text-gray-900">Job Filters</h1>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 px-4 py-4 overflow-y-auto">
            {/* Location Preferences */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Where I Want to Work</h3>
              
              {/* State Selection */}
              <div className="mb-3">
                <Label className="text-sm text-gray-600 mb-2 block">Preferred State</Label>
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
                <Label className="text-sm text-gray-600 mb-2 block">Preferred City or Area</Label>
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
                <Label className="text-sm text-gray-600 mb-2 block">Preferred Postcode</Label>
                <Input
                  type="text"
                  placeholder="e.g., 4000, 2000, 3000..."
                  value={selectedFilters.postcode}
                  onChange={(e) => handleSelectChange('postcode', e.target.value)}
                  className="w-full bg-white border border-gray-300"
                />
              </div>
            </div>

            {/* Job Preferences */}
            <DropdownSection 
              title="Industries I'm Interested In" 
              items={interestedIndustries} 
              category="interestedIndustry" 
              placeholder="Select industry"
            />

            <DropdownSection 
              title="Job Type I'm Looking For" 
              items={lookingForJobTypes} 
              category="lookingForJobType" 
              placeholder="Select job type"
            />

            <DropdownSection 
              title="When I'm Available" 
              items={availableSeasonOptions} 
              category="availableSeasons" 
              placeholder="Select season"
            />

            <DropdownSection 
              title="How Long I Can Work" 
              items={workDurationOptions} 
              category="workDuration" 
              placeholder="Select duration"
            />

            {/* My Experience & Abilities */}
            <DropdownSection 
              title="My Experience Level" 
              items={myExperienceLevels} 
              category="myExperienceLevel" 
              placeholder="Select your experience"
            />

            <DropdownSection 
              title="Physical Work I Can Do" 
              items={physicalWorkPreferences} 
              category="physicalWorkPreference" 
              placeholder="Select physical level"
            />

            <DropdownSection 
              title="Work Environment I Prefer" 
              items={workEnvironmentPreferences} 
              category="workEnvironmentPreference" 
              placeholder="Select environment"
            />

            <DropdownSection 
              title="Farm Size Preference" 
              items={farmSizePreferences} 
              category="farmSizePreference" 
              placeholder="Select farm size"
            />

            {/* Pay Rate Expectations */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Pay Rate I'm Looking For (per hour)</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-sm text-gray-600 mb-2 block">Min $</Label>
                  <Input
                    type="number"
                    placeholder="25"
                    value={selectedFilters.minPayRate}
                    onChange={(e) => handleSelectChange('minPayRate', e.target.value)}
                    className="w-full bg-white border border-gray-300"
                  />
                </div>
                <div>
                  <Label className="text-sm text-gray-600 mb-2 block">Max $</Label>
                  <Input
                    type="number"
                    placeholder="35"
                    value={selectedFilters.maxPayRate}
                    onChange={(e) => handleSelectChange('maxPayRate', e.target.value)}
                    className="w-full bg-white border border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* What I Need from Employer */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">What I Need from Employer</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="needs-accommodation"
                    checked={selectedFilters.needsAccommodation}
                    onCheckedChange={(checked) => handleBooleanFilterChange('needsAccommodation', checked as boolean)}
                  />
                  <Label htmlFor="needs-accommodation" className="text-sm text-gray-700">
                    I Need Accommodation
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="needs-meals"
                    checked={selectedFilters.needsMeals}
                    onCheckedChange={(checked) => handleBooleanFilterChange('needsMeals', checked as boolean)}
                  />
                  <Label htmlFor="needs-meals" className="text-sm text-gray-700">
                    I Need Meals Provided
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="needs-transport"
                    checked={selectedFilters.needsTransport}
                    onCheckedChange={(checked) => handleBooleanFilterChange('needsTransport', checked as boolean)}
                  />
                  <Label htmlFor="needs-transport" className="text-sm text-gray-700">
                    I Need Transport Provided
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="needs-training"
                    checked={selectedFilters.needsTraining}
                    onCheckedChange={(checked) => handleBooleanFilterChange('needsTraining', checked as boolean)}
                  />
                  <Label htmlFor="needs-training" className="text-sm text-gray-700">
                    I Need Training Provided
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="has-equipment"
                    checked={selectedFilters.hasEquipment}
                    onCheckedChange={(checked) => handleBooleanFilterChange('hasEquipment', checked as boolean)}
                  />
                  <Label htmlFor="has-equipment" className="text-sm text-gray-700">
                    I Have My Own Equipment/Tools
                  </Label>
                </div>
              </div>
            </div>

            {/* My Visa Type */}
            <div className="mb-20">
              <h3 className="font-semibold text-gray-900 mb-3">My Visa Type</h3>
              <Select 
                value={selectedFilters.myVisaType} 
                onValueChange={(value) => handleSelectChange('myVisaType', value)}
              >
                <SelectTrigger className="w-full bg-white border border-gray-300 z-50">
                  <SelectValue placeholder="Select your visa type" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                  {visaTypes.map((visa) => (
                    <SelectItem key={visa} value={visa} className="hover:bg-gray-100">
                      {visa}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Fixed Bottom Button */}
          <div className="bg-white border-t p-4 flex-shrink-0 rounded-b-[48px]">
            <Button
              onClick={applyFilters}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              Find Jobs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WHVFilterPage;