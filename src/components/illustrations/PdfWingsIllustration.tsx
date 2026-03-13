import React from "react";

/**
 * PdfWingsIllustration — Hand-drawn SVG illustration: a PDF document
 * with wings flying upward, papers swirling around it, atomic starbursts.
 */
export default function PdfWingsIllustration({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 200 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* ── Background orbit / decoration ── */}
      <circle cx="100" cy="100" r="60" fill="#6B7C3A" fillOpacity="0.05" />
      <ellipse cx="100" cy="100" rx="70" ry="25" stroke="#2C2C2C" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.2" transform="rotate(-15, 100, 100)" />
      
      {/* ── Swirling Background Papers ── */}
      <g opacity="0.5">
        <path d="M 40 80 C 35 70, 45 50, 60 45" fill="none" stroke="#2C2C2C" strokeWidth="1" strokeDasharray="2 3" />
        <rect x="25" y="65" width="20" height="26" rx="1" fill="#FFFDF8" stroke="#2C2C2C" strokeWidth="1" transform="rotate(-30, 35, 78)" />
        
        <path d="M 160 50 C 170 60, 165 80, 145 90" fill="none" stroke="#2C2C2C" strokeWidth="1" strokeDasharray="2 3" />
        <rect x="150" y="45" width="18" height="24" rx="1" fill="#FFFDF8" stroke="#2C2C2C" strokeWidth="1" transform="rotate(25, 159, 57)" />
        
        <rect x="65" y="150" width="22" height="28" rx="1" fill="#FFFDF8" stroke="#2C2C2C" strokeWidth="1" transform="rotate(15, 76, 164)" />
      </g>

      {/* ── Main PDF Document ── */}
      <g transform="translate(65, 45)">
        {/* Glow behind */}
        <rect x="-5" y="-5" width="80" height="95" rx="6" fill="#E8B84B" fillOpacity="0.15" filter="blur(4px)" />
        
        <rect x="0" y="0" width="70" height="85" rx="3" fill="#EDE8DC" stroke="#2C2C2C" strokeWidth="2" />
        <path d="M 50 0 L 50 20 L 70 0 Z" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.5" strokeLinejoin="round" />
        
        {/* PDF Badge */}
        <rect x="15" y="30" width="40" height="20" rx="3" fill="#6B7C3A" fillOpacity="0.15" stroke="#6B7C3A" strokeWidth="1.5" />
        <text x="35" y="44" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fontWeight="bold" fill="#6B7C3A">
          PDF
        </text>

        {/* Squiggly abstract text lines */}
        <path d="M 15 60 L 55 60" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        <path d="M 15 70 L 45 70" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      </g>

      {/* ── Left Wing ── */}
      <g transform="translate(45, 75)">
        <path d="M 20 15 C 5 5, -10 -10, 5 -20 C 15 -10, 10 5, 20 15 Z" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M 20 15 C 0 0, -15 -10, 0 -30 C 10 -15, 15 0, 20 15 Z" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M 20 15 C -5 5, -25 5, -10 -15 C 0 -5, 10 10, 20 15 Z" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M -5 -10 C 5 0, 15 10, 20 15" stroke="#2C2C2C" strokeWidth="1" opacity="0.4" />
      </g>

      {/* ── Right Wing ── */}
      <g transform="translate(155, 75) scale(-1, 1)">
        <path d="M 20 15 C 5 5, -10 -10, 5 -20 C 15 -10, 10 5, 20 15 Z" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M 20 15 C 0 0, -15 -10, 0 -30 C 10 -15, 15 0, 20 15 Z" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M 20 15 C -5 5, -25 5, -10 -15 C 0 -5, 10 10, 20 15 Z" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M -5 -10 C 5 0, 15 10, 20 15" stroke="#2C2C2C" strokeWidth="1" opacity="0.4" />
      </g>

      {/* ── Dash lines showing upward motion ── */}
      <path d="M 80 150 L 80 170" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 6" opacity="0.3" />
      <path d="M 120 145 L 120 165" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 6" opacity="0.3" />
      <path d="M 100 135 L 100 175" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6 8" opacity="0.4" />

      {/* ── Atomic Starbursts ── */}
      <path d="M 50 30 L 52 23 L 54 30 L 61 32 L 54 34 L 52 41 L 50 34 L 43 32 Z" fill="#E8B84B" opacity="0.8" />
      <path d="M 145 130 L 146 125 L 148 130 L 153 131 L 148 132 L 146 137 L 145 132 L 140 131 Z" fill="#C4622D" opacity="0.5" />
      <path d="M 160 20 L 161.5 16 L 163 20 L 167 21.5 L 163 23 L 161.5 27 L 160 23 L 156 21.5 Z" fill="#8FAF72" opacity="0.6" />

      {/* Tiny stars */}
      <path d="M 30 110 L 32 108 L 34 110 L 32 112 Z" fill="#2C2C2C" opacity="0.3" />
      <path d="M 125 15 L 127 13 L 129 15 L 127 17 Z" fill="#2C2C2C" opacity="0.3" />
    </svg>
  );
}
