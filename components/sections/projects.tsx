// "use client";
// import React, { useState } from "react";
// import { ExternalLink } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { projects } from "@/lib/data";

// const Card = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn(
//       "rounded-lg border bg-card text-card-foreground shadow-sm",
//       className
//     )}
//     {...props}
//   />
// ));
// Card.displayName = "Card";

// const CardHeader = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn("flex flex-col space-y-1.5 p-6", className)}
//     {...props}
//   />
// ));
// CardHeader.displayName = "CardHeader";

// const CardTitle = React.forwardRef<
//   HTMLParagraphElement,
//   React.HTMLAttributes<HTMLHeadingElement>
// >(({ className, ...props }, ref) => (
//   <h3
//     ref={ref}
//     className={cn(
//       "text-2xl font-semibold leading-none tracking-tight",
//       className
//     )}
//     {...props}
//   />
// ));
// CardTitle.displayName = "CardTitle";

// const CardDescription = React.forwardRef<
//   HTMLParagraphElement,
//   React.HTMLAttributes<HTMLParagraphElement>
// >(({ className, ...props }, ref) => (
//   <p
//     ref={ref}
//     className={cn("text-sm text-muted-foreground", className)}
//     {...props}
//   />
// ));
// CardDescription.displayName = "CardDescription";

// const CardFooter = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn("flex items-center p-6 pt-0", className)}
//     {...props}
//   />
// ));
// CardFooter.displayName = "CardFooter";

// export const Projects = () => {
//   const categories = [
//     "All",
//     ...Array.from(new Set(projects.map((project) => project.category))),
//   ];
//   const [activeCategory, setActiveCategory] = useState("All");

//   const filteredProjects =
//     activeCategory === "All"
//       ? projects
//       : projects.filter((project) => project.category === activeCategory);

//   return (
//     <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
//            <div className="absolute inset-0 -z-10">
//         <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/10" />
//         <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
//       </div>
//       <div className="max-w-7xl mx-auto">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
//             Our <span className="text-primary">Projects</span>
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
//             Explore our portfolio of innovative solutions across various
//             industries.
//           </p>
//         </div>

//         {/* Filter tabs */}
//         <div className="flex flex-wrap justify-center mb-12 gap-2">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setActiveCategory(category)}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all
//                          ${
//                            activeCategory === category
//                              ? "bg-primary text-primary-foreground shadow-md"
//                              : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
//                          }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* Projects grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProjects.map((project) => (
//             <Card
//               key={project.id}
//               className="group overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10"
//             >
//               <div className="relative aspect-video overflow-hidden">
//                 <img
//                   src={project.image}
//                   alt={project.title}
//                   className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0  from-black/60 via-transparent to-transparent" />
//               </div>

//               <CardHeader className="relative">
//                 <span className="inline-block px-3 py-1 text-xs bg-primary text-primary-foreground rounded-full w-fit mb-2">
//                   {project.category}
//                 </span>
//                 <CardTitle className="text-xl">{project.title}</CardTitle>
//                 <CardDescription className="line-clamp-2">
//                   {project.description}
//                 </CardDescription>
//               </CardHeader>

//               <CardFooter className="flex justify-between items-center">
//                 <a
//                   href={project.link || "#"}
//                   className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   View Project
//                   <ExternalLink size={16} className="ml-1.5" />
//                 </a>
//                 <div className="flex space-x-2">
//                   {project.tags?.map((tag) => (
//                     <span
//                       key={tag}
//                       className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
