import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { services } from "../lib/data";
import { ArrowRight } from "lucide-react";
import { useMediaQuery } from "./hooks/useMediaQuery";
import ServiceModal from "./custom/ServiceModal";

export const HorizontalServices: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const openModal = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-background"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-6 block">
              Core Capabilities
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter font-poppins mb-8">
              Strategic Engineering.
              <br />
              <span className="text-zinc-600">Enterprise Scale.</span>
            </h2>
            <p className="text-zinc-500 text-xl max-w-2xl leading-relaxed">
              We architect the infrastructure that allows market leaders to
              innovate at the speed of thought.
            </p>
          </motion.div>
        </div>

        {/* Grid layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              onClick={() => openModal(service)}
            />
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
  );
};

function ServiceCard({
  service,
  onClick,
}: {
  service: any;
  onClick: () => void;
}) {
  const colorMap: Record<string, string> = {
    "blue-indigo": "from-blue-500 to-indigo-500",
    "orange-red": "from-orange-500 to-red-500",
    "green-emerald": "from-green-500 to-emerald-500",
    "purple-violet": "from-purple-500 to-violet-500",
    "sky-indigo": "from-sky-500 to-indigo-500",
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        /* Changed 'power4.out' to 'easeOut' to comply with Framer Motion types */
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        },
      }}
      whileHover={{ y: -10 }}
      className="group relative h-full flex flex-col p-10 bg-zinc-900/40 border border-white/5 rounded-[2.5rem] backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-zinc-900/60 hover:border-white/20"
      onClick={onClick}
    >
      {/* Dynamic Background Glow */}
      <div
        className={`absolute -top-20 -right-20 w-64 h-64 opacity-0 group-hover:opacity-20 blur-3xl rounded-full bg-gradient-to-r ${colorMap[service.color]} transition-opacity duration-700`}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon container */}
        <div
          className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-10 bg-gradient-to-br ${colorMap[service.color]} shadow-2xl transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}
        >
          {service.icon}
        </div>

        <h3 className="text-3xl font-bold mb-4 font-poppins text-white tracking-tight">
          {service.title}
        </h3>
        <p className="text-zinc-500 text-lg leading-relaxed mb-8 flex-grow">
          {service.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {service.details.features
            .slice(0, 3)
            .map((feature: string, i: number) => (
              <span
                key={i}
                className="px-4 py-1.5 text-xs font-semibold rounded-full bg-white/5 text-zinc-400 border border-white/5"
              >
                {feature}
              </span>
            ))}
        </div>

        <div className="flex items-center gap-2 text-white font-bold text-sm group-hover:gap-4 transition-all">
          <span>Explore Service</span>
          <ArrowRight className="w-4 h-4 transition-transform" />
        </div>
      </div>

      {/* Animated Bottom Highlight */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.8 }}
      />
    </motion.div>
  );
}
