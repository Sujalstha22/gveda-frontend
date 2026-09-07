'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Title from '@/shared/ui/Title';
import { useGalleries } from '../hooks';
import { staticUrl } from '@/shared/api';
import type { GalleryListItem } from '../interface';

interface GalleryCardProps {
    item: GalleryListItem;
    index: number;
    priority: boolean;
}

function GalleryCard({ item, index, priority }: GalleryCardProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    // Rhythmic aspect ratios for natural editorial masonry staggering
    const aspectRatios = [
        'aspect-[4/5]',
        'aspect-[4/3]',
        'aspect-[3/4]',
        'aspect-square',
        'aspect-[16/11]',
        'aspect-[4/5]',
    ];
    const cardAspect = aspectRatios[index % aspectRatios.length];
    const imageUrl = staticUrl(item.image?.name) || '/images/about/gveda-main-img.jpeg';

    return (
        <div className="break-inside-avoid mb-6 sm:mb-8 lg:mb-[2vw]">
            <Link
                href={`/gallery/${item.id}`}
                className="group relative block w-full rounded-2xl overflow-hidden transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl cursor-pointer bg-rich-black transform-gpu will-change-transform"
            >
                <div className={`relative w-full ${cardAspect} overflow-hidden bg-[#F2EDE4]`}>
                    {/* Soft botanical placeholder - static to eliminate compositor repaint loops */}
                    <div
                        className={`absolute inset-0 bg-[#F2EDE4] transition-opacity duration-500 pointer-events-none ${
                            isLoaded ? 'opacity-0' : 'opacity-100'
                        }`}
                    />

                    {/* Native high-performance image with browser-level lazy loading */}
                    <Image
                        src={imageUrl}
                        alt={item.title || 'GVEDA Gallery'}
                        fill
                        priority={priority}
                        loading={priority ? 'eager' : 'lazy'}
                        decoding="async"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        onLoad={() => setIsLoaded(true)}
                        className={`object-cover transition-all duration-500 ease-out group-hover:scale-[1.03] transform-gpu ${
                            isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    />

                    {/* Bottom Dark Scrim for Perfect Typography Contrast */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />

                    {/* Title & Metadata Inside Image Bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-[1.4vw] flex flex-col justify-end text-white z-10">
                        <span className="font-primary text-[10px] tracking-[0.2em] uppercase text-botanical-gold font-medium block mb-1">
                            Archive {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="font-antessa text-lg sm:text-xl font-medium text-white line-clamp-2 group-hover:text-botanical-gold transition-colors">
                            {item.title.trim()}
                        </h3>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default function GalleryGrid() {
    const { data, isLoading, isError, refetch } = useGalleries();
    const galleries = data?.results ?? [];

    // Progressive batching: Render initial 12 cards, unlock more as user scrolls down
    const BATCH_SIZE = 12;
    const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, galleries.length));
                }
            },
            {
                rootMargin: '500px 0px',
                threshold: 0.01,
            }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [galleries.length]);

    const visibleGalleries = galleries.slice(0, visibleCount);
    const hasMore = visibleCount < galleries.length;

    return (
        <section className="w-full min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 select-none">
            <div className="w-full px-4 sm:px-8 lg:px-[5vw] mx-auto">
                <Title
                    eyebrow="Moments"
                    title="Gallery"
                    description="A visual journey through sacred botanicals, mindful craftsmanship, and luminous skin."
                    className="mb-12 sm:mb-16"
                />

                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-3">
                        <div className="w-6 h-6 border-2 border-botanical-gold border-t-transparent rounded-full animate-spin" />
                        <p className="font-primary text-primary/50 text-xs tracking-wider uppercase">Loading Archive…</p>
                    </div>
                ) : isError ? (
                    <div className="text-center py-16">
                        <p className="font-primary text-primary/60 text-sm mb-4">Couldn&apos;t load the gallery.</p>
                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="px-5 py-2 text-xs uppercase tracking-wider font-medium text-primary border border-black/20 rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer"
                        >
                            Try again
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8 lg:gap-[2vw]">
                            {visibleGalleries.map((g, index) => (
                                <GalleryCard
                                    key={g._id}
                                    item={g}
                                    index={index}
                                    priority={index < 4}
                                />
                            ))}
                        </div>

                        {/* Infinite scroll load sentinel */}
                        {hasMore && (
                            <div ref={sentinelRef} className="w-full py-12 flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-botanical-gold border-t-transparent rounded-full animate-spin opacity-60" />
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
