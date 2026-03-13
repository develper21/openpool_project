"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import DoodleTag from "@/components/ui/DoodleTag";

/**
 * ResearcherSidebar — Charcoal dark sidebar with hand-drawn nav icons
 * for researcher-specific pages. Sage-green accent.
 */
export default function ResearcherSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userName = session?.user?.name || "Researcher";

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: DashboardIcon },
    { label: "Summarize", href: "/dashboard/summarize", icon: SummarizeIcon },
    { label: "My Summaries", href: "/dashboard/summaries", icon: SummariesIcon },
    { label: "Feedback", href: "/dashboard/feedback", icon: FeedbackIcon },
    { label: "API Keys", href: "/dashboard/api-keys", icon: ApiKeysIcon },
    { label: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
  ];

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-charcoal flex-col z-40">
        {/* Decorative dots along right edge */}
        <div className="absolute right-0 top-0 bottom-0 w-3 pointer-events-none" aria-hidden="true">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute right-1 w-1 h-1 rounded-full bg-cream/[0.06]"
              style={{ top: `${5 + i * 5}%` }}
            />
          ))}
        </div>

        {/* Logo */}
        <div className="px-6 pt-6 pb-8">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <svg aria-hidden="true"
              width="30"
              height="30"
              viewBox="0 0 40 40"
              fill="none"
              className="transition-transform duration-300 group-hover:rotate-[-8deg]"
            >
              <path
                d="M 16 8 L 16 16 C 16 18, 8 24, 7 30 C 6 35, 10 38, 20 38 C 30 38, 34 35, 33 30 C 32 24, 24 18, 24 16 L 24 8"
                stroke="#F5F0E8"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="#8FAF72"
                fillOpacity="0.25"
              />
              <path d="M 14 8 L 26 8" stroke="#F5F0E8" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 10 28 C 13 26, 17 30, 20 28 C 23 26, 27 30, 30 28" stroke="#8FAF72" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
              <circle cx="16" cy="32" r="1.2" fill="#8FAF72" opacity="0.4" />
              <circle cx="22" cy="30" r="0.8" fill="#8FAF72" opacity="0.3" />
            </svg>
            <span className="font-caveat text-2xl text-cream font-bold tracking-wide">
              Distill
            </span>
          </Link>

          {/* Decorative line */}
          <svg aria-hidden="true" className="w-full h-2 mt-4" viewBox="0 0 200 4" fill="none" preserveAspectRatio="none">
            <path d="M 0 2 C 30 0, 60 4, 100 2 C 140 0, 170 3, 200 1" stroke="#F5F0E8" strokeWidth="0.5" opacity="0.1" strokeLinecap="round" />
          </svg>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-all duration-200 group
                  ${isActive ? "bg-cream/10 text-cream" : "text-cream/50 hover:text-cream/80 hover:bg-cream/[0.04]"}
                `}
              >
                <div className="w-5 h-5 flex-shrink-0">
                  <Icon active={isActive} />
                </div>
                <span className="font-sans text-sm">{item.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sage" />}
              </Link>
            );
          })}
        </nav>

        {/* Decorative doodle line */}
        <div className="px-6" aria-hidden="true">
          <svg aria-hidden="true" className="w-full h-2" viewBox="0 0 200 4" fill="none" preserveAspectRatio="none">
            <path d="M 0 2 C 40 4, 80 0, 120 2 C 160 4, 180 1, 200 2" stroke="#F5F0E8" strokeWidth="0.5" opacity="0.08" strokeLinecap="round" />
          </svg>
        </div>

        {/* User section */}
        <div className="px-5 py-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center flex-shrink-0">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="7" r="3.5" stroke="#F5F0E8" strokeWidth="1.2" opacity="0.5" />
              <path d="M 3 18 C 3 14, 6 11, 10 11 C 14 11, 17 14, 17 18" stroke="#F5F0E8" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" fill="none" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-sans text-xs text-cream/70 truncate">{userName}</p>
            <div className="mt-0.5">
              <DoodleTag color="sage" className="!text-[10px] !px-2 !py-0">
                RESEARCHER
              </DoodleTag>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Mobile Bottom Navigation ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-cream z-50 flex items-center justify-evenly border-t-0 shadow-[0_-4px_16px_rgba(26,26,46,0.05)]">
        {/* Wavy top border SVG */}
        <svg aria-hidden="true" className="absolute -top-3 left-0 w-full h-4 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 400 20" fill="none">
          <path d="M 0 10 Q 20 0, 40 10 T 80 10 T 120 10 T 160 10 T 200 10 T 240 10 T 280 10 T 320 10 T 360 10 T 400 10 L 400 20 L 0 20 Z" fill="#F5F0E8" />
          <path d="M 0 10 Q 20 0, 40 10 T 80 10 T 120 10 T 160 10 T 200 10 T 240 10 T 280 10 T 320 10 T 360 10 T 400 10" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity="0.1" />
        </svg>

        {navItems.slice(0, 5).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} prefetch={true} className="relative flex flex-col items-center justify-center w-full h-full p-2">
              <div className={`w-6 h-6 transition-all duration-200 ${isActive ? "text-sage" : "text-charcoal/40"}`}>
                <Icon active={isActive} />
              </div>
              <span className={`text-[10px] mt-1 font-sans truncate ${isActive ? "text-sage font-bold" : "text-charcoal/40"}`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

/* ═══ Hand-drawn SVG Nav Icons ═══ */

function DashboardIcon({ active }: { active: boolean }) {
  const o = active ? "0.9" : "0.5";
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="w-full h-full">
      <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" opacity={o} />
      <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" opacity={o} />
      <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" opacity={o} />
      <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" opacity={o} />
    </svg>
  );
}

function SummarizeIcon({ active }: { active: boolean }) {
  const o = active ? "0.9" : "0.5";
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="w-full h-full">
      <path d="M 5 3 L 15 3 L 15 17 L 5 17 Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity={o} />
      <path d="M 7 7 L 13 7" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity={o} />
      <path d="M 7 10 L 13 10" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity={o} />
      <path d="M 7 13 L 11 13" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity={o} />
      <path d="M 2 6 L 5 10 L 2 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity={o} />
    </svg>
  );
}

function SummariesIcon({ active }: { active: boolean }) {
  const o = active ? "0.9" : "0.5";
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="w-full h-full">
      <path d="M 3 4 L 13 4 L 13 16 L 3 16 Z" stroke="currentColor" strokeWidth="1.2" opacity={o} strokeLinejoin="round" />
      <path d="M 6 4 L 6 1 L 16 1 L 16 13 L 13 13" stroke="currentColor" strokeWidth="1" opacity={active ? "0.6" : "0.3"} strokeLinejoin="round" />
      <path d="M 5 8 L 11 8" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity={o} />
      <path d="M 5 11 L 10 11" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity={o} />
      <path d="M 5 14 L 9 14" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity={o} />
    </svg>
  );
}

function FeedbackIcon({ active }: { active: boolean }) {
  const o = active ? "0.9" : "0.5";
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="w-full h-full">
      <path d="M 3 4 C 3 3, 4 2, 5 2 L 15 2 C 16 2, 17 3, 17 4 L 17 12 C 17 13, 16 14, 15 14 L 8 14 L 5 17 L 5 14 L 5 14 C 4 14, 3 13, 3 12 Z"
        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity={o} />
      <path d="M 7 7 L 13 7" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity={o} />
      <path d="M 7 10 L 11 10" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity={o} />
    </svg>
  );
}

function ApiKeysIcon({ active }: { active: boolean }) {
  const o = active ? "0.9" : "0.5";
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="w-full h-full">
      <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="1.3" opacity={o} />
      <circle cx="8" cy="8" r="1.5" stroke="currentColor" strokeWidth="0.8" opacity={active ? "0.5" : "0.3"} />
      <path d="M 11 11 L 17 17" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity={o} />
      <path d="M 14 14 L 16 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity={o} />
      <path d="M 16 16 L 18 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity={o} />
    </svg>
  );
}

function SettingsIcon({ active }: { active: boolean }) {
  const o = active ? "0.9" : "0.5";
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="w-full h-full">
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.2" opacity={o} />
      <path d="M 10 2 L 10 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity={o} />
      <path d="M 10 15 L 10 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity={o} />
      <path d="M 2 10 L 5 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity={o} />
      <path d="M 15 10 L 18 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity={o} />
      <path d="M 4.3 4.3 L 6.5 6.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity={o} />
      <path d="M 13.5 13.5 L 15.7 15.7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity={o} />
      <path d="M 4.3 15.7 L 6.5 13.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity={o} />
      <path d="M 13.5 6.5 L 15.7 4.3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity={o} />
    </svg>
  );
}
