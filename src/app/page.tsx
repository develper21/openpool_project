import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoodleButton from "@/components/ui/DoodleButton";
import DoodleCard from "@/components/ui/DoodleCard";
import HeroIllustration from "@/components/illustrations/HeroIllustration";
import StepUploadIllustration from "@/components/illustrations/StepUploadIllustration";
import StepProcessIllustration from "@/components/illustrations/StepProcessIllustration";
import StepOutputIllustration from "@/components/illustrations/StepOutputIllustration";
import ClipboardIllustration from "@/components/illustrations/ClipboardIllustration";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden page-transition">
      {/* ═══ Background Decorative Doodles ═══ */}
      <BackgroundDoodles />

      {/* ═══ Navbar ═══ */}
      <Navbar />

      {/* ═══ Hero Section ═══ */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Headline */}
          <h1 className="font-caveat text-5xl sm:text-6xl md:text-7xl lg:text-[80px] text-ink leading-[1.1] max-w-4xl text-balance">
            Turn 30-page papers into{" "}
            <span className="text-terracotta">30-second</span> insights
          </h1>

          {/* Subheading */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-charcoal/65 max-w-2xl leading-relaxed">
            Distill is a REST API that summarizes scientific publications for
            pharma researchers. Send a PubMed ID. Get structured intelligence.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link href="/register">
              <DoodleButton variant="primary">
                Try the API →
              </DoodleButton>
            </Link>
            <Link href="/login">
              <DoodleButton variant="ghost">
                Login
              </DoodleButton>
            </Link>
          </div>

          {/* Hero Illustration */}
          <div className="w-full mt-8 md:mt-12">
            <HeroIllustration className="w-full max-w-[700px] mx-auto" />
          </div>
        </div>
      </section>

      {/* ═══ Wavy Divider ═══ */}
      <WavyDivider />

      {/* ═══ SECTION 1 — How It Works ═══ */}
      <HowItWorksSection />

      {/* ═══ Wavy Divider ═══ */}
      <WavyDivider />

      {/* ═══ SECTION 2 — What You Get Back ═══ */}
      <WhatYouGetBackSection />

      {/* ═══ Footer ═══ */}
      <Footer />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Background Doodles — Scattered decorative SVGs
   ───────────────────────────────────────────── */
function BackgroundDoodles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Molecule — top left */}
      <svg aria-hidden="true"
        className="absolute top-24 left-8 opacity-[0.06]"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
      >
        <circle cx="30" cy="30" r="10" stroke="#6B7C3A" strokeWidth="1.5" />
        <circle cx="55" cy="20" r="7" stroke="#6B7C3A" strokeWidth="1.2" fill="#6B7C3A" fillOpacity="0.1" />
        <path d="M 38 26 L 49 22" stroke="#6B7C3A" strokeWidth="1.2" />
        <circle cx="20" cy="55" r="6" stroke="#6B7C3A" strokeWidth="1" />
        <path d="M 25 38 L 22 50" stroke="#6B7C3A" strokeWidth="1" />
        <circle cx="50" cy="50" r="5" stroke="#6B7C3A" strokeWidth="1" fill="#6B7C3A" fillOpacity="0.08" />
        <path d="M 38 35 L 46 46" stroke="#6B7C3A" strokeWidth="1" />
      </svg>

      {/* Star — top right */}
      <svg aria-hidden="true"
        className="absolute top-32 right-16 opacity-[0.08]"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path d="M 20 5 L 23 15 L 33 15 L 25 21 L 28 32 L 20 25 L 12 32 L 15 21 L 7 15 L 17 15 Z" fill="#E8B84B" />
      </svg>

      {/* Flask — mid left */}
      <svg aria-hidden="true"
        className="absolute top-[45%] left-12 opacity-[0.05]"
        width="50"
        height="60"
        viewBox="0 0 40 50"
        fill="none"
      >
        <path
          d="M 14 6 L 14 16 C 14 18, 6 24, 5 32 C 4 38, 8 44, 20 44 C 32 44, 36 38, 35 32 C 34 24, 26 18, 26 16 L 26 6"
          stroke="#1A1A2E"
          strokeWidth="1.5"
        />
        <path d="M 12 6 L 28 6" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {/* Dotted line — sweeping right */}
      <svg aria-hidden="true"
        className="absolute top-[55%] right-4 opacity-[0.04]"
        width="200"
        height="100"
        viewBox="0 0 200 100"
        fill="none"
      >
        <path
          d="M 0 50 C 40 20, 80 80, 120 45 C 160 10, 180 60, 200 50"
          stroke="#2C2C2C"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          strokeLinecap="round"
        />
      </svg>

      {/* Molecule — bottom right */}
      <svg aria-hidden="true"
        className="absolute bottom-40 right-24 opacity-[0.05]"
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
      >
        <circle cx="30" cy="25" r="8" stroke="#C4622D" strokeWidth="1.2" />
        <circle cx="48" cy="18" r="5" stroke="#C4622D" strokeWidth="1" fill="#C4622D" fillOpacity="0.1" />
        <path d="M 37 22 L 44 19" stroke="#C4622D" strokeWidth="1" />
        <circle cx="22" cy="45" r="6" stroke="#C4622D" strokeWidth="1" />
        <path d="M 26 32 L 23 40" stroke="#C4622D" strokeWidth="1" />
      </svg>

      {/* Star — bottom left */}
      <svg aria-hidden="true"
        className="absolute bottom-28 left-20 opacity-[0.06]"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
      >
        <path d="M 15 3 L 17 12 L 26 12 L 19 17 L 21 26 L 15 21 L 9 26 L 11 17 L 4 12 L 13 12 Z" fill="#E8B84B" />
      </svg>

      {/* Floating flask — bottom center */}
      <svg aria-hidden="true"
        className="absolute bottom-16 left-1/2 -translate-x-1/2 opacity-[0.04]"
        width="35"
        height="45"
        viewBox="0 0 40 50"
        fill="none"
      >
        <path
          d="M 14 6 L 14 16 C 14 18, 6 24, 5 32 C 4 38, 8 44, 20 44 C 32 44, 36 38, 35 32 C 34 24, 26 18, 26 16 L 26 6"
          stroke="#C4622D"
          strokeWidth="1.5"
        />
        <path d="M 12 6 L 28 6" stroke="#C4622D" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {/* Small dots scattered */}
      <div className="absolute top-[20%] left-[30%] w-2 h-2 rounded-full bg-mustard/10" />
      <div className="absolute top-[35%] right-[25%] w-1.5 h-1.5 rounded-full bg-terracotta/8" />
      <div className="absolute top-[60%] left-[20%] w-1.5 h-1.5 rounded-full bg-sage/10" />
      <div className="absolute top-[75%] right-[35%] w-2 h-2 rounded-full bg-olive/8" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Wavy SVG Divider — Bottom of hero section
   ───────────────────────────────────────────── */
function WavyDivider() {
  return (
    <div className="w-full overflow-hidden" aria-hidden="true">
      <svg aria-hidden="true"
        className="w-full h-8 md:h-12 block"
        preserveAspectRatio="none"
        viewBox="0 0 1440 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Primary wave */}
        <path
          d="M 0 24 C 80 8, 160 40, 240 24 C 320 8, 400 40, 480 24 C 560 8, 640 40, 720 24 C 800 8, 880 40, 960 24 C 1040 8, 1120 40, 1200 24 C 1280 8, 1360 40, 1440 24"
          stroke="#2C2C2C"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.12"
        />
        {/* Secondary thinner wave (offset) */}
        <path
          d="M 0 30 C 90 18, 170 42, 260 28 C 350 14, 430 42, 520 28 C 610 14, 690 42, 780 28 C 870 14, 950 42, 1040 28 C 1130 14, 1210 42, 1300 28 C 1380 16, 1420 38, 1440 30"
          stroke="#6B7C3A"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.08"
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION 1 — How It Works (3 Steps)
   ───────────────────────────────────────────── */
function HowItWorksSection() {
  return (
    <section id="features" className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
      {/* Section title */}
      <h2 className="font-caveat text-4xl md:text-5xl text-ink text-center mb-16">
        How it works ✦
      </h2>

      <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-4">
        {/* ── Step 1: Send ── */}
        <div className="flex flex-col items-center text-center max-w-xs">
          <DoodleCard className="w-full mb-4">
            <div className="flex justify-center mb-3">
              <StepUploadIllustration className="w-44 h-40" />
            </div>
            <span className="font-caveat text-5xl text-terracotta opacity-80 block mb-1">
              01
            </span>
            <h3 className="font-caveat text-2xl text-ink mb-1">
              Send a PubMed ID
            </h3>
            <p className="font-sans text-sm text-charcoal/60 leading-relaxed">
              Pass any PubMed ID or DOI to the API. We fetch and parse the full
              text automatically.
            </p>
          </DoodleCard>
        </div>

        {/* ── Connecting Arrow 1→2 ── */}
        <svg aria-hidden="true"
          className="hidden lg:block w-16 h-8 mt-32 flex-shrink-0"
          viewBox="0 0 80 20"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M 2 10 C 20 6, 40 14, 60 10"
            stroke="#2C2C2C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="5 4"
            opacity="0.25"
          />
          <path
            d="M 55 5 L 65 10 L 55 15"
            stroke="#2C2C2C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.25"
          />
        </svg>

        {/* ── Step 2: Process ── */}
        <div className="flex flex-col items-center text-center max-w-xs">
          <DoodleCard className="w-full mb-4">
            <div className="flex justify-center mb-3">
              <StepProcessIllustration className="w-44 h-40" />
            </div>
            <span className="font-caveat text-5xl text-terracotta opacity-80 block mb-1">
              02
            </span>
            <h3 className="font-caveat text-2xl text-ink mb-1">
              AI Distills It
            </h3>
            <p className="font-sans text-sm text-charcoal/60 leading-relaxed">
              Our models read, understand, and extract structured insights —
              key findings, methodology, conclusions, and more.
            </p>
          </DoodleCard>
        </div>

        {/* ── Connecting Arrow 2→3 ── */}
        <svg aria-hidden="true"
          className="hidden lg:block w-16 h-8 mt-32 flex-shrink-0"
          viewBox="0 0 80 20"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M 2 10 C 20 14, 40 6, 60 10"
            stroke="#2C2C2C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="5 4"
            opacity="0.25"
          />
          <path
            d="M 55 5 L 65 10 L 55 15"
            stroke="#2C2C2C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.25"
          />
        </svg>

        {/* ── Step 3: Output ── */}
        <div className="flex flex-col items-center text-center max-w-xs">
          <DoodleCard className="w-full mb-4">
            <div className="flex justify-center mb-3">
              <StepOutputIllustration className="w-44 h-40" />
            </div>
            <span className="font-caveat text-5xl text-terracotta opacity-80 block mb-1">
              03
            </span>
            <h3 className="font-caveat text-2xl text-ink mb-1">
              Get Clean JSON
            </h3>
            <p className="font-sans text-sm text-charcoal/60 leading-relaxed">
              Receive a structured JSON response with verified findings,
              ready for your dashboard or pipeline.
            </p>
          </DoodleCard>
        </div>
      </div>

      {/* Mobile connecting arrows (vertical) */}
      <div className="lg:hidden flex flex-col items-center -mt-4 gap-0">
        {/* These are positioned between cards via negative margins on mobile,
            but since cards stack vertically on mobile the horizontal arrows are hidden
            and we rely on the natural top-down flow */}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 2 — What You Get Back
   ───────────────────────────────────────────── */
function WhatYouGetBackSection() {
  return (
    <section className="relative bg-olive/[0.04] py-20 md:py-28 overflow-hidden">
      {/* ── Hand-drawn bracket — left side ── */}
      <svg aria-hidden="true"
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 h-[60%] w-6 opacity-[0.08]"
        viewBox="0 0 24 200"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M 20 5 C 10 5, 6 15, 6 30 L 6 85 C 6 92, 3 96, 2 100 C 3 104, 6 108, 6 115 L 6 170 C 6 185, 10 195, 20 195"
          stroke="#2C2C2C"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* ── Hand-drawn bracket — right side ── */}
      <svg aria-hidden="true"
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 h-[60%] w-6 opacity-[0.08]"
        viewBox="0 0 24 200"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M 4 5 C 14 5, 18 15, 18 30 L 18 85 C 18 92, 21 96, 22 100 C 21 104, 18 108, 18 115 L 18 170 C 18 185, 14 195, 4 195"
          stroke="#2C2C2C"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section title */}
        <h2 className="font-caveat text-4xl md:text-5xl text-ink text-center mb-4">
          What you get back ✦
        </h2>
        <p className="font-sans text-base text-charcoal/50 text-center mb-14 max-w-xl mx-auto">
          Every response is a structured JSON object — clean, typed, and ready
          for your pipeline.
        </p>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ── Left: Fake JSON Notepad ── */}
          <div className="flex-1 w-full max-w-lg">
            <div
              className="relative bg-paper rounded-lg p-6 -rotate-1 shadow-sm border border-charcoal/[0.06]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(0,0,0,0.04) 27px, rgba(0,0,0,0.04) 28px)",
                backgroundPosition: "0 12px",
              }}
            >
              {/* Red margin line */}
              <div
                className="absolute top-0 bottom-0 left-12 w-px opacity-[0.12]"
                style={{ backgroundColor: "#C4622D" }}
              />

              {/* Spiral holes */}
              <div className="absolute left-2 top-4 flex flex-col gap-5">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full border border-charcoal/10 bg-cream"
                  />
                ))}
              </div>

              {/* JSON content */}
              <pre className="font-caveat text-base md:text-lg leading-[28px] text-charcoal/80 pl-10 overflow-x-auto">
                <code>
                  <span className="text-charcoal/40">{"{"}</span>{"\n"}
                  {"  "}<span className="text-olive font-bold">{'"keyFindings"'}</span>
                  <span className="text-charcoal/30"> : </span>
                  <span className="text-charcoal/50">{"["}</span>{"\n"}
                  {"    "}<span className="text-terracotta/70">{'"Drug X reduces biomarker'}</span>{"\n"}
                  {"    "}<span className="text-terracotta/70">{'  Y by 43% in Phase II..."'}</span>{"\n"}
                  {"  "}<span className="text-charcoal/50">{"],"}</span>{"\n"}
                  {"\n"}
                  {"  "}<span className="text-olive font-bold">{'"methodology"'}</span>
                  <span className="text-charcoal/30"> : </span>
                  <span className="text-terracotta/70">{'"Double-blind RCT,'}</span>{"\n"}
                  {"    "}<span className="text-terracotta/70">{'n=2,400, 18-month..."'}</span>{"\n"}
                  {"\n"}
                  {"  "}<span className="text-olive font-bold">{'"conclusions"'}</span>
                  <span className="text-charcoal/30"> : </span>
                  <span className="text-terracotta/70">{'"Significant efficacy'}</span>{"\n"}
                  {"    "}<span className="text-terracotta/70">{'demonstrated with...'}</span>
                  <span className="text-terracotta/70">{'"'}</span>{",\n"}
                  {"\n"}
                  {"  "}<span className="text-olive font-bold">{'"limitations"'}</span>
                  <span className="text-charcoal/30"> : </span>
                  <span className="text-charcoal/50">{"["}</span>{"\n"}
                  {"    "}<span className="text-terracotta/70">{'"Single geography"'}</span>,{"\n"}
                  {"    "}<span className="text-terracotta/70">{'"No pediatric cohort"'}</span>{"\n"}
                  {"  "}<span className="text-charcoal/50">{"]"}</span>{"\n"}
                  <span className="text-charcoal/40">{"}"}</span>
                </code>
              </pre>

              {/* Annotation */}
              <div className="mt-3 pl-10 flex items-center gap-2">
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M 2 14 C 4 10, 8 6, 14 3" stroke="#6B7C3A" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
                  <path d="M 11 2 L 15 3 L 12 6" stroke="#6B7C3A" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
                </svg>
                <span className="font-caveat text-sm text-olive/60">
                  structured & typed
                </span>
              </div>
            </div>
          </div>

          {/* ── Right: Clipboard Illustration ── */}
          <div className="flex-1 w-full max-w-md flex justify-center">
            <ClipboardIllustration className="w-full max-w-[300px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
