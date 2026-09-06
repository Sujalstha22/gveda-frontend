import ContactForm from "@/features/contact/components/ContactForm";
import ContactLink from "@/features/contact/components/ContactLink";
import HeroSection from "@/features/contact/components/HeroSection";

export default function Home() {
  return (
    <div>
      <HeroSection />

      <ContactForm />
      <ContactLink />
      {/* <SocialLink /> */}
    </div>
  );
}
