import React from "react";

interface DoodleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: "email" | "password" | "user";
}

/**
 * DoodleInput — A paper-style input with bottom-border-only styling,
 * hand-drawn SVG icon prefix, and cream textured background.
 */
export default function DoodleInput({
  label,
  icon,
  className = "",
  ...props
}: DoodleInputProps) {
  return (
    <div className={`relative ${className}`}>
      <label className="font-caveat text-sm text-charcoal/50 mb-1 block">
        {label}
      </label>
      <div className="relative flex items-center">
        {/* Hand-drawn SVG icon */}
        <div className="absolute left-0 bottom-2 w-5 h-5 text-charcoal/30">
          {icon === "email" && <EnvelopeIcon />}
          {icon === "password" && <LockIcon />}
          {icon === "user" && <UserIcon />}
        </div>

        <input
          className={`
            w-full bg-transparent
            pl-7 pr-2 py-2
            font-sans text-base text-ink
            border-0 border-b-2 border-charcoal/10
            focus:border-terracotta focus:outline-none
            transition-colors duration-200
            placeholder:text-charcoal/25 placeholder:font-caveat
          `}
          {...props}
        />

        {/* Sketchy underline effect */}
        <svg aria-hidden="true"
          className="absolute bottom-0 left-0 w-full h-1 pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 200 4"
          fill="none"
        >
          <path
            d="M 0 2 C 30 0, 60 4, 100 2 C 140 0, 170 3, 200 1"
            stroke="#2C2C2C"
            strokeWidth="0.5"
            strokeLinecap="round"
            opacity="0.08"
          />
        </svg>
      </div>
    </div>
  );
}

function EnvelopeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="w-full h-full">
      <rect x="2" y="5" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 2 6 L 10 12 L 18 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="w-full h-full">
      <rect x="4" y="9" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 7 9 L 7 6 C 7 3, 10 1, 13 3 L 13 6 L 13 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <circle cx="10" cy="13.5" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="w-full h-full">
      <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M 3 18 C 3 14, 6 11, 10 11 C 14 11, 17 14, 17 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
