import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const TrainixLogo: React.FC<IconProps> = ({ size = 44, className = '', ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect width="200" height="200" rx="40" fill="url(#paint0_linear_logo)" />
      <path d="M60 120L95 80L125 100L150 60" stroke="white" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 150H150" stroke="white" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="150" cy="60" r="14" fill="white" />
      <defs>
        <linearGradient id="paint0_linear_logo" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const DumbbellLogo: React.FC<IconProps> = ({ size = 44, className = '', ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect width="200" height="200" rx="40" fill="#1f2937" />
      <rect x="50" y="80" width="20" height="40" rx="6" fill="#10b981" />
      <rect x="130" y="80" width="20" height="40" rx="6" fill="#10b981" />
      <rect x="70" y="90" width="60" height="20" fill="#6b7280" />
      <rect x="30" y="70" width="20" height="60" rx="6" fill="#10b981" />
      <rect x="150" y="70" width="20" height="60" rx="6" fill="#10b981" />
    </svg>
  );
};
