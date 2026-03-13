import React from "react";

/**
 * ClipboardIllustration — A clipboard with a checklist, atomic starbursts,
 * and a "VERIFIED" stamp. Used in the "What You Get Back" section.
 */
export default function ClipboardIllustration({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 280 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* ── Clipboard body ── */}
      <rect
        x="40"
        y="40"
        width="190"
        height="260"
        rx="6"
        fill="#EDE8DC"
        stroke="#2C2C2C"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* ── Clipboard clip (top) ── */}
      <rect
        x="95"
        y="25"
        width="80"
        height="30"
        rx="5"
        fill="#8FAF72"
        fillOpacity="0.3"
        stroke="#2C2C2C"
        strokeWidth="1.5"
      />
      <rect
        x="110"
        y="30"
        width="50"
        height="12"
        rx="3"
        fill="#6B7C3A"
        fillOpacity="0.2"
        stroke="#2C2C2C"
        strokeWidth="1"
      />

      {/* ── Page inside clipboard ── */}
      <rect
        x="55"
        y="65"
        width="160"
        height="220"
        rx="3"
        fill="#F5F0E8"
        stroke="#2C2C2C"
        strokeWidth="1"
      />

      {/* ── Title ── */}
      <rect x="70" y="78" width="90" height="6" rx="2" fill="#6B7C3A" opacity="0.4" />
      <rect x="70" y="90" width="60" height="3.5" rx="1" fill="#2C2C2C" opacity="0.12" />

      {/* ── Checklist items ── */}
      {/* Item 1: keyFindings */}
      <rect x="70" y="108" width="14" height="14" rx="3" stroke="#6B7C3A" strokeWidth="1.5" fill="#6B7C3A" fillOpacity="0.05" />
      <path d="M 73 115 L 77 120 L 82 110" stroke="#6B7C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      <rect x="92" y="110" width="100" height="3.5" rx="1" fill="#2C2C2C" opacity="0.12" />
      <rect x="92" y="117" width="75" height="3" rx="1" fill="#2C2C2C" opacity="0.08" />

      {/* Item 2: methodology */}
      <rect x="70" y="136" width="14" height="14" rx="3" stroke="#6B7C3A" strokeWidth="1.5" fill="#6B7C3A" fillOpacity="0.05" />
      <path d="M 73 143 L 77 148 L 82 138" stroke="#6B7C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      <rect x="92" y="138" width="90" height="3.5" rx="1" fill="#2C2C2C" opacity="0.12" />
      <rect x="92" y="145" width="110" height="3" rx="1" fill="#2C2C2C" opacity="0.08" />

      {/* Item 3: conclusions */}
      <rect x="70" y="164" width="14" height="14" rx="3" stroke="#6B7C3A" strokeWidth="1.5" fill="#6B7C3A" fillOpacity="0.05" />
      <path d="M 73 171 L 77 176 L 82 166" stroke="#6B7C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      <rect x="92" y="166" width="105" height="3.5" rx="1" fill="#2C2C2C" opacity="0.12" />
      <rect x="92" y="173" width="80" height="3" rx="1" fill="#2C2C2C" opacity="0.08" />

      {/* Item 4: limitations */}
      <rect x="70" y="192" width="14" height="14" rx="3" stroke="#6B7C3A" strokeWidth="1.5" fill="#6B7C3A" fillOpacity="0.05" />
      <path d="M 73 199 L 77 204 L 82 194" stroke="#6B7C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      <rect x="92" y="194" width="95" height="3.5" rx="1" fill="#2C2C2C" opacity="0.12" />
      <rect x="92" y="201" width="70" height="3" rx="1" fill="#2C2C2C" opacity="0.08" />

      {/* ── Confidence score bar ── */}
      <rect x="70" y="225" width="130" height="8" rx="3" fill="#6B7C3A" fillOpacity="0.08" stroke="#6B7C3A" strokeWidth="0.5" />
      <rect x="70" y="225" width="112" height="8" rx="3" fill="#6B7C3A" fillOpacity="0.2" />
      <text x="205" y="232" fontFamily="'DM Sans', sans-serif" fontSize="7" fill="#6B7C3A" opacity="0.5">
        96%
      </text>

      {/* ── Status line ── */}
      <rect x="70" y="245" width="45" height="14" rx="3" fill="#6B7C3A" fillOpacity="0.12" stroke="#6B7C3A" strokeWidth="0.8" />
      <text x="92" y="255" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="9" fill="#6B7C3A" opacity="0.7">
        complete
      </text>

      {/* ── VERIFIED Stamp ── */}
      <g transform="rotate(-12, 165, 255)">
        <rect
          x="125"
          y="240"
          width="80"
          height="30"
          rx="3"
          fill="#C4622D"
          fillOpacity="0.08"
          stroke="#C4622D"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.7"
        />
        <text
          x="165"
          y="260"
          textAnchor="middle"
          fontFamily="'Caveat', cursive"
          fontSize="16"
          fontWeight="bold"
          fill="#C4622D"
          opacity="0.75"
        >
          VERIFIED
        </text>
      </g>

      {/* ═══ Atomic Starbursts ═══ */}

      {/* Starburst — top left */}
      <g opacity="0.3">
        <path d="M 20 60 L 22 52 L 24 60 L 30 62 L 24 64 L 22 72 L 20 64 L 14 62 Z" fill="#E8B84B" />
        <circle cx="22" cy="62" r="2" fill="#E8B84B" opacity="0.6" />
      </g>

      {/* Starburst — top right */}
      <g opacity="0.25">
        <path d="M 252 48 L 254 42 L 256 48 L 262 50 L 256 52 L 254 58 L 252 52 L 246 50 Z" fill="#E8B84B" />
        <path d="M 254 44 L 254 40" stroke="#E8B84B" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M 260 48 L 264 46" stroke="#E8B84B" strokeWidth="0.8" strokeLinecap="round" />
      </g>

      {/* Starburst — bottom right */}
      <g opacity="0.2">
        <path d="M 260 270 L 262 264 L 264 270 L 269 271 L 264 273 L 262 279 L 260 273 L 255 271 Z" fill="#E8B84B" />
      </g>

      {/* Atom orbit — left side */}
      <g opacity="0.12" transform="translate(5, 180)">
        <ellipse cx="12" cy="12" rx="12" ry="5" stroke="#6B7C3A" strokeWidth="0.8" fill="none" transform="rotate(-25 12 12)" />
        <ellipse cx="12" cy="12" rx="12" ry="5" stroke="#6B7C3A" strokeWidth="0.8" fill="none" transform="rotate(25 12 12)" />
        <circle cx="12" cy="12" r="2" fill="#6B7C3A" opacity="0.3" />
      </g>

      {/* Atom orbit — right side */}
      <g opacity="0.1" transform="translate(248, 140)">
        <ellipse cx="10" cy="10" rx="10" ry="4" stroke="#C4622D" strokeWidth="0.7" fill="none" transform="rotate(-30 10 10)" />
        <ellipse cx="10" cy="10" rx="10" ry="4" stroke="#C4622D" strokeWidth="0.7" fill="none" transform="rotate(30 10 10)" />
        <circle cx="10" cy="10" r="1.5" fill="#C4622D" opacity="0.3" />
      </g>

      {/* Floating dots */}
      <circle cx="15" cy="120" r="2" fill="#E8B84B" opacity="0.15" />
      <circle cx="265" cy="100" r="1.5" fill="#6B7C3A" opacity="0.15" />
      <circle cx="10" cy="260" r="1.5" fill="#C4622D" opacity="0.12" />
      <circle cx="270" cy="220" r="2" fill="#E8B84B" opacity="0.12" />
    </svg>
  );
}
