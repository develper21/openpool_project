import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation | Papero',
  description: 'Official API documentation for Papero.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
