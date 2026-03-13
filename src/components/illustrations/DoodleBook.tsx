import React from "react";

interface DoodleBookProps {
  className?: string;
  size?: number;
  color?: string;
}

/**
 * DoodleBook — An open book with hand-drawn pages, perfect for
 * "learn", "docs", or "knowledge" sections. Mid-century library feel.
 */
export default function DoodleBook({
  className = "",
  size = 200,
  color = "#C4622D",
}: DoodleBookProps) {
  return (
    <svg aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 200 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Book shadow */}
      <ellipse
        cx="100"
        cy="160"
        rx="75"
        ry="8"
        fill="#2C2C2C"
        opacity="0.06"
      />

      {/* Left page */}
      <path
        d="
          M 100 35
          C 95 38, 50 40, 28 42
          C 25 42, 22 44, 22 47
          L 22 142
          C 22 145, 25 147, 28 147
          C 50 146, 95 145, 100 150
          Z
        "
        fill="#F5F0E8"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right page */}
      <path
        d="
          M 100 35
          C 105 38, 150 40, 172 42
          C 175 42, 178 44, 178 47
          L 178 142
          C 178 145, 175 147, 172 147
          C 150 146, 105 145, 100 150
          Z
        "
        fill="#F5F0E8"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Spine / center fold */}
      <path
        d="M 100 35 L 100 150"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Book cover edges — slightly visible */}
      <path
        d="M 20 48 L 20 143 C 20 146, 22 148, 25 149 L 28 149"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M 180 48 L 180 143 C 180 146, 178 148, 175 149 L 172 149"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Left page text lines — hand-drawn / wobbly */}
      <path d="M 35 60 C 45 59, 65 61, 90 60" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" opacity="0.15" />
      <path d="M 35 70 C 50 69, 70 71, 85 70" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" opacity="0.15" />
      <path d="M 35 80 C 48 79, 68 81, 90 80" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" opacity="0.15" />
      <path d="M 35 90 C 42 89, 60 91, 78 90" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" opacity="0.15" />
      <path d="M 35 100 C 50 99, 72 101, 90 100" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" opacity="0.15" />
      <path d="M 35 110 C 45 109, 62 111, 82 110" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" opacity="0.15" />
      <path d="M 35 120 C 48 119, 68 121, 90 120" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" opacity="0.15" />
      <path d="M 35 130 C 50 129, 65 131, 80 130" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" opacity="0.15" />

      {/* Right page text lines */}
      <path d="M 110 60 C 125 59, 145 61, 165 60" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" opacity="0.15" />
      <path d="M 110 70 C 128 69, 148 71, 160 70" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" opacity="0.15" />
      <path d="M 110 80 C 122 79, 142 81, 165 80" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" opacity="0.15" />
      <path d="M 110 90 C 130 89, 150 91, 158 90" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" opacity="0.15" />
      <path d="M 110 100 C 125 99, 148 101, 165 100" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" opacity="0.15" />
      <path d="M 110 110 C 122 109, 140 111, 162 110" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" opacity="0.15" />
      <path d="M 110 120 C 128 119, 150 121, 165 120" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" opacity="0.15" />
      <path d="M 110 130 C 125 129, 145 131, 155 130" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" opacity="0.15" />

      {/* Small doodle star on left page */}
      <path
        d="M 55 55 L 56 52 L 58 55 L 61 56 L 58 57 L 56 60 L 55 57 L 52 56 Z"
        fill="#E8B84B"
        opacity="0.5"
      />

      {/* Small heart doodle on right page */}
      <path
        d="M 140 52 C 142 48, 148 48, 148 52 C 148 56, 140 62, 140 62 C 140 62, 132 56, 132 52 C 132 48, 138 48, 140 52 Z"
        fill="#C4622D"
        opacity="0.25"
        stroke="#C4622D"
        strokeWidth="0.5"
      />

      {/* Bookmark ribbon */}
      <path
        d="M 96 35 L 96 25 L 92 30 L 88 25 L 88 35"
        fill={color}
        stroke="#2C2C2C"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
