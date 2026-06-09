import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Library | Papero',
  description: 'Your saved research library.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
