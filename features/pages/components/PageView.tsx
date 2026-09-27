'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, FileText, ArrowUpRight } from 'lucide-react';
import { usePage } from '../hooks';

const POLICY_LINKS = [
    { slug: 'company-policy', label: 'Company Policy' },
    { slug: 'associate-policy', label: 'Associate Policy' },
    { slug: 'privacy-policy', label: 'Privacy Policy' },
    { slug: 'shipping-policy', label: 'Shipping Policy' },
    { slug: 'terms-and-conditions', label: 'Terms & Conditions' },
    { slug: 'cancellation-exchange-and-refund-policy', label: 'Exchange & Refund Policy' },
    { slug: 'global-victors-code-of-ethics-and-conduct', label: 'Code of Ethics & Conduct' },
];

const formatDate = (iso?: string) => {
    if (!iso) return null;
    try {
        return new Date(iso).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch {
        return null;
    }
};

const getReadingTime = (htmlContent?: string) => {
    if (!htmlContent) return '2 min read';
    const text = htmlContent.replace(/<[^>]+>/g, ' ');
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
};

export default function PageView({ slug }: { slug: string }) {
    const { data, isLoading, isError, refetch } = usePage(slug);
    const page = data?.results;

    const formattedDate = formatDate(page?.createdAt);
    const readingTime = getReadingTime(page?.content);

    return (
        <main className="w-full min-h-screen bg-warm-ivory text-primary pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 md:px-8 flex flex-col items-center select-text">
            <div className="w-full max-w-3xl mx-auto flex flex-col">
                {/* ── Breadcrumb & Back Navigation ── */}
                <div className="flex items-center justify-between gap-4 mb-8 sm:mb-10">
                    <Link
                        href="/policies"
                        className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-muted hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-muted group-hover:text-primary" />
                        <span>All Policies</span>
                    </Link>

                </div>

                {/* ── Loading Skeleton ── */}
                {isLoading ? (
                    <div className="animate-pulse flex flex-col gap-6 py-6" aria-label="Loading page content">
                        <div className="w-32 h-4 bg-black/5 rounded-full" />
                        <div className="space-y-3">
                            <div className="w-3/4 h-10 bg-black/5 rounded-lg" />
                            <div className="w-1/2 h-10 bg-black/5 rounded-lg" />
                        </div>
                        <div className="flex gap-4 pt-2">
                            <div className="w-28 h-4 bg-black/5 rounded" />
                            <div className="w-20 h-4 bg-black/5 rounded" />
                        </div>
                        <div className="w-full h-px bg-border/50 my-4" />
                        <div className="space-y-4 pt-4">
                            <div className="w-full h-4 bg-black/5 rounded" />
                            <div className="w-full h-4 bg-black/5 rounded" />
                            <div className="w-5/6 h-4 bg-black/5 rounded" />
                            <div className="w-4/6 h-4 bg-black/5 rounded" />
                        </div>
                        <div className="space-y-4 pt-6">
                            <div className="w-2/5 h-6 bg-black/5 rounded" />
                            <div className="w-full h-4 bg-black/5 rounded" />
                            <div className="w-full h-4 bg-black/5 rounded" />
                            <div className="w-3/4 h-4 bg-black/5 rounded" />
                        </div>
                    </div>
                ) : isError || !page ? (
                    /* ── Error / Not Found State ── */
                    <div className="w-full py-16 sm:py-24 px-6 sm:px-12 bg-soft-white rounded-2xl border border-border/70 text-center flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-warm-ivory border border-border flex items-center justify-center mb-5 text-muted">
                            <FileText className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-heading font-medium text-primary mb-3">
                            Document Unavailable
                        </h2>
                        <p className="text-sm sm:text-base text-muted max-w-md mx-auto mb-8 font-primary font-normal leading-relaxed">
                            The requested policy or document could not be found. It may have been updated, relocated, or temporarily removed.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => refetch()}
                                className="px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-medium text-primary border border-border rounded-full hover:bg-warm-ivory transition-colors cursor-pointer"
                            >
                                Retry
                            </button>
                            <Link
                                href="/policies"
                                className="px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-medium bg-primary text-warm-ivory rounded-full hover:bg-primary/90 transition-colors"
                            >
                                Browse All Policies
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* ── Editorial Page Article ── */
                    <article className="flex flex-col">
                        {/* Header */}
                        <header className="flex flex-col mb-8 sm:mb-10">
                            {page.title && (
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-tight text-primary leading-[1.15] text-balance mb-6">
                                    {page.title}
                                </h1>
                            )}

                            {/* Meta Info Bar */}
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted font-normal pb-6 border-b border-border/60">
                                {formattedDate && (
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5 text-secondary shrink-0" strokeWidth={1.8} />
                                        <span>Last Updated: {formattedDate}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1.5">
                                    <FileText className="w-3.5 h-3.5 text-muted/70 shrink-0" strokeWidth={1.8} />
                                    <span>{readingTime}</span>
                                </div>
                                <span className="hidden sm:inline text-border font-light">•</span>
                                <span className="text-muted/80 tracking-wide font-light hidden sm:inline">
                                    Botanical Science for Modern Skin
                                </span>
                            </div>
                        </header>

                        {/* Rich Text Body Content */}
                        <div
                            className="
                                prose-gveda w-full
                                font-primary font-normal text-[15px] sm:text-base leading-[1.85] text-primary/85
                                /* Headings */
                                [&_h1]:font-heading [&_h1]:font-semibold [&_h1]:text-2xl sm:[&_h1]:text-3xl [&_h1]:text-primary [&_h1]:tracking-tight [&_h1]:mt-10 [&_h1]:mb-4
                                [&_h2]:font-heading [&_h2]:font-medium [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:text-primary [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:pt-6 [&_h2]:border-t [&_h2]:border-border/60
                                [&_h3]:font-heading [&_h3]:font-medium [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:text-primary [&_h3]:tracking-tight [&_h3]:mt-8 [&_h3]:mb-3
                                [&_h4]:font-heading [&_h4]:font-medium [&_h4]:text-base sm:[&_h4]:text-lg [&_h4]:text-primary [&_h4]:mt-6 [&_h4]:mb-2
                                [&_h5]:font-heading [&_h5]:font-medium [&_h5]:text-sm sm:[&_h5]:text-base [&_h5]:text-primary [&_h5]:mt-6 [&_h5]:mb-2
                                [&_h6]:font-heading [&_h6]:font-medium [&_h6]:text-xs sm:[&_h6]:text-sm [&_h6]:uppercase [&_h6]:tracking-wider [&_h6]:text-muted [&_h6]:mt-5 [&_h6]:mb-2
                                /* Paragraphs */
                                [&_p]:mb-5 [&_p]:leading-[1.85] [&_p]:text-primary/85
                                /* Emphasis & strong */
                                [&_strong]:font-semibold [&_strong]:text-primary
                                [&_b]:font-semibold [&_b]:text-primary
                                [&_em]:italic [&_em]:text-primary/90
                                /* Links */
                                [&_a]:text-primary [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-secondary/50 hover:[&_a]:decoration-secondary hover:[&_a]:text-secondary [&_a]:transition-colors
                                /* Lists */
                                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2.5 [&_ul]:text-primary/85
                                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2.5 [&_ol]:text-primary/85
                                [&_li]:pl-1 [&_li]:leading-[1.75]
                                /* Blockquotes */
                                [&_blockquote]:border-l-2 [&_blockquote]:border-secondary [&_blockquote]:bg-soft-white [&_blockquote]:px-6 [&_blockquote]:py-4 [&_blockquote]:my-6 [&_blockquote]:rounded-r-md [&_blockquote]:text-primary/80 [&_blockquote]:italic
                                /* Tables */
                                [&_table]:w-full [&_table]:my-8 [&_table]:border-collapse [&_table]:text-sm [&_table]:bg-soft-white [&_table]:rounded-lg [&_table]:overflow-hidden [&_table]:border [&_table]:border-border/60
                                [&_th]:bg-warm-ivory [&_th]:border-b [&_th]:border-border [&_th]:py-3.5 [&_th]:px-4 [&_th]:text-left [&_th]:font-heading [&_th]:font-medium [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-primary
                                [&_td]:border-b [&_td]:border-border/40 [&_td]:py-3.5 [&_td]:px-4 [&_td]:text-primary/80
                                /* Dividers */
                                [&_hr]:my-10 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-border/70
                                /* Code */
                                [&_code]:bg-soft-white [&_code]:border [&_code]:border-border/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono [&_code]:text-primary
                            "
                            dangerouslySetInnerHTML={{ __html: page.content }}
                        />

                        {/* ── Client Care Assistance Card ── */}
                        <div className="mt-16 pt-8 border-t border-border/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-soft-white p-6 sm:p-8 rounded-2xl border border-border/50">
                            <div className="flex flex-col gap-1.5">
                                <h3 className="font-heading font-medium text-base text-primary">
                                    Questions Regarding Our Policies?
                                </h3>
                                <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-md font-primary font-normal">
                                    Our concierge team is at your disposal to clarify institutional terms, exchange protocols, or botanical ingredient specifications.
                                </p>
                            </div>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-medium uppercase tracking-[0.15em] bg-primary text-warm-ivory hover:bg-primary/90 transition-all shrink-0 cursor-pointer"
                            >
                                Contact Concierge
                            </Link>
                        </div>

                        {/* ── Related Policies Navigation ── */}
                        <nav aria-label="Related policies" className="mt-12 flex flex-col gap-4">
                            <span className="text-[11px] uppercase tracking-[0.2em] text-muted font-medium">
                                Related Institutional Policies
                            </span>
                            <div className="flex flex-wrap gap-2.5">
                                {POLICY_LINKS.filter((p) => p.slug !== slug).map((item) => (
                                    <Link
                                        key={item.slug}
                                        href={`/policies/${item.slug}`}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-soft-white border border-border text-primary/75 hover:text-primary hover:border-secondary transition-all"
                                    >
                                        <span>{item.label}</span>
                                        <ArrowUpRight className="w-3 h-3 text-secondary" strokeWidth={2} />
                                    </Link>
                                ))}
                            </div>
                        </nav>
                    </article>
                )}
            </div>
        </main>
    );
}
