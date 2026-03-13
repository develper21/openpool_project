import React from "react";

/**
 * StepOutputIllustration — A clean document with bullet checkmarks and
 * a magnifying glass inspecting it. Represents the "output" step.
 */
export default function StepOutputIllustration({
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
      {/* ── Clean Summary Document ── */}
      <rect
        x="45"
        y="15"
        width="125"
        height="165"
        rx="4"
        fill="#F5F0E8"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Header bar */}
      <rect x="45" y="15" width="125" height="22" rx="4" fill="#6B7C3A" fillOpacity="0.12" />
      <path d="M 45 37 L 170 37" stroke="#6B7C3A" strokeWidth="0.5" opacity="0.3" />

      {/* Title line */}
      <rect x="60" y="22" width="70" height="5" rx="2" fill="#6B7C3A" opacity="0.4" />

      {/* ── Checklist rows ── */}
      {/* Row 1 */}
      <rect x="58" y="48" width="12" height="12" rx="2" stroke="#6B7C3A" strokeWidth="1.2" fill="#6B7C3A" fillOpacity="0.06" />
      <path d="M 61 54 L 64 58 L 68 50" stroke="#6B7C3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <rect x="78" y="50" width="75" height="3" rx="1" fill="#2C2C2C" opacity="0.12" />
      <rect x="78" y="56" width="55" height="2.5" rx="1" fill="#2C2C2C" opacity="0.08" />

      {/* Row 2 */}
      <rect x="58" y="70" width="12" height="12" rx="2" stroke="#6B7C3A" strokeWidth="1.2" fill="#6B7C3A" fillOpacity="0.06" />
      <path d="M 61 76 L 64 80 L 68 72" stroke="#6B7C3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <rect x="78" y="72" width="68" height="3" rx="1" fill="#2C2C2C" opacity="0.12" />
      <rect x="78" y="78" width="80" height="2.5" rx="1" fill="#2C2C2C" opacity="0.08" />

      {/* Row 3 */}
      <rect x="58" y="92" width="12" height="12" rx="2" stroke="#6B7C3A" strokeWidth="1.2" fill="#6B7C3A" fillOpacity="0.06" />
      <path d="M 61 98 L 64 102 L 68 94" stroke="#6B7C3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <rect x="78" y="94" width="72" height="3" rx="1" fill="#2C2C2C" opacity="0.12" />
      <rect x="78" y="100" width="60" height="2.5" rx="1" fill="#2C2C2C" opacity="0.08" />

      {/* Row 4 */}
      <rect x="58" y="114" width="12" height="12" rx="2" stroke="#6B7C3A" strokeWidth="1.2" fill="#6B7C3A" fillOpacity="0.06" />
      <path d="M 61 120 L 64 124 L 68 116" stroke="#6B7C3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <rect x="78" y="116" width="78" height="3" rx="1" fill="#2C2C2C" opacity="0.12" />
      <rect x="78" y="122" width="52" height="2.5" rx="1" fill="#2C2C2C" opacity="0.08" />

      {/* ── Structured data block at bottom of document ── */}
      <rect
        x="58"
        y="138"
        width="100"
        height="30"
        rx="3"
        fill="#8FAF72"
        fillOpacity="0.06"
        stroke="#8FAF72"
        strokeWidth="0.6"
      />
      <path d="M 65 148 L 78 148" stroke="#6B7C3A" strokeWidth="0.8" opacity="0.3" />
      <path d="M 82 148 L 115 148" stroke="#2C2C2C" strokeWidth="0.6" opacity="0.1" />
      <path d="M 65 156 L 75 156" stroke="#6B7C3A" strokeWidth="0.8" opacity="0.3" />
      <path d="M 79 156 L 120 156" stroke="#2C2C2C" strokeWidth="0.6" opacity="0.1" />
      <path d="M 65 163 L 80 163" stroke="#6B7C3A" strokeWidth="0.8" opacity="0.3" />
      <path d="M 84 163 L 130 163" stroke="#2C2C2C" strokeWidth="0.6" opacity="0.1" />

      {/* ── Magnifying Glass ── */}
      {/* Glass circle */}
      <circle
        cx="160"
        cy="130"
        r="28"
        stroke="#2C2C2C"
        strokeWidth="2"
        fill="#E8B84B"
        fillOpacity="0.04"
      />
      {/* Glass highlight */}
      <path
        d="M 145 115 C 142 110, 145 105, 150 108"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.35"
      />
      {/* Handle */}
      <path
        d="M 180 150 L 200 175 C 202 178, 205 178, 207 175 L 205 172 L 185 148"
        stroke="#2C2C2C"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#C4622D"
        fillOpacity="0.3"
      />

      {/* ── "Verified" small stamp ── */}
      <g transform="rotate(-5, 155, 50)">
        <rect
          x="128"
          y="40"
          width="55"
          height="18"
          rx="2"
          fill="none"
          stroke="#6B7C3A"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <text
          x="155"
          y="53"
          textAnchor="middle"
          fontFamily="'Caveat', cursive"
          fontSize="10"
          fontWeight="bold"
          fill="#6B7C3A"
          opacity="0.6"
        >
          VERIFIED ✓
        </text>
      </g>

      {/* ── Decorative sparkles ── */}
      <path d="M 25 30 L 27 24 L 29 30 L 34 32 L 29 34 L 27 40 L 25 34 L 20 32 Z" fill="#E8B84B" opacity="0.3" />
      <path d="M 15 140 L 17 136 L 19 140 L 22 141 L 19 143 L 17 147 L 15 143 L 12 141 Z" fill="#E8B84B" opacity="0.2" />

      {/* Small dots */}
      <circle cx="30" cy="80" r="1.5" fill="#6B7C3A" opacity="0.15" />
      <circle cx="210" cy="50" r="1.5" fill="#C4622D" opacity="0.15" />
      <circle cx="22" cy="170" r="1" fill="#E8B84B" opacity="0.2" />
    </svg>
  );
}
