'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart, CartItem } from '@/shared/context/CartContext';
import CheckoutForm, { CheckoutFormData } from '@/features/checkout/components/CheckoutForm';
import CheckoutSummary from '@/features/checkout/components/CheckoutSummary';
import OrderConfirmation from '@/features/checkout/components/OrderConfirmation';

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [appliedCode, setAppliedCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    items: CartItem[];
    formData: CheckoutFormData;
  } | null>(null);

  const handleApplyDiscount = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'BOTANICAL10' || cleanCode === 'GVEDA10') {
      setDiscountPercent(10);
      setAppliedCode(cleanCode);
      return true;
    }
    if (cleanCode === 'BOTANICAL20' || cleanCode === 'GVEDA20') {
      setDiscountPercent(20);
      setAppliedCode(cleanCode);
      return true;
    }
    return false;
  };

  const handleOrderSubmit = (formData: CheckoutFormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `GVEDA-${Math.floor(10000 + Math.random() * 90000)}`;
      const savedItems = [...items];
      setCompletedOrder({
        orderId: generatedId,
        items: savedItems,
        formData,
      });
      clearCart();
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1600);
  };

  // If order is completed, show order confirmation view
  if (completedOrder) {
    return (
      <main className="min-h-screen bg-[#FAF9F6] pt-28 pb-20 px-4 sm:px-8 lg:px-[5vw]">
        <OrderConfirmation
          orderId={completedOrder.orderId}
          orderItems={completedOrder.items}
          formData={completedOrder.formData}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] pt-28 sm:pt-32 pb-24 px-4 sm:px-8 lg:px-[5vw]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Breadcrumb & Title */}
        <div className="border-b border-rich-black/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-primary text-xs text-rich-black/60 uppercase tracking-widest mb-2">
              <Link href="/" className="hover:text-rich-black transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-botanical-gold font-semibold">Checkout</span>
            </div>
            <h1 className="font-antessa text-3xl sm:text-4xl md:text-5xl font-medium text-rich-black tracking-wide">
              Botanical Checkout
            </h1>
          </div>

          <p className="font-primary text-xs text-rich-black/70 max-w-xs">
            Secure, encrypted checkout. Formulated with care & shipped in UV-protective amber packaging.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-rich-black/10 max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-botanical-gold/10 border border-botanical-gold/20 flex items-center justify-center mx-auto text-botanical-gold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.25 10.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm7.5 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                />
              </svg>
            </div>
            <h2 className="font-antessa text-xl font-medium text-rich-black">
              Your Cart is Empty
            </h2>
            <p className="font-primary text-xs text-rich-black/70">
              Please add botanical formulations to your cart before proceeding to checkout.
            </p>
            <Link
              href="/product"
              className="inline-flex items-center justify-center px-8 py-3 bg-rich-black text-white text-xs font-medium tracking-widest uppercase rounded-full hover:bg-botanical-gold transition-all duration-300 shadow-xs"
            >
              Explore Formulations
            </Link>
          </div>
        ) : (
          /* Main 2-Column Checkout Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Form Steps */}
            <div className="lg:col-span-7">
              <CheckoutForm
                onSubmitOrder={handleOrderSubmit}
                isSubmitting={isSubmitting}
              />
            </div>

            {/* Right Column: Sticky Summary */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <CheckoutSummary
                discountPercent={discountPercent}
                onApplyDiscount={handleApplyDiscount}
                appliedCode={appliedCode}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
