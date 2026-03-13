"use client";

import React, { useState, useEffect } from "react";
import DoodleCard from "@/components/ui/DoodleCard";
import DoodleButton from "@/components/ui/DoodleButton";
import DoodleTag from "@/components/ui/DoodleTag";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export default function AdminSummariesPage() {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [search, setSearch] = useState("");
  const [viewId, setViewId] = useState<string | null>(null);
  
  const [summaries, setSummaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;
    
    const fetchSummaries = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (filter !== "All") queryParams.append("filter", filter);
        if (sort) queryParams.append("sort", sort);
        if (search) queryParams.append("search", search);

        const res = await fetchWithAuth(`/api/admin/summaries?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setSummaries(data.summaries);
        }
      } catch (err) {
        console.error("Failed to load summaries", err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search slightly
    debounceTimer = setTimeout(() => {
      fetchSummaries();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [filter, sort, search]);

  const needsReview = summaries.filter(s => s.rating > 0 && s.rating < 3);

  function StarRating({ rating }: { rating: number }) {
    if (rating === 0) return <span className="text-xs text-charcoal/40 font-sans italic">Not rated</span>;
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(i => (
          <svg key={i} viewBox="0 0 20 20" width="14" height="14" className={i <= Math.round(rating) ? "text-mustard" : "text-charcoal/20"}>
            <polygon points="10,1 12.5,7.5 19.5,7.5 14,12 16,19 10,15 4,19 6,12 0.5,7.5 7.5,7.5" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
          </svg>
        ))}
        <span className="text-xs text-charcoal/60 ml-1 font-sans">{rating.toFixed(1)}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-12">
      {/* ── HEADER ── */}
      <div className="flex flex-col gap-4">
        <h1 className="font-caveat text-[52px] text-ink leading-none mt-4">All Summaries ✦</h1>

        {/* Library Illustration */}
        <div className="w-full h-[180px] rounded-2xl bg-cream/30 border-2 border-charcoal/10 overflow-hidden relative flex items-center justify-center">
          <svg viewBox="0 0 1200 180" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <rect width="100%" height="100%" fill="#F5F0E8" opacity="0.5" />
            {/* Bookshelves */}
            {[0, 1, 2, 3, 4].map(shelf => (
              <g key={shelf}>
                <rect x={100 + shelf * 220} y="20" width="200" height="140" fill="none" stroke="#2C2C2C" strokeWidth="3" rx="2" />
                {/* Shelves */}
                {[0, 1, 2].map(row => (
                  <g key={row}>
                    <line x1={100 + shelf * 220} y1={60 + row * 40} x2={300 + shelf * 220} y2={60 + row * 40} stroke="#2C2C2C" strokeWidth="2" />
                    {/* Books */}
                    {Array.from({ length: 6 + Math.floor(Math.random() * 3) }).map((_, b) => {
                      const bx = 108 + shelf * 220 + b * 14;
                      const colors = ["#E26D5C", "#D4AF37", "#8FAF72", "#2C2C2C", "#8FAF72", "#D4AF37", "#E26D5C", "#2C2C2C", "#D4AF37"];
                      return <rect key={b} x={bx} y={25 + row * 40} width="10" height={32} fill={colors[b % colors.length]} opacity={0.7 + Math.random() * 0.3} rx="1" />;
                    })}
                  </g>
                ))}
              </g>
            ))}
            {/* Tiny researcher with torch */}
            <g transform="translate(580, 125)">
              <circle cx="0" cy="-10" r="6" fill="#2C2C2C" />
              <rect x="-5" y="-4" width="10" height="20" fill="#2C2C2C" rx="2" />
              <path d="M 8 -5 L 15 -15" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
              <circle cx="17" cy="-18" r="5" fill="#D4AF37" opacity="0.4" />
              <circle cx="17" cy="-18" r="8" fill="#D4AF37" opacity="0.15" />
            </g>
          </svg>
        </div>
      </div>

      {/* ── SEARCH & FILTER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative group">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="Search by title or PMID..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg bg-cream/30 border-2 border-charcoal/10 border-b-charcoal focus:outline-none focus:border-b-terracotta transition-colors font-sans text-sm w-full md:w-64 text-charcoal placeholder:text-charcoal/40" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {["All", "PDF", "PubMed", "Highly Rated", "Needs Review"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-sans font-semibold transition-colors border-2 ${filter === f ? "border-terracotta bg-terracotta/10 text-terracotta" : "border-transparent bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)}
          className="bg-cream/30 border-2 border-charcoal/10 rounded-lg px-3 py-2 font-sans text-sm text-charcoal outline-none cursor-pointer hover:border-charcoal/40 transition-colors">
          {["Newest", "Oldest", "Highest Rated", "Lowest Rated"].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Table */}
        <div className="lg:col-span-2">
          <DoodleCard className="p-0 overflow-hidden min-h-[400px]">
            {loading ? (
              <div className="p-12 flex justify-center text-charcoal/50 font-caveat text-xl">Loading summaries...</div>
            ) : summaries.length > 0 ? (
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-charcoal/10 text-charcoal/60 font-sans text-xs tracking-wide uppercase">
                      <th className="font-semibold py-4 px-5">Paper</th>
                      <th className="font-semibold py-4 px-5">User</th>
                      <th className="font-semibold py-4 px-5">Rating</th>
                      <th className="font-semibold py-4 px-5">Status</th>
                      <th className="font-semibold py-4 px-5">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="font-sans text-sm">
                    {summaries.map(s => (
                      <tr key={s.id} className="border-b border-charcoal/5 last:border-0 hover:bg-cream/20 transition-colors">
                        <td className="py-4 px-5 max-w-xs">
                          <p className="font-semibold text-charcoal truncate" title={s.title}>{s.title}</p>
                          <p className="text-xs text-charcoal/50 mt-0.5">{s.pmid ? `PMID: ${s.pmid}` : "PDF Upload"} · {new Date(s.date).toLocaleDateString()}</p>
                        </td>
                        <td className="py-4 px-5 text-charcoal/70 whitespace-nowrap">{s.user}</td>
                        <td className="py-4 px-5"><StarRating rating={s.rating} /></td>
                        <td className="py-4 px-5">
                          <DoodleTag color={s.status === "Completed" ? "sage" : s.status === "Processing" ? "mustard" : "terracotta"} className="text-[10px] px-2 py-0.5">
                            {s.status}
                          </DoodleTag>
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2">
                            <button onClick={() => setViewId(s.id)} className="text-xs font-bold text-olive hover:text-ink transition-colors">View</button>
                            <button className="text-xs font-bold text-terracotta hover:text-ink transition-colors">Delete</button>
                            {s.rating > 0 && s.rating < 3 && <button className="text-xs font-bold text-mustard hover:text-ink transition-colors whitespace-nowrap">Re-run ↺</button>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
                <div className="py-20 flex flex-col items-center text-center">
                  <h3 className="font-caveat text-3xl text-charcoal/60 mt-4">No summaries found</h3>
                </div>
            )}
          </DoodleCard>
        </div>

        {/* RIGHT: Needs Review Panel */}
        <div className="lg:col-span-1">
          <h2 className="font-caveat text-3xl text-charcoal mb-4 flex items-center gap-2">
            Needs Review
            <span className="text-terracotta">⚠</span>
          </h2>

          {!loading && needsReview.length > 0 ? (
            <div className="space-y-4">
              {needsReview.map(s => (
                <DoodleCard key={s.id} className="p-5 border-l-4 border-terracotta/50 bg-terracotta/[0.03]">
                  <p className="font-sans text-sm font-semibold text-charcoal truncate" title={s.title}>{s.title}</p>
                  <p className="text-xs text-charcoal/50 mt-1">{s.pmid ? `PMID: ${s.pmid}` : "PDF"}</p>
                  <div className="mt-2"><StarRating rating={s.rating} /></div>
                  <div className="mt-3">
                    <button className="flex items-center gap-1 text-xs font-bold text-terracotta hover:text-ink transition-colors group">
                      Re-summarize
                      <span className="group-hover:rotate-180 transition-transform inline-block">↺</span>
                    </button>
                  </div>
                </DoodleCard>
              ))}
              {/* Scientist reviewing SVG */}
              <div className="flex justify-center pt-4 opacity-50">
                <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
                  <circle cx="40" cy="20" r="10" stroke="#2C2C2C" strokeWidth="2" />
                  <path d="M 25 45 C 25 30, 55 30, 55 45 L 55 65 L 25 65 Z" stroke="#2C2C2C" strokeWidth="2" fill="none" />
                  <path d="M 55 40 L 70 35" stroke="#E26D5C" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 15 55 L 25 50" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
                  <rect x="10" y="45" width="15" height="20" fill="none" stroke="#2C2C2C" strokeWidth="1.5" rx="1" />
                </svg>
              </div>
            </div>
          ) : !loading ? (
            <DoodleCard className="p-8 text-center">
              <p className="font-caveat text-2xl text-charcoal/50">All clear! ✓</p>
            </DoodleCard>
          ) : (
            <DoodleCard className="p-8 text-center">
              <p className="font-caveat text-xl text-charcoal/50">Checking...</p>
            </DoodleCard>
          )}
        </div>
      </div>

      {/* ── VIEW MODAL ── */}
      {viewId && (
        <div className="fixed inset-0 bg-ink/40 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setViewId(null)}>
          <div onClick={(e: React.MouseEvent) => e.stopPropagation()} className="w-full max-w-2xl">
            <DoodleCard className="w-full bg-paper p-8 relative max-h-[80vh] overflow-y-auto">
              <button onClick={() => setViewId(null)} className="absolute top-4 right-4 text-charcoal/40 hover:text-ink transition-colors">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            {(() => {
              const s = summaries.find(x => x.id === viewId);
              if (!s) return null;
              return (
                <div className="space-y-4">
                  <h2 className="font-caveat text-3xl text-ink">{s.title}</h2>
                  <div className="flex items-center gap-3 flex-wrap">
                    <DoodleTag color={s.source === "PubMed" ? "olive" : "mustard"} className="text-[10px]">{s.source}</DoodleTag>
                    <DoodleTag color={s.status === "Completed" ? "sage" : "terracotta"} className="text-[10px]">{s.status}</DoodleTag>
                    <StarRating rating={s.rating} />
                  </div>
                  <p className="font-sans text-sm text-charcoal/60">By {s.user} · {new Date(s.date).toLocaleDateString()}</p>
                  <div className="border-t border-charcoal/10 pt-4 space-y-3 font-sans text-sm text-charcoal/80 leading-relaxed">
                    <p><strong className="text-ink">Context:</strong> For full summary text, implement `fetch(/api/summary/${viewId})` which loads the full document.</p>
                  </div>
                </div>
              );
            })()}
            </DoodleCard>
          </div>
        </div>
      )}
    </div>
  );
}
