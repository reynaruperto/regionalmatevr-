import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const WHVProfilePreview: React.FC = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: 'Peter Parker',
    profilePhoto: '/lovable-uploads/5171768d-7ee5-4242-8d48-29d87d896302.png',
    tagline: 'Backpacker from Argentina with experience in farm work, currently in Brisbane, QLD',
    nationality: 'Argentina',
    location: 'Brisbane, QLD 4000',
    relocation: 'Yes',
    visaType: '417 (Working Holiday)',
    visaExpiry: 'Sep 2026',
    industry: 'Agriculture and Farming',
    licenses: 'Driver\'s License, First Aid',
    availability: 'Sep 2025 (8 months)'
  });

  const [workExperiences, setWorkExperiences] = useState([
    { period: '2020-2025', position: 'Farm Attendant', company: 'VillaFarm' },
    { period: '2019-2020', position: 'Marketing Head', company: 'Workspace' },
    { period: '2007-2019', position: 'Winery Assistant', company: 'BodegaWinery' }
  ]);

  useEffect(() => {
    const storedTagline = localStorage.getItem('profileTagline');
    if (storedTagline) {
      setProfileData(prev => ({ ...prev, tagline: storedTagline }));
    }
    
    const storedPhoto = localStorage.getItem('userProfilePhoto');
    if (storedPhoto) {
      setProfileData(prev => ({ ...prev, profilePhoto: storedPhoto }));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          {/* Main content container */}
          <div className="w-full h-full flex flex-col relative bg-gray-200">
            
            {/* Scrollable Content */}
            <div className="flex-1 px-6 pt-16 pb-24 overflow-y-auto">
              
              {/* Profile Card */}
              <div className="w-full max-w-sm mx-auto bg-white rounded-3xl p-6 shadow-lg">
                
                {/* Name Header */}
                <div className="bg-orange-500 text-white text-center py-4 rounded-2xl mb-6">
                  <h2 className="text-xl font-bold">{profileData.name.split(' ')[0].toUpperCase()}</h2>
                </div>

                {/* Profile Picture */}
                <div className="flex justify-center mb-6">
                  <div className="w-32 h-32 rounded-full border-4 border-orange-500 overflow-hidden">
                    <img 
                      src={profileData.profilePhoto}
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="text-center mb-6">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {profileData.tagline}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm mb-6">
                  <div><span className="font-semibold">Nationality:</span> {profileData.nationality}</div>
                  <div><span className="font-semibold">Location (Current / Preferred):</span> {profileData.location}</div>
                  <div><span className="font-semibold">Willing to Relocate:</span> {profileData.relocation}</div>
                  <div><span className="font-semibold">Visa Type & Expiry:</span> {profileData.visaType} - Expires {profileData.visaExpiry}</div>
                  <div><span className="font-semibold">Industry:</span> {profileData.industry}</div>
                  <div>
                    <span className="font-semibold">Experience / Skills:</span>
                    <div className="mt-1 space-y-1 text-xs">
                      {workExperiences.map((exp, index) => (
                        <div key={index}>{exp.period}: {exp.position} - {exp.company}</div>
                      ))}
                    </div>
                  </div>
                  <div><span className="font-semibold">Licenses / Certificates:</span> {profileData.licenses}</div>
                  <div><span className="font-semibold">Availability (date, duration):</span> {profileData.availability}</div>
                </div>

                {/* Locked Message */}
                <div className="bg-gray-200 text-center py-3 rounded-xl mb-4">
                  <p className="text-gray-600 text-sm">Full Details Unlocked if you both Match</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-orange-400 to-slate-800 hover:from-orange-500 hover:to-slate-900 text-white px-8 py-3 rounded-2xl flex items-center gap-3 justify-center">
                    <span className="font-semibold">Heart to Match</span>
                    <div className="bg-orange-500 rounded-full p-2">
                      <Heart size={20} className="text-white fill-white" />
                    </div>
                  </Button>
                </div>
              </div>

            </div>

            {/* Back Button - Fixed at bottom */}
            <div className="absolute bottom-8 left-6">
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-12 h-12 bg-white rounded-xl shadow-sm"
                onClick={() => navigate('/whv/profile-edit')}
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WHVProfilePreview;
