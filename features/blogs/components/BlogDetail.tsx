'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useBlog } from '../hooks';
import { staticUrl } from '@/shared/api';

const formatDate = (iso?: string) =>
    iso
        ? new Date(iso).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : '';

export default function BlogDetail({ slug }: { slug: string }) {
    const { data, isLoading, isError } = useBlog(slug);
    const post = data?.results;

    return (
        <main className="w-full min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-8 md:px-12 flex flex-col items-center select-none">
            <div className="w-full max-w-[85vw] sm:max-w-[75vw] lg:max-w-[65vw]">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm lg:text-[0.9vw] text-primary/70 hover:text-primary transition-colors uppercase mb-6 sm:mb-8 group font-primary font-medium"
                >
                    <svg
                        className="w-4 h-4 transform rotate-180 transition-transform group-hover:-translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    Back to blogs
                </Link>

                {isLoading ? (
                    <p className="py-16 font-primary text-primary/50 text-sm">Loading article…</p>
                ) : isError || !post ? (
                    <p className="py-16 font-primary text-primary/60 text-sm">Article not found.</p>
                ) : (
                    <article className="w-full py-4 sm:py-8 md:py-12 text-primary flex flex-col gap-5 sm:gap-6 md:gap-8">
                        <div className="text-xs sm:text-sm lg:text-[0.85vw] font-medium text-primary/70 uppercase tracking-wider font-mono">
                            {formatDate(post.createdAt)} • Journal
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-[3.2vw] text-primary font-heading font-normal leading-tight -mt-2">
                            {post.title}
                        </h1>

                        {post.image?.name && (
                            <div className="relative w-full aspect-3/2 sm:aspect-16/10 overflow-hidden border-2 border-secondary/50 rounded-2xl bg-primary-dark/10 group flex items-center justify-center">
                                <Image
                                    src={staticUrl(post.image.name)}
                                    alt={post.title}
                                    fill
                                    sizes="100vw"
                                    priority
                                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                                />
                            </div>
                        )}

                        <div
                            className="blog-content text-sm sm:text-base lg:text-[1.1vw] text-primary/80 font-primary font-light leading-relaxed [&_h5]:font-heading [&_h5]:text-primary [&_h5]:text-xl [&_h5]:mt-6 [&_h6]:font-semibold [&_h6]:text-primary [&_h6]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_p]:mt-3 [&_a]:underline"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </article>
                )}
            </div>
        </main>
    );
}
