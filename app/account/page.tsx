import { Suspense } from 'react';
import type { Metadata } from 'next';
import AccountDashboard from '@/features/account/components/AccountDashboard';

export const metadata: Metadata = {
  title: 'Customer Dashboard | GVEDA Botanical Science',
  description:
    'Manage your GVEDA botanical skincare orders, live courier tracking, saved rituals wishlist, and personal account details.',
};

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F5F1] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#BD9F7D] border-t-transparent animate-spin" />
        </div>
      }
    >
      <AccountDashboard />
    </Suspense>
  );
}
