import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Camera, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [profileVisible, setProfileVisible] = useState(true);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@gmail.com');

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
      description: "Your profile has been successfully updated",
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
        <div className="w-full h-full bg-background rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          {/* Main content container */}
          <div className="w-full h-full flex flex-col relative bg-gray-200">
            
            {/* Header */}
            <div className="px-6 pt-16 pb-4">
              <div className="flex items-center justify-between">
                <button 
                  onClick={handleCancel}
                  className="text-[#1E293B] font-medium underline"
                >
                  Cancel
                </button>
                <h1 className="text-lg font-semibold text-gray-900">John Doe</h1>
                <button 
                  onClick={handleSave}
                  className="flex items-center text-[#1E293B] font-medium underline"
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
                    <p className="text-sm text-gray-500">Your profile is currently visible to all RegionalMate users</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">ON</span>
                    <Switch 
                      checked={profileVisible}
                      onCheckedChange={setProfileVisible}
                      className="data-[state=checked]:bg-green-500"
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
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-sm"
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
                    className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#1E293B] hover:opacity-80 transition-opacity"
                  >
                    {profilePhoto ? (
                      <img 
                        src={profilePhoto} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Photo</span>
                      </div>
                    )}
                  </button>
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center pointer-events-none">
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