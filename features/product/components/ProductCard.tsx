'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/shared/ui/Button';
import { useCart } from '@/shared/context/CartContext';

export interface Product {
    id: number | string;
    slug?: string;
    name: string;
    subtitle?: string;
    volume?: string;
    price?: number | string;
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
}

export default function ProductCard({
    product,
    className = '',
    sizes = '(max-width: 640px) 80vw, (max-width: 1024px) 33vw, 22vw',
}: ProductCardProps) {
    const router = useRouter();
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();
    const href = product.href || (product.slug ? `/product/${product.slug}` : '/product');

    const handleCardClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button, a')) {
            return;
        }
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

            {/* 2. Product Details & Actions (Always visible by default) */}
            <div className="p-4 sm:p-5 flex flex-col flex-1 items-center justify-between text-center bg-white z-10 border-t border-secondary/15">
                <div className="w-full flex flex-col items-center">
                    {/* Category Eyebrow */}
                    {product.category && product.category.toLowerCase() !== 'gveda' && (
                        <span className="font-primary text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-secondary font-medium mb-1 line-clamp-1">
                            {product.category}
                        </span>
                    )}

                    {/* Title (Always visible) */}
                    <h3 className="font-heading text-base sm:text-lg text-primary font-semibold tracking-tight line-clamp-1 group-hover:text-secondary transition-colors">
                        {product.name}
                    </h3>

                    {/* Description (Always visible) */}
                    {product.description && (
                        <p className="font-primary font-normal text-xs text-primary/70 mt-1 line-clamp-2 max-w-[95%] leading-relaxed">
                            {product.description}
                        </p>
                    )}
                </div>

                {/* 3. Action Buttons (View Details + Add to Cart) - Always visible */}
                <div className="mt-4 pt-3 border-t border-secondary/15 w-full flex items-center justify-center gap-2.5">
                    {/* View Details Button */}
                    <Button
                        size="md"
                        variant="secondary"
                        className="!h-9 sm:!h-10 lg:!h-10 !py-0 !leading-none !px-4 sm:!px-5 shadow-xs text-white! pointer-events-auto text-xs sm:text-[13px] font-medium tracking-wider uppercase flex items-center justify-center"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(href);
                        }}
                    >
                        View Details
                    </Button>

                    {/* Add to Cart Icon Button */}
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        aria-label={added ? 'Added to cart' : 'Add to cart'}
                        title={added ? 'Added to cart' : 'Add to cart'}
                        className={`h-9 w-9 sm:h-10 sm:w-10 lg:h-10 lg:w-10 rounded-full flex items-center justify-center transition-all duration-300 pointer-events-auto shadow-xs cursor-pointer shrink-0 border ${
                            added
                                ? 'bg-botanical-gold text-white border-botanical-gold scale-105'
                                : 'bg-rich-black text-white border-rich-black hover:bg-botanical-gold hover:border-botanical-gold hover:scale-105'
                        }`}
                    >
                        {added ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                                aria-hidden="true"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                                aria-hidden="true"
                            >
                                <circle cx="8" cy="21" r="1" />
                                <circle cx="19" cy="21" r="1" />
                                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

