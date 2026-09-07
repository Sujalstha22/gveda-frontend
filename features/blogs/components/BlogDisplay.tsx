'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/shared/ui/Button";
import Title from "@/shared/ui/Title";
import { useBlogs } from "../hooks";
import { staticUrl } from "@/shared/api";

const stripHtml = (html: string) =>
    html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

const BlogDisplay: React.FC = () => {
    const { data, isLoading, isError, refetch } = useBlogs();
    const posts = data?.results ?? [];

    return (
        <section
            aria-label="Blog Articles"
            className="relative w-full py-16 sm:py-20 lg:py-[5vw] px-4 sm:px-8 lg:px-[5vw] select-none"
        >
            <Title
                eyebrow="Botanical Journal"
                title="Stories & Insights"
                description="Stay updated with the latest news, daily rituals, and botanical science insights from GVEDA."
                className="mb-12 sm:mb-16 lg:mb-[3.5vw] max-w-4xl"
            />

            {isLoading ? (
                <p className="text-center py-16 font-primary text-primary/50 text-sm">Loading articles…</p>
            ) : isError ? (
                <div className="text-center py-16">
                    <p className="font-primary text-primary/60 text-sm mb-4">Couldn&apos;t load articles.</p>
                    <button
                        type="button"
                        onClick={() => refetch()}
                        className="px-5 py-2 text-xs uppercase tracking-wider font-medium text-primary border border-black/20 rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    >
                        Try again
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-[2.5vw]">
                    {posts.map((post) => {
                        const img = staticUrl(post.image?.name) || "/images/product/product11.jpeg";
                        const excerpt = stripHtml(post.content).slice(0, 140);
                        return (
                            <div
                                key={post._id}
                                className="flex flex-col bg-secondary/10 rounded-2xl lg:rounded-[1vw] overflow-hidden border border-secondary/20 group transition-all duration-300 hover:-translate-y-1 hover:border-secondary/50 shadow-2xs"
                            >
                                <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-16/10.5 w-full overflow-hidden border-b border-secondary/20 flex items-center justify-center">
                                    <Link href={`/blog/${post.slug}`} className="block w-full h-full">
                                        <Image
                                            src={img}
                                            alt={post.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                    </Link>
                                </div>

                                <div className="p-5 sm:p-6 lg:p-[1.4vw] flex flex-col justify-between grow gap-4 sm:gap-5 lg:gap-[1.2vw]">
                                    <div className="flex flex-col gap-2 sm:gap-2.5 lg:gap-[0.6vw]">
                                        <span className="text-[10px] sm:text-xs lg:text-[0.7vw] uppercase tracking-widest text-primary/70 font-medium">
                                            Journal
                                        </span>

                                        <Link href={`/blog/${post.slug}`}>
                                            <h3 className="font-antessa text-lg sm:text-xl lg:text-[1.15vw] font-medium text-primary line-clamp-2 hover:text-accent-gold transition-colors cursor-pointer leading-snug">
                                                {post.title}
                                            </h3>
                                        </Link>

                                        <p className="text-xs sm:text-sm lg:text-[0.82vw] text-primary/75 font-primary font-light line-clamp-2 leading-relaxed">
                                            {excerpt}…
                                        </p>
                                    </div>

                                    <div className="pt-3.5 lg:pt-[0.9vw] flex items-center justify-between gap-3 border-t border-secondary/20">
                                        <div className="flex items-center gap-1.5 lg:gap-[0.35vw] text-xs sm:text-sm lg:text-[0.75vw] text-primary/70 font-primary">
                                            <svg
                                                className="w-4 h-4 lg:w-[0.9vw] lg:h-[0.9vw] text-primary/60 shrink-0"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            <span>{formatDate(post.createdAt)}</span>
                                        </div>

                                        <Link href={`/blog/${post.slug}`} className="w-auto">
                                            <Button size="sm" className="w-auto cursor-pointer">
                                                Read More
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default BlogDisplay;
