import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft } from 'lucide-react';

const WHVWorkExperience: React.FC = () => {
  const navigate = useNavigate();
  
  // Form state - matching the edit profile structure
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
  const [workExperienceText, setWorkExperienceText] = useState('');
  const [skillsInterests, setSkillsInterests] = useState('');
  const [whyAustralia, setWhyAustralia] = useState('');
  const [languages, setLanguages] = useState('');
  const [jobReferences, setJobReferences] = useState('');

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

  const licenseOptions = [
    'N/A',
    'Driver\'s License',
    'Forklift License',
    'Working at Heights',
    'White Card (Construction)',
    'RSA (Responsible Service of Alcohol)',
    'RCG (Responsible Conduct of Gambling)',
    'Food Safety Certificate',
    'First Aid Certificate',
    'Heavy Vehicle License',
    'Crane License',
    'Electrical License',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/whv/photo-upload');
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
              <h1 className="text-lg font-medium text-gray-900">Work Experience</h1>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <span className="text-sm font-medium text-gray-600">5/6</span>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <form onSubmit={handleSubmit} className="space-y-4 pb-20">
              
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
                      type="button"
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
                      type="button"
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

                {/* Industry Interested In */}
                <div className="mb-4">
                  <Label className="text-gray-600 mb-2 block">Industry Interested in</Label>
                  <Select value={industryInterested} onValueChange={setIndustryInterested}>
                    <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white">
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

                {/* How long staying in Australia */}
                <div className="mb-4">
                  <Label className="text-gray-600 mb-2 block">How long are you planning to stay in Australia?</Label>
                  <Select value={stayDuration} onValueChange={setStayDuration}>
                    <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white">
                      <SelectValue />
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
                <div className="mb-4">
                  <Label className="text-gray-600 mb-2 block">Willing to Relocate?</Label>
                  <RadioGroup value={willingToRelocate} onValueChange={setWillingToRelocate} className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Licenses/Tickets */}
                <div>
                  <Label className="text-gray-600 mb-2 block">Licenses/Tickets</Label>
                  <Select value={licenses} onValueChange={setLicenses}>
                    <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-50">
                      {licenseOptions.map((license) => (
                        <SelectItem key={license} value={license} className="hover:bg-gray-100">
                          {license}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* About You Section */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">About You</h3>
                
                {/* Work Experience & Skills */}
                <div className="mb-4">
                  <Label htmlFor="workExp" className="text-gray-600 mb-2 block">Work Experience & Skills</Label>
                  <Textarea
                    id="workExp"
                    value={workExperienceText}
                    onChange={(e) => setWorkExperienceText(e.target.value)}
                    placeholder="Tell us about your work experience, skills, and what makes you a great candidate..."
                    className="min-h-24 rounded-xl border-gray-200 bg-white resize-none"
                  />
                </div>

                {/* Skills & Interests */}
                <div className="mb-4">
                  <Label htmlFor="skills" className="text-gray-600 mb-2 block">Skills & Interests</Label>
                  <Textarea
                    id="skills"
                    value={skillsInterests}
                    onChange={(e) => setSkillsInterests(e.target.value)}
                    placeholder="What are your key skills and interests? What do you enjoy doing?"
                    className="min-h-24 rounded-xl border-gray-200 bg-white resize-none"
                  />
                </div>

                {/* Why Australia */}
                <div className="mb-4">
                  <Label htmlFor="whyAus" className="text-gray-600 mb-2 block">Why do you want to work in Australia?</Label>
                  <Textarea
                    id="whyAus"
                    value={whyAustralia}
                    onChange={(e) => setWhyAustralia(e.target.value)}
                    placeholder="Share your motivation for working in Australia and what you hope to achieve..."
                    className="min-h-24 rounded-xl border-gray-200 bg-white resize-none"
                  />
                </div>

                {/* Job References */}
                <div>
                  <Label htmlFor="references" className="text-gray-600 mb-2 block">Job References</Label>
                  <Textarea
                    id="references"
                    value={jobReferences}
                    onChange={(e) => setJobReferences(e.target.value)}
                    placeholder="Please provide contact details for previous employers or references..."
                    className="min-h-24 rounded-xl border-gray-200 bg-white resize-none"
                  />
                </div>
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

export default WHVWorkExperience;