"use client";

import React from "react";
import RoleSidebar from "@/components/RoleSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream">
      {/* Background Texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(rgba(0, 0, 0, 0.04) 0, rgba(0, 0, 0, 0.04) 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.04) 0, rgba(0, 0, 0, 0.04) 1px, transparent 1px, transparent 40px)
          `,
        }}
      />

      <RoleSidebar />

      {/* Main content area with sidebar offset */}
      <main className="md:ml-64 mb-16 md:mb-0 relative z-10">
        {children}
      </main>
    </div>
  );
}
