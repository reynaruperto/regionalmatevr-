
import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const PhotoUploadForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result as string);
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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleReUpload = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    fileInputRef.current?.click();
  };

  const handleContinue = () => {
    if (selectedFile) {
      console.log('Photo uploaded:', selectedFile);
      toast({
        title: "Account setup complete!",
        description: "Welcome to Regional Mate",
      });
      // Navigate to dashboard or next screen
      // navigate('/dashboard');
    } else {
      toast({
        title: "Please upload a photo",
        description: "A profile photo is required to complete setup",
        variant: "destructive"
      });
    }
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

            {/* Upload content */}
            <div className="flex-1 px-6 flex flex-col items-center justify-center">
              <div className="text-center mb-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Upload your photo</h2>
              </div>

              {/* Upload area */}
              <div className="w-full max-w-sm mb-8">
                {selectedImage ? (
                  <div className="w-full h-64 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
                    <img 
                      src={selectedImage} 
                      alt="Selected profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div 
                    className="w-full h-64 bg-gray-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={handleUploadClick}
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">Tap to upload photo</p>
                  </div>
                )}
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Re-upload button */}
              {selectedImage && (
                <Button 
                  variant="outline"
                  onClick={handleReUpload}
                  className="w-full max-w-sm h-14 text-base rounded-xl border-gray-300 hover:bg-gray-50 mb-6"
                >
                  Re Upload
                </Button>
              )}
            </div>

            {/* Continue button */}
            <div className="px-6 pb-8 mt-8">
              <Button 
                onClick={handleContinue}
                className="w-full h-14 text-lg rounded-xl bg-slate-800 hover:bg-slate-700 text-white"
              >
                Continue
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadForm;
