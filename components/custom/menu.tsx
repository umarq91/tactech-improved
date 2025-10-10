"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ThemeToggle } from "../ui/theme-toggle";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { Music } from "lucide-react";
import { motion } from "framer-motion";
const menuItems = [
  { path: "/", label: "ABOUT" },
  { path: "/#services", label: "SERVICES" },
  { path: "/projects", label: "PROJECTS" },
  { path: "/#contact", label: "GET A QUOTE" },
];

const Menu = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const t1 = useRef<gsap.core.Timeline | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);

  //audio
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const audioElementRef = useRef<any>(null);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Manage audio playback
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);
  useGSAP(
    () => {
      if (!isHydrated) return;

      // Initial setup - hide all animated elements
      gsap.set(".menu-link-item-holder", { y: 75, opacity: 0 });
      gsap.set(".menu-link", { y: "100%", opacity: 0 });
      gsap.set(".menu-overlay-bar", { y: -50, opacity: 0 });
      gsap.set(".menu-info > *", { y: 20, opacity: 0 });

      t1.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "expo.inOut",
        })
        .to(
          ".menu-overlay-bar",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          ".menu-link-item-holder",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to(
          ".menu-link",
          {
            y: "0%",
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "expo.out",
          },
          "-=0.8"
        )
        .to(
          ".menu-info > *",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.6"
        );
    },
    { scope: container, dependencies: [isHydrated] }
  );

  useEffect(() => {
    if (!t1.current) return;
    isMenuOpen ? t1.current.play() : t1.current.reverse();

    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Hover animation for links
  const setupLinkHover = () => {
    linkRefs.current.forEach((link) => {
      if (!link) return;

      link.addEventListener("mouseenter", () => {
        gsap.to(link.querySelector(".menu-link"), {
          y: "-10%",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      link.addEventListener("mouseleave", () => {
        gsap.to(link.querySelector(".menu-link"), {
          y: "0%",
          duration: 0.3,
          color: "#000",
        });
      });
    });
  };

  useEffect(() => {
    if (isHydrated) {
      setupLinkHover();
    }
  }, [isHydrated]);

  return (
    <div ref={container} className="menu-container">
      {/* Menu Bar */}
      <header className="menu-bar fixed top-0 left-0 w-full p-6 z-50 bg-opacity-80 backdrop-blur-sm max-w-[100vw]">
        <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
          <div className="menu-logo text-xl font-medium font-inter">
            <Link
              href="/"
              className={` ${
                !isMenuOpen
                  ? "text-black dark:text-white"
                  : "text-white dark:text-black"
              } hover:text-gray-600 transition-colors font-urbanist text-2xl lg:text-4xl`}
            >
              Tactech
            </Link>
          </div>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          <div className="flex gap-2 justify-center items-center">
            <div className="md:hidden">
              <ThemeToggle />
            </div>
            <button
              onClick={toggleMenu}
              className="relative w-8 h-6 flex flex-col justify-between items-center z-[100]"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <span className="text-2xl text-white dark:text-black">✕</span>
              ) : (
                <span className="flex flex-col items-center w-full">
                  <span
                    className={`block h-[2px] w-full ${
                      !isMenuOpen
                        ? "bg-black dark:bg-white"
                        : "bg-white dark:bg-black"
                    }`}
                  ></span>
                  <span
                    className={`block h-[2px] w-full my-1.5 ${
                      !isMenuOpen
                        ? "bg-black dark:bg-white"
                        : "bg-white dark:bg-black"
                    }`}
                  ></span>
                  <span
                    className={`block h-[2px] w-full ${
                      !isMenuOpen
                        ? "bg-black dark:bg-white"
                        : "bg-white dark:bg-black"
                    }`}
                  ></span>
                </span>
              )}
            </button>
            {/* Audio Toggle with Indicator */}
            <div className="ml-4">
              <button
                onClick={toggleAudioIndicator}
                aria-label={isAudioPlaying ? "Pause audio" : "Play audio"}
                className="p-2 rounded-md transition-colors hover:bg-muted focus:outline-none"
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/lofi.mp3"
                  loop
                />

                <motion.div
                  className="relative flex items-center justify-center"
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Music
                    className={clsx(
                      "h-6 w-6 transition-colors duration-300",
                      isAudioPlaying ? "text-primary" : "text-muted-foreground"
                    )}
                  />

                  {/* Minimal glow indicator */}
                  {isAudioPlaying && (
                    <motion.span
                      className="absolute h-6 w-6 rounded-full bg-primary/20"
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.2, 0.3, 0.2],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      <div
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        }}
        className="menu-overlay fixed inset-0 w-full h-full p-6 flex flex-col dark:bg-gray-200 bg-zinc-900 z-40"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="menu-overlay-bar flex justify-between items-center mb-12">
            <div className="menu-logo text-xl font-medium">
              <Link
                href="/"
                className="hover:text-gray-600 transition-colors text-primary"
              >
                Tactech
              </Link>
            </div>
          </div>
        </div>

        {/* Menu Content */}
        <div className="flex flex-1 flex-col md:flex-row gap-12">
          {/* Navigation Links */}
          <div className="menu-links flex-1 flex flex-col justify-center lg:pl-40">
            {menuItems.map((link, index) => (
              <div
                className="menu-link-item overflow-hidden py-2"
                key={index}
                ref={(el) => (linkRefs.current[index] = el)}
              >
                <div className="menu-link-item-holder relative">
                  <Link
                    href={link.path}
                    className="menu-link text-6xl md:text-8xl font-bold tracking-tight block relative overflow-hidden"
                    onClick={toggleMenu}
                  >
                    <span className="menu-link-text inline-block will-change-transform  text-white dark:text-black hover:text-black dark:hover:text-white transition-colors duration-100">
                      {link.label}
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info Section */}
          <div className="menu-info flex-1 flex flex-col justify-end pb-12 text-white dark:text-black ">
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4">Get in touch</h3>
              <p className="text-lg mb-2">hello@tactech.com</p>
              <p className="text-lg">+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-4">Follow us</h3>
              <div className="flex gap-4">
                <a href="#" className="text-lg hover:underline">
                  Twitter
                </a>
                <a href="#" className="text-lg hover:underline">
                  Instagram
                </a>
                <a href="#" className="text-lg hover:underline">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
