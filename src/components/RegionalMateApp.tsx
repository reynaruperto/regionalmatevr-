import React from 'react';
import { Button } from '@/components/ui/button';
import AustraliaIcon from './AustraliaIcon';
// Background images for the collage

const RegionalMateApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-background rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          {/* Main content container */}
          <div className="w-full h-full flex flex-col">
        
        {/* Photo collage section */}
        <div className="pt-16 pb-8 px-6">
          <div className="relative">
            <div className="grid grid-cols-3 gap-3 h-80">
            {/* Left column */}
            <div className="flex flex-col gap-3">
              <div className="flex-1 rounded-xl overflow-hidden">
                <img 
                  src="/lovable-uploads/cfde9671-9fd6-4ee0-9c19-a6faecaa5ca7.png" 
                  alt="Two people outdoors in rural setting" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 rounded-xl overflow-hidden">
                <img 
                  src="/lovable-uploads/fa7098d9-0178-4e47-a593-f40e1dd21a54.png" 
                  alt="Restaurant hospitality worker" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Middle column */}
            <div className="flex flex-col gap-3">
              <div className="h-24 rounded-xl overflow-hidden">
                <img 
                  src="/lovable-uploads/31ab3bd8-4685-4b36-b627-12afe6cdafd6.png" 
                  alt="Person picking fruit from trees" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-24 rounded-xl overflow-hidden">
                <img 
                  src="/lovable-uploads/ea247b49-500a-47aa-9cce-591ae45a83cb.png" 
                  alt="Construction workers in high-vis vests" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 rounded-xl overflow-hidden">
                <img 
                  src="/lovable-uploads/0a3cecbd-4cdc-448f-963d-67ccdc57e3dd.png" 
                  alt="Two men working together in agriculture" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Right column */}
            <div className="flex flex-col gap-3">
              <div className="h-48 rounded-xl overflow-hidden">
                <img 
                  src="/lovable-uploads/25c6fff3-e72a-47c8-a522-40d4640bd6d8.png" 
                  alt="Two people celebrating at beach sunset" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 rounded-xl overflow-hidden">
                <img 
                  src="/lovable-uploads/a5b657a2-5a0c-4116-bf17-7fbeb33b2f66.png" 
                  alt="Woman in rural farming setting" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            </div>
            
            {/* Gradient overlay - thicker toward bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/40 to-white/70 pointer-events-none" />
          </div>
        </div>

        {/* Australia icon */}
        <div className="absolute" style={{ left: '142.35px', top: '368px' }}>
          <div className="bg-white p-4 rounded-3xl shadow-lg">
            <AustraliaIcon className="w-[108px] h-[108px]" />
          </div>
        </div>

        {/* Title and tagline */}
        <div className="px-6 pb-8 text-center">
          <h1 className="text-4xl font-bold text-brand-text mb-2">
            Regional Mate
          </h1>
          <p className="text-lg text-brand-secondary-text whitespace-nowrap">
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
      </div>
    </div>
  );
};

export default RegionalMateApp;