import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterPageProps {
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

const FilterPage: React.FC<FilterPageProps> = ({ onClose, onApplyFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    industry: '',
    experience: '',
    license: '',
    availability: '',
    whvHolders: false,
    willingToRelocate: false,
  });

  const locations = [
    'Queensland', 'New South Wales', 'Western Australia',
    'Victoria', 'South Australia', 'Tasmania', 'Northern Territory',
    'Australian Capital Territory', 'Brisbane, QLD', 'Armidale, NSW',
    'Parramatta, NSW', 'Gold Coast, QLD', 'Perth, WA',
    'New Castle, NSW', 'Geelong, VIC', 'Hobart, TAS',
    'Launceston, TAS'
  ];

  const industries = [
    'Agriculture', 'Farming', 'Hospitality', 'Tourism',
    'Maintenance', 'Construction', 'Tractor Driving', 'Marketing',
    'Carpentry', 'Aged Care', 'Disability', 'Forklift Operator',
    'Painting', 'Tiling', 'Bartending', 'Fishing', 'Pearling', 'Packing',
    'Tour Guiding', 'Childcare', 'Mining', 'Bushfire Recovery',
    'Infrastructure', 'Plumbing', 'Dairy Farming', 'Livestock Farming'
  ];

  const experienceLevels = [
    'No Experience', '1-2 Years', '3-5 years', '6-10 years'
  ];

  const licenseTypes = [
    'No License/ Tickets', 'White Card', 'RSA', 'First Aid Certification',
    'Forklift License', 'CPR Certification'
  ];

  const availabilityOptions = [
    'Available From: August 2025', 'Immediately',
    'Next 3 Months', 'Next 6 Months', 'Next 9 Months', 'Next 12 Months'
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* iPhone Frame */}
      <div className="flex-1 max-w-sm mx-auto bg-white shadow-xl">
        {/* Dynamic Island */}
        <div className="w-32 h-6 bg-black rounded-full mx-auto mb-4"></div>
        
        {/* Header */}
        <div className="px-4 py-3 border-b bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={onClose}>
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <h1 className="text-lg font-medium text-gray-900">Filters</h1>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 px-4 py-4 overflow-y-auto pb-24">
          {/* Location */}
          <DropdownSection 
            title="Location" 
            items={locations} 
            category="location" 
            placeholder="Select location"
          />

          {/* Industry */}
          <DropdownSection 
            title="Industry" 
            items={industries} 
            category="industry" 
            placeholder="Select industry"
          />

          {/* Experience */}
          <DropdownSection 
            title="Experience" 
            items={experienceLevels} 
            category="experience" 
            placeholder="Select experience level"
          />

          {/* License and Tickets */}
          <DropdownSection 
            title="License and Tickets" 
            items={licenseTypes} 
            category="license" 
            placeholder="Select license/ticket"
          />

          {/* Availability */}
          <DropdownSection 
            title="Availability" 
            items={availabilityOptions} 
            category="availability" 
            placeholder="Select availability"
          />

          {/* WHV Holders */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">WHV Holders</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="whv-holders"
                checked={selectedFilters.whvHolders}
                onCheckedChange={(checked) => handleBooleanFilterChange('whvHolders', checked as boolean)}
              />
              <Label htmlFor="whv-holders" className="text-sm text-gray-700">
                Only show WHV holders
              </Label>
            </div>
          </div>

          {/* Willing to Relocate */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Relocation</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="willing-relocate"
                checked={selectedFilters.willingToRelocate}
                onCheckedChange={(checked) => handleBooleanFilterChange('willingToRelocate', checked as boolean)}
              />
              <Label htmlFor="willing-relocate" className="text-sm text-gray-700">
                Willing to relocate
              </Label>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4">
          <Button
            onClick={applyFilters}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPage;