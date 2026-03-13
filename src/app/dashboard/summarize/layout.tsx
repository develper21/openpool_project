import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Summarize | Distill',
  description: 'Distill new papers into insights.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
