import React, { useState, useRef } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const WHVEditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [name, setName] = useState('Peter Parker');
  const [availableStartDate, setAvailableStartDate] = useState('10/10/2025');
  const [nationality, setNationality] = useState('Argentina');
  const [visa, setVisa] = useState('462');
  const [visaExpiryDate, setVisaExpiryDate] = useState('01/01/2026');
  const [industryInterested, setIndustryInterested] = useState('Agriculture & Farming');
  const [phoneNumber, setPhoneNumber] = useState('+61 492 333 444');
  const [addressLine1, setAddressLine1] = useState('22 Valley St.');
  const [suburbCity, setSuburbCity] = useState('Brisbane');
  const [state, setState] = useState('Queensland');
  const [postCode, setPostCode] = useState('4000');
  const [willingToRelocate, setWillingToRelocate] = useState('yes');
  const [licenses, setLicenses] = useState('N/A');
  const [jobReferences, setJobReferences] = useState('Elaine Smith- Head of HR (Villa Farm)\nelaineHR@workmail.com\n+61499888000');
  const [workExperience, setWorkExperience] = useState('2020-2025-Farm Attendant-VillaFarm\n2010-2020- Marketing Head- Workspot\n2007-2010- Winery Assistant- BodegaWinery');

  const countries = [
    'Argentina', 'Belgium', 'Canada', 'Chile', 'Cyprus', 'Czech Republic', 'Denmark',
    'Estonia', 'Finland', 'France', 'Germany', 'Hong Kong', 'Ireland', 'Italy',
    'Japan', 'Malaysia', 'Malta', 'Netherlands', 'Norway', 'Poland', 'Portugal',
    'Slovakia', 'Slovenia', 'South Korea', 'Spain', 'Sweden', 'Taiwan', 'Thailand',
    'Turkey', 'United Kingdom', 'Uruguay'
  ];

  const visaTypes = ['417', '462'];
  
  const industries = [
    'Agriculture & Farming', 'Hospitality & Tourism', 'Construction', 'Healthcare',
    'Education', 'Retail', 'Transportation', 'Manufacturing', 'Mining', 'Other'
  ];

  const australianStates = [
    'New South Wales', 'Victoria', 'Queensland', 'Western Australia',
    'South Australia', 'Tasmania', 'Northern Territory', 'Australian Capital Territory'
  ];

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your WHV profile has been successfully updated",
    });
    navigate('/whv-dashboard');
  };

  const handleCancel = () => {
    navigate('/whv-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          {/* Main content container */}
          <div className="w-full h-full flex flex-col relative bg-gray-100">
            
            {/* Header */}
            <div className="px-6 pt-16 pb-4">
              <div className="flex items-center justify-between">
                <button 
                  onClick={handleCancel}
                  className="text-orange-500 font-medium underline"
                >
                  Cancel
                </button>
                <h1 className="text-lg font-semibold text-gray-900">{name}</h1>
                <button 
                  onClick={handleSave}
                  className="flex items-center text-orange-500 font-medium underline"
                >
                  <Check size={16} className="mr-1" />
                  Save
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 overflow-y-auto">
              
              {/* Form Fields */}
              <div className="space-y-4">
                {/* Available Start Date */}
                <div>
                  <Label htmlFor="startDate" className="text-gray-600 mb-2 block">Available Start Date (DD/MM/YYYY)</Label>
                  <Input
                    id="startDate"
                    value={availableStartDate}
                    onChange={(e) => setAvailableStartDate(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="h-12 rounded-xl border-gray-200 bg-white"
                  />
                </div>

                {/* Nationality */}
                <div>
                  <Label className="text-gray-600 mb-2 block">Nationality (Country of Passport)</Label>
                  <Select value={nationality} onValueChange={setNationality}>
                    <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Visa */}
                <div>
                  <Label className="text-gray-600 mb-2 block">Visa</Label>
                  <Select value={visa} onValueChange={setVisa}>
                    <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {visaTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Visa Expiry Date */}
                <div>
                  <Label htmlFor="visaExpiry" className="text-gray-600 mb-2 block">Visa Expiry Date (DD/MM/YYYY)</Label>
                  <Input
                    id="visaExpiry"
                    value={visaExpiryDate}
                    onChange={(e) => setVisaExpiryDate(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="h-12 rounded-xl border-gray-200 bg-white"
                  />
                </div>

                {/* Industry Interested */}
                <div>
                  <Label className="text-gray-600 mb-2 block">Industry Interested in</Label>
                  <Select value={industryInterested} onValueChange={setIndustryInterested}>
                    <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Phone Number */}
                <div>
                  <Label htmlFor="phone" className="text-gray-600 mb-2 block">Phone Number</Label>
                  <Input
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 bg-white"
                  />
                </div>

                {/* Current Address Line 1 */}
                <div>
                  <Label htmlFor="address" className="text-gray-600 mb-2 block">Current Address Line 1</Label>
                  <Input
                    id="address"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 bg-white"
                  />
                </div>

                {/* Suburb/City */}
                <div>
                  <Label htmlFor="suburb" className="text-gray-600 mb-2 block">Suburb/City</Label>
                  <Input
                    id="suburb"
                    value={suburbCity}
                    onChange={(e) => setSuburbCity(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 bg-white"
                  />
                </div>

                {/* State */}
                <div>
                  <Label className="text-gray-600 mb-2 block">State</Label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {australianStates.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Post Code */}
                <div>
                  <Label htmlFor="postcode" className="text-gray-600 mb-2 block">Post Code</Label>
                  <Input
                    id="postcode"
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 bg-white"
                  />
                </div>

                {/* Willing to Relocate */}
                <div>
                  <Label className="text-gray-600 mb-3 block">Willing to Relocate?</Label>
                  <RadioGroup value={willingToRelocate} onValueChange={setWillingToRelocate} className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" className="border-orange-500 text-orange-500" />
                      <Label htmlFor="yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" className="border-orange-500 text-orange-500" />
                      <Label htmlFor="no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Licenses/Tickets */}
                <div>
                  <Label htmlFor="licenses" className="text-gray-600 mb-2 block">Licenses/Tickets</Label>
                  <Input
                    id="licenses"
                    value={licenses}
                    onChange={(e) => setLicenses(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 bg-white"
                  />
                </div>

                {/* Job References */}
                <div>
                  <Label htmlFor="references" className="text-gray-600 mb-2 block">Job References</Label>
                  <Textarea
                    id="references"
                    value={jobReferences}
                    onChange={(e) => setJobReferences(e.target.value)}
                    className="min-h-[80px] rounded-xl border-gray-200 bg-white resize-none"
                  />
                </div>

                {/* Work Experiences */}
                <div>
                  <Label htmlFor="experience" className="text-gray-600 mb-2 block">Work Experiences</Label>
                  <Textarea
                    id="experience"
                    value={workExperience}
                    onChange={(e) => setWorkExperience(e.target.value)}
                    className="min-h-[100px] rounded-xl border-gray-200 bg-white resize-none"
                  />
                </div>
              </div>

              {/* Preview Profile Card Button */}
              <div className="mt-6 mb-6">
                <Button 
                  onClick={() => navigate('/profile-preview')}
                  variant="outline"
                  className="w-full h-12 rounded-xl border-orange-500 text-orange-500 hover:bg-orange-50"
                >
                  Preview Profile Card
                </Button>
              </div>

              <div className="h-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WHVEditProfile;