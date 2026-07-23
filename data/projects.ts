import { Bilingual, BilingualList } from "@/lib/i18n";

export type ProjectCategory = "Branding" | "Web" | "App" | "E-commerce" | "AI";

export interface Project {
  id: string;
  category: ProjectCategory;
  client: string;
  location: string;
  year: string;
  image: string;
  title: Bilingual;
  summary: Bilingual;
  deliverables: BilingualList;
  featured?: boolean;
}

export const projectCategoryLabels: Record<ProjectCategory | "All", Bilingual> = {
  All: { en: "All", ar: "الكل" },
  Branding: { en: "Branding", ar: "الهوية التجارية" },
  Web: { en: "Web", ar: "الويب" },
  App: { en: "App", ar: "تطبيقات" },
  "E-commerce": { en: "E-commerce", ar: "تجارة إلكترونية" },
  AI: { en: "AI", ar: "الذكاء الاصطناعي" },
};

export const projectCategoryColors: Record<ProjectCategory | "All", string> = {
  All: "#14181f",
  Branding: "#db2777",
  Web: "#0891b2",
  App: "#2563eb",
  "E-commerce": "#d97706",
  AI: "#7c3aed",
};

export const projectsData: Project[] = [
  {
    id: "nexus-ai-support-platform",
    category: "AI",
    client: "Enterprise SaaS Client",
    location: "Kuwait City, Kuwait",
    year: "2025",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    title: { en: "Nexus AI Support Platform", ar: "منصة Nexus للدعم بالذكاء الاصطناعي" },
    summary: {
      en: "An AI support platform combining a natural-language query engine with a real-time chatbot that resolves customer questions and surfaces live business data.",
      ar: "منصة دعم بالذكاء الاصطناعي تجمع بين محرك استعلامات بلغة طبيعية ومحادثة آلية فورية تحل استفسارات العملاء وتوفر بيانات أعمال حية.",
    },
    deliverables: {
      en: ["Text-to-SQL engine", "Multi-agent orchestration", "Real-time chatbot", "Analytics dashboard"],
      ar: ["محرك تحويل النص إلى استعلام SQL", "تنسيق وكلاء متعددين", "محادثة آلية فورية", "لوحة تحليلات"],
    },
    featured: true,
  },
  {
    id: "al-essa-medical-platform",
    category: "E-commerce",
    client: "Al-Essa Healthcare Group",
    location: "Kuwait City, Kuwait",
    year: "2025",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    title: { en: "Al-Essa Medical Commerce", ar: "منصة الإيصاء الطبية للتجارة الإلكترونية" },
    summary: {
      en: "A custom e-commerce platform with KNET integration, built for a leading Kuwait medical supplier.",
      ar: "منصة تجارة إلكترونية مخصصة مع دمج بوابة كي نت، أُنجزت لمورد طبي رائد في الكويت.",
    },
    deliverables: {
      en: ["E-commerce platform", "KNET payment hub", "Inventory sync", "Mobile web app"],
      ar: ["منصة تجارة إلكترونية", "مركز دفع كي نت", "مزامنة المخزون", "تطبيق ويب للجوال"],
    },
    featured: true,
  },
  {
    id: "skinnovation-beauty-app",
    category: "App",
    client: "Skinnovation Clinic",
    location: "Salmiya, Kuwait",
    year: "2025",
    image: "https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=1200&auto=format&fit=crop",
    title: { en: "Skinnovation Clinic App", ar: "تطبيق عيادة Skinnovation" },
    summary: {
      en: "An iOS and Android booking app for appointment scheduling, consultation history, and loyalty rewards.",
      ar: "تطبيق حجز لنظامي iOS و Android لجدولة المواعيد وسجل الاستشارات وبرنامج الولاء.",
    },
    deliverables: {
      en: ["iOS & Android app", "UI/UX system", "Appointment engine", "Push notifications"],
      ar: ["تطبيق iOS و Android", "نظام واجهة وتجربة مستخدم", "محرك حجز المواعيد", "إشعارات فورية"],
    },
    featured: true,
  },
  {
    id: "virtus-corporate-identity",
    category: "Branding",
    client: "Virtus Holding",
    location: "Kuwait",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    title: { en: "Virtus Brand System", ar: "هوية Virtus التجارية" },
    summary: {
      en: "A rebrand for Virtus Group covering typography, stationery, digital assets, and brand guidelines.",
      ar: "إعادة تصميم هوية مجموعة Virtus شملت الطباعة والقرطاسية والأصول الرقمية ودليل الهوية.",
    },
    deliverables: {
      en: ["Logo & visual identity", "Brand guidelines", "Stationery kit", "Digital assets"],
      ar: ["شعار وهوية بصرية", "دليل الهوية", "طقم قرطاسية", "أصول رقمية"],
    },
    featured: true,
  },
  {
    id: "waseet-pools-web-portal",
    category: "Web",
    client: "Waseet Pools Co.",
    location: "Shuwaikh, Kuwait",
    year: "2024",
    image: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=1200&auto=format&fit=crop",
    title: { en: "Waseet Pools Corporate Web", ar: "موقع وسيط المسابح الإلكتروني" },
    summary: {
      en: "A marketing website with localized SEO that grew organic lead conversions by 140%.",
      ar: "موقع تسويقي مع تحسين محركات بحث محلي رفع تحويلات العملاء المحتملين العضوية بنسبة 140%.",
    },
    deliverables: {
      en: ["Next.js website", "SEO campaign", "Lead generation form", "CMS"],
      ar: ["موقع Next.js", "حملة تحسين محركات البحث", "نموذج توليد العملاء المحتملين", "نظام إدارة محتوى"],
    },
    featured: true,
  },
  {
    id: "kerala-restaurant-group",
    category: "App",
    client: "Kerala Express Group",
    location: "Hawally, Kuwait",
    year: "2024",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
    title: { en: "Kerala Express Mobile Ordering", ar: "تطبيق طلبات Kerala Express" },
    summary: {
      en: "A food ordering app for iOS and Android with live order tracking and multi-branch menu routing.",
      ar: "تطبيق طلب طعام لنظامي iOS و Android مع تتبع الطلبات الحي وتوجيه القوائم متعددة الفروع.",
    },
    deliverables: {
      en: ["Mobile app", "POS integration", "WhatsApp notifications"],
      ar: ["تطبيق جوال", "ربط نقاط البيع", "إشعارات واتساب"],
    },
    featured: false,
  },
  {
    id: "vintage-poster-editorial",
    category: "Branding",
    client: "Burhani Creative Showcase",
    location: "Hawally, Kuwait",
    year: "2024",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
    title: { en: "Vintage Poster & Graphic Art", ar: "ملصقات وأعمال فنية بطابع كلاسيكي" },
    summary: {
      en: "A print and digital poster collection combining classical typography with contemporary Gulf motifs.",
      ar: "مجموعة ملصقات مطبوعة ورقمية تجمع بين الطباعة الكلاسيكية وموتيفات خليجية معاصرة.",
    },
    deliverables: {
      en: ["Graphic design", "Print mockups", "Typography"],
      ar: ["تصميم جرافيك", "نماذج طباعة", "طباعة نصية"],
    },
    featured: false,
  },
  {
    id: "double-color-paper-portrait",
    category: "Branding",
    client: "Burhani Studios",
    location: "Kuwait",
    year: "2024",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop",
    title: { en: "Double Color & Paper Portrait", ar: "هوية ثنائية اللون وتركيب ورقي" },
    summary: {
      en: "A duotone brand identity and paper art installation for a luxury retail packaging concept.",
      ar: "هوية بصرية ثنائية اللون وتركيب فني ورقي لمفهوم تغليف تجزئة فاخر.",
    },
    deliverables: {
      en: ["Packaging design", "Visual concept", "Duotone art"],
      ar: ["تصميم تغليف", "مفهوم بصري", "فن ثنائي اللون"],
    },
    featured: false,
  },
  {
    id: "glued-poster-mockup-series",
    category: "Web",
    client: "Metropolitan Urban Series",
    location: "Kuwait City",
    year: "2023",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    title: { en: "Glued Poster Campaign", ar: "حملة الملصقات اللاصقة" },
    summary: {
      en: "A web gallery showcasing urban design projects and outdoor marketing mockups.",
      ar: "معرض ويب لمشاريع تصميم حضري ونماذج تسويق خارجي.",
    },
    deliverables: {
      en: ["Web gallery", "Interactive UI", "Animation"],
      ar: ["معرض ويب", "واجهة تفاعلية", "رسوم متحركة"],
    },
    featured: false,
  },
];
