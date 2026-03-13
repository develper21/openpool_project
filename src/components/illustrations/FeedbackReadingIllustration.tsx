import React from 'react';

export default function FeedbackReadingIllustration({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" 
      className={className} 
      viewBox="0 0 800 250" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Room/Study */}
      <rect x="0" y="0" width="800" height="250" fill="#FFFdf8" />
      
      {/* Wall Texture Lines */}
      <g stroke="#1A1A2E" strokeWidth="1" strokeLinecap="round" opacity="0.05">
        <path d="M50 0 L50 250 M150 0 L150 250 M250 0 L250 250 M350 0 L350 250 M450 0 L450 250 M550 0 L550 250 M650 0 L650 250 M750 0 L750 250" />
      </g>
      
      {/* Window */}
      <g transform="translate(100, 40)">
        <rect x="0" y="0" width="120" height="150" fill="#1A3B4D" stroke="#1A1A2E" strokeWidth="4" />
        <rect x="4" y="4" width="52" height="70" fill="#2A4B5D" stroke="#1A1A2E" strokeWidth="2" />
        <rect x="64" y="4" width="52" height="70" fill="#2A4B5D" stroke="#1A1A2E" strokeWidth="2" />
        <rect x="4" y="76" width="52" height="70" fill="#2A4B5D" stroke="#1A1A2E" strokeWidth="2" />
        <rect x="64" y="76" width="52" height="70" fill="#2A4B5D" stroke="#1A1A2E" strokeWidth="2" />
        {/* Moon / Stars */}
        <circle cx="90" cy="20" r="10" fill="#F4E9CD" />
        <circle cx="30" cy="30" r="1.5" fill="#F4E9CD" opacity="0.8" />
        <circle cx="40" cy="15" r="1" fill="#F4E9CD" opacity="0.6" />
        <circle cx="80" cy="50" r="1" fill="#F4E9CD" opacity="0.8" />
      </g>
      
      {/* Floor */}
      <line x1="0" y1="220" x2="800" y2="220" stroke="#1A1A2E" strokeWidth="3" />
      <g stroke="#1A1A2E" strokeWidth="1" strokeLinecap="round" opacity="0.1">
        <line x1="0" y1="230" x2="800" y2="230" />
        <line x1="0" y1="240" x2="800" y2="240" />
      </g>

      {/* Rug Oval */}
      <ellipse cx="400" cy="220" rx="200" ry="20" fill="#8FAF72" stroke="#1A1A2E" strokeWidth="3" opacity="0.8" />

      {/* Bookcase (Right) */}
      <g transform="translate(620, 50)">
        <rect x="0" y="0" width="120" height="170" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="4" />
        <line x1="0" y1="40" x2="120" y2="40" stroke="#1A1A2E" strokeWidth="3" />
        <line x1="0" y1="85" x2="120" y2="85" stroke="#1A1A2E" strokeWidth="3" />
        <line x1="0" y1="130" x2="120" y2="130" stroke="#1A1A2E" strokeWidth="3" />
        
        {/* Books Shelf 1 */}
        <rect x="10" y="10" width="15" height="30" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="2" />
        <rect x="25" y="15" width="12" height="25" fill="#1A3B4D" stroke="#1A1A2E" strokeWidth="2" />
        <rect x="40" y="5" width="20" height="35" fill="#E8B84B" stroke="#1A1A2E" strokeWidth="2" />
        <g transform="translate(65, 38) rotate(-20) translate(-65, -38)">
          <rect x="65" y="8" width="15" height="30" fill="#8FAF72" stroke="#1A1A2E" strokeWidth="2" />
        </g>
        
        {/* Boxes / Books Shelf 2 */}
        <rect x="15" y="60" width="40" height="25" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="2" />
        <rect x="60" y="45" width="15" height="40" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="2" />
        <rect x="75" y="45" width="15" height="40" fill="#1A3B4D" stroke="#1A1A2E" strokeWidth="2" />
      </g>

      {/* Floor Lamp (Left) */}
      <g transform="translate(260, 60)">
        {/* Base and Pole */}
        <path d="M30 160 L50 160 Q40 150 40 140 L40 0" fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {/* Lamp Shade */}
        <path d="M20 15 L60 15 L50 -20 L30 -20 Z" fill="#E8B84B" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round" />
        {/* Lamp Light Beam */}
        <path d="M15 15 L-50 150 L110 150 L65 15 Z" fill="#E8B84B" opacity="0.15" />
      </g>

      {/* Stack of Papers (Left) */}
      <g transform="translate(200, 180)">
        <path d="M0 40 L60 40 L50 0 L-10 0 Z" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="2" />
        <path d="M-5 5 L55 5 L65 40" fill="none" stroke="#1A1A2E" strokeWidth="1" />
        <path d="M-8 10 L52 10 L68 40" fill="none" stroke="#1A1A2E" strokeWidth="1" />
        <path d="M-2 15 L58 15 L62 40" fill="none" stroke="#1A1A2E" strokeWidth="1" />
        <path d="M-10 20 L50 20 L70 40" fill="none" stroke="#1A1A2E" strokeWidth="1" />
        {/* Floating papers */}
        <path d="M30 -20 L70 -10 L60 -30 Z" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
        <path d="M-20 -10 L10 -5 L0 -25 Z" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="2" strokeLinejoin="round" />
      </g>

      {/* Armchair (Center) */}
      <g transform="translate(360, 110)">
        {/* Backrest */}
        <path d="M20 90 L20 10 Q40 -10 60 10 L60 90 Z" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="4" strokeLinejoin="round" />
        {/* Backrest details (tufted buttons) */}
        <circle cx="30" cy="30" r="2" fill="#1A1A2E" />
        <circle cx="50" cy="30" r="2" fill="#1A1A2E" />
        <circle cx="40" cy="50" r="2" fill="#1A1A2E" />
        <circle cx="30" cy="70" r="2" fill="#1A1A2E" />
        <circle cx="50" cy="70" r="2" fill="#1A1A2E" />
        
        {/* Armrest Back / Shadow */}
        <rect x="0" y="50" width="20" height="15" rx="5" fill="#1A1A2E" opacity="0.5" />
        <rect x="60" y="50" width="20" height="15" rx="5" fill="#1A1A2E" opacity="0.5" />
        
        {/* Seat Cushion */}
        <path d="M10 90 Q40 80 70 90 L80 110 Q40 120 0 110 Z" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="4" strokeLinejoin="round" />
        
        {/* Armrests Front */}
        <path d="M-10 60 L10 60 L10 100 L-10 100 Z" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="4" strokeLinejoin="round" />
        <path d="M70 60 L90 60 L90 100 L70 100 Z" fill="#E26D5C" stroke="#1A1A2E" strokeWidth="4" strokeLinejoin="round" />
        
        {/* Legs */}
        <path d="M0 110 L-5 130" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
        <path d="M80 110 L85 130" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Scientist Reading (Center) */}
      <g transform="translate(350, 80)">
        {/* Legs */}
        <path d="M20 100 L40 100 L40 130 L55 130 M30 95 L50 95 L50 120 L65 120" fill="none" stroke="#1A3B4D" strokeWidth="12" strokeLinejoin="round" strokeLinecap="round" />
        {/* Shoes */}
        <ellipse cx="58" cy="130" rx="8" ry="4" fill="#1A1A2E" />
        <ellipse cx="68" cy="120" rx="8" ry="4" fill="#1A1A2E" />
        
        {/* Torso */}
        <path d="M30 40 Q40 50 40 90 L15 90 Q15 50 30 40 Z" fill="#8FAF72" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round" />
        
        {/* Head */}
        <circle cx="35" cy="25" r="16" fill="#F4E9CD" stroke="#1A1A2E" strokeWidth="3" />
        {/* Hair */}
        <path d="M15 25 C15 5, 55 5, 50 30 C45 10, 20 10, 15 25 Z" fill="#E8B84B" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round" />
        {/* Glasses */}
        <circle cx="42" cy="25" r="5" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="2" />
        {/* Eye focusing */}
        <line x1="41" y1="25" x2="43" y2="25" stroke="#1A1A2E" strokeWidth="2" />
        <path d="M38 25 L37 25" stroke="#1A1A2E" strokeWidth="2" />
        {/* Little smile / engrossed expression */}
        <path d="M42 33 Q45 35 48 33" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" />
        
        {/* Arm holding paper (background) */}
        <path d="M20 50 Q10 70 30 80 L50 70" fill="none" stroke="#8FAF72" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M50 70 L55 65" fill="none" stroke="#F4E9CD" strokeWidth="6" strokeLinecap="round" />

        {/* Paper being read */}
        <g transform="translate(60, 50) rotate(15)">
          <rect x="-15" y="-10" width="30" height="40" fill="#FFFdf8" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round" />
          <line x1="-10" y1="0" x2="10" y2="0" stroke="#1A1A2E" strokeWidth="2" />
          <line x1="-10" y1="10" x2="15" y2="10" stroke="#1A1A2E" strokeWidth="2" />
          <line x1="-10" y1="20" x2="12" y2="20" stroke="#1A1A2E" strokeWidth="2" />
          <circle cx="5" cy="15" r="2" fill="#E26D5C" />
        </g>
        
        {/* Arm holding paper (foreground) */}
        <path d="M30 45 Q40 60 45 70" fill="none" stroke="#8FAF72" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M45 70 L52 65" fill="none" stroke="#F4E9CD" strokeWidth="6" strokeLinecap="round" />
      </g>
      
      {/* Floating expressive symbols */}
      <g stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" fill="none">
        {/* Plus sign */}
        <path d="M450 50 L460 50 M455 45 L455 55" />
        {/* Star */}
        <path d="M430 70 L435 60 L440 70 L430 63 L440 63 Z" fill="#E8B84B" />
        {/* Hmm... line */}
        <path d="M420 30 Q430 20 440 30 T460 30" opacity="0.5" />
      </g>

    </svg>
  );
}
