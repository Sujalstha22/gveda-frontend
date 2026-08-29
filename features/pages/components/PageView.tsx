'use client';

import React from 'react';
import { usePage } from '../hooks';

export default function PageView({ slug }: { slug: string }) {
    const { data, isLoading, isError } = usePage(slug);
    const page = data?.results;

    return (
        <main className="w-full min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-8 md:px-12 flex flex-col items-center select-none">
            <div className="w-full max-w-[85vw] sm:max-w-[75vw] lg:max-w-[60vw]">
                {isLoading ? (
                    <p className="py-16 font-primary text-primary/50 text-sm">Loading…</p>
                ) : isError || !page ? (
                    <p className="py-16 font-primary text-primary/60 text-sm">Page not found.</p>
                ) : (
                    <article className="text-primary flex flex-col gap-6">
                        {page.title && (
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-normal leading-tight">
                                {page.title}
                            </h1>
                        )}
                        <div
                            className="blog-content text-sm sm:text-base text-primary/80 font-primary font-light leading-relaxed [&_h5]:font-heading [&_h5]:text-primary [&_h5]:text-xl [&_h5]:mt-6 [&_h6]:font-semibold [&_h6]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-3 [&_a]:underline [&_strong]:font-semibold"
                            dangerouslySetInnerHTML={{ __html: page.content }}
                        />
                    </article>
                )}
            </div>
        </main>
    );
}
