import React from 'react';

export default function EmptyCorkboardIllustration({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" 
      className={className} 
      viewBox="0 0 400 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wooden Frame */}
      <rect x="20" y="20" width="360" height="260" rx="4" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="8" strokeLinejoin="round" />
      <rect x="28" y="28" width="344" height="244" fill="none" stroke="#1A1A2E" strokeWidth="2" opacity="0.3" />
      
      {/* Corkboard texture (dots and small crosses) */}
      <rect x="24" y="24" width="352" height="252" fill="#E8B84B" opacity="0.1" />
      <g stroke="#1A1A2E" strokeWidth="1" strokeLinecap="round" opacity="0.2">
        {Array.from({ length: 40 }).map((_, i) => (
          <path key={i} d={`M${Math.random() * 300 + 50} ${Math.random() * 200 + 50} v2 M${Math.random() * 300 + 50} ${Math.random() * 200 + 50} v1`} />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <circle key={`c${i}`} cx={Math.random() * 300 + 50} cy={Math.random() * 200 + 50} r="0.5" fill="#1A1A2E" />
        ))}
      </g>

      {/* Center piece - one lonely pushpin and a shadow of a missing paper */}
      {/* Faded rect where paper used to be */}
      <rect x="150" y="80" width="100" height="120" fill="#FFFdf8" opacity="0.2" transform="rotate(-5 200 140)" />
      <rect x="150" y="80" width="100" height="120" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeDasharray="4 8" opacity="0.3" transform="rotate(-5 200 140)" />
      
      {/* The lonely pushpin */}
      <g transform="translate(190, 60)">
        {/* Pin shadow */}
        <path d="M12 20 L25 35" stroke="#1A1A2E" strokeWidth="2" opacity="0.2" strokeLinecap="round" />
        {/* Metal pin */}
        <path d="M10 20 L15 10" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" />
        {/* Plastic head */}
        <path d="M15 10 L25 15 L15 -5 L5 0 Z" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
        {/* Highlight */}
        <path d="M10 2 L15 -2" stroke="#FFFdf8" strokeWidth="2" strokeLinecap="round" />
      </g>
      
      {/* Hanging string holding the board */}
      <path d="M100 20 L200 -10 L300 20" fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="200" cy="-10" r="4" fill="#1A1A2E" />

      {/* Spiderweb in corner to show it's empty/unused */}
      <g transform="translate(380, 20)" stroke="#1A1A2E" strokeWidth="1" strokeLinecap="round" opacity="0.3">
        <line x1="0" y1="0" x2="-40" y2="40" />
        <line x1="0" y1="0" x2="-50" y2="10" />
        <line x1="0" y1="0" x2="-10" y2="50" />
        <path d="M0 20 Q-15 20 -20 0" fill="none" />
        <path d="M0 35 Q-20 35 -35 0" fill="none" />
        <path d="M-15 15 Q-25 25 -15 35" fill="none" />
      </g>
    </svg>
  );
}
