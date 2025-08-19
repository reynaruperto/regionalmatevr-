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
          
          {/* Main content container with background image */}
          <div className="w-full h-full flex flex-col relative">
            
            {/* Background image covering top portion */}
            <div className="absolute inset-0 top-0">
              <img 
                src="/lovable-uploads/cc51fbe9-5230-4422-9bc5-e23485b9bdd2.png" 
                alt="Regional Mate collage of people working and celebrating" 
                className="w-full h-full object-cover"
              />
              {/* Strong gradient overlay - very thick toward bottom for text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/50 to-white/95 pointer-events-none" />
            </div>

            {/* Content positioned over background */}
            <div className="relative z-10 flex flex-col h-full justify-end">
              {/* Australia icon */}
              <div className="px-6 pb-6">
                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-3xl shadow-lg">
                    <AustraliaIcon className="w-16 h-12" />
                  </div>
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
    </div>
  );
};

export default RegionalMateApp;