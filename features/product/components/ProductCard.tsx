'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/shared/ui/Button';

export interface Product {
    id: number | string;
    slug?: string;
    name: string;
    subtitle?: string;
    volume?: string;
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
    const href = product.href || (product.slug ? `/product/${product.slug}` : '/product');

    return (
        <Link
            href={href}
            className={`group relative block w-full aspect-3/4 sm:aspect-4/5 rounded-2xl overflow-hidden  bg-white transition-all duration-500 cursor-pointer border border-secondary/30 ${className}`}
        >
            {/* 1. Base Product Image Background (Visible by default) */}
            <div className="absolute inset-0 bg-white flex items-center justify-center p-6 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes={sizes}
                    className="object-contain p-6 group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                />
            </div>

            {/* 2. Gradient Overlay (Hidden by default, reveals on hover) */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-white via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
            />

            {/* 3. Card Content & Staggered Elements (Hidden by default, reveals on hover) */}
            <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-end items-center text-center z-10 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-400 ease-[cubic-bezier(0.19,1,0.22,1)]">
                {/* Title */}
                <h3 className="font-heading text-lg sm:text-xl text-primary font-semibold tracking-tight opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 ease-[cubic-bezier(0.19,1,0.22,1)]">
                    {product.name}
                </h3>

                {/* Description */}
                {product.description && (
                    <p className="font-primary font-semibold text-xs text-zinc-700 mt-1 line-clamp-2 max-w-[90%] opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200 ease-[cubic-bezier(0.19,1,0.22,1)]">
                        {product.description}
                    </p>
                )}

                {/* CTA Button using shared/ui/Button */}
                <div className="mt-4 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-250 ease-[cubic-bezier(0.19,1,0.22,1)]">
                    <Button
                        size="sm"
                        variant="secondary"
                        className="pointer-events-none group-hover:pointer-events-auto shadow-md text-white!"
                    >
                        View Details
                    </Button>
                </div>
            </div>
        </Link>
    );
}

