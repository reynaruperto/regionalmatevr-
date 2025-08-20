import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const EmployerPhotoUpload: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedPhoto(result);
        localStorage.setItem('businessProfilePhoto', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReUpload = () => {
    setUploadedPhoto(null);
    localStorage.removeItem('businessProfilePhoto');
  };

  const handleComplete = () => {
    if (!uploadedPhoto) {
      toast({
        title: "Photo required",
        description: "Please upload a business photo to continue",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Profile completed!",
      description: "Your business account has been created successfully",
    });
    navigate('/employer-account-confirmation');
  };

  const handleSkip = () => {
    navigate('/employer-account-confirmation');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-background rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          {/* Main content container */}
          <div className="w-full h-full flex flex-col relative bg-white">
            
            {/* Header with back button and title */}
            <div className="px-6 pt-16 pb-6">
              <div className="flex items-center justify-between mb-8">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-12 h-12 bg-gray-100 rounded-xl shadow-sm"
                  onClick={() => navigate('/business-address')}
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </Button>
                <div className="flex-1"></div>
              </div>

              {/* Progress indicator and title */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Account Set Up</h1>
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                    <span className="text-sm font-medium text-gray-600">4/4</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 flex flex-col justify-center">
              {/* Upload Photo Title */}
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Upload your photo</h2>
              </div>

              {/* Photo Upload Area */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  {uploadedPhoto ? (
                    <div className="w-48 h-48 rounded-xl overflow-hidden border-2 border-gray-200">
                      <img 
                        src={uploadedPhoto} 
                        alt="Uploaded business photo" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-48 h-48 bg-gray-100 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                      <Camera className="w-12 h-12 text-gray-400 mb-4" />
                      <p className="text-gray-500 text-sm text-center">Tap to upload<br />business photo</p>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Re Upload Button */}
              {uploadedPhoto && (
                <div className="flex justify-center mb-8">
                  <Button 
                    variant="outline"
                    onClick={handleReUpload}
                    className="h-12 px-8 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Re Upload
                  </Button>
                </div>
              )}
            </div>

            {/* Bottom Buttons */}
            <div className="px-6 pb-8 space-y-4">
              <Button 
                onClick={handleComplete}
                className="w-full h-14 text-lg rounded-xl bg-slate-800 hover:bg-slate-700 text-white"
              >
                {uploadedPhoto ? 'Complete your profile' : 'Continue'}
              </Button>
              
              {!uploadedPhoto && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="text-gray-600 hover:text-gray-800 underline text-sm"
                  >
                    Skip for now
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerPhotoUpload;