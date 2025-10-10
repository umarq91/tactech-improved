import { services } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { X } from "lucide-react";
import { useRef, useEffect } from "react";
import { Button } from "../ui/button";

export default function ServiceModal({
  service,
  onClose,
}: {
  service: (typeof services)[0];
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(".modal-content > *", { y: 20, opacity: 0 });
      gsap.set(".modal-close-btn", { y: -20, opacity: 0 });

      gsap
        .timeline()
        .to(modalRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.8,
          ease: "expo.inOut",
        })
        .to(
          ".modal-content > *",
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .to(
          ".modal-close-btn",
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.4"
        );
    },
    { scope: modalRef }
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    gsap
      .timeline()
      .to(".modal-content > *", {
        y: 20,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
      })
      .to(
        ".modal-close-btn",
        {
          y: -20,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.2"
      )
      .to(modalRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.6,
        ease: "expo.in",
        onComplete: onClose,
      });
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[9999] dark:bg-gray-200 bg-zinc-900 backdrop-blur-md dark:text-black text-white flex items-center justify-center"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
    >
      <button
        onClick={handleClose}
        className="bg-white text-black dark:bg-black dark:text-white fixed top-4 right-4 p-1 rounded-full hover:bg-zinc-800 hover:text-white transition-colors z-[1000]"
        aria-label="Close modal"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="w-full h-full max-w-7xl max-h-[calc(100vh-2rem)] overflow-y-auto dark:bg-gray-200 bg-zinc-900 rounded-xl p-4 md:p-8 lg:p-10 m-4">
        <div ref={contentRef} className="modal-content">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8 md:mb-12">
            <div
              className={cn(
                "w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center bg-gradient-to-r",
                service.color
              )}
            >
              {service.icon}
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold">
                {service.title}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                {service.description}
              </p>
            </div>
          </div>

          {/* Overview */}
          <section className="mb-8 md:mb-12">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">
              Overview
            </h3>
            <p className="text-base md:text-lg leading-relaxed">
              {service.details.overview}
            </p>
          </section>

          {/* Features */}
          <section className="mb-8 md:mb-12">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">
              Key Features
            </h3>
            <ul className="grid md:grid-cols-2 gap-3 md:gap-4">
              {service.details.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-primary" />
                  <span className="text-base md:text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Technologies */}
          <section className="mb-8 md:mb-12">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">
              Technologies We Use
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.details.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-muted text-foreground text-sm md:text-base"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-8 md:mb-12">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">
              Business Benefits
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {service.details.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-3 md:p-4 rounded-lg bg-muted/30 border border-muted-foreground/20"
                >
                  <h4 className="font-medium text-sm md:text-base mb-1 md:mb-2">
                    {benefit}
                  </h4>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
