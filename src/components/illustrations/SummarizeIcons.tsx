import React from "react";

/**
 * Small UI SVGs for the Distill Summary output and section tabs.
 */

export function LightbulbDoodle() {
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M 12 4 C 8 4, 6 7, 7 11 C 7.6 13.4, 9 15, 9 16 L 9 18 C 9 19, 10 20, 12 20 C 14 20, 15 19, 15 18 L 15 16 C 15 15, 16.4 13.4, 17 11 C 18 7, 16 4, 12 4 Z"
        fill="#E8B84B"
        fillOpacity="0.3"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M 10 16 L 14 16" stroke="#2C2C2C" strokeWidth="1.2" opacity="0.8" />
      <path d="M 11 18 L 13 18" stroke="#2C2C2C" strokeWidth="1.2" opacity="0.8" />
      <path d="M 12 9 L 12 13" stroke="#2C2C2C" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function BeakerDoodle() {
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M 9 4 L 15 4 M 10 4 L 10 10 L 6 18 C 5 20, 7 21, 12 21 C 17 21, 19 20, 18 18 L 14 10 L 14 4"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#8FAF72"
        fillOpacity="0.25"
      />
      <circle cx="10" cy="16" r="1.5" fill="#8FAF72" opacity="0.6" />
      <circle cx="14" cy="15" r="1" fill="#8FAF72" opacity="0.6" />
      <path d="M 8 13 L 16 13" stroke="#8FAF72" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function CheckmarkCircleDoodle() {
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="#6B7C3A"
        fillOpacity="0.15"
        stroke="#2C2C2C"
        strokeWidth="1.5"
      />
      <path
        d="M 8 13 L 11 16 L 16 9"
        stroke="#6B7C3A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WarningTriangleDoodle() {
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M 12 3 L 3 19 C 2 21, 4 22, 6 22 L 18 22 C 20 22, 22 21, 21 19 L 12 3 Z"
        fill="#C4622D"
        fillOpacity="0.15"
        stroke="#2C2C2C"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M 12 9 L 12 15" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="18" r="1" fill="#2C2C2C" />
    </svg>
  );
}

export function StarRatingDoodle({ filled }: { filled: boolean }) {
  return (
    <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" className="transition-transform hover:scale-110">
      <path
        d="M 12 3 L 14.5 9.5 L 21 10 L 16 14.5 L 17.5 21 L 12 17.5 L 6.5 21 L 8 14.5 L 3 10 L 9.5 9.5 Z"
        fill={filled ? "#E8B84B" : "transparent"}
        stroke={filled ? "#E8B84B" : "#2C2C2C"}
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity={filled ? 1 : 0.3}
      />
    </svg>
  );
}

export function TornEdgeSVG() {
  return (
    <svg aria-hidden="true"
      className="absolute top-0 left-0 w-full h-4 -translate-y-[90%] pointer-events-none"
      preserveAspectRatio="none"
      viewBox="0 0 100 10"
      fill="none"
    >
      <path
        d="M 0 10 L 0 5 L 2 8 L 5 3 L 8 9 L 12 2 L 16 7 L 19 4 L 22 8 L 26 1 L 30 7 L 34 3 L 38 9 L 42 2 L 46 8 L 50 3 L 53 7 L 57 2 L 61 8 L 65 4 L 69 9 L 73 1 L 76 8 L 80 3 L 84 9 L 88 2 L 92 7 L 96 4 L 100 8 L 100 10 Z"
        fill="#F5F0E8"
      />
      <path
        d="M 0 5 L 2 8 L 5 3 L 8 9 L 12 2 L 16 7 L 19 4 L 22 8 L 26 1 L 30 7 L 34 3 L 38 9 L 42 2 L 46 8 L 50 3 L 53 7 L 57 2 L 61 8 L 65 4 L 69 9 L 73 1 L 76 8 L 80 3 L 84 9 L 88 2 L 92 7 L 96 4 L 100 8"
        stroke="#2C2C2C"
        strokeWidth="0.5"
        strokeLinejoin="round"
        opacity="0.15"
      />
    </svg>
  );
}
