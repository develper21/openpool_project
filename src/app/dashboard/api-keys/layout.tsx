import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Keys | Distill',
  description: 'Manage your active Distill API keys.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
