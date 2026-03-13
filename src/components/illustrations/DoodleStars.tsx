import React from "react";

interface DoodleStarsProps {
  className?: string;
  size?: number;
}

/**
 * DoodleStars — A decorative cluster of hand-drawn stars and sparkles.
 * Great as a floating decoration, rating indicator, or celebratory element.
 */
export default function DoodleStars({
  className = "",
  size = 160,
}: DoodleStarsProps) {
  return (
    <svg aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Large center star */}
      <path
        d="
          M 80 20
          L 88 55
          L 120 50
          L 95 70
          L 115 100
          L 82 82
          L 55 105
          L 65 72
          L 35 55
          L 70 55
          Z
        "
        fill="#E8B84B"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      {/* Star highlight */}
      <path
        d="M 78 30 C 75 42, 74 48, 72 55"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* Small star top-right */}
      <path
        d="M 130 25 L 133 18 L 136 25 L 142 27 L 136 30 L 133 37 L 130 30 L 124 27 Z"
        fill="#E8B84B"
        stroke="#2C2C2C"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Small star left */}
      <path
        d="M 22 75 L 25 68 L 28 75 L 34 77 L 28 80 L 25 87 L 22 80 L 16 77 Z"
        fill="#E8B84B"
        stroke="#2C2C2C"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Tiny star bottom-right */}
      <path
        d="M 135 105 L 137 100 L 139 105 L 143 106 L 139 108 L 137 112 L 135 108 L 131 106 Z"
        fill="#C4622D"
        stroke="#2C2C2C"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Sparkle dots */}
      <circle cx="110" cy="18" r="2" fill="#E8B84B" opacity="0.4" />
      <circle cx="145" cy="50" r="1.5" fill="#E8B84B" opacity="0.3" />
      <circle cx="18" cy="45" r="2" fill="#E8B84B" opacity="0.35" />
      <circle cx="50" cy="15" r="1.5" fill="#E8B84B" opacity="0.25" />

      {/* Twinkle lines */}
      <path d="M 148 35 L 152 35" stroke="#2C2C2C" strokeWidth="1" strokeLinecap="round" opacity="0.2" />
      <path d="M 150 33 L 150 37" stroke="#2C2C2C" strokeWidth="1" strokeLinecap="round" opacity="0.2" />

      <path d="M 10 60 L 14 60" stroke="#2C2C2C" strokeWidth="1" strokeLinecap="round" opacity="0.2" />
      <path d="M 12 58 L 12 62" stroke="#2C2C2C" strokeWidth="1" strokeLinecap="round" opacity="0.2" />

      {/* Bottom decorative arc / swirl */}
      <path
        d="M 55 115 C 65 125, 80 130, 95 128 C 110 126, 120 120, 125 112"
        stroke="#2C2C2C"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.12"
        strokeDasharray="4 4"
      />

      {/* Floating small circle accents */}
      <circle cx="60" cy="120" r="3" fill="#6B7C3A" opacity="0.2" />
      <circle cx="120" cy="118" r="2.5" fill="#8FAF72" opacity="0.2" />
      <circle cx="80" cy="130" r="2" fill="#C4622D" opacity="0.15" />
    </svg>
  );
}
