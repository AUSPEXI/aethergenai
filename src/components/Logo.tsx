import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => {
  return (
    <div className={`${className} relative`}>
      {/* Eye of Horus - The Missing Fraction */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main eye shape */}
        <ellipse
          cx="50"
          cy="50"
          rx="45"
          ry="30"
          className="fill-blue-600"
          stroke="currentColor"
          strokeWidth="2"
        />
        
        {/* Inner eye detail */}
        <ellipse
          cx="50"
          cy="50"
          rx="25"
          ry="18"
          className="fill-blue-400"
          stroke="currentColor"
          strokeWidth="1"
        />
        
        {/* Pupil */}
        <circle
          cx="50"
          cy="50"
          r="12"
          className="fill-blue-900"
        />
        
        {/* Highlight */}
        <circle
          cx="45"
          cy="45"
          r="4"
          className="fill-white"
          opacity="0.8"
        />
        
        {/* Mathematical fractions - representing the missing 1/64th */}
        <text
          x="50"
          y="85"
          textAnchor="middle"
          className="text-xs font-mono fill-current"
          opacity="0.7"
        >
          63/64
        </text>
        
        {/* The missing fraction indicator */}
        <circle
          cx="85"
          cy="15"
          r="3"
          className="fill-yellow-400"
          opacity="0.6"
        />
        <text
          x="85"
          y="20"
          textAnchor="middle"
          className="text-xs font-mono fill-current"
          opacity="0.8"
        >
          1/64
        </text>
      </svg>
    </div>
  );
};

export default Logo;
