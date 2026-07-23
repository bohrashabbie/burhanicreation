import { Bilingual, BilingualList } from "@/lib/i18n";

export interface Service {
  id: string;
  slug: string;
  iconName: string;
  image: string;
  title: Bilingual;
  tagline: Bilingual;
  description: Bilingual;
  fullDescription: Bilingual;
  deliverables: BilingualList;
  features: BilingualList;
  techStack: string[];
}

export const servicesData: Service[] = [
  {
    id: "mobile-app-development",
    slug: "mobile-app-development",
    iconName: "Smartphone",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=900&auto=format&fit=crop",
    title: { en: "Mobile App Development", ar: "تطوير تطبيقات الجوال" },
    tagline: {
      en: "Native iOS and Android apps built for performance and growth.",
      ar: "تطبيقات iOS و Android أصلية مبنية للأداء والنمو.",
    },
    description: {
      en: "Custom app development for iOS and Android, with an interactive prototype shared before development starts so every feature matches your goals.",
      ar: "تطوير تطبيقات مخصصة لنظامي iOS و Android، مع نموذج أولي تفاعلي يُعرض قبل بدء التطوير لضمان توافق كل ميزة مع أهداف عملك.",
    },
    fullDescription: {
      en: "We design and build fast, reliable mobile applications for iOS and Android — from the first wireframe through backend integration and submission to the App Store and Google Play.",
      ar: "نصمم ونبني تطبيقات جوال سريعة وموثوقة لنظامي iOS و Android — من أول مخطط أولي وحتى ربط الأنظمة الخلفية والنشر على App Store و Google Play.",
    },
    deliverables: {
      en: ["iOS app (Swift / React Native)", "Android app (Kotlin / React Native)", "Interactive prototype & UI specs", "API & backend integration", "App Store & Play Store submission"],
      ar: ["تطبيق iOS (بلغة Swift أو React Native)", "تطبيق Android (بلغة Kotlin أو React Native)", "نموذج أولي تفاعلي ومواصفات الواجهة", "ربط واجهات برمجة التطبيقات والأنظمة الخلفية", "النشر على المتاجر"],
    },
    features: {
      en: ["Iterative sprints with working previews", "Optimized for phones and tablets", "Secure payment integration", "Push notifications & analytics"],
      ar: ["مراحل عمل تكرارية مع معاينات فعلية", "متوافق مع الهواتف والأجهزة اللوحية", "دمج آمن لبوابات الدفع", "إشعارات فورية وتحليلات استخدام"],
    },
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Node.js", "Firebase"],
  },
  {
    id: "website-development",
    slug: "website-development",
    iconName: "Globe",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=900&auto=format&fit=crop",
    title: { en: "Website Development", ar: "تطوير المواقع الإلكترونية" },
    tagline: {
      en: "Fast, modern websites built to convert.",
      ar: "مواقع إلكترونية سريعة وحديثة مبنية لتحقيق التحويلات.",
    },
    description: {
      en: "Responsive web applications built on modern frameworks, designed to increase conversion and build trust across Gulf industries.",
      ar: "تطبيقات ويب متجاوبة مبنية على أطر عمل حديثة، مصممة لرفع معدلات التحويل وبناء الثقة في مختلف القطاعات الخليجية.",
    },
    fullDescription: {
      en: "Your website is your primary digital asset. We build responsive, high-performance web applications on Next.js, Node.js, and TypeScript — engineered for speed, search visibility, security, and easy day-to-day management.",
      ar: "موقعك الإلكتروني هو أصلك الرقمي الأساسي. نبني تطبيقات ويب متجاوبة وعالية الأداء باستخدام Next.js و Node.js و TypeScript — مصممة للسرعة وتحسين محركات البحث والأمان وسهولة الإدارة اليومية.",
    },
    deliverables: {
      en: ["Custom Next.js web application", "Responsive desktop & mobile layouts", "Headless CMS / content layer", "SEO setup & analytics", "Performance & security review"],
      ar: ["تطبيق ويب مخصص على Next.js", "تصميم متجاوب لسطح المكتب والجوال", "نظام إدارة محتوى منفصل", "إعداد تحسين محركات البحث والتحليلات", "مراجعة الأداء والأمان"],
    },
    features: {
      en: ["Sub-second load times, 95+ Lighthouse score", "Mobile-first layout", "Structured data for search engines", "Custom interactive components"],
      ar: ["زمن تحميل أقل من ثانية وتقييم Lighthouse فوق 95", "تصميم يبدأ من الجوال أولاً", "بيانات منظمة لمحركات البحث", "مكونات تفاعلية مخصصة"],
    },
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL", "PostgreSQL"],
  },
  {
    id: "e-commerce-development",
    slug: "e-commerce-development",
    iconName: "ShoppingBag",
    image: "https://images.unsplash.com/photo-1556742049-0a67daf4005a?q=80&w=900&auto=format&fit=crop",
    title: { en: "E-Commerce Development", ar: "تطوير التجارة الإلكترونية" },
    tagline: {
      en: "Online stores built to convert and scale.",
      ar: "متاجر إلكترونية مبنية للتحويل والنمو.",
    },
    description: {
      en: "Online stores for web and mobile on Shopify, WooCommerce, or a custom headless platform, with local payment integration and room to grow.",
      ar: "متاجر إلكترونية للويب والجوال عبر Shopify أو WooCommerce أو منصة مخصصة، مع دمج بوابات الدفع المحلية وقابلية للتوسع.",
    },
    fullDescription: {
      en: "We build scalable, conversion-focused online stores. From local Gulf payment gateways (KNET, MyFatoorah, Tap) to multi-currency support and inventory sync, we cover what's needed to sell online at scale.",
      ar: "نبني متاجر إلكترونية قابلة للتوسع تركز على التحويل. من بوابات الدفع الخليجية المحلية (كي نت، ماي فاتورة، تاب) إلى دعم العملات المتعددة ومزامنة المخزون، نوفر كل ما يلزم للبيع عبر الإنترنت على نطاق واسع.",
    },
    deliverables: {
      en: ["Custom storefront & checkout", "KNET / Gulf payment gateway", "Inventory & order management", "Customer accounts & order tracking", "Abandoned cart recovery"],
      ar: ["واجهة متجر وصفحة دفع مخصصة", "بوابة دفع كي نت أو خليجية", "إدارة المخزون والطلبات", "حسابات العملاء وتتبع الطلبات", "استرجاع عربات التسوق المتروكة"],
    },
    features: {
      en: ["KNET, MyFatoorah, and Tap integration", "Instant search & filtering", "Automated WhatsApp order updates", "Arabic / English ready"],
      ar: ["دمج كي نت وماي فاتورة وتاب", "بحث فوري وتصفية ذكية", "تحديثات طلبات تلقائية عبر واتساب", "جاهزية كاملة للعربية والإنجليزية"],
    },
    techStack: ["Shopify Plus", "Next.js Commerce", "WooCommerce", "Stripe", "KNET", "MyFatoorah"],
  },
  {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    iconName: "Layout",
    image: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?q=80&w=900&auto=format&fit=crop",
    title: { en: "UI/UX Design", ar: "تصميم واجهات وتجربة المستخدم" },
    tagline: {
      en: "Interface design grounded in research, not templates.",
      ar: "تصميم واجهات مبني على البحث، لا على القوالب الجاهزة.",
    },
    description: {
      en: "Interface design for web and mobile, grounded in user research and built for clarity across Kuwait and the Gulf.",
      ar: "تصميم واجهات للويب والجوال مبني على بحث المستخدم وواضح الأسلوب، لعملاء في الكويت والخليج.",
    },
    fullDescription: {
      en: "Good design communicates clearly. Our team runs user research, builds interactive Figma prototypes, and establishes a design system so the product stays consistent — and a pleasure to use — end to end.",
      ar: "التصميم الجيد يوصل الفكرة بوضوح. يجري فريقنا أبحاث المستخدمين، ويبني نماذج أولية تفاعلية على Figma، ويؤسس نظام تصميم متكامل يجعل المنتج متسقًا وسهل الاستخدام من البداية للنهاية.",
    },
    deliverables: {
      en: ["User journey & architecture maps", "High-fidelity Figma wireframes", "Interactive clickable prototypes", "Brand design system & tokens", "Usability testing & refinement"],
      ar: ["خرائط رحلة المستخدم وبنية المعلومات", "نماذج Figma عالية الدقة", "نماذج أولية تفاعلية قابلة للنقر", "نظام تصميم الهوية ومكوناته", "اختبار قابلية الاستخدام والتحسين"],
    },
    features: {
      en: ["Clean, editorial typography", "Accessible by default", "Design-to-code handoff", "RTL (Arabic) layout support"],
      ar: ["طباعة نظيفة بأسلوب تحريري", "إتاحة الوصول بشكل افتراضي", "تسليم مباشر من التصميم إلى الكود", "دعم تخطيط RTL للعربية"],
    },
    techStack: ["Figma", "Framer", "Adobe CC", "Design Systems", "Prototyping"],
  },
  {
    id: "erp-solutions",
    slug: "erp-solutions",
    iconName: "Database",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop",
    title: { en: "ERP Solutions", ar: "حلول تخطيط موارد المؤسسات" },
    tagline: {
      en: "Business software built around how you actually work.",
      ar: "أنظمة إدارية مبنية على طريقة عملك الفعلية.",
    },
    description: {
      en: "Business software for retail, corporate, and trading operations — scalable, localized, and built around your daily workflow in Kuwait.",
      ar: "برمجيات إدارية للتجزئة والشركات والتجارة — قابلة للتوسع ومحلية ومبنية حول سير عملك اليومي في الكويت.",
    },
    fullDescription: {
      en: "Centralize your operations with an ERP built for your business. We design and deploy point-of-sale, inventory management, invoicing, HR, accounting, and supply chain tracking in one system.",
      ar: "مركّز عملياتك في نظام ERP مصمم لعملك. نصمم وننشر نقاط البيع وإدارة المخزون والفوترة والموارد البشرية والمحاسبة وتتبع سلسلة التوريد في نظام واحد.",
    },
    deliverables: {
      en: ["Custom ERP platform", "Inventory & stock tracking", "Point of sale & invoicing", "HR & payroll management", "Financial reporting & dashboards"],
      ar: ["منصة ERP مخصصة", "تتبع المخزون والمستودعات", "نقاط البيع والفوترة", "إدارة الموارد البشرية والرواتب", "تقارير مالية ولوحات بيانات"],
    },
    features: {
      en: ["Kuwait tax & invoicing formats", "Role-based access & permissions", "Cloud access from any device", "Custom reports & exports"],
      ar: ["صيغ ضريبة وفوترة كويتية", "صلاحيات وصول حسب الدور", "وصول سحابي من أي جهاز", "تقارير وتصدير بيانات مخصصة"],
    },
    techStack: ["Node.js", "Python", "PostgreSQL", "Docker", "Tailwind UI", "REST APIs"],
  },
];
