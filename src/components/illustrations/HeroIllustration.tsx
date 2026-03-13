import React from "react";

/**
 * HeroIllustration — A detailed mid-century style SVG illustration:
 * A scientist at a desk surrounded by towering stacks of papers (left),
 * connected by a doodle-style arrow/pipe to a clean summary page (right).
 * Includes atomic-age decorative elements (starbursts, dots, molecules).
 */
export default function HeroIllustration({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <svg aria-hidden="true"
        width="100%"
        height="100%"
        viewBox="0 0 700 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-[700px] mx-auto"
      >
        {/* ═══════════════════════════════════════
            LEFT SIDE — Scientist + Paper Stacks
           ═══════════════════════════════════════ */}

        {/* ── Desk ── */}
        <path
          d="M 30 260 C 32 258, 250 256, 260 260 L 258 265 L 32 265 Z"
          fill="#C4622D"
          stroke="#2C2C2C"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Desk legs */}
        <path d="M 50 265 L 48 300" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
        <path d="M 240 265 L 242 300" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />

        {/* ── Tall paper stack 1 (far left) ── */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect
            key={`stack1-${i}`}
            x={38 + (i % 2 === 0 ? 0 : 2)}
            y={150 + i * 13 - (7 - i) * 0}
            width={40 + (i % 2 === 0 ? 2 : -1)}
            height={11}
            rx={1}
            fill="#F5F0E8"
            stroke="#2C2C2C"
            strokeWidth="0.8"
            opacity={0.9}
          />
        ))}
        {/* text lines on some pages */}
        <path d="M 44 158 L 68 158" stroke="#2C2C2C" strokeWidth="0.4" opacity="0.2" />
        <path d="M 44 162 L 62 162" stroke="#2C2C2C" strokeWidth="0.4" opacity="0.15" />
        <path d="M 46 184 L 70 184" stroke="#2C2C2C" strokeWidth="0.4" opacity="0.2" />

        {/* ── Tall paper stack 2 (very tall, behind scientist) ── */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <rect
            key={`stack2-${i}`}
            x={90 + (i % 2 === 0 ? 1 : -1)}
            y={128 + i * 13}
            width={38 + (i % 3 === 0 ? 2 : 0)}
            height={11}
            rx={1}
            fill="#F5F0E8"
            stroke="#2C2C2C"
            strokeWidth="0.8"
            opacity={0.85}
          />
        ))}

        {/* ── Scientist ── */}
        {/* Head */}
        <circle
          cx="168"
          cy="175"
          r="18"
          fill="#F5F0E8"
          stroke="#2C2C2C"
          strokeWidth="1.5"
        />
        {/* Hair */}
        <path
          d="M 152 170 C 150 160, 158 152, 168 150 C 178 148, 186 155, 185 165"
          stroke="#2C2C2C"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="#2C2C2C"
          fillOpacity="0.8"
        />
        {/* Glasses */}
        <circle cx="162" cy="177" r="5" stroke="#2C2C2C" strokeWidth="1" fill="none" />
        <circle cx="175" cy="177" r="5" stroke="#2C2C2C" strokeWidth="1" fill="none" />
        <path d="M 167 177 L 170 177" stroke="#2C2C2C" strokeWidth="0.8" />
        <path d="M 157 177 L 152 175" stroke="#2C2C2C" strokeWidth="0.8" />
        <path d="M 180 177 L 185 175" stroke="#2C2C2C" strokeWidth="0.8" />
        {/* Smile */}
        <path
          d="M 164 183 C 166 186, 170 186, 172 183"
          stroke="#2C2C2C"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Body / lab coat */}
        <path
          d="M 150 193 C 148 200, 148 220, 150 255 L 186 255 C 188 220, 188 200, 186 193 C 182 190, 155 190, 150 193 Z"
          fill="#EDE8DC"
          stroke="#2C2C2C"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Coat lapel line */}
        <path d="M 168 193 L 168 240" stroke="#2C2C2C" strokeWidth="0.6" opacity="0.3" />
        {/* Coat pocket */}
        <path d="M 155 225 L 165 225 L 165 235 L 155 235 Z" stroke="#2C2C2C" strokeWidth="0.6" fill="none" opacity="0.25" />
        {/* Pen in pocket */}
        <path d="M 160 222 L 160 228" stroke="#C4622D" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

        {/* Arms — one reaching toward papers */}
        <path
          d="M 150 200 C 140 205, 125 215, 120 230 L 122 232 C 130 218, 142 210, 150 206"
          stroke="#2C2C2C"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right arm on desk */}
        <path
          d="M 186 205 C 195 210, 210 220, 218 245"
          stroke="#2C2C2C"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* ── Paper stack 3 (right of scientist, shorter) ── */}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={`stack3-${i}`}
            x={205 + (i % 2 === 0 ? 0 : 1)}
            y={210 + i * 10}
            width={35}
            height={8}
            rx={1}
            fill="#F5F0E8"
            stroke="#2C2C2C"
            strokeWidth="0.7"
            opacity={0.85}
          />
        ))}

        {/* ── Open laptop / screen on desk ── */}
        <rect x="140" y="240" width="45" height="18" rx="2" fill="#1A1A2E" stroke="#2C2C2C" strokeWidth="1" opacity="0.8" />
        <rect x="143" y="243" width="39" height="12" rx="1" fill="#8FAF72" fillOpacity="0.2" stroke="#8FAF72" strokeWidth="0.5" opacity="0.6" />
        {/* Screen text lines */}
        <path d="M 147 247 L 170 247" stroke="#8FAF72" strokeWidth="0.5" opacity="0.5" />
        <path d="M 147 250 L 165 250" stroke="#8FAF72" strokeWidth="0.5" opacity="0.4" />
        <path d="M 147 253 L 172 253" stroke="#8FAF72" strokeWidth="0.5" opacity="0.3" />

        {/* ── Coffee mug on desk ── */}
        <path
          d="M 225 242 L 227 258 C 227 260, 235 260, 235 258 L 237 242 Z"
          fill="#EDE8DC"
          stroke="#2C2C2C"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path d="M 237 246 C 240 246, 242 248, 242 250 C 242 252, 240 254, 237 254" stroke="#2C2C2C" strokeWidth="0.7" fill="none" />
        {/* Steam */}
        <path d="M 229 238 C 228 234, 230 232, 229 228" stroke="#2C2C2C" strokeWidth="0.5" strokeLinecap="round" opacity="0.15" />
        <path d="M 233 237 C 234 233, 232 231, 233 227" stroke="#2C2C2C" strokeWidth="0.5" strokeLinecap="round" opacity="0.12" />

        {/* ═══════════════════════════════════════
            CENTER — Arrow / Pipe connection
           ═══════════════════════════════════════ */}

        {/* Doodle-style pipe / process arrow */}
        <path
          d="M 270 200 C 290 198, 310 180, 340 180 C 370 180, 390 195, 420 195"
          stroke="#2C2C2C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="8 5"
          opacity="0.35"
        />

        {/* Funnel / processing icon in the middle */}
        <path
          d="M 330 160 L 360 160 L 350 180 L 340 180 Z"
          fill="#E8B84B"
          fillOpacity="0.25"
          stroke="#2C2C2C"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Funnel drip */}
        <path d="M 345 180 L 345 192" stroke="#2C2C2C" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 3" opacity="0.3" />

        {/* Swirl / processing symbol */}
        <circle cx="345" cy="150" r="3" fill="#E8B84B" opacity="0.4" />
        <path d="M 340 145 L 342 140" stroke="#E8B84B" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
        <path d="M 350 145 L 348 140" stroke="#E8B84B" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
        <path d="M 345 145 L 345 138" stroke="#E8B84B" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />

        {/* Arrow head */}
        <path
          d="M 415 188 L 425 195 L 415 202"
          stroke="#2C2C2C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.4"
        />

        {/* ═══════════════════════════════════════
            RIGHT SIDE — Clean Summary Output
           ═══════════════════════════════════════ */}

        {/* Summary page — clean, single page */}
        <rect
          x="440"
          y="100"
          width="180"
          height="220"
          rx="4"
          fill="#F5F0E8"
          stroke="#2C2C2C"
          strokeWidth="1.8"
        />
        {/* Page inner shadow / fold corner */}
        <path
          d="M 600 100 L 600 120 L 620 100"
          fill="#EDE8DC"
          stroke="#2C2C2C"
          strokeWidth="0.8"
          opacity="0.4"
        />

        {/* Title line */}
        <rect x="460" y="120" width="100" height="5" rx="2" fill="#6B7C3A" opacity="0.5" />

        {/* Subtitle */}
        <rect x="460" y="132" width="70" height="3" rx="1" fill="#2C2C2C" opacity="0.15" />

        {/* Body text lines — neat and organized */}
        <rect x="460" y="148" width="140" height="2.5" rx="1" fill="#2C2C2C" opacity="0.12" />
        <rect x="460" y="156" width="130" height="2.5" rx="1" fill="#2C2C2C" opacity="0.12" />
        <rect x="460" y="164" width="140" height="2.5" rx="1" fill="#2C2C2C" opacity="0.12" />
        <rect x="460" y="172" width="100" height="2.5" rx="1" fill="#2C2C2C" opacity="0.12" />

        {/* Key findings section */}
        <rect x="460" y="190" width="80" height="4" rx="1.5" fill="#C4622D" opacity="0.4" />
        {/* Bullet points */}
        <circle cx="466" cy="204" r="2" fill="#6B7C3A" opacity="0.35" />
        <rect x="474" y="202.5" width="110" height="2.5" rx="1" fill="#2C2C2C" opacity="0.1" />
        <circle cx="466" cy="214" r="2" fill="#6B7C3A" opacity="0.35" />
        <rect x="474" y="212.5" width="100" height="2.5" rx="1" fill="#2C2C2C" opacity="0.1" />
        <circle cx="466" cy="224" r="2" fill="#6B7C3A" opacity="0.35" />
        <rect x="474" y="222.5" width="115" height="2.5" rx="1" fill="#2C2C2C" opacity="0.1" />

        {/* Structured data box at bottom */}
        <rect
          x="460"
          y="240"
          width="140"
          height="55"
          rx="3"
          fill="#8FAF72"
          fillOpacity="0.08"
          stroke="#8FAF72"
          strokeWidth="0.8"
          opacity="0.6"
        />
        {/* JSON-like key value pairs */}
        <path d="M 468 252 L 480 252" stroke="#6B7C3A" strokeWidth="1" opacity="0.3" />
        <path d="M 484 252 L 520 252" stroke="#2C2C2C" strokeWidth="0.8" opacity="0.12" />
        <path d="M 468 262 L 485 262" stroke="#6B7C3A" strokeWidth="1" opacity="0.3" />
        <path d="M 489 262 L 530 262" stroke="#2C2C2C" strokeWidth="0.8" opacity="0.12" />
        <path d="M 468 272 L 478 272" stroke="#6B7C3A" strokeWidth="1" opacity="0.3" />
        <path d="M 482 272 L 540 272" stroke="#2C2C2C" strokeWidth="0.8" opacity="0.12" />
        <path d="M 468 282 L 490 282" stroke="#6B7C3A" strokeWidth="1" opacity="0.3" />
        <path d="M 494 282 L 535 282" stroke="#2C2C2C" strokeWidth="0.8" opacity="0.12" />

        {/* ✓ checkmark on summary */}
        <path
          d="M 605 290 L 610 296 L 622 280"
          stroke="#6B7C3A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />

        {/* ═══════════════════════════════════════
            ATOMIC-AGE DECORATIVE ELEMENTS
           ═══════════════════════════════════════ */}

        {/* Starburst top-left */}
        <g opacity="0.3">
          <path d="M 25 50 L 28 40 L 31 50 L 38 52 L 31 55 L 28 65 L 25 55 L 18 52 Z" fill="#E8B84B" />
          <circle cx="28" cy="52" r="2" fill="#E8B84B" />
        </g>

        {/* Starburst top-right */}
        <g opacity="0.25">
          <path d="M 650 30 L 653 22 L 656 30 L 662 32 L 656 35 L 653 43 L 650 35 L 644 32 Z" fill="#E8B84B" />
        </g>

        {/* Molecule — top center */}
        <g opacity="0.2">
          <circle cx="300" cy="50" r="6" stroke="#6B7C3A" strokeWidth="1.2" fill="none" />
          <circle cx="320" cy="40" r="4" stroke="#6B7C3A" strokeWidth="1" fill="#6B7C3A" fillOpacity="0.15" />
          <path d="M 305 47 L 317 42" stroke="#6B7C3A" strokeWidth="1" />
          <circle cx="285" cy="58" r="3" stroke="#6B7C3A" strokeWidth="0.8" fill="none" />
          <path d="M 295 53 L 287 57" stroke="#6B7C3A" strokeWidth="0.8" />
          <circle cx="308" cy="65" r="3.5" stroke="#6B7C3A" strokeWidth="0.8" fill="#6B7C3A" fillOpacity="0.1" />
          <path d="M 303 55 L 306 62" stroke="#6B7C3A" strokeWidth="0.8" />
        </g>

        {/* Molecule — bottom right */}
        <g opacity="0.15">
          <circle cx="660" cy="280" r="5" stroke="#C4622D" strokeWidth="1" fill="none" />
          <circle cx="678" cy="272" r="3.5" stroke="#C4622D" strokeWidth="0.8" fill="#C4622D" fillOpacity="0.15" />
          <path d="M 664 277 L 675 274" stroke="#C4622D" strokeWidth="0.8" />
          <circle cx="668" cy="295" r="3" stroke="#C4622D" strokeWidth="0.8" fill="none" />
          <path d="M 663 284 L 666 292" stroke="#C4622D" strokeWidth="0.8" />
        </g>

        {/* Dots cluster — left side */}
        <circle cx="20" cy="120" r="2" fill="#E8B84B" opacity="0.2" />
        <circle cx="28" cy="115" r="1.5" fill="#E8B84B" opacity="0.15" />
        <circle cx="15" cy="130" r="1" fill="#C4622D" opacity="0.15" />

        {/* Dots cluster — right side */}
        <circle cx="680" cy="150" r="2" fill="#6B7C3A" opacity="0.2" />
        <circle cx="688" cy="160" r="1.5" fill="#6B7C3A" opacity="0.15" />

        {/* Small flask icon — top right area */}
        <g opacity="0.15" transform="translate(580, 45) scale(0.6)">
          <path
            d="M 16 8 L 16 16 C 16 18, 8 24, 7 30 C 6 35, 10 38, 20 38 C 30 38, 34 35, 33 30 C 32 24, 24 18, 24 16 L 24 8"
            stroke="#1A1A2E"
            strokeWidth="1.5"
            fill="none"
          />
          <path d="M 14 8 L 26 8" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Dotted path — bottom decorative */}
        <path
          d="M 10 310 C 60 305, 120 315, 200 308 C 280 301, 400 315, 500 310 C 580 305, 640 312, 690 308"
          stroke="#2C2C2C"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeDasharray="2 6"
          opacity="0.1"
        />

        {/* Starburst — near summary */}
        <g opacity="0.2">
          <circle cx="430" cy="110" r="3" fill="#E8B84B" />
          <path d="M 430 104 L 430 100" stroke="#E8B84B" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M 435 106 L 438 103" stroke="#E8B84B" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M 436 112 L 439 114" stroke="#E8B84B" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M 425 106 L 422 103" stroke="#E8B84B" strokeWidth="0.8" strokeLinecap="round" />
        </g>

        {/* Small atom orbits */}
        <g opacity="0.12" transform="translate(50, 80)">
          <ellipse cx="15" cy="15" rx="15" ry="6" stroke="#6B7C3A" strokeWidth="0.8" fill="none" transform="rotate(-30 15 15)" />
          <ellipse cx="15" cy="15" rx="15" ry="6" stroke="#6B7C3A" strokeWidth="0.8" fill="none" transform="rotate(30 15 15)" />
          <circle cx="15" cy="15" r="2.5" fill="#6B7C3A" opacity="0.3" />
        </g>
      </svg>

      {/* ── "your output ✦" annotation ── */}
      <div className="absolute bottom-4 right-[10%] md:right-[15%] flex items-end gap-1">
        {/* Annotation arrow */}
        <svg aria-hidden="true"
          width="60"
          height="40"
          viewBox="0 0 60 40"
          fill="none"
          className="translate-y-1"
        >
          <path
            d="M 5 35 C 15 30, 25 15, 45 8"
            stroke="#2C2C2C"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.35"
          />
          <path
            d="M 40 5 L 48 7 L 42 13"
            stroke="#2C2C2C"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
          />
        </svg>
        <span className="font-caveat text-sm text-charcoal/50 whitespace-nowrap">
          your output ✦
        </span>
      </div>
    </div>
  );
}
