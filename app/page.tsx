"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero-section";
import Menu from "@/components/custom/menu";

const HorizontalServices = dynamic(
  () => import("@/components/HorizontalShowcase").then((mod) => mod.HorizontalServices),
  { ssr: false, loading: () => <div className="h-[300px]" /> }
);


const ProjectGsap = dynamic(() => import("@/components/projectsgsap"), {
  ssr: false,
  loading: () => <div className="h-[400px]" />,
});

const ContactSection = dynamic(
  () =>
    import("@/components/sections/contact-section").then(
      (mod) => mod.ContactSection
    ),
  { ssr: false, loading: () => <div className="h-[300px]" /> }
);

export default function Home() {
  return (
    <div className="relative w-full overflow-x-hidden">
      <HeroSection />
      <HorizontalServices />
      <ProjectGsap showmore={true} />
      <ContactSection />
    </div>
  );
}
