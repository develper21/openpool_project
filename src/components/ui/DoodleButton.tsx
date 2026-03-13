import React from "react";

interface DoodleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
}

/**
 * DoodleButton — A button with a sketchy underline/border effect.
 * The hand-drawn SVG underline and slight rotation on hover
 * give it a playful, mid-century doodle feel.
 */
export default function DoodleButton({
  variant = "primary",
  children,
  className = "",
  ...props
}: DoodleButtonProps) {
  const base =
    "relative inline-flex items-center justify-center font-caveat text-lg font-bold px-6 py-2 transition-all duration-200 ease-out cursor-pointer select-none active:scale-95";

  const variants: Record<string, string> = {
    primary:
      "bg-terracotta text-cream hover:bg-terracotta/90 hover:-rotate-1",
    secondary:
      "bg-olive text-cream hover:bg-olive/90 hover:rotate-1",
    ghost:
      "bg-transparent text-ink hover:text-terracotta hover:-rotate-1",
  };

  return (
    <button
      className={`group ${base} ${variants[variant]} ${className} hover:scale-95`}
      {...props}
    >
      {/* Sketchy border SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="
            M 4 3
            C 40 1, 80 5, 100 2
            C 140 0, 170 4, 197 3
            C 199 15, 197 35, 198 57
            C 160 59, 120 56, 100 58
            C 60 60, 30 57, 3 57
            C 1 40, 3 20, 4 3
            Z
          "
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="opacity-60 transition-all duration-300 ease-out"
          style={{
            strokeDasharray: "600",
            strokeDashoffset: "0",
          }}
          // We apply the hover state via a group-hover class in Tailwind, but to animate dashoffset we can add a custom utility class or just inline style it via CSS. 
          // However, typical Tailwind way for dashoffset requires a custom class, let's just use regular CSS in globals.css for 'doodle-border' or pure tailwind.
        />
        <style>{`
          .group:hover .doodle-border {
            animation: doodleDraw 0.3s ease-out forwards;
          }
          @keyframes doodleDraw {
            0% { stroke-dashoffset: 600; }
            100% { stroke-dashoffset: 0; }
          }
        `}</style>
        <path
          d="
            M 4 3
            C 40 1, 80 5, 100 2
            C 140 0, 170 4, 197 3
            C 199 15, 197 35, 198 57
            C 160 59, 120 56, 100 58
            C 60 60, 30 57, 3 57
            C 1 40, 3 20, 4 3
            Z
          "
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="opacity-60 doodle-border"
          style={{ strokeDasharray: 600, strokeDashoffset: 600 }}
        />
      </svg>

      <span className="relative z-10">{children}</span>
    </button>
  );
}
