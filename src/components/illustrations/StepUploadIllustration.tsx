import React from "react";

/**
 * StepUploadIllustration — A hand drawing a paper/document with a PubMed ID stamp.
 * Represents the "upload / send" step in How It Works.
 */
export default function StepUploadIllustration({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 220 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* ── Paper / Document ── */}
      <rect
        x="55"
        y="20"
        width="120"
        height="155"
        rx="3"
        fill="#F5F0E8"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Folded corner */}
      <path
        d="M 155 20 L 155 40 L 175 20 Z"
        fill="#EDE8DC"
        stroke="#2C2C2C"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* Text lines on the paper */}
      <path d="M 70 50 L 145 50" stroke="#2C2C2C" strokeWidth="0.7" opacity="0.12" strokeLinecap="round" />
      <path d="M 70 58 L 155 58" stroke="#2C2C2C" strokeWidth="0.7" opacity="0.12" strokeLinecap="round" />
      <path d="M 70 66 L 140 66" stroke="#2C2C2C" strokeWidth="0.7" opacity="0.12" strokeLinecap="round" />
      <path d="M 70 74 L 150 74" stroke="#2C2C2C" strokeWidth="0.7" opacity="0.12" strokeLinecap="round" />
      <path d="M 70 82 L 130 82" stroke="#2C2C2C" strokeWidth="0.7" opacity="0.12" strokeLinecap="round" />
      <path d="M 70 90 L 155 90" stroke="#2C2C2C" strokeWidth="0.7" opacity="0.12" strokeLinecap="round" />
      <path d="M 70 98 L 142 98" stroke="#2C2C2C" strokeWidth="0.7" opacity="0.12" strokeLinecap="round" />

      {/* ── PubMed ID Stamp ── */}
      <g transform="rotate(-8, 120, 138)">
        <rect
          x="85"
          y="118"
          width="75"
          height="35"
          rx="3"
          fill="#C4622D"
          fillOpacity="0.12"
          stroke="#C4622D"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="0"
        />
        {/* Stamp text: PMID */}
        <text
          x="122"
          y="133"
          textAnchor="middle"
          fontFamily="'Caveat', cursive"
          fontSize="11"
          fontWeight="bold"
          fill="#C4622D"
          opacity="0.85"
        >
          PMID
        </text>
        <text
          x="122"
          y="147"
          textAnchor="middle"
          fontFamily="'DM Sans', sans-serif"
          fontSize="8"
          fill="#C4622D"
          opacity="0.6"
        >
          38291047
        </text>
      </g>

      {/* ── Hand holding / placing the paper ── */}
      {/* Wrist / arm */}
      <path
        d="M 10 160 C 15 148, 25 140, 35 135 C 40 132, 45 130, 50 130"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Palm */}
      <path
        d="M 35 135 C 38 128, 45 122, 52 120 C 56 118, 60 120, 58 125 L 50 130 C 48 133, 42 138, 35 135 Z"
        fill="#F5F0E8"
        stroke="#2C2C2C"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Fingers gripping paper */}
      <path
        d="M 52 120 C 55 115, 58 112, 55 108"
        stroke="#2C2C2C"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 56 118 C 60 114, 63 111, 60 107"
        stroke="#2C2C2C"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Thumb */}
      <path
        d="M 50 130 C 48 126, 50 122, 54 124"
        stroke="#2C2C2C"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* ── Upload arrow ── */}
      <path
        d="M 190 90 L 190 55"
        stroke="#6B7C3A"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="4 3"
        opacity="0.5"
      />
      <path
        d="M 185 60 L 190 50 L 195 60"
        stroke="#6B7C3A"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />

      {/* Decorative star */}
      <path
        d="M 200 30 L 202 24 L 204 30 L 210 32 L 204 34 L 202 40 L 200 34 L 194 32 Z"
        fill="#E8B84B"
        opacity="0.35"
      />
    </svg>
  );
}
