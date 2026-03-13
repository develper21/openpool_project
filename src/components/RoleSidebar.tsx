"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import AdminSidebar from "@/components/AdminSidebar";
import ResearcherSidebar from "@/components/ResearcherSidebar";

/**
 * RoleSidebar — Thin wrapper that renders the correct sidebar
 * based on the current user's role AND the active route.
 *
 * Rules:
 *  - If the user is on /dashboard/admin/* → always show AdminSidebar
 *  - Otherwise → show ResearcherSidebar
 *  - Admins visiting non-admin pages still get the ResearcherSidebar
 *    so they can use researcher tools normally.
 */
export default function RoleSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = (session?.user as any)?.role || "RESEARCHER";
  
  // Show admin sidebar when on admin routes AND user is admin
  const isAdminRoute = pathname?.startsWith("/dashboard/admin");
  
  if (isAdminRoute && userRole === "ADMIN") {
    return <AdminSidebar />;
  }

  return <ResearcherSidebar />;
}
