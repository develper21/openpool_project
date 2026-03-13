import React from 'react';

export default function MissionControlIllustration({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" 
      className={className} 
      viewBox="0 0 1000 250" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Room */}
      <rect x="0" y="0" width="1000" height="250" fill="#FFFdf8" />
      
      {/* Wall Panels */}
      <rect x="50" y="20" width="300" height="120" rx="8" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="3" />
      <rect x="380" y="20" width="400" height="120" rx="8" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="3" />
      <rect x="810" y="20" width="140" height="120" rx="8" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="3" />
      
      {/* Screen contents - Left */}
      <g transform="translate(60, 30)">
        <path d="M0 80 L30 60 L60 70 L90 40 L120 50 L150 10 L180 30 L210 20 L240 50 L270 20" fill="none" stroke="#E26D5C" strokeWidth="4" strokeLinejoin="round" />
        <circle cx="270" cy="20" r="5" fill="#E26D5C" />
        <path d="M0 80 Q50 90 100 80 T200 80 T280 80" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
      </g>

      {/* Screen contents - Center Main */}
      <g transform="translate(390, 30)">
        {/* Globe / Radar */}
        <circle cx="70" cy="50" r="40" fill="none" stroke="#8FAF72" strokeWidth="3" />
        <path d="M30 50 Q70 10 110 50 Q70 90 30 50" fill="none" stroke="#8FAF72" strokeWidth="2" />
        <path d="M70 10 Q30 50 70 90 Q110 50 70 10" fill="none" stroke="#8FAF72" strokeWidth="2" />
        
        {/* Bar charts */}
        <rect x="150" y="40" width="20" height="60" fill="#E8B84B" stroke="#1A1A2E" strokeWidth="2" />
        <rect x="180" y="20" width="20" height="80" fill="#E8B84B" stroke="#1A1A2E" strokeWidth="2" />
        <rect x="210" y="60" width="20" height="40" fill="#E8B84B" stroke="#1A1A2E" strokeWidth="2" />
        <rect x="240" y="30" width="20" height="70" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="2" />
        <rect x="270" y="70" width="20" height="30" fill="#E8B84B" stroke="#1A1A2E" strokeWidth="2" />
        
        {/* Text lines */}
        <rect x="310" y="20" width="60" height="6" rx="3" fill="#1A1A2E" opacity="0.6" />
        <rect x="310" y="35" width="40" height="6" rx="3" fill="#1A1A2E" opacity="0.4" />
        <rect x="310" y="50" width="50" height="6" rx="3" fill="#1A1A2E" opacity="0.4" />
        <rect x="310" y="65" width="70" height="6" rx="3" fill="#1A1A2E" opacity="0.4" />
        <rect x="310" y="80" width="30" height="6" rx="3" fill="#1A1A2E" opacity="0.4" />
      </g>

      {/* Screen contents - Right */}
      <g transform="translate(820, 30)">
        <circle cx="60" cy="50" r="30" fill="none" stroke="#E8B84B" strokeWidth="10" strokeDasharray="40 20 60 30" />
        <circle cx="60" cy="50" r="15" fill="#E26D5C" />
      </g>
      
      {/* Floor Line */}
      <line x1="0" y1="210" x2="1000" y2="210" stroke="#1A1A2E" strokeWidth="4" />
      <path d="M0 220 L1000 220 M0 230 L1000 230 M0 240 L1000 240" stroke="#1A1A2E" strokeWidth="1" opacity="0.1" />

      {/* Control Desks */}
      {/* Left Desk */}
      <g transform="translate(100, 160)">
        <path d="M20 50 L0 80 L300 80 L280 50 Z" fill="#8FAF72" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round" />
        <rect x="30" y="60" width="240" height="10" rx="3" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="2" />
        <rect x="50" y="20" width="60" height="40" rx="5" fill="#1A1A2E" />
        <rect x="180" y="15" width="70" height="45" rx="5" fill="#1A1A2E" />
        {/* Buttons / Lights */}
        <circle cx="130" cy="65" r="3" fill="#E26D5C" />
        <circle cx="140" cy="65" r="3" fill="#E8B84B" />
        <circle cx="150" cy="65" r="3" fill="#E8B84B" />
        <circle cx="160" cy="65" r="3" fill="#8FAF72" />
      </g>

      {/* Center Desk */}
      <g transform="translate(420, 150)">
        <path d="M30 60 L-10 90 L350 90 L310 60 Z" fill="#E8B84B" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round" />
        <path d="M20 90 L20 120 M320 90 L320 120" stroke="#1A1A2E" strokeWidth="6" strokeLinecap="round" />
        
        {/* Consoles */}
        <rect x="60" y="20" width="80" height="50" rx="5" fill="#1A3B4D" stroke="#1A1A2E" strokeWidth="2" />
        <rect x="200" y="20" width="80" height="50" rx="5" fill="#1A3B4D" stroke="#1A1A2E" strokeWidth="2" />
        <path d="M80 30 L120 50 M80 50 L120 30" stroke="#8FAF72" strokeWidth="2" opacity="0.5" />
        
        {/* Buttons strip */}
        <rect x="40" y="70" width="260" height="10" rx="3" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="2" />
        {Array.from({ length: 15 }).map((_, i) => (
          <circle key={i} cx={55 + i * 16} cy="75" r="2.5" fill={i % 4 === 0 ? "#E26D5C" : i % 3 === 0 ? "#8FAF72" : "#1A1A2E"} />
        ))}
      </g>

      {/* Right Desk */}
      <g transform="translate(780, 160)">
        <path d="M20 50 L0 80 L200 80 L180 50 Z" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round" />
        <rect x="30" y="60" width="140" height="10" rx="3" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="2" />
        <rect x="50" y="10" width="100" height="50" rx="5" fill="#1A1A2E" />
        {/* Screen wave */}
        <path d="M60 35 Q80 20 100 35 T140 35" fill="none" stroke="#8FAF72" strokeWidth="2" />
      </g>

      {/* Characters / Operators */}
      {/* Operator 1 (Left) */}
      <g transform="translate(180, 140)">
        {/* Chair */}
        <path d="M10 30 L10 70 M5 70 L15 70" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
        <rect x="0" y="20" width="20" height="30" rx="5" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="2" />
        {/* Person */}
        <circle cx="25" cy="0" r="12" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="2" />
        <path d="M15 15 Q25 5 35 15 L35 40 L15 40 Z" fill="#1A3B4D" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
        {/* Glasses & Hair */}
        <path d="M13 -5 C13 -15, 37 -15, 37 -5 Z" fill="#1A1A2E" />
        <rect x="25" y="-3" width="12" height="6" rx="2" fill="none" stroke="#1A1A2E" strokeWidth="2" />
        {/* Arm reaching */}
        <path d="M20 20 L40 10 L60 15" fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Operator 2 (Center, Pointing up at screens) */}
      <g transform="translate(560, 110)">
        <circle cx="20" cy="0" r="12" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="2" />
        {/* Hair */}
        <path d="M6 0 C6 -15, 34 -15, 30 5 C28 10, 20 15, 20 15" fill="#1A1A2E" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
        {/* Body standing */}
        <path d="M10 15 Q20 10 30 15 L30 100 L10 100 Z" fill="#8FAF72" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
        {/* Arm pointing */}
        <path d="M25 25 L40 -10 L70 -50" fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {/* Other arm holding clipboard */}
        <path d="M15 25 L5 50 L15 60" fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="10" y="50" width="20" height="25" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="2" transform="rotate(-15 10 50)" />
      </g>

      {/* Operator 3 (Right, slumped over slightly) */}
      <g transform="translate(840, 150)">
        <path d="M10 20 L10 60" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="10" cy="20" rx="15" ry="5" fill="#E8B84B" stroke="#1A1A2E" strokeWidth="2" />
        <circle cx="20" cy="5" r="11" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="2" />
        {/* Body leaning */}
        <path d="M10 15 Q25 10 30 20 L20 40 L5 30 Z" fill="#E8B84B" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
        <path d="M25 20 L40 25 L45 15" fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {/* Coffee cup on desk beside him */}
        <rect x="50" y="15" width="10" height="15" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="2" />
        <path d="M60 20 A5 5 0 1 1 60 25" fill="none" stroke="#1A1A2E" strokeWidth="2" />
      </g>
      
      {/* Clutter and detail lines */}
      <path d="M100 230 Q150 220 200 240 Q250 230 300 240" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <path d="M500 230 Q550 220 600 240 Q650 230 700 240" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      
      {/* Floating papers on the left */}
      <rect x="330" y="190" width="15" height="20" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="1" transform="rotate(15 330 190)" />
      <rect x="340" y="195" width="15" height="20" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="1" transform="rotate(-10 340 195)" />
      <rect x="350" y="205" width="15" height="20" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="1" transform="rotate(25 350 205)" />

    </svg>
  );
}
