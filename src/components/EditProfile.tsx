import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Camera, Check, X, MapPin, Calendar, Globe, Briefcase } from 'lucide-react';
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
  const [formData, setFormData] = useState({
    name: 'Peter Parker',
    email: 'peterparker@gmail.com',
    nationality: 'Argentina',
    currentLocation: 'Brisbane, QLD',
    visaType: 'Working Holiday Visa (417)',
    availableFrom: '2024-09-01',
    bio: 'Backpacker from Argentina with experience in farm work, currently in Brisbane, QLD',
    experience: 'Farm work, fruit picking, packing',
    languages: 'English, Spanish',
    phoneNumber: '+61 423 456 789'
  });

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
                <h1 className="text-lg font-semibold text-gray-900">{formData.name}</h1>
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
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-gray-600 mb-2 block">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="h-12 rounded-xl border-gray-200 bg-white"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-gray-600 mb-2 block">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-12 rounded-xl border-gray-200 bg-white"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <Label htmlFor="phone" className="text-gray-600 mb-2 block">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="h-12 rounded-xl border-gray-200 bg-white"
                  />
                </div>

                {/* Nationality */}
                <div>
                  <Label htmlFor="nationality" className="text-gray-600 mb-2 block">Nationality</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    className="h-12 rounded-xl border-gray-200 bg-white"
                  />
                </div>

                {/* Current Location */}
                <div>
                  <Label htmlFor="location" className="text-gray-600 mb-2 block">Current Location</Label>
                  <Input
                    id="location"
                    value={formData.currentLocation}
                    onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                    className="h-12 rounded-xl border-gray-200 bg-white"
                  />
                </div>

                {/* Visa Type */}
                <div>
                  <Label htmlFor="visa" className="text-gray-600 mb-2 block">Visa Type</Label>
                  <Select value={formData.visaType} onValueChange={(value) => handleInputChange('visaType', value)}>
                    <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Working Holiday Visa (417)">Working Holiday Visa (417)</SelectItem>
                      <SelectItem value="Work and Holiday Visa (462)">Work and Holiday Visa (462)</SelectItem>
                      <SelectItem value="Student Visa (500)">Student Visa (500)</SelectItem>
                      <SelectItem value="Temporary Skill Shortage (482)">Temporary Skill Shortage (482)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Available From */}
                <div>
                  <Label htmlFor="available" className="text-gray-600 mb-2 block">Available From</Label>
                  <Input
                    id="available"
                    type="date"
                    value={formData.availableFrom}
                    onChange={(e) => handleInputChange('availableFrom', e.target.value)}
                    className="h-12 rounded-xl border-gray-200 bg-white"
                  />
                </div>

                {/* Languages */}
                <div>
                  <Label htmlFor="languages" className="text-gray-600 mb-2 block">Languages</Label>
                  <Input
                    id="languages"
                    value={formData.languages}
                    onChange={(e) => handleInputChange('languages', e.target.value)}
                    className="h-12 rounded-xl border-gray-200 bg-white"
                    placeholder="e.g., English, Spanish, French"
                  />
                </div>

                {/* Work Experience */}
                <div>
                  <Label htmlFor="experience" className="text-gray-600 mb-2 block">Work Experience</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="min-h-20 rounded-xl border-gray-200 bg-white resize-none"
                    placeholder="Describe your work experience..."
                  />
                </div>

                {/* Bio */}
                <div>
                  <Label htmlFor="bio" className="text-gray-600 mb-2 block">About Me</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="min-h-24 rounded-xl border-gray-200 bg-white resize-none"
                    placeholder="Tell employers about yourself..."
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

export default EditProfile;