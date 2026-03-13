import React from "react";

/**
 * RegisterIllustration — A person planting a flask/beaker like a seed,
 * with research papers growing like plants around it.
 * Warm, optimistic mid-century style.
 */
export default function RegisterIllustration({
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
      {/* ═══ Background warmth ═══ */}
      <circle cx="240" cy="320" r="180" fill="#8FAF72" fillOpacity="0.04" />

      {/* ═══ GROUND / SOIL ═══ */}
      <path
        d="M 20 420 C 80 415, 200 425, 300 418 C 380 412, 440 420, 470 418"
        stroke="#2C2C2C" strokeWidth="1.2" strokeLinecap="round" opacity="0.15"
      />
      {/* Soil texture */}
      <path d="M 50 425 C 60 422, 70 428, 80 425" stroke="#2C2C2C" strokeWidth="0.6" opacity="0.08" />
      <path d="M 150 422 C 160 419, 170 425, 180 422" stroke="#2C2C2C" strokeWidth="0.6" opacity="0.06" />
      <path d="M 300 424 C 310 421, 320 427, 330 424" stroke="#2C2C2C" strokeWidth="0.6" opacity="0.07" />
      <path d="M 380 420 C 390 417, 400 423, 410 420" stroke="#2C2C2C" strokeWidth="0.6" opacity="0.06" />

      {/* ═══ PAPER-PLANTS — Growing from the ground ═══ */}

      {/* Plant 1 — Tall paper stem with leaf-pages */}
      <g>
        <path d="M 80 420 C 78 380, 82 340, 85 300 C 88 260, 75 220, 80 190"
          stroke="#6B7C3A" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Paper-leaves */}
        <rect x="60" y="195" width="32" height="42" rx="2" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1"
          transform="rotate(-15, 76, 216)" />
        <path d="M 55 210 L 72 210" stroke="#2C2C2C" strokeWidth="0.4" opacity="0.15" transform="rotate(-15, 63, 210)" />
        <path d="M 55 216 L 70 216" stroke="#2C2C2C" strokeWidth="0.4" opacity="0.12" transform="rotate(-15, 62, 216)" />
        <path d="M 55 222 L 68 222" stroke="#2C2C2C" strokeWidth="0.4" opacity="0.1" transform="rotate(-15, 61, 222)" />

        <rect x="85" y="250" width="28" height="38" rx="2" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1"
          transform="rotate(20, 99, 269)" />
        <path d="M 91 264 L 108 264" stroke="#2C2C2C" strokeWidth="0.4" opacity="0.12" transform="rotate(20, 99, 264)" />
        <path d="M 91 270 L 105 270" stroke="#2C2C2C" strokeWidth="0.4" opacity="0.1" transform="rotate(20, 98, 270)" />

        {/* Flower bud at top — small flask shape */}
        <path d="M 78 190 C 76 182, 82 175, 80 168 C 78 164, 83 160, 87 164 C 91 168, 85 172, 83 180 L 82 190"
          fill="#8FAF72" fillOpacity="0.3" stroke="#2C2C2C" strokeWidth="1" strokeLinecap="round" />
      </g>

      {/* Plant 2 — Medium paper-plant */}
      <g>
        <path d="M 380 420 C 382 390, 378 360, 375 320 C 372 290, 380 260, 378 240"
          stroke="#6B7C3A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <rect x="358" y="250" width="30" height="40" rx="2" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1"
          transform="rotate(-10, 373, 270)" />
        <path d="M 362 265 L 380 265" stroke="#2C2C2C" strokeWidth="0.4" opacity="0.12" transform="rotate(-10, 371, 265)" />
        <path d="M 362 271 L 377 271" stroke="#2C2C2C" strokeWidth="0.4" opacity="0.1" transform="rotate(-10, 369, 271)" />

        <rect x="382" y="290" width="26" height="35" rx="2" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1"
          transform="rotate(15, 395, 307)" />
        <path d="M 386 302 L 402 302" stroke="#2C2C2C" strokeWidth="0.4" opacity="0.12" transform="rotate(15, 394, 302)" />

        {/* Flower — flat flask */}
        <path d="M 376 240 C 374 232, 380 225, 378 218 C 376 214, 381 210, 384 214 C 387 218, 382 222, 380 230 L 379 240"
          fill="#E8B84B" fillOpacity="0.3" stroke="#2C2C2C" strokeWidth="1" strokeLinecap="round" />
      </g>

      {/* Plant 3 — Small sprout on right */}
      <g>
        <path d="M 430 420 C 432 400, 428 380, 430 365"
          stroke="#6B7C3A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <rect x="418" y="370" width="22" height="30" rx="1.5" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="0.8"
          transform="rotate(8, 429, 385)" />
        <path d="M 421 380 L 435 380" stroke="#2C2C2C" strokeWidth="0.3" opacity="0.12" transform="rotate(8, 428, 380)" />
        {/* Tiny bud */}
        <ellipse cx="430" cy="362" rx="5" ry="7" fill="#8FAF72" fillOpacity="0.25" stroke="#2C2C2C" strokeWidth="0.8" />
      </g>

      {/* Plant 4 — Small sprout on left */}
      <g>
        <path d="M 40 420 C 38 405, 42 390, 40 378"
          stroke="#6B7C3A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        {/* Leaf */}
        <path d="M 40 390 C 30 382, 25 375, 28 370 C 32 368, 38 375, 40 385"
          fill="#8FAF72" fillOpacity="0.2" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" />
        <ellipse cx="40" cy="375" rx="4" ry="5" fill="#8FAF72" fillOpacity="0.2" stroke="#2C2C2C" strokeWidth="0.7" />
      </g>

      {/* ═══ PERSON — Planting the flask ═══ */}

      {/* Head */}
      <circle cx="230" cy="255" r="26" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.8" />
      {/* Hair — wavy */}
      <path d="M 207 248 C 205 235, 215 224, 230 222 C 248 220, 258 230, 256 245"
        stroke="#2C2C2C" strokeWidth="1.8" fill="#C4622D" fillOpacity="0.5" strokeLinecap="round" />
      {/* Eyes */}
      <circle cx="223" cy="258" r="1.5" fill="#2C2C2C" />
      <circle cx="239" cy="258" r="1.5" fill="#2C2C2C" />
      {/* Happy smile */}
      <path d="M 225 267 C 228 272, 234 272, 237 267" stroke="#2C2C2C" strokeWidth="1" strokeLinecap="round" fill="none" />
      {/* Rosy cheeks */}
      <circle cx="216" cy="264" r="4" fill="#C4622D" fillOpacity="0.08" />
      <circle cx="244" cy="264" r="4" fill="#C4622D" fillOpacity="0.08" />

      {/* Body — casual shirt */}
      <path
        d="M 204 281 C 200 290, 195 320, 195 360 L 195 418 L 225 418 L 228 340 L 234 340 L 237 418 L 267 418 L 267 360 C 267 320, 262 290, 258 281 C 252 276, 210 276, 204 281 Z"
        fill="#8FAF72" fillOpacity="0.2" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Collar */}
      <path d="M 220 282 L 230 295 L 240 282" stroke="#2C2C2C" strokeWidth="0.8" fill="none" opacity="0.3" />

      {/* ═══ ARMS — Bending down to plant ═══ */}
      {/* Right arm reaching to ground */}
      <path
        d="M 258 300 C 270 320, 278 360, 275 390 L 270 405"
        stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" fill="none"
      />
      {/* Hand */}
      <circle cx="268" cy="408" r="5" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1" />

      {/* Left arm */}
      <path
        d="M 204 300 C 190 310, 180 330, 178 350"
        stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" fill="none"
      />
      <circle cx="176" cy="354" r="5" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1" />

      {/* ═══ FLASK BEING "PLANTED" — In the ground ═══ */}
      {/* Flask */}
      <path
        d="M 262 395 L 262 405 C 262 407, 256 415, 254 420 C 252 426, 256 432, 268 432 C 280 432, 284 426, 282 420 C 280 415, 274 407, 274 405 L 274 395"
        fill="#E8B84B" fillOpacity="0.2" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Flask neck */}
      <path d="M 260 395 L 276 395" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" />
      {/* Liquid */}
      <path d="M 258 422 C 262 420, 268 424, 272 421 C 276 418, 280 422, 282 420"
        stroke="#E8B84B" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
      {/* Bubbles */}
      <circle cx="266" cy="425" r="1.5" fill="#E8B84B" opacity="0.3" />
      <circle cx="273" cy="423" r="1" fill="#E8B84B" opacity="0.2" />

      {/* Soil mound around flask */}
      <path d="M 248 432 C 252 428, 268 426, 275 428 C 282 430, 290 432, 288 434"
        stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" opacity="0.12" />

      {/* ═══ TINY SPROUT — emerging from flask ═══ */}
      <path d="M 268 395 C 266 385, 270 375, 268 365"
        stroke="#6B7C3A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M 268 375 C 260 368, 258 362, 261 358 C 264 356, 268 362, 268 370"
        fill="#8FAF72" fillOpacity="0.35" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M 268 375 C 276 368, 280 364, 278 360 C 275 358, 270 363, 268 370"
        fill="#6B7C3A" fillOpacity="0.25" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" />

      {/* ═══ DECORATIVE ELEMENTS ═══ */}

      {/* Starbursts */}
      <path d="M 140 150 L 142 143 L 144 150 L 150 152 L 144 154 L 142 161 L 140 154 L 134 152 Z" fill="#E8B84B" opacity="0.3" />
      <path d="M 340 160 L 342 154 L 344 160 L 349 162 L 344 164 L 342 170 L 340 164 L 335 162 Z" fill="#E8B84B" opacity="0.25" />
      <path d="M 450 350 L 452 345 L 454 350 L 458 351 L 454 353 L 452 358 L 450 353 L 446 351 Z" fill="#E8B84B" opacity="0.2" />

      {/* Floating hearts — warmth */}
      <path d="M 160 180 C 162 176, 168 176, 168 180 C 168 184, 160 190, 160 190 C 160 190, 152 184, 152 180 C 152 176, 158 176, 160 180 Z"
        fill="#C4622D" opacity="0.12" />
      <path d="M 320 130 C 322 127, 326 127, 326 130 C 326 133, 320 137, 320 137 C 320 137, 314 133, 314 130 C 314 127, 318 127, 320 130 Z"
        fill="#C4622D" opacity="0.1" />

      {/* Sun rays — top */}
      <g opacity="0.08" transform="translate(240, 80)">
        <circle cx="0" cy="0" r="15" fill="#E8B84B" />
        <path d="M 0 -20 L 0 -28" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 14 -14 L 20 -20" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 20 0 L 28 0" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M -14 -14 L -20 -20" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M -20 0 L -28 0" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 14 14 L 20 20" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M -14 14 L -20 20" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Dots */}
      <circle cx="120" cy="480" r="2" fill="#6B7C3A" opacity="0.12" />
      <circle cx="350" cy="490" r="1.5" fill="#E8B84B" opacity="0.12" />
      <circle cx="460" cy="200" r="2" fill="#C4622D" opacity="0.1" />

      {/* Label */}
      <text x="240" y="510" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="16" fill="#2C2C2C" opacity="0.08">
        grow your research
      </text>
    </svg>
  );
}
