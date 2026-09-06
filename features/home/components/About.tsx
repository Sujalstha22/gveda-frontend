import ScrollReveal from '@/shared/ui/ScrollTextReveal'
import React from 'react'

const About = () => {
    return (
        <div className='max-w-4xl mx-auto pt-24'>
            <ScrollReveal
                baseRotation={0}
                enableBlur={false}
                baseOpacity={0.2}
                wordAnimationEnd="bottom 65%"
                containerClassName="!my-0"
                textClassName="font-primary text-xl lg:text-xl! leading-[1.65] text-primary text-center font-normal"
            >
                {"At GVEDA, we believe in combining nature's best ingredients with scientific innovation to create products that improve your health, beauty, and lifestyle. Our product range is designed to meet the diverse needs of both men and women, offering premium skincare, wellness supplements, grooming essentials, and cosmetics. GVEDA is proudly owned by Global Victors, a company committed to providing top-quality products that enhance well-being and personal care. Under the GVEDA umbrella, we have developed four distinct brands designed to meet a wide range of needs:"}
            </ScrollReveal>
        </div>
    )
}

export default About