"use client";

import React, { useState } from "react";
import Link from "next/link";
import DoodleButton from "@/components/ui/DoodleButton";

/**
 * Navbar — Sticky nav with hand-drawn flask logo, links, and CTA.
 * Paper background with a wavy SVG bottom border.
 */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Features", href: "#features" },
    { label: "Docs", href: "#docs" },
    { label: "Pricing", href: "#pricing" },
    { label: "Login", href: "#login" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-paper">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* ── Logo ── */}
        <a href="/" className="flex items-center gap-2 group">
          {/* Hand-drawn flask/beaker SVG */}
          <svg aria-hidden="true"
            width="32"
            height="32"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 group-hover:rotate-[-8deg]"
          >
            {/* Flask body */}
            <path
              d="M 16 8 L 16 16 C 16 18, 8 24, 7 30 C 6 35, 10 38, 20 38 C 30 38, 34 35, 33 30 C 32 24, 24 18, 24 16 L 24 8"
              stroke="#1A1A2E"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="#8FAF72"
              fillOpacity="0.2"
            />
            {/* Flask neck */}
            <path
              d="M 14 8 L 26 8"
              stroke="#1A1A2E"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Liquid level */}
            <path
              d="M 10 28 C 13 26, 17 30, 20 28 C 23 26, 27 30, 30 28"
              stroke="#6B7C3A"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.6"
            />
            {/* Bubbles */}
            <circle cx="16" cy="32" r="1.5" fill="#6B7C3A" opacity="0.4" />
            <circle cx="22" cy="30" r="1" fill="#6B7C3A" opacity="0.3" />
            <circle cx="19" cy="34" r="0.8" fill="#6B7C3A" opacity="0.25" />
          </svg>
          <span className="font-caveat text-2xl text-ink font-bold tracking-wide">
            Distill
          </span>
        </a>

        {/* ── Desktop Links ── */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-sm text-charcoal/70 hover:text-terracotta transition-colors duration-200 relative group"
            >
              {link.label}
              {/* Sketchy underline on hover */}
              <svg aria-hidden="true"
                className="absolute -bottom-1 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                preserveAspectRatio="none"
                viewBox="0 0 100 4"
                fill="none"
              >
                <path
                  d="M 0 2 C 20 0, 40 4, 60 1 C 80 -1, 90 3, 100 2"
                  stroke="#C4622D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          ))}

          <Link href="/login">
            <DoodleButton variant="ghost">Login</DoodleButton>
          </Link>
          <Link href="/register">
            <DoodleButton variant="primary">Get API Key</DoodleButton>
          </Link>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-charcoal transition-transform duration-200 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-charcoal transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-charcoal transition-transform duration-200 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="md:hidden bg-paper border-t border-charcoal/10 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-sans text-base text-charcoal/70 hover:text-terracotta transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setMobileOpen(false)}>
            <DoodleButton variant="ghost" className="!w-full mb-2">Login</DoodleButton>
          </Link>
          <Link href="/register" onClick={() => setMobileOpen(false)}>
            <DoodleButton variant="primary" className="!w-full">Get API Key</DoodleButton>
          </Link>
        </div>
      )}

      {/* ── Wavy SVG bottom border ── */}
      <svg aria-hidden="true"
        className="w-full h-3 block"
        preserveAspectRatio="none"
        viewBox="0 0 1440 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 6 C 60 2, 120 10, 180 6 C 240 2, 300 10, 360 6 C 420 2, 480 10, 540 6 C 600 2, 660 10, 720 6 C 780 2, 840 10, 900 6 C 960 2, 1020 10, 1080 6 C 1140 2, 1200 10, 1260 6 C 1320 2, 1380 10, 1440 6"
          stroke="#2C2C2C"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.15"
        />
      </svg>
    </nav>
  );
}
