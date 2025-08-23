import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WHVPhotoUpload: React.FC = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile && selectedImage) {
      // Store the uploaded photo in localStorage
      localStorage.setItem('whvProfilePhoto', selectedImage);
      console.log('WHV Photo uploaded:', selectedFile);
      navigate('/whv-account-confirmation');
    } else {
      toast({
        title: "Please upload a photo",
        description: "A profile photo is required to complete setup",
        variant: "destructive"
      });
    }
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
                onClick={() => navigate('/whv-about-you')}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h1 className="text-lg font-medium text-gray-900">Account Set Up</h1>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <span className="text-sm font-medium text-gray-600">6/6</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
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
                  className="w-full h-64 bg-gray-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300"
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
          <div className="px-4 pb-8">
            <Button 
              onClick={handleSubmit}
              className="w-full h-14 text-lg rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium"
            >
              Continue →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WHVPhotoUpload;