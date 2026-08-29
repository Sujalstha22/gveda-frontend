'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
            className="relative w-full py-20  overflow-hidden select-none bg-secondary/20"
        >
            <div className="w-full max-w-4xl mx-auto px-6 sm:px-10">

                <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
                    <span className="font-editorial italic text-2xl sm:text-3xl text-accent-gold font-normal mb-1">
                        Clarity & Care
                    </span>
                    <h2 className=" text-4xl sm:text-5xl  text-primary font-medium ">
                        Frequently Asked Questions
                    </h2>
                    <p className="font-primary font-normal text-sm sm:text-base text-primary/75 max-w-2xl mt-3 sm:mt-4 leading-relaxed">
                        Everything you need to know about our clean botanical formulations and daily wellness rituals.
                    </p>
                </div>

                {/* ── Accordion List ── */}
                <div className="flex flex-col gap-3.5 sm:gap-4">
                    {FAQ_DATA.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={item.id}
                                className="w-full bg-white/95 rounded-xl border border-black/5 overflow-hidden transition-all duration-300 hover:border-black/10"
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleItem(index)}
                                    aria-expanded={isOpen}
                                    className="w-full flex items-center justify-between gap-4 p-5  text-left cursor-pointer transition-colors"
                                >
                                    <h3 className="font-primary font-medium text-base text-primary pr-2">
                                        {item.question}
                                    </h3>

                                    {/* Chevron Button */}
                                    <div
                                        className="w-6 h-6 rounded-full bg-secondary/15 flex items-center justify-center shrink-0 text-primary/70 transition-colors"
                                        aria-hidden="true"
                                    >
                                        <motion.svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
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
                                            <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
                                                <p className="font-primary font-normal text-xs sm:text-sm  text-primary/75 leading-relaxed border-t border-black/5 pt-3.5">
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