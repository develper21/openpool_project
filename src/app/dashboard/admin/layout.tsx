import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mission Control | Distill',
  description: 'Admin overview for Distill.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
