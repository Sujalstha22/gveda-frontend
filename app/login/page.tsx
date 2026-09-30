import type { Metadata } from 'next';
import { Suspense } from 'react';
import Login from "@/features/login/components/Login";

export const metadata: Metadata = {
  title: 'Sign In & Partner Registration | GVEDA Botanical Science',
  description:
    'Sign in to your GVEDA account, track orders, access your botanical rituals, or register as a GBO distributor partner.',
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-warm-ivory" />}>
      <Login />
    </Suspense>
  );
}

