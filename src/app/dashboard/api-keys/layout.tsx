import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Keys | Papero',
  description: 'Manage your active Papero API keys.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
