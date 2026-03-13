import React from "react";

interface DoodleCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * DoodleCard — A card with a hand-drawn, slightly wobbly SVG border.
 * Gives a playful, sketched aesthetic inspired by mid-century illustration.
 */
export default function DoodleCard({
  children,
  className = "",
}: DoodleCardProps) {
  return (
    <div className={`relative p-6 group transition-all duration-200 ease-out hover:-translate-y-[3px] hover:shadow-[0_12px_24px_-8px_rgba(26,26,46,0.2)] rounded ${className}`}>
      {/* Hand-drawn wobbly border SVG — sits behind content */}
      <svg aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="
            M 6 4
            C 30 2, 70 6, 100 3
            C 130 0, 170 5, 196 4
            C 198 30, 195 70, 197 100
            C 199 130, 196 170, 196 196
            C 170 198, 130 194, 100 197
            C 70 200, 30 195, 4 196
            C 2 170, 5 130, 3 100
            C 1 70, 4 30, 6 4
            Z
          "
          stroke="#2C2C2C"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          fill="#EDE8DC"
          className="transition-all duration-300"
        />
      </svg>

      {/* Card content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
