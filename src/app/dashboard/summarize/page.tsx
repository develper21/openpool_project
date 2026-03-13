"use client";

import React, { useState, useRef } from "react";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

import DoodleCard from "@/components/ui/DoodleCard";
import DoodleButton from "@/components/ui/DoodleButton";
import DoodleTag from "@/components/ui/DoodleTag";
import {
  MagnifyingGlassCatalog,
  PdfWingsIllustration,
  LaboratoryBenchBanner,
  RunningScientistIllustration
} from "@/components/illustrations";
import {
  LightbulbDoodle,
  BeakerDoodle,
  CheckmarkCircleDoodle,
  WarningTriangleDoodle,
  StarRatingDoodle,
  TornEdgeSVG
} from "@/components/illustrations/SummarizeIcons";

type Status = "idle" | "loading" | "success" | "error";
type Tab = "findings" | "methodology" | "conclusions" | "limitations";

interface SummaryResult {
  id: string; // The database ID
  keyFindings: string;
  methodology: string;
  conclusions: string;
  limitations: string;
  paperTitle: string;
  year: string;
  processingTimeMs?: number;
  pdfFileName?: string;
}

export default function SummarizePage() {
  const [status, setStatus] = useState<Status>("idle");
  const [pmid, setPmid] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("findings");
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [summaryData, setSummaryData] = useState<SummaryResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmitFeedback = async () => {
    if (!summaryData?.id || rating === 0) return;
    try {
      await fetchWithAuth("/api/feedback", {
        method: "POST",
        body: JSON.stringify({
          type: "summary",
          rating,
          message: feedbackText,
          summaryId: summaryData.id
        })
      });
      setFeedbackSubmitted(true);
    } catch (e) {
      console.error(e);
    }
  };

  // ── Real API call: Summarize by PMID ──
  const handleSummarizeByPmid = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pmid.trim()) return;

    setStatus("loading");
    setErrorMessage("");
    setSummaryData(null);

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pmid: pmid.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Request failed with status ${res.status}`);
      }

      setSummaryData(data);
      setStatus("success");
      setActiveTab("findings");
      setFeedbackSubmitted(false);
      setRating(0);
      setFeedbackText("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(message);
      setStatus("error");
    }
  };

  // ── Real API call: Upload PDF ──
  const handleUploadPdf = async (file: File) => {
    setStatus("loading");
    setErrorMessage("");
    setSummaryData(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Request failed with status ${res.status}`);
      }

      setSummaryData(data);
      setStatus("success");
      setActiveTab("findings");
      setFeedbackSubmitted(false);
      setRating(0);
      setFeedbackText("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(message);
      setStatus("error");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadPdf(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUploadPdf(e.target.files[0]);
    }
  };

  const handleCopyJson = () => {
    if (summaryData) {
      navigator.clipboard.writeText(JSON.stringify(summaryData, null, 2));
    }
  };

  const processingTime = summaryData?.processingTimeMs
    ? (summaryData.processingTimeMs / 1000).toFixed(1)
    : "–";

  return (
    <div className="p-8 md:p-12 lg:px-20 max-w-7xl mx-auto">
        
        {/* ── HEADER ── */}
        <header className="mb-10 text-center relative">
          <div className="w-full h-32 md:h-48 mb-6 overflow-hidden flex justify-center mt-[-20px]">
            <LaboratoryBenchBanner className="w-full max-w-3xl object-contain drop-shadow-sm" />
          </div>
          <h1 className="font-caveat text-[64px] text-ink leading-none">
            Drop a paper. Get the essence. ✦
          </h1>
          <p className="font-sans text-lg text-charcoal/70 mt-3 max-w-xl mx-auto">
            Paste a PubMed ID or upload a PDF — we&apos;ll handle the rest
          </p>
        </header>

        {/* ── INPUT CARDS SECTION ── */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-10 mb-16 relative w-full max-w-5xl mx-auto">
          
          {/* LEFT CARD — By PubMed ID */}
          <DoodleCard className="flex-1 flex flex-col p-8 items-center text-center">
            <h2 className="font-caveat text-3xl text-charcoal/80 mb-6 w-full text-left">By PubMed ID</h2>
            
            <div className="w-full flex justify-center mb-6 h-[120px]">
              <MagnifyingGlassCatalog className="w-[120px] h-[120px]" />
            </div>

            <form onSubmit={handleSummarizeByPmid} className="w-full max-w-[280px] mt-auto flex flex-col gap-6">
              <div className="relative text-left w-full">
                <label className="font-caveat text-xl text-ink">PubMed ID</label>
                <div className="relative mt-2">
                  <input
                    type="text"
                    value={pmid}
                    onChange={(e) => setPmid(e.target.value)}
                    placeholder="e.g. 34589765"
                    className="w-full bg-cream text-center font-sans tracking-wide text-lg text-ink px-4 py-2.5 outline-none border-b-2 border-charcoal/20 focus:border-terracotta transition-colors placeholder:text-charcoal/30 placeholder:font-caveat"
                    required
                  />
                  {/* Sketchy underline */}
                  <svg aria-hidden="true" className="absolute bottom-0 left-0 w-full h-1 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 4" fill="none">
                    <path d="M 0 2 C 30 0, 60 4, 100 2" stroke="#2C2C2C" strokeWidth="0.5" strokeLinecap="round" opacity="0.1" />
                  </svg>
                </div>
                <div className="mt-2 text-center">
                  <span className="font-caveat text-base text-terracotta/80">
                    → we&apos;ll fetch the full abstract for you
                  </span>
                </div>
              </div>
              
              <DoodleButton variant="primary" type="submit" className="!w-full" disabled={status === "loading"}>
                {status === "loading" ? "Analyzing..." : "Summarize →"}
              </DoodleButton>
            </form>
          </DoodleCard>

          {/* MIDDLE DIVIDER — "OR" */}
          <div className="hidden lg:flex flex-col items-center justify-center shrink-0 w-16">
            <svg aria-hidden="true" className="h-full max-h-[140px] w-px" viewBox="0 0 2 100" preserveAspectRatio="none" fill="none">
              <path d="M 1 0 C 2 30, 0 60, 1 100" stroke="#2C2C2C" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.2" />
            </svg>
            <div className="my-6 relative flex items-center justify-center">
              <circle cx="20" cy="20" r="18" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="1.5" className="absolute" style={{width: 40, height: 40, top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} />
              <svg aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <circle cx="20" cy="20" r="16" fill="#EDE8DC" stroke="#2C2C2C" strokeWidth="1" strokeDasharray="2 4" />
              </svg>
              <span className="font-caveat text-2xl text-charcoal/80 relative z-10 block translate-y-[2px]">OR</span>
            </div>
            <svg aria-hidden="true" className="h-full max-h-[140px] w-px" viewBox="0 0 2 100" preserveAspectRatio="none" fill="none">
              <path d="M 1 0 C 0 40, 2 70, 1 100" stroke="#2C2C2C" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.2" />
            </svg>
          </div>

          {/* RIGHT CARD — Upload PDF */}
          <DoodleCard className="flex-1 flex flex-col p-8 items-center text-center">
            <h2 className="font-caveat text-3xl text-charcoal/80 mb-6 w-full text-left">Upload PDF</h2>
            
            <div className="w-full flex justify-center mb-6 h-[120px]">
              <PdfWingsIllustration className="w-[120px] h-[120px]" />
            </div>
            
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="w-full max-w-[280px] mt-auto flex flex-col gap-6">
              {/* Drag & Drop Zone */}
              <div
                className={`w-full relative min-h-[105px] transition-colors cursor-pointer rounded-xl flex flex-col items-center justify-center px-4 py-5
                  ${dragActive ? "bg-mustard/20" : "bg-cream/40 hover:bg-cream/80"}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                {/* Hand-drawn dashed SVG border */}
                <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none rounded-xl" preserveAspectRatio="none">
                  <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx="10" fill="none" stroke={dragActive ? "#E8B84B" : "#8FAF72"} strokeWidth="2" strokeDasharray="8 8" opacity={dragActive ? "1" : "0.5"} />
                </svg>
                
                <p className="font-caveat text-2xl text-ink">
                  Drop your PDF here
                </p>
                <p className="font-sans text-sm text-charcoal/60 mt-1">
                  or click to browse
                </p>
                <p className="font-sans text-[11px] font-bold text-charcoal/40 uppercase tracking-widest mt-2 border-t border-charcoal/10 pt-2 w-1/2">
                  Max 10MB
                </p>
              </div>

              <DoodleButton
                variant="primary"
                type="button"
                className="!w-full !bg-olive/90 hover:!bg-olive !text-cream !border-ink shadow-[4px_4px_0px_#1A1A2E]"
                disabled={status === "loading"}
                onClick={() => fileInputRef.current?.click()}
              >
                {status === "loading" ? "Processing..." : "Upload & Summarize →"}
              </DoodleButton>
            </div>
          </DoodleCard>

        </div>

        {/* ── ERROR SECTION ── */}
        {status === "error" && (
          <div className="w-full max-w-2xl mx-auto mb-12 animate-in fade-in duration-300">
            <DoodleCard className="p-6 !border-red-300 !bg-red-50/50">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <h3 className="font-caveat text-2xl text-red-700 mb-1">Something went wrong</h3>
                  <p className="font-sans text-sm text-red-600/80">{errorMessage}</p>
                  <DoodleButton
                    variant="ghost"
                    className="!text-sm mt-3"
                    onClick={() => { setStatus("idle"); setErrorMessage(""); }}
                  >
                    ← Try again
                  </DoodleButton>
                </div>
              </div>
            </DoodleCard>
          </div>
        )}

        {/* ── LOADING SECTION ── */}
        {status === "loading" && (
          <div className="w-full flex flex-col items-center py-12 animate-in fade-in duration-500">
            <div className="w-48 h-40 mb-6">
              <RunningScientistIllustration />
            </div>
            <h3 className="font-caveat text-4xl text-ink animate-pulse">
              Distilling your paper...
            </h3>
            <p className="font-sans text-base text-charcoal/50 mt-2">
              Extracting key findings, methodology, and limitations via Gemini 1.5 Flash
            </p>
          </div>
        )}

        {/* ── BOTTOM SECTION: Results ── */}
        {status === "success" && summaryData && (
          <div className="w-full max-w-5xl mx-auto animate-in slide-in-from-bottom-8 fade-in duration-700 ease-out pb-20">
            {/* Header info above the paper */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 ml-2">
              <div>
                <DoodleTag color="olive" className="mb-2 !py-0.5 !px-2 !text-xs">SUMMARY COMPLETE</DoodleTag>
                <h3 className="font-sans font-bold text-lg text-ink">{summaryData.paperTitle || "Document Summary"}</h3>
                <p className="font-sans text-xs text-charcoal/50">
                  {summaryData.year ? `${summaryData.year} • ` : ""}Processed in {processingTime}s
                  {summaryData.pdfFileName ? ` • ${summaryData.pdfFileName}` : ""}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCopyJson}
                  className="font-caveat text-lg text-charcoal/60 hover:text-ink transition-colors flex items-center gap-1"
                >
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  Copy JSON
                </button>
                <DoodleButton variant="secondary" className="!py-1.5 !px-4 !text-sm">Save Summary</DoodleButton>
              </div>
            </div>

            {/* Results "Torn Paper" card */}
            <div className="relative bg-paper mt-6 pt-10 pb-8 px-8 md:px-12 rounded-b-xl shadow-sm border border-t-0 border-charcoal/10">
              <TornEdgeSVG />
              
              <div className="absolute inset-0 opacity-[0.25] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(44,44,44,0.15) 31px, rgba(44,44,44,0.15) 32px)", backgroundPosition: "0 10px" }} />
              <div className="absolute top-0 bottom-0 left-8 md:left-12 w-px bg-terracotta opacity-[0.15]" />

              <div className="relative z-10 flex flex-wrap gap-2 md:gap-4 mb-8 border-b-2 border-charcoal/5 pb-2 ml-4">
                {[
                  { id: "findings", label: "Key Findings", icon: LightbulbDoodle },
                  { id: "methodology", label: "Methodology", icon: BeakerDoodle },
                  { id: "conclusions", label: "Conclusions", icon: CheckmarkCircleDoodle },
                  { id: "limitations", label: "Limitations", icon: WarningTriangleDoodle },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id as Tab)} className={`relative flex items-center gap-2 px-3 py-2 font-caveat text-xl transition-colors ${isActive ? "text-ink" : "text-charcoal/40 hover:text-charcoal/70"}`}>
                      <div className={`w-5 h-5 ${isActive ? "text-current" : "opacity-40"}`}><Icon /></div>
                      {tab.label}
                      {isActive && <svg aria-hidden="true" className="absolute -bottom-2.5 left-0 w-full h-1" preserveAspectRatio="none" viewBox="0 0 100 4" fill="none"><path d="M 0 2 C 30 0, 70 4, 100 2" stroke="#C4622D" strokeWidth="2" strokeLinecap="round" opacity="0.8" /></svg>}
                    </button>
                  );
                })}
              </div>

              <div className="relative z-10 ml-4 pl-4 min-h-[200px]">
                {activeTab === "findings" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-300">
                    <BulletItem text={summaryData.keyFindings} />
                  </div>
                )}
                {activeTab === "methodology" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-300">
                    <BulletItem text={summaryData.methodology} />
                  </div>
                )}
                {activeTab === "conclusions" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-300">
                    <BulletItem text={summaryData.conclusions} />
                  </div>
                )}
                {activeTab === "limitations" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-300">
                    <BulletItem text={summaryData.limitations} />
                  </div>
                )}
              </div>

              <div className="relative z-10 mt-16 pt-8 border-t border-charcoal/10 flex flex-col items-center">
                <span className="font-caveat text-2xl text-charcoal/60 mb-3">Was this summary helpful?</span>
                <div className="flex gap-2 cursor-pointer mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} className="focus:outline-none transition-transform hover:scale-110">
                      <StarRatingDoodle filled={star <= (hoverRating || rating)} />
                    </button>
                  ))}
                </div>
                
                <div className="w-full max-w-md flex flex-col items-center">
                  {feedbackSubmitted ? (
                    <p className="font-caveat text-xl text-sage transition-all">Thank you for your feedback! ✨</p>
                  ) : (
                    <>
                      <textarea
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Tell us more (optional)..."
                        className="w-full bg-transparent font-caveat text-lg text-center text-ink resize-none h-16 outline-none placeholder:text-charcoal/30 border-b border-charcoal/20 focus:border-terracotta transition-colors"
                      />
                      <DoodleButton onClick={handleSubmitFeedback} variant="ghost" className="!text-xs !py-1 !px-4 mt-3" disabled={rating === 0}>
                        Submit Feedback
                      </DoodleButton>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}
    </div>
  );
}

function BulletItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-4">
      <svg aria-hidden="true" className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="4" fill="#6B7C3A" fillOpacity="0.8" />
        <circle cx="10" cy="10" r="3" stroke="#2C2C2C" strokeWidth="0.8" opacity="0.5" fill="none" />
        <path d="M 8 13 L 13 8" stroke="#F5F0E8" strokeWidth="1" strokeLinecap="round" />
      </svg>
      <p className="font-sans text-base text-charcoal/80 leading-[32px]">{text}</p>
    </div>
  );
}
