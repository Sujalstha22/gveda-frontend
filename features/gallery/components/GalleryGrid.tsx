'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGalleries } from '../hooks';
import { staticUrl } from '@/shared/api';

export default function GalleryGrid() {
    const { data, isLoading, isError, refetch } = useGalleries();
    const galleries = data?.results ?? [];

    return (
        <section className="w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 select-none">
            <div className="w-full max-w-4xl mx-auto text-center mb-12 sm:mb-16">
                <span className="font-editorial italic text-2xl sm:text-3xl text-accent-gold font-normal mb-1">
                    Moments
                </span>
                <h1 className="text-4xl sm:text-5xl text-primary font-medium">Gallery</h1>
            </div>

            {isLoading ? (
                <p className="text-center py-16 font-primary text-primary/50 text-sm">Loading gallery…</p>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                    {galleries.map((g) => (
                        <Link
                            key={g._id}
                            href={`/gallery/${g.id}`}
                            className="group flex flex-col border border-secondary/50 rounded-2xl overflow-hidden bg-primary-dark/10 transition-all duration-300 hover:-translate-y-1 hover:border-secondary"
                        >
                            <div className="relative aspect-4/3 w-full overflow-hidden">
                                <Image
                                    src={staticUrl(g.image?.name)}
                                    alt={g.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="font-heading text-base sm:text-lg font-medium text-primary line-clamp-2">
                                    {g.title.trim()}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}
