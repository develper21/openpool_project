"use client";

import React, { useState, useEffect } from "react";

import DoodleCard from "@/components/ui/DoodleCard";
import DoodleButton from "@/components/ui/DoodleButton";
import DoodleTag from "@/components/ui/DoodleTag";

/* ── SVG Illustrations ── */

function ResearcherDeskIllustration() {
  return (
    <svg viewBox="0 0 500 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background/Wall Elements */}
      <rect x="350" y="30" width="80" height="100" fill="#8FAF72" fillOpacity="0.1" stroke="#2C2C2C" strokeWidth="2" strokeDasharray="5 5" />
      <path d="M 360 50 L 420 50 M 360 70 L 410 70 M 360 90 L 420 90" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      
      {/* Desk */}
      <path d="M 50 180 L 450 180 L 450 200 L 50 200 Z" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="3" strokeLinejoin="round" />
      <path d="M 80 200 L 80 250 M 420 200 L 420 250" stroke="#2C2C2C" strokeWidth="4" strokeLinecap="round" />
      
      {/* Stacks of Paper */}
      <path d="M 70 178 L 130 178 M 75 174 L 125 174 M 72 170 L 128 170 M 76 166 L 124 166" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
      <path d="M 80 162 L 120 162" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
      
      {/* Plant */}
      <path d="M 380 180 L 380 150" stroke="#2C2C2C" strokeWidth="3" />
      <path d="M 380 150 C 360 140, 360 120, 380 150 C 400 140, 400 120, 380 150 Z" fill="#8FAF72" stroke="#2C2C2C" strokeWidth="2" />
      <path d="M 380 165 C 370 160, 365 140, 380 165 C 390 160, 395 140, 380 165 Z" fill="#8FAF72" stroke="#2C2C2C" strokeWidth="2" />
      <path d="M 365 180 L 395 180 L 390 155 L 370 155 Z" fill="#C4622D" stroke="#2C2C2C" strokeWidth="2" strokeLinejoin="round" />
      
      {/* Lamp */}
      <path d="M 150 180 L 170 100" stroke="#2C2C2C" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="145" cy="180" rx="15" ry="5" fill="#2C2C2C" />
      <path d="M 170 100 L 220 80" stroke="#2C2C2C" strokeWidth="4" strokeLinecap="round" />
      <path d="M 210 70 C 230 70, 240 90, 220 100 L 205 90 Z" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="2" strokeLinejoin="round" />
      {/* Light glow */}
      <path d="M 220 100 L 280 170" stroke="#E8B84B" strokeWidth="3" opacity="0.3" strokeDasharray="5 5" />
      <path d="M 210 90 L 160 150" stroke="#E8B84B" strokeWidth="3" opacity="0.3" strokeDasharray="5 5" />
      
      {/* Researcher sitting */}
      <path d="M 250 180 L 250 120 C 250 90, 290 80, 310 110 L 320 160" fill="#E8B84B" fillOpacity="0.2" stroke="#2C2C2C" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="280" cy="70" r="20" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="3" />
      <path d="M 285 65 L 295 65" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
      {/* Hand writing */}
      <path d="M 300 130 L 270 170" stroke="#2C2C2C" strokeWidth="3" strokeLinecap="round" />
      <path d="M 270 170 L 260 175" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
      
      {/* Letter on desk */}
      <rect x="230" y="172" width="30" height="6" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="2" transform="rotate(-10 230 172)" />
    </svg>
  );
}

function BugIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-[40px] h-[40px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 20 10 C 12 10, 10 20, 10 25 C 10 30, 15 35, 20 35 C 25 35, 30 30, 30 25 C 30 20, 28 10, 20 10 Z" fill="#8FAF72" fillOpacity="0.3" stroke="#2C2C2C" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 12 18 L 6 15 M 10 25 L 4 25 M 12 30 L 6 34" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
      <path d="M 28 18 L 34 15 M 30 25 L 36 25 M 28 30 L 34 34" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
      <path d="M 15 10 C 13 6, 15 4, 15 4 M 25 10 C 27 6, 25 4, 25 4" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
      <path d="M 15 22 L 25 22" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-[40px] h-[40px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 20 5 C 12 5, 8 15, 12 22 C 14 25, 16 28, 16 32 L 24 32 C 24 28, 26 25, 28 22 C 32 15, 28 5, 20 5 Z" fill="#E8B84B" fillOpacity="0.3" stroke="#2C2C2C" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 17 32 L 17 35 C 17 37, 23 37, 23 35 L 23 32" stroke="#2C2C2C" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 20 35 L 20 38" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
      <path d="M 14 15 L 20 10 L 26 15" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}

function PaperIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-[40px] h-[40px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 10 5 L 25 5 L 32 12 L 32 35 L 10 35 Z" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 25 5 L 25 12 L 32 12" stroke="#2C2C2C" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 15 18 L 27 18 M 15 24 L 27 24 M 15 30 L 22 30" stroke="#C4622D" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function SpeechBubbleIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-[40px] h-[40px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 8 20 C 8 10, 15 5, 25 5 C 35 5, 38 15, 30 25 C 25 30, 18 30, 15 30 L 8 35 L 10 28 C 10 28, 8 25, 8 20 Z" fill="#C4622D" fillOpacity="0.1" stroke="#2C2C2C" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="16" cy="18" r="2" fill="#2C2C2C" />
      <circle cx="23" cy="18" r="2" fill="#2C2C2C" />
      <circle cx="30" cy="18" r="2" fill="#2C2C2C" />
    </svg>
  );
}

function StarSVG({ filled, onClick }: { filled: boolean; onClick: () => void }) {
  return (
    <svg
      onClick={onClick}
      viewBox="0 0 50 50"
      className="w-[40px] h-[40px] cursor-pointer transition-transform hover:scale-110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 25 5 L 31 18 L 45 20 L 35 30 L 38 45 L 25 38 L 12 45 L 15 30 L 5 20 L 19 18 Z"
        fill={filled ? "#E8B84B" : "transparent"}
        stroke="#2C2C2C"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SuccessScientistIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-[160px] h-[160px] mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 180 C 60 120, 90 90, 110 90 C 130 90, 160 120, 160 180 Z" fill="#E8B84B" fillOpacity="0.2" stroke="#2C2C2C" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="110" cy="65" r="25" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="3" />
      <path d="M 100 60 C 103 63, 107 63, 110 60 M 120 60 C 123 63, 127 63, 130 60" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
      <path d="M 105 75 C 110 80, 120 80, 125 75" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
      {/* Speech Bubble */}
      <path d="M 40 40 C 40 20, 60 15, 80 15 C 100 15, 110 30, 100 50 L 110 65 L 85 55 C 70 60, 40 55, 40 40 Z" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="2" strokeLinejoin="round" />
      <text x="55" y="42" fontFamily="Caveat, cursive" fontSize="18" fill="#2C2C2C">Thank you! ✦</text>
      {/* Confetti */}
      <circle cx="30" cy="80" r="3" fill="#C4622D" />
      <circle cx="160" cy="50" r="4" fill="#8FAF72" />
      <circle cx="140" cy="40" r="2" fill="#E8B84B" />
      <path d="M 20 120 L 30 110" stroke="#E8B84B" strokeWidth="2" strokeLinecap="round" />
      <path d="M 180 100 L 170 110" stroke="#C4622D" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function EmptyCorkboardIcon() {
  return (
    <svg viewBox="0 0 300 150" className="w-[200px] h-[100px] mx-auto opacity-70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="280" height="130" fill="#C4622D" fillOpacity="0.1" stroke="#2C2C2C" strokeWidth="2" strokeDasharray="6 4" />
      {/* Pushpin */}
      <circle cx="150" cy="40" r="6" fill="#C4622D" stroke="#2C2C2C" strokeWidth="2" />
      <path d="M 150 46 L 150 60" stroke="#2C2C2C" strokeWidth="2" />
      <path d="M 146 60 L 154 60" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useSession } from "next-auth/react";

/* ── Types ── */
type FeedbackType = "bug" | "feature" | "summary" | "general" | null;

interface PastFeedback {
  id: string;
  type: FeedbackType;
  message: string;
  date: string;
}

export default function FeedbackPage() {
  const { data: session } = useSession();
  const [feedbackType, setFeedbackType] = useState<FeedbackType>(null);
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pastFeedback, setPastFeedback] = useState<PastFeedback[]>([]);

  useEffect(() => {
    if (session?.user) {
      fetchPastFeedback();
    }
  }, [session]);

  const fetchPastFeedback = async () => {
    try {
      const res = await fetchWithAuth("/api/feedback");
      if (res.ok) {
        const data = await res.json();
        setPastFeedback(data.feedbacks);
      }
    } catch (error) {
      console.error("Failed to fetch past feedback:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !feedbackType) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetchWithAuth("/api/feedback", {
        method: "POST",
        body: JSON.stringify({
          type: feedbackType,
          rating: rating > 0 ? rating : undefined,
          message,
        })
      });

      if (res.ok) {
        setIsSuccess(true);
        fetchPastFeedback(); // Refresh the list
      }
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeColor = (type: FeedbackType) => {
    switch (type) {
      case "bug": return "#8FAF72";
      case "feature": return "#E8B84B";
      case "summary": return "#F5F0E8";
      case "general": return "#C4622D";
      default: return "#F5F0E8";
    }
  };

  const getTypeName = (type: FeedbackType) => {
    switch (type) {
      case "bug": return "Bug Report";
      case "feature": return "Feature Request";
      case "summary": return "Summary Quality";
      case "general": return "General";
      default: return "Feedback";
    }
  };

  return (
    <div className="p-8 md:p-12 lg:px-20 max-w-5xl mx-auto space-y-16">
        
        {/* PAGE HEADER */}
        <header className="relative flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b-2 border-charcoal/10">
          <div className="flex-1 text-left">
            <h1 className="font-caveat text-5xl md:text-6xl text-ink">Share Your Thoughts ✦</h1>
            <p className="font-sans text-lg text-charcoal/60 mt-2">
              Help us make Distill better for researchers like you
            </p>
          </div>
          <div className="w-full max-w-[320px] h-[140px] hidden md:block mt-[-20px]">
             <ResearcherDeskIllustration />
          </div>
        </header>

        {/* FEEDBACK FORM CENTERED */}
        <section className="flex justify-center">
          <div className="w-full max-w-[640px]">
            {isSuccess ? (
              <DoodleCard className="p-12 text-center flex flex-col items-center animate-in zoom-in-95 duration-500">
                <SuccessScientistIcon />
                <p className="font-caveat text-2xl text-charcoal/80 mt-6 max-w-sm">
                  We got it. Your feedback helps us improve Distill.
                </p>
                <DoodleButton 
                  variant="ghost" 
                  className="mt-8"
                  onClick={() => {
                    setIsSuccess(false);
                    setMessage("");
                    setFeedbackType(null);
                    setRating(0);
                  }}
                >
                  Submit more feedback
                </DoodleButton>
              </DoodleCard>
            ) : (
              <DoodleCard className="p-8 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                  
                  {/* SECTION 1: Type */}
                  <div className="flex flex-col gap-4">
                    <label className="font-caveat text-3xl text-ink">What kind of feedback is this?</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Bug */}
                      <div 
                        onClick={() => setFeedbackType("bug")}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4
                          ${feedbackType === "bug" ? "border-terracotta bg-terracotta/[0.05]" : "border-charcoal/20 bg-cream/40 hover:bg-cream"}`}
                      >
                        <BugIcon />
                        <div>
                          <h4 className="font-caveat text-xl text-ink leading-none mb-1">Bug Report</h4>
                          <p className="font-sans text-xs text-charcoal/50">Something is broken</p>
                        </div>
                      </div>

                      {/* Feature */}
                      <div 
                        onClick={() => setFeedbackType("feature")}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4
                          ${feedbackType === "feature" ? "border-terracotta bg-terracotta/[0.05]" : "border-charcoal/20 bg-cream/40 hover:bg-cream"}`}
                      >
                        <LightbulbIcon />
                        <div>
                          <h4 className="font-caveat text-xl text-ink leading-none mb-1">Feature Request</h4>
                          <p className="font-sans text-xs text-charcoal/50">I have an idea</p>
                        </div>
                      </div>

                      {/* Summary */}
                      <div 
                        onClick={() => setFeedbackType("summary")}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4
                          ${feedbackType === "summary" ? "border-terracotta bg-terracotta/[0.05]" : "border-charcoal/20 bg-cream/40 hover:bg-cream"}`}
                      >
                        <PaperIcon />
                        <div>
                          <h4 className="font-caveat text-xl text-ink leading-none mb-1">Summary Quality</h4>
                          <p className="font-sans text-xs text-charcoal/50">About a specific summary</p>
                        </div>
                      </div>

                      {/* General */}
                      <div 
                        onClick={() => setFeedbackType("general")}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4
                          ${feedbackType === "general" ? "border-terracotta bg-terracotta/[0.05]" : "border-charcoal/20 bg-cream/40 hover:bg-cream"}`}
                      >
                        <SpeechBubbleIcon />
                        <div>
                          <h4 className="font-caveat text-xl text-ink leading-none mb-1">General</h4>
                          <p className="font-sans text-xs text-charcoal/50">Everything else</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* SECTION 4: Attach Summary (Conditional) */}
                  {feedbackType === "summary" && (
                    <div className="flex flex-col gap-3 animate-in slide-in-from-top-2 fade-in duration-300">
                      <label className="font-caveat text-2xl text-ink">Attach a Summary (optional)</label>
                      <div className="relative">
                        <select className="w-full appearance-none bg-transparent border-2 border-charcoal/20 rounded-xl px-4 py-3 font-sans text-charcoal outline-none focus:border-terracotta transition-colors">
                          <option value="">Select a recent summary...</option>
                          <option value="1">Comparative Efficacy of GLP-1 (2023)</option>
                          <option value="2">Oncology Trial Phase III Results (2022)</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/50">
                          ▼
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SECTION 2: Rating */}
                  <div className="flex flex-col gap-2">
                    <label className="font-caveat text-3xl text-ink">Overall experience so far</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarSVG 
                          key={star} 
                          filled={star <= rating} 
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                    <button type="button" onClick={() => setRating(0)} className="text-left font-sans text-xs text-charcoal/40 hover:text-charcoal/80 mt-1 w-fit">
                      Clear rating
                    </button>
                  </div>

                  {/* SECTION 3: Message */}
                  <div className="flex flex-col gap-3">
                    <label className="font-caveat text-3xl text-ink">Tell us more</label>
                    
                    <div className="relative w-full rounded-xl border-2 border-charcoal/20 overflow-hidden bg-[#Fdfbf7]">
                      {/* Notepad lines background */}
                      <div 
                        className="absolute inset-0 pointer-events-none opacity-10" 
                        style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #2C2C2C 31px, #2C2C2C 32px)", backgroundSize: "100% 32px", marginTop: "4px" }} 
                      />
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        maxLength={500}
                        placeholder="Write freely — we read every single one..."
                        className="w-full min-h-[160px] resize-none bg-transparent outline-none p-4 font-caveat text-2xl text-ink leading-[32px] relative z-10 placeholder:text-charcoal/30"
                      />
                    </div>
                    
                    <div className="text-right font-sans text-xs text-charcoal/40">
                      {message.length} / 500
                    </div>
                  </div>

                  <DoodleButton 
                    variant="primary" 
                    type="submit" 
                    className="w-full !bg-terracotta !text-cream shadow-[4px_4px_0px_#1A1A2E] py-4 text-xl"
                    disabled={!message.trim() || !feedbackType || isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Feedback →"}
                  </DoodleButton>

                </form>
              </DoodleCard>
            )}
          </div>
        </section>

        {/* PAST FEEDBACK SECTION */}
        <section className="pt-8 w-full max-w-4xl mx-auto">
          <h2 className="font-caveat text-4xl text-ink mb-8 border-b-2 border-charcoal/10 pb-4">
            Your previous feedback
          </h2>

          {pastFeedback.length === 0 ? (
             <div className="w-full py-10 flex flex-col items-center">
               <EmptyCorkboardIcon />
               <p className="font-caveat text-2xl text-charcoal/50 mt-4">No feedback submitted yet</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {pastFeedback.map((fb, idx) => (
                <div 
                  key={fb.id} 
                  className={`relative p-5 shadow-sm transform transition-transform hover:scale-105 border border-charcoal/10
                    ${idx % 2 === 0 ? "bg-[#f5e1ad] rotate-1" : "bg-[#Fdfbf7] -rotate-1"}`}
                  style={{ borderRadius: "2px 10px 4px 8px" }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span 
                      className="font-sans text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm border border-charcoal/20"
                      style={{ color: "#2C2C2C" }}
                    >
                      {getTypeName(fb.type)}
                    </span>
                    <span className="font-caveat text-lg text-charcoal/40">{fb.date}</span>
                  </div>
                  <p className="font-caveat text-xl text-ink leading-tight">
                    "{fb.message.length > 80 ? fb.message.substring(0, 80) + "..." : fb.message}"
                  </p>
                  
                  {/* Visual tape/pin */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-3 bg-white/40 rotate-[-2deg] border border-charcoal/5 shadow-sm" />
                </div>
              ))}
            </div>
          )}
        </section>

    </div>
  );
}
