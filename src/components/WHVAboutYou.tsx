import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const WHVAboutYou: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    workExperience: '',
    skillsInterests: '',
    whyAustralia: '',
    workPreferences: '',
    availabilityDuration: '',
    languages: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('WHV About You:', formData);
    navigate('/whv-photo-upload');
  };

  const handleSkip = () => {
    navigate('/whv-photo-upload');
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
                onClick={() => navigate('/whv-current-address')}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h1 className="text-lg font-medium text-gray-900">About You</h1>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <span className="text-sm font-medium text-gray-600">5/6</span>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {/* Section Title */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Tell us about yourself</h2>
              <p className="text-gray-600">This helps us match you with the right employers and opportunities.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 pb-20">
              <div className="space-y-2">
                <Label htmlFor="workExperience" className="text-base font-medium text-gray-700">
                  What work experience do you have?
                </Label>
                <Textarea
                  id="workExperience"
                  name="workExperience"
                  value={formData.workExperience}
                  onChange={handleInputChange}
                  className="min-h-24 bg-gray-100 border-0 text-gray-900 resize-none"
                  placeholder="I have experience in hospitality, worked as a barista for 2 years, and have some construction experience..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skillsInterests" className="text-base font-medium text-gray-700">
                  What are your main skills and interests?
                </Label>
                <Textarea
                  id="skillsInterests"
                  name="skillsInterests"
                  value={formData.skillsInterests}
                  onChange={handleInputChange}
                  className="min-h-24 bg-gray-100 border-0 text-gray-900 resize-none"
                  placeholder="I'm good with my hands, enjoy outdoor work, love learning new skills, and have strong communication abilities..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whyAustralia" className="text-base font-medium text-gray-700">
                  Why did you choose Australia for your working holiday?
                </Label>
                <Textarea
                  id="whyAustralia"
                  name="whyAustralia"
                  value={formData.whyAustralia}
                  onChange={handleInputChange}
                  className="min-h-24 bg-gray-100 border-0 text-gray-900 resize-none"
                  placeholder="I've always wanted to experience Australian culture, explore the outback, and gain work experience in agriculture..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workPreferences" className="text-base font-medium text-gray-700">
                  What type of work are you most interested in?
                </Label>
                <Input
                  id="workPreferences"
                  name="workPreferences"
                  type="text"
                  value={formData.workPreferences}
                  onChange={handleInputChange}
                  className="h-12 bg-gray-100 border-0 text-gray-900"
                  placeholder="Farm work, hospitality, construction, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availabilityDuration" className="text-base font-medium text-gray-700">
                  How long are you planning to stay in Australia?
                </Label>
                <Input
                  id="availabilityDuration"
                  name="availabilityDuration"
                  type="text"
                  value={formData.availabilityDuration}
                  onChange={handleInputChange}
                  className="h-12 bg-gray-100 border-0 text-gray-900"
                  placeholder="12 months, 2 years, flexible, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="languages" className="text-base font-medium text-gray-700">
                  What languages do you speak?
                </Label>
                <Input
                  id="languages"
                  name="languages"
                  type="text"
                  value={formData.languages}
                  onChange={handleInputChange}
                  className="h-12 bg-gray-100 border-0 text-gray-900"
                  placeholder="English (fluent), Spanish (native), French (basic)"
                />
              </div>

              <div className="pt-8 space-y-3">
                <Button 
                  type="submit"
                  className="w-full h-14 text-lg rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium"
                >
                  Continue →
                </Button>
                <Button 
                  type="button"
                  onClick={handleSkip}
                  variant="ghost"
                  className="w-full h-12 text-gray-600 hover:text-gray-800"
                >
                  Skip for now
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WHVAboutYou;