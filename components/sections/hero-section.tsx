import React, { useRef, useEffect } from "react";
import { ArrowRight, Code, Rocket, Sparkles, Zap } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".hero-text-line",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out" },
    );

    gsap.from(".hero-decoration", {
      scale: 0,
      opacity: 0,
      duration: 1.5,
      delay: 0.5,
      stagger: 0.2,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-background flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden"
    >
      {/* Decorative Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <motion.div
        style={{ y: y1, opacity }}
        className="container mx-auto px-6 text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-400 text-xs font-medium mb-8 backdrop-blur-sm"
        >
          <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span>Your #1 choice for digital products</span>
        </motion.div>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] font-poppins mb-8">
          <div className="overflow-hidden">
            <span className="hero-text-line block bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent pb-4">
              Tactically Engineered.
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-text-line block text-zinc-400">
              Technically Brilliant.
            </span>
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          We build digital infrastructure that defines the future. Tactech
          delivers elite SaaS solutions and enterprise architectures with
          surgical precision.
        </motion.p>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingBadge
          icon={<Sparkles className="w-6 h-6" />}
          color="text-yellow-400"
          top="20%"
          left="15%"
          delay={0}
        />
        <FloatingBadge
          icon={<Rocket className="w-6 h-6" />}
          color="text-purple-500"
          top="35%"
          right="10%"
          delay={0.5}
        />
        <FloatingBadge
          icon={<Code className="w-6 h-6" />}
          color="text-blue-500"
          bottom="20%"
          left="20%"
          delay={1}
        />
        <FloatingBadge
          icon={<Zap className="w-6 h-6" />}
          color="text-emerald-500"
          bottom="15%"
          right="25%"
          delay={1.5}
        />
      </div>

      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full -z-10 animate-pulse delay-700" />
    </section>
  );
};

const FloatingBadge: React.FC<{
  icon: React.ReactNode;
  color: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay: number;
}> = ({ icon, color, top, bottom, left, right, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: 1,
      scale: 1,
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      opacity: { duration: 0.5, delay },
      scale: { duration: 0.5, delay },
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay * 2 },
      rotate: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay * 1.5,
      },
    }}
    className="hero-decoration absolute p-4 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/10 shadow-2xl z-0 hidden lg:flex"
    style={{ top, bottom, left, right }}
  >
    <div className={color}>{icon}</div>
  </motion.div>
);
