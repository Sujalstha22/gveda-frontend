'use client';

import React from 'react';
import { X, CheckCircle2, Clock, Truck, Package, ShieldCheck, MapPin } from 'lucide-react';
import { CustomerOrder } from '../types';

interface OrderTrackingModalProps {
  order: CustomerOrder | null;
  onClose: () => void;
}

export default function OrderTrackingModal({ order, onClose }: OrderTrackingModalProps) {
  if (!order) return null;

  const steps = [
    {
      title: 'Order Placed & Confirmed',
      desc: 'Payment processed and order entered into laboratory queue.',
      date: new Date(order.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      completed: true,
      current: order.status === 'CONFIRMED' || order.status === 'PENDING',
      icon: Clock,
    },
    {
      title: 'Botanical Blending & Quality QA',
      desc: 'Formulations prepared and verified by GVEDA botanical chemists.',
      date: order.status !== 'PENDING' ? 'Completed' : 'Pending',
      completed: ['PROCESSING', 'DISPATCHED', 'DELIVERED'].includes(order.status),
      current: order.status === 'PROCESSING',
      icon: ShieldCheck,
    },
    {
      title: 'Dispatched & In Transit',
      desc: 'Handed over to GVEDA climate-controlled express logistics.',
      date: order.trackingNumber ? `Waybill: ${order.trackingNumber}` : 'Scheduled',
      completed: ['DISPATCHED', 'DELIVERED'].includes(order.status),
      current: order.status === 'DISPATCHED',
      icon: Truck,
    },
    {
      title: 'Delivered',
      desc: order.deliveredAt ? `Delivered on ${order.deliveredAt}` : `Estimated by ${order.estimatedDelivery || '3-5 Business Days'}`,
      date: order.deliveredAt || order.estimatedDelivery || 'Upcoming',
      completed: order.status === 'DELIVERED',
      current: false,
      icon: Package,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-xl bg-[#FAFAF8] rounded-2xl border border-[#BD9F7D]/25 shadow-xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-[#111111]/10">
          <div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#BD9F7D]">
              Live Consignment Tracking
            </span>
            <h3 className="text-xl font-bold text-[#111111] mt-1 font-heading">
              Order #{order.orderNumber}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full hover:bg-black/5 text-[#111111]/60 hover:text-[#111111] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tracking Details Banner */}
        <div className="my-5 p-4 rounded-xl bg-[#F7F5F1] border border-[#BD9F7D]/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <p className="text-[#111111]/50 font-medium">Tracking Code</p>
            <p className="font-mono font-semibold text-[#111111] mt-0.5">
              {order.trackingNumber || 'GV-LOG-PENDING'}
            </p>
          </div>
          <div>
            <p className="text-[#111111]/50 font-medium">Estimated Arrival</p>
            <p className="font-semibold text-[#111111] mt-0.5">
              {order.deliveredAt ? 'Completed' : order.estimatedDelivery || '3-5 Business Days'}
            </p>
          </div>
          <div>
            <p className="text-[#111111]/50 font-medium">Carrier</p>
            <p className="font-semibold text-[#BD9F7D] mt-0.5">GVEDA Priority Botanical Express</p>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="space-y-6 my-6 relative pl-3">
          {/* Timeline Line */}
          <div className="absolute left-[23px] top-3 bottom-3 w-[2px] bg-[#111111]/10" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative flex items-start gap-4">
                <div
                  className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                    step.completed
                      ? 'bg-[#111111] text-[#FAFAF8]'
                      : step.current
                      ? 'bg-[#BD9F7D] text-white ring-4 ring-[#BD9F7D]/20'
                      : 'bg-white border border-[#111111]/20 text-[#111111]/40'
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-[#BD9F7D]" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1 pt-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`text-sm font-semibold ${
                        step.completed || step.current ? 'text-[#111111]' : 'text-[#111111]/50'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <span className="text-[11px] font-mono text-[#111111]/50">{step.date}</span>
                  </div>
                  <p className="text-xs text-[#111111]/70 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Delivery Address Snapshot */}
        <div className="pt-4 border-t border-[#111111]/10">
          <div className="flex items-start gap-2.5 text-xs text-[#111111]/80">
            <MapPin className="w-4 h-4 text-[#BD9F7D] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#111111]">Delivering to: </span>
              {order.shippingAddress.fullName}, {order.shippingAddress.streetAddress},{' '}
              {order.shippingAddress.city} ({order.shippingAddress.phoneNumber})
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#111111] text-[#FAFAF8] text-xs font-semibold tracking-wider hover:bg-[#111111]/90 transition-all cursor-pointer"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
}
