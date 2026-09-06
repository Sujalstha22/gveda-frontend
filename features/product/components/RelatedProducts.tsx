"use client";

import React from 'react';
import { useProductsByCategory, toCardProduct } from '..';
import ProductCard from './ProductCard';

interface RelatedProductsProps {
    currentProductSlug: string;
    categorySlug: string;
}

export default function RelatedProducts({ currentProductSlug, categorySlug }: RelatedProductsProps) {
    const { data } = useProductsByCategory(categorySlug);

    const relatedList = (data?.results ?? [])
        .filter((p) => p.slug !== currentProductSlug)
        .slice(0, 4);

    if (relatedList.length === 0) return null;

    return (
        <section className="w-full pt-16 sm:pt-20 lg:pt-[5vw]">
            <div className="w-full">
                <div className="text-center mb-8 sm:mb-10 lg:mb-[2.5vw]">
                    <span className="font-editorial italic text-2xl sm:text-3xl text-accent-gold font-normal mb-1 block">
                        Complete Your Ritual
                    </span>
                    <h2 className="font-primary font-medium text-3xl sm:text-4xl text-primary">
                        Related Products
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-[1.5vw]">
                    {relatedList.map((product) => (
                        <ProductCard key={product._id} product={toCardProduct(product)} />
                    ))}
                </div>
            </div>
        </section>
    );
}
