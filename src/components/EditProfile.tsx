import React, { useState, useEffect, useRef } from 'react';
import { Camera, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePhoto, setProfilePhoto] = useState<string>('/lovable-uploads/5171768d-7ee5-4242-8d48-29d87d896302.png');
  const [profileVisible, setProfileVisible] = useState(true);
  
  // Basic Info
  const [givenName, setGivenName] = useState('Peter');
  const [familyName, setFamilyName] = useState('Parker');
  const [email, setEmail] = useState('peterparker@gmail.com');
  
  // Address Info
  const [addressLine1, setAddressLine1] = useState('22 Valley St');
  const [suburb, setSuburb] = useState('Spring Hill');
  const [city, setCity] = useState('Brisbane');
  const [state, setState] = useState('Queensland');
  const [postCode, setPostCode] = useState('4000');
  
  // Work Info
  const [willingToRelocate, setWillingToRelocate] = useState('Yes, anywhere in QLD/NSW');
  const [availableStartDate, setAvailableStartDate] = useState('Sep 2025');
  const [preferredIndustry, setPreferredIndustry] = useState('Agriculture and Farming');
  const [licenses, setLicenses] = useState("Driver's License, First Aid");
  const [workExperiences, setWorkExperiences] = useState([
    {
      startDate: '2020',
      endDate: '2025',
      position: 'Farm Attendant',
      company: 'VillaFarm',
      location: 'Queensland, Australia'
    },
    {
      startDate: '2019',
      endDate: '2020',
      position: 'Marketing Head',
      company: 'Workspace',
      location: 'Buenos Aires, Argentina'
    },
    {
      startDate: '2007',
      endDate: '2019',
      position: 'Winery Assistant',
      company: 'BodegaWinery',
      location: 'Mendoza, Argentina'
    }
  ]);
  
  // Personal Info
  const [languages, setLanguages] = useState('Spanish (Native), English (Fluent)');
  const [nationality, setNationality] = useState('Argentina');
  const [visaType, setVisaType] = useState('417 (Working Holiday)');
  const [visaExpiry, setVisaExpiry] = useState('Sep 2026');

  useEffect(() => {
    // Load profile photo from localStorage
    const storedPhoto = localStorage.getItem('userProfilePhoto');
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
          localStorage.setItem('userProfilePhoto', result);
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
    navigate('/whv-dashboard');
  };

  const handleCancel = () => {
    navigate('/whv-dashboard');
  };

  const handlePreviewProfile = () => {
    navigate('/whv-profile-preview');
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
                <h1 className="text-lg font-semibold text-gray-900">{givenName} {familyName}</h1>
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
                
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Basic Information Section */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Basic Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="givenName" className="text-gray-600 mb-2 block">Given Name</Label>
                        <Input
                          id="givenName"
                          value={givenName}
                          onChange={(e) => setGivenName(e.target.value)}
                          className="h-12 rounded-xl border-gray-200 bg-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="familyName" className="text-gray-600 mb-2 block">Family Name</Label>
                        <Input
                          id="familyName"
                          value={familyName}
                          onChange={(e) => setFamilyName(e.target.value)}
                          className="h-12 rounded-xl border-gray-200 bg-white"
                        />
                      </div>
                    </div>
                    
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
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="nationality" className="text-gray-600 mb-2 block">Nationality</Label>
                        <Input
                          id="nationality"
                          value={nationality}
                          onChange={(e) => setNationality(e.target.value)}
                          className="h-12 rounded-xl border-gray-200 bg-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="languages" className="text-gray-600 mb-2 block">Languages</Label>
                        <Input
                          id="languages"
                          value={languages}
                          onChange={(e) => setLanguages(e.target.value)}
                          className="h-12 rounded-xl border-gray-200 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Information Section */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Current Location</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="addressLine1" className="text-gray-600 mb-2 block">Address Line 1</Label>
                      <Input
                        id="addressLine1"
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        className="h-12 rounded-xl border-gray-200 bg-white"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="suburb" className="text-gray-600 mb-2 block">Suburb</Label>
                        <Input
                          id="suburb"
                          value={suburb}
                          onChange={(e) => setSuburb(e.target.value)}
                          className="h-12 rounded-xl border-gray-200 bg-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city" className="text-gray-600 mb-2 block">City</Label>
                        <Input
                          id="city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="h-12 rounded-xl border-gray-200 bg-white"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="state" className="text-gray-600 mb-2 block">State</Label>
                        <Input
                          id="state"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="h-12 rounded-xl border-gray-200 bg-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postCode" className="text-gray-600 mb-2 block">Post Code</Label>
                        <Input
                          id="postCode"
                          value={postCode}
                          onChange={(e) => setPostCode(e.target.value)}
                          className="h-12 rounded-xl border-gray-200 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visa Information Section */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Visa Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="visaType" className="text-gray-600 mb-2 block">Visa Type</Label>
                        <Input
                          id="visaType"
                          value={visaType}
                          onChange={(e) => setVisaType(e.target.value)}
                          className="h-12 rounded-xl border-gray-200 bg-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="visaExpiry" className="text-gray-600 mb-2 block">Visa Expiry</Label>
                        <Input
                          id="visaExpiry"
                          value={visaExpiry}
                          onChange={(e) => setVisaExpiry(e.target.value)}
                          className="h-12 rounded-xl border-gray-200 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Work Information Section */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Work Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="willingToRelocate" className="text-gray-600 mb-2 block">Willing to Relocate</Label>
                      <Input
                        id="willingToRelocate"
                        value={willingToRelocate}
                        onChange={(e) => setWillingToRelocate(e.target.value)}
                        className="h-12 rounded-xl border-gray-200 bg-white"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="availableStartDate" className="text-gray-600 mb-2 block">Available Start Date</Label>
                        <Input
                          id="availableStartDate"
                          value={availableStartDate}
                          onChange={(e) => setAvailableStartDate(e.target.value)}
                          className="h-12 rounded-xl border-gray-200 bg-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="preferredIndustry" className="text-gray-600 mb-2 block">Preferred Industry</Label>
                        <Input
                          id="preferredIndustry"
                          value={preferredIndustry}
                          onChange={(e) => setPreferredIndustry(e.target.value)}
                          className="h-12 rounded-xl border-gray-200 bg-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="licenses" className="text-gray-600 mb-2 block">Licenses / Certificates</Label>
                      <Input
                        id="licenses"
                        value={licenses}
                        onChange={(e) => setLicenses(e.target.value)}
                        className="h-12 rounded-xl border-gray-200 bg-white"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-gray-600 mb-3 block">Work Experience</Label>
                      <div className="space-y-4">
                        {workExperiences.map((experience, index) => (
                          <div key={index} className="border border-gray-200 rounded-xl p-4 space-y-3">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-gray-900">Experience {index + 1}</h4>
                              {workExperiences.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newExperiences = workExperiences.filter((_, i) => i !== index);
                                    setWorkExperiences(newExperiences);
                                  }}
                                  className="text-red-500 hover:text-red-700 h-8 px-2"
                                >
                                  Remove
                                </Button>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label className="text-sm text-gray-600">Start Date</Label>
                                <Input
                                  value={experience.startDate}
                                  onChange={(e) => {
                                    const newExperiences = [...workExperiences];
                                    newExperiences[index].startDate = e.target.value;
                                    setWorkExperiences(newExperiences);
                                  }}
                                  className="h-10 rounded-lg border-gray-200 bg-white text-sm"
                                  placeholder="2020"
                                />
                              </div>
                              <div>
                                <Label className="text-sm text-gray-600">End Date</Label>
                                <Input
                                  value={experience.endDate}
                                  onChange={(e) => {
                                    const newExperiences = [...workExperiences];
                                    newExperiences[index].endDate = e.target.value;
                                    setWorkExperiences(newExperiences);
                                  }}
                                  className="h-10 rounded-lg border-gray-200 bg-white text-sm"
                                  placeholder="2025 or Present"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label className="text-sm text-gray-600">Position</Label>
                              <Input
                                value={experience.position}
                                onChange={(e) => {
                                  const newExperiences = [...workExperiences];
                                  newExperiences[index].position = e.target.value;
                                  setWorkExperiences(newExperiences);
                                }}
                                className="h-10 rounded-lg border-gray-200 bg-white text-sm"
                                placeholder="Farm Attendant"
                              />
                            </div>
                            
                            <div>
                              <Label className="text-sm text-gray-600">Company</Label>
                              <Input
                                value={experience.company}
                                onChange={(e) => {
                                  const newExperiences = [...workExperiences];
                                  newExperiences[index].company = e.target.value;
                                  setWorkExperiences(newExperiences);
                                }}
                                className="h-10 rounded-lg border-gray-200 bg-white text-sm"
                                placeholder="VillaFarm"
                              />
                            </div>
                            
                            <div>
                              <Label className="text-sm text-gray-600">Location</Label>
                              <Input
                                value={experience.location}
                                onChange={(e) => {
                                  const newExperiences = [...workExperiences];
                                  newExperiences[index].location = e.target.value;
                                  setWorkExperiences(newExperiences);
                                }}
                                className="h-10 rounded-lg border-gray-200 bg-white text-sm"
                                placeholder="Queensland, Australia"
                              />
                            </div>
                          </div>
                        ))}
                        
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setWorkExperiences([...workExperiences, {
                              startDate: '',
                              endDate: '',
                              position: '',
                              company: '',
                              location: ''
                            }]);
                          }}
                          className="w-full h-10 border-dashed border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-500"
                        >
                          + Add Work Experience
                        </Button>
                      </div>
                    </div>
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

export default EditProfile;