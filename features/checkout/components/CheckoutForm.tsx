'use client';

import React, { useState } from 'react';

export interface CheckoutFormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'card' | 'apple_pay' | 'cod';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  cardName?: string;
}

interface CheckoutFormProps {
  onSubmitOrder: (data: CheckoutFormData) => void;
  isSubmitting: boolean;
}

export default function CheckoutForm({ onSubmitOrder, isSubmitting }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
    if (!formData.email || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 15) {
        newErrors.cardNumber = 'Valid card number required';
      }
      if (!formData.cardExpiry || !formData.cardExpiry.includes('/')) {
        newErrors.cardExpiry = 'MM/YY required';
      }
      if (!formData.cardCvc || formData.cardCvc.length < 3) {
        newErrors.cardCvc = 'CVC required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmitOrder(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 1. Contact Information */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-rich-black/10 space-y-4">
        <div className="flex items-center justify-between border-b border-rich-black/10 pb-3">
          <h3 className="font-antessa text-lg font-medium text-rich-black tracking-wide">
            1. Contact Information
          </h3>
          <span className="font-primary text-[11px] text-rich-black/50">Required</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block font-primary text-xs font-medium text-rich-black/70 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-[#FAF9F6] border rounded-xl font-primary text-sm text-rich-black focus:outline-none focus:border-botanical-gold transition-colors ${
                errors.email ? 'border-red-500' : 'border-rich-black/15'
              }`}
            />
            {errors.email && <p className="font-primary text-[11px] text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block font-primary text-xs font-medium text-rich-black/70 mb-1">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#FAF9F6] border border-rich-black/15 rounded-xl font-primary text-sm text-rich-black focus:outline-none focus:border-botanical-gold transition-colors"
            />
          </div>
        </div>
      </section>

      {/* 2. Shipping Address */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-rich-black/10 space-y-4">
        <div className="flex items-center justify-between border-b border-rich-black/10 pb-3">
          <h3 className="font-antessa text-lg font-medium text-rich-black tracking-wide">
            2. Shipping Address
          </h3>
          <span className="font-primary text-[11px] text-rich-black/50">Physical destination</span>
        </div>

        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-primary text-xs font-medium text-rich-black/70 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[#FAF9F6] border rounded-xl font-primary text-sm text-rich-black focus:outline-none focus:border-botanical-gold ${
                  errors.firstName ? 'border-red-500' : 'border-rich-black/15'
                }`}
              />
              {errors.firstName && (
                <p className="font-primary text-[11px] text-red-600 mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block font-primary text-xs font-medium text-rich-black/70 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[#FAF9F6] border rounded-xl font-primary text-sm text-rich-black focus:outline-none focus:border-botanical-gold ${
                  errors.lastName ? 'border-red-500' : 'border-rich-black/15'
                }`}
              />
              {errors.lastName && (
                <p className="font-primary text-[11px] text-red-600 mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block font-primary text-xs font-medium text-rich-black/70 mb-1">
              Street Address *
            </label>
            <input
              type="text"
              name="address"
              placeholder="123 Botanical Sanctuary Way"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-[#FAF9F6] border rounded-xl font-primary text-sm text-rich-black focus:outline-none focus:border-botanical-gold ${
                errors.address ? 'border-red-500' : 'border-rich-black/15'
              }`}
            />
            {errors.address && (
              <p className="font-primary text-[11px] text-red-600 mt-1">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-primary text-xs font-medium text-rich-black/70 mb-1">
                Apartment / Suite
              </label>
              <input
                type="text"
                name="apartment"
                placeholder="Apt 4B"
                value={formData.apartment}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#FAF9F6] border border-rich-black/15 rounded-xl font-primary text-sm text-rich-black focus:outline-none focus:border-botanical-gold"
              />
            </div>

            <div>
              <label className="block font-primary text-xs font-medium text-rich-black/70 mb-1">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[#FAF9F6] border rounded-xl font-primary text-sm text-rich-black focus:outline-none focus:border-botanical-gold ${
                  errors.city ? 'border-red-500' : 'border-rich-black/15'
                }`}
              />
              {errors.city && <p className="font-primary text-[11px] text-red-600 mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block font-primary text-xs font-medium text-rich-black/70 mb-1">
                Postal Code *
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[#FAF9F6] border rounded-xl font-primary text-sm text-rich-black focus:outline-none focus:border-botanical-gold ${
                  errors.postalCode ? 'border-red-500' : 'border-rich-black/15'
                }`}
              />
              {errors.postalCode && (
                <p className="font-primary text-[11px] text-red-600 mt-1">{errors.postalCode}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shipping Options */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-rich-black/10 space-y-4">
        <div className="border-b border-rich-black/10 pb-3">
          <h3 className="font-antessa text-lg font-medium text-rich-black tracking-wide">
            3. Shipping Speed
          </h3>
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-center justify-between p-4 rounded-xl border border-rich-black/15 cursor-pointer hover:border-botanical-gold transition-colors">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="shippingMethod"
                value="standard"
                checked={formData.shippingMethod === 'standard'}
                onChange={handleChange}
                className="accent-botanical-gold w-4 h-4"
              />
              <div>
                <span className="font-primary text-sm font-semibold text-rich-black block">
                  Standard Botanical Delivery
                </span>
                <span className="font-primary text-xs text-rich-black/60 block">
                  3–5 Business Days in UV-protective amber packaging
                </span>
              </div>
            </div>
            <span className="font-primary font-bold text-sm text-rich-black">$12.00</span>
          </label>

          <label className="flex items-center justify-between p-4 rounded-xl border border-rich-black/15 cursor-pointer hover:border-botanical-gold transition-colors">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="shippingMethod"
                value="express"
                checked={formData.shippingMethod === 'express'}
                onChange={handleChange}
                className="accent-botanical-gold w-4 h-4"
              />
              <div>
                <span className="font-primary text-sm font-semibold text-rich-black block">
                  Express Botanical Courier
                </span>
                <span className="font-primary text-xs text-rich-black/60 block">
                  1–2 Business Days with signature climate-controlled handling
                </span>
              </div>
            </div>
            <span className="font-primary font-bold text-sm text-rich-black">$24.00</span>
          </label>
        </div>
      </section>

      {/* 4. Payment Method */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-rich-black/10 space-y-4">
        <div className="border-b border-rich-black/10 pb-3">
          <h3 className="font-antessa text-lg font-medium text-rich-black tracking-wide">
            4. Payment Selection
          </h3>
        </div>

        <div className="space-y-3 pt-2">
          {/* Credit Card Radio */}
          <label className="flex items-center gap-3 p-4 rounded-xl border border-rich-black/15 cursor-pointer hover:border-botanical-gold transition-colors">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === 'card'}
              onChange={handleChange}
              className="accent-botanical-gold w-4 h-4"
            />
            <span className="font-primary text-sm font-semibold text-rich-black">
              Credit / Debit Card (Visa, Mastercard, Amex)
            </span>
          </label>

          {formData.paymentMethod === 'card' && (
            <div className="p-4 bg-[#FAF9F6] rounded-xl border border-rich-black/10 space-y-4 ml-6">
              <div>
                <label className="block font-primary text-xs font-medium text-rich-black/70 mb-1">
                  Card Number *
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="4532 •••• •••• 8920"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border rounded-xl font-primary text-sm text-rich-black focus:outline-none focus:border-botanical-gold ${
                    errors.cardNumber ? 'border-red-500' : 'border-rich-black/15'
                  }`}
                />
                {errors.cardNumber && (
                  <p className="font-primary text-[11px] text-red-600 mt-1">{errors.cardNumber}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-primary text-xs font-medium text-rich-black/70 mb-1">
                    Expiry (MM/YY) *
                  </label>
                  <input
                    type="text"
                    name="cardExpiry"
                    placeholder="12/28"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white border rounded-xl font-primary text-sm text-rich-black focus:outline-none focus:border-botanical-gold ${
                      errors.cardExpiry ? 'border-red-500' : 'border-rich-black/15'
                    }`}
                  />
                  {errors.cardExpiry && (
                    <p className="font-primary text-[11px] text-red-600 mt-1">{errors.cardExpiry}</p>
                  )}
                </div>

                <div>
                  <label className="block font-primary text-xs font-medium text-rich-black/70 mb-1">
                    CVC *
                  </label>
                  <input
                    type="text"
                    name="cardCvc"
                    placeholder="892"
                    value={formData.cardCvc}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white border rounded-xl font-primary text-sm text-rich-black focus:outline-none focus:border-botanical-gold ${
                      errors.cardCvc ? 'border-red-500' : 'border-rich-black/15'
                    }`}
                  />
                  {errors.cardCvc && (
                    <p className="font-primary text-[11px] text-red-600 mt-1">{errors.cardCvc}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Apple Pay Radio */}
          <label className="flex items-center gap-3 p-4 rounded-xl border border-rich-black/15 cursor-pointer hover:border-botanical-gold transition-colors">
            <input
              type="radio"
              name="paymentMethod"
              value="apple_pay"
              checked={formData.paymentMethod === 'apple_pay'}
              onChange={handleChange}
              className="accent-botanical-gold w-4 h-4"
            />
            <span className="font-primary text-sm font-semibold text-rich-black">
              Apple Pay / Digital Wallet
            </span>
          </label>

          {/* Cash on Delivery / Botanical Invoice Radio */}
          <label className="flex items-center gap-3 p-4 rounded-xl border border-rich-black/15 cursor-pointer hover:border-botanical-gold transition-colors">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={formData.paymentMethod === 'cod'}
              onChange={handleChange}
              className="accent-botanical-gold w-4 h-4"
            />
            <div>
              <span className="font-primary text-sm font-semibold text-rich-black block">
                Cash on Delivery / Invoice Upon Receipt
              </span>
              <span className="font-primary text-xs text-rich-black/60 block">
                Pay directly upon delivery after inspecting your botanical formulation
              </span>
            </div>
          </label>
        </div>
      </section>

      {/* Place Order CTA */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-rich-black text-white text-xs sm:text-sm font-medium tracking-widest uppercase rounded-full hover:bg-botanical-gold flex items-center justify-center gap-3 transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Processing Botanical Order...
          </span>
        ) : (
          <span>Place Botanical Order</span>
        )}
      </button>
    </form>
  );
}
