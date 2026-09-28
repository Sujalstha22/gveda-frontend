'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/shared/context/CartContext';
import Button from '@/shared/ui/Button';
import type { Product } from './ProductCard';

export interface ProductCardV2Props {
    product: Product;
    className?: string;
    sizes?: string;
    onProductClick?: () => void;
}

export default function ProductCardV2({
    product,
    className = '',
    sizes = '(max-width: 640px) 85vw, (max-width: 1024px) 33vw, 25vw',
    onProductClick,
}: ProductCardV2Props) {
    const router = useRouter();
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();
    const productHref = product.href || (product.slug ? `/product/${product.slug}` : '/product');

    const handleCardClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button, a')) {
            return;
        }
        onProductClick?.();
        router.push(productHref);
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
            className={`min-w-0 group relative flex flex-col justify-between bg-white transition-colors duration-300 hover:bg-neutral-50/40 cursor-pointer h-full ${className}`}
        >
            {/* Top: Clean Product Image with Integrated Slow-Fade Hover Button (No Upper Span) */}
            <div className="relative w-full aspect-[4/5] flex items-center justify-center bg-white overflow-hidden border-b border-black/10">
                <Link
                    href={productHref}
                    onClick={() => onProductClick?.()}
                    className="relative w-full h-full flex items-center justify-center overflow-hidden"
                    aria-label={`View ${product.name}`}
                >
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes={sizes}
                        className="object-contain w-full h-full p-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                </Link>

                {/* Full Card Width Button Overlay above image bottom with Slow & Controlled Fade-in */}
                <Button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={added}
                    variant={added ? 'secondary' : 'primary'}
                    iconPosition="left"
                    icon={
                        added ? (
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
                        ) : undefined
                    }
                    aria-label={added ? `Added ${product.name} to bag` : `Add ${product.name} to bag`}
                    className={`!rounded-none absolute bottom-0 inset-x-0 !w-full !py-3 !px-4 text-[11px] sm:text-xs font-medium tracking-[0.16em] uppercase transition-all duration-700 ease-out cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99] z-20 ${added
                        ? '!bg-botanical-gold !text-white !border-t !border-botanical-gold opacity-100'
                        : '!bg-primary hover:!text-secondary !text-white !border-t !border-primary hover:!bg-neutral-800 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0'
                        }`}
                >
                    {added ? 'Added to bag' : '+ Add to bag'}
                </Button>
            </div>

            {/* Bottom: Title, Description & Price Details */}
            <div className="w-full flex flex-col items-center text-center pt-4 pb-5 px-4 sm:px-6 bg-warm-ivory">
                <Link
                    href={productHref}
                    onClick={() => onProductClick?.()}
                    className="font-primary text-sm sm:text-base lg:text-[0.92vw] text-primary/90 font-medium hover:text-primary transition-colors leading-snug line-clamp-1 w-full"
                >
                    {product.name}
                </Link>

                {Boolean(product.description) && (
                    <p className="font-primary font-normal text-xs text-neutral-500 mt-1.5 line-clamp-2 leading-relaxed max-w-[240px]">
                        {product.description}
                    </p>
                )}

                <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-primary text-xs sm:text-sm lg:text-[0.88vw] font-bold text-primary">
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
