"use client";

import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useSession } from "next-auth/react";

import DoodleCard from "@/components/ui/DoodleCard";
import DoodleTag from "@/components/ui/DoodleTag";
import DoodleButton from "@/components/ui/DoodleButton";
import {
  MiniPapersIcon,
  MiniLightningIcon,
  MiniStarIcon,
  UpwardArrowDoodle,
  PushpinIcon,
} from "@/components/illustrations/DashboardIcons";

// ── Types ──
type StatCard = {
  title: string;
  value: string | number;
  change: string;
  icon: any;
  positive: boolean;
};

type RecentSummary = {
  id: string;
  title: string;
  pmid: string;
  date: string;
  status: "complete" | "pending" | "processing";
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    papersSummarized: 0,
    apiCallsToday: 0,
    feedbackGiven: 0,
  });
  const [summaries, setSummaries] = useState<RecentSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetchWithAuth("/api/dashboard/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data.stats);
          setSummaries(data.recentSummaries);
        }
      } catch (e) {
        console.error("Error loading dashboard data:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const statCards: StatCard[] = [
    { title: "Papers Summarized", value: stats.papersSummarized, change: "All time", icon: MiniPapersIcon, positive: true },
    { title: "API Calls", value: stats.apiCallsToday, change: "Lifetime total", icon: MiniLightningIcon, positive: true },
    { title: "Feedback Given", value: stats.feedbackGiven, change: "Helpful", icon: MiniStarIcon, positive: false },
  ];

  const userName = session?.user?.name || "Researcher";

  return (
    <div className="p-8 md:p-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="font-caveat text-5xl text-ink">Good morning, {userName} ✦</h1>
          <p className="font-sans text-charcoal/60 mt-1">Here&apos;s a look at your recent extraction activity.</p>
        </header>

        <div className="flex flex-col xl:flex-row gap-8">
          {/* ── Left Column: Stats & Table ── */}
          <div className="flex-1 space-y-10">
            {/* Stat Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {statCards.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <DoodleCard key={i} className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-caveat text-xl text-charcoal/80">{stat.title}</h3>
                      <div className="w-8 h-8 opacity-80"><Icon /></div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans text-3xl font-bold text-ink">{stat.value}</span>
                      <span className={`font-caveat text-sm ${stat.positive ? "text-sage" : "text-charcoal/50"}`}>
                        {stat.change}
                        {stat.positive && <UpwardArrowDoodle />}
                      </span>
                    </div>
                  </DoodleCard>
                );
              })}
            </div>

            {/* Recent Summaries Table Section */}
            <div>
              <div className="flex items-end justify-between mb-4">
                <h2 className="font-caveat text-3xl text-ink">Recent Summaries</h2>
                <DoodleButton variant="ghost" className="!text-sm !py-1.5 !px-3">View All →</DoodleButton>
              </div>

              {/* Hand-drawn Table container */}
              <div className="relative bg-paper rounded-xl p-6 border-2 border-charcoal/10 shadow-sm">
                {/* SVG Table grid lines — sketchy */}
                <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                  {/* Header separator */}
                  <path d="M 20 50 C 150 48, 400 52, 1000 50" stroke="#2C2C2C" strokeWidth="1" strokeLinecap="round" opacity="0.15" />
                  {/* Row separators */}
                  <path d="M 20 100 C 200 102, 600 98, 1000 100" stroke="#2C2C2C" strokeWidth="1" strokeDasharray="4 6" opacity="0.1" />
                  <path d="M 20 150 C 300 148, 700 152, 1000 150" stroke="#2C2C2C" strokeWidth="1" strokeDasharray="4 6" opacity="0.1" />
                </svg>

                <div className="overflow-x-auto relative z-10">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr>
                        <th className="font-caveat text-lg text-charcoal/60 pb-4 font-normal pl-2 min-w-[200px]">Paper Title</th>
                        <th className="font-caveat text-lg text-charcoal/60 pb-4 font-normal">PMID</th>
                        <th className="font-caveat text-lg text-charcoal/60 pb-4 font-normal">Date</th>
                        <th className="font-caveat text-lg text-charcoal/60 pb-4 font-normal">Status</th>
                        <th className="font-caveat text-lg text-charcoal/60 pb-4 font-normal text-right pr-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-charcoal/50 font-sans">
                            Loading your summaries...
                          </td>
                        </tr>
                      ) : summaries.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-charcoal/50 font-sans">
                            No summaries found. Start extracting to see them here!
                          </td>
                        </tr>
                      ) : summaries.map((item) => (
                        <tr key={item.id} className="group transition-colors hover:bg-cream/40">
                          <td className="py-4 pl-2 font-sans font-medium text-ink pr-4">
                            {item.title}
                          </td>
                          <td className="py-4 font-sans text-sm text-charcoal/60">{item.pmid}</td>
                          <td className="py-4 font-sans text-sm text-charcoal/60">{item.date}</td>
                          <td className="py-4">
                            <DoodleTag color={item.status === "complete" ? "olive" : "mustard"} className="!py-0.5 !px-2 !text-xs">
                              {item.status.toUpperCase()}
                            </DoodleTag>
                          </td>
                          <td className="py-4 text-right pr-2">
                            <button className="font-caveat text-terracotta text-sm hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                              View Result →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Tip of the day Widget ── */}
          <div className="w-full xl:w-72 flex-shrink-0">
            {/* Pinned Notecard */}
            <div className="relative bg-[#FFFDF8] border-2 border-charcoal/15 shadow-sm p-6 transform rotate-2">
              <PushpinIcon />

              <h4 className="font-caveat text-2xl text-terracotta mb-2 border-b border-charcoal/10 pb-2">
                Tip of the day ✨
              </h4>
              
              <p className="font-sans text-sm text-charcoal/80 leading-relaxed mt-4">
                You can extract specific methodology details by passing custom prompt modifiers to the API in the{" "}
                <code className="bg-charcoal/5 px-1 py-0.5 rounded font-mono text-xs">instructions</code> field.
              </p>

              {/* Decorative squiggle at bottom */}
              <svg aria-hidden="true" className="w-20 h-4 mt-6 mx-auto" viewBox="0 0 40 10" fill="none">
                <path d="M 2 5 C 6 2, 10 8, 14 5 C 18 2, 22 8, 26 5 C 30 2, 34 8, 38 5" stroke="#C4622D" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
              </svg>

              {/* Folded corner bottom right */}
              <div className="absolute bottom-[-2px] right-[-2px]">
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M 2 24 L 24 24 L 24 2 Z" fill="#F5F0E8" />
                  <path d="M 0 24 L 24 0 L 0 0 Z" fill="#EDE8DC" />
                  <path d="M 0 24 L 24 0" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                </svg>
              </div>
            </div>

            {/* Just an extra doodle context below the card */}
            <div className="mt-8 opacity-[0.15] pl-4">
              <svg aria-hidden="true" width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="20" cy="20" r="10" stroke="#2C2C2C" strokeWidth="1.5" />
                <path d="M 25 25 L 45 45" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
                <circle cx="45" cy="45" r="3" fill="#2C2C2C" />
              </svg>
            </div>
          </div>
        </div>
    </div>
  );
}
