import React from 'react';

export default function EmptyMicroscopeIllustration({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" 
      className={className} 
      viewBox="0 0 500 350" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Frame */}
      <rect x="50" y="50" width="400" height="250" fill="#FFFdf8" rx="10" />

      {/* Desk surface */}
      <line x1="20" y1="280" x2="480" y2="280" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
      <path d="M 40 290 L 460 290" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity="0.3" />

      <g transform="translate(180, 100)">
        {/* The Microscope */}
        {/* Base */}
        <path d="M 30 180 L 110 180 Q 130 180 130 160 L 20 160 Q 20 180 30 180 Z" fill="#1A3B4D" stroke="#1A1A2E" strokeWidth="4" strokeLinejoin="round" />
        
        {/* Arm */}
        <path d="M 100 160 L 130 80 Q 140 50 110 30 L 70 30" fill="none" stroke="#1A3B4D" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 100 160 L 130 80 Q 140 50 110 30 L 70 30" fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Stage */}
        <path d="M 60 120 L 120 120 M 50 130 L 120 130 Z" stroke="#E8B84B" strokeWidth="6" strokeLinecap="round" />
        {/* Empty slide on stage (dotted empty rectangle) */}
        <rect x="70" y="115" width="20" height="4" fill="none" stroke="#E26D5C" strokeWidth="1" strokeDasharray="2 2" />

        {/* Objective barrel */}
        <rect x="50" y="40" width="30" height="50" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="4" />
        <path d="M 55 90 L 75 90 L 80 110 L 50 110 Z" fill="#8FAF72" stroke="#1A1A2E" strokeWidth="4" strokeLinejoin="round" />
        {/* Focus knob */}
        <circle cx="120" cy="110" r="10" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="3" />
        <circle cx="120" cy="110" r="4" fill="#1A1A2E" />

        {/* Eyepiece tube */}
        <path d="M 60 40 L 40 0 L 50 -10 L 70 40 Z" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="4" strokeLinejoin="round" />
        <circle cx="45" cy="-5" r="8" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="3" />

        {/* Character - Scientist looking through */}
        <g transform="translate(-100, -50)">
          {/* Body leaning in */}
          <path d="M -50 200 Q -10 150 50 150 L 80 120 Q 50 110 20 150 L -70 200" fill="#8FAF72" stroke="#1A1A2E" strokeWidth="4" strokeLinejoin="round" />
          
          {/* Head bent over */}
          <circle cx="90" cy="90" r="30" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="4" />
          {/* Hair pushing forward */}
          <path d="M 80 60 C 90 40, 130 60, 120 90 C 120 120, 130 110, 100 120" fill="#E8B84B" stroke="#1A1A2E" strokeWidth="4" strokeLinejoin="round" />
          
          {/* Eye squinting into eyepiece */}
          <circle cx="110" cy="85" r="5" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="2" />
          <path d="M 105 85 L 115 85" stroke="#1A1A2E" strokeWidth="2" /> {/* Closed/squinting eye */}
          
          {/* Wait, nothing's there? question mark floating above head */}
          <path d="M 120 40 Q 140 20 130 0 T 100 -10 T 110 20" fill="none" stroke="#E26D5C" strokeWidth="4" strokeLinecap="round" />
          <circle cx="110" cy="30" r="3" fill="#E26D5C" />

          {/* Arm resting on desk */}
          <path d="M 50 150 Q 80 180 100 150" fill="none" stroke="#8FAF72" strokeWidth="16" strokeLinecap="round" />
          <path d="M 50 150 Q 80 180 100 150" fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
          <circle cx="100" cy="150" r="8" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="2" />
        </g>
      </g>
      
      {/* Exclamation Marks showing surprise of emptiness */}
      <g transform="translate(190, 80) rotate(-20)" stroke="#E8B84B" strokeWidth="4" strokeLinecap="round">
        <line x1="0" y1="0" x2="0" y2="15" />
        <circle cx="0" cy="25" r="2" />
      </g>
      <g transform="translate(160, 100) rotate(-40)" stroke="#E8B84B" strokeWidth="4" strokeLinecap="round">
        <line x1="0" y1="0" x2="0" y2="10" />
        <circle cx="0" cy="20" r="2" />
      </g>

    </svg>
  );
}
