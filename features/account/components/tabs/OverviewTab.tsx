'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Package,
  MapPin,
  ArrowRight,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { CustomerOrder, AccountTab } from '../../types';
import { AuthSession } from '@/features/auth/session';

interface OverviewTabProps {
  session: AuthSession;
  orders: CustomerOrder[];
  onSelectTab: (tab: AccountTab) => void;
  onTrackOrder: (order: CustomerOrder) => void;
}

export default function OverviewTab({
  session,
  orders,
  onSelectTab,
  onTrackOrder,
}: OverviewTabProps) {
  const activeOrders = orders.filter((o) =>
    ['PENDING', 'CONFIRMED', 'PROCESSING', 'DISPATCHED'].includes(o.status)
  );
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ── Welcome & Ritual Status Banner ── */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#FAFAF8] border border-[#BD9F7D]/25 p-6 sm:p-8 shadow-2xs">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] font-heading tracking-tight">
              Welcome back,{' '}
              <span className="font-editorial italic font-normal text-[#BD9F7D]">
                {session.fullName.split(' ')[0]}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-[#111111]/70 max-w-2xl leading-relaxed font-primary">
              Your botanical science dashboard. Track ongoing formulation deliveries, view order history, and update your delivery destinations.
            </p>
          </div>
        </div>
      </div>

      {/* ── Quick Stats Grid (Balanced 3-column layout) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Orders Card */}
        <div
          onClick={() => onSelectTab('orders')}
          className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#111111]/10 hover:border-[#BD9F7D]/50 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#111111]/60 font-primary">Total Orders</span>
            <div className="w-8 h-8 rounded-full bg-[#111111]/5 group-hover:bg-[#BD9F7D]/15 flex items-center justify-center text-[#111111] group-hover:text-[#BD9F7D] transition-colors">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#111111] mt-2 font-primary">{orders.length}</p>

        </div>

        {/* Active In-Transit Orders Card */}
        <div
          onClick={() => onSelectTab('orders')}
          className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#111111]/10 hover:border-[#BD9F7D]/50 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#111111]/60 font-primary">Active Shipments</span>
            <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center text-secondary">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#111111] mt-2 font-primary">{activeOrders.length}</p>

        </div>

        {/* Delivery Destination Card */}
        <div
          onClick={() => onSelectTab('addresses')}
          className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#111111]/10 hover:border-[#BD9F7D]/50 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#111111]/60 font-primary">Delivery Destination</span>
            <div className="w-8 h-8 rounded-full bg-[#111111]/5 group-hover:bg-[#BD9F7D]/15 flex items-center justify-center text-[#111111] group-hover:text-[#BD9F7D] transition-colors">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-bold text-[#111111] mt-2 font-heading truncate">
            {session.districtName || 'Kathmandu'}
          </p>
          <p className="text-[11px] text-[#111111]/50 mt-1 truncate">
            {session.provinceName || 'Bagmati Province'}
          </p>
        </div>
      </div>

      {/* ── Active & Recent Orders Preview ── */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#FAFAF8] border border-[#111111]/10">
        <div className="flex items-center justify-between pb-4 border-b border-[#111111]/10 mb-5">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#111111] font-heading">
              Your Orders
            </h2>

          </div>

          <button
            onClick={() => onSelectTab('orders')}
            className="text-xs font-semibold text-[#BD9F7D] hover:text-[#111111] flex items-center gap-1 transition-colors cursor-pointer"
          >
            View All ({orders.length})
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentOrders.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#111111]/60 font-primary">
            No orders placed yet.{' '}
            <Link href="/product" className="text-[#BD9F7D] underline underline-offset-4 ml-1">
              Explore Botanical Formulations
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-xl bg-white border border-[#111111]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  {/* Thumbnail of first item */}
                  <div className="w-14 h-14 rounded-lg bg-[#F7F5F1] border border-[#111111]/10 flex items-center justify-center overflow-hidden shrink-0">
                    {order.items[0]?.image ? (
                      <Image
                        src={order.items[0].image}
                        alt={order.items[0].name}
                        width={55}
                        height={60}
                        className="object-contain p-1 w-full h-full"
                      />
                    ) : (
                      <Package className="w-6 h-6 text-[#BD9F7D]" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-[#111111]">
                        #{order.orderNumber}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${order.status === 'DELIVERED'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : order.status === 'CANCELLED'
                            ? 'bg-rose-50 text-rose-800 border border-rose-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#111111]/70 mt-1 font-primary">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'} • NPR{' '}
                      {order.total.toLocaleString()}
                    </p>
                    <p className="text-[11px] text-[#111111]/50 font-primary">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onTrackOrder(order)}
                    className="px-4 py-2 rounded-full bg-[#F7F5F1] hover:bg-[#111111] text-[#111111] hover:text-[#FAFAF8] text-xs font-semibold tracking-wide border border-[#111111]/10 transition-all cursor-pointer"
                  >
                    Track Shipment
                  </button>
                  <button
                    onClick={() => onSelectTab('orders')}
                    className="p-2 rounded-full hover:bg-black/5 text-[#111111]/60 cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
