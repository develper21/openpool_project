"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DoodleCard from "@/components/ui/DoodleCard";
import DoodleButton from "@/components/ui/DoodleButton";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetchWithAuth("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to load admin stats", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="flex flex-col gap-10 max-w-7xl mx-auto pb-12">
      {/* ── HEADER & ILLUSTRATION ── */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="font-caveat text-[52px] text-ink leading-none mt-4">Mission Control ✦</h1>
          <p className="font-sans text-charcoal/70 mt-1">
            Here's what's happening across Distill right now
          </p>
        </div>

        {/* Full-width NASA Control Room Illustration (Mid-century style) */}
        <div className="w-full h-[220px] rounded-2xl bg-cream/30 border-2 border-charcoal/10 overflow-hidden relative shadow-[inset_0_2px_10px_rgba(26,26,46,0.02)] flex items-center justify-center">
          <svg viewBox="0 0 1200 220" className="w-full h-full object-cover opacity-90" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2C2C2C" strokeWidth="0.5" opacity="0.05" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Main display board */}
            <rect x="350" y="20" width="500" height="100" rx="4" fill="#2C2C2C" opacity="0.9" />
            <rect x="360" y="30" width="480" height="80" rx="2" fill="#E26D5C" opacity="0.1" stroke="#E26D5C" strokeWidth="2" strokeDasharray="4 4" />
            {/* Charts on display */}
            <path d="M 380 90 L 450 40 L 520 70 L 600 35 L 700 85" fill="none" stroke="#F5F0E8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="450" cy="40" r="4" fill="#E26D5C" />
            <circle cx="520" cy="70" r="4" fill="#D4AF37" />
            <circle cx="600" cy="35" r="4" fill="#8FAF72" />
            
            {/* World map abstraction on display */}
            <path d="M 750 60 C 760 40, 780 40, 790 60 C 800 80, 760 90, 750 60 Z" fill="#8FAF72" opacity="0.4" />
            <path d="M 810 50 C 820 50, 830 70, 820 80 C 810 80, 800 60, 810 50 Z" fill="#8FAF72" opacity="0.4" />

            {/* Operator Desks */}
            <path d="M 100 160 Q 300 130, 600 160 T 1100 160" fill="none" stroke="#2C2C2C" strokeWidth="4" strokeLinecap="round" />
            {/* Computers & Screens */}
            {[200, 450, 700, 950].map((x, i) => (
              <g key={i} transform={`translate(${x}, 125)`}>
                <rect x="-30" y="0" width="60" height="40" rx="4" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="2" />
                <rect x="-25" y="5" width="50" height="30" rx="2" fill="#2C2C2C" opacity="0.8" />
                <path d="M -10 40 L -15 55 L 15 55 L 10 40" fill="#2C2C2C" />
                <rect x="-40" y="55" width="80" height="6" rx="2" fill="#2C2C2C" />
                {/* Operator person */}
                <circle cx="0" cy="15" r="15" fill="#2C2C2C" opacity="0.8" />
                <path d="M -20 45 C -20 20, 20 20, 20 45" fill="#2C2C2C" opacity="0.8" />
              </g>
            ))}
            
            {/* Standing figure pointing */}
            <g transform="translate(280, 80)">
              <circle cx="0" cy="-20" r="12" fill="#2C2C2C" />
              <path d="M -15 10 C -15 -15, 15 -15, 15 10 L 15 60 L -15 60 Z" fill="#2C2C2C" />
              {/* Pointing arm */}
              <path d="M 5 -5 L 40 -30" stroke="#2C2C2C" strokeWidth="6" strokeLinecap="round" />
            </g>

            <path d="M 150 40 L 220 40" stroke="#D4AF37" strokeWidth="3" strokeDasharray="5 5" opacity="0.5" />
            <path d="M 950 60 L 1050 60" stroke="#8FAF72" strokeWidth="3" strokeDasharray="5 5" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* 1. Total Users */}
        <DoodleCard className="p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform">
          <div className="flex justify-between items-start">
            <span className="font-sans text-sm text-charcoal/60 font-medium tracking-wide">TOTAL USERS</span>
            <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
          </div>
          <div className="flex items-end gap-3 mt-4">
            <span className="font-caveat text-5xl text-ink leading-none">{loading ? "..." : stats?.totalUsers || 0}</span>
            <svg className="w-5 h-5 text-sage mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </div>
        </DoodleCard>

        {/* 2. Total Summaries */}
        <DoodleCard className="p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform">
          <div className="flex justify-between items-start">
            <span className="font-sans text-sm text-charcoal/60 font-medium tracking-wide">TOTAL SUMMARIES</span>
            <div className="w-10 h-10 rounded-full bg-olive/10 flex items-center justify-center text-olive">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
          </div>
          <div className="flex items-end gap-3 mt-4">
            <span className="font-caveat text-5xl text-ink leading-none">{loading ? "..." : (stats?.totalSummaries || 0).toLocaleString()}</span>
            <svg className="w-5 h-5 text-sage mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </div>
        </DoodleCard>

        {/* 3. Avg Rating */}
        <DoodleCard className="p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform">
          <div className="flex justify-between items-start">
            <span className="font-sans text-sm text-charcoal/60 font-medium tracking-wide">AVG RATING</span>
            <div className="w-10 h-10 rounded-full bg-mustard/10 flex items-center justify-center text-mustard relative">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              {/* Hand drawn circle highlight */}
              <svg className="absolute w-12 h-12 text-terracotta -rotate-12 opcaity-80" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M 20 2 C 30 2, 38 10, 38 20 C 38 30, 30 38, 20 38 C 10 38, 2 30, 2 20 C 2 10, 10 2, 18 3" />
              </svg>
            </div>
          </div>
          <div className="flex items-end gap-3 mt-4">
            <span className="font-caveat text-5xl text-ink leading-none">{loading ? "..." : stats?.avgRating || "0.0"}</span>
          </div>
        </DoodleCard>

        {/* 4. API Calls */}
        <DoodleCard className="p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform">
          <div className="flex justify-between items-start">
            <span className="font-sans text-sm text-charcoal/60 font-medium tracking-wide">CALLS TODAY</span>
            <div className="w-10 h-10 rounded-full bg-charcoal/5 flex items-center justify-center text-charcoal relative">
               <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4"></path>
                  <path d="M12 18v4"></path>
                  <path d="M4.93 4.93l2.83 2.83"></path>
                  <path d="M16.24 16.24l2.83 2.83"></path>
                  <path d="M2 12h4"></path>
                  <path d="M18 12h4"></path>
                  <path d="M4.93 19.07l2.83-2.83"></path>
                  <path d="M16.24 7.76l2.83-2.83"></path>
               </svg>
               <path d="M 12 12 L 15 5" stroke="#E26D5C" strokeWidth="2" strokeLinecap="round" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="flex items-end gap-3 mt-4">
            <span className="font-caveat text-5xl text-ink leading-none">{loading ? "..." : (stats?.callsToday || 0).toLocaleString()}</span>
             <svg className="w-5 h-5 text-terracotta mb-1 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </div>
        </DoodleCard>
      </div>

      {/* ── TWO COLUMN LAYOUT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Recent Activity */}
        <div className="lg:col-span-2">
          <h2 className="font-caveat text-3xl text-charcoal mb-4">Recent Activity</h2>
          
          <DoodleCard className="p-8">
            <div className="relative border-l-2 border-dashed border-charcoal/10 ml-3 py-2 space-y-8">
              {loading ? (
                <div className="animate-pulse bg-charcoal/10 h-8 w-3/4 rounded ml-8"></div>
              ) : stats?.recentActivity?.length > 0 ? (
                stats.recentActivity.map((activity: any, idx: number) => (
                  <div key={idx} className="relative pl-8">
                    <div className="absolute -left-[11px] top-1">
                      {/* Hand drawn circle bullet */}
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="4.5" fill="#E26D5C" />
                        <circle cx="10" cy="10" r="6" stroke="#E26D5C" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 2" />
                      </svg>
                    </div>
                    <p className="font-sans text-[15px] text-charcoal/80">
                      {activity.text}
                    </p>
                    <p className="font-sans text-xs text-olive mt-1">
                      {activity.time}
                    </p>
                  </div>
                ))
              ) : (
                <div className="pl-8 font-sans text-sm text-charcoal/50">No recent activity.</div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-charcoal/10 flex justify-center">
              <button className="font-sans text-sm text-terracotta hover:text-ink transition-colors font-medium">
                View All Activity →
              </button>
            </div>
          </DoodleCard>
        </div>

        {/* RIGHT COLUMN: Quick Actions */}
        <div className="lg:col-span-1">
          <h2 className="font-caveat text-3xl text-charcoal mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <Link href="/dashboard/admin/users">
                <DoodleCard className="p-5 flex flex-col items-center justify-center text-center gap-3 aspect-square hover:-translate-y-1 transition-transform group cursor-pointer bg-cream/30">
                  <div className="w-10 h-10 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                  </div>
                  <span className="font-sans text-sm font-bold text-charcoal">Manage Users</span>
                </DoodleCard>
             </Link>

             <Link href="/dashboard/admin/summaries">
                <DoodleCard className="p-5 flex flex-col items-center justify-center text-center gap-3 aspect-square hover:-translate-y-1 transition-transform group cursor-pointer bg-cream/30">
                  <div className="w-10 h-10 rounded-full bg-olive/10 text-olive flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  </div>
                  <span className="font-sans text-sm font-bold text-charcoal">All Summaries</span>
                </DoodleCard>
             </Link>

             <button className="text-left w-full h-full">
                <DoodleCard className="p-5 flex flex-col items-center justify-center text-center gap-3 aspect-square hover:-translate-y-1 transition-transform group bg-cream/30">
                  <div className="w-10 h-10 rounded-full bg-mustard/20 text-mustard flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  </div>
                  <span className="font-sans text-sm font-bold text-charcoal">Export CSV</span>
                </DoodleCard>
             </button>

             <Link href="/dashboard/admin/settings">
                <DoodleCard className="p-5 flex flex-col items-center justify-center text-center gap-3 aspect-square hover:-translate-y-1 transition-transform group cursor-pointer bg-cream/30">
                  <div className="w-10 h-10 rounded-full bg-charcoal/10 text-charcoal flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                  </div>
                  <span className="font-sans text-sm font-bold text-charcoal">Settings</span>
                </DoodleCard>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
