import React from 'react';

export default function EmptyKeyBoardIllustration({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" 
      className={className} 
      viewBox="0 0 400 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wall Texture / Grid */}
      <g stroke="#1A1A2E" strokeWidth="1" strokeLinecap="round" opacity="0.05">
        <path d="M50 0 L50 300 M100 0 L100 300 M150 0 L150 300 M200 0 L200 300 M250 0 L250 300 M300 0 L300 300 M350 0 L350 300" />
        <path d="M0 50 L400 50 M0 100 L400 100 M0 150 L400 150 M0 200 L400 200 M0 250 L400 250" />
      </g>

      {/* Board Base */}
      <g transform="translate(60, 60)">
        <rect x="0" y="0" width="280" height="150" fill="#E8B84B" stroke="#1A1A2E" strokeWidth="6" rx="8" strokeLinejoin="round" />
        {/* Wood grain lines */}
        <path d="M 20 20 Q 140 30 260 20 M 10 50 Q 140 40 270 50 M 30 80 Q 140 90 250 80 M 15 110 Q 140 100 265 110 M 25 130 Q 140 140 255 130" fill="none" stroke="#1A1A2E" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
        
        {/* Screws in corners */}
        <circle cx="15" cy="15" r="4" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="2" />
        <circle cx="265" cy="15" r="4" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="2" />
        <circle cx="15" cy="135" r="4" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="2" />
        <circle cx="265" cy="135" r="4" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="2" />

        {/* Empty Hooks */}
        {[
          {x: 60, y: 75},
          {x: 140, y: 75},
          {x: 220, y: 75}
        ].map((hook, i) => (
          <g key={i} transform={`translate(${hook.x}, ${hook.y})`}>
            {/* Hook Base */}
            <circle cx="0" cy="0" r="10" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="3" />
            <circle cx="0" cy="0" r="2" fill="#1A1A2E" />
            {/* The Hook itself */}
            <path d="M 0 10 V 25 C 0 35, 15 35, 15 25" fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
            {/* Faint ghost/shadow outline of where a key would hang */}
            <path d="M 12 30 C -5 40 -10 -20 -30 20" fill="none" stroke="#FFFdf8" strokeWidth="2" opacity="0" />
            <g stroke="#FFFdf8" strokeWidth="2" strokeDasharray="3 3" opacity="0.4" fill="none" strokeLinejoin="round">
              <circle cx="15" cy="25" r="8" />
              <path d="M 15 33 L 15 65 L 25 65 L 25 55 L 15 55 M 15 45 L 25 45 L 25 35 L 15 35" />
            </g>
          </g>
        ))}
      </g>
      
      {/* Spiderweb from a hook to the board edge */}
      <path d="M 280 135 L 340 180 M 283 145 L 330 200 M 300 135 L 340 150 M 305 160 Q 320 180 330 170" fill="none" stroke="#1A1A2E" strokeWidth="1" strokeLinecap="round" opacity="0.2" />
    </svg>
  );
}
