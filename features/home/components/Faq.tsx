'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Title from '@/shared/ui/Title';

interface FaqItem {
    id: number;
    question: string;
    answer: string;
}

const FAQ_DATA: FaqItem[] = [
    {
        id: 1,
        question: 'What makes GVEDA formulations unique?',
        answer:
            'GVEDA pairs time-tested Ayurvedic botanicals—such as Bhringraj, Neem, Aloe Vera, and Shea Butter—with modern dermatological science including Niacinamide, Retinol 50 C, and Hydrolyzed Keratin. Every formula is bio-compatible and crafted to nourish, protect, and restore your natural barrier.',
    },
    {
        id: 2,
        question: 'Are GVEDA products suitable for sensitive skin?',
        answer:
            'Yes. All GVEDA formulations are dermatologically tested, pH-balanced, and strictly free from parabens, sulfates, toxic fillers, and harsh synthetic additives. We prioritize soothing botanical actives that calm inflammation and support delicate skin.',
    },
    {
        id: 3,
        question: 'How do I build a daily ritual with GVEDA?',
        answer:
            'We recommend a simple, mindful sequence: begin with our Niacinamide Face Wash for a purifying cleanse, mist with Retinol C Face Toner to tone and refine, and lock in moisture with our Shea Butter Body Lotion. For hair, complement with our Keratin Shampoo and Nourishing Conditioner.',
    },
    {
        id: 4,
        question: 'Are your botanical ingredients sustainably sourced and cruelty-free?',
        answer:
            'Absolutely. We never test on animals and exclusively partner with ethical, pesticide-free farms. Our botanicals are harvested with sustainable practices to protect local ecosystems and cold-extracted to preserve their natural bioactive vitality.',
    },
    {
        id: 5,
        question: 'What is the shelf life and proper storage for your products?',
        answer:
            'Due to our clean formulation approach, unopened products have a shelf life of 24 months (12 months once opened). To preserve the raw potency of active botanicals, we recommend storing them in a cool, dry place away from direct sunlight.',
    },
];

export default function Faq() {
    // Default the first item open to match the clean editorial layout
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleItem = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section
            className="relative w-full py-16 sm:py-20 lg:py-[5vw] overflow-hidden select-none bg-warm-ivory"
        >
            <div className="w-full max-w-4xl lg:max-w-[58vw] mx-auto px-4 sm:px-8 lg:px-0">

                {/* ── Section Header ── */}
                <Title
                    eyebrow="Clarity & Care"
                    title="Know Your Formula"
                    description="Everything you need to know about our clean botanical formulations and daily wellness rituals."
                />

                {/* ── Accordion List ── */}
                <div className="flex flex-col gap-3.5 sm:gap-4 lg:gap-[0.8vw]">
                    {FAQ_DATA.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={item.id}
                                className="w-full bg-secondary/20 rounded-xl lg:rounded-[0.7vw] border border-secondary-dark/5 overflow-hidden transition-all duration-300 hover:border-black/10"
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleItem(index)}
                                    aria-expanded={isOpen}
                                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 lg:p-[1.2vw] text-left cursor-pointer transition-colors"
                                >
                                    <h3 className="font-primary font-medium text-base sm:text-lg lg:text-[1vw] lg:leading-snug text-primary pr-2">
                                        {item.question}
                                    </h3>

                                    {/* Chevron Button */}
                                    <div
                                        className="w-6 h-6 lg:w-[1.6vw] lg:h-[1.6vw] rounded-full bg-secondary/15 flex items-center justify-center shrink-0 text-primary/70 transition-colors"
                                        aria-hidden="true"
                                    >
                                        <motion.svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-3 h-3 lg:w-[0.75vw] lg:h-[0.75vw]"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                                        >
                                            <polyline points="6 9 12 15 18 9" />
                                        </motion.svg>
                                    </div>
                                </button>

                                {/* Accordion Content */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key={`content-${item.id}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <div className="px-5 pb-5 sm:px-6 sm:pb-6 lg:px-[1.2vw] lg:pb-[1.2vw] pt-0">
                                                <p className="font-primary font-normal text-xs sm:text-sm lg:text-[0.82vw] lg:leading-[1.65] text-primary/75 leading-relaxed border-t border-black/5 pt-3.5 lg:pt-[0.9vw]">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}