import Hero from "@/features/home/components/Hero";
import Intro from "@/features/home/components/intro";
import OurStory from "@/features/home/components/OurStory";
import Featured from "@/features/home/components/Featured";
import Ingredients from "@/features/home/components/Ingredients";
import Testimonial from "@/features/home/components/Testimonial";
import Faq from "@/features/home/components/Faq";
import ScrollReveal from "@/features/home/components/ScrollReveal";
// import VideoAnimation from "@/features/home/components/VideoAnimation";

export default function Home() {
  return (
    <div>
      <Hero />
      <Intro />
      <Featured />
      <OurStory />
      <ScrollReveal />
      <Ingredients />
      {/* <VideoAnimation /> */}
      <Faq />
      <Testimonial />
    </div>
  );
}
