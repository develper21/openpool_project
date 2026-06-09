import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mission Control | Papero',
  description: 'Admin overview for Papero.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
