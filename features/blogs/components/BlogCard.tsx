'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { staticUrl } from '@/shared/api';
import type { BlogListItem } from '../interface';

export interface BlogCardProps {
    post: BlogListItem;
    className?: string;
    sizes?: string;
}

const stripHtml = (html: string) =>
    html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

const formatDate = (iso?: string) =>
    iso
        ? new Date(iso).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
          })
        : '';

export default function BlogCard({
    post,
    className = '',
    sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: BlogCardProps) {
    const blogHref = `/blog/${post.slug}`;
    const img = staticUrl(post.image?.name) || '/images/product/product11.jpeg';
    const excerpt = post.content ? stripHtml(post.content).slice(0, 130) : '';

    return (
        <div
            className={`min-w-0 group relative flex flex-col justify-between bg-white border border-[#E5E5E5] transition-all duration-500 hover:border-black/40 h-full ${className}`}
        >
            {/* Image Section: Full width and height, no padding */}
            <div className="relative w-full aspect-[4/4.8] sm:aspect-[4/5] bg-neutral-100 overflow-hidden block">
                <Link
                    href={blogHref}
                    className="relative w-full h-full flex items-center justify-center overflow-hidden"
                    aria-label={`Read ${post.title}`}
                >
                    <Image
                        src={img}
                        alt={post.title}
                        fill
                        sizes={sizes}
                        className="object-cover object-center w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                </Link>

                {/* Full Card Width Button Overlay with Slow & Controlled Fade-in */}
                <Link
                    href={blogHref}
                    className="absolute bottom-0 inset-x-0 w-full py-3.5 px-4 bg-rich-black backdrop-blur-md border-t border-white/20 text-white flex items-center justify-center gap-2 text-[11px] sm:text-xs font-medium tracking-[0.18em] uppercase transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 cursor-pointer z-10 shadow-xs"
                >
                    <span>Read Article</span>
                    <svg
                        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </Link>
            </div>

            {/* Thin Horizontal Divider */}
            <div className="w-full border-t border-[#EAEAEA]" />

            {/* Blog Details: Date, Title & Excerpt */}
            <div className="w-full flex flex-col items-center text-center pt-5 pb-6 sm:pt-6 sm:pb-7 px-4 sm:px-6">
                {post.createdAt && (
                    <span className="font-primary text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-primary/60 font-medium mb-1.5">
                        {formatDate(post.createdAt)}
                    </span>
                )}

                <Link
                    href={blogHref}
                    className="font-heading text-base sm:text-lg font-semibold text-rich-black hover:text-botanical-gold transition-colors duration-200 leading-snug line-clamp-2"
                >
                    {post.title}
                </Link>

                {excerpt && (
                    <p className="font-primary text-xs sm:text-[13px] font-normal text-neutral-500 leading-relaxed mt-2 max-w-[280px] line-clamp-2 min-h-[36px]">
                        {excerpt}…
                    </p>
                )}
            </div>
        </div>
    );
}
