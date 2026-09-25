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

    const formattedPrice =
        typeof product.price === 'number'
            ? `Rs. ${product.price.toLocaleString()}`
            : String(product.price || '').startsWith('Rs.')
                ? product.price
                : `Rs. ${product.price || '0'}`;

    return (
        <div
            onClick={handleCardClick}
            className={`min-w-0 group relative flex flex-col justify-between bg-white border border-[#E5E5E5] transition-all duration-500 hover:border-black/40 cursor-pointer h-full ${className}`}
        >
            {/* Base Link for SEO & right-click / middle-click tab support */}
            <Link
                href={href}
                onClick={() => onProductClick?.()}
                className="absolute inset-0 z-0"
                aria-label={product.name}
                tabIndex={-1}
            />

            {/* Product Image Section: Full width and height, no padding */}
            <div className="relative w-full aspect-[4/4.8] sm:aspect-[4/5] bg-neutral-100 overflow-hidden block">
                <Link
                    href={href}
                    onClick={() => onProductClick?.()}
                    className="relative w-full h-full flex items-center justify-center overflow-hidden"
                    aria-label={`View ${product.name}`}
                >
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes={sizes}
                        className="object-cover object-center w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                </Link>

                {/* Full Card Width Button Overlay on Image Bottom with Smooth Hover Fade-in */}
                <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={added}
                    aria-label={added ? `Added ${product.name} to bag` : `Add ${product.name} to bag`}
                    className={`absolute bottom-0 inset-x-0 w-full py-3.5 px-4 text-[11px] sm:text-xs font-medium tracking-[0.18em] uppercase transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center gap-2 cursor-pointer z-10 shadow-xs border-t border-white/20 active:scale-[0.99] ${added
                        ? 'bg-botanical-gold text-white opacity-100 translate-y-0'
                        : 'bg-rich-black backdrop-blur-md text-white hover:bg-neutral-800 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0'
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
                            <span>Added to bag</span>
                        </>
                    ) : (
                        <>
                            <span>Add to bag</span>
                            <svg
                                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </>
                    )}
                </button>
            </div>

            {/* Thin Horizontal Divider */}
            <div className="w-full border-t border-[#EAEAEA]" />

            {/* Product Details: Title, Description & Price */}
            <div className="w-full flex flex-col items-center text-center pt-5 pb-6 sm:pt-6 sm:pb-7 px-4 sm:px-6">
                <Link
                    href={href}
                    onClick={() => onProductClick?.()}
                    className="font-heading text-base sm:text-lg font-semibold text-rich-black hover:text-botanical-gold transition-colors duration-200 leading-snug line-clamp-1 w-full"
                >
                    {product.name}
                </Link>

                {Boolean(product.description || product.subtitle) && (
                    <p className="font-primary text-xs sm:text-[13px] font-normal text-neutral-500 leading-relaxed mt-2 max-w-[260px] line-clamp-2 min-h-[36px]">
                        {product.description || product.subtitle}
                    </p>
                )}

                {/* Price Display */}
                <div className="mt-3 flex items-baseline justify-center gap-2">
                    <span className="font-primary text-sm sm:text-base font-semibold text-primary">
                        {formattedPrice}
                    </span>
                    {Boolean(
                        product.comparePrice &&
                        Number(product.comparePrice) > Number(product.price || 0)
                    ) && (
                        <span className="font-primary text-xs text-primary/40 line-through">
                            Rs. {Number(product.comparePrice).toLocaleString()}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

