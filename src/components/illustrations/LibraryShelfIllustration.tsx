import React from 'react';

export default function LibraryShelfIllustration({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" 
      className={className} 
      viewBox="0 0 800 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background shape */}
      <rect x="40" y="20" width="720" height="160" rx="20" fill="#FFFdf8" />
      
      {/* Wooden Shelf Structure */}
      <path d="M50 160 L750 160" stroke="#8FAF72" strokeWidth="8" strokeLinecap="round" />
      <path d="M50 80 L750 80" stroke="#8FAF72" strokeWidth="6" strokeLinecap="round" strokeDasharray="12 4" opacity="0.5" />
      <path d="M100 20 L100 160" stroke="#8FAF72" strokeWidth="8" strokeLinecap="round" />
      <path d="M300 20 L300 160" stroke="#8FAF72" strokeWidth="8" strokeLinecap="round" />
      <path d="M500 20 L500 160" stroke="#8FAF72" strokeWidth="8" strokeLinecap="round" />
      <path d="M700 20 L700 160" stroke="#8FAF72" strokeWidth="8" strokeLinecap="round" />

      {/* Books and Folders Section 1 */}
      <g transform="translate(120, 90)">
        <path d="M10 70 L10 10 L30 10 L30 70 Z" fill="#E8B84B" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
        <path d="M35 70 L35 20 L50 20 L50 70 Z" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
        <path d="M55 70 L65 5 L80 10 L70 70 Z" fill="#8FAF72" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
        <path d="M90 70 L90 15 L120 15 L120 70 Z" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
        {/* Book details */}
        <line x1="15" y1="20" x2="25" y2="20" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="30" x2="25" y2="30" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" />
        <line x1="95" y1="30" x2="115" y2="30" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Books and Folders Section 2 - Tilted */}
      <g transform="translate(320, 90)">
        <path d="M10 70 L10 20 L25 20 L25 70 Z" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
        <path d="M30 70 L35 15 L50 15 L45 70 Z" fill="#E8B84B" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
        <path d="M50 70 L65 10 L85 15 L70 70 Z" fill="#8FAF72" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
        <path d="M90 70 L110 30 L150 45 L130 70 Z" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
        <path d="M110 70 L110 40 L125 40 L125 70 Z" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
      </g>

      {/* Researcher doodle interacting with bookshelf */}
      <g transform="translate(560, 50)">
        {/* Face */}
        <circle cx="50" cy="30" r="15" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="2" />
        {/* Glasses */}
        <line x1="42" y1="28" x2="58" y2="28" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" />
        <circle cx="45" cy="30" r="4" fill="none" stroke="#1A1A2E" strokeWidth="2" />
        <circle cx="55" cy="30" r="4" fill="none" stroke="#1A1A2E" strokeWidth="2" />
        {/* Smile */}
        <path d="M48 38 Q50 42 55 38" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" />
        
        {/* Body */}
        <path d="M50 45 L50 90" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" />
        <path d="M50 60 C30 50, 10 70, 0 80" fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" />
        <path d="M50 60 C70 50, 90 70, 100 80" fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" />
        
        {/* Legs */}
        <path d="M50 90 L35 120" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" />
        <path d="M50 90 L65 120" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" />
        
        {/* Paper in hand */}
        <path d="M0 70 L-15 65 L-20 85 L-5 90 Z" fill="#FFF" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
      </g>

      {/* Decorative Elements */}
      <path d="M120 40 L160 50 L140 70 Z" fill="none" stroke="#E8B84B" strokeWidth="2" strokeLinejoin="round" opacity="0.5" />
      <path d="M350 40 L380 40 L370 60 Z" fill="none" stroke="#E26D5C" strokeWidth="2" strokeLinejoin="round" opacity="0.5" />
      <circle cx="200" cy="50" r="5" fill="#E8B84B" />
      <circle cx="450" cy="60" r="4" fill="#8FAF72" />
      <circle cx="250" cy="120" r="3" fill="#E26D5C" />
      <path d="M70 120 Q80 110 90 120 T110 120" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <path d="M250 140 Q260 130 270 140 T290 140" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}
