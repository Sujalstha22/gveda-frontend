"use client";
import CarouselHero from "@/features/home/components/CarouselHero";
import ZoomAnimation from "@/features/home/components/ZoomAnimation";
import Faq from "@/features/home/components/Faq";
import Testimonial from "@/features/home/components/Testimonial";
import About from "@/features/home/components/About";
import FeaturedV2 from "@/features/home/components/FeaturedV2";
import CategoryProductv2 from "@/features/home/components/CategoryProductv2";
import Ingredientsv2 from "@/features/home/components/Ingredientsv2";

// import OurStory from "@/features/home/components/OurStory";
// import VideoAnimation from "@/features/home/components/VideoAnimation";

export default function Home() {
  return (
    <div>
      <CarouselHero />
      {/* <Herov2 /> */}
      {/* <Ingredients /> */}
      <About />
      <Ingredientsv2 />
      {/* <CategoryProduct /> */}
      <CategoryProductv2 />
      {/* <CategoryProductv3 /> */}
      {/* <ParallaxDivider /> */}
      {/* <Intro /> */}
      {/* <Featured /> */}
      <ZoomAnimation />
      <FeaturedV2 />
      {/* <Ingredients /> */}
      {/* <VideoAnimation /> */}
      <Faq />
      <Testimonial />
    </div>
  );
}
