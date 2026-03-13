import React from 'react';

export default function WorkbenchKeysIllustration({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" 
      className={className} 
      viewBox="0 0 800 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background shape */}
      <rect x="40" y="20" width="720" height="160" rx="20" fill="#FFFdf8" />
      
      {/* Wooden Pegboard Background */}
      <rect x="100" y="40" width="300" height="120" rx="10" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round" />
      {/* Pegboard dots */}
      <g fill="#1A1A2E" opacity="0.2">
        {Array.from({ length: 9 }).map((_, r) => 
          Array.from({ length: 25 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={115 + c * 11.2} cy={50 + r * 12} r="1.5" />
          ))
        )}
      </g>

      {/* Hanging Keys and Hooks */}
      {/* Hook 1: READ */}
      <path d="M140 70 Q150 70 150 60 Q150 50 140 50" fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" />
      <circle cx="140" cy="50" r="3" fill="#1A1A2E" />
      <g transform="translate(130, 80)">
        {/* Label Tag */}
        <path d="M-5 -25 L25 -25 L25 -10 L-5 -10 Z" fill="#8FAF72" stroke="#1A1A2E" strokeWidth="2" />
        <text x="10" y="-15" fill="#1A1A2E" fontSize="9" fontFamily="Caveat, cursive" textAnchor="middle" dominantBaseline="middle">READ</text>
        <line x1="10" y1="-10" x2="10" y2="0" stroke="#1A1A2E" strokeWidth="2" />
        {/* Key Body */}
        <circle cx="10" cy="5" r="8" fill="#E8B84B" stroke="#1A1A2E" strokeWidth="3" />
        <circle cx="10" cy="5" r="3" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="2" />
        <line x1="10" y1="13" x2="10" y2="35" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" />
        <path d="M10 25 L16 25 M10 32 L18 32 L18 28" fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      </g>

      {/* Hook 2: WRITE */}
      <path d="M220 70 Q230 70 230 60 Q230 50 220 50" fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" />
      <circle cx="220" cy="50" r="3" fill="#1A1A2E" />
      <g transform="translate(210, 80)">
        {/* Label Tag */}
        <path d="M-5 -25 L25 -25 L25 -10 L-5 -10 Z" fill="#E8B84B" stroke="#1A1A2E" strokeWidth="2" />
        <text x="10" y="-15" fill="#1A1A2E" fontSize="9" fontFamily="Caveat, cursive" textAnchor="middle" dominantBaseline="middle">WRITE</text>
        <line x1="10" y1="-10" x2="10" y2="0" stroke="#1A1A2E" strokeWidth="2" />
        {/* Key Body */}
        <path d="M2 0 L18 0 L18 10 L2 10 Z" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="10" cy="5" r="3" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="2" />
        <line x1="10" y1="10" x2="10" y2="35" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" />
        <path d="M10 25 L18 25 M10 30 L15 30" fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      </g>

      {/* Hook 3: ADMIN (Being Picked Up) */}
      <path d="M300 70 Q310 70 310 60 Q310 50 300 50" fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" />
      <circle cx="300" cy="50" r="3" fill="#1A1A2E" />
      <g transform="translate(305, 75) rotate(-15)">
        {/* Label Tag */}
        <path d="M-5 -25 L25 -25 L25 -10 L-5 -10 Z" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="2" />
        <text x="10" y="-15" fill="#FFF" fontSize="9" fontFamily="Caveat, cursive" textAnchor="middle" dominantBaseline="middle">ADMIN</text>
        <line x1="10" y1="-10" x2="10" y2="0" stroke="#1A1A2E" strokeWidth="2" />
        {/* Key Body */}
        <path d="M5 0 L15 0 L20 5 L10 12 L0 5 Z" fill="#1A1A2E" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="10" cy="5" r="2" fill="#FFFdf8" />
        <line x1="10" y1="12" x2="10" y2="35" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" />
        <path d="M10 25 L16 25 L16 29 L10 29" fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      </g>

      {/* Hand Reaching for Admin Key */}
      <g transform="translate(350, 110)">
        <path d="M150 10 Q120 15 90 20 Q70 25 50 15 Q40 10 30 15 Q20 20 25 35 Q30 40 45 35 Q60 40 70 45 L150 50" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {/* Fingers wrapping */}
        <path d="M35 15 Q20 5 15 15 Q10 25 25 35" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {/* Sleeve */}
        <path d="M150 0 L130 0 L120 60 L150 60" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round" />
        <line x1="130" y1="0" x2="120" y2="60" stroke="#1A1A2E" strokeWidth="3" />
      </g>

      {/* Workbench Tools / Clutter */}
      <g transform="translate(480, 100)">
        {/* Screwdriver */}
        <path d="M40 50 L75 50" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
        <path d="M75 45 L95 45 L95 55 L75 55 Z" fill="#E8B84B" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round" />
        <line x1="85" y1="45" x2="85" y2="55" stroke="#1A1A2E" strokeWidth="2" />
        {/* Wrench */}
        <path d="M120 60 L160 35" stroke="#1A1A2E" strokeWidth="6" strokeLinecap="round" />
        <path d="M115 65 A 10 10 0 1 1 125 55 L120 60 Z" fill="#8FAF72" stroke="#1A1A2E" strokeWidth="3" />
        <path d="M165 30 A 10 10 0 0 0 155 40 L160 35 Z" fill="#8FAF72" stroke="#1A1A2E" strokeWidth="3" />
        {/* Small gear */}
        <circle cx="130" cy="20" r="12" fill="none" stroke="#E26D5C" strokeWidth="4" strokeDasharray="6 4" />
        <circle cx="130" cy="20" r="6" fill="none" stroke="#1A1A2E" strokeWidth="3" />
      </g>

      {/* Decorative elements */}
      <path d="M50 80 Q60 70 70 80 T90 80" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <path d="M700 130 Q710 120 720 130 T740 130" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <circle cx="650" cy="60" r="4" fill="#E8B84B" />
      <circle cx="670" cy="140" r="3" fill="#8FAF72" />
      <circle cx="60" cy="130" r="5" fill="#E26D5C" />
    </svg>
  );
}
