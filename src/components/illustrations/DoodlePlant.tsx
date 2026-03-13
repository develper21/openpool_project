import React from "react";

interface DoodlePlantProps {
  className?: string;
  size?: number;
  color?: string;
}

/**
 * DoodlePlant — A charming mid-century style potted plant illustration.
 * Hand-drawn aesthetic with organic leaf shapes and a terracotta pot.
 */
export default function DoodlePlant({
  className = "",
  size = 200,
  color = "#6B7C3A",
}: DoodlePlantProps) {
  return (
    <svg aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Pot */}
      <path
        d="M 70 150 C 68 148, 62 140, 65 135 L 75 170 C 76 174, 78 178, 85 180 L 115 180 C 122 178, 124 174, 125 170 L 135 135 C 138 140, 132 148, 130 150 Z"
        fill="#C4622D"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Pot rim */}
      <path
        d="M 62 135 C 60 132, 62 128, 65 127 L 135 127 C 138 128, 140 132, 138 135 L 62 135 Z"
        fill="#C4622D"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Pot highlight */}
      <path
        d="M 80 140 L 85 170"
        stroke="#E8B84B"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Stem */}
      <path
        d="M 100 127 C 98 115, 97 105, 100 90"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Branch left */}
      <path
        d="M 98 110 C 90 105, 75 100, 65 95"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Branch right */}
      <path
        d="M 100 100 C 110 95, 125 92, 135 88"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Branch top-left */}
      <path
        d="M 99 95 C 92 85, 82 75, 72 68"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Leaf 1 — left droopy */}
      <path
        d="M 65 95 C 55 85, 45 80, 38 82 C 35 90, 42 100, 55 100 C 58 99, 62 97, 65 95 Z"
        fill={color}
        stroke="#2C2C2C"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* Leaf vein */}
      <path
        d="M 64 95 C 55 90, 48 87, 42 86"
        stroke="#2C2C2C"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* Leaf 2 — right */}
      <path
        d="M 135 88 C 145 80, 152 74, 150 68 C 142 65, 132 72, 128 82 C 130 85, 133 87, 135 88 Z"
        fill={color}
        stroke="#2C2C2C"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M 134 87 C 142 80, 147 75, 149 70"
        stroke="#2C2C2C"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* Leaf 3 — top-left large */}
      <path
        d="M 72 68 C 62 55, 50 42, 42 38 C 35 42, 38 58, 50 68 C 55 70, 65 70, 72 68 Z"
        fill={color}
        stroke="#2C2C2C"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M 70 67 C 58 55, 50 48, 44 42"
        stroke="#2C2C2C"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* Leaf 4 — top center */}
      <path
        d="M 100 90 C 95 72, 92 55, 95 38 C 102 35, 108 45, 108 60 C 107 72, 103 82, 100 90 Z"
        fill={color}
        stroke="#2C2C2C"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.95"
      />
      <path
        d="M 100 88 C 98 72, 97 58, 97 44"
        stroke="#2C2C2C"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* Leaf 5 — top right */}
      <path
        d="M 100 95 C 115 78, 130 60, 140 50 C 148 55, 142 70, 130 80 C 120 88, 108 93, 100 95 Z"
        fill={color}
        stroke="#2C2C2C"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M 102 93 C 118 78, 130 66, 138 55"
        stroke="#2C2C2C"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* Soil dots */}
      <circle cx="90" cy="130" r="1.5" fill="#2C2C2C" opacity="0.2" />
      <circle cx="100" cy="131" r="1" fill="#2C2C2C" opacity="0.15" />
      <circle cx="110" cy="130" r="1.5" fill="#2C2C2C" opacity="0.2" />
    </svg>
  );
}
