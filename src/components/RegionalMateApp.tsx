import React from 'react';
import { Button } from '@/components/ui/button';
import AustraliaIcon from './AustraliaIcon';
import farmingTeam from '@/assets/farming-team.jpg';
import ruralMachinery from '@/assets/rural-machinery.jpg';
import beachCelebration from '@/assets/beach-celebration.jpg';
import businessMeeting from '@/assets/business-meeting.jpg';
import constructionWorkers from '@/assets/construction-workers.jpg';
import vineyardLandscape from '@/assets/vineyard-landscape.jpg';

const RegionalMateApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main container for iPhone 16 Pro Max */}
      <div className="max-w-sm mx-auto w-full flex-1 flex flex-col">
        
        {/* Photo collage section */}
        <div className="pt-16 pb-8 px-6">
          <div className="grid grid-cols-3 gap-3 h-80">
            {/* Left column */}
            <div className="flex flex-col gap-3">
              <div className="flex-1 rounded-xl overflow-hidden">
                <img 
                  src={farmingTeam} 
                  alt="Farming team working together" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 rounded-xl overflow-hidden">
                <img 
                  src={businessMeeting} 
                  alt="Business meeting" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Middle column */}
            <div className="flex flex-col gap-3">
              <div className="h-24 rounded-xl overflow-hidden">
                <img 
                  src={ruralMachinery} 
                  alt="Rural machinery" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-24 rounded-xl overflow-hidden">
                <img 
                  src={constructionWorkers} 
                  alt="Construction workers" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 rounded-xl overflow-hidden bg-gradient-to-b from-blue-200 to-blue-400">
                {/* Ocean/sky gradient background */}
              </div>
            </div>
            
            {/* Right column */}
            <div className="flex flex-col gap-3">
              <div className="h-48 rounded-xl overflow-hidden">
                <img 
                  src={beachCelebration} 
                  alt="Beach celebration" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 rounded-xl overflow-hidden">
                <img 
                  src={vineyardLandscape} 
                  alt="Vineyard landscape" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Australia icon */}
        <div className="px-6 pb-6">
          <div className="flex justify-center">
            <AustraliaIcon className="w-16 h-12" />
          </div>
        </div>

        {/* Title and tagline */}
        <div className="px-6 pb-8 text-center">
          <h1 className="text-4xl font-bold text-brand-text mb-2">
            Regional Mate
          </h1>
          <p className="text-lg text-brand-secondary-text">
            Connecting People. Creating Opportunities.
          </p>
        </div>

        {/* CTA Button */}
        <div className="px-6 pb-6">
          <Button 
            variant="brand" 
            size="lg" 
            className="w-full h-14 text-lg rounded-xl"
          >
            ✨ Get started
          </Button>
        </div>

        {/* Sign in link */}
        <div className="px-6 pb-8 text-center">
          <p className="text-brand-secondary-text">
            Already joined? <span className="text-brand-text font-medium">Sign in</span>
          </p>
        </div>

        {/* Legal text */}
        <div className="px-6 pb-8 text-center text-sm text-brand-secondary-text">
          <p>
            By tapping Get started, you agree with our{' '}
            <span className="text-brand-text">Terms</span>.{' '}
            See how we process data in our{' '}
            <span className="text-brand-text">Privacy Policy</span>.
          </p>
        </div>

        {/* Bottom indicator */}
        <div className="px-6 pb-6 flex justify-center">
          <div className="w-32 h-1 bg-brand-text rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default RegionalMateApp;