
import React from "react";
import { motion } from "framer-motion";
import { Globe as GlobeIcon } from "lucide-react";

export function GlobalReachDemo() {
  const dots = [
    { top: "30%", left: "20%" },
    { top: "50%", left: "50%" },
    { top: "65%", left: "80%" },
    { top: "40%", left: "75%" },
    { top: "75%", left: "30%" },
    { top: "25%", left: "60%" },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black/20 overflow-hidden">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_70%)]" />
      
      {/* Animated Orbit Rings */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80%] h-[80%] border border-white/5 rounded-full"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-[60%] h-[60%] border border-white/5 rounded-full"
      />

      {/* Central Globe Icon with glow */}
      <div className="relative">
        <GlobeIcon className="text-white/20 w-48 h-48 animate-pulse" />
        <div className="absolute inset-0 blur-2xl bg-sky-500/10 rounded-full" />
      </div>

      {/* Animated Connection Paths */}
      <svg
        viewBox="0 0 200 100"
        className="absolute w-[90%] h-full opacity-60 z-10 pointer-events-none"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        
        {/* Connection Arcs */}
        <motion.path
          d="M30 40 Q 100 0 170 60"
          stroke="url(#lineGrad)"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M40 70 Q 100 90 160 30"
          stroke="url(#lineGrad)"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </svg>

      {/* Global Location Nodes */}
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute z-20"
          style={{ top: dot.top, left: dot.left }}
        >
          {/* Outer Pulse */}
          <motion.div
            className="absolute -inset-2 bg-sky-400/20 rounded-full"
            animate={{ scale: [1, 2, 1], opacity: [0, 0.5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
          />
          {/* Inner Core */}
          <div className="w-1.5 h-1.5 bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
        </motion.div>
      ))}
    </div>
  );
}
