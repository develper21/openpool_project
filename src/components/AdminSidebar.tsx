"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import DoodleTag from "@/components/ui/DoodleTag";

/**
 * AdminSidebar — Charcoal dark sidebar with terracotta accent
 * for admin-specific pages: Overview, Users, Summaries, Analytics, API Keys, Settings.
 */
export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userName = session?.user?.name || "Admin";

  const navItems = [
    { label: "Overview", href: "/dashboard/admin", icon: OverviewIcon },
    { label: "Users", href: "/dashboard/admin/users", icon: UsersIcon },
    { label: "All Summaries", href: "/dashboard/admin/summaries", icon: SummariesIcon },
    { label: "Analytics", href: "/dashboard/admin/analytics", icon: AnalyticsIcon },
    { label: "API Keys", href: "/dashboard/admin/keys", icon: ApiKeysIcon },
    { label: "Settings", href: "/dashboard/admin/settings", icon: SettingsIcon },
  ];

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-charcoal flex-col z-40">
        {/* Decorative terracotta stripe along left edge */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-terracotta/30" aria-hidden="true" />

        {/* Decorative dots along right edge */}
        <div className="absolute right-0 top-0 bottom-0 w-3 pointer-events-none" aria-hidden="true">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute right-1 w-1 h-1 rounded-full bg-terracotta/[0.12]"
              style={{ top: `${5 + i * 5}%` }}
            />
          ))}
        </div>

        {/* Logo + Admin Badge */}
        <div className="px-6 pt-6 pb-8">
          <Link href="/dashboard/admin" className="flex items-center gap-2.5 group">
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
                fill="#E26D5C"
                fillOpacity="0.25"
              />
              <path d="M 14 8 L 26 8" stroke="#F5F0E8" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 10 28 C 13 26, 17 30, 20 28 C 23 26, 27 30, 30 28" stroke="#E26D5C" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
              <circle cx="16" cy="32" r="1.2" fill="#E26D5C" opacity="0.4" />
              <circle cx="22" cy="30" r="0.8" fill="#E26D5C" opacity="0.3" />
            </svg>
            <span className="font-caveat text-2xl text-cream font-bold tracking-wide">
              Distill
            </span>
            <span className="ml-auto text-[9px] font-sans font-bold tracking-[0.2em] text-terracotta/70 uppercase bg-terracotta/10 px-2 py-0.5 rounded">
              ADMIN
            </span>
          </Link>

          {/* Decorative line */}
          <svg aria-hidden="true" className="w-full h-2 mt-4" viewBox="0 0 200 4" fill="none" preserveAspectRatio="none">
            <path d="M 0 2 C 30 0, 60 4, 100 2 C 140 0, 170 3, 200 1" stroke="#E26D5C" strokeWidth="0.5" opacity="0.2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Section label */}
        <div className="px-6 mb-2">
          <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-cream/20 uppercase">
            Management
          </span>
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
                  ${isActive ? "bg-terracotta/15 text-cream" : "text-cream/50 hover:text-cream/80 hover:bg-cream/[0.04]"}
                `}
              >
                <div className="w-5 h-5 flex-shrink-0">
                  <Icon active={isActive} />
                </div>
                <span className="font-sans text-sm">{item.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-terracotta" />}
              </Link>
            );
          })}

          {/* Divider + link back to researcher dashboard */}
          <div className="pt-4 pb-2 px-3">
            <svg aria-hidden="true" className="w-full h-2" viewBox="0 0 200 4" fill="none" preserveAspectRatio="none">
              <path d="M 0 2 C 40 4, 80 0, 120 2 C 160 4, 180 1, 200 2" stroke="#F5F0E8" strokeWidth="0.5" opacity="0.08" strokeLinecap="round" />
            </svg>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-cream/30 hover:text-cream/60 hover:bg-cream/[0.04] transition-all duration-200"
          >
            <div className="w-5 h-5 flex-shrink-0">
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="w-full h-full">
                <path d="M 12 4 L 6 10 L 12 16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
              </svg>
            </div>
            <span className="font-sans text-sm">Researcher View</span>
          </Link>
        </nav>

        {/* Decorative doodle line */}
        <div className="px-6" aria-hidden="true">
          <svg aria-hidden="true" className="w-full h-2" viewBox="0 0 200 4" fill="none" preserveAspectRatio="none">
            <path d="M 0 2 C 40 4, 80 0, 120 2 C 160 4, 180 1, 200 2" stroke="#E26D5C" strokeWidth="0.5" opacity="0.12" strokeLinecap="round" />
          </svg>
        </div>

        {/* User section */}
        <div className="px-5 py-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-terracotta/15 flex items-center justify-center flex-shrink-0">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M 10 2 L 2 6 L 2 14 L 10 18 L 18 14 L 18 6 Z" stroke="#E26D5C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
              <circle cx="10" cy="10" r="3" stroke="#E26D5C" strokeWidth="1" opacity="0.4" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-sans text-xs text-cream/70 truncate">{userName}</p>
            <div className="mt-0.5">
              <DoodleTag color="terracotta" className="!text-[10px] !px-2 !py-0">
                ADMIN
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
          <path d="M 0 10 Q 20 0, 40 10 T 80 10 T 120 10 T 160 10 T 200 10 T 240 10 T 280 10 T 320 10 T 360 10 T 400 10" stroke="#E26D5C" strokeWidth="2" strokeLinecap="round" opacity="0.15" />
        </svg>

        {navItems.slice(0, 5).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} prefetch={true} className="relative flex flex-col items-center justify-center w-full h-full p-2">
              <div className={`w-6 h-6 transition-all duration-200 ${isActive ? "text-terracotta" : "text-charcoal/40"}`}>
                <Icon active={isActive} />
              </div>
              <span className={`text-[10px] mt-1 font-sans truncate ${isActive ? "text-terracotta font-bold" : "text-charcoal/40"}`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

/* ═══ Hand-drawn SVG Nav Icons (Admin-specific) ═══ */

function OverviewIcon({ active }: { active: boolean }) {
  const o = active ? "0.9" : "0.5";
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="w-full h-full">
      <path d="M 10 2 L 2 6 L 2 14 L 10 18 L 18 14 L 18 6 Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity={o} />
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1" opacity={active ? "0.6" : "0.3"} />
    </svg>
  );
}

function UsersIcon({ active }: { active: boolean }) {
  const o = active ? "0.9" : "0.5";
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="w-full h-full">
      <circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.2" opacity={o} />
      <path d="M 2 16 C 2 13, 4 11, 7 11 C 10 11, 12 13, 12 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity={o} fill="none" />
      <circle cx="14" cy="7" r="2" stroke="currentColor" strokeWidth="1" opacity={active ? "0.5" : "0.3"} />
      <path d="M 12 16 C 12 14, 13 12, 14 12 C 16 12, 17 14, 17 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity={active ? "0.5" : "0.3"} fill="none" />
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

function AnalyticsIcon({ active }: { active: boolean }) {
  const o = active ? "0.9" : "0.5";
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="w-full h-full">
      <path d="M 3 17 L 17 17" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity={o} />
      <path d="M 5 13 L 5 8 M 10 13 L 10 4 M 15 13 L 15 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity={o} />
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
