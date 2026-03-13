import React from 'react';

export default function ExplosionIllustration({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" 
      className={className} 
      viewBox="0 0 600 350" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Frame */}
      <rect x="50" y="50" width="500" height="250" fill="#FFFdf8" rx="10" />

      {/* Floor */}
      <line x1="20" y1="280" x2="580" y2="280" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />

      {/* Explosion Clouds Behind */}
      <g transform="translate(300, 150)">
        <circle cx="0" cy="0" r="120" fill="#1A1A2E" opacity="0.1" />
        <circle cx="-60" cy="-40" r="80" fill="#1A1A2E" opacity="0.15" />
        <circle cx="80" cy="-20" r="90" fill="#1A1A2E" opacity="0.08" />
        <circle cx="10" cy="-80" r="70" fill="#1A1A2E" opacity="0.1" />
        
        {/* Flash spikes */}
        <path d="M 0 -130 L 20 -90 L 80 -100 L 40 -50 L 110 -20 L 60 10 L 90 70 L 30 40 L 0 90 L -30 40 L -90 60 L -60 10 L -110 -20 L -40 -50 L -80 -100 L -20 -90 Z" fill="#E8B84B" stroke="#1A1A2E" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 0 -100 L 15 -70 L 60 -80 L 30 -40 L 80 -15 L 45 10 L 65 50 L 20 30 L 0 70 L -20 30 L -65 50 L -45 10 L -80 -15 L -30 -40 L -60 -80 L -15 -70 Z" fill="#E26D5C" />
      </g>

      {/* Broken Beaker / Equipment fragments */}
      <path d="M 120 280 L 140 250 L 160 280 Z" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 170 280 L 180 260 L 200 280 Z" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 450 280 L 430 260 L 480 270 Z" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 420 280 L 410 270 L 390 280 L 395 260 Z" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />

      {/* Soot / smoke lines */}
      <g stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity="0.5">
        <path d="M 150 200 Q 120 180 140 150" />
        <path d="M 450 180 Q 480 150 460 120" />
        <path d="M 200 100 Q 180 70 220 50" />
        <path d="M 400 80 Q 430 50 380 30" />
      </g>

      {/* The Singed Scientist */}
      <g transform="translate(300, 280)">
        {/* Legs planted wide */}
        <path d="M -30 0 L -20 -70 M 30 0 L 20 -70" stroke="#1A3B4D" strokeWidth="16" strokeLinecap="round" />
        {/* Shoes curling up */}
        <path d="M -30 -10 C -45 -10 -50 0 -40 5 L -20 0 Z" fill="#1A1A2E" strokeLinejoin="round" />
        <path d="M 30 -10 C 45 -10 50 0 40 5 L 20 0 Z" fill="#1A1A2E" strokeLinejoin="round" />

        {/* Torso covered in soot */}
        <rect x="-30" y="-140" width="60" height="80" rx="10" fill="#FFFdf8" />
        {/* Soot patches */}
        <path d="M -30 -120 Q -10 -100 -30 -80 Z M 10 -140 Q 30 -120 30 -140 Z M -10 -80 Q 10 -60 30 -80 Z" fill="#1A1A2E" opacity="0.4" />
        <rect x="-30" y="-140" width="60" height="80" rx="10" fill="none" stroke="#1A1A2E" strokeWidth="4" />
        
        {/* Blown back tie/collar */}
        <path d="M 0 -130 L -15 -140 M 0 -130 L 15 -140" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" />
        <path d="M -5 -130 L -20 -100 L 10 -110 Z" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />

        {/* Arms outstretched frozen */}
        <path d="M -30 -120 Q -60 -100 -70 -130" fill="none" stroke="#FFFdf8" strokeWidth="14" strokeLinecap="round" />
        <path d="M -30 -120 Q -60 -100 -70 -130" fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
        <circle cx="-70" cy="-130" r="8" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="2" />
        
        <path d="M 30 -120 Q 60 -100 70 -130" fill="none" stroke="#FFFdf8" strokeWidth="14" strokeLinecap="round" />
        <path d="M 30 -120 Q 60 -100 70 -130" fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
        <circle cx="70" cy="-130" r="8" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="2" />

        {/* Head */}
        <circle cx="0" cy="-170" r="30" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="4" />
        {/* Soot on face */}
        <path d="M -28 -170 Q 0 -130 28 -170 Q 0 -200 -28 -170 Z" fill="#1A1A2E" opacity="0.6" />

        {/* Singed wild hair blowing back */}
        <path d="M -20 -195 Q -40 -220 0 -240 Q 20 -200 20 -195" fill="none" stroke="#1A1A2E" strokeWidth="6" strokeLinecap="round" />
        <path d="M -10 -195 L -30 -230 M 0 -200 L 20 -240 M 10 -195 L 40 -220" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
        <path d="M -30 -180 L -60 -200 M 30 -180 L 60 -200" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />

        {/* Fractured / crooked glasses */}
        <circle cx="-12" cy="-175" r="10" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="3" />
        <circle cx="18" cy="-170" r="10" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="3" />
        <line x1="-2" y1="-175" x2="8" y2="-170" stroke="#1A1A2E" strokeWidth="3" />
        <path d="M -15 -180 L -9 -170 M 15 -170 L 21 -175" stroke="#1A1A2E" strokeWidth="1" /> {/* Cracks */}

        {/* Stunned eyes */}
        <circle cx="-12" cy="-175" r="2" fill="#1A1A2E" />
        <circle cx="18" cy="-170" r="2" fill="#1A1A2E" />

        {/* Mouth gaping open */}
        <ellipse cx="0" cy="-155" rx="6" ry="10" fill="#1A1A2E" />
      </g>

    </svg>
  );
}
