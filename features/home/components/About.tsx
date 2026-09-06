import Title from "@/shared/ui/Title";
import ScrollReveal from "@/shared/ui/ScrollTextReveal";
import React from "react";

const About = () => {
  return (
    <section className="w-full pt-20 sm:pt-28 lg:pt-[6vw] pb-12 sm:pb-16 lg:pb-[4vw] px-4 sm:px-6 lg:px-8 bg-warm-ivory">
      <div className="max-w-4xl mx-auto">
        <Title
          eyebrow="Our Story"
          title="About GVEDA"
          className="mb-8 sm:mb-12 lg:mb-[2.5vw]"
        />
        <ScrollReveal
          baseRotation={0}
          enableBlur={false}
          baseOpacity={0.2}
          wordAnimationEnd="bottom 65%"
          containerClassName="!my-0"
          textClassName="font-primary text-xl lg:text-xl! leading-[1.65] text-primary text-center font-normal"
        >
          {
            "At GVEDA, we believe in combining nature's best ingredients with scientific innovation to create products that improve your health, beauty, and lifestyle. Our product range is designed to meet the diverse needs of both men and women, offering premium skincare, wellness supplements, grooming essentials, and cosmetics. GVEDA is proudly owned by Global Victors, a company committed to providing top-quality products that enhance well-being and personal care. Under the GVEDA umbrella, we have developed four distinct brands designed to meet a wide range of needs:"
          }
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;
