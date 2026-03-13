"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import DoodleButton from "./ui/DoodleButton";
import { ExplosionIllustration } from "./illustrations";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * A classic React Error Boundary class component.
 * Can be used to wrap specific sections of the app that might crash.
 * Note: For top-level Next.js route errors, use app/error.tsx instead.
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return <ErrorBoundaryFallback reset={this.handleReset} />;
    }

    return this.props.children;
  }
}

/**
 * Reusable fallback UI for any error state.
 * This can also be imported directly by Next.js app/error.tsx files.
 */
export function ErrorBoundaryFallback({ reset }: { reset: () => void }) {
  return (
    <div className="w-full flex flex-col items-center justify-center p-8 bg-cream font-sans min-h-[400px]">
      <div className="max-w-xl w-full flex flex-col items-center text-center">
        <ExplosionIllustration className="w-full h-auto max-w-[500px] mb-8" />
        
        <h2 className="font-caveat text-4xl text-ink mb-2">
          Something went wrong in the lab.
        </h2>
        
        <p className="text-charcoal/60 mb-8 max-w-sm">
          Our scientists experienced an unexpected rapid unscheduled disassembly.
        </p>
        
        <DoodleButton onClick={reset} variant="primary">
          Try again ↻
        </DoodleButton>
      </div>
    </div>
  );
}

// Ensure the default export is the UI fallback as it's more widely useful
// for Next.js 13+ App Router's error.tsx structure
export default ErrorBoundaryFallback;
