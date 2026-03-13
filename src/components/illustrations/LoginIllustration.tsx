import React from "react";

/**
 * LoginIllustration — A scientist holding a glowing key, surrounded by
 * locked filing cabinets with molecular formulas. Mid-century hand-drawn style.
 */
export default function LoginIllustration({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 480 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* ═══ Background atmosphere ═══ */}
      <circle cx="240" cy="280" r="200" fill="#6B7C3A" fillOpacity="0.03" />

      {/* ═══ FILING CABINET — LEFT ═══ */}
      <g>
        {/* Cabinet body */}
        <rect x="30" y="140" width="100" height="280" rx="4" fill="#EDE8DC" stroke="#2C2C2C" strokeWidth="1.8" />
        {/* Drawers */}
        {[0, 1, 2, 3].map((i) => (
          <g key={`cab1-${i}`}>
            <rect x="38" y={150 + i * 68} width="84" height="58" rx="2" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1" />
            {/* Handle */}
            <rect x="72" y={170 + i * 68} width="16" height="6" rx="2" fill="#C4622D" fillOpacity="0.3" stroke="#2C2C2C" strokeWidth="0.8" />
            {/* Lock */}
            <circle cx="80" cy={183 + i * 68} r="3" stroke="#2C2C2C" strokeWidth="0.8" fill="none" />
            <path d={`M 80 ${186 + i * 68} L 80 ${189 + i * 68}`} stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" />
          </g>
        ))}
        {/* Molecular formula on drawer 1 */}
        <text x="50" y="165" fontFamily="'Caveat', cursive" fontSize="9" fill="#6B7C3A" opacity="0.4">
          C₁₂H₂₂O₁₁
        </text>
        {/* Molecular formula on drawer 3 */}
        <text x="55" y="300" fontFamily="'Caveat', cursive" fontSize="9" fill="#6B7C3A" opacity="0.35">
          NaCl
        </text>
      </g>

      {/* ═══ FILING CABINET — RIGHT ═══ */}
      <g>
        <rect x="350" y="170" width="100" height="240" rx="4" fill="#EDE8DC" stroke="#2C2C2C" strokeWidth="1.8" />
        {[0, 1, 2].map((i) => (
          <g key={`cab2-${i}`}>
            <rect x="358" y={180 + i * 75} width="84" height="65" rx="2" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1" />
            <rect x="392" y={205 + i * 75} width="16" height="6" rx="2" fill="#C4622D" fillOpacity="0.3" stroke="#2C2C2C" strokeWidth="0.8" />
            <circle cx="400" cy={218 + i * 75} r="3" stroke="#2C2C2C" strokeWidth="0.8" fill="none" />
            <path d={`M 400 ${221 + i * 75} L 400 ${224 + i * 75}`} stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" />
          </g>
        ))}
        <text x="370" y="198" fontFamily="'Caveat', cursive" fontSize="9" fill="#6B7C3A" opacity="0.35">
          H₂SO₄
        </text>
        <text x="365" y="348" fontFamily="'Caveat', cursive" fontSize="9" fill="#6B7C3A" opacity="0.35">
          CH₃COOH
        </text>
      </g>

      {/* ═══ FLOOR ═══ */}
      <path d="M 10 430 C 100 425, 300 435, 470 430" stroke="#2C2C2C" strokeWidth="1" strokeLinecap="round" opacity="0.1" />

      {/* ═══ SCIENTIST ═══ */}
      {/* Head */}
      <circle cx="240" cy="215" r="28" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.8" />
      {/* Hair */}
      <path
        d="M 215 208 C 212 195, 220 185, 240 182 C 260 180, 270 190, 268 205"
        stroke="#2C2C2C" strokeWidth="1.8" fill="#2C2C2C" fillOpacity="0.75" strokeLinecap="round"
      />
      {/* Glasses */}
      <circle cx="232" cy="218" r="7" stroke="#2C2C2C" strokeWidth="1.2" fill="none" />
      <circle cx="250" cy="218" r="7" stroke="#2C2C2C" strokeWidth="1.2" fill="none" />
      <path d="M 239 218 L 243 218" stroke="#2C2C2C" strokeWidth="1" />
      <path d="M 225 216 L 215 213" stroke="#2C2C2C" strokeWidth="0.8" />
      <path d="M 257 216 L 267 213" stroke="#2C2C2C" strokeWidth="0.8" />
      {/* Eyes */}
      <circle cx="232" cy="217" r="1.5" fill="#2C2C2C" />
      <circle cx="250" cy="217" r="1.5" fill="#2C2C2C" />
      {/* Smile */}
      <path d="M 236 228 C 239 232, 243 232, 246 228" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" fill="none" />

      {/* Lab coat body */}
      <path
        d="M 210 243 C 205 250, 200 280, 200 320 L 200 425 L 230 425 L 235 340 L 245 340 L 250 425 L 280 425 L 280 320 C 280 280, 275 250, 270 243 C 262 238, 218 238, 210 243 Z"
        fill="#EDE8DC" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Coat lapel */}
      <path d="M 240 245 L 240 380" stroke="#2C2C2C" strokeWidth="0.6" opacity="0.25" />
      {/* Pocket */}
      <rect x="215" y="310" width="18" height="22" rx="2" stroke="#2C2C2C" strokeWidth="0.6" fill="none" opacity="0.2" />
      {/* Pen in pocket */}
      <path d="M 224 306 L 224 315" stroke="#C4622D" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />

      {/* ═══ RIGHT ARM — Holding the KEY ═══ */}
      <path
        d="M 270 260 C 285 265, 300 275, 310 285 L 315 290"
        stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" fill="none"
      />

      {/* ═══ GLOWING KEY ═══ */}
      {/* Key glow */}
      <circle cx="325" cy="300" r="30" fill="#E8B84B" fillOpacity="0.08" />
      <circle cx="325" cy="300" r="20" fill="#E8B84B" fillOpacity="0.12" />

      {/* Key handle (oval) */}
      <ellipse cx="320" cy="290" rx="14" ry="16" stroke="#E8B84B" strokeWidth="2.5" fill="#E8B84B" fillOpacity="0.15" />
      <ellipse cx="320" cy="290" rx="6" ry="7" stroke="#E8B84B" strokeWidth="1.2" fill="none" opacity="0.5" />

      {/* Key shaft */}
      <path d="M 320 306 L 320 340" stroke="#E8B84B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Key teeth */}
      <path d="M 320 330 L 328 330 L 328 325" stroke="#E8B84B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 320 338 L 326 338 L 326 334" stroke="#E8B84B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Key glow rays */}
      <path d="M 340 280 L 348 275" stroke="#E8B84B" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      <path d="M 342 298 L 352 298" stroke="#E8B84B" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <path d="M 338 312 L 346 318" stroke="#E8B84B" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <path d="M 302 275 L 296 268" stroke="#E8B84B" strokeWidth="1" strokeLinecap="round" opacity="0.25" />

      {/* ═══ LEFT ARM ═══ */}
      <path
        d="M 210 260 C 195 270, 175 290, 165 310"
        stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" fill="none"
      />
      {/* Hand */}
      <circle cx="162" cy="315" r="5" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1" />

      {/* ═══ DECORATIVE ELEMENTS ═══ */}

      {/* Molecule top-left */}
      <g opacity="0.15">
        <circle cx="60" cy="80" r="8" stroke="#6B7C3A" strokeWidth="1.2" fill="none" />
        <circle cx="85" cy="70" r="5" stroke="#6B7C3A" strokeWidth="1" fill="#6B7C3A" fillOpacity="0.1" />
        <path d="M 67 77 L 81 72" stroke="#6B7C3A" strokeWidth="1" />
        <circle cx="45" cy="95" r="4" stroke="#6B7C3A" strokeWidth="0.8" fill="none" />
        <path d="M 54 85 L 48 92" stroke="#6B7C3A" strokeWidth="0.8" />
      </g>

      {/* Molecule bottom-right */}
      <g opacity="0.12">
        <circle cx="420" cy="470" r="6" stroke="#C4622D" strokeWidth="1" fill="none" />
        <circle cx="440" cy="460" r="4" stroke="#C4622D" strokeWidth="0.8" fill="#C4622D" fillOpacity="0.1" />
        <path d="M 425 467 L 437 462" stroke="#C4622D" strokeWidth="0.8" />
      </g>

      {/* Starbursts */}
      <path d="M 180 100 L 182 93 L 184 100 L 190 102 L 184 104 L 182 111 L 180 104 L 174 102 Z" fill="#E8B84B" opacity="0.3" />
      <path d="M 400 120 L 402 115 L 404 120 L 408 121 L 404 123 L 402 128 L 400 123 L 396 121 Z" fill="#E8B84B" opacity="0.25" />
      <path d="M 150 460 L 152 455 L 154 460 L 158 461 L 154 463 L 152 468 L 150 463 L 146 461 Z" fill="#E8B84B" opacity="0.2" />

      {/* Dots */}
      <circle cx="300" cy="100" r="2" fill="#E8B84B" opacity="0.15" />
      <circle cx="450" cy="450" r="1.5" fill="#6B7C3A" opacity="0.15" />
      <circle cx="35" cy="470" r="2" fill="#C4622D" opacity="0.12" />

      {/* Atom orbit — bottom */}
      <g opacity="0.08" transform="translate(330, 440)">
        <ellipse cx="15" cy="15" rx="18" ry="7" stroke="#6B7C3A" strokeWidth="1" fill="none" transform="rotate(-30 15 15)" />
        <ellipse cx="15" cy="15" rx="18" ry="7" stroke="#6B7C3A" strokeWidth="1" fill="none" transform="rotate(30 15 15)" />
        <circle cx="15" cy="15" r="3" fill="#6B7C3A" opacity="0.25" />
      </g>

      {/* "Access" label */}
      <text x="240" y="500" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="16" fill="#2C2C2C" opacity="0.1">
        access granted
      </text>
    </svg>
  );
}
