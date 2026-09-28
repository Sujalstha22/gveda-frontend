
import Image from 'next/image'
import React from 'react'

const GalleryHero = () => {
    return (
        <div>
            <section className="relative w-full h-screen overflow-hidden select-none">
                <Image
                    src="/images/gallery-hero.png"
                    alt="GVEDA gallery"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-primary/20 pointer-events-none" />
            </section></div>
    )
}

export default GalleryHero