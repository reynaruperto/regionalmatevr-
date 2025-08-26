import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, X, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WorkExperience {
  id: string;
  startDate: string;
  endDate: string;
  position: string;
  company: string;
  location: string;
}

interface JobReference {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  role: string;
}

const WHVEditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Personal Information
  const [personalData, setPersonalData] = useState({
    dateOfBirth: '15/03/1995',
    nationality: 'Argentina',
    countryCode: '+61',
    phoneNumber: '492 333 444'
  });

  // Visa Information  
  const [visaData, setVisaData] = useState({
    visaType: '462',
    visaExpiryDate: '01/01/2026'
  });

  // Address Information
  const [addressData, setAddressData] = useState({
    isInAustralia: true,
    addressLine1: '22 Valley St.',
    addressLine2: '',
    suburb: 'Spring Hill',
    city: 'Brisbane',
    state: 'Queensland',
    postCode: '4000',
    country: 'Australia'
  });

  // Work Preferences
  const [workPreferences, setWorkPreferences] = useState({
    availableStartDate: '10/10/2025',
    preferredIndustry: 'Agriculture & Farming',
    stayDuration: '12 months',
    willingToRelocate: 'yes',
    licenses: ['RSA', 'White Card'] as string[],
    otherLicense: ''
  });

  // About Yourself
  const [aboutYourself, setAboutYourself] = useState({
    tagline: 'Enthusiastic farm worker from Argentina seeking agricultural opportunities in regional Australia'
  });

  // Work Experiences
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([
    {
      id: '1',
      startDate: '01/2020',
      endDate: '12/2024',
      position: 'Farm Attendant',
      company: 'Villa Farm',
      location: 'Mendoza, Argentina'
    },
    {
      id: '2',
      startDate: '03/2015',
      endDate: '12/2019',
      position: 'Marketing Head',
      company: 'Workspot',
      location: 'Buenos Aires, Argentina'
    }
  ]);

  // Job References
  const [jobReferences, setJobReferences] = useState<JobReference[]>([
    {
      id: '1',
      name: 'Elaine Smith',
      businessName: 'Villa Farm Pty Ltd',
      email: 'elaine.smith@villafarm.com',
      phone: '61499888000',
      role: 'Head of HR'
    }
  ]);

  // Constants
  const countries = [
    'Argentina', 'Belgium', 'Canada', 'Chile', 'Cyprus', 'Czech Republic', 'Denmark',
    'Estonia', 'Finland', 'France', 'Germany', 'Hong Kong', 'Ireland', 'Italy',
    'Japan', 'Malaysia', 'Malta', 'Netherlands', 'Norway', 'Poland', 'Portugal',
    'Slovakia', 'Slovenia', 'South Korea', 'Spain', 'Sweden', 'Taiwan', 'Thailand',
    'Turkey', 'United Kingdom', 'Uruguay'
  ];

  const visaTypes = ['417', '462'];
  
  const industries = [
    'Agriculture & Farming',
    'Construction',
    'Hospitality & Tourism',
    'Healthcare',
    'Education',
    'Retail',
    'Transportation',
    'Manufacturing',
    'Mining',
    'Other'
  ];

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

  const countryCodes = [
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+54', country: 'Argentina', flag: '🇦🇷' },
    { code: '+32', country: 'Belgium', flag: '🇧🇪' },
    { code: '+1', country: 'Canada', flag: '🇨🇦' },
    { code: '+56', country: 'Chile', flag: '🇨🇱' },
    { code: '+357', country: 'Cyprus', flag: '🇨🇾' },
    { code: '+420', country: 'Czech Republic', flag: '🇨🇿' },
    { code: '+45', country: 'Denmark', flag: '🇩🇰' },
    { code: '+372', country: 'Estonia', flag: '🇪🇪' },
    { code: '+358', country: 'Finland', flag: '🇫🇮' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+852', country: 'Hong Kong', flag: '🇭🇰' },
    { code: '+353', country: 'Ireland', flag: '🇮🇪' },
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
    { code: '+356', country: 'Malta', flag: '🇲🇹' },
    { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
    { code: '+47', country: 'Norway', flag: '🇳🇴' },
    { code: '+48', country: 'Poland', flag: '🇵🇱' },
    { code: '+351', country: 'Portugal', flag: '🇵🇹' },
    { code: '+421', country: 'Slovakia', flag: '🇸🇰' },
    { code: '+386', country: 'Slovenia', flag: '🇸🇮' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+34', country: 'Spain', flag: '🇪🇸' },
    { code: '+46', country: 'Sweden', flag: '🇸🇪' },
    { code: '+886', country: 'Taiwan', flag: '🇹🇼' },
    { code: '+66', country: 'Thailand', flag: '🇹🇭' },
    { code: '+90', country: 'Turkey', flag: '🇹🇷' },
    { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
    { code: '+598', country: 'Uruguay', flag: '🇺🇾' }
  ];

  const stayDurations = [
    '6 months', '12 months', '18 months', '2 years', 'Flexible'
  ];

  const licenseOptions = [
    'RSA (Responsible Service of Alcohol)',
    'RCG (Responsible Conduct of Gambling)',
    'Food Safety Certificate',
    'White Card (Construction Induction)',
    'Forklift License',
    'First Aid Certificate',
    'Working at Heights Permit',
    'Driver\'s License (Australian)',
    'Driver\'s License (International)',
    'Other'
  ];

  // Handle functions
  const handlePersonalDataChange = (field: string, value: string) => {
    setPersonalData({ ...personalData, [field]: value });
  };

  const handleVisaDataChange = (field: string, value: string) => {
    setVisaData({ ...visaData, [field]: value });
  };

  const handleAddressDataChange = (field: string, value: string | boolean) => {
    setAddressData({ ...addressData, [field]: value });
  };

  const handleWorkPreferenceChange = (field: string, value: string | string[]) => {
    setWorkPreferences({ ...workPreferences, [field]: value });
  };

  const handleAboutYourselfChange = (field: string, value: string) => {
    setAboutYourself({ ...aboutYourself, [field]: value });
  };

  const toggleLicense = (license: string) => {
    const currentLicenses = workPreferences.licenses;
    const updatedLicenses = currentLicenses.includes(license)
      ? currentLicenses.filter(l => l !== license)
      : [...currentLicenses, license];
    
    handleWorkPreferenceChange('licenses', updatedLicenses);
  };

  // Work Experience functions
  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      startDate: '',
      endDate: '',
      position: '',
      company: '',
      location: ''
    };
    setWorkExperiences([...workExperiences, newExperience]);
  };

  const updateWorkExperience = (id: string, field: string, value: string) => {
    setWorkExperiences(workExperiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeWorkExperience = (id: string) => {
    setWorkExperiences(workExperiences.filter(exp => exp.id !== id));
  };

  // Job Reference functions
  const addJobReference = () => {
    const newReference: JobReference = {
      id: Date.now().toString(),
      name: '',
      businessName: '',
      email: '',
      phone: '',
      role: ''
    };
    setJobReferences([...jobReferences, newReference]);
  };

  const updateJobReference = (id: string, field: string, value: string) => {
    setJobReferences(jobReferences.map(ref => 
      ref.id === id ? { ...ref, [field]: value } : ref
    ));
  };

  const removeJobReference = (id: string) => {
    setJobReferences(jobReferences.filter(ref => ref.id !== id));
  };

  const handleSave = () => {
    console.log('Profile data saved:', {
      personalData,
      visaData,
      addressData,
      workPreferences,
      aboutYourself,
      workExperiences,
      jobReferences
    });
    
    toast({
      title: "Profile Updated",
      description: "Your WHV profile has been successfully updated",
    });
    navigate('/whv/dashboard');
  };

  const handleCancel = () => {
    navigate('/whv/dashboard');
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
                onClick={handleCancel}
                className="text-orange-500 font-medium underline"
              >
                Cancel
              </button>
              <h1 className="text-lg font-medium text-gray-900">Edit Profile</h1>
              <button 
                onClick={handleSave}
                className="flex items-center text-orange-500 font-medium underline"
              >
                <Check size={16} className="mr-1" />
                Save
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="space-y-8 pb-20">
              
              {/* Personal Information Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                
                <div className="space-y-4">
                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">Date of Birth (DD/MM/YYYY)</Label>
                    <Input
                      type="text"
                      value={personalData.dateOfBirth}
                      onChange={(e) => handlePersonalDataChange('dateOfBirth', e.target.value)}
                      className="h-12 bg-gray-100 border-0 text-gray-900"
                      placeholder="15/03/1995"
                    />
                  </div>

                  {/* Nationality */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">Nationality (Country of Passport)</Label>
                    <Select value={personalData.nationality} onValueChange={(value) => handlePersonalDataChange('nationality', value)}>
                      <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-50">
                        {countries.map((country) => (
                          <SelectItem key={country} value={country} className="hover:bg-gray-100">
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">Phone Number</Label>
                    <div className="flex gap-2">
                      <Select value={personalData.countryCode} onValueChange={(value) => handlePersonalDataChange('countryCode', value)}>
                        <SelectTrigger className="w-24 h-12 bg-gray-100 border-0 text-gray-900">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-50">
                          {countryCodes.map((cc) => (
                            <SelectItem key={cc.code} value={cc.code} className="hover:bg-gray-100">
                              {cc.flag} {cc.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="text"
                        value={personalData.phoneNumber}
                        onChange={(e) => handlePersonalDataChange('phoneNumber', e.target.value)}
                        className="flex-1 h-12 bg-gray-100 border-0 text-gray-900"
                        placeholder="492 333 444"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Visa Information Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Visa Information</h2>
                
                <div className="space-y-4">
                  {/* Visa Type */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">Visa Type</Label>
                    <Select value={visaData.visaType} onValueChange={(value) => handleVisaDataChange('visaType', value)}>
                      <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                        {visaTypes.map((type) => (
                          <SelectItem key={type} value={type} className="hover:bg-gray-100">
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Visa Expiry Date */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">Visa Expiry Date (DD/MM/YYYY)</Label>
                    <Input
                      type="text"
                      value={visaData.visaExpiryDate}
                      onChange={(e) => handleVisaDataChange('visaExpiryDate', e.target.value)}
                      className="h-12 bg-gray-100 border-0 text-gray-900"
                      placeholder="01/01/2026"
                    />
                  </div>
                </div>
              </div>

              {/* Current Address Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Current Address</h2>
                
                {/* Location Toggle */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleAddressDataChange('isInAustralia', true)}
                    className={`flex-1 p-4 rounded-xl border-2 transition-colors ${
                      addressData.isInAustralia 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">🇦🇺</div>
                      <div className="font-medium text-gray-900">I'm in Australia</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddressDataChange('isInAustralia', false)}
                    className={`flex-1 p-4 rounded-xl border-2 transition-colors ${
                      !addressData.isInAustralia 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">🌍</div>
                      <div className="font-medium text-gray-900">I'm overseas</div>
                    </div>
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Address Line 1 */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">Address Line 1</Label>
                    <Input
                      type="text"
                      value={addressData.addressLine1}
                      onChange={(e) => handleAddressDataChange('addressLine1', e.target.value)}
                      className="h-12 bg-gray-100 border-0 text-gray-900"
                      placeholder="22 Valley St."
                    />
                  </div>

                  {/* Address Line 2 */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">Address Line 2 (Optional)</Label>
                    <Input
                      type="text"
                      value={addressData.addressLine2}
                      onChange={(e) => handleAddressDataChange('addressLine2', e.target.value)}
                      className="h-12 bg-gray-100 border-0 text-gray-900"
                      placeholder="Unit 5, Building B"
                    />
                  </div>

                  {/* Suburb */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">
                      {addressData.isInAustralia ? 'Suburb' : 'District/Area'}
                    </Label>
                    <Input
                      type="text"
                      value={addressData.suburb}
                      onChange={(e) => handleAddressDataChange('suburb', e.target.value)}
                      className="h-12 bg-gray-100 border-0 text-gray-900"
                      placeholder={addressData.isInAustralia ? "Spring Hill" : "Your area/district"}
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">City</Label>
                    <Input
                      type="text"
                      value={addressData.city}
                      onChange={(e) => handleAddressDataChange('city', e.target.value)}
                      className="h-12 bg-gray-100 border-0 text-gray-900"
                      placeholder="Brisbane"
                    />
                  </div>

                  {/* State/Country */}
                  {addressData.isInAustralia ? (
                    <div className="space-y-2">
                      <Label className="text-base font-medium text-gray-700">State</Label>
                      <Select value={addressData.state} onValueChange={(value) => handleAddressDataChange('state', value)}>
                        <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-50">
                          {australianStates.map((state) => (
                            <SelectItem key={state} value={state} className="hover:bg-gray-100">
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label className="text-base font-medium text-gray-700">Country</Label>
                      <Select value={addressData.country} onValueChange={(value) => handleAddressDataChange('country', value)}>
                        <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-50">
                          {countries.map((country) => (
                            <SelectItem key={country} value={country} className="hover:bg-gray-100">
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Post Code */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">
                      {addressData.isInAustralia ? 'Post Code' : 'Postal/Zip Code'}
                    </Label>
                    <Input
                      type="text"
                      value={addressData.postCode}
                      onChange={(e) => handleAddressDataChange('postCode', e.target.value)}
                      className="h-12 bg-gray-100 border-0 text-gray-900"
                      placeholder="4000"
                    />
                  </div>
                </div>
              </div>

              {/* Work Preferences Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Work Preferences</h2>
                
                <div className="space-y-4">
                  {/* Available Start Date */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">Available Start Date (DD/MM/YYYY)</Label>
                    <Input
                      type="text"
                      value={workPreferences.availableStartDate}
                      onChange={(e) => handleWorkPreferenceChange('availableStartDate', e.target.value)}
                      className="h-12 bg-gray-100 border-0 text-gray-900"
                      placeholder="10/10/2025"
                    />
                  </div>

                  {/* Preferred Industry */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">Industry Interested In</Label>
                    <Select value={workPreferences.preferredIndustry} onValueChange={(value) => handleWorkPreferenceChange('preferredIndustry', value)}>
                      <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                        <SelectValue />
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

                  {/* Stay Duration */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">How long do you want to stay at one job?</Label>
                    <Select value={workPreferences.stayDuration} onValueChange={(value) => handleWorkPreferenceChange('stayDuration', value)}>
                      <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                        {stayDurations.map((duration) => (
                          <SelectItem key={duration} value={duration} className="hover:bg-gray-100">
                            {duration}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Willing to Relocate */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">Are you willing to relocate to other states for work?</Label>
                    <Select value={workPreferences.willingToRelocate} onValueChange={(value) => handleWorkPreferenceChange('willingToRelocate', value)}>
                      <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                        <SelectItem value="yes" className="hover:bg-gray-100">Yes</SelectItem>
                        <SelectItem value="no" className="hover:bg-gray-100">No</SelectItem>
                        <SelectItem value="maybe" className="hover:bg-gray-100">Maybe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Licenses/Tickets */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium text-gray-700">Licenses/Tickets (Select all that apply)</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {licenseOptions.map((license) => (
                        <div key={license} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id={license}
                            checked={workPreferences.licenses.includes(license)}
                            onChange={() => toggleLicense(license)}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                          />
                          <label htmlFor={license} className="text-sm text-gray-700">
                            {license}
                          </label>
                        </div>
                      ))}
                    </div>
                    
                    {/* Other License Input */}
                    {workPreferences.licenses.includes('Other') && (
                      <div className="space-y-2 mt-3">
                        <Label className="text-sm font-medium text-gray-700">
                          Please specify other licenses/tickets
                        </Label>
                        <Input
                          type="text"
                          value={workPreferences.otherLicense}
                          onChange={(e) => handleWorkPreferenceChange('otherLicense', e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900"
                          placeholder="Enter your other licenses/tickets"
                        />
                      </div>
                    )}
                    
                    {workPreferences.licenses.length > 0 && (
                      <div className="text-sm text-gray-600">
                        Selected: {workPreferences.licenses.join(', ')}
                        {workPreferences.licenses.includes('Other') && workPreferences.otherLicense && 
                          ` (${workPreferences.otherLicense})`
                        }
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* About Yourself Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">About Yourself</h2>
                
                <div className="space-y-2">
                  <Label className="text-base font-medium text-gray-700">Profile Tagline</Label>
                  <p className="text-sm text-gray-600">
                    Write a brief tagline that describes you professionally (max 100 characters)
                  </p>
                  <Textarea
                    value={aboutYourself.tagline}
                    onChange={(e) => handleAboutYourselfChange('tagline', e.target.value)}
                    className="bg-gray-100 border-0 text-gray-900 resize-none"
                    placeholder="e.g., Enthusiastic farm worker from Argentina seeking agricultural opportunities in regional Australia"
                    maxLength={100}
                    rows={3}
                  />
                  <div className="text-xs text-gray-500 text-right">
                    {aboutYourself.tagline.length}/100
                  </div>
                </div>
              </div>

              {/* Work Experience Details Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Work Experience Details</h2>
                  <Button
                    type="button"
                    onClick={addWorkExperience}
                    disabled={workExperiences.length >= 8}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Experience
                  </Button>
                </div>

                {workExperiences.map((experience, index) => (
                  <div key={experience.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Experience {index + 1}</h3>
                      <Button
                        type="button"
                        onClick={() => removeWorkExperience(experience.id)}
                        variant="ghost"
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Start Date</Label>
                        <Input
                          type="text"
                          value={experience.startDate}
                          onChange={(e) => updateWorkExperience(experience.id, 'startDate', e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                          placeholder="01/2020"
                          maxLength={10}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">End Date</Label>
                        <Input
                          type="text"
                          value={experience.endDate}
                          onChange={(e) => updateWorkExperience(experience.id, 'endDate', e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                          placeholder="12/2024"
                          maxLength={10}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Position</Label>
                      <Input
                        type="text"
                        value={experience.position}
                        onChange={(e) => updateWorkExperience(experience.id, 'position', e.target.value)}
                        className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                        placeholder="Farm Attendant"
                        maxLength={50}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Company</Label>
                      <Input
                        type="text"
                        value={experience.company}
                        onChange={(e) => updateWorkExperience(experience.id, 'company', e.target.value)}
                        className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                        placeholder="Villa Farm"
                        maxLength={50}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Location</Label>
                      <Input
                        type="text"
                        value={experience.location}
                        onChange={(e) => updateWorkExperience(experience.id, 'location', e.target.value)}
                        className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                        placeholder="Mendoza, Argentina"
                        maxLength={50}
                      />
                    </div>
                  </div>
                ))}

                {workExperiences.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No work experiences added yet.</p>
                    <p className="text-sm">Click "Add Experience" to get started.</p>
                  </div>
                )}
              </div>

              {/* Job References Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Job References</h2>
                  <Button
                    type="button"
                    onClick={addJobReference}
                    disabled={jobReferences.length >= 5}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Reference
                  </Button>
                </div>

                {jobReferences.map((reference, index) => (
                  <div key={reference.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Reference {index + 1}</h3>
                      <Button
                        type="button"
                        onClick={() => removeJobReference(reference.id)}
                        variant="ghost"
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Name</Label>
                        <Input
                          type="text"
                          value={reference.name}
                          onChange={(e) => updateJobReference(reference.id, 'name', e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                          placeholder="Elaine Smith"
                          maxLength={50}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Business Name</Label>
                        <Input
                          type="text"
                          value={reference.businessName}
                          onChange={(e) => updateJobReference(reference.id, 'businessName', e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                          placeholder="Villa Farm Pty Ltd"
                          maxLength={50}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Email</Label>
                        <Input
                          type="email"
                          value={reference.email}
                          onChange={(e) => updateJobReference(reference.id, 'email', e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                          placeholder="elaine.smith@villafarm.com"
                          maxLength={100}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                        <Input
                          type="text"
                          value={reference.phone}
                          onChange={(e) => updateJobReference(reference.id, 'phone', e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                          placeholder="61499888000"
                          maxLength={15}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Role</Label>
                        <Input
                          type="text"
                          value={reference.role}
                          onChange={(e) => updateJobReference(reference.id, 'role', e.target.value)}
                          className="h-10 bg-gray-100 border-0 text-gray-900 text-sm"
                          placeholder="Head of HR"
                          maxLength={50}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {jobReferences.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No job references added yet.</p>
                    <p className="text-sm">Click "Add Reference" to get started.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WHVEditProfile;