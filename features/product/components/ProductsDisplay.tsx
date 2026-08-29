'use client';

import React, { useState } from 'react';
import ProductCard from './ProductCard';
import {
    useProducts,
    useProductsByCategory,
    useProductCategories,
    toCardProduct,
} from '..';

const ProductsDisplay: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | category slug

    const categoriesQuery = useProductCategories();
    const categories = categoriesQuery.data?.results ?? [];

    const listQuery = useProducts({
        search: searchQuery || undefined,
        pageSize: 100,
    });
    const categoryQuery = useProductsByCategory(
        selectedCategory === 'all' ? '' : selectedCategory,
    );

    const active = selectedCategory === 'all' ? listQuery : categoryQuery;
    const products = active.data?.results ?? [];

    const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all';
    const resetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
    };

    return (
        <section className="w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 select-none">
            {/* ── Section Header ── */}
            <div className="w-full max-w-4xl mx-auto text-center mb-12 sm:mb-16">
                <span className="font-editorial italic text-2xl sm:text-3xl text-accent-gold font-normal mb-1">
                    Botanical Science
                </span>
                <h1 className="text-4xl sm:text-5xl text-primary font-medium">
                    The Complete Collection
                </h1>
                <p className="font-primary font-normal text-sm sm:text-base text-primary/75 max-w-xl mx-auto mt-3 sm:mt-4 leading-relaxed">
                    Pure, biocompatible botanical formulations designed to nourish and protect skin and hair health naturally.
                </p>
            </div>

            {/* ── Filter Bar ── */}
            <div className="max-w-7xl mx-auto mb-10 sm:mb-12 flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/80 border border-black/5 shadow-xs">
                {/* Category Pills */}
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <button
                        type="button"
                        onClick={() => setSelectedCategory('all')}
                        className={`px-4 py-2 rounded-full text-xs font-primary font-medium tracking-wider uppercase transition-all cursor-pointer ${
                            selectedCategory === 'all'
                                ? 'bg-primary text-white shadow-xs'
                                : 'bg-transparent text-primary/70 hover:text-primary hover:bg-black/5'
                        }`}
                    >
                        All
                    </button>

                    {categories.map((cat) => {
                        const isSelected = selectedCategory === cat.slug;
                        return (
                            <button
                                key={cat.slug}
                                type="button"
                                onClick={() => setSelectedCategory(cat.slug)}
                                className={`px-4 py-2 rounded-full text-xs font-primary font-medium tracking-wider uppercase transition-all cursor-pointer ${
                                    isSelected
                                        ? 'bg-primary text-white shadow-xs'
                                        : 'bg-transparent text-primary/70 hover:text-primary hover:bg-black/5'
                                }`}
                            >
                                {cat.name.trim()}
                            </button>
                        );
                    })}
                </div>

                {/* Search Bar & Reset */}
                <div className="flex items-center gap-2 w-full md:w-72">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/90 text-primary placeholder:text-muted border border-black/10 rounded-full pl-9 pr-4 py-2 text-xs sm:text-sm font-primary focus:outline-none focus:border-primary transition-colors"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {hasActiveFilters && (
                        <button
                            type="button"
                            onClick={resetFilters}
                            title="Reset filters"
                            className="p-2 text-primary/60 hover:text-primary border border-black/10 rounded-full text-xs shrink-0 cursor-pointer transition-colors"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* ── Products Grid ── */}
            <div className="">
                {active.isLoading ? (
                    <p className="text-center py-16 font-primary text-primary/50 text-sm">Loading products…</p>
                ) : active.isError ? (
                    <div className="text-center py-16">
                        <p className="font-primary text-primary/60 text-sm mb-4">Couldn&apos;t load products.</p>
                        <button
                            type="button"
                            onClick={() => active.refetch()}
                            className="px-5 py-2 text-xs uppercase tracking-wider font-medium text-primary border border-black/20 rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer"
                        >
                            Try again
                        </button>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={toCardProduct(product)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 sm:py-24 border border-dashed border-black/10 rounded-2xl max-w-3xl mx-auto">
                        <h3 className="font-primary text-lg sm:text-xl text-primary font-medium mb-2">No Products Found</h3>
                        <p className="font-primary text-primary/60 text-xs sm:text-sm max-w-sm mx-auto mb-4">
                            We couldn&apos;t find any items matching your search or filters. Try adjusting your selections.
                        </p>
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="px-5 py-2 text-xs uppercase tracking-wider font-medium text-primary border border-black/20 rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer"
                        >
                            View All Products
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductsDisplay;
