import React from "react";

/**
 * PdfUploadIllustration — Hand-drawn SVG illustration: a PDF document
 * with an upward upload arrow, surrounded by flying papers.
 */
export default function PdfUploadIllustration({
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
      {/* ── Background decoration ── */}
      <circle cx="100" cy="90" r="70" fill="#E8B84B" fillOpacity="0.06" />

      {/* ── Flying background papers ── */}
      {/* Paper 1 (Left) */}
      <g transform="translate(30, 40) rotate(-20) scale(0.6)" opacity="0.5">
        <rect x="0" y="0" width="40" height="50" rx="2" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.5" />
        <path d="M 10 10 L 30 10" stroke="#2C2C2C" strokeWidth="1" strokeLinecap="round" />
        <path d="M 10 20 L 25 20" stroke="#2C2C2C" strokeWidth="1" strokeLinecap="round" />
        <path d="M 10 30 L 30 30" stroke="#2C2C2C" strokeWidth="1" strokeLinecap="round" />
      </g>
      {/* Paper 2 (Right) */}
      <g transform="translate(130, 25) rotate(15) scale(0.5)" opacity="0.5">
        <rect x="0" y="0" width="40" height="50" rx="2" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.5" />
        <path d="M 10 10 L 25 10" stroke="#2C2C2C" strokeWidth="1" strokeLinecap="round" />
        <path d="M 10 20 L 30 20" stroke="#2C2C2C" strokeWidth="1" strokeLinecap="round" />
      </g>

      {/* ── Main PDF Document ── */}
      <g transform="rotate(3, 100, 100)">
        <rect
          x="65"
          y="50"
          width="70"
          height="90"
          rx="4"
          fill="#EDE8DC"
          stroke="#2C2C2C"
          strokeWidth="2"
        />
        {/* Folded corner */}
        <path
          d="M 115 50 L 115 70 L 135 50 Z"
          fill="#F5F0E8"
          stroke="#2C2C2C"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* PDF Label Tag */}
        <rect
          x="75"
          y="110"
          width="35"
          height="16"
          rx="3"
          fill="#C4622D"
          fillOpacity="0.15"
          stroke="#C4622D"
          strokeWidth="1.5"
        />
        <text
          x="92.5"
          y="122"
          textAnchor="middle"
          fontFamily="'DM Sans', sans-serif"
          fontSize="9"
          fontWeight="bold"
          fill="#C4622D"
        >
          PDF
        </text>
        {/* Text lines */}
        <path d="M 75 80 L 110 80" stroke="#2C2C2C" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        <path d="M 75 90 L 120 90" stroke="#2C2C2C" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        <path d="M 75 100 L 105 100" stroke="#2C2C2C" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      </g>

      {/* ── Overlay Upload Arrow ── */}
      <g transform="translate(0, 5)">
        <circle cx="140" cy="130" r="22" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.5" />
        <path
          d="M 140 142 L 140 118"
          stroke="#6B7C3A"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 132 126 L 140 118 L 148 126"
          stroke="#6B7C3A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Decorative dots / swoosh */}
      <path
        d="M 135 155 C 130 165, 110 165, 90 160 C 70 155, 60 140, 55 130"
        stroke="#2C2C2C"
        strokeWidth="1"
        strokeDasharray="4 6"
        strokeLinecap="round"
        opacity="0.3"
      />
      <circle cx="35" cy="110" r="1.5" fill="#C4622D" opacity="0.5" />
      <circle cx="45" cy="120" r="2" fill="#E8B84B" opacity="0.5" />
    </svg>
  );
}
