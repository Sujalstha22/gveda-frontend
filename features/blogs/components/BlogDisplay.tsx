'use client';

import React from "react";
import Title from "@/shared/ui/Title";
import { useBlogs } from "../hooks";
import BlogCard from "./BlogCard";

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
                title="Stories and Insights"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-[2vw]">
                    {posts.map((post) => (
                        <BlogCard key={post._id} post={post} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default BlogDisplay;
