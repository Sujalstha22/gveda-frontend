'use client';

import React from 'react';
import Image from 'next/image';
import { useEvents } from '../hooks';
import { staticUrl } from '@/shared/api';

export default function EventsList() {
    const { data, isLoading, isError, refetch } = useEvents();
    const events = data?.results ?? [];

    return (
        <section className="w-full min-h-screen py-16 sm:py-24 px-4 sm:px-8 md:px-12 select-none">
            <div className="w-full max-w-4xl mx-auto text-center mb-12 sm:mb-16">
                <span className="font-editorial italic text-2xl sm:text-3xl text-accent-gold font-normal mb-1">
                    Gather
                </span>
                <h1 className="text-4xl sm:text-5xl text-primary font-medium">Events</h1>
            </div>

            {isLoading ? (
                <p className="text-center py-16 font-primary text-primary/50 text-sm">Loading events…</p>
            ) : isError ? (
                <div className="text-center py-16">
                    <p className="font-primary text-primary/60 text-sm mb-4">Couldn&apos;t load events.</p>
                    <button
                        type="button"
                        onClick={() => refetch()}
                        className="px-5 py-2 text-xs uppercase tracking-wider font-medium text-primary border border-black/20 rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    >
                        Try again
                    </button>
                </div>
            ) : events.length === 0 ? (
                <p className="text-center py-16 font-primary text-primary/60 text-sm">
                    No events scheduled right now. Check back soon.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                    {events.map((e) => (
                        <div
                            key={e._id}
                            className="flex flex-col border border-secondary/50 rounded-2xl overflow-hidden bg-primary-dark/10"
                        >
                            {e.image?.name && (
                                <div className="relative aspect-16/10 w-full overflow-hidden">
                                    <Image
                                        src={staticUrl(e.image.name)}
                                        alt={e.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="p-6 flex flex-col gap-2">
                                <h3 className="font-heading text-lg font-medium text-primary">{e.title}</h3>
                                {typeof e.content === 'string' && e.content && (
                                    <p className="text-xs sm:text-sm text-primary/75 font-primary font-light line-clamp-3">
                                        {e.content.replace(/<[^>]+>/g, ' ').trim()}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
