import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics | Distill',
  description: 'Review feedback and model performance.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
