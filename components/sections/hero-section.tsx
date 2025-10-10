"use client";

import { useRef, useEffect } from "react";
import { ArrowRight, Code, Rocket, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    if (particlesRef.current) {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          const progress = self.progress;
          if (particlesRef.current) {
            (particlesRef.current as any).density = 10000 + progress * 50000;
          }
        },
      });
    }

    gsap.from(".grid-line", {
      scaleY: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: "expo.out",
      transformOrigin: "bottom",
    });
  }, []);

  // Floating animation configuration
  const floatingAnimation = {
    y: [0, 0, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  // Container animation
  const containerAnimation = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8 },
    },
  };

  // Pulsing ring animation
  const ringAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section
      className="relative min-h-[100vh] h-auto sm:mt-0 in-center bg-background"
      id="hero"
      ref={heroRef}
    >

      
      <motion.div
        className="absolute hidden md:block top-0 z-[0] h-full w-full opacity-10 bg-neutral-900/20 bg-[radial-gradient(ellipse_15%_60%_at_50%_10%,rgba(255,255,255,0.6),rgba(255,255,255,0))]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 1 }}
      />

      
      <div className="absolute inset-0 -z-10 flex">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="grid-line flex-1 border-r border-border/[0.05]"
            style={{ transformOrigin: "bottom" }}
          />
        ))}
      </div>

      <div className="container relative">
        <div className="max-w-3xl pt-10 md:pt-2 mx-auto text-center space-y-4">
          <div className="overflow-hidden">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-tight md:leading-normal text-center font-poppins"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.span
                className="block bg-clip-text bg-[length:200%_200%] animate-shine"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0,
                  ease: "backOut",
                }}
                style={{
                  backgroundImage:
                    "conic-gradient(at_top_right, #000000, #1f2937, #4b5563, #111827, #000000)",
                }}
              >
                Tactically Engineered
              </motion.span>
              <motion.span
                className="block  bg-clip-text bg-[length:200%_200%] animate-shine"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: "backOut",
                }}
                style={{
                  backgroundImage:
                    "conic-gradient(at_top_right, #ffffff, #e5e7eb, #d1d5db, #f9fafb, #ffffff)",
                }}
              >
                Technically Brilliant
              </motion.span>
            </motion.h1>
          </div>

          <motion.p
            className="text-base md:text-lg text-muted-foreground mt-2 md:mt-4 max-w-2xl mx-auto px-4 md:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tactech delivers cutting-edge software solutions that drive business
            growth. We blend innovation, expertise, and precision to create
            digital experiences that matter.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="rounded-full group relative overflow-hidden"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
              />
              <span className="relative z-10 flex items-center">
                <a href="/#contact">Get Started </a>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full hover:bg-background hover:text-foreground transition-colors"
            >
              <a href="/#services">Our Services </a>
            </Button>
          </motion.div>
        </div>

        {/* Floating elements - now using pure Framer Motion */}
        <motion.div
          className="absolute hidden md:block right-[10%] top-20"
          initial="hidden"
          animate="visible"
          variants={containerAnimation}
          transition={{ delay: 0.7 }}
        >
          <motion.div
            className="relative h-16 w-16 rounded-full bg-gradient-to-r from-yellow-400/20 to-amber-500/20 backdrop-blur-md border border-yellow-400/10 flex items-center justify-center"
            animate={floatingAnimation as any}
          >
            <Sparkles className="h-6 w-6 text-yellow-400" />
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/20"
              animate={ringAnimation}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute hidden md:block left-[8%] xl:left-[15%] top-1/3 xl:top-1/2"
          initial="hidden"
          animate="visible"
          variants={containerAnimation}
          transition={{ delay: 0.9 }}
        >
          <motion.div
            className="relative h-16 w-16 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-md border border-purple-500/10 flex items-center justify-center"
            animate={floatingAnimation as any}
          >
            <Rocket className="h-6 w-6 text-purple-500" />
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/20"
              animate={{
                ...ringAnimation,
                transition: { ...ringAnimation.transition, duration: 3.5 },
              }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute hidden md:block right-[20%] bottom-4 xl:bottom-1/3"
          initial="hidden"
          animate="visible"
          variants={containerAnimation}
          transition={{ delay: 1.1 }}
        >
          <motion.div
            className="relative h-16 w-16 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md border border-green-500/10 flex items-center justify-center"
            animate={
              {
                ...floatingAnimation,
                transition: { ...floatingAnimation.transition, delay: 0.5 },
              } as any
            }
          >
            <Code className="h-6 w-6 text-green-500" />
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/20"
              animate={{
                ...ringAnimation,
                transition: { ...ringAnimation.transition, duration: 4 },
              }}
            />
          </motion.div>
        </motion.div>

        {/* Background shapes */}
        <motion.div
          className="absolute left-0 bottom-0 w-64 h-64 rounded-full bg-primary/10 blur-3xl -z-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-0 top-0 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl -z-20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <style jsx global>{`
        @keyframes shine {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
        .animate-shine {
          animation: shine 3s linear infinite;
        }
      `}</style>
    </section>
  );
}
