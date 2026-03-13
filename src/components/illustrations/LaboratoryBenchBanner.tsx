import React from "react";

/**
 * LaboratoryBenchBanner — Horizontal panorama SVG illustration.
 * Features a long lab bench with papers, beakers, magnifying glass, 
 * and a small retro computer. Mid-century style, warm colors.
 */
export default function LaboratoryBenchBanner({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 800 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* ── Background Wall Texture ── */}
      <rect x="0" y="0" width="800" height="200" fill="#E8B84B" fillOpacity="0.03" />
      <path d="M 0 160 C 200 155, 600 165, 800 160" stroke="#2C2C2C" strokeWidth="1" opacity="0.1" />
      <path d="M 0 140 C 250 145, 550 135, 800 140" stroke="#2C2C2C" strokeWidth="0.5" opacity="0.05" />

      {/* ── Laboratory Bench / Desk ── */}
      <path
        d="M -20 180 L 820 180 L 820 220 L -20 220 Z"
        fill="#EDE8DC"
        stroke="#2C2C2C"
        strokeWidth="2"
      />
      {/* Bench thickness line */}
      <path d="M -20 190 L 820 190" stroke="#2C2C2C" strokeWidth="1.5" opacity="0.8" />
      {/* Wood grain / sketch lines on bench */}
      <path d="M 40 185 L 120 185 M 340 185 L 500 185 M 700 185 L 780 185" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" opacity="0.2" />

      {/* ── Left Side: Stacks of Papers & Books ── */}
      <g transform="translate(60, 95)">
        {/* Book 1 (bottom) */}
        <rect x="0" y="70" width="80" height="15" rx="2" fill="#8FAF72" stroke="#2C2C2C" strokeWidth="1.5" />
        <rect x="0" y="70" width="10" height="15" fill="#2C2C2C" fillOpacity="0.1" />
        {/* Book 2 */}
        <rect x="5" y="55" width="70" height="15" rx="2" fill="#E8B84B" stroke="#2C2C2C" strokeWidth="1.5" />
        <rect x="5" y="55" width="10" height="15" fill="#2C2C2C" fillOpacity="0.1" />
        {/* Paper stack on top */}
        <path d="M 12 50 L 70 50 L 68 55 L 10 55 Z" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M 15 45 L 72 45 L 70 50 L 12 50 Z" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M 18 40 L 75 40 L 72 45 L 15 45 Z" fill="#FFFDF8" stroke="#2C2C2C" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Floating paper */}
        <path d="M 25 20 L 60 15 L 65 30 L 30 35 Z" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1" opacity="0.8" />
      </g>

      {/* ── Center-Left: Beakers & Flasks ── */}
      <g transform="translate(220, 105)">
        {/* Round Flask */}
        <path d="M 25 75 C 5 75, -5 45, 10 35 L 15 10 L 35 10 L 40 35 C 55 45, 45 75, 25 75 Z" fill="#EDE8DC" stroke="#2C2C2C" strokeWidth="2" strokeLinejoin="round" />
        <path d="M 10 10 L 40 10" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
        {/* Liquid in round flask */}
        <path d="M 5 60 C 15 63, 35 63, 45 60 C 42 70, 32 73, 25 73 C 18 73, 8 70, 5 60 Z" fill="#C4622D" fillOpacity="0.4" />
        <circle cx="20" cy="65" r="2" fill="#F5F0E8" opacity="0.6" />
        <circle cx="28" cy="60" r="1.5" fill="#F5F0E8" opacity="0.5" />

        {/* Tall Beaker */}
        <rect x="55" y="25" width="30" height="50" rx="2" fill="#EDE8DC" stroke="#2C2C2C" strokeWidth="2" />
        <path d="M 50 25 L 90 25" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
        {/* Liquid in tall beaker */}
        <path d="M 57 50 C 65 48, 75 52, 83 50 L 83 73 L 57 73 Z" fill="#8FAF72" fillOpacity="0.4" />
        {/* Measurement lines */}
        <path d="M 60 35 L 68 35 M 60 45 L 65 45 M 60 55 L 68 55 M 60 65 L 65 65" stroke="#2C2C2C" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      </g>

      {/* ── Center-Right: Open Book & Magnifying Glass ── */}
      <g transform="translate(400, 130)">
        {/* Open Book laying on desk */}
        <path d="M 0 45 L 50 50 L 100 45 L 95 35 L 50 42 L 5 35 Z" fill="#E8B84B" stroke="#2C2C2C" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M 5 35 L 50 42 L 95 35 L 85 20 L 50 30 L 15 20 Z" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M 50 50 L 50 30" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" />
        {/* Text lines on book */}
        <path d="M 22 25 L 45 32 M 20 29 L 45 36" stroke="#2C2C2C" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        <path d="M 78 25 L 55 32 M 80 29 L 55 36" stroke="#2C2C2C" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        
        {/* Magnifying Glass resting on book */}
        <g transform="translate(65, 0) rotate(15)">
          {/* Handle */}
          <path d="M 20 20 L 45 45" stroke="#C4622D" strokeWidth="5" strokeLinecap="round" />
          <path d="M 20 20 L 45 45" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          {/* Glass */}
          <circle cx="10" cy="10" r="16" fill="#F5F0E8" fillOpacity="0.8" stroke="#2C2C2C" strokeWidth="2.5" />
          <circle cx="10" cy="10" r="12" stroke="#2C2C2C" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.3" />
          {/* Reflection */}
          <path d="M 2 4 C 6 -2, 14 -2, 18 4" stroke="#EDE8DC" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>

      {/* ── Right Side: Small Retro Computer ── */}
      <g transform="translate(580, 75)">
        {/* Monitor back/body */}
        <rect x="25" y="10" width="80" height="70" rx="8" fill="#EDE8DC" stroke="#2C2C2C" strokeWidth="2" />
        {/* Screen Bezel */}
        <rect x="30" y="15" width="70" height="55" rx="4" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.5" />
        {/* Screen Inner */}
        <rect x="35" y="20" width="60" height="45" rx="2" fill="#6B7C3A" fillOpacity="0.1" stroke="#2C2C2C" strokeWidth="1" />
        {/* Retro screen text / graph */}
        <path d="M 40 30 L 55 30 M 40 35 L 75 35 M 40 40 L 60 40 M 40 50 L 45 45 L 55 48 L 65 40 L 75 55 L 85 45" stroke="#8FAF72" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Monitor Stand */}
        <path d="M 50 80 L 80 80 L 90 105 L 40 105 Z" fill="#EDE8DC" stroke="#2C2C2C" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Keyboard */}
        <path d="M 10 105 L 120 105 L 130 115 L 0 115 Z" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Keyboard keys sketch */}
        <path d="M 15 110 L 115 110" stroke="#2C2C2C" strokeWidth="0.5" strokeDasharray="4 2" opacity="0.4" />
      </g>

      {/* ── Decorative Floating Elements ── */}
      {/* Molecule logic around beakers */}
      <circle cx="350" cy="70" r="6" stroke="#C4622D" strokeWidth="1.5" fill="none" />
      <circle cx="370" cy="50" r="4" stroke="#C4622D" strokeWidth="1.5" fill="none" />
      <circle cx="380" cy="80" r="5" stroke="#C4622D" strokeWidth="1.5" fill="none" />
      <path d="M 355 65 L 366 54" stroke="#C4622D" strokeWidth="1" />
      <path d="M 356 72 L 375 78" stroke="#C4622D" strokeWidth="1" />

      {/* Starbursts */}
      <path d="M 140 40 L 142 33 L 144 40 L 151 42 L 144 44 L 142 51 L 140 44 L 133 42 Z" fill="#E8B84B" opacity="0.6" />
      <path d="M 530 50 L 531 45 L 533 50 L 538 51 L 533 52 L 531 57 L 530 52 L 525 51 Z" fill="#C4622D" opacity="0.4" />
      <path d="M 750 60 L 752 53 L 754 60 L 761 62 L 754 64 L 752 71 L 750 64 L 743 62 Z" fill="#8FAF72" opacity="0.4" />

      {/* Twinkling dots */}
      <circle cx="180" cy="80" r="2" fill="#6B7C3A" opacity="0.3" />
      <circle cx="280" cy="40" r="1.5" fill="#C4622D" opacity="0.4" />
      <circle cx="480" cy="60" r="2" fill="#E8B84B" opacity="0.5" />
      <circle cx="680" cy="30" r="1.5" fill="#2C2C2C" opacity="0.2" />
    </svg>
  );
}
