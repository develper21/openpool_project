import React from "react";
import Link from "next/link";
import DoodleButton from "@/components/ui/DoodleButton";
import { NotFoundIllustration } from "@/components/illustrations";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 text-center font-sans">
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
      
      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-10 duration-700">
        <NotFoundIllustration className="w-full max-w-[600px] h-auto drop-shadow-md mb-8" />
        
        <h1 className="font-caveat text-5xl md:text-7xl text-ink mb-4 drop-shadow-sm">
          This paper doesn&apos;t exist.
        </h1>
        
        <p className="font-sans text-lg md:text-xl text-charcoal/70 mb-10 max-w-lg">
          The page you&apos;re looking for has been moved, deleted, or never existed in our archives.
        </p>
        
        <Link href="/dashboard" className="inline-block relative group">
          <DoodleButton>
            Back to Dashboard &rarr;
          </DoodleButton>
        </Link>
      </div>
    </div>
  );
}
