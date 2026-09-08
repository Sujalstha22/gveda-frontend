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
            className={`group relative flex flex-col w-full h-full rounded-lg overflow-hidden bg-white transition-all duration-300 cursor-pointer border border-secondary/30 hover:border-secondary hover:shadow-subtle ${className}`}
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
            <div className="relative w-full aspect-square bg-[#FAF9F6] flex items-center justify-center p-6 overflow-hidden pointer-events-none">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes={sizes}
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
                />
            </div>

            {/* 2. Product Details & Actions (Editorial Split Layout) */}
            <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white z-10 border-t border-secondary/15">
                <div className="w-full flex flex-col items-start text-left">
                    {/* Category Eyebrow */}
                    {product.category && product.category.toLowerCase() !== 'gveda' && (
                        <span className="font-primary text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-secondary font-medium mb-1 line-clamp-1">
                            {product.category}
                        </span>
                    )}

                    {/* Title */}
                    <h3 className="font-heading text-base sm:text-lg text-primary font-semibold tracking-tight line-clamp-2 leading-snug group-hover:text-secondary transition-colors">
                        {product.name}
                    </h3>

                    {/* Description */}
                    {product.description && (
                        <p className="font-primary font-normal text-xs text-primary/70 mt-1 line-clamp-2 leading-relaxed">
                            {product.description}
                        </p>
                    )}
                </div>

                {/* 3. Bottom Editorial Row: Price & Volume on Left, Compact Add Button on Right */}
                <div className="mt-4 pt-3.5 border-t border-secondary/15 w-full flex items-center justify-between gap-3">
                    {/* Left: Price & Size/Volume */}
                    <div className="flex flex-col items-start text-left">
                        <div className="flex items-baseline gap-1.5">
                            <span className="font-primary text-base sm:text-lg font-semibold text-primary">
                                ${Number(product.price || 48).toFixed(2)}
                            </span>
                            {Boolean(
                                product.comparePrice &&
                                Number(product.comparePrice) > Number(product.price || 0)
                            ) ? (
                                <span className="font-primary text-xs text-primary/40 line-through">
                                    ${Number(product.comparePrice).toFixed(2)}
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
                        className={`h-9 px-4 rounded-full text-[11px] tracking-[0.14em] uppercase font-medium transition-all duration-300 pointer-events-auto flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0 shadow-2xs ${
                            added
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

