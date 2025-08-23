import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';

const WHVWorkExperience: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    willingToRelocate: '',
    availableStartDate: '',
    preferredIndustry: '',
    jobReferences: '',
    licenses: '',
    workExperiences: [
      {
        startDate: '',
        endDate: '',
        position: '',
        company: '',
        location: ''
      }
    ]
  });

  // Industry options
  const industries = [
    'Agriculture & Farming',
    'Construction',
    'Hospitality & Tourism',
    'Healthcare',
    'Retail',
    'Manufacturing',
    'Mining',
    'Education',
    'Transport & Logistics',
    'Other'
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

  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperiences: [
        ...formData.workExperiences,
        {
          startDate: '',
          endDate: '',
          position: '',
          company: '',
          location: ''
        }
      ]
    });
  };

  const removeWorkExperience = (index: number) => {
    setFormData({
      ...formData,
      workExperiences: formData.workExperiences.filter((_, i) => i !== index)
    });
  };

  const handleWorkExperienceChange = (index: number, field: string, value: string) => {
    const updated = formData.workExperiences.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    setFormData({
      ...formData,
      workExperiences: updated
    });
  };

  const handleRadioChange = (value: string) => {
    setFormData({
      ...formData,
      willingToRelocate: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Work Experience:', formData);
    // Navigate to next step
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
              <h1 className="text-lg font-medium text-gray-900">Account Set Up</h1>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <span className="text-sm font-medium text-gray-600">4/5</span>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Willing to Relocate */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">
                  Willing to Relocate?
                </Label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleRadioChange('yes')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                      formData.willingToRelocate === 'yes' 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      formData.willingToRelocate === 'yes' 
                        ? 'border-orange-500 bg-orange-500' 
                        : 'border-gray-300'
                    }`}>
                      {formData.willingToRelocate === 'yes' && (
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                      )}
                    </div>
                    <span className="text-gray-700">Yes</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleRadioChange('no')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                      formData.willingToRelocate === 'no' 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      formData.willingToRelocate === 'no' 
                        ? 'border-orange-500 bg-orange-500' 
                        : 'border-gray-300'
                    }`}>
                      {formData.willingToRelocate === 'no' && (
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                      )}
                    </div>
                    <span className="text-gray-700">No</span>
                  </button>
                </div>
              </div>

              {/* Available Start Date */}
              <div className="space-y-2">
                <Label htmlFor="availableStartDate" className="text-base font-medium text-gray-700">
                  Available Start Date (DD/MM/YYYY)
                </Label>
                <Input
                  id="availableStartDate"
                  name="availableStartDate"
                  type="text"
                  required
                  value={formData.availableStartDate}
                  onChange={handleInputChange}
                  className="h-12 bg-gray-100 border-0 text-gray-900"
                  placeholder="09/09/2025"
                />
              </div>

              {/* Preferred Industry */}
              <div className="space-y-2">
                <Label htmlFor="preferredIndustry" className="text-base font-medium text-gray-700">
                  Preferred Industry
                </Label>
                <Select onValueChange={(value) => handleSelectChange('preferredIndustry', value)}>
                  <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-900">
                    <SelectValue placeholder="Agriculture & Farming" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-50">
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry} className="hover:bg-gray-100">
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Job References */}
              <div className="space-y-2">
                <Label htmlFor="jobReferences" className="text-base font-medium text-gray-700">
                  Job References
                </Label>
                <Textarea
                  id="jobReferences"
                  name="jobReferences"
                  value={formData.jobReferences}
                  onChange={handleInputChange}
                  className="min-h-[80px] bg-gray-100 border-0 text-gray-900 resize-none"
                  placeholder="Elaine Smith - Head of HR&#10;elaineHR@workmail.com&#10;+61499888000"
                />
              </div>

              {/* Licenses */}
              <div className="space-y-2">
                <Label htmlFor="licenses" className="text-base font-medium text-gray-700">
                  Licenses
                </Label>
                <Textarea
                  id="licenses"
                  name="licenses"
                  value={formData.licenses}
                  onChange={handleInputChange}
                  className="min-h-[60px] bg-gray-100 border-0 text-gray-900 resize-none"
                  placeholder="N/A"
                />
              </div>

              {/* Work Experiences */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium text-gray-700">
                    Work Experiences
                  </Label>
                  <Button
                    type="button"
                    onClick={addWorkExperience}
                    variant="outline"
                    size="sm"
                    className="text-orange-600 border-orange-600 hover:bg-orange-50"
                  >
                    + Add Experience
                  </Button>
                </div>
                
                {formData.workExperiences.map((experience, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Experience {index + 1}</span>
                      {formData.workExperiences.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeWorkExperience(index)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Start Date</Label>
                        <Input
                          type="text"
                          value={experience.startDate}
                          onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                          className="h-10 bg-white border border-gray-300"
                          placeholder="MM/YYYY"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">End Date</Label>
                        <Input
                          type="text"
                          value={experience.endDate}
                          onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                          className="h-10 bg-white border border-gray-300"
                          placeholder="MM/YYYY or Present"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Position</Label>
                      <Input
                        type="text"
                        value={experience.position}
                        onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                        className="h-10 bg-white border border-gray-300"
                        placeholder="Job title"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Company</Label>
                      <Input
                        type="text"
                        value={experience.company}
                        onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                        className="h-10 bg-white border border-gray-300"
                        placeholder="Company name"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Location</Label>
                      <Input
                        type="text"
                        value={experience.location}
                        onChange={(e) => handleWorkExperienceChange(index, 'location', e.target.value)}
                        className="h-10 bg-white border border-gray-300"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <Button 
                  type="submit"
                  className="w-full h-14 text-lg rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium"
                >
                  Continue →
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WHVWorkExperience;