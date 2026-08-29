import React from 'react';

const Intro = () => {
    return (
        <section className="w-full pb-12 pt-20 sm:pt-28  px-6 sm:px-12 md:px-16 select-none bg-secondary/20">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                {/* ── Editorial Heading with subtle highlight box ── */}
                <h2 className="font-editorial  font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[3vw] text-primary ">
                    Welcome to{' '}
                    <span className="inline-block px-3 italic sm:px-4 py-0.5 sm:py-1  text-secondary font-editorial rounded-xs">
                        Gveda Botanical Science
                    </span>
                </h2>

                {/* ── Brand Copy ── */}
                <div className="flex flex-col gap-4 max-w-2xl sm:max-w-3xl mx-auto mt-6 sm:mt-8">
                    <p className="font-primary font-normal text-xs sm:text-sm md:text-base text-primary/75 leading-relaxed tracking-wide">
                        At Gveda, we unite sacred botanical wisdom with modern dermatological science to nourish, protect, and restore your skin and hair&apos;s natural vitality. Our pure, biocompatible formulations are thoughtfully crafted to deliver an exceptional, calming ritual for modern beauty.   Grounded in holistic wellness and clinical efficacy, every botanical active is ethically harvested and cold-pressed to preserve its living nutrients. We believe true luxury lies in simplicity—creating timeless rituals that nurture your skin barrier and reveal your enduring, luminous radiance.
                    </p>

                </div>
            </div>
        </section>
    );
};

export default Intro;