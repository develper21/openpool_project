import React from "react";

interface DoodleCoffeeProps {
  className?: string;
  size?: number;
  steaming?: boolean;
}

/**
 * DoodleCoffee — A charming hand-drawn coffee cup illustration.
 * Mid-century warmth with steam wisps and a cozy aesthetic.
 */
export default function DoodleCoffee({
  className = "",
  size = 180,
  steaming = true,
}: DoodleCoffeeProps) {
  return (
    <svg aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Saucer */}
      <ellipse
        cx="85"
        cy="155"
        rx="55"
        ry="10"
        fill="#EDE8DC"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Saucer highlight */}
      <path
        d="M 45 153 C 55 150, 75 148, 95 150"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* Cup body */}
      <path
        d="
          M 50 100
          L 55 148
          C 56 152, 60 155, 65 155
          L 105 155
          C 110 155, 114 152, 115 148
          L 120 100
          Z
        "
        fill="#EDE8DC"
        stroke="#2C2C2C"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cup rim — thicker */}
      <path
        d="M 48 100 L 122 100"
        stroke="#2C2C2C"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Coffee liquid */}
      <path
        d="M 52 105 L 118 105 L 115 140 C 114 144, 112 146, 108 146 L 62 146 C 58 146, 56 144, 55 140 Z"
        fill="#6B7C3A"
        fillOpacity="0.2"
      />

      {/* Handle */}
      <path
        d="M 120 108 C 135 108, 142 115, 142 125 C 142 135, 135 142, 120 142"
        stroke="#2C2C2C"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Handle inner */}
      <path
        d="M 120 114 C 130 114, 135 118, 135 125 C 135 132, 130 136, 120 136"
        stroke="#2C2C2C"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />

      {/* Decorative pattern on cup — mid-century dots */}
      <circle cx="70" cy="128" r="3" fill="#C4622D" opacity="0.4" />
      <circle cx="85" cy="128" r="3" fill="#E8B84B" opacity="0.4" />
      <circle cx="100" cy="128" r="3" fill="#6B7C3A" opacity="0.4" />
      {/* Diamond pattern */}
      <path d="M 70 118 L 73 115 L 76 118 L 73 121 Z" fill="#C4622D" opacity="0.25" />
      <path d="M 85 118 L 88 115 L 91 118 L 88 121 Z" fill="#E8B84B" opacity="0.25" />
      <path d="M 100 118 L 103 115 L 106 118 L 103 121 Z" fill="#6B7C3A" opacity="0.25" />

      {/* Steam wisps */}
      {steaming && (
        <>
          <path
            d="M 70 95 C 68 85, 72 78, 70 68 C 68 60, 72 52, 70 45"
            stroke="#2C2C2C"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.15"
          />
          <path
            d="M 85 92 C 87 82, 83 75, 85 65 C 87 57, 83 50, 85 42"
            stroke="#2C2C2C"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.12"
          />
          <path
            d="M 100 94 C 98 84, 102 77, 100 67 C 98 59, 102 52, 100 44"
            stroke="#2C2C2C"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.15"
          />
        </>
      )}

      {/* Cup highlight */}
      <path
        d="M 58 108 C 56 120, 57 135, 58 145"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.25"
      />
    </svg>
  );
}
