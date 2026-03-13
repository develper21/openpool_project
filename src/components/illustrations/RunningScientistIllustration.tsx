import React from "react";

/**
 * RunningScientistIllustration — Animated SVG showing a small mid-century
 * scientist running with a stack of papers.
 * Used for the loading state on the Summarize page.
 */
export default function RunningScientistIllustration({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 200 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          @keyframes runLeg1 {
            0%, 100% { transform: rotate(-20deg); }
            50% { transform: rotate(20deg); }
          }
          @keyframes runLeg2 {
            0%, 100% { transform: rotate(20deg); }
            50% { transform: rotate(-20deg); }
          }
          @keyframes flyPapers {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
            100% { transform: translate(-30px, -20px) rotate(-15deg); opacity: 0; }
          }
          @keyframes flyPapers2 {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
            100% { transform: translate(-20px, -30px) rotate(10deg); opacity: 0; }
          }
          .animate-scientist-bounce {
            animation: bounce 0.4s infinite ease-in-out;
            transform-origin: center;
          }
          .animate-leg1 {
            animation: runLeg1 0.4s infinite ease-in-out;
            transform-origin: 100px 105px;
          }
          .animate-leg2 {
            animation: runLeg2 0.4s infinite ease-in-out;
            transform-origin: 100px 105px;
          }
          .animate-fly1 {
            animation: flyPapers 1s infinite linear;
          }
          .animate-fly2 {
            animation: flyPapers2 1.2s infinite linear;
          }
        `}
      </style>

      {/* ── Floor motion lines ── */}
      <path
        d="M 50 130 L 150 130"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeDasharray="10 15"
        strokeLinecap="round"
        opacity="0.2"
      />
      <path
        d="M 40 135 L 160 135"
        stroke="#2C2C2C"
        strokeWidth="1"
        strokeDasharray="6 20"
        strokeLinecap="round"
        opacity="0.1"
      />

      {/* ── Flying background papers (animated) ── */}
      <g className="animate-fly1" opacity="0.5">
        <rect x="70" y="40" width="15" height="20" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1" />
        <path d="M 73 45 L 82 45" stroke="#2C2C2C" strokeWidth="0.5" />
      </g>
      <g className="animate-fly2" opacity="0.4" style={{ animationDelay: "0.5s" }}>
        <rect x="85" y="55" width="12" height="15" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1" />
      </g>

      <g className="animate-scientist-bounce">
        {/* ── LEGS ── */}
        <path
          className="animate-leg1"
          d="M 100 105 L 90 120"
          stroke="#2C2C2C"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className="animate-leg2"
          d="M 100 105 L 110 120"
          stroke="#2C2C2C"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* ── SCIENTIST BODY ── */}
        {/* Lab coat */}
        <path
          d="M 98 105 C 90 100, 85 85, 90 70 L 115 70 C 120 85, 115 100, 105 105 Z"
          fill="#EDE8DC"
          stroke="#2C2C2C"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Head */}
        <circle cx="102" cy="55" r="12" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.5" />
        {/* Glasses */}
        <circle cx="105" cy="53" r="3.5" fill="none" stroke="#2C2C2C" strokeWidth="1" />
        <circle cx="113" cy="53" r="3.5" fill="none" stroke="#2C2C2C" strokeWidth="1" />
        <path d="M 108.5 53 L 109.5 53" stroke="#2C2C2C" strokeWidth="0.8" />
        {/* Hair billowing back */}
        <path
          d="M 95 45 C 85 45, 80 55, 85 62"
          stroke="#2C2C2C"
          strokeWidth="1.5"
          fill="#2C2C2C"
          strokeLinecap="round"
        />
        {/* Happy running face */}
        <path d="M 105 60 C 107 63, 111 63, 113 60" fill="none" stroke="#2C2C2C" strokeWidth="0.8" strokeLinecap="round" />

        {/* ── ARMS & PAPERS ── */}
        {/* Front Arm */}
        <path
          d="M 102 75 C 115 78, 125 75, 130 80"
          stroke="#2C2C2C"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Big Stack of Papers being carried */}
        <g transform="rotate(10, 125, 75)">
          <rect x="120" y="55" width="20" height="28" rx="1" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1" />
          <rect x="122" y="58" width="20" height="28" rx="1" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1" />
          <rect x="124" y="61" width="20" height="28" rx="1" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.2" />
          {/* Abstract text */}
          <path d="M 127 65 L 140 65" stroke="#2C2C2C" strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
          <path d="M 127 70 L 138 70" stroke="#2C2C2C" strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
          <path d="M 127 75 L 142 75" stroke="#2C2C2C" strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
        </g>
        {/* Hand over papers */}
        <circle cx="130" cy="80" r="3" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.2" />
        
        {/* Back Arm swinging */}
        <path
          d="M 95 75 C 85 80, 75 80, 75 90"
          stroke="#2C2C2C"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Speed lines behind */}
      <path d="M 50 70 L 65 70" stroke="#2C2C2C" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="5 5" opacity="0.3" />
      <path d="M 40 85 L 60 85" stroke="#2C2C2C" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 4" opacity="0.3" />
      <path d="M 60 55 L 70 55" stroke="#2C2C2C" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 4" opacity="0.2" />
    </svg>
  );
}
