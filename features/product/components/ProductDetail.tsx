'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/shared/ui/Button';
import RelatedProducts from './RelatedProducts';
import { useProduct } from '../hooks';
import { staticUrl } from '@/shared/api';

export default function ProductDetail({ slug }: { slug: string }) {
    const { data, isLoading, isError } = useProduct(slug);
    const product = data?.results;

    return (
        <main className="w-full min-h-screen pt-22 pb-24 px-6 md:px-12 flex flex-col justify-center select-none">
            <div className="w-full mx-auto">
                <Link
                    href="/product"
                    className="inline-flex items-center gap-2 text-xs md:text-sm lg:text-[0.9vw] text-primary/60 hover:text-primary transition-colors uppercase mb-6 group"
                >
                    <svg className="w-4 h-4 transform rotate-180 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    Back to products
                </Link>

                {isLoading ? (
                    <p className="py-24 font-primary text-primary/50 text-sm">Loading product…</p>
                ) : isError || !product ? (
                    <p className="py-24 font-primary text-primary/60 text-sm">Product not found.</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
                            <div className="relative w-full h-87.5 sm:h-112.5 md:h-125 lg:h-[75vh] border-2 border-secondary/50 overflow-hidden group bg-primary-dark/10 flex items-center justify-center">
                                <Image
                                    src={staticUrl(product.images?.[0]?.name) || '/images/product/product1.jpeg'}
                                    alt={product.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                            </div>

                            <div className="flex flex-col text-left">
                                <span className="text-[10px] md:text-xs lg:text-[0.85vw] font-semibold text-primary/70 uppercase mb-3">
                                    {product.category?.name ?? product.brand}
                                </span>

                                <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.2vw] text-primary font-light mb-4 leading-tight">
                                    {product.title}
                                </h1>

                                {typeof product.price === 'number' && (
                                    <p className="text-lg lg:text-[1.4vw] text-primary font-primary mb-4">
                                        Rs. {product.price}
                                        {product.comparePrice ? (
                                            <span className="ml-2 text-primary/40 line-through text-sm">
                                                Rs. {product.comparePrice}
                                            </span>
                                        ) : null}
                                    </p>
                                )}

                                <p className="text-xs md:text-lg lg:text-[1.1vw] text-primary/80 font-primary font-light mb-6 max-w-xl lg:max-w-[38vw] whitespace-pre-line">
                                    {product.description}
                                </p>

                                <hr className="border-secondary/60 w-full mb-8" />

                                <div className="flex items-center w-fit">
                                    <Link href="/contact">
                                        <Button variant="primary" size="md" className="px-8 py-3.5 tracking-[0.18em]">
                                            Enquire Now
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {product.category?.slug && (
                            <RelatedProducts
                                currentProductSlug={product.slug}
                                categorySlug={product.category.slug}
                            />
                        )}
                    </>
                )}
            </div>
        </main>
    );
}
