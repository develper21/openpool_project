import React from "react";

interface DoodleRocketProps {
  className?: string;
  size?: number;
}

/**
 * DoodleRocket — A retro mid-century style rocket ship illustration.
 * Perfect for "launch", "get started", or "deploy" sections.
 */
export default function DoodleRocket({
  className = "",
  size = 200,
}: DoodleRocketProps) {
  return (
    <svg aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Exhaust trail / smoke puffs */}
      <circle cx="100" cy="178" r="8" fill="#EDE8DC" stroke="#2C2C2C" strokeWidth="1" opacity="0.5" />
      <circle cx="92" cy="185" r="6" fill="#EDE8DC" stroke="#2C2C2C" strokeWidth="0.8" opacity="0.4" />
      <circle cx="108" cy="187" r="5" fill="#EDE8DC" stroke="#2C2C2C" strokeWidth="0.8" opacity="0.35" />
      <circle cx="95" cy="193" r="4" fill="#EDE8DC" stroke="#2C2C2C" strokeWidth="0.6" opacity="0.3" />

      {/* Flame — orange/mustard */}
      <path
        d="M 90 155 C 88 162, 85 170, 92 175 C 95 178, 100 180, 100 175 C 100 180, 105 178, 108 175 C 115 170, 112 162, 110 155 Z"
        fill="#E8B84B"
        stroke="#C4622D"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Inner flame */}
      <path
        d="M 95 155 C 94 160, 93 165, 97 170 C 99 172, 100 168, 100 170 C 100 168, 101 172, 103 170 C 107 165, 106 160, 105 155 Z"
        fill="#C4622D"
        opacity="0.7"
      />

      {/* Rocket body — hand-drawn */}
      <path
        d="
          M 100 20
          C 95 25, 82 45, 80 70
          C 78 90, 78 120, 80 140
          L 82 155
          L 118 155
          L 120 140
          C 122 120, 122 90, 120 70
          C 118 45, 105 25, 100 20
          Z
        "
        fill="#EDE8DC"
        stroke="#2C2C2C"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Window / porthole */}
      <circle
        cx="100"
        cy="80"
        r="14"
        fill="#8FAF72"
        fillOpacity="0.3"
        stroke="#2C2C2C"
        strokeWidth="1.5"
      />
      <circle
        cx="100"
        cy="80"
        r="10"
        fill="#8FAF72"
        fillOpacity="0.2"
        stroke="#2C2C2C"
        strokeWidth="1"
      />
      {/* Window highlight */}
      <path
        d="M 94 74 C 92 72, 93 70, 95 71"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Body stripe — terracotta */}
      <path
        d="M 83 110 L 117 110"
        stroke="#C4622D"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M 82 118 L 118 118"
        stroke="#C4622D"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Left fin */}
      <path
        d="M 80 130 C 70 135, 58 145, 55 155 C 58 158, 65 158, 70 155 C 75 150, 78 145, 80 140 Z"
        fill="#C4622D"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Right fin */}
      <path
        d="M 120 130 C 130 135, 142 145, 145 155 C 142 158, 135 158, 130 155 C 125 150, 122 145, 120 140 Z"
        fill="#C4622D"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Nose cone tip detail */}
      <path
        d="M 100 20 C 98 28, 96 35, 95 42"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* Rivets / dots on body */}
      <circle cx="88" cy="100" r="1.5" fill="#2C2C2C" opacity="0.25" />
      <circle cx="112" cy="100" r="1.5" fill="#2C2C2C" opacity="0.25" />
      <circle cx="88" cy="135" r="1.5" fill="#2C2C2C" opacity="0.25" />
      <circle cx="112" cy="135" r="1.5" fill="#2C2C2C" opacity="0.25" />

      {/* Star decorations around rocket */}
      <path d="M 40 40 L 42 35 L 44 40 L 48 42 L 44 44 L 42 48 L 40 44 L 36 42 Z" fill="#E8B84B" opacity="0.5" />
      <path d="M 155 55 L 157 51 L 159 55 L 162 56 L 159 58 L 157 62 L 155 58 L 152 56 Z" fill="#E8B84B" opacity="0.4" />
      <path d="M 35 100 L 36 97 L 38 100 L 40 101 L 38 102 L 36 105 L 35 102 L 32 101 Z" fill="#E8B84B" opacity="0.3" />
      <path d="M 162 105 L 163 103 L 164 105 L 166 106 L 164 107 L 163 109 L 162 107 L 160 106 Z" fill="#E8B84B" opacity="0.35" />
    </svg>
  );
}
