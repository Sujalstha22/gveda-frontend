'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem } from '@/shared/context/CartContext';
import { CheckoutFormData } from './CheckoutForm';

interface OrderConfirmationProps {
  orderId: string;
  orderItems: CartItem[];
  formData: CheckoutFormData;
}

export default function OrderConfirmation({
  orderId,
  orderItems,
  formData,
}: OrderConfirmationProps) {
  const total = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + 12;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white border border-rich-black/10 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8 my-8 text-center sm:text-left">
      {/* Header Badge */}
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2 border-b border-rich-black/10 pb-6">
        <div className="w-14 h-14 rounded-full bg-botanical-gold/10 border border-botanical-gold/30 flex items-center justify-center text-botanical-gold mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <span className="font-primary text-[10px] tracking-[0.2em] uppercase text-botanical-gold font-bold">
          Order Confirmed
        </span>
        <h1 className="font-antessa text-2xl sm:text-4xl font-medium text-rich-black">
          Thank You, {formData.firstName}!
        </h1>
        <p className="font-primary text-xs sm:text-sm text-rich-black/70 max-w-md">
          Your botanical formulations are being carefully prepared and packaged in our climate-controlled sanctuary.
        </p>
      </div>

      {/* Order Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 bg-[#FAF9F6] rounded-2xl border border-rich-black/8 font-primary text-xs text-rich-black/80">
        <div>
          <span className="text-[10px] uppercase font-bold text-rich-black/40 block mb-1">
            Order Reference
          </span>
          <span className="font-mono font-bold text-sm text-rich-black block">{orderId}</span>
          <span className="text-[11px] text-rich-black/60 block mt-1">
            Confirmation sent to {formData.email}
          </span>
        </div>

        <div>
          <span className="text-[10px] uppercase font-bold text-rich-black/40 block mb-1">
            Estimated Delivery
          </span>
          <span className="font-semibold text-rich-black block">3–5 Business Days</span>
          <span className="text-[11px] text-rich-black/60 block mt-1">
            Standard Climate-Controlled Courier
          </span>
        </div>

        <div>
          <span className="text-[10px] uppercase font-bold text-rich-black/40 block mb-1">
            Shipping Address
          </span>
          <span className="font-semibold text-rich-black block">
            {formData.firstName} {formData.lastName}
          </span>
          <span className="block">{formData.address} {formData.apartment || ''}</span>
          <span className="block">{formData.city}, {formData.postalCode}</span>
        </div>

        <div>
          <span className="text-[10px] uppercase font-bold text-rich-black/40 block mb-1">
            Payment Method
          </span>
          <span className="font-semibold text-rich-black uppercase block">
            {formData.paymentMethod === 'card'
              ? 'Credit Card'
              : formData.paymentMethod === 'apple_pay'
              ? 'Apple Pay'
              : 'Cash on Delivery'}
          </span>
          <span className="text-[11px] text-botanical-gold font-bold block mt-1">
            Total Paid: ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Purchased Items List */}
      <div className="space-y-4">
        <h3 className="font-antessa text-base font-medium text-rich-black border-b border-rich-black/10 pb-2">
          Formulations Summary ({orderItems.reduce((acc, i) => acc + i.quantity, 0)})
        </h3>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {orderItems.map((item) => (
            <div
              key={`${item.id}-${item.size || ''}`}
              className="flex items-center justify-between p-3 bg-white rounded-xl border border-rich-black/10"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 bg-[#FAF9F6] rounded-md overflow-hidden shrink-0 border border-rich-black/5 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <h4 className="font-antessa text-sm font-semibold text-rich-black">
                    {item.name}
                  </h4>
                  <span className="font-primary text-[11px] text-rich-black/60">
                    {item.size || 'Standard'} • Qty: {item.quantity}
                  </span>
                </div>
              </div>

              <span className="font-primary font-bold text-xs text-rich-black">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Return Home CTA */}
      <div className="pt-4 border-t border-rich-black/10 text-center sm:text-left">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-rich-black text-white text-xs font-medium tracking-widest uppercase rounded-full hover:bg-botanical-gold transition-all duration-300 shadow-md"
        >
          Return to Sanctuary Home
        </Link>
      </div>
    </div>
  );
}
