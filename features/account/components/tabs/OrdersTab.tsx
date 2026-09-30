'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Package,
  Search,
  Truck,
  RotateCcw,
  XCircle,
  MapPin,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { CustomerOrder } from '../../types';
import { useCart } from '@/shared/context/CartContext';

interface OrdersTabProps {
  orders: CustomerOrder[];
  onTrackOrder: (order: CustomerOrder) => void;
  onCancelOrder: (orderId: string) => void;
}

export default function OrdersTab({
  orders,
  onTrackOrder,
  onCancelOrder,
}: OrdersTabProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});
  const { addToCart, openCart } = useCart();

  const toggleExpand = (id: string) => {
    setExpandedOrders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReorder = (order: CustomerOrder) => {
    order.items.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        size: item.volume,
        slug: item.slug,
        quantity: item.quantity,
      });
    });
    openCart();
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Status filter
      if (selectedStatus === 'ACTIVE') {
        if (!['PENDING', 'CONFIRMED', 'PROCESSING', 'DISPATCHED'].includes(order.status)) {
          return false;
        }
      } else if (selectedStatus !== 'ALL' && order.status !== selectedStatus) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesNumber = order.orderNumber.toLowerCase().includes(q);
        const matchesItem = order.items.some((i) => i.name.toLowerCase().includes(q));
        return matchesNumber || matchesItem;
      }

      return true;
    });
  }, [orders, selectedStatus, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ── Tab Header & Filters ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#111111]/10">
        <div>
          <h2 className="text-xl font-bold text-[#111111] font-heading">My Botanical Orders</h2>
          <p className="text-xs text-[#111111]/60">
            View laboratory preparation status, live tracking, and order history
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#111111]/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order # or formulation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-full bg-[#FAFAF8] border border-[#111111]/15 text-[#111111] focus:outline-none focus:border-[#BD9F7D] transition-colors"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'ALL', label: 'All Orders', count: orders.length },
          {
            id: 'ACTIVE',
            label: 'In Progress',
            count: orders.filter((o) =>
              ['PENDING', 'CONFIRMED', 'PROCESSING', 'DISPATCHED'].includes(o.status)
            ).length,
          },
          {
            id: 'DELIVERED',
            label: 'Delivered',
            count: orders.filter((o) => o.status === 'DELIVERED').length,
          },
          {
            id: 'CANCELLED',
            label: 'Cancelled',
            count: orders.filter((o) => o.status === 'CANCELLED').length,
          },
        ].map((chip) => (
          <button
            key={chip.id}
            onClick={() => setSelectedStatus(chip.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all shrink-0 cursor-pointer ${
              selectedStatus === chip.id
                ? 'bg-[#111111] text-[#FAFAF8]'
                : 'bg-[#FAFAF8] border border-[#111111]/10 text-[#111111]/70 hover:border-[#111111]/30'
            }`}
          >
            {chip.label} ({chip.count})
          </button>
        ))}
      </div>

      {/* ── Orders List ── */}
      {filteredOrders.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#FAFAF8] border border-[#111111]/10">
          <Package className="w-10 h-10 text-[#BD9F7D]/60 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-[#111111] font-heading">No matching orders found</h3>
          <p className="text-xs text-[#111111]/60 mt-1">
            {searchQuery
              ? 'Try adjusting your search criteria or filter status.'
              : 'You have not placed any orders matching this filter.'}
          </p>
          <Link
            href="/product"
            className="inline-block mt-4 px-6 py-2 rounded-full bg-[#111111] text-[#FAFAF8] text-xs font-semibold hover:bg-[#BD9F7D] transition-colors"
          >
            Browse Botanical Formulations
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isExpanded = expandedOrders[order.id] ?? false;
            const canCancel = ['PENDING', 'CONFIRMED', 'PROCESSING'].includes(order.status);

            return (
              <div
                key={order.id}
                className="rounded-2xl bg-[#FAFAF8] border border-[#111111]/10 overflow-hidden shadow-2xs hover:border-[#BD9F7D]/30 transition-all"
              >
                {/* Order Summary Header */}
                <div className="p-5 sm:p-6 bg-white border-b border-[#111111]/5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <span className="text-[10px] font-semibold text-[#111111]/50 uppercase tracking-wider block">
                        Order Placed
                      </span>
                      <span className="text-xs font-bold text-[#111111]">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="hidden sm:block w-[1px] h-7 bg-[#111111]/10" />

                    <div>
                      <span className="text-[10px] font-semibold text-[#111111]/50 uppercase tracking-wider block">
                        Total Amount
                      </span>
                      <span className="text-xs font-bold text-[#111111]">
                        NPR {order.total.toLocaleString()}
                      </span>
                    </div>

                    <div className="hidden sm:block w-[1px] h-7 bg-[#111111]/10" />

                    <div>
                      <span className="text-[10px] font-semibold text-[#111111]/50 uppercase tracking-wider block">
                        Order Reference
                      </span>
                      <span className="font-mono text-xs font-bold text-[#111111]">
                        #{order.orderNumber}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge & Actions */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full ${
                        order.status === 'DELIVERED'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : order.status === 'CANCELLED'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {order.status}
                    </span>

                    <button
                      onClick={() => toggleExpand(order.id)}
                      className="p-1.5 rounded-full hover:bg-black/5 text-[#111111]/60"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Items List Preview */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white border border-[#111111]/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-[#F7F5F1] flex items-center justify-center shrink-0 overflow-hidden">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={48}
                                height={48}
                                className="object-contain p-1 w-full h-full"
                              />
                            ) : (
                              <Package className="w-5 h-5 text-[#BD9F7D]" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#111111] line-clamp-1">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-[#111111]/60">
                              Qty: {item.quantity} {item.volume ? `• ${item.volume}` : ''}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-[#111111]">
                          NPR {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Expandable breakdown and shipping details */}
                  {isExpanded && (
                    <div className="pt-4 mt-4 border-t border-[#111111]/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs animate-in fade-in duration-200">
                      {/* Shipping info */}
                      <div className="p-4 rounded-xl bg-white border border-[#111111]/5">
                        <div className="flex items-center gap-2 mb-2 font-semibold text-[#111111]">
                          <MapPin className="w-3.5 h-3.5 text-[#BD9F7D]" />
                          Shipping Destination
                        </div>
                        <p className="text-[#111111]/80 font-medium">
                          {order.shippingAddress.fullName}
                        </p>
                        <p className="text-[#111111]/60">
                          {order.shippingAddress.streetAddress}, {order.shippingAddress.city}
                        </p>
                        <p className="text-[#111111]/60">
                          Contact: {order.shippingAddress.phoneNumber}
                        </p>
                      </div>

                      {/* Payment info */}
                      <div className="p-4 rounded-xl bg-white border border-[#111111]/5 space-y-1.5">
                        <div className="flex justify-between text-[#111111]/60">
                          <span>Subtotal</span>
                          <span>NPR {order.subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[#111111]/60">
                          <span>Botanical Shipping</span>
                          <span>
                            {order.shippingFee === 0
                              ? 'Complimentary'
                              : `NPR ${order.shippingFee.toLocaleString()}`}
                          </span>
                        </div>
                        {order.discount > 0 && (
                          <div className="flex justify-between text-[#BD9F7D] font-medium">
                            <span>Ritual Member Discount</span>
                            <span>- NPR {order.discount.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="pt-2 border-t border-[#111111]/10 flex justify-between font-bold text-[#111111]">
                          <span>Grand Total</span>
                          <span>NPR {order.total.toLocaleString()}</span>
                        </div>
                        <div className="pt-1 text-[10px] text-[#111111]/50 flex justify-between">
                          <span>Payment Method: {order.paymentMethod}</span>
                          <span className="text-emerald-700 font-semibold">{order.paymentStatus}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card Action Buttons */}
                  <div className="pt-3 border-t border-[#111111]/5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onTrackOrder(order)}
                        className="px-4 py-2 rounded-full bg-[#111111] hover:bg-[#BD9F7D] text-[#FAFAF8] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        Track Consignment
                      </button>

                      <button
                        onClick={() => handleReorder(order)}
                        className="px-4 py-2 rounded-full bg-white hover:bg-black/5 border border-[#111111]/15 text-[#111111] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Re-Order
                      </button>
                    </div>

                    {canCancel && (
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              `Are you sure you want to cancel order #${order.orderNumber}?`
                            )
                          ) {
                            onCancelOrder(order.id);
                          }
                        }}
                        className="text-xs text-rose-700 hover:text-rose-900 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
