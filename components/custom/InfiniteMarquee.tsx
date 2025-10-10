"use client";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Testimonial = {
  name: string;
  username: string;
  title: string;
  body: string;
  img: string;
};

export function InfiniteTestimonialMarquee({
  testimonials,
  className,
  pauseOnHover = false,
  duration = 20,
}: {
  testimonials: Testimonial[];
  className?: string;
  pauseOnHover?: boolean;
  duration?: number;
}) {
  const controls = useAnimation();
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);
  const animationStartTime = useRef<number | null>(null);
  const progressBeforePause = useRef<number>(0);

  // Initialize the animation when component mounts
  useEffect(() => {
    startInfiniteAnimation();
  }, []);

  const startInfiniteAnimation = () => {
    animationStartTime.current = Date.now();
    controls.start({
      x: "-50%",
      transition: {
        duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  };

  const handleHoverStart = () => {
    if (pauseOnHover) {
      // Store the current progress when pausing
      const elapsed = (Date.now() - (animationStartTime.current || 0)) / 1000;
      progressBeforePause.current = (elapsed % duration) / duration;
      controls.stop();
    }
  };

  const handleHoverEnd = () => {
    if (pauseOnHover) {
      // Calculate the remaining duration based on progress
      const remainingDuration = (1 - progressBeforePause.current) * duration;
      animationStartTime.current =
        Date.now() - progressBeforePause.current * duration * 1000;

      controls.start({
        x: "-50%",
        transition: {
          duration: remainingDuration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    }
  };

  const openModal = (testimonial: Testimonial) => {
    // Store the current progress when opening modal
    const elapsed = (Date.now() - (animationStartTime.current || 0)) / 1000;
    progressBeforePause.current = (elapsed % duration) / duration;
    setSelectedTestimonial(testimonial);
    controls.stop();
  };

  const closeModal = () => {
    setSelectedTestimonial(null);
    // Calculate the remaining duration based on progress
    const remainingDuration = (1 - progressBeforePause.current) * duration;
    animationStartTime.current =
      Date.now() - progressBeforePause.current * duration * 1000;

    controls.start({
      x: "-50%",
      transition: {
        duration: remainingDuration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  };

  const renderTestimonialCard = (testimonial: Testimonial, index: number) => {
    const showReadMore = testimonial.body.length > 120;
    const previewText = showReadMore
      ? `${testimonial.body.substring(0, 120)}...`
      : testimonial.body;

    return (
      <motion.div
        key={index}
        className={cn(
          "relative h-full w-72 cursor-pointer overflow-hidden rounded-xl border p-4",
          "border-gray-200 bg-white hover:bg-gray-50",
          "dark:border-gray-700 dark:bg-background dark:hover:bg-background",
          "transition-colors duration-200"
        )}
        onClick={() => openModal(testimonial)}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex flex-row items-center gap-3">
          <img
            className="h-10 w-10 rounded-full"
            alt={testimonial.name}
            src={testimonial.img}
          />
          <div className="flex flex-col">
            <div className="text-sm font-medium dark:text-white">
              {testimonial.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {testimonial.username} • {testimonial.title}
            </div>
          </div>
        </div>
        <blockquote className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          {previewText}
        </blockquote>
        {showReadMore && (
          <button
            className="mt-2 text-xs font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            onClick={(e) => {
              e.stopPropagation();
              openModal(testimonial);
            }}
          >
            Read more
          </button>
        )}
      </motion.div>
    );
  };

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "relative flex w-full overflow-hidden",
          pauseOnHover && "group",
          className
        )}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        <motion.div
          className="flex shrink-0 items-center gap-4 will-change-transform"
          animate={controls}
        >
          {/* Duplicate the testimonials to loop seamlessly */}
          <div className="flex shrink-0 items-center gap-4">
            {testimonials.map((t, i) => renderTestimonialCard(t, i))}
          </div>
          <div className="flex shrink-0 items-center gap-4">
            {testimonials.map((t, i) =>
              renderTestimonialCard(t, i + testimonials.length)
            )}
          </div>
        </motion.div>
      </div>

      {/* Animated Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <motion.div
              className={cn(
                "relative w-full max-w-md rounded-xl border p-6",
                "border-gray-700 bg-background z-[140]",
                "max-h-[90vh] overflow-y-auto"
              )}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <motion.button
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
                onClick={closeModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>

              <div className="flex flex-row items-center gap-3">
                <motion.img
                  className="h-12 w-12 rounded-full"
                  alt={selectedTestimonial.name}
                  src={selectedTestimonial.img}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                />
                <motion.div
                  className="flex flex-col"
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="text-lg font-medium text-white">
                    {selectedTestimonial.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {selectedTestimonial.username} • {selectedTestimonial.title}
                  </div>
                </motion.div>
              </div>

              <motion.blockquote
                className="mt-4 text-gray-300"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {selectedTestimonial.body}
              </motion.blockquote>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
