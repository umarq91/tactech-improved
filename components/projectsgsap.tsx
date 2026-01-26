"use client";
import { motion, useAnimation } from "framer-motion";
import React from "react";
import { FlipWords } from "./custom/Flipwords";
import { projectsData } from "@/lib/data";
import { useRouter } from "next/navigation";
import Image from "next/image";

function ProjectGsap({ showmore }: { showmore?: boolean }) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const router = useRouter();
  const projects = showmore ? projectsData.slice(0, 4) : projectsData;

  // Create controls for each project
  const titleControls = projects.map(() => useAnimation());
  const descControls = projects.map(() => useAnimation());
  const imageControls = projects.map(() => useAnimation());

  const handleHoverStart = (index: number) => {
    setHoveredIndex(index);
    titleControls[index]?.start({ y: 0 });
    descControls[index]?.start({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 },
    });
    imageControls[index]?.start({
      scale: 0.98,
      filter: "brightness(0.7)",
      transition: { duration: 0.5 },
    });
  };

  const handleHoverEnd = (index: number) => {
    setHoveredIndex(null);
    titleControls[index]?.start({ y: "100%" });
    descControls[index]?.start({
      opacity: 0,
      y: 20,
    });
    imageControls[index]?.start({
      scale: 1,
      filter: "brightness(1)",
      transition: { duration: 0.5 },
    });
  };

  return (
    <section
      id="projects"
      className="w-full mt-10 py-10 pb-20 px-4 sm:px-8 lg:px-12 lg:px-20 max-w-[2300px] mx-auto"
    >
      {/* Refined Header Section */}
      <div className="border-b border-white/5 pb-16 mb-20 relative z-10">
        <div className="flex flex-col gap-4">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-xs font-bold tracking-[0.5em] uppercase text-blue-500 mb-2 block"
          >
            Tactical Operations
          </motion.span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter font-poppins text-white leading-[0.9]">
            Featured{" "}
            <span className="relative inline-block min-w-[280px] md:min-w-[450px]">
              <FlipWords
                words={["Web Dev", "Mobile Dev", "Cloud Systems"]}
                className="font-black text-white"
              />
            </span>{" "}
            <br />
            <span className="text-zinc-600">Project Archive.</span>
          </h1>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            onHoverStart={() => handleHoverStart(index)}
            onHoverEnd={() => handleHoverEnd(index)}
            className="relative group h-[300px] sm:h-[400px] lg:h-[450px] lg:h-[500px]"
          >
            {/* Floating title - hidden on mobile, visible on desktop */}
            <h1
              className={`hidden xl:flex absolute overflow-hidden  ${
                index % 2 === 0
                  ? "left-full -translate-x-9"
                  : "right-full translate-x-9"
              } text-[#CDEA68] text-3xl lg:text-4xl xl:text-7xl tracking-tight top-1/2 -translate-y-1/2 z-[9] leading-none font-poppins -mb-10`}
            >
              {project.title.split("").map((letter, i) => (
                <motion.span
                  className="inline-block"
                  initial={{ y: "100%" }}
                  animate={titleControls[index]}
                  transition={{ ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                  key={i}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            {/* Mobile title - visible only on mobile */}
            <h1 className="xl:hidden absolute top-4 left-4 z-[9] text-[#CDEA68] text-2xl font-medium ">
              {project.title}
            </h1>

            <div className="w-full h-full rounded-xl overflow-hidden cursor-pointer relative">
              <Image
                className="h-full w-full object-cover"
                src={project.image}
                alt={project.title}
                width={100}
                height={100}
              />

              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 sm:p-6 lg:p-8 flex flex-col justify-end"
                initial={{ opacity: 0 }}
                animate={descControls[index]}
              >
                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <motion.span
                        key={i}
                        className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm text-white/80 border border-white/10"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: hoveredIndex === index ? 1 : 0,
                          y: hoveredIndex === index ? 0 : 10,
                        }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <motion.p
                    className="text-white text-base sm:text-lg lg:text-xl font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      y: hoveredIndex === index ? 0 : 10,
                    }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.description}
                  </motion.p>

                    <motion.div
                    className="flex items-center gap-2 mt-2 sm:mt-3 lg:mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{ delay: 0.4 }}
                    >
                    <button
                      onClick={() => project.link && window.open(project.link, "_blank")}
                      disabled={!project.link}
                      className={`px-4 py-1 sm:px-5 sm:py-2 lg:px-6 lg:py-2 rounded-full text-sm sm:text-base font-medium flex items-center gap-1 sm:gap-2 transition-colors ${
                      project.link
                        ? "bg-[#CDEA68] text-black hover:bg-[#c0e055]"
                        : "bg-white/20 text-white/80 border border-white/20 cursor-not-allowed"
                      }`}
                    >
                      {project.link ? "View Project" : "Private Project"}
                      {project.link && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        className="hidden sm:block"
                      >
                        <path
                        d="M7.5 3.5H4.5V12.5H13.5V9.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        />
                        <path
                        d="M10.5 3.5H13.5V6.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        />
                        <path
                        d="M13.5 3.5L7.5 9.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        />
                      </svg>
                      )}
                    </button>
                    </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
      {showmore && (
        <div className="mt-12 flex justify-center">
          <motion.button
            onClick={() => router.push("/projects")}
            className="px-6 py-2 bg-[#CDEA68] text-black rounded-full text-base sm:text-lg font-medium hover:bg-[#c0e055] transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Show More
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              className="hidden sm:block"
              initial={{ y: 0 }}
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="black"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.button>
        </div>
      )}
    </section>
  );
}

export default ProjectGsap;
