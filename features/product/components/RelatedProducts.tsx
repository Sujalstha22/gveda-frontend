"use client";

import React, { useState } from 'react';
import { useProductsByCategory, toCardProduct } from '..';
import ProductCard from './ProductCard';
import Pagination from '@/shared/ui/Pagination';
import Title from '@/shared/ui/Title';

interface RelatedProductsProps {
    currentProductSlug: string;
    categorySlug: string;
}

export default function RelatedProducts({ currentProductSlug, categorySlug }: RelatedProductsProps) {
    const { data } = useProductsByCategory(categorySlug);
    const [currentPage, setCurrentPage] = useState(1);

    const PAGE_SIZE = 12; // 3 rows of 4 products

    const allRelated = (data?.results ?? []).filter(
        (p) => p.slug !== currentProductSlug
    );

    if (allRelated.length === 0) return null;

    const totalPages = Math.ceil(allRelated.length / PAGE_SIZE);
    const paginatedList = allRelated.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    return (
        <section id="related-products-section" className="w-full pt-16 sm:pt-20 lg:pt-[5vw]">
            <div className="w-full">
                <Title
                    eyebrow="Complete Your Ritual"
                    title="Related Products"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-[1.5vw]">
                    {paginatedList.map((product) => (
                        <ProductCard key={product._id} product={toCardProduct(product)} />
                    ))}
                </div>

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        totalItems={allRelated.length}
                        pageSize={PAGE_SIZE}
                        itemName="Related Formulations"
                        scrollTargetId="related-products-section"
                    />
                )}
            </div>
        </section>
    );
}
