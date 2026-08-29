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
        .slice(0, 3);

    if (relatedList.length === 0) return null;

    return (
        <section className="w-full pt-24">
            <div className="w-full">
                <h2 className="font-heading text-3xl md:text-5xl text-secondary text-center font-light mb-12">
                    Related Products
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 lg:gap-16">
                    {relatedList.map((product) => (
                        <ProductCard key={product._id} product={toCardProduct(product)} />
                    ))}
                </div>
            </div>
        </section>
    );
}
