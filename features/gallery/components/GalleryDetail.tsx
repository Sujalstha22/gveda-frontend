'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGallery } from '../hooks';
import { staticUrl } from '@/shared/api';

export default function GalleryDetail({ id }: { id: number }) {
    const { data, isLoading, isError } = useGallery(id);
    const gallery = data?.results;
    const images = gallery?.images ?? [];

    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const close = useCallback(() => setLightboxIndex(null), []);
    const step = useCallback(
        (delta: number) =>
            setLightboxIndex((i) =>
                i === null ? i : (i + delta + images.length) % images.length,
            ),
        [images.length],
    );

    useEffect(() => {
        if (lightboxIndex === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowRight') step(1);
            if (e.key === 'ArrowLeft') step(-1);
        };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [lightboxIndex, close, step]);

    return (
        <main className="w-full min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-8 md:px-12 select-none">
            <div className="w-full max-w-6xl mx-auto">
                <Link
                    href="/gallery"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm text-primary/70 hover:text-primary transition-colors uppercase mb-8 group font-primary font-medium"
                >
                    <svg className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    Back to gallery
                </Link>

                {isLoading ? (
                    <p className="py-16 font-primary text-primary/50 text-sm">Loading…</p>
                ) : isError || !gallery ? (
                    <p className="py-16 font-primary text-primary/60 text-sm">Gallery not found.</p>
                ) : (
                    <>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-primary font-heading font-normal mb-10">
                            {gallery.title.trim()}
                        </h1>
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 [&>*]:mb-4 sm:[&>*]:mb-6">
                            {images.map((img, i) => (
                                <button
                                    key={img.name}
                                    type="button"
                                    onClick={() => setLightboxIndex(i)}
                                    className="relative block w-full overflow-hidden rounded-xl border border-secondary/40 break-inside-avoid cursor-zoom-in group"
                                >
                                    <Image
                                        src={staticUrl(img.name)}
                                        alt={gallery.title}
                                        width={600}
                                        height={800}
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                    />
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {lightboxIndex !== null && images[lightboxIndex] && (
                <div
                    role="dialog"
                    aria-modal="true"
                    onClick={close}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
                >
                    <button
                        type="button"
                        onClick={close}
                        aria-label="Close"
                        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white text-3xl leading-none cursor-pointer"
                    >
                        ×
                    </button>

                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); step(-1); }}
                                aria-label="Previous image"
                                className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white text-2xl cursor-pointer"
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); step(1); }}
                                aria-label="Next image"
                                className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white text-2xl cursor-pointer"
                            >
                                ›
                            </button>
                        </>
                    )}

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full h-full max-w-5xl max-h-[85vh] flex items-center justify-center"
                    >
                        <Image
                            src={staticUrl(images[lightboxIndex].name)}
                            alt={gallery?.title ?? ''}
                            fill
                            sizes="100vw"
                            priority
                            className="object-contain"
                        />
                    </div>

                    {images.length > 1 && (
                        <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/70 text-xs font-primary">
                            {lightboxIndex + 1} / {images.length}
                        </span>
                    )}
                </div>
            )}
        </main>
    );
}
