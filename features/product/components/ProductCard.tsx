'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/shared/context/CartContext';

export interface Product {
    id: number | string;
    slug?: string;
    name: string;
    subtitle?: string;
    volume?: string;
    price?: number | string;
    comparePrice?: number | string | null;
    image: string;
    category?: string;
    description?: string;
    noteLabel?: string;
    noteValue?: string;
    href?: string;
    rating?: number;
}

export interface ProductCardProps {
    product: Product;
    className?: string;
    sizes?: string;
    onProductClick?: () => void;
}

export default function ProductCard({
    product,
    className = '',
    sizes = '(max-width: 640px) 80vw, (max-width: 1024px) 33vw, 22vw',
    onProductClick,
}: ProductCardProps) {
    const router = useRouter();
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();
    const href = product.href || (product.slug ? `/product/${product.slug}` : '/product');

    // Deterministically compute rating (including 4.5 on several products)
    const cardRating = typeof product.rating === 'number'
        ? product.rating
        : (() => {
            const str = String(product.id || product.slug || product.name || '');
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash = (hash << 5) - hash + str.charCodeAt(i);
                hash |= 0;
            }
            const sampleRatings = [5.0, 4.5, 4.8, 4.5, 5.0, 4.9, 4.5, 5.0];
            return sampleRatings[Math.abs(hash) % sampleRatings.length];
        })();

    const handleCardClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button, a')) {
            return;
        }
        onProductClick?.();
        router.push(href);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setAdded(true);
        setTimeout(() => setAdded(false), 1600);

        const numericPrice = typeof product.price === 'number'
            ? product.price
            : parseFloat(String(product.price || '').replace(/[^0-9.]/g, '')) || 48;

        addToCart({
            id: String(product.id || product.slug || product.name),
            name: product.name,
            price: numericPrice,
            image: product.image,
            category: product.category,
            size: product.volume,
            slug: product.slug,
        });
    };

    return (
        <div
            onClick={handleCardClick}
            className={`group relative flex flex-col w-full h-full rounded-lg overflow-hidden bg-warm-ivory transition-all duration-300 cursor-pointer border border-primary/5 hover:border-secondary/25 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] ${className}`}
        >
            {/* Base Link for SEO & right-click / middle-click tab support */}
            <Link
                href={href}
                onClick={() => onProductClick?.()}
                className="absolute inset-0 z-0"
                aria-label={product.name}
                tabIndex={-1}
            />

            {/* 1. Base Product Image Stage */}
            <div className="relative w-full aspect-square bg-warm-ivory overflow-hidden pointer-events-none">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes={sizes}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
                />
            </div>

            {/* 2. Product Details & Actions (Editorial Split Layout) */}
            <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-transparent z-10 border-t border-primary/5">
                <div className="w-full flex flex-col items-start text-left">
                    {/* Category Eyebrow */}
                    {product.category && product.category.toLowerCase() !== 'gveda' && (
                        <span className="font-primary text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-secondary font-medium mb-1 line-clamp-1">
                            {product.category}
                        </span>
                    )}

                    {/* Title (Single Row) */}
                    <h3 className="font-heading text-base sm:text-lg text-primary font-semibold tracking-tight line-clamp-1 truncate leading-snug group-hover:text-secondary transition-colors w-full">
                        {product.name}
                    </h3>

                    {/* Star Rating below Title (Supports 5.0, 4.5, etc.) */}
                    <div className="flex items-center gap-1 mt-1.5" aria-label={`${cardRating} out of 5 stars`}>
                        <div className="flex items-center gap-0.5 text-accent-gold">
                            {Array.from({ length: 5 }).map((_, i) => {
                                const starIndex = i + 1;
                                const isFull = cardRating >= starIndex;
                                const isHalf = !isFull && cardRating >= starIndex - 0.5;

                                if (isFull) {
                                    return (
                                        <svg
                                            key={i}
                                            className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-accent-gold"
                                            viewBox="0 0 20 20"
                                            aria-hidden="true"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    );
                                }

                                if (isHalf) {
                                    return (
                                        <div key={i} className="relative w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true">
                                            {/* Soft base empty star */}
                                            <svg className="w-full h-full fill-[#E5E0D8]" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            {/* Half gold star mask */}
                                            <div className="absolute inset-0 w-[50%] overflow-hidden">
                                                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-accent-gold" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <svg
                                        key={i}
                                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#E5E0D8]"
                                        viewBox="0 0 20 20"
                                        aria-hidden="true"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                );
                            })}
                        </div>
                        <span className="font-primary text-[10px] sm:text-[11px] text-primary/45 font-medium ml-1 select-none">
                            ({cardRating.toFixed(1)})
                        </span>
                    </div>

                    {/* Description */}
                    {product.description && (
                        <p className="font-primary font-normal text-xs text-primary/70 mt-1.5 line-clamp-2 leading-relaxed">
                            {product.description}
                        </p>
                    )}
                </div>

                {/* 3. Bottom Editorial Row: Price & Volume on Left, Compact Add Button on Right */}
                <div className="mt-4 pt-3.5 border-t border-primary/5 w-full flex items-center justify-between gap-3">
                    {/* Left: Price & Size/Volume */}
                    <div className="flex flex-col items-start text-left">
                        <div className="flex items-baseline gap-1.5">
                            <span className="font-primary text-base sm:text-lg font-semibold text-primary">
                                Rs. {Number(product.price || 48).toFixed(2)}
                            </span>
                            {Boolean(
                                product.comparePrice &&
                                Number(product.comparePrice) > Number(product.price || 0)
                            ) ? (
                                <span className="font-primary text-xs text-primary/40 line-through">
                                    Rs. {Number(product.comparePrice).toFixed(2)}
                                </span>
                            ) : null}
                        </div>
                        {Boolean(product.volume && product.volume !== '0') ? (
                            <span className="font-primary text-[10px] text-primary/50 tracking-wider uppercase mt-0.5">
                                {product.volume}
                            </span>
                        ) : null}
                    </div>

                    {/* Right: Refined Compact Pill Button */}
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={added}
                        aria-label={added ? 'Added to bag' : `Add ${product.name} to bag`}
                        className={`h-9 px-4 rounded-full text-[11px] tracking-[0.14em] uppercase font-medium transition-all duration-300 pointer-events-auto flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0 shadow-2xs ${added
                                ? 'bg-botanical-gold text-white border border-botanical-gold'
                                : 'bg-primary text-white hover:bg-neutral-800 border border-primary'
                            }`}
                    >
                        {added ? (
                            <>
                                <svg
                                    className="w-3.5 h-3.5 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <polyline
                                        points="20 6 9 17 4 12"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span>Added</span>
                            </>
                        ) : (
                            <>
                                <span className="text-sm leading-none font-light">+</span>
                                <span>Add</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

