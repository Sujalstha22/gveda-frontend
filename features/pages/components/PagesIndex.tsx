'use client';

import React from 'react';
import Link from 'next/link';
import { usePages } from '../hooks';

export default function PagesIndex() {
    const { data, isLoading, isError, refetch } = usePages();
    const pages = data?.results ?? [];

    return (
        <main className="w-full min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-8 md:px-12 flex flex-col items-center select-none">
            <div className="w-full max-w-2xl">
                <h1 className="text-4xl sm:text-5xl text-primary font-medium mb-10 text-center">
                    Policies
                </h1>

                {isLoading ? (
                    <p className="py-10 text-center font-primary text-primary/50 text-sm">Loading…</p>
                ) : isError ? (
                    <div className="text-center py-10">
                        <p className="font-primary text-primary/60 text-sm mb-4">Couldn&apos;t load pages.</p>
                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="px-5 py-2 text-xs uppercase tracking-wider font-medium text-primary border border-black/20 rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer"
                        >
                            Try again
                        </button>
                    </div>
                ) : (
                    <ul className="flex flex-col divide-y divide-secondary/40 border-y border-secondary/40">
                        {pages.map((p) => (
                            <li key={p.slug}>
                                <Link
                                    href={`/policies/${p.slug}`}
                                    className="flex items-center justify-between py-4 font-primary text-sm sm:text-base text-primary/80 hover:text-primary transition-colors"
                                >
                                    <span>{p.title}</span>
                                    <span aria-hidden="true">→</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    );
}
