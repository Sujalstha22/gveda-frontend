import React from 'react';
import Image from 'next/image';

const BlogHero = () => {
    return (
        <section
            aria-label="Blog Journal Hero"
            className="relative w-full h-screen min-h-[450px] sm:min-h-[550px] lg:min-h-0 flex flex-col justify-end overflow-hidden select-none"
        >
            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src="/images/blogs/blog-gveda-3.jpeg"
                    alt="Botanical Journal - GVEDA"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 w-full h-full bg-linear-to-t from-background/40 to-transparent" />
            </div>

            {/* <div className="relative z-10 w-full flex flex-col items-center text-center px-4 sm:px-8 lg:px-[5vw] pb-12 sm:pb-16 lg:pb-[4vw]">
                <span className="font-editorial italic text-2xl sm:text-3xl lg:text-[1.8vw] lg:leading-[1.2] text-primary font-normal mb-1 lg:mb-[0.3vw]">
                    Botanical Journal
                </span>

                <h1 className="font-primary font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[3.2vw] lg:leading-[1.1] text-primary">
                    Stories & Insights
                </h1>

                <p className="font-primary font-normal text-sm sm:text-base lg:text-[0.95vw] lg:leading-[1.6] text-primary/75 w-full max-w-lg lg:max-w-[42vw] mt-3 sm:mt-4 lg:mt-[0.8vw] leading-relaxed">
                    Stay updated with the latest news, daily rituals, and botanical science insights from GVEDA.
                </p>
            </div> */}
        </section>
    );
};

export default BlogHero;