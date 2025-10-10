// "use client";
// import { useEffect, useRef } from "react";
// import { motion } from "framer-motion";

// export const ParticleBackground = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const mouseRef = useRef({ x: -9999, y: -9999, radius: 0 });

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const setCanvasSize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     setCanvasSize();
//     let PARTICLES_COUNT;
//     if (window.innerWidth < 768) {
//       PARTICLES_COUNT = 50;
//     } else {
//       PARTICLES_COUNT = 70;
//     }
//     const BASE_INTERACTION_RADIUS = 150;
//     const MAX_INTERACTION_RADIUS = 250;
//     const LINK_DISTANCE = 120;
//     const PULSE_SPEED = 0.02;

//     // Dark color palette with elegant accents
//     const COLORS = [
//       "rgba(99, 120, 220, 0.6)", // Soft blue
//       "rgba(170, 140, 255, 0.6)", // Lavender
//       "rgba(80, 200, 240, 0.6)", // Cyan
//       "rgba(220, 120, 220, 0.6)", // Purple
//       "rgba(150, 150, 255, 1)", // Light blue
//       "rgba(255,255,255,1)",
      
//     ];

//     const particles = Array.from({ length: PARTICLES_COUNT }, () => {
//       const size = Math.random() * 2.5 + 0.5;
//       return {
//         x: Math.random() * window.innerWidth,
//         y: Math.random() * window.innerHeight,
//         size,
//         baseSize: size,
//         speedX: (Math.random() - 0.5) * 0.4,
//         speedY: (Math.random() - 0.5) * 0.4,
//         color: COLORS[Math.floor(Math.random() * COLORS.length)],
//         targetX: null as number | null,
//         targetY: null as number | null,
//         orbitRadius: Math.random() * 50 + 30,
//         orbitAngle: Math.random() * Math.PI * 2,
//       };
//     });

//     let animationFrameId: number;
//     let pulsePhase = 0;

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // Pulsing effect for interaction radius
//       pulsePhase += PULSE_SPEED;
//       mouseRef.current.radius =
//         BASE_INTERACTION_RADIUS +
//         Math.sin(pulsePhase) *
//           (MAX_INTERACTION_RADIUS - BASE_INTERACTION_RADIUS) *
//           0.3;

//       // Draw a subtle glow around mouse
//       if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
//         const gradient = ctx.createRadialGradient(
//           mouseRef.current.x,
//           mouseRef.current.y,
//           0,
//           mouseRef.current.x,
//           mouseRef.current.y,
//           mouseRef.current.radius
//         );
//         gradient.addColorStop(0, "rgba(100, 120, 220, 0.1)");
//         gradient.addColorStop(0.5, "rgba(80, 90, 200, 0.05)");
//         gradient.addColorStop(1, "rgba(60, 70, 180, 0)");

//         ctx.beginPath();
//         ctx.fillStyle = gradient;
//         ctx.arc(
//           mouseRef.current.x,
//           mouseRef.current.y,
//           mouseRef.current.radius,
//           0,
//           Math.PI * 2
//         );
//         ctx.fill();
//       }

//       // Draw & update particles
//       particles.forEach((p, index) => {
//         const dx = p.x - mouseRef.current.x;
//         const dy = p.y - mouseRef.current.y;
//         const dist = Math.sqrt(dx * dx + dy * dy);

//         // Mouse interaction
//         if (dist < mouseRef.current.radius) {
//           const angle = Math.atan2(dy, dx);
//           const force =
//             (mouseRef.current.radius - dist) / mouseRef.current.radius;

//           // Orbit behavior for close particles
//           if (dist < mouseRef.current.radius * 0.3) {
//             p.orbitAngle += 0.02;
//             p.targetX =
//               mouseRef.current.x + Math.cos(p.orbitAngle) * p.orbitRadius;
//             p.targetY =
//               mouseRef.current.y + Math.sin(p.orbitAngle) * p.orbitRadius;

//             // Smooth movement to orbit position
//             if (p.targetX !== null && p.targetY !== null) {
//               p.x += (p.targetX - p.x) * 0.1;
//               p.y += (p.targetY - p.y) * 0.1;
//             }
//           } else {
//             // Repulsion for particles further out
//             p.x += Math.cos(angle) * force * 2;
//             p.y += Math.sin(angle) * force * 2;
//           }

//           // Size pulse effect
//           p.size =
//             p.baseSize * (1 + Math.sin(pulsePhase * 2 + index * 0.1) * 0.3);
//         } else {
//           // Normal movement when not interacting
//           p.x += p.speedX;
//           p.y += p.speedY;
//           p.size = p.baseSize;
//           p.targetX = null;
//           p.targetY = null;
//         }

//         // Boundary wrapping
//         if (p.x > canvas.width + 10) p.x = -10;
//         else if (p.x < -10) p.x = canvas.width + 10;

//         if (p.y > canvas.height + 10) p.y = -10;
//         else if (p.y < -10) p.y = canvas.height + 10;

//         // Draw particle with glow effect
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

//         // Inner glow
//         const gradient = ctx.createRadialGradient(
//           p.x,
//           p.y,
//           0,
//           p.x,
//           p.y,
//           p.size * 2
//         );
//         gradient.addColorStop(0, p.color);
//         gradient.addColorStop(1, "rgba(0,0,0,0)");

//         ctx.fillStyle = gradient;
//         ctx.fill();

//         // Connect nearby particles
//         for (let j = index + 1; j < particles.length; j++) {
//           const other = particles[j];
//           const dx = p.x - other.x;
//           const dy = p.y - other.y;
//           const dist = Math.sqrt(dx * dx + dy * dy);

//           if (dist < LINK_DISTANCE) {
//             const opacity = 1 - dist / LINK_DISTANCE;
//             ctx.beginPath();

//             // Gradient for connection lines
//             const lineGradient = ctx.createLinearGradient(
//               p.x,
//               p.y,
//               other.x,
//               other.y
//             );
//             lineGradient.addColorStop(
//               0,
//               p.color.replace("0.6)", `${opacity * 0.6})`)
//             );
//             lineGradient.addColorStop(
//               1,
//               other.color.replace("0.6)", `${opacity * 0.6})`)
//             );

//             ctx.strokeStyle = lineGradient;
//             ctx.lineWidth = 0.8 * opacity;
//             ctx.moveTo(p.x, p.y);
//             ctx.lineTo(other.x, other.y);
//             ctx.stroke();
//           }
//         }
//       });

//       animationFrameId = requestAnimationFrame(animate);
//     };

//     animate();

//     const handleMouseMove = (e: MouseEvent) => {
//       mouseRef.current.x = e.clientX;
//       mouseRef.current.y = e.clientY;
//     };

//     const handleMouseLeave = () => {
//       mouseRef.current.x = -9999;
//       mouseRef.current.y = -9999;
//     };

//     window.addEventListener("resize", setCanvasSize);
//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseout", handleMouseLeave);

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//       window.removeEventListener("resize", setCanvasSize);
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseout", handleMouseLeave);
//     };
//   }, []);

//   return (
//     <motion.canvas
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 2, ease: "easeOut" }}
//       ref={canvasRef}
//       className="absolute inset-0 z-[99] w-full h-full pointer-events-none blur-[0px] brightness-[1.1]"
//     />
//   );
// };
