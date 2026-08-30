import Hero from "@/features/home/components/Hero";
import Intro from "@/features/home/components/intro";
import Featured from "@/features/home/components/Featured";
import ZoomAnimation from "@/features/home/components/ZoomAnimation";
import Ingredients from "@/features/home/components/Ingredients";
import Faq from "@/features/home/components/Faq";
import Testimonial from "@/features/home/components/Testimonial";
// import OurStory from "@/features/home/components/OurStory";
// import VideoAnimation from "@/features/home/components/VideoAnimation";

export default function Home() {
  return (
    <div>
      <Hero />
      <Intro />
      <Featured />
      <ZoomAnimation />
      <Ingredients />
      {/* <VideoAnimation /> */}
      <Faq />
      <Testimonial />
    </div>
  );
}
