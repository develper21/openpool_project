import React from 'react';

export function GroupSilhouetteIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );
}

export function StackedPapersIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <path d="M16 13L10 19L7 16" stroke="#8FAF72" strokeWidth="3" />
      <path d="M3 6h2M3 10h2" opacity="0.4"></path>
    </svg>
  );
}

export function FiveStarsIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${6 + i*12} 2 L${8 + i*12} 7 L${14 + i*12} 7 L${9 + i*12} 11 L${11 + i*12} 16 L${6 + i*12} 13 L${1 + i*12} 16 L${3 + i*12} 11 L${-2 + i*12} 7 L${4 + i*12} 7 Z`} fill={i < 4 ? "#E8B84B" : "none"} stroke="#1A1A2E" strokeWidth="1" />
      ))}
      <ellipse cx="30" cy="10" rx="28" ry="12" fill="none" stroke="#E26D5C" strokeWidth="1" strokeDasharray="4 2" transform="rotate(-2 30 10)" opacity="0.8" />
    </svg>
  );
}

export function SpeedometerIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4"></path>
      <path d="M12 18v4"></path>
      <path d="M4.93 4.93l2.83 2.83"></path>
      <path d="M16.24 16.24l2.83 2.83"></path>
      <path d="M2 12h4"></path>
      <path d="M18 12h4"></path>
      <path d="M4.93 19.07l2.83-2.83"></path>
      <path d="M16.24 7.76l2.83-2.83"></path>
      <circle cx="12" cy="12" r="8" fill="#FFFdf8"></circle>
      <path d="M12 14 L16 8" stroke="#E26D5C" strokeWidth="2"></path>
      <circle cx="12" cy="14" r="2" fill="#1A1A2E"></circle>
    </svg>
  );
}

export function ScientistReviewIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 60 60" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Background paper */}
      <rect x="15" y="10" width="30" height="40" rx="2" fill="#F4E9CD" />
      <path d="M20 20h20M20 30h20M20 40h10" strokeOpacity="0.3" />
      
      {/* Red pen strikeout */}
      <path d="M15 25L45 35" stroke="#E26D5C" strokeWidth="3" />
      
      {/* Scientist head over the paper */}
      <circle cx="45" cy="45" r="10" fill="#FFFdf8" />
      <path d="M38 43 Q45 50 52 43" strokeOpacity="0.6" />
      
      {/* Glasses */}
      <circle cx="40" cy="42" r="3" fill="#FFFdf8" />
      <circle cx="48" cy="42" r="3" fill="#FFFdf8" />
      <path d="M43 42h2" />
      <path d="M37 42 L35 48" />
      
      {/* Hair (wild scientist hair) */}
      <path d="M35 45 C30 40, 35 30, 45 35 C50 30, 58 35, 55 45" fill="#E8B84B" strokeLinejoin="round" />
      
      {/* Hand with red pen */}
      <path d="M45 55 L35 38 L30 42 L32 35" fill="#E26D5C" />
      <circle cx="35" cy="45" r="4" fill="#F4E9CD" />
    </svg>
  );
}
