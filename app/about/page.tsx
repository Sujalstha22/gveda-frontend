import AboutHero from "@/features/about/components/AboutHero";
import Intro from "@/features/about/components/Intro";
import FoundersMessage from "@/features/about/components/FoundersMessage";
import HomeIntro from "@/features/home/components/intro";
import AboutHome from "@/features/about/components/AboutHome";
import WhyUs from "@/features/about/components/WhyUs";
import AboutIngredients from "@/features/about/components/AboutIngredients";
// import Values from "@/features/about/components/Values";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <Intro />
      <FoundersMessage />
      <HomeIntro />
      {/* <OurStory /> */}
      {/* <ZoomAnimation /> */}
      <AboutIngredients />
      <AboutHome />
      <WhyUs />
      {/* <Values /> */}
    </main>
  );
}
