import React from 'react';

interface AustraliaIconProps {
  className?: string;
}

const AustraliaIcon: React.FC<AustraliaIconProps> = ({ className = "w-8 h-8" }) => {
  return (
    <div className={`relative ${className}`}>
      <img 
        src="/lovable-uploads/8389e708-fc56-490f-a882-9c8c88e62de8.png" 
        alt="Regional Mate Logo - Australia with location pin" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default AustraliaIcon;