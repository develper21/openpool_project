import React from 'react';

export default function ForgeKeyIllustration({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" 
      className={className} 
      viewBox="0 0 400 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background shape */}
      {/* Not putting a full background to allow integration into the card */}
      
      {/* Anvil */}
      <g transform="translate(100, 180)">
        {/* Base */}
        <path d="M40 80 L160 80 L150 40 L50 40 Z" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="4" strokeLinejoin="round" />
        <line x1="100" y1="40" x2="100" y2="80" stroke="#1A1A2E" strokeWidth="4" />
        {/* Body */}
        <path d="M50 40 C60 0, 140 0, 150 40 Z" fill="#8FAF72" stroke="#1A1A2E" strokeWidth="4" />
        {/* Horn and Heel */}
        <path d="M30 0 L180 0 L150 20 L50 20 Z" fill="#1A1A2E" />
        <path d="M0 0 L180 0 L150 20 L30 20 Z" fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinejoin="round" />
        {/* Detail lines */}
        <line x1="30" y1="10" x2="150" y2="10" stroke="#FFFdf8" strokeWidth="2" strokeDasharray="4 8" opacity="0.5" />
      </g>

      {/* Glowing Key undergoing forging */}
      <g transform="translate(160, 150) rotate(-15)">
        <path d="M5 0 L25 0 L30 10 L15 20 L0 10 Z" fill="#E8B84B" stroke="#E26D5C" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="15" cy="10" r="4" fill="#FFFdf8" />
        <line x1="15" y1="20" x2="15" y2="60" stroke="#E26D5C" strokeWidth="4" strokeLinecap="round" />
        <path d="M15 40 L25 40 M15 50 L20 50" fill="none" stroke="#E26D5C" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
        
        {/* Hot glow effect */}
        <circle cx="15" cy="45" r="30" fill="#E26D5C" opacity="0.3" filter="blur(5px)" />
        <circle cx="15" cy="45" r="15" fill="#E8B84B" opacity="0.5" filter="blur(2px)" />
      </g>

      {/* Hammer striking */}
      <g transform="translate(230, 80) rotate(10)">
        {/* Handle */}
        <path d="M40 -40 L70 30" stroke="#1A1A2E" strokeWidth="6" strokeLinecap="round" />
        {/* Mallet head */}
        <rect x="50" y="20" width="40" height="20" rx="3" fill="#1A1A2E" transform="rotate(20 70 30)" />
        <rect x="55" y="25" width="30" height="10" rx="2" fill="#E8B84B" transform="rotate(20 70 30)" />
        
        {/* Motion lines */}
        <path d="M80 0 Q90 20 80 40" fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
        <path d="M90 -10 Q105 15 90 40" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      </g>

      {/* Flying sparks */}
      <g stroke="#E8B84B" strokeWidth="3" strokeLinecap="round">
        <line x1="170" y1="140" x2="140" y2="120" />
        <line x1="180" y1="130" x2="175" y2="100" />
        <line x1="200" y1="140" x2="230" y2="120" />
        <line x1="150" y1="160" x2="120" y2="170" />
      </g>
      
      {/* Tiny stars & dots around sparks */}
      <circle cx="130" cy="110" r="3" fill="#E26D5C" />
      <circle cx="160" cy="90" r="2" fill="#E26D5C" />
      <circle cx="240" cy="110" r="4" fill="#E8B84B" />
      <circle cx="110" cy="160" r="2" fill="#E8B84B" />
      <path d="M220 140 L225 150 L235 155 L225 160 L220 170 L215 160 L205 155 L215 150 Z" fill="#E8B84B" />

      {/* Steam / Smoke clouds from the bottom */}
      <path d="M300 250 Q280 230 310 210 Q320 200 340 210" fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <path d="M80 240 Q60 220 90 200 Q100 190 120 200" fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <circle cx="340" cy="200" r="15" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeDasharray="4 6" opacity="0.3" />
      <circle cx="60" cy="240" r="10" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeDasharray="3 5" opacity="0.3" />
    </svg>
  );
}
