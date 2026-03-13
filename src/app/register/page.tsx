"use client";

import React, { useState } from "react";
import Link from "next/link";
import DoodleCard from "@/components/ui/DoodleCard";
import DoodleButton from "@/components/ui/DoodleButton";
import DoodleInput from "@/components/ui/DoodleInput";
import RegisterIllustration from "@/components/illustrations/RegisterIllustration";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        alert("Registration successful! You can now sign in.");
        window.location.href = "/login";
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ═══ Left: Illustration ═══ */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-paper p-8">
        <RegisterIllustration className="w-full max-w-md" />
      </div>

      {/* ═══ Right: Form ═══ */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 opacity-[0.07]" aria-hidden="true">
          <svg aria-hidden="true" width="35" height="35" viewBox="0 0 40 40" fill="none">
            <path d="M 20 5 L 22 15 L 32 15 L 24 21 L 27 32 L 20 25 L 13 32 L 16 21 L 8 15 L 18 15 Z" fill="#E8B84B" />
          </svg>
        </div>
        <div className="absolute bottom-16 right-16 opacity-[0.05]" aria-hidden="true">
          <svg aria-hidden="true" width="50" height="50" viewBox="0 0 50 50" fill="none">
            <circle cx="18" cy="18" r="7" stroke="#C4622D" strokeWidth="1" />
            <circle cx="35" cy="12" r="5" stroke="#C4622D" strokeWidth="0.8" fill="#C4622D" fillOpacity="0.08" />
            <path d="M 24 16 L 31 13" stroke="#C4622D" strokeWidth="0.8" />
            <circle cx="25" cy="38" r="4" stroke="#C4622D" strokeWidth="0.8" />
            <path d="M 20 24 L 23 35" stroke="#C4622D" strokeWidth="0.8" />
          </svg>
        </div>
        <div className="absolute top-1/4 left-8 opacity-[0.04]" aria-hidden="true">
          <svg aria-hidden="true" width="25" height="25" viewBox="0 0 20 20" fill="none">
            <path d="M 10 1 C 12 -1, 16 1, 16 4 C 16 8, 10 12, 10 12 C 10 12, 4 8, 4 4 C 4 1, 8 -1, 10 1 Z" fill="#C4622D" />
          </svg>
        </div>
        <div className="absolute bottom-10 left-10 opacity-[0.06]" aria-hidden="true">
          <svg aria-hidden="true" width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M 15 3 L 17 12 L 26 12 L 19 17 L 21 26 L 15 21 L 9 26 L 11 17 L 4 12 L 13 12 Z" fill="#6B7C3A" />
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
            <div className="space-y-5">
              {/* Title */}
              <div className="text-center">
                <h1 className="font-caveat text-4xl text-ink mb-1">Create your account</h1>
                <p className="font-sans text-sm text-charcoal/50">
                  Start distilling research papers today
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <DoodleInput
                  label="Full Name"
                  icon="user"
                  type="text"
                  placeholder="Dr. Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

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
                  minLength={8}
                />

                <DoodleInput
                  label="Confirm Password"
                  icon="password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                />

                {/* Submit */}
                <DoodleButton
                  variant="primary"
                  type="submit"
                  className="!w-full"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </DoodleButton>
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

              {/* Login link */}
              <p className="text-center">
                <span className="font-sans text-sm text-charcoal/50">
                  Already have an account?{" "}
                </span>
                <Link
                  href="/login"
                  className="font-caveat text-base text-terracotta hover:text-terracotta/80 transition-colors font-bold"
                >
                  Sign In →
                </Link>
              </p>
            </div>
          </DoodleCard>
        </div>
      </div>
    </div>
  );
}
