'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/shared/context/CartContext';

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, removeFromCart, updateQuantity, subtotal, totalItems } =
    useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity duration-500 z-[998] ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel (Right Side) */}
      <aside
        aria-label="Shopping Cart Drawer"
        aria-hidden={!isCartOpen}
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[440px] md:w-[460px] bg-[#FAF9F6] shadow-2xl flex flex-col z-[999] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-rich-black/10 flex items-center justify-between bg-white shrink-0">
          <div>
            <span className="font-primary text-[10px] tracking-[0.2em] uppercase text-botanical-gold font-medium block">
              GVEDA Rituals
            </span>
            <h2 className="font-antessa text-lg sm:text-xl font-medium text-rich-black tracking-wide flex items-center gap-2">
              Your Selection <span className="font-editorial italic font-normal text-botanical-gold border-b border-botanical-gold/20 pb-0.5">({totalItems})</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart drawer"
            className="w-9 h-9 rounded-full flex items-center justify-center text-rich-black/70 hover:text-rich-black hover:bg-rich-black/5 transition-all duration-200 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Body / Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-16 h-16 rounded-full bg-botanical-gold/10 border border-botanical-gold/20 flex items-center justify-center mb-4 text-botanical-gold">
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
              <h3 className="font-antessa text-lg font-medium text-rich-black mb-1">
                Your Cart is Empty
              </h3>
              <p className="font-primary text-xs text-rich-black/70 max-w-[260px] leading-relaxed mb-6">
                Discover our botanical formulations crafted with pure natural ingredients and modern science.
              </p>
              <Link
                href="/product"
                onClick={closeCart}
                className="inline-flex items-center justify-center px-6 py-3 bg-rich-black text-white text-xs font-medium tracking-widest uppercase rounded-full hover:bg-botanical-gold transition-all duration-300 shadow-xs"
              >
                Shop Formulations
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.size || ''}`}
                className="group relative flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-secondary/20 hover:bg-secondary/30 border border-secondary/20 hover:border-secondary transition-all duration-300 overflow-hidden"
              >
                {/* Product Thumbnail */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-lg bg-white border border-secondary/15 flex items-center justify-center p-1.5 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info & Quantity */}
                <div className="flex-1 min-w-0">
                  {item.category && item.category.toLowerCase() !== 'gveda' && (
                    <span className="font-primary text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-secondary font-medium block truncate">
                      {item.category}
                    </span>
                  )}
                  <h4 className="font-primary text-xs sm:text-sm font-medium text-primary line-clamp-2 leading-snug group-hover:text-secondary transition-colors">
                    {item.name}
                  </h4>
                  {item.size && (
                    <span className="font-primary text-[11px] text-rich-black/50 block mt-0.5">
                      Size: {item.size}
                    </span>
                  )}
                  <div className="font-primary text-xs sm:text-sm font-semibold text-primary mt-0.5">
                    Rs. {item.price.toFixed(2)}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-secondary/30 rounded-full bg-white/80 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="w-6 h-6 flex items-center justify-center text-rich-black/70 hover:text-rich-black hover:bg-rich-black/5 rounded-l-md transition-colors text-xs"
                      >
                        -
                      </button>
                      <span className="w-7 text-center font-primary text-xs font-semibold text-rich-black select-none">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="w-6 h-6 flex items-center justify-center text-rich-black/70 hover:text-rich-black hover:bg-rich-black/5 rounded-r-md transition-colors text-xs"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                      className="text-[11px] font-primary text-rich-black/40 hover:text-primary underline transition-colors ml-auto"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Total per Item */}
                <div className="text-right shrink-0 self-start pt-1">
                  <span className="font-primary font-bold text-xs sm:text-sm text-rich-black block">
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 bg-white border-t border-rich-black/10 shrink-0 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-rich-black/60 font-primary">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex items-center justify-between text-base sm:text-lg font-bold font-heading text-rich-black pt-1">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toFixed(2)}</span>
              </div>
            </div>

            <p className="font-primary text-[11px] text-rich-black/60 italic text-center">
              Complimentary botanical sample included with every order.
            </p>

            <div className="space-y-3 pt-1">
              <Link
                href="/login?redirect=/checkout"
                onClick={closeCart}
                className="group relative w-full h-13 px-6 bg-rich-black text-white rounded-full flex items-center justify-between border border-rich-black hover:border-botanical-gold transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="font-primary text-xs font-semibold tracking-[0.16em] uppercase text-warm-ivory group-hover:text-white transition-colors">
                    Proceed to Checkout
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="font-primary font-bold text-xs sm:text-sm text-botanical-gold group-hover:text-warm-ivory transition-colors">
                    Rs. {subtotal.toFixed(2)}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-botanical-gold group-hover:text-rich-black transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.2"
                      stroke="currentColor"
                      className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </Link>

              <div className="flex items-center justify-center gap-2 font-primary text-[10px] tracking-wider uppercase text-rich-black/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3 h-3 text-botanical-gold"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Encrypted & Climate-Controlled</span>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
