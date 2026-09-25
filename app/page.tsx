"use client";
import CarouselHero from "@/features/home/components/CarouselHero";
import Intro from "@/features/home/components/intro";
import Featured from "@/features/home/components/Featured";
import ZoomAnimation from "@/features/home/components/ZoomAnimation";
import Ingredients from "@/features/home/components/Ingredients";
import CategoryProduct from "@/features/home/components/categoryproduct";
import Faq from "@/features/home/components/Faq";
import Testimonial from "@/features/home/components/Testimonial";
import About from "@/features/home/components/About";
import FeaturedV2 from "@/features/home/components/FeaturedV2";
import CategoryProductv2 from "@/features/home/components/CategoryProductv2";
import ParallaxDivider from "@/features/home/components/ParallaxDivider";
import Herov2 from "@/features/home/components/Herov2";
import CategoryProductv3 from "@/features/home/components/categroyProductv3";
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
