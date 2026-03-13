"use client";

import React, { useEffect, useState } from "react";

export default function DistillLoader({ className = "", text = "Loading" }: { className?: string, text?: string }) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center p-8 font-sans ${className}`}>
      {/* 
        Animated SVG Beaker
        Uses CSS keyframes defined in the SVG via <style> to animate the fill rect
      */}
      <svg aria-hidden="true" 
        viewBox="0 0 100 120" 
        className="w-24 h-auto drop-shadow-sm mb-4" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          {`
            @keyframes fillBeaker {
              0% { y: 95px; height: 0px; }
              50% { y: 40px; height: 55px; }
              80% { y: 30px; height: 65px; }
              100% { y: 30px; height: 65px; opacity: 0; }
            }
            @keyframes bubbleRise {
              0% { transform: translateY(0); opacity: 0; }
              20% { opacity: 1; }
              100% { transform: translateY(-40px); opacity: 0; }
            }
            .liquid-fill {
              animation: fillBeaker 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            }
            .bubble-1 { animation: bubbleRise 1.2s ease-in infinite 0.2s; }
            .bubble-2 { animation: bubbleRise 1.5s ease-in infinite 0.8s; }
            .bubble-3 { animation: bubbleRise 1s ease-in infinite 1.5s; }
          `}
        </style>

        {/* Define a clip mask the exact interior shape of the beaker */}
        <defs>
          <clipPath id="beaker-clip">
            <path d="M 40 20 L 40 40 L 20 90 A 10 10 0 0 0 30 105 L 70 105 A 10 10 0 0 0 80 90 L 60 40 L 60 20 Z" />
          </clipPath>
        </defs>

        {/* The Animated Liquid */}
        <g clipPath="url(#beaker-clip)">
          <rect x="0" y="95" width="100" height="0" fill="#E8B84B" className="liquid-fill" />
          
          {/* Surface reflection on the liquid */}
          <rect x="0" y="95" width="100" height="4" fill="#E26D5C" opacity="0.8" className="liquid-fill" />
          
          {/* Bubbles */}
          <circle cx="35" cy="85" r="2" fill="#FFFdf8" opacity="0.6" className="bubble-1" />
          <circle cx="50" cy="95" r="3" fill="#FFFdf8" opacity="0.4" className="bubble-2" />
          <circle cx="65" cy="80" r="1.5" fill="#FFFdf8" opacity="0.5" className="bubble-3" />
        </g>

        {/* The Glass Beaker Outline */}
        {/* Rim */}
        <ellipse cx="50" cy="20" rx="15" ry="4" fill="none" stroke="#1A1A2E" strokeWidth="3" />
        {/* Body */}
        <path d="M 35 20 L 35 40 L 15 90 A 15 15 0 0 0 30 110 L 70 110 A 15 15 0 0 0 85 90 L 65 40 L 65 20" fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Fill level tick marks on the outside */}
        <line x1="25" y1="70" x2="30" y2="70" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1="30" y1="50" x2="35" y2="50" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        
        {/* Glass glare */}
        <path d="M 23 90 L 40 45" fill="none" stroke="#FFFdf8" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      </svg>
      
      {/* Loading Text */}
      <div className="flex font-caveat text-4xl text-ink tracking-wide relative max-w-min">
        <span>{text}</span>
        <span className="w-8 text-left absolute -right-8" aria-hidden="true">{dots}</span>
      </div>
    </div>
  );
}
