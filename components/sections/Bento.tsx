import { CalendarIcon, FileTextIcon, RocketIcon } from "@radix-ui/react-icons";
import { Share2Icon, Globe, Users, Save, ShoppingCart } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Marquee } from "@/components/magicui/marquee";
import { GlobalReachDemo } from "../magicui/globe";
import { IconCloud } from "../magicui/icon-cloud";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { InfiniteTestimonialMarquee } from "../custom/InfiniteMarquee";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "react",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "nginx",
  "jest",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "sonarqube",
  "figma",
  "tailwindcss",
  "mongodb",
  "redis",
  "graphql",
  "socketdotio",
  "render",
  "supabase",
  "nestjs",
  "mysql",
];

const testimonials = [
  {
    name: "Sarah Johnson",
    username: "@sarahj",
    title: "CTO, TechCorp",
    body: "Their platform transformed our workflow. Implementation was seamless and our productivity increased by 40% in the first quarter.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Chen",
    username: "@michaelc",
    title: "Director of Engineering",
    body: "Reliable, scalable, and innovative. We've been partners for 3 years and their support is exceptional.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "David Rodriguez",
    username: "@davidr",
    title: "VP of Product",
    body: "The analytics dashboard alone was worth the investment. Real-time insights have helped us make data-driven decisions faster.",
    img: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Emily Wilson",
    username: "@emilyw",
    title: "CEO, Startup Inc.",
    body: "As a growing company, their flexible solutions scaled perfectly with our needs. Highly recommended for businesses at any stage.As a growing company, their flexible solutions scaled perfectly with our needs. Highly recommended for businesses at any stage.",
    img: "https://randomuser.me/api/portraits/women/63.jpg",
  },
];

const firstRow = testimonials.slice(0, testimonials.length / 2);
const images = slugs.map(
  (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
);

export function BentoDemo() {
  const features = [
    {
      Icon: Globe,
      name: "Global Reach",
      description: "Serving clients in 50+ countries with localized solutions",
      href: "#",
      className: "col-span-1 sm:col-span-2 lg:col-span-2",
      background: (
        <div className="absolute z-[-100] inset-0 h-full w-full overflow-hidden rounded-3xl">
          <GlobalReachDemo />
        </div>
      ),
    },
    {
      className: "col-span-1 sm:col-span-2 lg:col-span-1",
      Icon: ShoppingCart,
      name: "E-Commerce Solutions",
      description: "Shopify experts with proven conversion strategies",
      href: "#",
      background: (
        <div className="div inset-0 z-[-1] flex items-center justify-center p-6">
          <div className="grid grid-cols-2 gap-4">
            {["Shopify Plus", "Custom Store", "Optimization", "App Dev"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-lg border border-gray-200/10 bg-gray-100/5 p-3 text-center backdrop-blur-sm"
                >
                  <p className="text-sm font-medium">{item}</p>
                </div>
              )
            )}
          </div>
        </div>
      ),
    },
    {
      Icon: RocketIcon,
      name: "Innovation Engine",
      description: "Pioneering solutions powered by our R&D team",
      href: "#",
      className: "col-span-1 sm:col-span-2 lg:col-span-1",
      background: (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-3xl [mask-image:linear-gradient(to_top,transparent_10%,#000_10%)]">
          <IconCloud images={images} />
        </div>
      ),
    },
    {
      Icon: Users,
      name: "Client Success",
      description: "100% customer satisfaction",
      className: "col-span-1 sm:col-span-2 lg:col-span-1",
      href: "#",
      background: (
<div className="inset-0 z-[-1] flex flex-col items-center justify-center pt-3 text-center">
  <div className="mb-4">
    <p className="text-sm font-medium text-gray-400">Delivered</p>
    <h3 className="text-xl font-semibold text-white">200+ Successful Projects</h3>
    <p className="text-sm text-gray-500 mt-1">Across 15+ countries & industries</p>
  </div>

  <div className="grid grid-cols-2 gap-3">
    {["E-commerce", "SaaS Platforms", "Mobile Apps", "Web Apps"].map((item) => (
      <div
        key={item}
        className="rounded-lg border border-gray-200/10 bg-gray-100/5 p-3 backdrop-blur-sm"
      >
        <p className="text-sm font-medium text-white">{item}</p>
      </div>
    ))}
  </div>
</div>

      ),
    },
    {
      className: "col-span-1 sm:col-span-2 lg:col-span-3",
      Icon: FileTextIcon,
      name: "Client Testimonials",
      description: "Trusted by industry leaders worldwide",
      href: "#",
      background: (
        <div className="">
          <InfiniteTestimonialMarquee
            testimonials={testimonials}
            pauseOnHover
            className="[--duration:20s] gap-4 mt-4"
          />
        </div>
      ),
    },
  ];
  return (
    <div className="max-w-[1800px] mx-auto px-4 md:px-8">
      <BentoGrid className="gap-4 md:gap-6 lg:gap-8">
        {features.map((feature, idx) => (
          <BentoCard
            key={idx}
            {...feature}
            className={cn(
              "group relative overflow-hidden rounded-3xl border border-gray-200/10 bg-gradient-to-b from-gray-100/5 to-transparent backdrop-blur-xl",
              "transition-all duration-300 hover:border-gray-200/20 hover:bg-gray-100/10",
              feature.className
            )}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
