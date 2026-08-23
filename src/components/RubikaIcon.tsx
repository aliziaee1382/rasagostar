import React from 'react';

interface RubikaIconProps {
  className?: string;
  size?: number | string;
}

export const RubikaIcon: React.FC<RubikaIconProps> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Soft rounded mask for the outer hexagon */}
        <clipPath id="rubika-hex-clip">
          <path 
            d="M50 4.5 C53.5 4.5 56.5 6.2 58.2 9.2 L89.5 27.3 C92.9 29.3 95 32.9 95 36.8 L95 63.2 C95 67.1 92.9 70.7 89.5 72.7 L58.2 90.8 C56.5 93.8 53.5 95.5 50 95.5 C46.5 95.5 43.5 93.8 41.8 90.8 L10.5 72.7 C7.1 70.7 5 67.1 5 63.2 L5 36.8 C5 32.9 7.1 29.3 10.5 27.3 L41.8 9.2 C43.5 6.2 46.5 4.5 50 4.5 Z" 
          />
        </clipPath>
      </defs>

      <g clipPath="url(#rubika-hex-clip)">
        {/* 12 Outer Facets surrounding the cube */}
        {/* Top-Right (Lime / Green / Cyan / Purple) */}
        <polygon points="50,5 69.5,16.2 50,27.5" fill="#7CB342" />
        <polygon points="69.5,16.2 89,27.5 69.5,38.7" fill="#00ACC1" />
        <polygon points="69.5,16.2 69.5,38.7 50,27.5" fill="#26C6DA" />
        
        {/* Right (Purple / Indigo / Red-Pink) */}
        <polygon points="89,27.5 95,50 69.5,38.7" fill="#5E35B1" />
        <polygon points="95,50 89,72.5 69.5,61.3" fill="#673AB7" />
        <polygon points="95,50 69.5,61.3 69.5,38.7" fill="#4A148C" />
        
        {/* Bottom-Right (Red / Orange / Amber) */}
        <polygon points="89,72.5 69.5,83.8 69.5,61.3" fill="#E53935" />
        <polygon points="69.5,83.8 50,95 50,72.5" fill="#F57C00" />
        <polygon points="69.5,83.8 50,72.5 69.5,61.3" fill="#FB8C00" />

        {/* Bottom-Left (Lime / Teal / Blue) */}
        <polygon points="50,95 30.5,83.8 50,72.5" fill="#8BC34A" />
        <polygon points="30.5,83.8 11,72.5 30.5,61.3" fill="#7CB342" />
        <polygon points="30.5,83.8 30.5,61.3 50,72.5" fill="#00BCD4" />

        {/* Left (Blue / Indigo / Dark Purple) */}
        <polygon points="11,72.5 5,50 30.5,61.3" fill="#0288D1" />
        <polygon points="5,50 11,27.5 30.5,38.7" fill="#3949AB" />
        <polygon points="5,50 30.5,38.7 30.5,61.3" fill="#4527A0" />

        {/* Top-Left (Red / Orange / Gold / Lime) */}
        <polygon points="11,27.5 30.5,16.2 30.5,38.7" fill="#E53935" />
        <polygon points="30.5,16.2 50,5 50,27.5" fill="#8BC34A" />
        <polygon points="30.5,16.2 50,27.5 30.5,38.7" fill="#FFA000" />
        <polygon points="11,27.5 30.5,16.2 30.5,38.7" fill="#F4511E" />
        
        {/* Extra facet refinement for true Rubika pattern */}
        <polygon points="30.5,16.2 50,5 30.5,38.7" fill="#FB8C00" />
        <polygon points="30.5,38.7 50,5 50,27.5" fill="#FFA000" />

        {/* 3D Isometric White Cube in Center */}
        {/* Top face */}
        <polygon points="50,27.5 69.5,38.7 50,50 30.5,38.7" fill="#FFFFFF" />
        {/* Left face */}
        <polygon points="30.5,38.7 50,50 50,72.5 30.5,61.3" fill="#E8ECEF" />
        {/* Right face */}
        <polygon points="50,50 69.5,38.7 69.5,61.3 50,72.5" fill="#CFD8DC" />
      </g>
    </svg>
  );
};
