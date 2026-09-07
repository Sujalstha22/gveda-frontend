'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/shared/context/CartContext';

interface CheckoutSummaryProps {
  discountPercent: number;
  onApplyDiscount: (code: string) => boolean;
  appliedCode: string;
}

export default function CheckoutSummary({
  discountPercent,
  onApplyDiscount,
  appliedCode,
}: CheckoutSummaryProps) {
  const { items, subtotal } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    setPromoError('');
    const success = onApplyDiscount(promoInput);
    if (!success) {
      setPromoError('Invalid promo code. Try "BOTANICAL10"');
    } else {
      setPromoInput('');
    }
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingCost = subtotal > 0 ? 12 : 0;
  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const total = Math.max(0, subtotal - discountAmount + shippingCost + estimatedTax);

  return (
    <div className="w-full bg-[#FAF9F6] border border-rich-black/10 rounded-2xl p-6 lg:p-8 space-y-6 shrink-0">
      {/* Header */}
      <div className="border-b border-rich-black/10 pb-4">
        <span className="font-primary text-[10px] tracking-[0.2em] uppercase text-botanical-gold font-medium block mb-1">
          GVEDA Formulations
        </span>
        <h2 className="font-antessa text-xl font-medium text-rich-black tracking-wide flex items-center justify-between">
          <span>Order Summary</span>
          <span className="font-primary text-xs font-normal text-rich-black/60 lowercase">
            ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
          </span>
        </h2>
      </div>

      {/* Cart Items List */}
      <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
        {items.length === 0 ? (
          <p className="font-primary text-xs text-rich-black/60 italic py-4 text-center">
            Your cart is currently empty.
          </p>
        ) : (
          items.map((item) => (
            <div
              key={`${item.id}-${item.size || ''}`}
              className="flex items-center gap-3.5 py-2 group"
            >
              <div className="relative w-16 h-16 bg-white rounded-lg shrink-0 overflow-hidden border border-rich-black/8 flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-contain p-1.5"
                />
                <span className="absolute top-1 right-1 bg-botanical-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-2xs">
                  {item.quantity}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-antessa text-sm font-semibold text-rich-black truncate">
                  {item.name}
                </h4>
                {item.size && (
                  <span className="font-primary text-[11px] text-rich-black/50 block">
                    {item.size}
                  </span>
                )}
                <span className="font-primary text-xs text-rich-black/70">
                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                </span>
              </div>

              <div className="text-right shrink-0">
                <span className="font-primary font-bold text-xs text-rich-black">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Promo Code Input */}
      <div className="pt-2 border-t border-rich-black/10">
        <form onSubmit={handleApplyPromo} className="flex gap-2">
          <input
            type="text"
            placeholder="Promo code (e.g. BOTANICAL10)"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            className="flex-1 px-3.5 py-2.5 bg-white border border-rich-black/15 rounded-lg text-xs font-primary text-rich-black placeholder:text-rich-black/40 focus:outline-none focus:border-botanical-gold uppercase"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-rich-black text-white text-xs font-primary font-medium tracking-wider uppercase rounded-lg hover:bg-botanical-gold transition-colors shrink-0"
          >
            Apply
          </button>
        </form>

        {promoError && (
          <p className="font-primary text-[11px] text-red-600 mt-1.5">{promoError}</p>
        )}
        {appliedCode && (
          <p className="font-primary text-[11px] text-emerald-700 font-medium mt-1.5 flex items-center gap-1">
            ✓ Code <span className="uppercase font-bold">{appliedCode}</span> applied ({discountPercent}% off)
          </p>
        )}
      </div>

      {/* Totals Breakdown */}
      <div className="space-y-2.5 pt-4 border-t border-rich-black/10 font-primary text-xs text-rich-black/70">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="text-rich-black font-medium">${subtotal.toFixed(2)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-700">
            <span>Discount ({discountPercent}%)</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Standard Shipping</span>
          <span className="text-rich-black font-medium">
            {shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'Calculated'}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Tax (8%)</span>
          <span className="text-rich-black font-medium">${estimatedTax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center text-base sm:text-lg font-bold font-antessa text-rich-black pt-3 border-t border-rich-black/10 uppercase tracking-wide">
          <span>Total</span>
          <span className="text-botanical-gold">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Botanical Guarantee Callout */}
      <div className="p-4 bg-white/70 rounded-xl border border-rich-black/5 space-y-2 text-[11px] font-primary text-rich-black/70">
        <div className="flex items-center gap-2 text-rich-black font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="w-4 h-4 text-botanical-gold"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>GVEDA Botanical Assurance</span>
        </div>
        <ul className="space-y-1 list-disc list-inside text-rich-black/60 pl-1">
          <li>Dermatologically evaluated for sensitive skin</li>
          <li>Complimentary luxury sample included with every order</li>
          <li>30-Day botanical money-back satisfaction guarantee</li>
        </ul>
      </div>
    </div>
  );
}
