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
    whv417: false,
    whv462: false,
    studentVisa: false,
    otherVisas: false,
    willingToRelocate: false,
  });

  const locations = [
    // Queensland
    'QLD - Brisbane', 'QLD - Gold Coast', 'QLD - Sunshine Coast', 'QLD - Cairns', 
    'QLD - Townsville', 'QLD - Toowoomba', 'QLD - Mackay', 'QLD - Rockhampton',
    'QLD - Bundaberg', 'QLD - Hervey Bay', 'QLD - Gladstone', 'QLD - Mount Isa',
    'QLD - Emerald', 'QLD - Charleville', 'QLD - Maryborough', 'QLD - Warwick',
    
    // New South Wales
    'NSW - Sydney', 'NSW - Newcastle', 'NSW - Central Coast', 'NSW - Wollongong',
    'NSW - Albury', 'NSW - Tamworth', 'NSW - Wagga Wagga', 'NSW - Orange',
    'NSW - Bathurst', 'NSW - Dubbo', 'NSW - Armidale', 'NSW - Broken Hill',
    'NSW - Port Macquarie', 'NSW - Coffs Harbour', 'NSW - Grafton', 'NSW - Goulburn',
    
    // Victoria
    'VIC - Melbourne', 'VIC - Geelong', 'VIC - Ballarat', 'VIC - Bendigo',
    'VIC - Shepparton', 'VIC - Mildura', 'VIC - Warrnambool', 'VIC - Horsham',
    'VIC - Latrobe Valley', 'VIC - Sale', 'VIC - Wodonga',
    
    // Western Australia
    'WA - Perth', 'WA - Mandurah', 'WA - Bunbury', 'WA - Kalgoorlie',
    'WA - Geraldton', 'WA - Albany', 'WA - Broome', 'WA - Port Hedland',
    'WA - Karratha', 'WA - Carnarvon', 'WA - Esperance',
    
    // South Australia
    'SA - Adelaide', 'SA - Mount Gambier', 'SA - Whyalla', 'SA - Port Augusta',
    'SA - Port Lincoln', 'SA - Murray Bridge',
    
    // Tasmania
    'TAS - Hobart', 'TAS - Launceston', 'TAS - Devonport', 'TAS - Burnie',
    
    // Northern Territory
    'NT - Darwin', 'NT - Alice Springs', 'NT - Katherine',
    
    // Australian Capital Territory
    'ACT - Canberra'
  ];

  const industries = [
    // Agriculture and Food Production
    'Agriculture & Farming',
    'Horticulture & Fruit Picking', 
    'Livestock & Dairy Farming',
    'Viticulture & Wine Production',
    'Aquaculture & Fishing',
    'Forestry & Logging',
    
    // Hospitality & Tourism
    'Hospitality & Food Service',
    'Accommodation & Tourism',
    'Event Management',
    'Entertainment & Recreation',
    
    // Construction & Infrastructure
    'Construction & Building',
    'Road Construction & Maintenance',
    'Plumbing & Electrical',
    'Landscaping & Gardening',
    
    // Mining & Resources
    'Mining Operations',
    'Oil & Gas',
    'Resource Processing',
    
    // Healthcare & Community
    'Healthcare & Medical',
    'Aged Care & Disability Services',
    'Childcare & Education',
    
    // Manufacturing & Production
    'Food Processing & Manufacturing',
    'Industrial Manufacturing',
    'Packaging & Warehousing',
    
    // Transport & Logistics
    'Transport & Delivery',
    'Warehousing & Distribution',
    'Freight & Logistics',
    
    // Retail & Sales
    'Retail & Customer Service',
    'Sales & Marketing',
    
    // Other
    'Cleaning Services',
    'Administration & Office',
    'General Labour'
  ];

  const experienceLevels = [
    'No Experience Required', 'Entry Level (0-1 years)', '1-2 Years Experience', 
    '3-5 Years Experience', '5+ Years Experience', 'Senior Level (10+ years)'
  ];

  const licenseTypes = [
    'No License/Tickets Required',
    
    // Driving & Transport
    'Driver\'s License (Car)',
    'Heavy Rigid (HR) License',
    'Heavy Combination (HC) License',
    'Multi Combination (MC) License',
    'Motorcycle License',
    'Forklift License',
    
    // Construction & Safety
    'White Card (Construction)',
    'Working at Heights',
    'Confined Space Entry',
    'First Aid Certificate',
    'CPR Certificate',
    
    // Hospitality & Food
    'RSA (Responsible Service of Alcohol)',
    'Food Safety Certificate',
    'Food Handling Certificate',
    
    // Agriculture Specific
    'ChemCert (Chemical Application)',
    'Tractor Operation',
    'Farm Machinery Operation',
    
    // Trade & Technical
    'Welding Certificate',
    'Electrical License',
    'Plumbing License',
    'Crane License',
    'Excavator License',
    
    // Security & Other
    'Security License',
    'Blue Card (Working with Children)',
    'Manual Handling Certificate'
  ];

  const availabilityOptions = [
    'Immediately Available', 'Within 1 Month', 'Within 3 Months', 
    'Within 6 Months', 'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025',
    'Jan 2026', 'Feb 2026', 'Mar 2026', 'Flexible Start Date'
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

            {/* Visa Type */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Visa Type</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="whv-417"
                    checked={selectedFilters.whv417 || false}
                    onCheckedChange={(checked) => handleBooleanFilterChange('whv417', checked as boolean)}
                  />
                  <Label htmlFor="whv-417" className="text-sm text-gray-700">
                    Subclass 417 (Working Holiday)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="whv-462"
                    checked={selectedFilters.whv462 || false}
                    onCheckedChange={(checked) => handleBooleanFilterChange('whv462', checked as boolean)}
                  />
                  <Label htmlFor="whv-462" className="text-sm text-gray-700">
                    Subclass 462 (Work and Holiday)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="student-visa"
                    checked={selectedFilters.studentVisa || false}
                    onCheckedChange={(checked) => handleBooleanFilterChange('studentVisa', checked as boolean)}
                  />
                  <Label htmlFor="student-visa" className="text-sm text-gray-700">
                    Student Visa (Subclass 500)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="other-visas"
                    checked={selectedFilters.otherVisas || false}
                    onCheckedChange={(checked) => handleBooleanFilterChange('otherVisas', checked as boolean)}
                  />
                  <Label htmlFor="other-visas" className="text-sm text-gray-700">
                    Other Work Visas
                  </Label>
                </div>
              </div>
            </div>

            {/* Willing to Relocate */}
            <div className="mb-20">
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
          <div className="bg-white border-t p-4 flex-shrink-0 rounded-b-[48px]">
            <Button
              onClick={applyFilters}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white"
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