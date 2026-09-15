'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, FileText } from 'lucide-react';
import { usePages } from '../hooks';

export default function PagesIndex() {
    const { data, isLoading, isError, refetch } = usePages();
    const pages = data?.results ?? [];

    return (
        <main className="w-full min-h-screen bg-warm-ivory text-primary pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 md:px-8 flex flex-col items-center select-text">
            <div className="w-full max-w-2xl mx-auto flex flex-col">
                <div className="text-center mb-10 sm:mb-14 flex flex-col items-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-white border border-border text-[11px] uppercase tracking-[0.18em] font-medium text-secondary mb-4">
                        <ShieldCheck className="w-3 h-3 text-secondary shrink-0" strokeWidth={2} />
                        <span>Institutional Standards</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-heading font-medium tracking-tight text-primary mb-3">
                        Policies and Care
                    </h1>
                    <p className="text-xs sm:text-sm text-muted font-normal max-w-md leading-relaxed">
                        Official terms, guidelines, and compliance documentation governing our botanical formulations and client services.
                    </p>
                </div>

                {isLoading ? (
                    <div className="space-y-4 py-8 animate-pulse" aria-label="Loading policies">
                        <div className="w-full h-14 bg-black/5 rounded-xl" />
                        <div className="w-full h-14 bg-black/5 rounded-xl" />
                        <div className="w-full h-14 bg-black/5 rounded-xl" />
                        <div className="w-full h-14 bg-black/5 rounded-xl" />
                    </div>
                ) : isError ? (
                    <div className="text-center py-16 px-6 bg-soft-white rounded-2xl border border-border/70 flex flex-col items-center">
                        <FileText className="w-8 h-8 text-muted stroke-[1.5] mb-4" />
                        <h2 className="text-xl font-heading font-medium text-primary mb-2">
                            Unable to Load Policies
                        </h2>
                        <p className="font-primary text-muted text-xs sm:text-sm mb-6 max-w-sm">
                            We were unable to retrieve the policies directory at this time.
                        </p>
                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-medium text-primary border border-border rounded-full hover:bg-warm-ivory transition-colors cursor-pointer"
                        >
                            Try again
                        </button>
                    </div>
                ) : (
                    <ul className="flex flex-col divide-y divide-border/60 border-y border-border/60">
                        {pages.map((p) => (
                            <li key={p.slug}>
                                <Link
                                    href={`/policies/${p.slug}`}
                                    className="group flex items-center justify-between py-4 sm:py-5 font-primary text-sm sm:text-base text-primary/85 hover:text-primary transition-colors"
                                >
                                    <span className="font-medium group-hover:translate-x-1 transition-transform">
                                        {p.title}
                                    </span>
                                    <div className="flex items-center gap-1 text-xs text-muted group-hover:text-primary transition-colors">
                                        <span className="hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity">Read</span>
                                        <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    );
}
