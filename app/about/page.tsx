import AboutHero from "@/features/about/components/AboutHero";
import Intro from "@/features/about/components/Intro";
import AboutHome from "@/features/about/components/AboutHome";
import WhyUs from "@/features/about/components/WhyUs";
import AboutIngredients from "@/features/about/components/AboutIngredients";
// import Values from "@/features/about/components/Values";
import ZoomAnimation from "@/features/home/components/ZoomAnimation";

export default function AboutPage() {
    return (
        <main>
            <AboutHero />
            <Intro />
            <ZoomAnimation />
            <AboutIngredients />
            <AboutHome />
            <WhyUs />
            {/* <Values /> */}
        </main>
    );
}
