"use client";

import React, { useState } from "react";
import DoodleCard from "@/components/ui/DoodleCard";
import DoodleButton from "@/components/ui/DoodleButton";

export default function AdminSettingsPage() {
  const [prompt, setPrompt] = useState(`You are Distill, a research paper summarizer. Given a scientific paper, produce a structured summary with these sections:
1. TL;DR (2-3 sentences)
2. Key Findings (bullet points)
3. Methodology (brief overview)
4. Significance (why this matters)

Be precise, use academic language, and highlight novel contributions.`);
  const [temperature, setTemperature] = useState(0.4);
  const [basicLimit, setBasicLimit] = useState("1000");
  const [researcherLimit, setResearcherLimit] = useState("10000");
  const [cacheCleared, setCacheCleared] = useState(false);
  const [rerunTriggered, setRerunTriggered] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [resetConfirm, setResetConfirm] = useState(false);

  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto pb-12">
      {/* ── HEADER ── */}
      <div className="flex flex-col gap-4">
        <h1 className="font-caveat text-[52px] text-ink leading-none mt-4">System Settings ⚙</h1>

        {/* Control Panel Illustration */}
        <div className="w-full h-[180px] rounded-2xl bg-cream/30 border-2 border-charcoal/10 overflow-hidden flex items-center justify-center">
          <svg viewBox="0 0 1200 180" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <rect width="100%" height="100%" fill="#F5F0E8" opacity="0.5" />
            {/* Main panel body */}
            <rect x="200" y="20" width="800" height="140" rx="8" fill="#2C2C2C" opacity="0.9" />
            <rect x="210" y="30" width="780" height="120" rx="4" fill="#2C2C2C" opacity="0.95" stroke="#F5F0E8" strokeWidth="1" opacity-="0.2" />

            {/* Dials row */}
            {[280, 420, 560, 700, 840].map((x, i) => {
              const colors = ["#E26D5C", "#D4AF37", "#8FAF72", "#E26D5C", "#D4AF37"];
              const angles = [-45, 30, 60, -20, 45];
              return (
                <g key={i} transform={`translate(${x}, 90)`}>
                  <circle cx="0" cy="0" r="28" fill="none" stroke="#F5F0E8" strokeWidth="2" opacity="0.3" />
                  <circle cx="0" cy="0" r="24" fill="none" stroke="#F5F0E8" strokeWidth="1" opacity="0.15" />
                  {/* Tick marks */}
                  {Array.from({ length: 8 }).map((_, t) => {
                    const a = (t / 8) * Math.PI * 2 - Math.PI / 2;
                    return <line key={t} x1={Math.cos(a) * 20} y1={Math.sin(a) * 20} x2={Math.cos(a) * 24} y2={Math.sin(a) * 24} stroke="#F5F0E8" strokeWidth="1" opacity="0.3" />;
                  })}
                  {/* Needle */}
                  <line x1="0" y1="0" x2={Math.cos((angles[i] / 180) * Math.PI) * 18} y2={Math.sin((angles[i] / 180) * Math.PI) * 18} stroke={colors[i]} strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="0" cy="0" r="3" fill={colors[i]} />
                </g>
              );
            })}

            {/* Switches at bottom */}
            {[300, 380, 460].map((x, i) => (
              <g key={i} transform={`translate(${x}, 135)`}>
                <rect x="-8" y="-4" width="16" height="8" rx="4" fill="#F5F0E8" opacity="0.2" />
                <circle cx={i === 1 ? 4 : -4} cy="0" r="3" fill={i === 1 ? "#8FAF72" : "#E26D5C"} />
              </g>
            ))}

            {/* Hand adjusting dial */}
            <g transform="translate(560, 45)">
              <path d="M 60 -20 C 50 -30, 20 -25, 10 -15 L 5 0" stroke="#F5F0E8" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
              <circle cx="5" cy="0" r="4" fill="#F5F0E8" opacity="0.4" />
            </g>
          </svg>
        </div>
      </div>

      {/* ── SECTION 1: AI Configuration ── */}
      <DoodleCard className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <svg viewBox="0 0 50 50" width="36" height="36" fill="none">
            {/* Brain with circuits */}
            <path d="M 25 5 C 10 5, 5 15, 5 25 C 5 35, 10 45, 25 45 C 40 45, 45 35, 45 25 C 45 15, 40 5, 25 5 Z" stroke="#2C2C2C" strokeWidth="2" fill="none" />
            <path d="M 20 15 C 15 15, 12 20, 15 25 C 18 30, 25 30, 28 25 C 31 20, 28 15, 25 18" stroke="#8FAF72" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <circle cx="15" cy="25" r="2" fill="#E26D5C" />
            <circle cx="35" cy="20" r="2" fill="#D4AF37" />
            <line x1="15" y1="25" x2="35" y2="20" stroke="#2C2C2C" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
            <circle cx="25" cy="35" r="2" fill="#8FAF72" />
          </svg>
          <h2 className="font-caveat text-3xl text-ink">Summarization Engine</h2>
        </div>

        <div className="space-y-6">
          {/* Model selector */}
          <div className="space-y-1.5">
            <label className="font-sans text-sm font-semibold text-charcoal/80">Active Model</label>
            <select className="w-full md:w-80 bg-cream/50 border-b-2 border-charcoal/20 focus:outline-none focus:border-terracotta px-3 py-2 font-sans text-sm transition-colors outline-none cursor-pointer">
              <option>Gemini 1.5 Flash (Active)</option>
              <option>Gemini 1.5 Pro</option>
              <option>Gemini 2.0 Flash</option>
            </select>
          </div>

          {/* System prompt */}
          <div className="space-y-1.5">
            <label className="font-sans text-sm font-semibold text-charcoal/80">System Prompt</label>
            <div className="relative">
              {/* Notepad lines */}
              <div className="absolute inset-0 pointer-events-none opacity-10">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="border-b border-charcoal" style={{ height: 24, marginTop: i === 0 ? 12 : 0 }} />
                ))}
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={8}
                className="w-full bg-cream/30 border-2 border-charcoal/10 rounded-lg p-4 font-mono text-sm text-charcoal leading-relaxed focus:outline-none focus:border-terracotta transition-colors resize-y"
              />
            </div>
          </div>

          {/* Temperature slider */}
          <div className="space-y-3">
            <label className="font-sans text-sm font-semibold text-charcoal/80">
              Temperature: <span className="font-caveat text-xl text-terracotta ml-2">{temperature.toFixed(1)}</span>
            </label>
            <div className="relative">
              <input
                type="range" min="0.1" max="1.0" step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full md:w-96 h-2 bg-charcoal/10 rounded-lg appearance-none cursor-pointer accent-terracotta"
              />
              <div className="flex justify-between w-full md:w-96 mt-1">
                <span className="font-caveat text-sm text-olive">← More Precise</span>
                <span className="font-caveat text-sm text-terracotta">More Creative →</span>
              </div>
            </div>
          </div>

          <DoodleButton>Save Prompt →</DoodleButton>
        </div>
      </DoodleCard>

      {/* ── SECTION 2: Rate Limits ── */}
      <DoodleCard className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <svg viewBox="0 0 50 50" width="36" height="36" fill="none">
            <circle cx="25" cy="25" r="20" stroke="#2C2C2C" strokeWidth="2" />
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
              return <line key={i} x1={25 + Math.cos(a) * 16} y1={25 + Math.sin(a) * 16} x2={25 + Math.cos(a) * 20} y2={25 + Math.sin(a) * 20} stroke="#2C2C2C" strokeWidth="1.5" />;
            })}
            <line x1="25" y1="25" x2={25 + Math.cos(-0.8) * 14} y2={25 + Math.sin(-0.8) * 14} stroke="#E26D5C" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="25" cy="25" r="3" fill="#E26D5C" />
          </svg>
          <h2 className="font-caveat text-3xl text-ink">Rate Limits</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg">
          <div className="space-y-1.5">
            <label className="font-sans text-sm font-semibold text-charcoal/80">Basic (requests/day)</label>
            <input type="number" value={basicLimit} onChange={e => setBasicLimit(e.target.value)}
              className="w-full bg-cream/50 border-b-2 border-charcoal/20 focus:outline-none focus:border-terracotta px-3 py-2 font-sans text-sm transition-colors" />
          </div>
          <div className="space-y-1.5">
            <label className="font-sans text-sm font-semibold text-charcoal/80">Researcher (requests/day)</label>
            <input type="number" value={researcherLimit} onChange={e => setResearcherLimit(e.target.value)}
              className="w-full bg-cream/50 border-b-2 border-charcoal/20 focus:outline-none focus:border-terracotta px-3 py-2 font-sans text-sm transition-colors" />
          </div>
        </div>
        <div className="mt-6">
          <DoodleButton>Update Limits →</DoodleButton>
        </div>
      </DoodleCard>

      {/* ── SECTION 3: Maintenance ── */}
      <DoodleCard className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <svg viewBox="0 0 50 50" width="36" height="36" fill="none">
            <rect x="10" y="18" width="30" height="22" rx="3" stroke="#2C2C2C" strokeWidth="2" />
            <path d="M 10 18 L 25 8 L 40 18" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 18 25 L 18 40" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
            <path d="M 25 22 L 25 40" stroke="#E26D5C" strokeWidth="2" strokeLinecap="round" />
            <path d="M 32 28 L 32 40" stroke="#8FAF72" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <h2 className="font-caveat text-3xl text-ink">Maintenance</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => { setCacheCleared(true); setTimeout(() => setCacheCleared(false), 3000); }}
            className="p-4 border-2 border-charcoal/10 rounded-xl hover:bg-cream/30 transition-all text-left group"
          >
            <p className="font-sans text-sm font-bold text-charcoal group-hover:text-terracotta transition-colors">Clear Redis Cache</p>
            <p className="font-sans text-xs text-charcoal/50 mt-1">Remove all cached PMID lookups</p>
            {cacheCleared && <p className="font-caveat text-sage mt-2">Cache cleared ✓</p>}
          </button>

          <button
            onClick={() => { setRerunTriggered(true); setTimeout(() => setRerunTriggered(false), 3000); }}
            className="p-4 border-2 border-charcoal/10 rounded-xl hover:bg-cream/30 transition-all text-left group"
          >
            <p className="font-sans text-sm font-bold text-charcoal group-hover:text-terracotta transition-colors">Re-run Failed Summaries</p>
            <p className="font-sans text-xs text-charcoal/50 mt-1">Retrigger all failed extractions</p>
            {rerunTriggered && <p className="font-caveat text-sage mt-2">Re-running... ↺</p>}
          </button>

          <button className="p-4 border-2 border-charcoal/10 rounded-xl hover:bg-cream/30 transition-all text-left group">
            <p className="font-sans text-sm font-bold text-charcoal group-hover:text-terracotta transition-colors">Export Full DB Backup</p>
            <p className="font-sans text-xs text-charcoal/50 mt-1">Download JSON of all summaries</p>
          </button>
        </div>
      </DoodleCard>

      {/* ── SECTION 4: Danger Zone ── */}
      <DoodleCard className="p-8 bg-terracotta/[0.03] border-2 border-dashed border-terracotta/30">
        <div className="flex items-center gap-4 mb-6">
          <svg viewBox="0 0 50 50" width="36" height="36" fill="none">
            {/* Dynamite */}
            <rect x="18" y="15" width="14" height="30" rx="3" fill="#E26D5C" opacity="0.8" stroke="#2C2C2C" strokeWidth="2" />
            <rect x="20" y="20" width="10" height="3" fill="#D4AF37" opacity="0.8" />
            <rect x="20" y="26" width="10" height="3" fill="#D4AF37" opacity="0.8" />
            {/* Fuse */}
            <path d="M 25 15 C 25 10, 30 5, 35 8" stroke="#2C2C2C" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="36" cy="7" r="3" fill="#D4AF37" />
            <circle cx="36" cy="7" r="5" fill="#D4AF37" opacity="0.3" />
          </svg>
          <h2 className="font-caveat text-3xl text-terracotta">Danger Zone</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="font-sans text-sm font-bold text-charcoal">Wipe All Summaries</p>
            <p className="font-sans text-xs text-charcoal/50">Permanently delete every summary in the database. Type DELETE to confirm.</p>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={deleteConfirm}
                onChange={e => setDeleteConfirm(e.target.value)}
                placeholder='Type "DELETE"'
                className="bg-cream/50 border-b-2 border-terracotta/30 focus:outline-none focus:border-terracotta px-3 py-2 font-mono text-sm transition-colors w-40"
              />
              <button
                disabled={deleteConfirm !== "DELETE"}
                className={`px-4 py-2 rounded-lg font-sans text-sm font-bold transition-all border-2 ${deleteConfirm === "DELETE" ? "bg-terracotta text-white border-terracotta hover:bg-terracotta/80" : "bg-charcoal/5 text-charcoal/30 border-charcoal/10 cursor-not-allowed"}`}
              >
                Wipe
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-sans text-sm font-bold text-charcoal">Reset All API Keys</p>
            <p className="font-sans text-xs text-charcoal/50">Revoke every API key in the system. All integrations will stop working.</p>
            <button
              onClick={() => setResetConfirm(true)}
              className="px-4 py-2 rounded-lg font-sans text-sm font-bold border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white transition-all"
            >
              Reset All Keys
            </button>
          </div>
        </div>
      </DoodleCard>

      {/* Reset Confirm Modal */}
      {resetConfirm && (
        <div className="fixed inset-0 bg-ink/40 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <DoodleCard className="w-full max-w-sm bg-paper p-8 text-center flex flex-col gap-6">
            <h3 className="font-caveat text-3xl text-terracotta">Reset all API keys?</h3>
            <p className="font-sans text-sm text-charcoal/70">This will permanently revoke every active API key. All integrations will immediately fail.</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setResetConfirm(false)} className="px-4 py-2 border-2 border-charcoal/20 rounded-lg font-sans text-sm hover:bg-charcoal/5 transition-colors">Cancel</button>
              <DoodleButton onClick={() => setResetConfirm(false)}>Yes, Reset All</DoodleButton>
            </div>
          </DoodleCard>
        </div>
      )}
    </div>
  );
}
