"use client";

import React, { useEffect, useState } from "react";
import DoodleCard from "@/components/ui/DoodleCard";
import DoodleButton from "@/components/ui/DoodleButton";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export default function AdminAnalyticsPage() {
  const [animateRatings, setAnimateRatings] = useState(false);
  const [animateLine, setAnimateLine] = useState(false);

  const [ratingDistribution, setRatingDistribution] = useState<any[]>([]);
  const [dailyUsage, setDailyUsage] = useState<any[]>([]);
  const [recentFeedback, setRecentFeedback] = useState<any[]>([]);
  const [trends, setTrends] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth("/api/admin/analytics");
      if (res.ok) {
        const data = await res.json();
        setRatingDistribution(data.ratingDistribution || []);
        setDailyUsage(data.dailyUsage || []);
        setRecentFeedback(data.recentFeedback || []);
        setTrends(data.trends || null);
        
        setTimeout(() => setAnimateRatings(true), 100);
        setTimeout(() => setAnimateLine(true), 300);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const barColors: Record<number, string> = { 5: "#8FAF72", 4: "#a4c084", 3: "#D4AF37", 2: "#E8A848", 1: "#E26D5C" };

  /* ── SVG Line Chart Helpers ── */
  const maxCalls = dailyUsage.length > 0 ? Math.max(...dailyUsage.map(d => d.calls), 1) : 1;
  const chartW = 800;
  const chartH = 200;
  const padX = 40;
  const padY = 20;
  const plotW = chartW - padX * 2;
  const plotH = chartH - padY * 2;

  const points = dailyUsage.map((d, i) => {
    const x = padX + (i / Math.max(dailyUsage.length - 1, 1)) * plotW;
    const y = padY + plotH - (d.calls / maxCalls) * plotH;
    /* add tiny random jitter for hand-drawn feel */
    const jx = x + (Math.sin(i * 3.7) * 2);
    const jy = y + (Math.cos(i * 2.3) * 2);
    return { x: jx, y: jy, ...d };
  });

  const linePath = points.length > 0 
    ? points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ")
    : "M 0 0";
  const totalLen = 2000; /* approximate path length */

  return (
    <div className="flex flex-col gap-10 max-w-7xl mx-auto pb-12">
      {/* ── HEADER ── */}
      <div className="flex flex-col gap-4">
        <h1 className="font-caveat text-[52px] text-ink leading-none mt-4">What Researchers Are Saying ✦</h1>

        {/* Cozy Study Illustration */}
        <div className="w-full h-[200px] rounded-2xl bg-cream/30 border-2 border-charcoal/10 overflow-hidden flex items-center justify-center">
          <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <rect width="100%" height="100%" fill="#F5F0E8" opacity="0.5" />
            {/* Bookshelf background */}
            <rect x="50" y="20" width="300" height="160" fill="none" stroke="#2C2C2C" strokeWidth="3" />
            {[0, 1, 2, 3].map(r => (
              <g key={r}>
                <line x1="50" y1={60 + r * 35} x2="350" y2={60 + r * 35} stroke="#2C2C2C" strokeWidth="2" />
                {Array.from({ length: 10 }).map((_, b) => {
                  const cols = ["#E26D5C", "#D4AF37", "#8FAF72", "#2C2C2C"];
                  return <rect key={b} x={58 + b * 28} y={25 + r * 35} width={22} height={30} fill={cols[b % 4]} opacity={0.6} rx="1" />;
                })}
              </g>
            ))}
            {/* Armchair */}
            <g transform="translate(550, 70)">
              <path d="M -40 40 C -50 20, -50 -10, -30 -20 L 30 -20 C 50 -10, 50 20, 40 40" fill="#D4AF37" opacity="0.5" stroke="#2C2C2C" strokeWidth="2" />
              <rect x="-35" y="40" width="70" height="20" fill="#D4AF37" opacity="0.5" stroke="#2C2C2C" strokeWidth="2" rx="3" />
              <rect x="-40" y="60" width="10" height="30" fill="#2C2C2C" rx="2" />
              <rect x="30" y="60" width="10" height="30" fill="#2C2C2C" rx="2" />
            </g>
            {/* Person in armchair reading */}
            <g transform="translate(550, 50)">
              <circle cx="0" cy="-5" r="12" fill="#2C2C2C" />
              <path d="M -15 15 C -15 5, 15 5, 15 15 L 15 45 L -15 45 Z" fill="#2C2C2C" />
              {/* Stack of letters */}
              <g transform="translate(20, 10)">
                <rect x="0" y="0" width="30" height="20" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.5" transform="rotate(-10)" />
                <rect x="5" y="-5" width="30" height="20" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.5" transform="rotate(5)" />
              </g>
            </g>
            {/* Warm lamp */}
            <g transform="translate(680, 30)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="#2C2C2C" strokeWidth="2" />
              <path d="M -15 40 L 15 40 L 10 55 L -10 55 Z" fill="#D4AF37" opacity="0.8" stroke="#2C2C2C" strokeWidth="2" />
              <circle cx="0" cy="65" r="20" fill="#D4AF37" opacity="0.1" />
              <circle cx="0" cy="65" r="35" fill="#D4AF37" opacity="0.05" />
            </g>
            {/* Window right side */}
            <rect x="900" y="20" width="200" height="130" fill="none" stroke="#2C2C2C" strokeWidth="3" />
            <line x1="1000" y1="20" x2="1000" y2="150" stroke="#2C2C2C" strokeWidth="2" />
            <line x1="900" y1="85" x2="1100" y2="85" stroke="#2C2C2C" strokeWidth="2" />
            <circle cx="970" cy="50" r="30" fill="#E26D5C" opacity="0.1" />
          </svg>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center font-caveat text-xl text-charcoal/50">Fetching analytics...</div>
      ) : (
        <>
          {/* ── SECTION 1: Rating Distribution ── */}
          <div>
            <h2 className="font-caveat text-3xl text-charcoal mb-4">Rating Distribution</h2>
            <DoodleCard className="p-8">
              <div className="space-y-4">
                {ratingDistribution.map(r => (
                  <div key={r.stars} className="flex items-center gap-4">
                    <span className="font-caveat text-xl text-charcoal w-10 text-right">{r.stars}★</span>
                    <div className="flex-1 h-8 bg-charcoal/5 rounded-lg overflow-hidden relative border border-charcoal/10">
                      <div
                        className="h-full rounded-lg transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                        style={{
                          width: animateRatings ? `${r.pct}%` : "0%",
                          backgroundColor: barColors[r.stars],
                          /* Slightly imperfect edge illusion via box-shadow */
                          boxShadow: `inset 0 -2px 0 rgba(0,0,0,0.1), inset 0 2px 0 rgba(255,255,255,0.15)`,
                        }}
                      >
                        <span className="font-caveat text-lg text-white drop-shadow-sm">{r.count}</span>
                      </div>
                    </div>
                    <span className="font-sans text-sm text-charcoal/60 w-12 text-right">{r.pct}%</span>
                  </div>
                ))}
              </div>
            </DoodleCard>
          </div>

          {/* ── SECTION 2: Daily Usage Line Chart ── */}
          <div>
            <h2 className="font-caveat text-3xl text-charcoal mb-4">Daily Content Generation (Last 14 Days)</h2>
            <DoodleCard className="p-8">
              {dailyUsage.length > 0 ? (
                <svg viewBox={`0 0 ${chartW} ${chartH + 30}`} className="w-full" style={{ maxHeight: 300 }}>
                  {/* Y-axis gridlines */}
                  {[0, 0.25, 0.5, 0.75, 1].map(frac => {
                    const y = padY + plotH - frac * plotH;
                    return (
                      <g key={frac}>
                        <line x1={padX} y1={y} x2={chartW - padX} y2={y} stroke="#2C2C2C" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.15" />
                        <text x={padX - 8} y={y + 4} textAnchor="end" className="font-sans" fontSize="10" fill="#2C2C2C" opacity="0.5">
                          {Math.round(frac * maxCalls)}
                        </text>
                      </g>
                    );
                  })}

                  {/* The wobbly line */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke="#E26D5C"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: totalLen,
                      strokeDashoffset: animateLine ? 0 : totalLen,
                      transition: "stroke-dashoffset 2s ease-out",
                    }}
                  />

                  {/* Data point dots */}
                  {points.map((p, i) => (
                    <g key={i}>
                      <circle cx={p.x} cy={p.y} r="5" fill="#E26D5C" stroke="#F5F0E8" strokeWidth="2"
                        style={{ opacity: animateLine ? 1 : 0, transition: `opacity 0.3s ease ${0.6 + i * 0.1}s` }} />
                      {/* X-axis label */}
                      <text x={p.x} y={chartH + 15} textAnchor="middle" fontSize="10" fill="#2C2C2C" opacity="0.5" className="font-caveat">
                        {p.day?.split(" ")[0]} {p.day?.split(" ")[1]}
                      </text>
                    </g>
                  ))}
                </svg>
              ) : (
                <div className="py-12 text-center text-charcoal/50 font-caveat text-xl">Not enough data to graph</div>
              )}
            </DoodleCard>
          </div>

          {/* ── SECTION 3: Recent Feedback (Sticky Notes) ── */}
          <div>
            <h2 className="font-caveat text-3xl text-charcoal mb-4">Recent Feedback</h2>
            {recentFeedback.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentFeedback.map((fb, i) => {
                  const rotations = [-1.5, 1, -0.5, 1.5, -1, 0.8];
                  const bgs = ["bg-mustard/10", "bg-cream/50", "bg-mustard/10", "bg-cream/50", "bg-mustard/10", "bg-cream/50"];
                  return (
                    <DoodleCard key={fb.id} className={`p-6 relative ${bgs[i % bgs.length]}`} style={{ transform: `rotate(${rotations[i % rotations.length]}deg)` }}>
                      {/* Pushpin */}
                      <svg className="absolute -top-2 left-1/2 -translate-x-1/2" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="8" r="5" fill="#E26D5C" stroke="#2C2C2C" strokeWidth="1.5" />
                        <line x1="10" y1="13" x2="10" y2="20" stroke="#2C2C2C" strokeWidth="1.5" />
                      </svg>

                      <div className="mt-3 space-y-3">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(s => (
                            <svg key={s} viewBox="0 0 20 20" width="14" height="14" className={s <= Math.round((fb.rating as number)) ? "text-mustard" : "text-charcoal/20"}>
                              <polygon points="10,1 12.5,7.5 19.5,7.5 14,12 16,19 10,15 4,19 6,12 0.5,7.5 7.5,7.5" fill="currentColor" />
                            </svg>
                          ))}
                        </div>
                        <p className="font-caveat text-lg text-charcoal leading-snug">"{fb.comment}"</p>
                        <div>
                          <p className="font-sans text-xs text-charcoal/60 truncate">{fb.paper}</p>
                          <p className="font-sans text-[10px] text-charcoal/40">{fb.date}</p>
                        </div>
                      </div>
                    </DoodleCard>
                  );
                })}
              </div>
            ) : (
              <DoodleCard className="p-12 text-center text-charcoal/50 font-caveat text-xl">No feedback received recently.</DoodleCard>
            )}
          </div>

          {/* ── SECTION 4: Summary Quality Trends ── */}
          {trends && (
            <div>
              <h2 className="font-caveat text-3xl text-charcoal mb-4">Platform Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DoodleCard className="p-6 flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full bg-olive/10 text-olive flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                  </div>
                  <span className="font-sans text-xs text-charcoal/60 uppercase tracking-wide font-semibold">Most Summarized This Week</span>
                  <span className="font-caveat text-2xl text-ink leading-tight">{trends.mostSummarized}</span>
                </DoodleCard>

                <DoodleCard className="p-6 flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </div>
                  <span className="font-sans text-xs text-charcoal/60 uppercase tracking-wide font-semibold">Most Active Researcher</span>
                  <span className="font-caveat text-2xl text-ink leading-tight">{trends.activeResearcher}</span>
                </DoodleCard>

                <DoodleCard className="p-6 flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full bg-mustard/10 text-mustard flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  </div>
                  <span className="font-sans text-xs text-charcoal/60 uppercase tracking-wide font-semibold">Peak Usage Hour</span>
                  <span className="font-caveat text-2xl text-ink leading-tight">{trends.peakHour}</span>
                </DoodleCard>
              </div>
            </div>
          )}

          {/* ── EXPORT ── */}
          <div className="flex justify-end">
            <DoodleButton>Export Full Analytics CSV</DoodleButton>
          </div>
        </>
      )}
    </div>
  );
}
