import {
  ArrowRight,
  Boxes,
  Cloud,
  Code,
  Database,
  LineChart,
  Rocket,
  Server,
  Smartphone,
  Store,
  X,
} from "lucide-react";
export let projectsData = [
  {
    title: "LMS",
    description:
      "It is an LMS for companies to access compliance related documents and resources. Contains up to 100,000 resources including videos, documents, and articles.",
    tags: ["AI", "Next.js", "Laravel", "Elastic Search", "Typescript", "Saas"],
    image: "/ehs.png",
    link: null,
  },
  {
    title: "Art Branch",
    description:
      "Artbranch is a social media platform for Australian artists, offering features like likes, comments, collaborations, friend requests, video uploads, interactions, and notifications.",
    tags: ["Product", "Next js", "Supabase", "Typescript", "Web"],
    image: "/artbranch.png",
    link: "https://artbranch.com.au",
  },
  {
    title: "Property Cloud",
    description:
      "AI-powered real estate management CRM, available on a subscription basis, which can be used by real estate agencies to manage all of their agency needs",
    tags: ["AI", "MERN", "SaaS", "Stripe", "Typescript"],
    image: "/property.png",
    link: null,
  },
  {
    title: "Security App",
    description:
      "A system for a security company to prevent employee scams by automating shift scheduling and capturing photos for accountability. It enabled remote shift assignment, reduced dishonesty, and improved overall efficiency.",
    tags: ["React Native", "MERN", "Typescript"],
    image: "/security.png",
    link: null,
  },
  {
    title: "Cafe Order",
    description:
      "A food ordering app for an international university (name not disclosed),  which users can use to order food from the university cafeteria, and place their orders in advance, instead of waiting in long queues.",
    tags: ["Design System", "Mobile Developement", "Firebase"],
    image: "/cafe.png",
  },
  {
    title: "Roofing Calculator",
    description:
      "A project that combines inventory management with service tracking for an e-commerce company, featuring automated commission calculations for sales and closers to ensure efficient and streamlined operations.",
    tags: ["Web", "Supabase", "Typescript", "Next.js"],
    image: "/roofing.png",
  },
  {
    title: "Ultramatic Reports",
    description: "An Inventory management system for a company",
    tags: ["Product", "Next js", "Supabase", "Typescript", "Web"],
    image: "/ultramatic.png",
  },
  {
    title: "Dominate Wear",
    description: "A custom built Shopify Store for a clothing brand",
    tags: ["Web Design", "Shopify", "Liquid", "E-commerce"],
    image: "/shopify.png",
    link: "https://dominatewear.com",
  },
  {
    title: "Fomrio",
    description:
      "Form.io is a React-based platform that enables dynamic and customizable form submissions, supporting features like barcode scanning and real-time location and many more",
    tags: ["Mobile App", "Geolocation", "Analytics"],
    image: "/formio.png",
  },
];

export const services = [
  {
    title: "Software Development",
    description:
      "Custom solutions with scalable architecture for your business needs.",
    icon: <Code className="h-10 w-10" />,
    color: "blue-indigo",
    bgColor: "bg-blue-500/5",
    bgImage:
      "https://i.pinimg.com/736x/d3/5c/57/d35c578891dfaec7bf4e8c552fcf31f7.jpg",
    details: {
      overview:
        "Our software development services deliver robust, scalable applications tailored to your business requirements. We follow agile methodologies to ensure rapid delivery without compromising quality.",
      features: [
        "Custom application development",
        "Enterprise software solutions",
        "API development and integration",
        "Legacy system modernization",
        "Quality assurance and testing",
      ],
      technologies: ["React", "Node.js", "Python", "Java", ".NET", "Docker"],
      benefits: [
        "Increased operational efficiency",
        "Reduced development costs",
        "Improved customer experience",
        "Future-proof technology stack",
      ],
    },
  },
  {
    title: "Mobile Development",
    description: "Native and cross-platform apps with intuitive interfaces.",
    icon: <Smartphone className="h-10 w-10" />,
    color: "orange-red",
    bgColor: "bg-orange-500/5",
    bgImage:
      "https://img.freepik.com/premium-vector/car-rental-landing-page_527309-11.jpg",
    details: {
      overview:
        "We build high-performance mobile applications for iOS and Android platforms, focusing on user experience and engagement. Our apps are optimized for performance across all device types.",
      features: [
        "Native iOS and Android development",
        "Cross-platform solutions (Flutter/React Native)",
        "Mobile UI/UX design",
        "App store optimization",
        "Push notification integration",
      ],
      technologies: ["Swift", "Kotlin", "Flutter", "React Native", "Firebase"],
      benefits: [
        "Enhanced brand presence",
        "Direct customer engagement",
        "Increased sales and conversions",
        "Real-time analytics",
      ],
    },
  },
  {
    title: "Web Development",
    description: "Responsive web applications with modern frameworks.",
    icon: <Boxes className="h-10 w-10" />,
    color: "green-emerald",
    bgColor: "bg-green-500/5",
    bgImage:
      "https://img.freepik.com/premium-vector/car-rental-landing-page_527309-11.jpg",
    details: {
      overview:
        "We create responsive, high-performance websites and web applications that deliver exceptional user experiences across all devices and platforms.",
      features: [
        "Custom website development",
        "E-commerce solutions",
        "CMS integration",
        "Progressive Web Apps",
        "Performance optimization",
      ],
      technologies: [
        "React",
        "Next.js",
        "Vue",
        "Angular",
        "WordPress",
        "Shopify",
      ],
      benefits: [
        "Improved online presence",
        "Higher conversion rates",
        "Better SEO performance",
        "Scalable infrastructure",
      ],
    },
  },
  {
    title: "DevOps",
    description: "Automated workflows and CI/CD pipelines for efficiency.",
    icon: <Server className="h-10 w-10" />,
    color: "purple-violet",
    bgColor: "bg-purple-500/5",
    bgImage:
      "https://img.freepik.com/premium-vector/car-rental-landing-page_527309-11.jpg",
    details: {
      overview:
        "Our DevOps services streamline your development and operations processes through automation, continuous integration, and infrastructure as code.",
      features: [
        "CI/CD pipeline setup",
        "Infrastructure automation",
        "Container orchestration",
        "Monitoring and logging",
        "Cloud migration",
      ],
      technologies: [
        "AWS",
        "Azure",
        "GCP",
        "Kubernetes",
        "Terraform",
        "Ansible",
      ],
      benefits: [
        "Faster time to market",
        "Improved deployment frequency",
        "Higher reliability",
        "Reduced operational costs",
      ],
    },
  },
  {
    title: "Cloud Management",
    description: "Optimized cloud resources with cost-effective scaling.",
    icon: <Cloud className="h-10 w-10" />,
    color: "sky-indigo",
    bgColor: "bg-indigo-500/5",
    bgImage:
      "https://img.freepik.com/premium-vector/car-rental-landing-page_527309-11.jpg",
    details: {
      overview:
        "We help businesses leverage cloud computing to achieve scalability, flexibility, and cost savings while maintaining security and performance.",
      features: [
        "Cloud architecture design",
        "Migration services",
        "Cost optimization",
        "Security implementation",
        "Disaster recovery",
      ],
      technologies: [
        "AWS",
        "Azure",
        "Google Cloud",
        "Serverless",
        "Docker",
        "Kubernetes",
      ],
      benefits: [
        "Reduced infrastructure costs",
        "Improved scalability",
        "Enhanced security",
        "Business continuity",
      ],
    },
  },
  {
    title: "Data Analytics",
    description: "Transform data into insights with advanced tools.",
    icon: <LineChart className="h-10 w-10" />,
    color: "teal-green",
    bgColor: "bg-teal-500/5",
    bgImage:
      "https://img.freepik.com/premium-vector/car-rental-landing-page_527309-11.jpg",
    details: {
      overview:
        "Our data analytics services help you make informed business decisions by transforming raw data into actionable insights and visualizations.",
      features: [
        "Business intelligence",
        "Data visualization",
        "Predictive analytics",
        "Data warehousing",
        "Machine learning",
      ],
      technologies: ["Power BI", "Tableau", "Python", "R", "SQL", "Hadoop"],
      benefits: [
        "Data-driven decision making",
        "Improved operational efficiency",
        "Competitive advantage",
        "Customer behavior insights",
      ],
    },
  },
];

