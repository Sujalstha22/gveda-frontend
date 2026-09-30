'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  Check,
  MoreHorizontal,
} from 'lucide-react';
import {
  AccountTab,
  CustomerOrder,
} from '../types';
import {
  INITIAL_ORDERS,
} from '../mockData';
import {
  AuthSession,
  useAuthSession,
  clearAuthSession,
} from '@/features/auth/session';

import OverviewTab from './tabs/OverviewTab';
import OrdersTab from './tabs/OrdersTab';
import AddressesTab from './tabs/AddressesTab';
import SettingsTab from './tabs/SettingsTab';
import OrderTrackingModal from './OrderTrackingModal';

const VALID_TABS: AccountTab[] = ['overview', 'orders', 'addresses', 'settings'];

const DEFAULT_GUEST_SESSION: AuthSession = {
  id: 'gv_guest',
  fullName: 'Sophia Maharjan',
  email: 'sophia.m@gveda.com',
  phoneNumber: '+977 9841234567',
  isDist: false,
  isVerified: false,
  provinceName: 'Bagmati Province',
  districtName: 'Kathmandu',
  typeName: 'Metropolitan City',
  localLevelName: 'Ward 4',
  streetAddress: '',
  loginAt: 0,
};

export default function AccountDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawTab = searchParams.get('tab') as AccountTab | null;

  const activeTab: AccountTab = (rawTab && VALID_TABS.includes(rawTab))
    ? rawTab
    : 'overview';

  const session = useAuthSession();

  // Local state for interactive operations
  const [orders, setOrders] = useState<CustomerOrder[]>(INITIAL_ORDERS);

  // Modals state
  const [trackingOrder, setTrackingOrder] = useState<CustomerOrder | null>(null);

  const handleSelectTab = (tab: AccountTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`/account?${params.toString()}`, { scroll: false });
  };

  const handleLogout = () => {
    clearAuthSession();
    router.push('/login');
  };

  // Orders handlers
  const handleCancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'CANCELLED' } : o))
    );
  };

  // Fallback session if not yet loaded or previewing
  const activeSession: AuthSession = session || DEFAULT_GUEST_SESSION;

  // Determine if the user profile is verified
  const isVerified = Boolean(
    activeSession.isVerified !== undefined
      ? activeSession.isVerified
      : (activeSession.isDist || (activeSession.fullName && activeSession.phoneNumber && activeSession.districtName && activeSession.streetAddress))
  );

  const navItems: Array<{ id: AccountTab; label: string; icon: React.ElementType; badge?: number }> = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    {
      id: 'orders',
      label: 'My Orders',
      icon: Package,
      badge: orders.filter((o) => ['PENDING', 'CONFIRMED', 'PROCESSING', 'DISPATCHED'].includes(o.status)).length,
    },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Profile & Security', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-warm-ivory text-primary pt-[88px] sm:pt-[96px] lg:pt-[100px] pb-16 sm:pb-24 px-4 sm:px-8 lg:px-[5vw] select-none">
      <div className="w-full">
        {/* ── Breadcrumb & Top Label ── */}
        <div className="flex items-center gap-2 text-xs text-primary/45 mb-6 uppercase tracking-wider font-semibold font-primary">
          <span>GVEDA</span>
          <ChevronRight className="w-3.5 h-3.5 text-secondary" />
          <span>Customer Account</span>
          <ChevronRight className="w-3.5 h-3.5 text-secondary" />
          <span className="text-primary font-bold capitalize">{activeTab}</span>
        </div>

        {/* ── Mobile Profile Card (Visible on mobile screens) ── */}
        <div className="lg:hidden mb-4 p-4 rounded-2xl bg-surface border border-secondary/25 shadow-2xs">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* Profile Image with Status Circle Badge */}
              <div className="relative shrink-0">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-secondary/40 shadow-xs bg-warm-ivory">
                  <Image
                    src="/images/login/log-in1.jpeg"
                    alt={activeSession.fullName}
                    fill
                    sizes="44px"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Circular Status Badge Beside Avatar */}
                <span
                  title={isVerified ? 'Verified Profile' : 'Verification Pending'}
                  className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center border border-surface shadow-xs ${
                    isVerified
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-500 text-white'
                  }`}
                >
                  {isVerified ? (
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  ) : (
                    <MoreHorizontal className="w-2.5 h-2.5 stroke-[3]" />
                  )}
                </span>
              </div>

              <div className="overflow-hidden min-w-0">
                <h3 className="text-sm font-bold text-primary font-heading truncate">
                  {activeSession.fullName}
                </h3>
                <p className="text-[11px] text-primary/60 truncate font-primary">
                  {activeSession.email}
                </p>
              </div>
            </div>

            {!isVerified && (
              <button
                type="button"
                onClick={() => handleSelectTab('settings')}
                className="text-[11px] font-semibold text-secondary hover:text-primary flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <span>Complete profile</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* ── Mobile Horizontal Navigation Tabs ── */}
        <div className="lg:hidden mb-6 overflow-x-auto pb-2 scrollbar-none flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${isActive
                  ? 'bg-primary text-surface shadow-xs'
                  : 'bg-surface text-primary/70 border border-primary/10 hover:border-secondary'
                  }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-secondary' : ''}`} />
                {item.label}
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isActive ? 'bg-secondary text-white' : 'bg-primary/10 text-primary'
                      }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Main Dashboard Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ── Desktop Sidebar ── */}
          <aside className="hidden lg:block lg:col-span-3 space-y-5 sticky top-[100px]">
            {/* User Profile Card */}
            <div className="p-5 rounded-2xl bg-surface border border-secondary/25 shadow-2xs">
              <div className="flex items-center gap-3.5">
                {/* Profile Image with Status Circle Badge */}
                <div className="relative shrink-0">
                  <div className="relative w-13 h-13 rounded-full overflow-hidden border-2 border-secondary/40 shadow-xs bg-warm-ivory">
                    <Image
                      src="/images/login/log-in1.jpeg"
                      alt={activeSession.fullName}
                      fill
                      sizes="52px"
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Circular Status Badge Beside Avatar */}
                  <span
                    title={isVerified ? 'Verified Profile' : 'Verification Pending'}
                    className={`absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-surface shadow-xs ${
                      isVerified
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    {isVerified ? (
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    ) : (
                      <MoreHorizontal className="w-2.5 h-2.5 stroke-[3]" />
                    )}
                  </span>
                </div>

                <div className="overflow-hidden flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-primary font-heading truncate">
                    {activeSession.fullName}
                  </h3>
                  <p className="text-[11px] text-primary/60 truncate font-primary">
                    {activeSession.email}
                  </p>
                </div>
              </div>

              {/* Complete Your Profile Link (Only visible if not verified) */}
              {!isVerified && (
                <button
                  type="button"
                  onClick={() => handleSelectTab('settings')}
                  className="mt-3.5 pt-3 border-t border-primary/10 w-full flex items-center justify-between text-xs font-semibold text-secondary hover:text-primary transition-colors cursor-pointer group font-primary"
                >
                  <span>Complete your profile</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              )}
            </div>

            {/* Sidebar Navigation */}
            <nav className="p-3 rounded-2xl bg-surface border border-primary/10 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${isActive
                      ? 'bg-[#111111] text-[#FAFAF8]'
                      : 'text-[#111111]/75 hover:bg-black/5 hover:text-[#111111]'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${isActive ? 'text-[#BD9F7D]' : 'text-[#111111]/60'
                          }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-[#BD9F7D] text-white' : 'bg-black/10 text-[#111111]'
                          }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-2 border-t border-[#111111]/10">
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you wish to log out?')) {
                      handleLogout();
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 flex items-center gap-3 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-600" />
                  <span>Log Out</span>
                </button>
              </div>
            </nav>


          </aside>

          {/* ── Main Tab Content Area ── */}
          <main className="lg:col-span-9">
            {activeTab === 'overview' && (
              <OverviewTab
                session={activeSession}
                orders={orders}
                onSelectTab={handleSelectTab}
                onTrackOrder={(order) => setTrackingOrder(order)}
              />
            )}

            {activeTab === 'orders' && (
              <OrdersTab
                orders={orders}
                onTrackOrder={(order) => setTrackingOrder(order)}
                onCancelOrder={handleCancelOrder}
              />
            )}

            {activeTab === 'addresses' && (
              <AddressesTab key={activeSession.id} session={activeSession} />
            )}

            {activeTab === 'settings' && (
              <SettingsTab key={activeSession.id} session={activeSession} onLogout={handleLogout} />
            )}
          </main>
        </div>
      </div>

      {/* ── Modals ── */}
      <OrderTrackingModal
        order={trackingOrder}
        onClose={() => setTrackingOrder(null)}
      />
    </div>
  );
}
