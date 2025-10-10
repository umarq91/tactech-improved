"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { HeroSection } from "@/components/sections/hero-section";

const Menu = dynamic(() => import("@/components/custom/menu"), {
  ssr: false,
});

const HorizontalServices = dynamic(
  () =>
    import("@/components/HorizontalShowcase").then(
      (mod) => mod.HorizontalServices
    ),
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
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // 🕒 Delay hydration to prevent blocking hero animation
    const timer = setTimeout(() => setShowMenu(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden">
      {showMenu && <Menu />} {/* Delayed mount */}
      <HeroSection />
      <HorizontalServices />
      <ProjectGsap showmore={true} />
      <ContactSection />
    </div>
  );
}
