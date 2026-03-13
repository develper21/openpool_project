import React from "react";

/**
 * StepProcessIllustration — A brain with gears, circuits, and neural doodles.
 * Represents the "AI processing" step in How It Works.
 */
export default function StepProcessIllustration({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 220 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* ── Brain outline — wobbly hand-drawn ── */}
      <path
        d="
          M 110 30
          C 90 28, 70 35, 60 50
          C 48 68, 50 78, 45 88
          C 40 98, 38 108, 45 118
          C 50 128, 58 132, 65 138
          C 72 144, 80 148, 90 150
          C 100 152, 110 152, 120 150
          C 130 148, 140 142, 148 136
          C 155 130, 162 122, 168 112
          C 174 102, 172 90, 168 80
          C 164 68, 155 55, 145 45
          C 135 35, 125 30, 110 30
          Z
        "
        fill="#EDE8DC"
        stroke="#2C2C2C"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Brain fold lines — center divide */}
      <path
        d="M 108 35 C 105 55, 110 75, 108 95 C 106 115, 110 135, 108 150"
        stroke="#2C2C2C"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.2"
      />
      {/* Brain folds — left */}
      <path
        d="M 65 60 C 75 65, 85 58, 95 65"
        stroke="#2C2C2C"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.15"
      />
      <path
        d="M 55 85 C 65 80, 78 88, 90 82"
        stroke="#2C2C2C"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.15"
      />
      <path
        d="M 50 110 C 62 105, 75 112, 88 108"
        stroke="#2C2C2C"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.15"
      />
      {/* Brain folds — right */}
      <path
        d="M 120 55 C 132 60, 142 52, 155 58"
        stroke="#2C2C2C"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.15"
      />
      <path
        d="M 118 80 C 130 75, 145 82, 160 78"
        stroke="#2C2C2C"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.15"
      />
      <path
        d="M 122 108 C 135 102, 148 110, 162 105"
        stroke="#2C2C2C"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.15"
      />

      {/* ── Gear 1 (large, left) ── */}
      <g opacity="0.65">
        <circle cx="80" cy="85" r="14" stroke="#6B7C3A" strokeWidth="1.5" fill="#6B7C3A" fillOpacity="0.08" />
        <circle cx="80" cy="85" r="6" stroke="#6B7C3A" strokeWidth="1" fill="none" />
        {/* Gear teeth */}
        <path d="M 80 70 L 82 66 L 78 66 Z" fill="#6B7C3A" opacity="0.5" />
        <path d="M 80 100 L 82 104 L 78 104 Z" fill="#6B7C3A" opacity="0.5" />
        <path d="M 65 85 L 62 83 L 62 87 Z" fill="#6B7C3A" opacity="0.5" />
        <path d="M 95 85 L 98 83 L 98 87 Z" fill="#6B7C3A" opacity="0.5" />
        <path d="M 70 75 L 67 72 L 64 75 Z" fill="#6B7C3A" opacity="0.4" />
        <path d="M 90 95 L 93 98 L 96 95 Z" fill="#6B7C3A" opacity="0.4" />
        <path d="M 70 95 L 67 98 L 64 95 Z" fill="#6B7C3A" opacity="0.4" />
        <path d="M 90 75 L 93 72 L 96 75 Z" fill="#6B7C3A" opacity="0.4" />
      </g>

      {/* ── Gear 2 (smaller, right) ── */}
      <g opacity="0.55">
        <circle cx="140" cy="75" r="10" stroke="#C4622D" strokeWidth="1.2" fill="#C4622D" fillOpacity="0.06" />
        <circle cx="140" cy="75" r="4" stroke="#C4622D" strokeWidth="0.8" fill="none" />
        <path d="M 140 64 L 142 61 L 138 61 Z" fill="#C4622D" opacity="0.4" />
        <path d="M 140 86 L 142 89 L 138 89 Z" fill="#C4622D" opacity="0.4" />
        <path d="M 129 75 L 126 73 L 126 77 Z" fill="#C4622D" opacity="0.4" />
        <path d="M 151 75 L 154 73 L 154 77 Z" fill="#C4622D" opacity="0.4" />
      </g>

      {/* ── Gear 3 (tiny, connecting) ── */}
      <circle cx="100" cy="95" r="6" stroke="#E8B84B" strokeWidth="1" fill="#E8B84B" fillOpacity="0.08" opacity="0.5" />
      <circle cx="100" cy="95" r="2.5" stroke="#E8B84B" strokeWidth="0.7" fill="none" opacity="0.5" />

      {/* ── Circuit traces ── */}
      <path
        d="M 94 85 L 100 90"
        stroke="#6B7C3A"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M 106 92 L 130 78"
        stroke="#C4622D"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.3"
      />
      {/* Circuit paths — digital-looking */}
      <path
        d="M 70 120 L 70 130 L 90 130 L 90 125"
        stroke="#6B7C3A"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.25"
      />
      <path
        d="M 140 110 L 150 110 L 150 125 L 135 125"
        stroke="#C4622D"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.25"
      />
      {/* Circuit nodes */}
      <circle cx="90" cy="125" r="2" fill="#6B7C3A" opacity="0.3" />
      <circle cx="135" cy="125" r="2" fill="#C4622D" opacity="0.3" />
      <circle cx="70" cy="120" r="1.5" fill="#6B7C3A" opacity="0.3" />
      <circle cx="140" cy="110" r="1.5" fill="#C4622D" opacity="0.3" />

      {/* ── Neural connection dots inside brain ── */}
      <circle cx="75" cy="55" r="1.5" fill="#2C2C2C" opacity="0.12" />
      <circle cx="135" cy="100" r="1.5" fill="#2C2C2C" opacity="0.12" />
      <circle cx="95" cy="120" r="1.5" fill="#2C2C2C" opacity="0.12" />
      <circle cx="120" cy="60" r="1.5" fill="#2C2C2C" opacity="0.12" />
      {/* Neural paths */}
      <path d="M 76 56 L 93 62" stroke="#2C2C2C" strokeWidth="0.4" opacity="0.08" />
      <path d="M 121 61 L 136 72" stroke="#2C2C2C" strokeWidth="0.4" opacity="0.08" />
      <path d="M 96 121 L 108 115" stroke="#2C2C2C" strokeWidth="0.4" opacity="0.08" />

      {/* ── Decorative sparkles around brain ── */}
      {/* Top sparkle */}
      <path d="M 108 15 L 110 8 L 112 15 L 118 17 L 112 19 L 110 26 L 108 19 L 102 17 Z" fill="#E8B84B" opacity="0.35" />

      {/* Left sparkle */}
      <path d="M 28 80 L 30 75 L 32 80 L 36 81 L 32 83 L 30 88 L 28 83 L 24 81 Z" fill="#E8B84B" opacity="0.25" />

      {/* Right sparkle */}
      <circle cx="185" cy="60" r="2.5" fill="#E8B84B" opacity="0.2" />
      <path d="M 185 55 L 185 52" stroke="#E8B84B" strokeWidth="0.8" strokeLinecap="round" opacity="0.2" />
      <path d="M 189 58 L 192 56" stroke="#E8B84B" strokeWidth="0.8" strokeLinecap="round" opacity="0.2" />
      <path d="M 181 58 L 178 56" stroke="#E8B84B" strokeWidth="0.8" strokeLinecap="round" opacity="0.2" />

      {/* ── "AI" label doodle ── */}
      <text
        x="110"
        y="170"
        textAnchor="middle"
        fontFamily="'Caveat', cursive"
        fontSize="14"
        fill="#6B7C3A"
        opacity="0.4"
      >
        processing...
      </text>

      {/* Pulse lines below brain */}
      <path
        d="M 60 160 L 75 160 L 80 152 L 85 168 L 90 155 L 95 162 L 100 158 L 115 158 L 120 150 L 125 166 L 130 153 L 135 160 L 155 160"
        stroke="#6B7C3A"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.2"
      />
    </svg>
  );
}
