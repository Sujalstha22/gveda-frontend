import Image from "next/image"

const ProductHero = () => {
    return (
        <div className='w-full h-svh overflow-y-visible relative flex justfy-center items-center'>

            <Image src="/images/product/gveda-products.jpeg" alt='products hero' fill className='object-cover object-top ' />
            {/* <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover object-center"
            >
                <source src="/videos/product-hero-video.mp4" type="video/mp4" />
            </video> */}

            {/* <div className='absolute w-full h-full z-50 top-0 left-0 bg-primary/30'></div> */}

            {/* <div className="w-full  relative z-20 flex flex-col gap-8 justify-center p-8 md:p-16  min-h-[60vh] md:min-h-screen">
                <div className="flex flex-col gap-4 mt-20 ml-16">
       

                    <h2 className="font-heading text-center text-4xl lg:text-[20vh] uppercase tracking-widest text-secondary/90">
                        Gveda <br />
                    </h2>
                </div>

            </div> */}

        </div>
    )
}

export default ProductHero