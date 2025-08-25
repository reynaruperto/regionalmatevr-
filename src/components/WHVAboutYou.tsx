import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const WHVAboutYou: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    workExperience: '',
    skillsInterests: '',
    futurePlans: '',
    workPreferences: '',
    availabilityDuration: '',
    languages: ''
  });

  // Dropdown options
  const skillsOptions = [
    'Physical Work', 'Customer Service', 'Communication', 'Leadership', 'Problem Solving',
    'Technical Skills', 'Machinery Operation', 'Animal Handling', 'Cooking/Food Service',
    'Cleaning', 'Sales', 'Languages', 'Computer Skills', 'Manual Labor'
  ];

  const languageOptions = [
    'English (Native)', 'English (Fluent)', 'English (Conversational)', 'English (Basic)',
    'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese', 'Korean',
    'Mandarin', 'Cantonese', 'Dutch', 'Swedish', 'Norwegian', 'Other'
  ];

  const durationOptions = [
    '3-6 months', '6-12 months', '12+ months', '2 years', 'Flexible', 'Until visa expires'
  ];

  const workTypeOptions = [
    'Farm Work', 'Hospitality', 'Construction', 'Cleaning', 'Retail', 'Tourism',
    'Fruit Picking', 'Animal Care', 'Kitchen Work', 'Manual Labor', 'Any Work', 'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('WHV About You:', formData);
    navigate('/whv/photo-upload');
  };

  const handleSkip = () => {
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
                onClick={() => navigate('/whv/current-address')}
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
                  What work experience do you have? (Max 500 characters)
                </Label>
                <Textarea
                  id="workExperience"
                  name="workExperience"
                  value={formData.workExperience}
                  onChange={handleInputChange}
                  className="min-h-24 bg-gray-100 border-0 text-gray-900 resize-none"
                  placeholder="I have experience in hospitality, worked as a barista for 2 years, and have some construction experience..."
                  maxLength={500}
                />
                <p className="text-sm text-gray-500">{formData.workExperience.length}/500 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skillsInterests" className="text-base font-medium text-gray-700">
                  What are your main skills and interests?
                </Label>
                <Select onValueChange={(value) => handleSelectChange('skillsInterests', value)}>
                  <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                    <SelectValue placeholder="Select your main skills" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-50">
                    {skillsOptions.map((skill) => (
                      <SelectItem key={skill} value={skill} className="hover:bg-gray-100">
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="futurePlans" className="text-base font-medium text-gray-700">
                  What are your future plans in terms of work? (Max 300 characters)
                </Label>
                <Textarea
                  id="futurePlans"
                  name="futurePlans"
                  value={formData.futurePlans}
                  onChange={handleInputChange}
                  className="min-h-24 bg-gray-100 border-0 text-gray-900 resize-none"
                  placeholder="I plan to gain agricultural experience, save money, and potentially extend my visa for a second year..."
                  maxLength={300}
                />
                <p className="text-sm text-gray-500">{formData.futurePlans.length}/300 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workPreferences" className="text-base font-medium text-gray-700">
                  What type of work are you most interested in?
                </Label>
                <Select onValueChange={(value) => handleSelectChange('workPreferences', value)}>
                  <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                    <SelectValue placeholder="Select work type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-50">
                    {workTypeOptions.map((workType) => (
                      <SelectItem key={workType} value={workType} className="hover:bg-gray-100">
                        {workType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availabilityDuration" className="text-base font-medium text-gray-700">
                  How long are you planning to stay in Australia?
                </Label>
                <Select onValueChange={(value) => handleSelectChange('availabilityDuration', value)}>
                  <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-50">
                    {durationOptions.map((duration) => (
                      <SelectItem key={duration} value={duration} className="hover:bg-gray-100">
                        {duration}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="languages" className="text-base font-medium text-gray-700">
                  What languages do you speak?
                </Label>
                <Select onValueChange={(value) => handleSelectChange('languages', value)}>
                  <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                    <SelectValue placeholder="Select your language proficiency" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-50">
                    {languageOptions.map((language) => (
                      <SelectItem key={language} value={language} className="hover:bg-gray-100">
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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