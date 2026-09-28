import Image from 'next/image';
import React from 'react';

const EventsHero = () => {
    return (
        <section className="relative w-full h-screen overflow-hidden select-none">
            <Image
                src="/images/event-hero.png"
                alt="GVEDA Events"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-primary/20 pointer-events-none" />
        </section>
    );
};

export default EventsHero;