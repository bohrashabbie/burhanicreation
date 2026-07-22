export interface Service {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  fullDescription: string;
  iconName: string;
  deliverables: string[];
  features: string[];
  techStack: string[];
}

export const servicesData: Service[] = [
  {
    id: "mobile-app-development",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    tagline: "Tailor-made iOS & Android apps built for performance and growth.",
    description: "Tailor-made app development for iOS and Android. Agile methodology with interactive designs shared before development begins, ensuring features align perfectly with your business goals.",
    fullDescription: "We build intuitive, fast, and feature-rich native and cross-platform mobile applications tailored to your business needs. From initial concept, interactive UI wireframes, and backend integration to publishing on both the Apple App Store and Google Play Store, we guide you through every milestone.",
    iconName: "Smartphone",
    deliverables: [
      "iOS App (Swift/React Native)",
      "Android App (Kotlin/React Native)",
      "Interactive Prototype & UI Specs",
      "API & Backend Integration",
      "Store Deployment & Submission"
    ],
    features: [
      "Agile iterative sprints with interactive previews",
      "Cross-screen optimization for phones and tablets",
      "Secure payment gateway integration",
      "Real-time push notifications & analytics"
    ],
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Node.js", "Firebase"]
  },
  {
    id: "website-development",
    slug: "website-development",
    title: "Website Development",
    tagline: "Fast, modern, high-converting digital web experiences.",
    description: "An effective online presence through modern development frameworks. Experienced across diverse Gulf industries to design websites that increase conversion rates and customer trust.",
    fullDescription: "Your website is your primary digital asset in today's competitive market. We engineer high-performance, responsive web applications built on cutting-edge stacks like Next.js, Node.js, and TypeScript. Designed for speed, SEO, security, and effortless administration.",
    iconName: "Globe",
    deliverables: [
      "Custom Next.js / Web Application",
      "Responsive Desktop & Mobile Layouts",
      "Headless CMS / Content Layer",
      "SEO Optimization & Analytics",
      "Performance & Security Audits"
    ],
    features: [
      "Sub-second load times & 95+ Lighthouse score",
      "Mobile-first responsive layout",
      "Clean structured data for Google Search",
      "Custom interactive components & calculators"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL", "PostgreSQL"]
  },
  {
    id: "e-commerce-development",
    slug: "e-commerce-development",
    title: "E-Commerce Development",
    tagline: "Seamless shopping experiences designed to maximize your ROI.",
    description: "Unique e-commerce solutions for web and mobile using Shopify, custom headless platforms, and WooCommerce. Focused on client ROI, localized payments, and business expansion.",
    fullDescription: "We build scalable, conversion-optimized online stores that deliver memorable shopping journeys. From localized Gulf payment gateway integrations (KNET, MyFatoorah, Tap) to multi-currency and inventory synchronization, we provide everything needed to scale retail online.",
    iconName: "ShoppingBag",
    deliverables: [
      "Custom Storefront & Checkout",
      "KNET / Gulf Payment Gateway",
      "Inventory & Order Management",
      "Customer Accounts & Order Tracking",
      "Abandoned Cart Recovery Systems"
    ],
    features: [
      "KNET, MyFatoorah, Tap Payment Integration",
      "Instant search & smart filtering",
      "Automated WhatsApp order updates",
      "Multi-currency & Arabic / English readiness"
    ],
    techStack: ["Shopify Plus", "Next.js Commerce", "WooCommerce", "Stripe", "KNET", "MyFatoorah"]
  },
  {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    tagline: "Expressive interface design informed by global trends and user research.",
    description: "Innovative, expressive interface design for websites and mobile apps, informed by global trends and tailored for clients across Kuwait and the Gulf.",
    fullDescription: "Great design is intuitive visual communication. Our UI/UX team transforms complex business requirements into sleek, usable interfaces. We conduct user research, create interactive Figma prototypes, and establish design systems that make products a joy to use.",
    iconName: "Layout",
    deliverables: [
      "User Journey & Architecture Maps",
      "High-Fidelity Figma Wireframes",
      "Interactive Clickable Prototypes",
      "Brand Design Systems & Tokens",
      "Usability Testing & Refinements"
    ],
    features: [
      "Clean editorial typography & micro-interactions",
      "Inclusive, accessible accessibility standards",
      "Design-to-code component handoff",
      "RTL (Arabic) visual considerations"
    ],
    techStack: ["Figma", "Framer", "Adobe CC", "Design Systems", "Prototyping"]
  },
  {
    id: "erp-solutions",
    slug: "erp-solutions",
    title: "ERP Solutions",
    tagline: "Complete, scalable business software tailored to your daily operations.",
    description: "A complete business solution for retail, corporate, and trading: affordable, scalable, localized, and customized to your daily workflow in Kuwait.",
    fullDescription: "Streamline your enterprise operations with centralized Enterprise Resource Planning solutions. We build and deploy customized ERP software covering Point of Sale (POS), inventory management, invoicing, HR, accounting, and supply chain tracking.",
    iconName: "Database",
    deliverables: [
      "Custom Enterprise Resource Platform",
      "Inventory & Stock Tracking Module",
      "Point of Sale (POS) & Invoicing",
      "HR & Payroll Management",
      "Financial Reporting & Dashboards"
    ],
    features: [
      "Localized Kuwait tax & invoicing formats",
      "Role-based access permissions & security",
      "Cloud access from any device",
      "Custom reporting & analytics export"
    ],
    techStack: ["Node.js", "Python", "PostgreSQL", "Docker", "Tailwind UI", "REST APIs"]
  }
];

export const homeServicesTeaser = [
  {
    title: "Brand Identity",
    description: "Distinctive logo design, typography, color palettes, and visual guidelines crafted to elevate your business presence across Kuwait and the Gulf.",
    link: "/services",
    icon: "Sparkles"
  },
  {
    title: "Marketing Solutions",
    description: "Omni-channel digital strategies, performance marketing, SEO, and social media campaigns aimed at driving repeat traffic and customer loyalty.",
    link: "/services",
    icon: "TrendingUp"
  },
  {
    title: "Technical Development",
    description: "Modern websites, iOS/Android mobile apps, e-commerce storefronts, and custom ERP systems engineered for speed and reliability.",
    link: "/services",
    icon: "Code2"
  }
];
