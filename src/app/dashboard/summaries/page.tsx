"use client";

import React, { useState, useEffect } from "react";

import DoodleCard from "@/components/ui/DoodleCard";
import DoodleButton from "@/components/ui/DoodleButton";
import DoodleTag from "@/components/ui/DoodleTag";
import { LibraryShelfIllustration, EmptyDeskIllustration } from "@/components/illustrations";
import { StarRatingDoodle, TornEdgeSVG } from "@/components/illustrations/SummarizeIcons";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useSession } from "next-auth/react";

// Local Trash SVG component
function TrashIconDoodle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}


// Local Magnifying Glass
function SearchIconDoodle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

type Tab = "findings" | "methodology" | "conclusions" | "limitations";

interface SummaryItem {
  id: string;
  paperTitle: string;
  pmid?: string;
  year: string;
  dateAdded: string;
  rating: number;
  keyFindings: string;
  methodology: string;
  conclusions: string;
  limitations: string;
  isPdf: boolean;
}

// Dummy data for now
const dummySummaries: SummaryItem[] = [
  {
    id: "1",
    paperTitle: "CRISPR-Cas9 Efficacy in Hepatic Gene Editing via LNP Delivery: A Randomized Controlled Trial",
    pmid: "38291047",
    year: "2024",
    dateAdded: "Oct 12, 2024",
    rating: 5,
    keyFindings: "The study demonstrated a 43% reduction in biomarker expression in the targeted cohort with statistical significance (p < 0.001).",
    methodology: "Double-blind, placebo-controlled trial with n=2,400 participants across 12 clinical sites.",
    conclusions: "The proposed delivery system shows strong viability for in vivo therapeutic applications.",
    limitations: "Study was limited to murine models; human efficacy requires further validation.",
    isPdf: false
  },
  {
    id: "2",
    paperTitle: "Assessment of novel mRNA architectures for enhanced stability and translation efficiency",
    year: "2023",
    dateAdded: "Sep 28, 2024",
    rating: 4,
    keyFindings: "Modified UTR sequences increased half-life by 2.4x compared to unmodified transcripts.",
    methodology: "In vitro translation assays combined with polysome profiling.",
    conclusions: "The UTR modifications presented offer a robust platform for future therapeutics.",
    limitations: "In vivo stability was not assessed in this primary study.",
    isPdf: true
  },
  {
    id: "3",
    paperTitle: "Machine learning applications in high-throughput screening data analysis",
    pmid: "37102938",
    year: "2023",
    dateAdded: "Sep 15, 2024",
    rating: 0,
    keyFindings: "Random forest models outperformed standard regression for hit identification across 5 cell lines.",
    methodology: "Retrospective analysis of HTS datasets containing over 500,000 compounds.",
    conclusions: "Implementation of ML workflows can reduce false positive rates by up to 15%.",
    limitations: "Model performance is highly dependent on training set diversity.",
    isPdf: false
  }
];

// Reusing the BulletItem from SummarizePage
const BulletItem = ({ text }: { text: string }) => {
  return (
    <div className="flex gap-3 items-start group">
      <div className="mt-1">
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E26D5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:scale-110 transition-transform">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <p className="font-sans text-charcoal/80 leading-relaxed text-lg">
        {text}
      </p>
    </div>
  );
};

export default function SummariesPage() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest first");
  const [summaries, setSummaries] = useState<SummaryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal state
  const [selectedSummary, setSelectedSummary] = useState<SummaryItem | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("findings");

  useEffect(() => {
    if (session?.user) {
      fetchSummaries();
    }
  }, [session, searchQuery]);

  const fetchSummaries = async () => {
    try {
      setIsLoading(true);
      const url = new URL("/api/summaries", window.location.origin);
      url.searchParams.set("page", "1");
      url.searchParams.set("limit", "50"); // Get 50 for now instead of full pagination logic
      if (searchQuery) {
        url.searchParams.set("search", searchQuery);
      }
      
      const res = await fetchWithAuth(url.toString());
      if (res.ok) {
        const data = await res.json();
        setSummaries(data.summaries);
      }
    } catch (error) {
      console.error("Failed to fetch summaries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      const res = await fetchWithAuth(`/api/summary/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSummaries(summaries.filter(s => s.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete summary:", error);
    }
  };

  const handleView = async (summary: SummaryItem) => {
    try {
      const res = await fetchWithAuth(`/api/summary/${summary.id}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedSummary({
          ...summary,
          keyFindings: data.keyFindings,
          methodology: data.methodology,
          conclusions: data.conclusions,
          limitations: data.limitations
        });
        setActiveTab("findings");
      }
    } catch (error) {
      console.error("Failed to fetch summary details:", error);
      // Fallback to minimal data if full fetch fails
      setSelectedSummary(summary);
      setActiveTab("findings");
    }
  };

  const filteredSummaries = summaries.filter(s => {
    if (activeFilter === "PDF" && !s.isPdf) return false;
    if (activeFilter === "PubMed" && s.isPdf) return false;
    if (activeFilter === "Highly Rated" && s.rating < 4) return false;
    // Simple text search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!s.paperTitle.toLowerCase().includes(q) && !(s.pmid && s.pmid.includes(q))) {
        return false;
      }
    }
    return true;
  });

  // Sort logic
  const displayedSummaries = [...filteredSummaries].sort((a, b) => {
    if (sortBy === "Highest rated") {
      return b.rating - a.rating;
    }
    // Just mock newest/oldest for now with a stable order, assuming array order is newest
    return sortBy === "Newest first" ? 0 : -1; 
  });

  return (
    <div className="flex-1 p-8 xl:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          {/* ── HEADER ── */}
          <div className="mb-10 animate-in slide-in-from-bottom-4 duration-500">
            <h1 className="font-caveat text-5xl text-ink mb-2">Your Research Library ✦</h1>
            <p className="font-sans text-charcoal/60 text-lg">Every paper you&apos;ve distilled, saved and searchable</p>
            
            <div className="w-full mt-6 flex justify-center h-48 sm:h-56 bg-[#FFFdf8] border-2 border-charcoal/10 rounded-2xl overflow-hidden relative">
              <LibraryShelfIllustration className="w-full h-full object-cover opacity-90" />
            </div>
          </div>

          {/* ── SEARCH & FILTER BAR ── */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="relative w-full md:w-96">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/50">
                <SearchIconDoodle className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="Search by title or PMID..."
                className="w-full pl-10 pr-4 py-3 bg-[#FFFdf8] border-b-2 border-charcoal/20 focus:outline-none focus:border-olive font-sans text-ink placeholder-charcoal/40 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-caveat text-xl text-charcoal/60 mr-2">Filter:</span>
              {["All", "This Week", "Highly Rated", "PDF", "PubMed"].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1 rounded-full font-caveat text-xl transition-all border-2
                    ${activeFilter === filter 
                      ? "bg-mustard border-ink text-ink shadow-[2px_2px_0px_#1A1A2E]" 
                      : "bg-transparent border-charcoal/20 text-charcoal/60 hover:border-charcoal/50"}`}
                >
                  {filter}
                </button>
              ))}
              
              <div className="ml-4 relative">
                <select 
                  className="appearance-none bg-[#FFFdf8] border-2 border-charcoal/20 rounded-lg px-4 py-2 pr-8 font-caveat text-xl text-charcoal cursor-pointer focus:outline-none focus:border-olive"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option>Newest first</option>
                  <option>Oldest first</option>
                  <option>Highest rated</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal">
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            </div>
          </div>

          {/* ── SUMMARIES GRID ── */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
              <h3 className="font-caveat text-4xl text-charcoal/40 mb-6">Loading summaries...</h3>
            </div>
          ) : summaries.length === 0 && !searchQuery ? (
            // EMPTY STATE (Total empty)
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in">
              <EmptyDeskIllustration className="w-64 h-64 mb-6 opacity-80" />
              <h3 className="font-caveat text-4xl text-charcoal/40 mb-6">Nothing distilled yet.</h3>
              <a href="/dashboard/summarize">
                <DoodleButton variant="primary">
                  Summarize your first paper →
                </DoodleButton>
              </a>
            </div>
          ) : displayedSummaries.length === 0 ? (
            // EMPTY STATE (No search results)
            <div className="flex flex-col items-center justify-center py-20 outline-dashed outline-2 outline-charcoal/10 rounded-2xl bg-[#FFFdf8]/50">
              <h3 className="font-caveat text-3xl text-charcoal/40 mb-2">No matching summaries found.</h3>
              <button 
                className="text-terracotta border-b-2 border-terracotta/30 hover:border-terracotta transition-colors font-sans"
                onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            // GRID OF CARDS
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
              {displayedSummaries.map((summary) => (
                <div 
                  key={summary.id} 
                  className="group relative cursor-pointer"
                  onClick={() => handleView(summary)}
                >
                  <DoodleCard className="h-full flex flex-col p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-between items-start mb-3 gap-4">
                      <div className="flex items-center gap-2">
                        <DoodleTag color={summary.isPdf ? "mustard" : "olive"} className="!px-2 !py-0.5 !text-xs shrink-0">
                          {summary.isPdf ? "PDF" : "PubMed"}
                        </DoodleTag>
                        {summary.pmid && <span className="font-sans text-xs text-charcoal/40 font-bold">PMID: {summary.pmid}</span>}
                      </div>
                      <span className="font-sans text-xs text-olive font-bold tracking-wider">{summary.dateAdded}</span>
                    </div>
                    
                    <h3 className="font-caveat text-2xl text-ink leading-tight line-clamp-2 mb-2 group-hover:text-olive transition-colors">
                      {summary.paperTitle}
                    </h3>
                    
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div key={s} className="w-4 h-4 text-mustard">
                          <StarRatingDoodle filled={s <= summary.rating} />
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-cream/40 p-3 rounded-lg border-l-2 border-charcoal/10 mb-6 flex-grow">
                      <p className="font-sans text-charcoal/70 text-sm italic line-clamp-2">
                        &quot;{summary.keyFindings}&quot;
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto pt-2 border-t-2 border-charcoal/5 border-dashed">
                      <span className="font-caveat tracking-wider text-xl text-olive group-hover:underline underline-offset-4 decoration-2 decoration-mustard/50">
                        View details →
                      </span>
                      
                      <button 
                        onClick={(e) => handleDelete(e, summary.id)}
                        className="p-2 text-charcoal/30 hover:text-terracotta transition-colors rounded-full hover:bg-terracotta/10"
                        title="Delete summary"
                      >
                        <TrashIconDoodle className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-mustard text-ink font-caveat text-3xl px-6 py-2 rounded-2xl border-2 border-ink shadow-[4px_4px_0px_#1A1A2E] -rotate-6 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all pointer-events-none z-10">
                      Open!
                    </div>
                  </DoodleCard>
                </div>
              ))}
            </div>
          )}

        </div>

      {/* ── SUMMARY DETAIL MODAL ── */}
      {selectedSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 animate-in fade-in bg-ink/40 backdrop-blur-sm">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={() => setSelectedSummary(null)}></div>
          
          <div className="relative w-full max-w-5xl max-h-full flex flex-col items-center z-10 animate-in slide-in-from-bottom-8 duration-500 rounded-lg drop-shadow-[0_20px_20px_rgba(0,0,0,0.2)]">
            
            {/* Close Button X */}
            <button 
              onClick={() => setSelectedSummary(null)}
              className="absolute -top-12 right-0 md:-right-12 md:top-0 w-10 h-10 flex items-center justify-center text-cream hover:text-terracotta hover:scale-110 transition-all drop-shadow-md"
            >
              <svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            {/* White/Cream Paper Area */}
            <div className="w-full bg-[#FFFdf8] rounded-b-2xl shadow-xl flex flex-col max-h-[85vh]">
              {/* Torn Top Edge */}
              <div className="w-full h-8 text-[#FFFdf8] fill-current shrink-0 -mt-[1px]">
                <TornEdgeSVG />
              </div>

              {/* Scrollable Content inside Modal */}
              <div className="w-full flex-grow overflow-y-auto px-6 sm:px-10 pb-10">
                {/* Paper header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <DoodleTag color={selectedSummary.isPdf ? "mustard" : "olive"} className="!px-2 !py-0.5 !text-xs mb-3 inline-flex">
                      {selectedSummary.isPdf ? "PDF UPLOAD" : "PUBMED"}
                    </DoodleTag>
                    <h2 className="font-caveat font-sans font-bold text-2xl md:text-3xl text-ink leading-tight">
                      {selectedSummary.paperTitle}
                    </h2>
                    <p className="font-sans text-sm text-charcoal/60 mt-2">
                      {selectedSummary.dateAdded} • Year: {selectedSummary.year}
                      {selectedSummary.pmid && ` • PMID: ${selectedSummary.pmid}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 bg-cream p-2 rounded-xl border border-charcoal/10">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="w-5 h-5 text-mustard">
                        <StarRatingDoodle filled={s <= selectedSummary.rating} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex overflow-x-auto pb-1 mt-8 mb-6 border-b-2 border-charcoal/10 no-scrollbar relative shrink-0">
                  <div 
                    className="absolute bottom-0 h-1 bg-terracotta transition-all duration-300 rounded-t-sm"
                    style={{
                      width: '120px',
                      left: activeTab === 'findings' ? '0px' : 
                            activeTab === 'methodology' ? '120px' : 
                            activeTab === 'conclusions' ? '240px' : '360px'
                    }}
                  />
                  {(['findings', 'methodology', 'conclusions', 'limitations'] as Tab[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`w-[120px] shrink-0 font-caveat text-2xl pb-2 transition-colors relative z-10
                        ${activeTab === tab ? "text-ink" : "text-charcoal/40 hover:text-charcoal/70"}`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="relative z-10 ml-0 md:ml-4 md:pl-4 min-h-[200px]">
                  {activeTab === "findings" && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-300">
                      <BulletItem text={selectedSummary.keyFindings} />
                    </div>
                  )}
                  {activeTab === "methodology" && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-300">
                      <BulletItem text={selectedSummary.methodology} />
                    </div>
                  )}
                  {activeTab === "conclusions" && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-300">
                      <BulletItem text={selectedSummary.conclusions} />
                    </div>
                  )}
                  {activeTab === "limitations" && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-300">
                      <BulletItem text={selectedSummary.limitations} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
