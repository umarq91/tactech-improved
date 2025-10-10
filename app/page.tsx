import { HeroSection } from "@/components/sections/hero-section";
import { ContactSection } from "@/components/sections/contact-section";
import ProjectGsap from "@/components/projectsgsap";
import { HorizontalServices } from "@/components/HorizontalShowcase";

export default function Home() {
  return (
    <div className="relative w-full overflow-x-hidden">
      <HeroSection />

      <HorizontalServices />
      <ProjectGsap showmore={true} />
      {/* <ServicesSection /> */}
      <ContactSection />
    </div>
  );
}
