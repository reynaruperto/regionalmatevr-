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
    tagline: '',
    workExperience: '',
    skillsInterests: '',
    futurePlans: '',
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
    navigate('/whv/work-experience');
  };

  const handleSkip = () => {
    navigate('/whv/work-experience');
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
                onClick={() => navigate('/whv/current-address')}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h1 className="text-lg font-medium text-gray-900">About You</h1>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <span className="text-sm font-medium text-gray-600">4/6</span>
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
                <Label htmlFor="tagline" className="text-base font-medium text-gray-700">
                  Profile Tagline
                </Label>
                <Input
                  id="tagline"
                  name="tagline"
                  type="text"
                  value={formData.tagline}
                  onChange={handleInputChange}
                  className="h-12 bg-gray-100 border-0 text-gray-900"
                  placeholder="Hardworking farm enthusiast ready for adventure"
                  maxLength={60}
                />
                <p className="text-xs text-gray-500">This will appear under your profile photo (max 60 characters)</p>
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
                  maxLength={500}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="futurePlans" className="text-base font-medium text-gray-700">
                  What are your future plans in terms of work?
                </Label>
                <Textarea
                  id="futurePlans"
                  name="futurePlans"
                  value={formData.futurePlans}
                  onChange={handleInputChange}
                  className="min-h-24 bg-gray-100 border-0 text-gray-900 resize-none"
                  placeholder="I plan to gain experience in agricultural work, then potentially move into farm management or start my own business..."
                  maxLength={500}
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
                  maxLength={100}
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