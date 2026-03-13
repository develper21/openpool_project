import React from 'react';

export default function EmptyDeskIllustration({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" 
      className={className} 
      viewBox="0 0 500 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Desk surface */}
      <path d="M50 300 Q250 310 450 300 L430 350 Q250 360 70 350 Z" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="4" strokeLinejoin="round" />
      <path d="M50 300 L70 350" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
      <path d="M450 300 L430 350" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />

      {/* Desk Legs */}
      <line x1="100" y1="350" x2="90" y2="400" stroke="#1A1A2E" strokeWidth="6" strokeLinecap="round" />
      <line x1="400" y1="350" x2="410" y2="400" stroke="#1A1A2E" strokeWidth="6" strokeLinecap="round" />

      {/* Blank Paper */}
      <g transform="translate(180, 220) rotate(-5)">
        <rect width="100" height="140" fill="#FFF" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round" />
        {/* Empty lines */}
        <line x1="20" y1="30" x2="80" y2="30" stroke="#1A1A2E" strokeWidth="2" strokeDasharray="4 8" opacity="0.3" strokeLinecap="round" />
        <line x1="20" y1="50" x2="60" y2="50" stroke="#1A1A2E" strokeWidth="2" strokeDasharray="4 8" opacity="0.3" strokeLinecap="round" />
      </g>

      {/* Pen */}
      <g transform="translate(250, 260) rotate(20)">
        <path d="M10 10 L80 10 L85 15 L80 20 L10 20 L0 15 Z" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
      </g>

      {/* Small Plant in the corner */}
      <g transform="translate(350, 200)">
        {/* Pot */}
        <path d="M20 70 L60 70 L50 100 L30 100 Z" fill="#E8B84B" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round" />
        <line x1="20" y1="80" x2="60" y2="80" stroke="#1A1A2E" strokeWidth="3" />
        {/* Stems & Leaves (Plant) */}
        <path d="M40 70 Q30 30 10 20" fill="none" stroke="#8FAF72" strokeWidth="4" strokeLinecap="round" />
        <path d="M40 70 Q50 30 70 20" fill="none" stroke="#8FAF72" strokeWidth="4" strokeLinecap="round" />
        <path d="M40 70 Q40 20 40 10" fill="none" stroke="#8FAF72" strokeWidth="4" strokeLinecap="round" />
        
        {/* Leaves */}
        <path d="M10 20 Q15 25 20 20 Q15 15 10 20" fill="#8FAF72" stroke="#1A1A2E" strokeWidth="2" />
        <path d="M70 20 Q65 25 60 20 Q65 15 70 20" fill="#8FAF72" stroke="#1A1A2E" strokeWidth="2" />
        <path d="M40 10 Q45 15 40 20 Q35 15 40 10" fill="#8FAF72" stroke="#1A1A2E" strokeWidth="2" />
      </g>

      {/* Coffee/Mug */}
      <g transform="translate(100, 240)">
        <path d="M20 30 L50 30 L50 60 L20 60 Z" fill="#1A1A2E" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
        <path d="M20 30 Q35 20 50 30" fill="#1A1A2E" stroke="#1A1A2E" strokeWidth="2" />
        <path d="M50 40 C60 40, 60 50, 50 50" fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
        {/* Steam */}
        <path d="M30 15 Q25 5 35 0" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <path d="M40 20 Q35 10 45 5" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      </g>

      {/* Decorative stars */}
      <path d="M80 150 L85 130 L100 120 L85 110 L80 90 L75 110 L60 120 L75 130 Z" fill="#E8B84B" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
      <path d="M400 150 L402 140 L410 135 L402 130 L400 120 L398 130 L390 135 L398 140 Z" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />

      {/* Soft doodles in background */}
      <circle cx="150" cy="100" r="3" fill="#1A1A2E" opacity="0.2" />
      <circle cx="350" cy="80" r="4" fill="#1A1A2E" opacity="0.2" />
      <circle cx="450" cy="250" r="2" fill="#1A1A2E" opacity="0.2" />
    </svg>
  );
}
