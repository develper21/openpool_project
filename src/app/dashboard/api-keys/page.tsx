"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

import DoodleCard from "@/components/ui/DoodleCard";
import DoodleButton from "@/components/ui/DoodleButton";
import DoodleTag from "@/components/ui/DoodleTag";
import { WorkbenchKeysIllustration, ForgeKeyIllustration } from "@/components/illustrations";
import { TornEdgeSVG } from "@/components/illustrations/SummarizeIcons";

// Local Clipboard SVG
function ClipboardIconDoodle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    </svg>
  );
}

// Local Revoke/X SVG
function RevokeIconDoodle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

// Local Check SVG
function CheckIconDoodle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

type Tier = "BASIC" | "RESEARCHER" | "ADMIN";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  maskedKey: string;
  tier: Tier;
  created: string;
  usage: number;
  limit: number;
}

const initialKeys: ApiKey[] = [
  {
    id: "1",
    name: "Production Server",
    maskedKey: "distill_••••••••1234",
    key: "distill_realapikey1234",
    tier: "RESEARCHER",
    created: "Oct 12, 2024",
    usage: 3450,
    limit: 10000,
  },
  {
    id: "2",
    name: "Local Dev Testing",
    maskedKey: "distill_••••••••8x9f",
    key: "distill_realapikey8x9f",
    tier: "BASIC",
    created: "Sep 28, 2024",
    usage: 450,
    limit: 1000,
  },
  {
    id: "3",
    name: "Admin Script Runner",
    maskedKey: "distill_••••••••z0pq",
    key: "distill_realapikeyz0pq",
    tier: "ADMIN",
    created: "Sep 15, 2024",
    usage: 8120,
    limit: 50000,
  }
];

// 7 days of dummy data for the chart
const usageStats = [
  { day: "Mon", calls: 400 },
  { day: "Tue", calls: 650 },
  { day: "Wed", calls: 200 },
  { day: "Thu", calls: 800 },
  { day: "Fri", calls: 1100 },
  { day: "Sat", calls: 300 },
  { day: "Sun", calls: 150 },
];

export default function ApiKeysPage() {
  const { data: session } = useSession();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // New Key Form State
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyTier, setNewKeyTier] = useState<Tier>("BASIC");
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (session?.user) {
      fetchKeys();
    }
  }, [session]);

  const fetchKeys = async () => {
    try {
      const res = await fetchWithAuth("/api/keys");
      if (res.ok) {
        const data = await res.json();
        setKeys(data.keys);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopy = (id: string, textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRevoke = async (id: string) => {
    try {
      const res = await fetchWithAuth(`/api/keys/${id}`, { method: "DELETE" });
      if (res.ok) {
        setKeys(keys.filter(k => k.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    
    setIsGenerating(true);
    setGeneratedKey(null);
    
    try {
      const res = await fetchWithAuth("/api/keys", {
        method: "POST",
        body: JSON.stringify({ name: newKeyName.trim(), role: newKeyTier })
      });
      if (res.ok) {
        const data = await res.json();
        setKeys([data.apiKey, ...keys]);
        setGeneratedKey(data.key);
        setNewKeyName("");
      } else {
        alert("Failed to create key");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  // Helper for tag color
  const getTagColor = (tier: Tier) => {
    if (tier === "BASIC") return "olive";
    if (tier === "RESEARCHER") return "mustard";
    return "terracotta";
  };

  return (
    <div className="flex-1 p-8 xl:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto flex flex-col xl:flex-row gap-8">
          
          <div className="flex-grow flex flex-col gap-10">
            {/* ── HEADER ── */}
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <h1 className="font-caveat text-5xl text-ink mb-2">Your API Keys 🗝</h1>
              <p className="font-sans text-charcoal/60 text-lg">Manage access for your integrations and scripts</p>
              
              <div className="w-full mt-6 flex justify-center h-48 sm:h-56 bg-[#FFFdf8] border-2 border-charcoal/10 rounded-2xl overflow-hidden relative">
                <WorkbenchKeysIllustration className="w-full h-full object-cover opacity-90" />
              </div>
            </div>

            {/* ── EXISTING KEYS TABLE ── */}
            <div className="w-full">
              <h2 className="font-caveat text-3xl text-ink mb-6">Active Keys</h2>
              
              <div className="w-full overflow-x-auto pb-4">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr>
                      <th className="font-sans text-charcoal/50 font-bold uppercase tracking-wider text-xs pb-4 px-4">Key Name</th>
                      <th className="font-sans text-charcoal/50 font-bold uppercase tracking-wider text-xs pb-4 px-4">Key</th>
                      <th className="font-sans text-charcoal/50 font-bold uppercase tracking-wider text-xs pb-4 px-4">Tier</th>
                      <th className="font-sans text-charcoal/50 font-bold uppercase tracking-wider text-xs pb-4 px-4">Created</th>
                      <th className="font-sans text-charcoal/50 font-bold uppercase tracking-wider text-xs pb-4 px-4">Usage (30d)</th>
                      <th className="font-sans text-charcoal/50 font-bold uppercase tracking-wider text-xs pb-4 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keys.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-10 font-caveat text-2xl text-charcoal/40 relative">
                          {/* Hand drawn line above empty state */}
                          <svg aria-hidden="true" className="absolute top-0 left-0 w-full h-2" preserveAspectRatio="none">
                            <path d="M0 1 Q 50 2 100 0 T 200 1 T 300 0 T 400 1 T 500 0 T 600 1 T 700 0 T 800 1 T 900 0 T 1000 1" stroke="#1A1A2E" strokeOpacity="0.1" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                          </svg>
                          No active keys. Forge one below!
                        </td>
                      </tr>
                    ) : keys.map((key) => {
                      const usagePercent = Math.min((key.usage / key.limit) * 100, 100);
                      
                      return (
                        <tr key={key.id} className="group relative">
                          <td colSpan={6} className="absolute inset-0 pointer-events-none">
                            {/* Hand drawn line separator */}
                            <svg aria-hidden="true" className="w-full h-full" preserveAspectRatio="none">
                              <path d="M0 1 Q 50 2 100 0 T 200 1 T 300 0 T 400 1 T 500 0 T 600 1 T 700 0 T 800 1 T 900 0 T 1000 1" stroke="#1A1A2E" strokeOpacity="0.1" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                            </svg>
                          </td>
                          <td className="py-5 px-4 font-sans font-bold text-ink align-middle relative z-10">{key.name}</td>
                          <td className="py-5 px-4 align-middle relative z-10">
                            <code className="bg-cream/50 px-2 py-1 rounded text-sm text-charcoal font-mono border border-charcoal/10">{key.maskedKey}</code>
                          </td>
                          <td className="py-5 px-4 align-middle relative z-10">
                            <DoodleTag color={getTagColor(key.tier)} className="!px-2 !py-0.5 !text-[10px] whitespace-nowrap">
                              {key.tier}
                            </DoodleTag>
                          </td>
                          <td className="py-5 px-4 font-sans text-sm text-charcoal/70 align-middle relative z-10">{key.created}</td>
                          <td className="py-5 px-4 align-middle relative z-10 w-48">
                            <div className="flex flex-col gap-1">
                              <div className="flex justify-between text-[10px] font-sans font-bold text-charcoal/60">
                                <span>{key.usage.toLocaleString()}</span>
                                <span>{key.limit.toLocaleString()}</span>
                              </div>
                              {/* Hand-drawn progress bar SVG */}
                              <svg aria-hidden="true" width="100%" height="8" className="overflow-visible">
                                <rect x="0" y="2" width="100%" height="4" rx="2" fill="#1A1A2E" opacity="0.1" />
                                <rect x="0" y="2" width={`${usagePercent}%`} height="4" rx="2" fill="#E26D5C" />
                                {/* Squiggle over the fill for hand-drawn feel */}
                                <path 
                                  d={`M0 4 Q ${usagePercent/4}% 2, ${usagePercent/2}% 4 T ${usagePercent}% 4`} 
                                  stroke="#1A1A2E" 
                                  strokeWidth="1.5" 
                                  fill="none" 
                                  strokeOpacity="0.3"
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </div>
                          </td>
                          <td className="py-5 px-4 align-middle text-right relative z-10">
                            <div className="flex items-center justify-end gap-2">
                              {copiedId === key.id ? (
                                <span className="font-caveat text-olive text-lg flex items-center gap-1 animate-in zoom-in spin-in-12 duration-300">
                                  <CheckIconDoodle className="w-5 h-5" /> Copied!
                                </span>
                              ) : (
                                <button 
                                  onClick={() => handleCopy(key.id, key.key)}
                                  className="p-2 text-charcoal/40 hover:text-ink transition-colors hover:bg-black/5 rounded group/btn"
                                  title="Copy Original Key"
                                >
                                  <ClipboardIconDoodle className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                </button>
                              )}
                              <button 
                                onClick={() => handleRevoke(key.id)}
                                className="p-2 text-charcoal/40 hover:text-terracotta transition-colors hover:bg-terracotta/10 rounded group/btn"
                                title="Revoke key"
                              >
                                <RevokeIconDoodle className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── GENERATE NEW KEY SECTION ── */}
            <DoodleCard className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center bg-[#FFFdf8]">
              <div className="w-full md:w-1/3 flex justify-center opacity-80 shrink-0">
                <ForgeKeyIllustration className="w-full max-w-[240px] h-auto drop-shadow-sm" />
              </div>
              
              <div className="flex-grow w-full">
                <h2 className="font-caveat text-4xl text-ink mb-2">Forge a new key ✦</h2>
                <p className="font-sans text-charcoal/60 mb-6">Create a new key to access Distill&apos;s extraction engines programmatically.</p>
                
                <form onSubmit={handleGenerate} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-caveat text-2xl text-ink">Key name</label>
                    <input 
                      type="text" 
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="e.g. Zapier Integration"
                      className="w-full bg-cream px-4 py-3 rounded border-b-2 border-charcoal/20 focus:border-olive focus:outline-none font-sans"
                      required
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="font-caveat text-2xl text-ink">Permission Tier</label>
                    <div className="flex flex-col gap-3 ml-2">
                      {[ 
                        { val: "BASIC", desc: "1,000 calls/mo. Abstracts only.", col: "olive" },
                        { val: "RESEARCHER", desc: "10,000 calls/mo. Full PDFs.", col: "mustard" },
                        { val: "ADMIN", desc: "50,000 calls/mo. Unrestricted.", col: "terracotta" }
                      ].map((tier) => (
                        <label key={tier.val} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                            ${newKeyTier === tier.val ? 'border-ink bg-ink' : 'border-charcoal/30 bg-white group-hover:border-charcoal/60'}
                          `}>
                            {newKeyTier === tier.val && <div className="w-2 h-2 bg-[#FFFdf8] rounded-full" />}
                          </div>
                          <input 
                            type="radio" 
                            className="hidden" 
                            name="tier" 
                            value={tier.val} 
                            checked={newKeyTier === tier.val}
                            onChange={() => setNewKeyTier(tier.val as Tier)}
                          />
                          <div className="flex items-center gap-2">
                            <DoodleTag color={tier.col as "olive" | "mustard" | "terracotta"} className="!px-2 !py-0.5 !text-[10px] whitespace-nowrap">
                              {tier.val}
                            </DoodleTag>
                            <span className="font-sans text-sm text-charcoal/70">{tier.desc}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <DoodleButton 
                      type="submit" 
                      variant="primary" 
                      disabled={isGenerating || !newKeyName.trim()}
                      className={isGenerating ? "opacity-70" : ""}
                    >
                      {isGenerating ? "Forging..." : "Generate Key →"}
                    </DoodleButton>
                  </div>
                </form>

                {/* Newly Generated Key Reveal */}
                {generatedKey && (
                  <div className="mt-8 relative animate-in zoom-in-95 duration-500">
                    <div className="absolute -top-4 -left-4 font-caveat text-xl text-mustard bg-ink px-3 py-1 rounded-bl-xl rounded-tr-xl z-10 rotate-[-4deg] shadow-md">
                      Copy this now — we won&apos;t show it again ✦ 
                    </div>
                    <div className="w-full bg-cream rounded-b-xl shadow border border-charcoal/10 flex flex-col relative overflow-hidden">
                      <div className="w-full h-4 text-cream fill-current absolute top-0 left-0 right-0 -translate-y-px">
                        <TornEdgeSVG />
                      </div>
                      <div className="p-6 pt-8 bg-mustard/10 flex items-center justify-between border-dashed border-2 border-mustard/30 m-3 rounded">
                        <code className="text-xl font-mono text-ink select-all">{generatedKey}</code>
                        <button 
                          onClick={() => handleCopy("new", generatedKey)}
                          className="flex items-center gap-2 bg-ink text-cream px-4 py-2 rounded font-sans tracking-wide hover:bg-terracotta transition-colors"
                        >
                          {copiedId === "new" ? <CheckIconDoodle className="w-5 h-5"/> : <ClipboardIconDoodle className="w-5 h-5" />}
                          {copiedId === "new" ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </DoodleCard>

            {/* ── API USAGE DOCUMENTATION ── */}
            <div className="w-full mt-6">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="font-caveat text-3xl text-ink">How to Use Your Keys</h2>
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E26D5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              
              <DoodleCard className="p-8 bg-[#FFFdf8] flex flex-col gap-8">
                <div className="space-y-4 font-sans text-charcoal/80 text-base leading-relaxed">
                  <p>
                    Your API keys grant direct programmatic access to Distill's powerful extraction engine. This lets you bypass the visual dashboard and integrate the automated paper summarization right into your own apps, scripts, or lab workflows.
                  </p>
                  
                  <div className="bg-cream/50 p-4 border-l-4 border-olive rounded-r flex flex-col gap-2 shadow-sm">
                    <strong className="text-ink">1. The Endpoint</strong>
                    <p className="text-sm">Submit scholarly article PMIDs or raw PDF text strings to the endpoint via a POST payload.</p>
                    <code className="bg-[#FFFdf8] border border-charcoal/10 rounded px-3 py-2 text-charcoal shadow-sm block w-fit font-mono text-sm">POST https://distill-ai-one.vercel.app/api/summarize</code>
                  </div>

                  <div className="bg-cream/50 p-4 border-l-4 border-mustard rounded-r flex flex-col gap-2 shadow-sm">
                    <strong className="text-ink">2. Authentication</strong>
                    <p className="text-sm">Pass your generated API key into the HTTP <code className="bg-charcoal/5 px-1.5 py-0.5 rounded font-mono">headers</code> using the standard Bearer Token specification. Never expose this key in public frontend client code (like a basic React app); keep it safely tucked away on your backend Node or Python servers!</p>
                    <code className="bg-[#FFFdf8] border border-charcoal/10 rounded px-3 py-2 text-charcoal shadow-sm block w-fit font-mono text-sm tracking-tight text-sage font-bold">Authorization: Bearer distill_xxx...</code>
                  </div>

                  <div className="bg-cream/50 p-4 border-l-4 border-terracotta rounded-r flex flex-col gap-2 shadow-sm">
                    <strong className="text-ink text-terracotta">3. Security Warning</strong>
                    <p className="text-sm">Treat your API key strictly like a password. Do not embed it in public GitHub repositories or send it to people unencrypted. If your key leaks or gets compromised, click the <strong className="text-terracotta">Revoke (X)</strong> button above immediately to destroy it.</p>
                  </div>
                </div>
              </DoodleCard>
            </div>
          </div>

          {/* ── SIDEBAR: USAGE STATS ── */}
          <div className="w-full xl:w-80 shrink-0">
            <h2 className="font-caveat text-3xl text-ink mb-6">Usage Stats</h2>
            
            <DoodleCard className="p-6 flex flex-col bg-[#FFFdf8]">
              <h3 className="font-caveat font-sans text-sm font-bold text-charcoal/50 uppercase tracking-widest mb-6">Past 7 Days</h3>
              
              <div className="relative w-full aspect-square flex items-end justify-between pb-8 pt-4">
                {/* Y-axis guidelines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 pt-4">
                  {[1200, 900, 600, 300, 0].map((val) => (
                    <div key={val} className="w-full flex items-center gap-2 opacity-30">
                      <span className="text-[10px] font-sans w-8 text-right shrink-0">{val}</span>
                      <svg aria-hidden="true" className="w-full h-1" preserveAspectRatio="none">
                        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="#1A1A2E" strokeWidth="1" strokeDasharray="4 4" />
                      </svg>
                    </div>
                  ))}
                </div>

                {/* Hand-drawn Bar Chart */}
                <div className="relative w-full h-full flex items-end justify-around pl-10 pr-2 z-10">
                  {usageStats.map((stat) => {
                    const maxVal = 1200;
                    const heightPercent = Math.max((stat.calls / maxVal) * 100, 1);
                    return (
                      <div key={stat.day} className="flex flex-col items-center gap-2 relative h-full justify-end group">
                        {/* Tooltip on hover */}
                        <div className="absolute -top-8 bg-ink text-cream text-xs px-2 py-1 rounded font-sans opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          {stat.calls} calls
                        </div>
                        
                        {/* The pure SVG hand-drawn bar */}
                        <div className="w-6 relative transition-all duration-500 ease-out" style={{ height: `${heightPercent}%` }}>
                          <svg aria-hidden="true" className="w-full h-full overflow-visible" viewBox="0 0 24 100" preserveAspectRatio="none">
                            <path 
                              d="M2,100 L2,2 Q12,-2 22,2 L22,100 Z" 
                              fill="#8FAF72" 
                              stroke="#1A1A2E" 
                              strokeWidth="2"
                              strokeLinejoin="round"
                              vectorEffect="non-scaling-stroke"
                            />
                            {/* Inner hatching/detailing for hand-drawn feel */}
                            <path 
                              d="M5,10 L20,15 M4,30 L22,35 M5,60 L20,55" 
                              stroke="#1A1A2E" 
                              strokeWidth="1.5" 
                              opacity="0.2" 
                              strokeLinecap="round" 
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                        </div>
                        
                        {/* X-axis label */}
                        <div className="absolute -bottom-7 font-caveat text-lg text-charcoal/70">{stat.day}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t-2 border-charcoal/10 border-dashed flex justify-between items-center">
                <span className="font-sans text-xs text-charcoal/60">Total calls (week)</span>
                <span className="font-caveat text-3xl text-olive">3,900</span>
              </div>
            </DoodleCard>
          </div>
          
        </div>
    </div>
  );
}
