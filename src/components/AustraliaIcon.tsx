import React from 'react';

interface AustraliaIconProps {
  className?: string;
}

const AustraliaIcon: React.FC<AustraliaIconProps> = ({ className = "w-8 h-8" }) => {
  return (
    <div className={`relative ${className}`}>
      <img 
        src="/lovable-uploads/dc42dd18-7be3-4aca-8b86-359bd8f7af03.png" 
        alt="Regional Mate Logo - Australia with location pin" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default AustraliaIcon;