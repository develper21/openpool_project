import React from "react";

interface DoodleTagProps {
  children: React.ReactNode;
  color?: "olive" | "terracotta" | "mustard" | "sage" | "ink";
  className?: string;
}

/**
 * DoodleTag — A pill-shaped tag with a hand-stamped look.
 * Slight random rotation, rough SVG border, and a textured fill
 * create an authentic "rubber stamp" aesthetic.
 */
export default function DoodleTag({
  children,
  color = "olive",
  className = "",
}: DoodleTagProps) {
  const colorMap: Record<string, { bg: string; text: string; border: string }> =
    {
      olive: { bg: "bg-olive/15", text: "text-olive", border: "#6B7C3A" },
      terracotta: {
        bg: "bg-terracotta/15",
        text: "text-terracotta",
        border: "#C4622D",
      },
      mustard: {
        bg: "bg-mustard/15",
        text: "text-mustard",
        border: "#E8B84B",
      },
      sage: { bg: "bg-sage/15", text: "text-sage", border: "#8FAF72" },
      ink: { bg: "bg-ink/15", text: "text-ink", border: "#1A1A2E" },
    };

  const { bg, text, border } = colorMap[color];

  // Slight random rotation for hand-stamped feel
  const rotations = [
    "-rotate-1",
    "rotate-0",
    "rotate-1",
    "-rotate-[0.5deg]",
    "rotate-[0.5deg]",
  ];
  const rotation = rotations[Math.floor(children?.toString().length ?? 0) % rotations.length];

  return (
    <span
      className={`
        relative inline-flex items-center
        font-caveat text-sm font-semibold tracking-wide
        px-4 py-1
        ${bg} ${text} ${rotation}
        transition-transform duration-200
        hover:scale-105 hover:rotate-0
        ${className}
      `}
    >
      {/* Hand-stamped rough pill border */}
      <svg aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 120 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="
            M 16 3
            C 30 1, 50 4, 60 2
            C 80 0, 100 3, 106 5
            C 114 8, 118 14, 117 18
            C 116 24, 112 30, 106 33
            C 90 35, 70 32, 60 34
            C 40 36, 20 33, 14 31
            C 6 28, 2 22, 3 18
            C 4 12, 8 6, 16 3
            Z
          "
          stroke={border}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="opacity-70"
        />
      </svg>

      <span className="relative z-10">{children}</span>
    </span>
  );
}
