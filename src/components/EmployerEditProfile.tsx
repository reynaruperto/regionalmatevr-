import React, { useState, useEffect, useRef } from 'react';
import { Camera, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const EmployerEditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePhoto, setProfilePhoto] = useState<string>('/lovable-uploads/5171768d-7ee5-4242-8d48-29d87d896302.png');
  const [profileVisible, setProfileVisible] = useState(true);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@gmail.com');

  useEffect(() => {
    // Load profile photo from localStorage
    const storedPhoto = localStorage.getItem('employerProfilePhoto');
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
          localStorage.setItem('employerProfilePhoto', result);
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
      description: "Your employer profile has been successfully updated",
    });
    navigate('/employer-dashboard');
  };

  const handleCancel = () => {
    navigate('/employer-dashboard');
  };

  const handlePreviewProfile = () => {
    navigate('/employer-profile');
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
                  className="text-lg font-medium text-gray-900 underline"
                >
                  Cancel
                </button>
                <h1 className="text-lg font-semibold text-gray-900">{name}</h1>
                <button 
                  onClick={handleSave}
                  className="flex items-center text-lg font-medium text-gray-900 underline"
                >
                  <Check size={20} className="mr-1" />
                  Save
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 overflow-y-auto pb-6">
              
              {/* Profile Visibility */}
              <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Profile Visibility</h3>
                    <p className="text-sm text-gray-500">Your profile is currently visible to all RegionalMate users</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-gray-900 mr-3">ON</span>
                    <Switch 
                      checked={profileVisible}
                      onCheckedChange={setProfileVisible}
                      className="data-[state=checked]:bg-green-500 scale-125"
                    />
                  </div>
                </div>
              </div>

              {/* Preview Profile Card */}
              <div className="bg-white rounded-2xl p-5 mb-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Preview Profile card</h3>
                  <Button 
                    onClick={handlePreviewProfile}
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg font-medium"
                  >
                    VIEW
                  </Button>
                </div>
              </div>

              {/* Profile Picture */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-600 mb-3">Profile Picture</h3>
                <div className="relative w-32 h-32">
                  <button 
                    onClick={handlePhotoClick}
                    className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-800 hover:opacity-80 transition-opacity"
                  >
                    <img 
                      src={profilePhoto} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </button>
                  <div className="absolute bottom-2 right-2 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center pointer-events-none">
                    <Camera size={20} className="text-white" />
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
              <div className="space-y-5">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-lg font-medium text-gray-600 mb-2 block">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 bg-white text-base px-4"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-lg font-medium text-gray-600 mb-2 block">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 bg-white text-base px-4"
                  />
                </div>
              </div>

              <div className="h-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerEditProfile;