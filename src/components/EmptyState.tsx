"use client";

import React from "react";
import { 
  EmptyDeskIllustration, 
  EmptyCorkboardIllustration, 
  EmptyKeyBoardIllustration, 
  EmptyMicroscopeIllustration 
} from "./illustrations";
import DoodleButton from "./ui/DoodleButton";
import Link from "next/link";

export type EmptyStateVariant = "no-summaries" | "no-feedback" | "no-keys" | "no-results";

interface EmptyStateProps {
  variant: EmptyStateVariant;
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

const variantConfig: Record<EmptyStateVariant, { component: React.FC<{className?: string}>, title: string, desc: string }> = {
  "no-summaries": {
    component: EmptyDeskIllustration,
    title: "Nothing distilled yet.",
    desc: "Your research desk is completely clear. Drag in a PDF or paste a PubMed ID to begin extracting knowledge.",
  },
  "no-feedback": {
    component: EmptyCorkboardIllustration,
    title: "No feedback found.",
    desc: "Looks like nobody has pinned any reviews or feedback to the board yet.",
  },
  "no-keys": {
    component: EmptyKeyBoardIllustration,
    title: "No API keys created.",
    desc: "Your key hooks are bare. Forge a new key to start authenticating with the Distill API.",
  },
  "no-results": {
    component: EmptyMicroscopeIllustration,
    title: "No results matched.",
    desc: "We looked closely under the microscope, but couldn't find anything matching your search query.",
  }
};

export default function EmptyState({ 
  variant, 
  title, 
  description, 
  actionText, 
  actionHref, 
  onAction,
  className = "" 
}: EmptyStateProps) {
  
  const config = variantConfig[variant];
  const Illustration = config.component;
  const displayTitle = title || config.title;
  const displayDesc = description || config.desc;

  return (
    <div className={`w-full flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      {/* 200px tall illustration container per requirement */}
      <div className="h-[200px] w-full max-w-[400px] flex items-center justify-center mb-8 opacity-90 animate-in fade-in zoom-in-95 duration-500">
        <Illustration className="h-full w-auto max-w-full drop-shadow-sm" />
      </div>
      
      <h3 className="font-caveat text-3xl md:text-4xl text-ink mb-3 tracking-wide">
        {displayTitle}
      </h3>
      
      <p className="font-sans text-charcoal/60 text-base md:text-lg max-w-md mx-auto mb-8">
        {displayDesc}
      </p>
      
      {(actionText && (actionHref || onAction)) && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150">
          {actionHref ? (
            <Link href={actionHref}>
              <DoodleButton variant="primary">
                {actionText}
              </DoodleButton>
            </Link>
          ) : (
            <DoodleButton variant="primary" onClick={onAction}>
              {actionText}
            </DoodleButton>
          )}
        </div>
      )}
    </div>
  );
}
