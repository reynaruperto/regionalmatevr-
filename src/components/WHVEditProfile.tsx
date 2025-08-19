import React, { useState, useEffect, useRef } from 'react';
import { Camera, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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
  const [profilePhoto, setProfilePhoto] = useState<string>('/lovable-uploads/5171768d-7ee5-4242-8d48-29d87d896302.png');
  const [profileVisible, setProfileVisible] = useState(true);
  const [name, setName] = useState('Peter Parker');
  const [email, setEmail] = useState('peterparker@gmail.com');
  const [dob, setDob] = useState('15/08/1995');
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

  useEffect(() => {
    const storedPhoto = localStorage.getItem('whvProfilePhoto');
    if (storedPhoto) {
      setProfilePhoto(storedPhoto);
    }
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setProfilePhoto(result);
          localStorage.setItem('whvProfilePhoto', result);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive"
        });
      }
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your WHV profile has been successfully updated",
    });
    navigate('/dashboard');
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const handlePreviewProfile = () => {
    navigate('/profile-preview');
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
              
              {/* Profile Visibility */}
              <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Profile Visibility</h3>
                    <p className="text-sm text-gray-500">Your profile is currently visible to all employers</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">ON</span>
                    <Switch 
                      checked={profileVisible}
                      onCheckedChange={setProfileVisible}
                      className="data-[state=checked]:bg-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Preview Profile Card */}
              <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Preview Profile card</h3>
                  <Button 
                    onClick={handlePreviewProfile}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-sm"
                  >
                    VIEW
                  </Button>
                </div>
              </div>

              {/* Profile Picture */}
              <div className="mb-6">
                <h3 className="text-gray-600 mb-3">Profile Picture</h3>
                <div className="relative w-24 h-24">
                  <button 
                    onClick={handlePhotoClick}
                    className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-500 hover:opacity-80 transition-opacity"
                  >
                    <img 
                      src={profilePhoto} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </button>
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center pointer-events-none">
                    <Camera size={16} className="text-white" />
                  </div>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-gray-600 mb-2 block">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 bg-white"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-gray-600 mb-2 block">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 bg-white"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <Label htmlFor="dob" className="text-gray-600 mb-2 block">Date of Birth (DD/MM/YYYY)</Label>
                  <Input
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="h-12 rounded-xl border-gray-200 bg-white"
                  />
                </div>

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
                    <SelectContent>
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
                    <SelectContent>
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
                    <SelectContent>
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
                    <SelectContent>
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

              <div className="h-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WHVEditProfile;