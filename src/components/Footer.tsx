import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-charcoal text-cream mt-24">
      {/* ── Wavy SVG Top Border ── */}
      <div className="absolute top-0 left-0 right-0 -translate-y-full w-full overflow-hidden leading-none z-10">
        <svg aria-hidden="true"
          className="w-full h-8 md:h-12 block"
          preserveAspectRatio="none"
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 48 V 24 C 80 8, 160 40, 240 24 C 320 8, 400 40, 480 24 C 560 8, 640 40, 720 24 C 800 8, 880 40, 960 24 C 1040 8, 1120 40, 1200 24 C 1280 8, 1360 40, 1440 24 V 48 H 0 Z"
            fill="#1A1A2E"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20 z-20 overflow-hidden">
        {/* Scattered Background Elements */}
        <svg
          className="absolute top-10 right-20 opacity-10"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
        >
          <path d="M 20 5 L 23 15 L 33 15 L 25 21 L 28 32 L 20 25 L 12 32 L 15 21 L 7 15 L 17 15 Z" fill="#F5F0E8" />
        </svg>
        <svg
         className="absolute bottom-10 left-10 opacity-10"
         width="60"
         height="60"
         viewBox="0 0 60 60"
         fill="none"
         aria-hidden="true"
        >
          <circle cx="30" cy="25" r="8" stroke="#F5F0E8" strokeWidth="1.2" />
          <path d="M 37 22 L 44 19" stroke="#F5F0E8" strokeWidth="1" />
          <circle cx="22" cy="45" r="6" stroke="#F5F0E8" strokeWidth="1" />
          <path d="M 26 32 L 23 40" stroke="#F5F0E8" strokeWidth="1" />
        </svg>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 justify-items-center md:justify-items-start">
          {/* Column 1: Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <svg aria-hidden="true" width="24" height="24" viewBox="0 0 40 40" fill="none">
                <path d="M 16 8 L 16 16 C 16 18, 8 24, 7 30 C 6 35, 10 38, 20 38 C 30 38, 34 35, 33 30 C 32 24, 24 18, 24 16 L 24 8" stroke="#F5F0E8" strokeWidth="2" strokeLinecap="round" />
                <path d="M 14 8 L 26 8" stroke="#F5F0E8" strokeWidth="2" strokeLinecap="round" />
                <path d="M 10 28 C 13 26, 17 30, 20 28 C 23 26, 27 30, 30 28" stroke="#F5F0E8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
              </svg>
              <span className="font-caveat text-3xl font-bold tracking-wide">Distill</span>
            </Link>
            <p className="font-sans text-sm text-cream/60 max-w-xs">
              Turning complex academic research into structured, actionable intelligence.
            </p>
          </div>

          {/* Column 2: Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-caveat text-2xl text-mustard mb-4 tracking-wide">Quick Links</h4>
            <ul className="flex flex-col gap-3 font-sans text-sm text-cream/70">
              <li><Link href="/docs" className="hover:text-cream transition-colors">API Documentation</Link></li>
              <li><Link href="/dashboard" className="hover:text-cream transition-colors">Dashboard</Link></li>
              <li><Link href="#" className="hover:text-cream transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-cream transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Column 3: CTA */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
             <h4 className="font-caveat text-2xl text-terracotta mb-4 tracking-wide">Ready to start?</h4>
             <p className="font-sans text-sm text-cream/60 mb-6 max-w-[200px]">
               Generate your first API key for free today.
             </p>
             <Link href="/register">
               <span className="inline-flex bg-cream text-charcoal font-caveat text-lg font-bold px-6 py-2 rounded shadow-sm hover:scale-95 transition-transform">
                 Get API Key &rarr;
               </span>
             </Link>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-16 pt-8 border-t border-cream/10 text-center">
          <p className="font-caveat text-xl text-cream/50 tracking-wide">
            Built with <span className="text-terracotta mx-1">✦</span> for pharma researchers
          </p>
        </div>
      </div>
    </footer>
  );
}
