"use client";

import React, { useState, useEffect } from "react";
import DoodleCard from "@/components/ui/DoodleCard";
import DoodleButton from "@/components/ui/DoodleButton";
import DoodleTag from "@/components/ui/DoodleTag";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export default function AdminKeysPage() {
  const [keys, setKeys] = useState<any[]>([]);
  const [weeklyUsage, setWeeklyUsage] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyRole, setNewKeyRole] = useState("RESEARCHER");
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth("/api/admin/keys");
      if (res.ok) {
        const data = await res.json();
        setKeys(data.keys);
        setWeeklyUsage(data.weeklyUsagePerKey);
      }
    } catch (err) {
      console.error("Failed to fetch keys", err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateKey = async () => {
    if (!newKeyName) return;
    try {
      const res = await fetchWithAuth("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName, role: newKeyRole }),
      });
      if (res.ok) {
        const data = await res.json();
        setGeneratedKey(data.key);
        fetchKeys(); // refresh list
      }
    } catch (err) {
      console.error("Failed to generate key", err);
    }
  };

  const handleRevoke = async (id: string) => {
    if (!confirm("Are you sure you want to revoke this key?")) return;
    try {
      const res = await fetchWithAuth("/api/admin/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        fetchKeys();
      }
    } catch (err) {
      console.error("Failed to revoke key", err);
    }
  };

  const barMax = Math.max(...weeklyUsage.map(u => u.calls), 1);

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-12">
      {/* ── HEADER ── */}
      <div className="flex flex-col gap-4">
        <h1 className="font-caveat text-[52px] text-ink leading-none mt-4">API Key Vault ✦</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── LEFT: KEYS TABLE ── */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-caveat text-3xl text-charcoal">Active Keys</h2>
            <DoodleButton onClick={() => setShowGenerateModal(true)}>Generate New Key ✦</DoodleButton>
          </div>

          <DoodleCard className="p-0 overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-charcoal/50 font-caveat text-xl">Loading keys...</div>
            ) : keys.length > 0 ? (
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-charcoal/10 text-charcoal/60 font-sans text-xs tracking-wide uppercase">
                      <th className="font-semibold py-4 px-5">Name & Owner</th>
                      <th className="font-semibold py-4 px-5">Key</th>
                      <th className="font-semibold py-4 px-5">Usage</th>
                      <th className="font-semibold py-4 px-5">Status</th>
                      <th className="font-semibold py-4 px-5">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="font-sans text-sm">
                    {keys.map(k => (
                      <tr key={k.id} className={`border-b border-charcoal/5 last:border-0 hover:bg-cream/20 transition-colors ${k.status === 'Revoked' ? 'opacity-50' : ''}`}>
                        <td className="py-4 px-5">
                          <p className="font-semibold text-charcoal">{k.name}</p>
                          <p className="text-xs text-charcoal/50 mt-0.5">{k.owner} · {k.created}</p>
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2">
                            <code className="bg-charcoal/5 px-2 py-1 rounded text-charcoal font-mono text-xs border border-charcoal/10">{k.key ? k.key.substring(0, 15) + "..." : "distill_••••••••"}</code>
                            {k.status === "Active" && (
                              <button onClick={() => copyToClipboard(k.key)} className="text-charcoal/40 hover:text-terracotta transition-colors" title="Copy Key">
                                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex flex-col gap-1 w-24">
                            <div className="flex justify-between text-[10px] text-charcoal/60 font-medium">
                              <span>{k.usage.toLocaleString()}</span>
                              <span>{k.limit.toLocaleString()}</span>
                            </div>
                            <div className="w-full h-1.5 bg-charcoal/10 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${k.usage / k.limit > 0.9 ? 'bg-terracotta' : k.usage / k.limit > 0.75 ? 'bg-mustard' : 'bg-sage'}`} 
                                style={{ width: `${Math.min((k.usage / k.limit) * 100, 100)}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-5">
                          <DoodleTag color={k.status === "Active" ? "sage" : "terracotta"} className="text-[10px] px-2 py-0.5">
                            {k.status}
                          </DoodleTag>
                        </td>
                        <td className="py-4 px-5">
                          {k.status === "Active" ? (
                            <button onClick={() => handleRevoke(k.id)} className="text-xs font-bold text-terracotta hover:text-ink transition-colors">Revoke</button>
                          ) : (
                            <span className="text-xs text-charcoal/40 font-bold">Revoked</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center font-caveat text-xl text-charcoal/50">No keys found.</div>
            )}
          </DoodleCard>
        </div>

        {/* ── RIGHT: WEEKLY USAGE ── */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="font-caveat text-3xl text-charcoal">Usage Over 7 Days</h2>
          <DoodleCard className="p-6">
            {loading ? (
              <div className="animate-pulse flex space-x-4 h-48 w-full bg-charcoal/10 rounded"></div>
            ) : weeklyUsage.length > 0 ? (
              <div className="relative h-48 flex items-end justify-between gap-2 pt-8 pb-6 border-b-2 border-charcoal/20">
                {/* Horizontal grid lines */}
                <div className="absolute inset-x-0 bottom-6 top-8 flex flex-col justify-between z-0 pointer-events-none opacity-20">
                  <div className="w-full border-t border-dashed border-charcoal"></div>
                  <div className="w-full border-t border-dashed border-charcoal"></div>
                  <div className="w-full border-t border-dashed border-charcoal"></div>
                </div>
                
                {/* Max label */}
                <div className="absolute top-0 left-0 text-[10px] font-sans text-charcoal/40 font-bold">{barMax.toLocaleString()}</div>

                {weeklyUsage.map((u, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 group z-10 w-full">
                    <div 
                      className={`w-full max-w-[2rem] rounded-t-sm transition-all duration-500 hover:opacity-80
                        ${u.tier === 'ADMIN' ? 'bg-terracotta' : u.tier === 'RESEARCHER' ? 'bg-mustard' : 'bg-sage'}`}
                      style={{ height: `${(u.calls / barMax) * 100}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-ink text-paper text-xs py-1 px-2 rounded whitespace-nowrap pointer-events-none transition-opacity">
                        {u.calls.toLocaleString()} calls
                      </div>
                    </div>
                    <span className="text-[10px] font-sans text-charcoal/60 truncate w-full text-center group-hover:text-ink cursor-default" title={u.name}>
                      {u.name.substring(0, 5)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center font-caveat text-xl text-charcoal/50">No usage data.</div>
            )}
            {!loading && weeklyUsage.length > 0 && (
              <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-charcoal/10">
                <div className="flex items-center gap-1.5 text-xs font-sans text-charcoal/60"><div className="w-2 h-2 rounded-full bg-sage"></div> Basic</div>
                <div className="flex items-center gap-1.5 text-xs font-sans text-charcoal/60"><div className="w-2 h-2 rounded-full bg-mustard"></div> Pro</div>
                <div className="flex items-center gap-1.5 text-xs font-sans text-charcoal/60"><div className="w-2 h-2 rounded-full bg-terracotta"></div> Admin</div>
              </div>
            )}
          </DoodleCard>
        </div>
      </div>

      {/* ── GENERATE KEY MODAL ── */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-ink/40 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <DoodleCard className="w-full max-w-md bg-paper p-8 flex flex-col gap-6 relative animate-in zoom-in-95 duration-200">
            <button onClick={() => { setShowGenerateModal(false); setGeneratedKey(null); setNewKeyName(""); }} className="absolute top-4 right-4 text-charcoal/40 hover:text-ink transition-colors">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <h2 className="font-caveat text-3xl text-ink leading-none">Generate API Key</h2>

            {!generatedKey ? (
              <div className="space-y-4 font-sans">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-charcoal/80">Key Name</label>
                  <input type="text" value={newKeyName} onChange={e => setNewKeyName(e.target.value)} className="w-full bg-cream/50 border-b-2 border-charcoal/20 focus:outline-none focus:border-terracotta px-3 py-2 transition-colors" placeholder="e.g. Production Server" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-charcoal/80">Key Role Limit</label>
                  <select value={newKeyRole} onChange={e => setNewKeyRole(e.target.value)} className="w-full bg-cream/50 border-b-2 border-charcoal/20 focus:outline-none focus:border-terracotta px-3 py-2 transition-colors outline-none cursor-pointer">
                    <option value="BASIC">Basic (1,000 requests/mo)</option>
                    <option value="RESEARCHER">Researcher (10,000 requests/mo)</option>
                    <option value="ADMIN">Admin (50,000 requests/mo)</option>
                  </select>
                </div>
                <div className="pt-4">
                  <DoodleButton onClick={generateKey} className="w-full justify-center">Generate Key →</DoodleButton>
                </div>
              </div>
            ) : (
              <div className="space-y-6 font-sans">
                <div className="bg-sage/10 p-4 rounded-lg border-2 border-sage text-sage text-sm font-semibold text-center">
                  Key successfully generated!
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-charcoal/70">Please copy this key now. It will not be shown again.</p>
                  <div className="relative">
                    <code className="block w-full bg-charcoal/5 border-2 border-charcoal/10 rounded px-3 py-3 text-charcoal font-mono text-sm break-all pr-12">
                      {generatedKey}
                    </code>
                    <button onClick={() => copyToClipboard(generatedKey)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-paper rounded text-charcoal hover:text-terracotta border-2 border-charcoal/10 hover:border-terracotta transition-colors" title="Copy">
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                    </button>
                  </div>
                </div>
                <DoodleButton onClick={() => { setShowGenerateModal(false); setGeneratedKey(null); setNewKeyName(""); }} className="w-full justify-center">Done</DoodleButton>
              </div>
            )}
          </DoodleCard>
        </div>
      )}
    </div>
  );
}
