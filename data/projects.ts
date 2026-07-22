export interface Project {
  id: string;
  title: string;
  category: "Branding" | "Web" | "App" | "E-commerce" | "AI";
  client: string;
  location: string;
  year: string;
  image: string;
  summary: string;
  deliverables: string[];
  featured?: boolean;
}

export const projectsData: Project[] = [
  {
    id: "nexus-ai-support-platform",
    title: "Nexus AI Support Platform",
    category: "AI",
    client: "Enterprise SaaS Client",
    location: "Kuwait City, Kuwait",
    year: "2025",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    summary: "An intelligent support platform pairing a natural-language text-to-SQL engine with a real-time multi-agent chatbot that resolves customer queries and surfaces live business insights.",
    deliverables: ["Text-to-SQL Engine", "Multi-Agent Orchestration", "Real-Time Chatbot", "Analytics Dashboard"],
    featured: true,
  },
  {
    id: "al-essa-medical-platform",
    title: "Al-Essa Medical Commerce",
    category: "E-commerce",
    client: "Al-Essa Healthcare Group",
    location: "Kuwait City, Kuwait",
    year: "2025",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    summary: "Comprehensive digital transformation and custom e-commerce solution with KNET integration for a leading Kuwait medical supplier.",
    deliverables: ["E-Commerce Platform", "KNET Payment Hub", "Inventory Sync", "Mobile Web App"],
    featured: true,
  },
  {
    id: "skinnovation-beauty-app",
    title: "Skinnovation Clinic App",
    category: "App",
    client: "Skinnovation Clinic",
    location: "Salmiya, Kuwait",
    year: "2025",
    image: "https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=1200&auto=format&fit=crop",
    summary: "Sleek iOS and Android booking application enabling instant appointment scheduling, consultation history, and loyalty rewards.",
    deliverables: ["iOS & Android App", "UI/UX System", "Appointment Engine", "Push Notifications"],
    featured: true,
  },
  {
    id: "virtus-corporate-identity",
    title: "Virtus Brand System",
    category: "Branding",
    client: "Virtus Holding",
    location: "Kuwait",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    summary: "Rebranding campaign for Virtus Group including editorial typography, stationery, digital assets, and corporate brand guidelines.",
    deliverables: ["Logo & Visual Identity", "Brand Guidelines", "Stationery Kit", "Digital Assets"],
    featured: true,
  },
  {
    id: "waseet-pools-web-portal",
    title: "Waseet Pools Corporate Web",
    category: "Web",
    client: "Waseet Pools Co.",
    location: "Shuwaikh, Kuwait",
    year: "2024",
    image: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=1200&auto=format&fit=crop",
    summary: "High-performance marketing website engineered with localized SEO strategies that increased organic search lead conversions by 140%.",
    deliverables: ["Next.js Website", "SEO Campaign", "Lead Generation Form", "CMS"],
    featured: true,
  },
  {
    id: "kerala-restaurant-group",
    title: "Kerala Express Mobile Ordering",
    category: "App",
    client: "Kerala Express Group",
    location: "Hawally, Kuwait",
    year: "2024",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
    summary: "Fast, localized food ordering application for iOS and Android featuring live order tracking and multi-branch menu routing.",
    deliverables: ["Mobile App", "POS Integration", "WhatsApp Notifications"],
    featured: false,
  },
  {
    id: "vintage-poster-editorial",
    title: "Vintage Poster & Graphic Art",
    category: "Branding",
    client: "Burhani Creative Showcase",
    location: "Hawally, Kuwait",
    year: "2024",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
    summary: "Tactile print and digital poster design collection combining classical typographic layouts with contemporary Gulf motifs.",
    deliverables: ["Graphic Design", "Print Mockups", "Typography"],
    featured: false,
  },
  {
    id: "double-color-paper-portrait",
    title: "Double Color & Paper Portrait",
    category: "Branding",
    client: "Burhani Studios",
    location: "Kuwait",
    year: "2024",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop",
    summary: "Minimalist duotone brand identity exploration and paper art installation for luxury retail concept packaging.",
    deliverables: ["Packaging Design", "Visual Concept", "Duotone Art"],
    featured: false,
  },
  {
    id: "glued-poster-mockup-series",
    title: "Glued Poster Campaign",
    category: "Web",
    client: "Metropolitan Urban Series",
    location: "Kuwait City",
    year: "2023",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    summary: "Interactive digital showcase and web gallery created for urban design projects and outdoor marketing mockups.",
    deliverables: ["Web Gallery", "Interactive UI", "Animation"],
    featured: false,
  }
];

export const projectCategories = ["All", "AI", "Branding", "Web", "App", "E-commerce"] as const;
