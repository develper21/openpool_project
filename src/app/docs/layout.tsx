import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation | Distill',
  description: 'Official API documentation for Distill.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
