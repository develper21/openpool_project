import React from "react";

interface DoodleLightbulbProps {
  className?: string;
  size?: number;
  glowing?: boolean;
}

/**
 * DoodleLightbulb — A mid-century style hand-drawn lightbulb.
 * Optionally shows a warm glow effect. Perfect for "ideas" or "tips" sections.
 */
export default function DoodleLightbulb({
  className = "",
  size = 180,
  glowing = true,
}: DoodleLightbulbProps) {
  return (
    <svg aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Glow effect */}
      {glowing && (
        <>
          <circle
            cx="90"
            cy="72"
            r="55"
            fill="#E8B84B"
            opacity="0.08"
          />
          <circle
            cx="90"
            cy="72"
            r="42"
            fill="#E8B84B"
            opacity="0.12"
          />

          {/* Radial glow lines */}
          <path d="M 90 12 L 90 5" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M 90 12 L 88 3" stroke="#E8B84B" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
          <path d="M 130 30 L 138 22" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M 50 30 L 42 22" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M 140 72 L 150 72" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M 40 72 L 30 72" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M 135 110 L 142 116" stroke="#E8B84B" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
          <path d="M 45 110 L 38 116" stroke="#E8B84B" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        </>
      )}

      {/* Bulb glass — wobbly hand-drawn shape */}
      <path
        d="
          M 75 120
          C 65 115, 52 100, 50 85
          C 48 68, 52 50, 62 40
          C 72 30, 82 25, 90 24
          C 98 25, 108 30, 118 40
          C 128 50, 132 68, 130 85
          C 128 100, 115 115, 105 120
          Z
        "
        fill="#E8B84B"
        fillOpacity="0.15"
        stroke="#2C2C2C"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Filament */}
      <path
        d="M 82 95 C 85 80, 80 70, 85 60 C 88 55, 90 58, 90 65"
        stroke="#E8B84B"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M 98 95 C 95 80, 100 70, 95 60 C 92 55, 90 58, 90 65"
        stroke="#E8B84B"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Filament connection */}
      <path
        d="M 82 95 L 82 120"
        stroke="#2C2C2C"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M 98 95 L 98 120"
        stroke="#2C2C2C"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Screw base */}
      <path
        d="M 75 120 L 105 120"
        stroke="#2C2C2C"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 77 126 L 103 126"
        stroke="#2C2C2C"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 79 132 L 101 132"
        stroke="#2C2C2C"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 82 138 L 98 138"
        stroke="#2C2C2C"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 85 144 L 95 144"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Screw threads — hand-drawn wavy lines */}
      <path
        d="M 75 120 C 76 123, 77 124, 77 126"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 105 120 C 104 123, 103 124, 103 126"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 77 126 C 78 129, 79 130, 79 132"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 103 126 C 102 129, 101 130, 101 132"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 79 132 C 80 135, 82 136, 82 138"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 101 132 C 100 135, 98 136, 98 138"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Glass highlight */}
      <path
        d="M 72 65 C 68 55, 72 45, 78 40"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}
