// import Image from 'next/image'
import React from 'react'

const AboutHero = () => {
    return (
        <section
            className="relative w-full h-screen  flex flex-col justify-end overflow-hidden select-none "
        >
            <div className="absolute inset-0 z-0">
                {/* <Image
                    src="/images/about/gveda-main-img.jpeg"
                    alt="Radiant, glowing skin - GVEDA botanical science"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-top "
                /> */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="object-cover w-full h-full object-center"
                >
                    <source src="/videos/gveda-hero-3.mp4" type="video/mp4" />
                </video>

                {/* 
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,transparent_40%,rgba(0,0,0,0.5)_100%)] pointer-events-none"
                /> */}
            </div>
        </section>
    )
}

export default AboutHero