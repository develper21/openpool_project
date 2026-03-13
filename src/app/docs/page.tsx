"use client";

import React, { useState } from "react";
import Link from "next/link";
import DoodleCard from "@/components/ui/DoodleCard";
import DoodleButton from "@/components/ui/DoodleButton";
import DoodleTag from "@/components/ui/DoodleTag";
import { BlueprintIllustration } from "@/components/illustrations";

// Helper icons
function ServerIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}

function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

// Custom code block mimicking lined notebook paper
const NotepadCodeBlock = ({ title, children, isResponse }: { title: string, children: React.ReactNode, isResponse?: boolean }) => (
  <div className={`w-full relative bg-[#FFFdf8] rounded-md overflow-hidden border-2 border-charcoal/20 shadow-sm mt-4 mb-6
    ${isResponse ? 'rotate-[-0.5deg]' : 'rotate-[0.5deg]'}`} 
  >
    {/* Header bar */}
    <div className="bg-charcoal/5 border-b-2 border-charcoal/10 px-4 py-2 flex justify-between items-center relative z-10">
      <span className="font-caveat text-xl text-charcoal/70 tracking-wide">{title}</span>
      <div className="flex gap-1.5 opacity-50">
        <div className="w-2.5 h-2.5 rounded-full border border-charcoal/50"></div>
        <div className="w-2.5 h-2.5 rounded-full border border-charcoal/50"></div>
        <div className="w-2.5 h-2.5 rounded-full border border-charcoal/50"></div>
      </div>
    </div>
    
    {/* Editor body with lined paper background */}
    <div className="relative min-h-[120px] p-4 font-mono text-sm leading-relaxed overflow-x-auto text-ink z-10">
      {/* Repeating lined pattern via SVG background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.15] z-0" 
        style={{
          backgroundImage: `repeating-linear-gradient(transparent, transparent 27px, #1A1A2E 27px, #1A1A2E 28px)`,
          backgroundPosition: "0 0"
        }}
      />
      {/* Margin line */}
      <div className="absolute top-0 bottom-0 left-8 w-px bg-terracotta opacity-20 pointer-events-none z-0" />
      
      {/* Actual generic code content */}
      <pre className="relative z-10 pl-10 whitespace-pre-wrap word-break">
        {children}
      </pre>
    </div>
  </div>
);

// Endpoints data schema
const endpoints = [
  {
    id: "post-summarize",
    method: "POST",
    path: "/api/summarize",
    desc: "Extracts metadata and generates a structured summary for a given PubMed ID or PDF extract.",
    auth: "BASIC",
    req: `fetch('https://distill-ai-one.vercel.app/api/summarize', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({ pmid: '38291047' }) // OR { pdfText: '...' }
});`,
    res: `{
  "keyFindings": "The study demonstrated a 43% reduction...",
  "methodology": "Double-blind, placebo-controlled trial...",
  "conclusions": "Strong viability for in vivo therapeutics.",
  "limitations": "Limited to murine models.",
  "paperTitle": "CRISPR-Cas9 Efficacy...",
  "year": "2024"
}`,
  },
  {
    id: "get-summary-id",
    method: "GET",
    path: "/api/summary/:id",
    desc: "Retrieve a previously generated summary by its ID.",
    auth: "BASIC",
    req: `GET https://distill-ai-one.vercel.app/api/summary/sum_12345abc
Authorization: Bearer YOUR_API_KEY`,
    res: `{
  "id": "sum_12345abc",
  "pmid": "38291047",
  "summary": { ... }
}`,
  },
  {
    id: "get-summaries",
    method: "GET",
    path: "/api/summaries",
    desc: "List all accessible summaries, with optional pagination and filtering.",
    auth: "BASIC",
    req: `GET https://distill-ai-one.vercel.app/api/summaries?limit=10&page=1
Authorization: Bearer YOUR_API_KEY`,
    res: `{
  "data": [
    { "id": "sum_12345abc", "paperTitle": "...", "dateAdded": "..." },
    ...
  ],
  "meta": { "total": 42, "page": 1, "lastPage": 5 }
}`,
  },
  {
    id: "post-feedback",
    method: "POST",
    path: "/api/feedback/:id",
    desc: "Submit a rating or text feedback for an extraction.",
    auth: "BASIC",
    req: `POST https://distill-ai-one.vercel.app/api/feedback/sum_12345abc
Content-Type: application/json

{ "rating": 5, "text": "Perfect extraction" }`,
    res: `{ "status": "success", "recorded": true }`,
  },
  {
    id: "post-auth-register",
    method: "POST",
    path: "/api/auth/register",
    desc: "Create a new Distill account programmatically.",
    auth: "NONE",
    req: `POST https://distill-ai-one.vercel.app/api/auth/register
Content-Type: application/json

{ "email": "dev@example.com", "password": "...", "name": "..." }`,
    res: `{ "token": "jwt_...", "user": { "id": "usr_x", "role": "STUDENT" } }`,
  },
  {
    id: "post-auth-login",
    method: "POST",
    path: "/api/auth/login",
    desc: "Authenticate and receive a JWT session token.",
    auth: "NONE",
    req: `POST https://distill-ai-one.vercel.app/api/auth/login
Content-Type: application/json

{ "email": "dev@example.com", "password": "..." }`,
    res: `{ "token": "jwt_...", "user": { "id": "usr_x", "role": "STUDENT" } }`,
  },
  {
    id: "get-admin-users",
    method: "GET",
    path: "/api/admin/users",
    desc: "List all registered users (Admin only).",
    auth: "ADMIN",
    req: `GET https://distill-ai-one.vercel.app/api/admin/users
Authorization: Bearer YOUR_ADMIN_KEY`,
    res: `{
  "users": [ ... ],
  "count": 142
}`,
  },
  {
    id: "get-admin-analytics",
    method: "GET",
    path: "/api/admin/analytics",
    desc: "Retrieve global API usage analytics.",
    auth: "ADMIN",
    req: `GET https://distill-ai-one.vercel.app/api/admin/analytics?period=7d
Authorization: Bearer YOUR_ADMIN_KEY`,
    res: `{
  "period": "7d",
  "totalCalls": 8402,
  "uniqueTokens": 45
}`,
  }
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("endpoints");
  const [testPmid, setTestPmid] = useState("38291047");
  const [testApiKey, setTestApiKey] = useState("");
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [testLoading, setTestLoading] = useState(false);

  const sections = [
    { id: "getting-started", label: "Getting Started" },
    { id: "authentication", label: "Authentication" },
    { id: "endpoints", label: "Endpoints" },
    { id: "rate-limits", label: "Rate Limits" },
    { id: "error-codes", label: "Error Codes" },
    { id: "sdks", label: "SDKs & Wrappers" }
  ];

  const handleTestSummarize = (e: React.FormEvent) => {
    e.preventDefault();
    setTestLoading(true);
    // Simulate live API hit
    setTimeout(() => {
      if (!testApiKey) {
        setTestResponse(JSON.stringify({ error: "Unauthorized. Missing API key." }, null, 2));
      } else {
        setTestResponse(JSON.stringify({
          keyFindings: "The mock request was successful. You bypassed the real engine.",
          methodology: "Simulated endpoint trigger.",
          conclusions: "The Distill API integration is seamless and fast.",
          limitations: "This is a sandbox response, no real NLP extraction occurred.",
          paperTitle: `PubMed Mock Article ${testPmid}`,
          year: "2024"
        }, null, 2));
      }
      setTestLoading(false);
    }, 1500);
  };

  const getMethodColor = (method: string) => {
    if (method === "POST") return "mustard";
    if (method === "GET") return "sage";
    if (method === "DELETE") return "terracotta";
    return "charcoal";
  };

  return (
    <div className="min-h-screen bg-cream font-sans flex flex-col">
      {/* Background Texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(#1A1A2E 0.5px, transparent 0.5px),
            radial-gradient(#1A1A2E 0.5px, #FFFdf8 0.5px)
          `,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
          opacity: 0.03
        }}
      />
      
      {/* Docs Minimal Navbar */}
      <header className="sticky top-0 z-50 w-full bg-[#FFFdf8]/90 backdrop-blur border-b-2 border-charcoal/10 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-caveat text-4xl text-ink tracking-tight flex items-center gap-2">
          <span>Distill</span>
          <span className="text-terracotta">✦</span>
          <span className="text-xl text-charcoal/40 ml-2 border-l border-charcoal/20 pl-4 font-mono">DOCS</span>
        </Link>
        <Link href="/dashboard/api-keys">
          <DoodleButton variant="secondary" className="!py-2 !px-4 !text-base">
            Get API Key
          </DoodleButton>
        </Link>
      </header>

      {/* Hero Header SVG Diagram */}
      <div className="w-full bg-[#1A3B4D] border-b-4 border-[#F4E9CD]">
        <div className="max-w-7xl mx-auto w-full flex justify-center pb-4 pt-10 px-4 opacity-95">
          <BlueprintIllustration className="w-full max-w-5xl h-auto" />
        </div>
      </div>

      <div className="flex-1 flex max-w-7xl w-full mx-auto pb-24 relative">
        
        {/* Left Sidebar (Sticky) */}
        <aside className="hidden lg:block w-64 shrink-0 pt-12 pr-8 sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto no-scrollbar">
          <h3 className="font-caveat text-3xl text-ink mb-6">Contents</h3>
          <ul className="space-y-4 font-caveat text-2xl">
            {sections.map(sec => (
              <li key={sec.id} className="flex items-center gap-2 group cursor-pointer" onClick={() => setActiveSection(sec.id)}>
                <span className="text-terracotta/50 group-hover:text-terracotta transition-colors">•</span>
                <span className={`transition-all border-b-2 ${activeSection === sec.id ? "border-terracotta text-ink" : "border-transparent text-charcoal/60 group-hover:border-terracotta/30 group-hover:text-ink"}`}>
                  {sec.label}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 pt-12 px-6 lg:px-10 lg:border-l-2 border-charcoal/10 border-dashed">
          <h1 className="font-caveat text-5xl text-ink mb-4">Endpoints API Reference</h1>
          <p className="font-sans text-lg text-charcoal/70 mb-10 pb-8 border-b-2 border-charcoal/10">
            Interact programmatically with the Distill paper extraction tools. All endpoints use standard HTTP methods and return standard JSON responses. Make sure to authenticate via the HTTP Authorization header unless otherwise noted.
          </p>
          
          <div className="space-y-12">
            {endpoints.map((ep) => (
              <div key={ep.id} id={ep.id} className="scroll-mt-32">
                <DoodleCard className="p-8 bg-[#FFFdf8] flex flex-col relative group hover:shadow-lg transition-all">
                  
                  {/* Endpoint Header */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <DoodleTag color={getMethodColor(ep.method) as "mustard" | "sage" | "terracotta" | "olive"} className="!py-1 font-mono tracking-widest uppercase">
                      {ep.method}
                    </DoodleTag>
                    <code className="text-xl md:text-2xl font-mono text-ink tracking-tight font-bold selection:bg-mustard selection:text-ink">
                      {ep.path}
                    </code>
                    
                    <div className="md:ml-auto flex items-center gap-1.5 shrink-0 bg-cream border border-charcoal/10 px-3 py-1 rounded font-sans text-xs font-bold uppercase text-charcoal/60">
                      <ShieldIcon className="w-3.5 h-3.5" />
                      Req: {ep.auth}
                    </div>
                  </div>
                  
                  <p className="font-sans text-charcoal/80 text-lg mb-8">{ep.desc}</p>
                  
                  {/* Request / Response Blocks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative">
                    {/* Divider for desktop */}
                    <div className="hidden md:block absolute top-[10%] bottom-[10%] left-1/2 w-px bg-charcoal/10 border-r border-dashed border-charcoal/20"></div>
                    
                    <div>
                      <h4 className="font-caveat text-2xl text-ink mb-[-10px]">Example Request</h4>
                      <NotepadCodeBlock title="client.js">
                        {ep.req}
                      </NotepadCodeBlock>
                    </div>
                    
                    <div>
                      <h4 className="font-caveat text-2xl text-ink mb-[-10px]">JSON Response</h4>
                      <NotepadCodeBlock title="200 OK" isResponse>
                        {ep.res}
                      </NotepadCodeBlock>
                    </div>
                  </div>
                  
                  {/* INLINE PLAYGROUND FOR SUMMARIZE */}
                  {ep.id === "post-summarize" && (
                    <div className="mt-8 pt-8 border-t-2 border-charcoal/10 border-dashed bg-mustard/5 -mx-8 -mb-8 p-8 rounded-b-2xl shadow-inner">
                      <div className="flex items-center gap-2 mb-4">
                        <ServerIcon className="w-6 h-6 text-olive" />
                        <h4 className="font-caveat text-3xl text-ink">Try it out internally ✦</h4>
                      </div>
                      
                      <form onSubmit={handleTestSummarize} className="flex flex-wrap items-end gap-4 relative z-10 w-full mb-6">
                        <div className="flex-grow shrink-0 min-w-[200px] flex flex-col gap-1">
                          <label className="font-caveat text-xl text-ink">PMID</label>
                          <input 
                            type="text" 
                            className="bg-cream border-b-2 border-charcoal/30 px-3 py-2 focus:outline-none focus:border-olive font-sans text-ink"
                            value={testPmid}
                            onChange={e => setTestPmid(e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex-grow shrink-0 min-w-[200px] flex flex-col gap-1">
                          <label className="font-caveat text-xl text-ink">Bearer Token (API Key)</label>
                          <input 
                            type="password" 
                            className="bg-cream border-b-2 border-charcoal/30 px-3 py-2 font-mono text-sm focus:outline-none focus:border-olive text-ink"
                            placeholder="distill_..."
                            value={testApiKey}
                            onChange={e => setTestApiKey(e.target.value)}
                          />
                        </div>
                        <DoodleButton type="submit" disabled={testLoading} className={testLoading ? "opacity-70" : ""}>
                          {testLoading ? "Sending..." : "Send Request →"}
                        </DoodleButton>
                      </form>
                      
                      {testResponse && (
                        <div className="animate-in slide-in-from-top-4 duration-300 relative z-20">
                          <NotepadCodeBlock title={testResponse.includes("error") ? "401 Unauthorized" : "200 Success"} isResponse={true}>
                            {testResponse}
                          </NotepadCodeBlock>
                        </div>
                      )}
                    </div>
                  )}
                  
                </DoodleCard>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}
