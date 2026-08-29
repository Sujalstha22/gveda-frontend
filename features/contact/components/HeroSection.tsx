import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative w-full h-dvh ">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/contact/gveda-c-2.jpeg"
          alt="hero image"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* <div className="absolute inset-0 w-full h-full bg-black/50" /> */}
        {/* <div className="md:hidden absolute inset-0 w-full h-full bg-linear-to-t from-black/70 via-transparent to-transparent" /> */}
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-end md:justify-center text-center p-x pb-8 xl:pb-0 pl-150">
        <h1 className="text-4xl md:text-6xl xl:text-[3vw] text-foreground mb-4 xl:mb-6 tracking-tight uppercase">
          Let′s Speak of Radiance
        </h1>
        <p className="max-w-xl xl:max-w-[30vw] text-lg md:text-xl xl:text-[1vw] text-foreground/90 font-medium leading-relaxed">
          Your skincare journey is unique. Whether you seek product guidance or
          want to share your experience, we are here to support your daily
          ritual.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
