import type { Metadata } from "next";
import { Caveat, DM_Sans } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Distill",
  description: "Distill — Doodle × Mid-Century Modern design system",
};

import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${caveat.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
