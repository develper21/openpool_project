import React from 'react';

export default function BlueprintIllustration({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" 
      className={className} 
      viewBox="0 0 1000 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background shape mimicking a blueprint with a creative cream/blue twist */}
      <rect x="0" y="0" width="1000" height="300" fill="#1A3B4D" />
      
      {/* Blueprint Grid */}
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2A4B5D" strokeWidth="0.5" />
      </pattern>
      <rect width="1000" height="300" fill="url(#grid)" />
      
      {/* Technical Border */}
      <rect x="10" y="10" width="980" height="280" fill="none" stroke="#F4E9CD" strokeWidth="2" strokeDasharray="10 5" opacity="0.6" />
      <rect x="15" y="15" width="970" height="270" fill="none" stroke="#F4E9CD" strokeWidth="1" opacity="0.4" />

      {/* Decorative Corners */}
      <path d="M10 30 L30 10 M990 30 L970 10 M10 270 L30 290 M990 270 L970 290" stroke="#F4E9CD" strokeWidth="2" opacity="0.8" />
      
      {/* Title Box */}
      <rect x="20" y="240" width="180" height="40" fill="none" stroke="#F4E9CD" strokeWidth="1.5" />
      <text x="30" y="255" fill="#F4E9CD" fontSize="10" fontFamily="monospace" letterSpacing="2">DISTILL API v1.0</text>
      <text x="30" y="270" fill="#F4E9CD" fontSize="8" fontFamily="monospace" opacity="0.7">DWG NO. 84-B // ARCHITECTURE</text>

      {/* --- SCHEMATIC DIAGRAM --- */}
      
      {/* 1. CLIENT BOX */}
      <g transform="translate(100, 100)">
        <rect x="0" y="0" width="120" height="80" rx="4" fill="none" stroke="#E8B84B" strokeWidth="2.5" />
        {/* Hand drawn shade */}
        <path d="M2 10 L118 10 M2 20 L40 20" stroke="#E8B84B" strokeWidth="1" opacity="0.5" />
        <text x="60" y="45" fill="#E8B84B" fontSize="16" fontFamily="Caveat, cursive" textAnchor="middle" fontWeight="bold">CLIENT APP</text>
        <circle cx="120" cy="40" r="4" fill="#E8B84B" />
      </g>

      {/* Connection 1 */}
      <g transform="translate(220, 140)">
        <path d="M0 0 L100 0" fill="none" stroke="#F4E9CD" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M90 -5 L100 0 L90 5" fill="none" stroke="#F4E9CD" strokeWidth="2" />
        {/* Auth Lock */}
        <circle cx="50" cy="-15" r="8" fill="none" stroke="#E26D5C" strokeWidth="1.5" />
        <path d="M47 -15 L47 -22 A3 3 0 0 1 53 -22 L53 -15" fill="none" stroke="#E26D5C" strokeWidth="1.5" />
        <text x="50" y="15" fill="#E26D5C" fontSize="10" fontFamily="Caveat, cursive" textAnchor="middle">Auth / JWT</text>
      </g>

      {/* 2. DISTILL Core Box */}
      <g transform="translate(320, 60)">
        {/* Main brain module */}
        <polygon points="40,0 160,0 200,40 200,160 160,200 40,200 0,160 0,40" fill="none" stroke="#FFFdf8" strokeWidth="3" />
        <text x="100" y="100" fill="#FFFdf8" fontSize="24" fontFamily="Caveat, cursive" textAnchor="middle" fontWeight="bold">DISTILL CORE</text>
        <text x="100" y="120" fill="#FFFdf8" fontSize="10" fontFamily="monospace" opacity="0.8" textAnchor="middle">ROUTER & PARSER</text>
        
        {/* Nodes on the core */}
        <circle cx="0" cy="80" r="5" fill="#FFFdf8" />
        <circle cx="200" cy="60" r="5" fill="#FFFdf8" />
        <circle cx="200" cy="140" r="5" fill="#FFFdf8" />
      </g>

      {/* Connection 2: To PubMed */}
      <g transform="translate(520, 120)">
        <path d="M0 0 L80 -40 L160 -40" fill="none" stroke="#F4E9CD" strokeWidth="2" strokeDasharray="5 3" />
        <path d="M150 -45 L160 -40 L150 -35" fill="none" stroke="#F4E9CD" strokeWidth="2" />
        <text x="80" y="-55" fill="#F4E9CD" fontSize="12" fontFamily="Caveat, cursive" textAnchor="middle">PMID Fetch</text>
      </g>

      {/* 3. PUBMED DATABASE */}
      <g transform="translate(680, 40)">
        {/* Cylinder / DB shape */}
        <path d="M0 20 A60 15 0 0 0 120 20 A60 15 0 0 0 0 20" fill="none" stroke="#8FAF72" strokeWidth="2" />
        <path d="M0 20 L0 80 A60 15 0 0 0 120 80 L120 20" fill="none" stroke="#8FAF72" strokeWidth="2" />
        <path d="M0 50 A60 15 0 0 0 120 50" fill="none" stroke="#8FAF72" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
        <text x="60" y="55" fill="#8FAF72" fontSize="14" fontFamily="monospace" textAnchor="middle" fontWeight="bold">PUBMED DB</text>
        <circle cx="0" cy="40" r="4" fill="#8FAF72" />
      </g>

      {/* Connection 3: To AI Engine */}
      <g transform="translate(520, 200)">
        <path d="M0 0 L80 40 L160 40" fill="none" stroke="#F4E9CD" strokeWidth="2" strokeDasharray="5 3" />
        <path d="M150 35 L160 40 L150 45" fill="none" stroke="#F4E9CD" strokeWidth="2" />
        <text x="80" y="60" fill="#E8B84B" fontSize="12" fontFamily="Caveat, cursive" textAnchor="middle">LLM Prompt</text>
      </g>

      {/* 4. AI ENGINE */}
      <g transform="translate(680, 200)">
        {/* AI Brain / Engine block */}
        <rect x="0" y="0" width="120" height="80" rx="10" fill="none" stroke="#E8B84B" strokeWidth="2" />
        {/* Inner processor rings */}
        <rect x="10" y="10" width="100" height="60" rx="5" fill="none" stroke="#E8B84B" strokeWidth="1" opacity="0.6" strokeDasharray="2 2" />
        <circle cx="60" cy="40" r="15" fill="none" stroke="#E8B84B" strokeWidth="2" />
        <text x="60" y="45" fill="#E8B84B" fontSize="16" fontFamily="monospace" textAnchor="middle" fontWeight="bold">AI</text>
        <circle cx="0" cy="40" r="4" fill="#E8B84B" />
      </g>

      {/* Decorative atomic/molecular orbits in corners */}
      <g transform="translate(900, 60)" stroke="#F4E9CD" fill="none" strokeWidth="1" opacity="0.4">
        <ellipse cx="0" cy="0" rx="30" ry="10" transform="rotate(30)" />
        <ellipse cx="0" cy="0" rx="30" ry="10" transform="rotate(-30)" />
        <ellipse cx="0" cy="0" rx="30" ry="10" transform="rotate(90)" />
        <circle cx="0" cy="0" r="3" fill="#F4E9CD" />
        <text x="0" y="45" fontSize="8" fontFamily="monospace" textAnchor="middle">SYNTH_CORE</text>
      </g>

      <g transform="translate(850, 250)" stroke="#F4E9CD" fill="none" strokeWidth="1" opacity="0.3">
        {/* Wavy signal */}
        <path d="M0 0 Q10 10 20 0 T40 0 T60 0 T80 0" />
        <circle cx="80" cy="0" r="2" />
      </g>
      
      {/* Random Blueprint dimensions & notes */}
      <text x="360" y="40" fill="#F4E9CD" fontSize="8" fontFamily="monospace" opacity="0.6">↑ 140px clearance</text>
      <line x1="320" y1="45" x2="520" y2="45" stroke="#F4E9CD" strokeWidth="0.5" opacity="0.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
      
      <text x="660" y="140" fill="#F4E9CD" fontSize="8" fontFamily="monospace" opacity="0.6" transform="rotate(-90 660 140)">← SSL/TLS →</text>
    </svg>
  );
}
