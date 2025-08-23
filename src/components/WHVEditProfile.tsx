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
  const [dateOfBirth, setDateOfBirth] = useState('15/03/1995');
  const [availableStartDate, setAvailableStartDate] = useState('10/10/2025');
  const [nationality, setNationality] = useState('Argentina');
  const [visa, setVisa] = useState('462');
  const [visaExpiryDate, setVisaExpiryDate] = useState('01/01/2026');
  const [countryCode, setCountryCode] = useState('+61');
  const [phoneNumber, setPhoneNumber] = useState('492 333 444');
  
  // Address fields
  const [inAustralia, setInAustralia] = useState(true);
  const [addressLine1, setAddressLine1] = useState('22 Valley St.');
  const [suburbCity, setSuburbCity] = useState('Brisbane');
  const [state, setState] = useState('Queensland');
  const [postCode, setPostCode] = useState('4000');
  const [country, setCountry] = useState('Australia');
  
  // Work preferences
  const [industryInterested, setIndustryInterested] = useState('Agriculture & Farming');
  const [willingToRelocate, setWillingToRelocate] = useState('yes');
  const [stayDuration, setStayDuration] = useState('12 months');
  const [licenses, setLicenses] = useState('N/A');
  
  // About sections
  const [workExperienceText, setWorkExperienceText] = useState('I have experience in hospitality, worked as a barista for 2 years, and have some construction experience...');
  const [skillsInterests, setSkillsInterests] = useState("I'm good with my hands, enjoy outdoor work, love learning new skills, and have strong communication abilities...");
  const [whyAustralia, setWhyAustralia] = useState("I've always wanted to experience Australian culture, explore the outback, and gain work experience in agriculture...");
  const [languages, setLanguages] = useState('Spanish (native), English (fluent)');
  
  // Structured work experiences
  const [workExperiences, setWorkExperiences] = useState([
    {
      position: 'Farm Attendant',
      company: 'Villa Farm',
      location: 'Mendoza, Argentina',
      startDate: '01/2020',
      endDate: '12/2024'
    },
    {
      position: 'Marketing Head',
      company: 'Workspot',
      location: 'Buenos Aires, Argentina',
      startDate: '03/2015',
      endDate: '12/2019'
    }
  ]);
  
  const [jobReferences, setJobReferences] = useState('Elaine Smith- Head of HR (Villa Farm)\nelaineHR@workmail.com\n+61499888000');

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

  const addWorkExperience = () => {
    setWorkExperiences([...workExperiences, {
      position: '',
      company: '',
      location: '',
      startDate: '',
      endDate: ''
    }]);
  };

  const updateWorkExperience = (index: number, field: string, value: string) => {
    const updated = workExperiences.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    setWorkExperiences(updated);
  };

  const removeWorkExperience = (index: number) => {
    setWorkExperiences(workExperiences.filter((_, i) => i !== index));
  };

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
                <h1 className="text-lg font-semibold text-gray-900">WHV Profile Details</h1>
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
                {/* Personal Information Section */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Personal Information</h3>
                  
                  {/* Date of Birth */}
                  <div className="mb-4">
                    <Label htmlFor="dob" className="text-gray-600 mb-2 block">Date of Birth (DD/MM/YYYY)</Label>
                    <Input
                      id="dob"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      placeholder="DD/MM/YYYY"
                      className="h-12 rounded-xl border-gray-200 bg-white"
                    />
                  </div>

                  {/* Nationality */}
                  <div className="mb-4">
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

                  {/* Phone Number with Country Code */}
                  <div className="mb-4">
                    <Label className="text-gray-600 mb-2 block">Phone Number</Label>
                    <div className="flex gap-2">
                      <Select value={countryCode} onValueChange={setCountryCode}>
                        <SelectTrigger className="w-24 h-12 rounded-xl border-gray-200 bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          {countryCodes.map((cc) => (
                            <SelectItem key={cc.code} value={cc.code}>
                              {cc.flag} {cc.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="flex-1 h-12 rounded-xl border-gray-200 bg-white"
                        placeholder="Phone number"
                      />
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <Label htmlFor="languages" className="text-gray-600 mb-2 block">Languages</Label>
                    <Input
                      id="languages"
                      value={languages}
                      onChange={(e) => setLanguages(e.target.value)}
                      placeholder="e.g., Spanish (native), English (fluent)"
                      className="h-12 rounded-xl border-gray-200 bg-white"
                    />
                  </div>
                </div>

                {/* Visa Information Section */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Visa Information</h3>
                  
                  {/* Visa */}
                  <div className="mb-4">
                    <Label className="text-gray-600 mb-2 block">Visa Type</Label>
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
                </div>

                {/* Address Section */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Current Address</h3>
                  
                  {/* Location toggle */}
                  <div className="mb-4">
                    <div className="flex gap-4">
                      <button
                        onClick={() => setInAustralia(true)}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          inAustralia 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        In Australia
                      </button>
                      <button
                        onClick={() => setInAustralia(false)}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          !inAustralia 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        Overseas
                      </button>
                    </div>
                  </div>

                  {/* Address Line 1 */}
                  <div className="mb-4">
                    <Label htmlFor="address" className="text-gray-600 mb-2 block">Address Line 1</Label>
                    <Input
                      id="address"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      className="h-12 rounded-xl border-gray-200 bg-white"
                    />
                  </div>

                  {/* Suburb/City */}
                  <div className="mb-4">
                    <Label htmlFor="suburb" className="text-gray-600 mb-2 block">Suburb/City</Label>
                    <Input
                      id="suburb"
                      value={suburbCity}
                      onChange={(e) => setSuburbCity(e.target.value)}
                      className="h-12 rounded-xl border-gray-200 bg-white"
                    />
                  </div>

                  {inAustralia ? (
                    <>
                      {/* State */}
                      <div className="mb-4">
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
                    </>
                  ) : (
                    <div>
                      <Label className="text-gray-600 mb-2 block">Country</Label>
                      <Select value={country} onValueChange={setCountry}>
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
                  )}
                </div>

                {/* Work Preferences Section */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Work Preferences</h3>
                  
                  {/* Available Start Date */}
                  <div className="mb-4">
                    <Label htmlFor="startDate" className="text-gray-600 mb-2 block">Available Start Date (DD/MM/YYYY)</Label>
                    <Input
                      id="startDate"
                      value={availableStartDate}
                      onChange={(e) => setAvailableStartDate(e.target.value)}
                      placeholder="DD/MM/YYYY"
                      className="h-12 rounded-xl border-gray-200 bg-white"
                    />
                  </div>

                  {/* Industry Interested */}
                  <div className="mb-4">
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

                  {/* Stay Duration */}
                  <div className="mb-4">
                    <Label className="text-gray-600 mb-2 block">How long are you planning to stay in Australia?</Label>
                    <Select value={stayDuration} onValueChange={setStayDuration}>
                      <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        {stayDurations.map((duration) => (
                          <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Willing to Relocate */}
                  <div className="mb-4">
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
                      placeholder="e.g., Driver's License, Forklift License, RSA"
                      className="h-12 rounded-xl border-gray-200 bg-white"
                    />
                  </div>
                </div>

                {/* Tell us about yourself Section */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Tell us about yourself</h3>
                  <p className="text-sm text-gray-500 mb-4">This helps us match you with the right employers and opportunities.</p>
                  
                  {/* Work Experience */}
                  <div className="mb-4">
                    <Label htmlFor="workExperienceText" className="text-gray-600 mb-2 block">What work experience do you have?</Label>
                    <Textarea
                      id="workExperienceText"
                      value={workExperienceText}
                      onChange={(e) => setWorkExperienceText(e.target.value)}
                      placeholder="I have experience in hospitality, worked as a barista for 2 years, and have some construction experience..."
                      className="min-h-[80px] rounded-xl border-gray-200 bg-white resize-none"
                    />
                  </div>

                  {/* Skills and Interests */}
                  <div className="mb-4">
                    <Label htmlFor="skillsInterests" className="text-gray-600 mb-2 block">What are your main skills and interests?</Label>
                    <Textarea
                      id="skillsInterests"
                      value={skillsInterests}
                      onChange={(e) => setSkillsInterests(e.target.value)}
                      placeholder="I'm good with my hands, enjoy outdoor work, love learning new skills, and have strong communication abilities..."
                      className="min-h-[80px] rounded-xl border-gray-200 bg-white resize-none"
                    />
                  </div>

                  {/* Why Australia */}
                  <div>
                    <Label htmlFor="whyAustralia" className="text-gray-600 mb-2 block">Why did you choose Australia for your working holiday?</Label>
                    <Textarea
                      id="whyAustralia"
                      value={whyAustralia}
                      onChange={(e) => setWhyAustralia(e.target.value)}
                      placeholder="I've always wanted to experience Australian culture, explore the outback, and gain work experience in agriculture..."
                      className="min-h-[80px] rounded-xl border-gray-200 bg-white resize-none"
                    />
                  </div>
                </div>

                {/* Structured Work Experience Section */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Work Experience Details</h3>
                    <Button 
                      onClick={addWorkExperience}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm"
                    >
                      + Add Experience
                    </Button>
                  </div>
                  
                  {workExperiences.map((exp, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4 mb-4 last:mb-0">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-700">Experience {index + 1}</h4>
                        {workExperiences.length > 1 && (
                          <Button 
                            onClick={() => removeWorkExperience(index)}
                            variant="ghost"
                            className="text-red-500 hover:bg-red-50 p-1 h-auto"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <Label className="text-gray-600 mb-1 block text-sm">Start Date</Label>
                          <Input
                            value={exp.startDate}
                            onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                            placeholder="MM/YYYY"
                            className="h-10 rounded-lg border-gray-200 bg-white text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-600 mb-1 block text-sm">End Date</Label>
                          <Input
                            value={exp.endDate}
                            onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
                            placeholder="MM/YYYY or Present"
                            className="h-10 rounded-lg border-gray-200 bg-white text-sm"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <Label className="text-gray-600 mb-1 block text-sm">Position</Label>
                        <Input
                          value={exp.position}
                          onChange={(e) => updateWorkExperience(index, 'position', e.target.value)}
                          placeholder="e.g., Farm Worker, Barista, Construction Helper"
                          className="h-10 rounded-lg border-gray-200 bg-white text-sm"
                        />
                      </div>
                      
                      <div className="mb-3">
                        <Label className="text-gray-600 mb-1 block text-sm">Company</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                          placeholder="Company name"
                          className="h-10 rounded-lg border-gray-200 bg-white text-sm"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-gray-600 mb-1 block text-sm">Location</Label>
                        <Input
                          value={exp.location}
                          onChange={(e) => updateWorkExperience(index, 'location', e.target.value)}
                          placeholder="City, Country"
                          className="h-10 rounded-lg border-gray-200 bg-white text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Job References Section */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Job References</h3>
                  <div>
                    <Label htmlFor="references" className="text-gray-600 mb-2 block">Contact details for previous employers or supervisors</Label>
                    <Textarea
                      id="references"
                      value={jobReferences}
                      onChange={(e) => setJobReferences(e.target.value)}
                      placeholder="Name - Position (Company)&#10;Email&#10;Phone&#10;&#10;[Add multiple references separated by blank lines]"
                      className="min-h-[100px] rounded-xl border-gray-200 bg-white resize-none"
                    />
                  </div>
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