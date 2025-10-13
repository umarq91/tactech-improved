"use client";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export function GlobalReachDemo() {
  const dots = [
    { top: "30%", left: "20%" },
    { top: "50%", left: "50%" },
    { top: "60%", left: "80%" },
    { top: "40%", left: "70%" },
    { top: "70%", left: "35%" },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center  overflow-hidden rounded-3xl">
      {/* Subtle world icon in the background */}
      <Globe className="absolute text-gray-500/10 w-64 h-64 animate-pulse" />

      {/* Animated connection lines */}
      <motion.svg
        viewBox="0 0 200 100"
        className="absolute w-[80%] opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.path
          d="M20 60 C60 20, 140 20, 180 60"
          fill="transparent"
          stroke="url(#grad)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <defs>
          <linearGradient id="grad" x1="0" x2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Pulsing dots representing global locations */}
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-sky-400 rounded-full shadow-md"
          style={{ top: dot.top, left: dot.left }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
        />
      ))}
    </div>
  );
}
