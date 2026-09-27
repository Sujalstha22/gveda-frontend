import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      aria-label="Contact Us Hero"
      className="relative w-full h-screen min-h-[450px] sm:min-h-[550px] lg:min-h-0 flex flex-col justify-end overflow-hidden select-none"
    >
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/contact/contact-gveda-2.jpeg"
          alt="Contact GVEDA Hero"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 w-full h-full bg-linear-to-t from-background/40 to-transparent" />
      </div>

      {/* <div className="relative z-10 w-full flex flex-col items-center text-center px-4 sm:px-8 lg:px-[5vw] pb-12 sm:pb-16 lg:pb-[4vw]">
        <Title
          eyebrow="Let's Connect"
          title="We're Here for You"
          description="Have a question, need guidance, or simply want to say hello? Reach out to us, we’d love to hear from you."
          className="mb-0 max-w-lg lg:max-w-[44vw]"
        />
      </div> */}
    </section>
  );
};

export default HeroSection;
