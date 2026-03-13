import React from "react";

/**
 * MagnifyingGlassCatalog — Hand-drawn SVG illustration: a magnifying glass over a database/catalog.
 * Used in the "By PubMed ID" card.
 */
export default function MagnifyingGlassCatalog({
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
      <circle cx="100" cy="90" r="70" fill="#6B7C3A" fillOpacity="0.06" />

      {/* ── Catalog / Database Stack ── */}
      <g opacity="0.8">
        {/* Drawers / Server racks */}
        {[0, 1, 2].map((i) => (
          <g key={`catalog-${i}`}>
            <rect
              x="30"
              y={70 + i * 28}
              width="100"
              height="24"
              rx="2"
              fill="#EDE8DC"
              stroke="#2C2C2C"
              strokeWidth="1.5"
            />
            <rect
              x="50"
              y={76 + i * 28}
              width="60"
              height="12"
              rx="1"
              fill="#F5F0E8"
              stroke="#2C2C2C"
              strokeWidth="1"
            />
            {/* Tiny label/handle */}
            <path
              d={`M 75 ${82 + i * 28} L 85 ${82 + i * 28}`}
              stroke="#C4622D"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>
        ))}
        {/* Papers sticking out of top drawer */}
        <path d="M 45 70 C 45 60, 50 50, 60 55" stroke="#2C2C2C" strokeWidth="1.2" fill="none" />
        <path d="M 60 70 C 60 55, 70 45, 80 50" stroke="#2C2C2C" strokeWidth="1.2" fill="none" />
      </g>

      {/* ── Magnifying Glass ── */}
      <g>
        {/* Handle */}
        <path
          d="M 140 120 L 165 145 C 168 148, 168 152, 165 155 L 160 160 C 157 163, 153 163, 150 160 L 125 135"
          fill="#C4622D"
          stroke="#2C2C2C"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Glass Frame */}
        <circle
          cx="110"
          cy="90"
          r="35"
          fill="#E8B84B"
          fillOpacity="0.1"
          stroke="#2C2C2C"
          strokeWidth="2.5"
        />
        <circle
          cx="110"
          cy="90"
          r="30"
          stroke="#2C2C2C"
          strokeWidth="0.8"
          strokeDasharray="4 4"
          opacity="0.4"
        />
        {/* Glass reflection */}
        <path
          d="M 90 75 C 95 70, 105 68, 115 72"
          stroke="#F5F0E8"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.8"
        />
        {/* Floating crosshair / target inside glass */}
        <path d="M 110 80 L 110 100" stroke="#6B7C3A" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <path d="M 100 90 L 120 90" stroke="#6B7C3A" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </g>

      {/* ── Decorative Doodles ── */}
      {/* Starburst */}
      <path d="M 25 35 L 27 28 L 29 35 L 36 37 L 29 39 L 27 46 L 25 39 L 18 37 Z" fill="#E8B84B" opacity="0.6" />
      <path d="M 170 60 L 171 55 L 173 60 L 178 61 L 173 62 L 171 67 L 170 62 L 165 61 Z" fill="#E8B84B" opacity="0.3" />
      {/* Search dots */}
      <circle cx="165" cy="110" r="2" fill="#6B7C3A" opacity="0.4" />
      <circle cx="178" cy="100" r="1.5" fill="#6B7C3A" opacity="0.3" />
      <circle cx="150" cy="95" r="1.5" fill="#6B7C3A" opacity="0.2" />
    </svg>
  );
}
