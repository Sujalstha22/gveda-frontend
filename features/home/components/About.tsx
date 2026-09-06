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
                textClassName="font-primary text-xl lg:text-xl! leading-[1.65] text-priamry text-center font-semibold"
            >
                {"I grew up in a children's home. Despite that, I was given something that changed everything, a good education. But while I had an education, I didn't have someone who stayed: no family, no adult to guide me or be there as I navigated the hard parts. Every child deserves someone who stays, who is still there when life gets difficult."}
            </ScrollReveal>
        </div>
    )
}

export default About