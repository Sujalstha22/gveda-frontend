'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/shared/ui/Button";
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
        <section className="w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 select-none">
            <div className="w-full max-w-4xl mx-auto text-center mb-12 sm:mb-16">
                <span className="font-editorial italic text-2xl sm:text-3xl text-accent-gold font-normal mb-1">
                    Botanical Journal
                </span>
                <h1 className="text-4xl sm:text-5xl text-primary font-medium">
                    Stories & Insights
                </h1>
                <p className="font-primary font-normal text-sm sm:text-base text-primary/75 max-w-xl mx-auto mt-3 sm:mt-4 leading-relaxed">
                    Stay updated with the latest news, daily rituals, and botanical science insights from GVEDA.
                </p>
            </div>

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
                    {posts.map((post) => {
                        const img = staticUrl(post.image?.name) || "/images/product/product11.jpeg";
                        const excerpt = stripHtml(post.content).slice(0, 140);
                        return (
                            <div
                                key={post._id}
                                className="flex flex-col border border-secondary/50 rounded-2xl overflow-hidden bg-primary-dark/10 group transition-all duration-300 hover:-translate-y-1 hover:border-secondary"
                            >
                                <div className="relative aspect-4/3 sm:aspect-16/10 w-full overflow-hidden border-b border-secondary/20 flex items-center justify-center">
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

                                <div className="p-6 sm:p-7 flex flex-col justify-between grow gap-5">
                                    <div className="flex flex-col gap-2.5">
                                        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-primary/70 font-medium">
                                            Journal
                                        </span>

                                        <Link href={`/blog/${post.slug}`}>
                                            <h3 className="font-heading text-lg sm:text-xl lg:text-[1.25vw] font-medium text-primary line-clamp-2 hover:text-accent-gold transition-colors cursor-pointer leading-snug">
                                                {post.title}
                                            </h3>
                                        </Link>

                                        <p className="text-xs sm:text-sm text-primary/75 font-primary font-light line-clamp-2 leading-relaxed">
                                            {excerpt}…
                                        </p>
                                    </div>

                                    <div className="pt-3 flex items-center justify-between gap-3 border-t border-secondary/20">
                                        <Link href={`/blog/${post.slug}`} className="w-auto">
                                            <Button size="sm" className="w-auto cursor-pointer">
                                                Read More
                                            </Button>
                                        </Link>

                                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-primary/70 font-primary">
                                            <svg
                                                className="w-4 h-4 text-primary/60 shrink-0"
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
