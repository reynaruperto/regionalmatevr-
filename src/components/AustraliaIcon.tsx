import React from 'react';

interface AustraliaIconProps {
  className?: string;
}

const AustraliaIcon: React.FC<AustraliaIconProps> = ({ className = "w-8 h-8" }) => {
  return (
    <div className={`relative ${className}`}>
      <svg 
        viewBox="0 0 100 80" 
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Australia outline */}
        <path
          d="M85 25c-2-3-5-2-8-1-3 1-6 3-9 2-2-1-3-3-6-3-4 0-7 2-11 1-3-1-5-3-8-2-4 1-6 5-10 6-3 1-6 0-8 2-2 2-2 5-4 7-1 2-3 3-3 6 0 2 1 4 0 6-1 3-4 5-4 8 0 2 1 4 0 6-1 2-3 3-3 5 0 3 2 5 2 8 0 2-1 4 1 5 2 2 5 1 7 3 2 2 2 5 5 6 2 1 5 0 7 1 3 1 4 4 7 4 2 0 4-2 6-1 3 1 4 4 7 4 2 0 4-2 6-1 2 1 3 3 5 3 3 0 5-3 8-3 2 0 4 2 6 1 2-1 3-4 6-4 2 0 4 2 6 1 3-1 4-5 7-5 2 0 4 2 5 0 2-2 1-5 3-7 1-1 3-1 4-3 1-2 0-5 2-6 1-1 3 0 4-2 1-2-1-4 0-6 1-1 3-1 3-3 0-2-2-3-1-5 1-1 3 0 3-2 0-3-3-5-2-8 1-2 4-2 4-5z"
          fill="#E8E8E8"
          stroke="#D0D0D0"
          strokeWidth="1"
        />
        
        {/* Location pin */}
        <circle cx="45" cy="35" r="6" fill="#EA580C" />
        <circle cx="45" cy="33" r="2.5" fill="white" />
      </svg>
    </div>
  );
};

export default AustraliaIcon;