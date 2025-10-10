"use client";
import { useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { services } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import ServiceModal from "./custom/ServiceModal";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { Button } from "./ui/button";

export function HorizontalServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<
    (typeof services)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const openModal = (service: (typeof services)[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="relative overflow-hidden">
      <section
        ref={sectionRef}
        className="relative bg-background py-20 overflow-hidden max-w-[1600px] mx-auto"
      >
        {/* Futuristic background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-background/80 to-muted/20" />
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          </div>
        </div>

        {/* Header */}
        <div className="px-6 mb-12">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-primary mb-4">
              Our Expertise
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Comprehensive Digital Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We offer cutting-edge solutions to help your business thrive in
              the digital landscape.
            </p>
          </motion.div>
        </div>

        {/* Grid layout */}
        <div className="container px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                  },
                }}
              >
                <ServiceCard
                  service={service}
                  index={index}
                  onLearnMoreClick={() => openModal(service)}
                  isDesktop={isDesktop}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Animated Modal */}
        <AnimatePresence>
          {isModalOpen && selectedService && (
            <ServiceModal service={selectedService} onClose={closeModal} />
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

function ServiceCard({
  service,
  index,
  onLearnMoreClick,
  isDesktop,
}: {
  service: (typeof services)[0];
  index: number;
  onLearnMoreClick: () => void;
  isDesktop: boolean;
}) {
const colorMap: Record<string, string> = {
  "blue-indigo": "from-blue-500 to-indigo-500",
  "orange-red": "from-orange-500 to-red-500",
  "green-emerald": "from-green-500 to-emerald-500",
  "purple-violet": "from-purple-500 to-violet-500",
  "sky-indigo": "from-sky-500 to-indigo-500",
  "teal-green": "from-teal-500 to-green-500",
};

  return (
    <motion.div
      id="services"
      className="relative group rounded-3xl overflow-hidden w-full h-full card-border"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {/* Color overlay */}
      <div
        className={cn(
          "absolute inset-0 rounded-3xl overflow-hidden z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500",
          service.bgColor
        )}
      />

      {/* Glow effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500",
          service.bgColor
        )}
      />

      {/* Main card content */}
      <div className="relative z-10 h-full flex flex-col p-8 backdrop-blur-sm bg-background/80 border border-muted-foreground/20 rounded-3xl group-hover:bg-background/90 transition-all duration-500">
        {/* Icon with gradient */}
        <motion.div
          className={cn(
            "w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-r",
            colorMap[service.color]
          )}
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {service.icon}
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-3">{service.title}</h3>

        {/* Description */}
        <p className="text-muted-foreground mb-6">{service.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {service.details.features.map((feature, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs rounded-full bg-muted/50 text-muted-foreground"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Button */}
        <motion.div
          className="mt-auto"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button
            variant="ghost"
            className="p-0 h-auto group flex items-center text-sm transition-colors"
            onClick={onLearnMoreClick}
          >
            <span className="underline underline-offset-4 group-hover:no-underline">
              Learn more
            </span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
          </Button>
        </motion.div>

        {/* Hover indicator bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
