import React from 'react';

export default function NotFoundIllustration({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" 
      className={className} 
      viewBox="0 0 600 350" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Frame/Lab */}
      <rect x="50" y="50" width="500" height="250" fill="#FFFdf8" rx="10" />
      <g stroke="#1A1A2E" strokeWidth="1" strokeLinecap="round" opacity="0.1">
        <path d="M70 50 L70 300 M120 50 L120 300 M170 50 L170 300 M220 50 L220 300 M270 50 L270 300 M320 50 L320 300 M370 50 L370 300 M420 50 L420 300 M470 50 L470 300 M520 50 L520 300" />
      </g>
      
      {/* Floor line */}
      <line x1="10" y1="280" x2="590" y2="280" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
      <line x1="30" y1="290" x2="570" y2="290" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity="0.3" />

      {/* Empty Shelves (Left) */}
      <g transform="translate(80, 80)">
        <rect x="0" y="0" width="100" height="180" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="4" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="#1A1A2E" strokeWidth="4" />
        <line x1="0" y1="110" x2="100" y2="110" stroke="#1A1A2E" strokeWidth="4" />
        {/* Cobweb on shelf */}
        <path d="M 0 50 L 30 50 L 0 80 ZM 10 50 L 0 60 M 20 50 L 0 70" fill="none" stroke="#1A1A2E" strokeWidth="1" opacity="0.3" />
        <circle cx="20" cy="70" r="1.5" fill="#1A1A2E" opacity="0.5" />
      </g>

      {/* Empty Beaker Table (Right) */}
      <g transform="translate(400, 180)">
        <rect x="0" y="20" width="100" height="80" fill="#E8B84B" stroke="#1A1A2E" strokeWidth="4" />
        <rect x="-10" y="10" width="120" height="10" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="4" />
        <path d="M 20 100 L 20 20" stroke="#1A1A2E" strokeWidth="2" opacity="0.5" />
        {/* Empty Flask */}
        <path d="M 40 -20 L 60 -20 L 55 0 L 75 10 L 25 10 L 45 0 Z" fill="#FFFdf8" fillOpacity="0.8" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round" />
        {/* Small cobweb */}
        <path d="M 75 10 Q 85 -5 60 -20" fill="none" stroke="#1A1A2E" strokeWidth="1" strokeDasharray="2 2" />
      </g>

      {/* Character (Center) - Confused Scientist */}
      <g transform="translate(260, 100)">
        {/* Legs */}
        <path d="M25 100 L25 180 M55 100 L55 180" fill="none" stroke="#1A3B4D" strokeWidth="16" strokeLinecap="round" />
        <ellipse cx="20" cy="180" rx="15" ry="8" fill="#1A1A2E" />
        <ellipse cx="60" cy="180" rx="15" ry="8" fill="#1A1A2E" />

        {/* Torso */}
        <rect x="20" y="40" width="40" height="80" rx="10" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="4" />
        {/* Lab coat details */}
        <line x1="40" y1="40" x2="40" y2="120" stroke="#1A1A2E" strokeWidth="2" />
        <rect x="25" y="90" width="12" height="15" fill="none" stroke="#1A1A2E" strokeWidth="2" />
        <rect x="43" y="90" width="12" height="15" fill="none" stroke="#1A1A2E" strokeWidth="2" />

        {/* Head */}
        <circle cx="40" cy="20" r="25" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="4" />
        {/* Hair - messy/confused tufts */}
        <path d="M 15 20 C 5 0, 30 -20, 40 -10 C 50 -20, 75 0, 65 20" fill="none" stroke="#E26D5C" strokeWidth="6" strokeLinecap="round" />
        <path d="M 30 -5 L 35 -15 M 50 -5 L 45 -15" stroke="#E26D5C" strokeWidth="4" strokeLinecap="round" />
        
        {/* Glasses (slightly askew) */}
        <circle cx="30" cy="20" r="8" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="3" />
        <circle cx="55" cy="15" r="8" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="3" />
        <line x1="38" y1="20" x2="47" y2="15" stroke="#1A1A2E" strokeWidth="3" />
        
        {/* Eyes wide */}
        <circle cx="30" cy="20" r="2" fill="#1A1A2E" />
        <circle cx="55" cy="15" r="2" fill="#1A1A2E" />
        
        {/* Mouth "oops" */}
        <circle cx="42" cy="32" r="4" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="2" />

        {/* Left Arm scratching head */}
        <path d="M 20 50 Q -10 30 15 0" fill="none" stroke="#FFFdf8" strokeWidth="12" strokeLinecap="round" />
        <path d="M 20 50 Q -10 30 15 0" fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
        <circle cx="15" cy="0" r="6" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="2" />

        {/* Right Arm holding paper */}
        <path d="M 60 50 Q 100 70 80 110" fill="none" stroke="#FFFdf8" strokeWidth="12" strokeLinecap="round" />
        <path d="M 60 50 Q 100 70 80 110" fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
        <circle cx="80" cy="110" r="6" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="2" />
      </g>

      {/* The 404 Paper being held */}
      <g transform="translate(320, 200) rotate(15)">
        <rect x="0" y="0" width="50" height="60" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="3" />
        <text x="25" y="40" fontSize="24" fontFamily="monospace" fontWeight="bold" fill="#E26D5C" textAnchor="middle">404</text>
        <line x1="10" y1="10" x2="40" y2="10" stroke="#1A1A2E" strokeWidth="2" opacity="0.5" />
      </g>

      {/* Big Question Mark */}
      <g transform="translate(330, 40) rotate(15)">
        <path d="M 0 30 C -20 -10, 40 -20, 30 20 C 25 35, 15 45, 15 60" fill="none" stroke="#E8B84B" strokeWidth="8" strokeLinecap="round" />
        <circle cx="15" cy="80" r="4" fill="#E8B84B" />
      </g>
      
      {/* Exclamation Mark left */}
      <g transform="translate(230, 50) rotate(-15)">
        <line x1="0" y1="0" x2="0" y2="30" stroke="#8FAF72" strokeWidth="6" strokeLinecap="round" />
        <circle cx="0" cy="45" r="3" fill="#8FAF72" />
      </g>

    </svg>
  );
}
