"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DoodleCard from "@/components/ui/DoodleCard";
import DoodleButton from "@/components/ui/DoodleButton";
import DoodleInput from "@/components/ui/DoodleInput";
import LoginIllustration from "@/components/illustrations/LoginIllustration";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        // Fetch session to determine role-based redirect
        const session = await getSession();
        const role = (session?.user as any)?.role;
        if (role === "ADMIN") {
          router.push("/dashboard/admin");
        } else {
          router.push("/dashboard");
        }
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ═══ Left: Illustration ═══ */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-paper p-8">
        <LoginIllustration className="w-full max-w-md" />
      </div>

      {/* ═══ Right: Form ═══ */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        {/* Decorative dots */}
        <div className="absolute top-8 right-8 opacity-[0.08]" aria-hidden="true">
          <svg aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M 20 5 L 22 15 L 32 15 L 24 21 L 27 32 L 20 25 L 13 32 L 16 21 L 8 15 L 18 15 Z" fill="#E8B84B" />
          </svg>
        </div>
        <div className="absolute bottom-12 left-12 opacity-[0.06]" aria-hidden="true">
          <svg aria-hidden="true" width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="20" cy="20" r="8" stroke="#6B7C3A" strokeWidth="1" />
            <circle cx="40" cy="15" r="5" stroke="#6B7C3A" strokeWidth="0.8" />
            <path d="M 27 18 L 36 16" stroke="#6B7C3A" strokeWidth="0.8" />
            <circle cx="15" cy="40" r="4" stroke="#6B7C3A" strokeWidth="0.8" />
            <path d="M 17 27 L 16 37" stroke="#6B7C3A" strokeWidth="0.8" />
          </svg>
        </div>
        <div className="absolute top-1/3 left-6 opacity-[0.05]" aria-hidden="true">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M 10 2 L 11 8 L 17 8 L 12 12 L 14 18 L 10 14 L 6 18 L 8 12 L 3 8 L 9 8 Z" fill="#C4622D" />
          </svg>
        </div>

        {/* Flask logo */}
        <div className="absolute top-6 left-6">
          <Link href="/" className="flex items-center gap-2 group">
            <svg aria-hidden="true" width="28" height="28" viewBox="0 0 40 40" fill="none"
              className="transition-transform duration-300 group-hover:rotate-[-8deg]">
              <path d="M 16 8 L 16 16 C 16 18, 8 24, 7 30 C 6 35, 10 38, 20 38 C 30 38, 34 35, 33 30 C 32 24, 24 18, 24 16 L 24 8"
                stroke="#1A1A2E" strokeWidth="1.8" strokeLinecap="round" fill="#8FAF72" fillOpacity="0.2" />
              <path d="M 14 8 L 26 8" stroke="#1A1A2E" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="font-caveat text-xl text-ink font-bold">Distill</span>
          </Link>
        </div>

        <div className="w-full max-w-md">
          <DoodleCard className="w-full">
            <div className="space-y-6">
              {/* Title */}
              <div className="text-center">
                <h1 className="font-caveat text-4xl text-ink mb-1">Welcome back</h1>
                <p className="font-sans text-sm text-charcoal/50">
                  Sign in to your Distill account
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <DoodleInput
                  label="Email"
                  icon="email"
                  type="email"
                  placeholder="researcher@lab.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <DoodleInput
                  label="Password"
                  icon="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {error && <p className="text-terracotta text-sm font-sans">{error}</p>}

                {/* Forgot password */}
                <div className="text-right">
                  <Link
                    href="#"
                    className="font-caveat text-sm text-terracotta/70 hover:text-terracotta transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit */}
                <DoodleButton
                  variant="primary"
                  type="submit"
                  className="!w-full"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </DoodleButton>

                {/* Quick Demo Login */}
                <div className="flex flex-col gap-2 pt-2 border-t-2 border-charcoal/10 border-dashed mt-4">
                  <span className="font-caveat text-charcoal/50 text-center mb-1">Quick Access:</span>
                  <button
                    type="button"
                    onClick={() => { setEmail("drrajeshkumar@example.com"); setPassword("password123"); }}
                    className="w-full bg-charcoal/5 hover:bg-olive/10 text-olive font-sans text-xs font-bold py-2 rounded border border-charcoal/10 transition-colors"
                  >
                    Fill User
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <svg aria-hidden="true" className="flex-1 h-px" preserveAspectRatio="none" viewBox="0 0 200 2" fill="none">
                  <path d="M 0 1 C 40 0, 80 2, 120 1 C 160 0, 180 2, 200 1" stroke="#2C2C2C" strokeWidth="0.5" opacity="0.1" />
                </svg>
                <span className="font-caveat text-xs text-charcoal/30">or</span>
                <svg aria-hidden="true" className="flex-1 h-px" preserveAspectRatio="none" viewBox="0 0 200 2" fill="none">
                  <path d="M 0 1 C 40 2, 80 0, 120 1 C 160 2, 180 0, 200 1" stroke="#2C2C2C" strokeWidth="0.5" opacity="0.1" />
                </svg>
              </div>

              {/* Register link */}
              <p className="text-center">
                <span className="font-sans text-sm text-charcoal/50">
                  Don&apos;t have an account?{" "}
                </span>
                <Link
                  href="/register"
                  className="font-caveat text-base text-terracotta hover:text-terracotta/80 transition-colors font-bold"
                >
                  Register →
                </Link>
              </p>
            </div>
          </DoodleCard>
        </div>
      </div>
    </div>
  );
}
