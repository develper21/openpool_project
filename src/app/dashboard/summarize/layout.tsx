import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Summarize | Papero',
  description: 'Papero — AI-powered research paper summarizer.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
