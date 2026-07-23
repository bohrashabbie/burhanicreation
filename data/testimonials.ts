import { Bilingual } from "@/lib/i18n";

export interface Testimonial {
  id: string;
  author: string;
  role: Bilingual;
  company: string;
  location: string;
  quote: Bilingual;
  rating: number;
  featured?: boolean;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "waseet-pools",
    quote: {
      en: "Burhani Creation understood what we needed and delivered on it. Our SEO and digital presence improved noticeably within a few months.",
      ar: "فهم فريق برهاني كرييشن احتياجاتنا ونفّذها بدقة. تحسّن حضورنا الرقمي وأداء تحسين محركات البحث بشكل ملحوظ خلال أشهر قليلة.",
    },
    author: "Eng. Mubarak Al-Fadli",
    role: { en: "Managing Director", ar: "المدير الإداري" },
    company: "Waseet Pools Co.",
    location: "Shuwaikh, Kuwait",
    rating: 5,
    featured: true,
  },
  {
    id: "skinnovation",
    quote: {
      en: "The team designed our booking app carefully, sharing interactive wireframes before writing any code. The process was transparent from start to finish.",
      ar: "صمّم الفريق تطبيق الحجز الخاص بنا بعناية، وشاركنا نماذج تفاعلية للواجهة قبل كتابة أي كود. كانت العملية شفافة من البداية للنهاية.",
    },
    author: "Dr. Reem Al-Sabah",
    role: { en: "Clinical Director", ar: "المديرة الطبية" },
    company: "Skinnovation Clinic",
    location: "Salmiya, Kuwait",
    rating: 5,
    featured: true,
  },
  {
    id: "al-essa-health",
    quote: {
      en: "They built our e-commerce site with KNET payment integration and automated inventory updates. Our online orders grew significantly in the first quarter.",
      ar: "بنوا موقع التجارة الإلكترونية الخاص بنا مع دمج بوابة كي نت وتحديثات مخزون تلقائية. نما حجم طلباتنا عبر الإنترنت بشكل ملحوظ خلال الربع الأول.",
    },
    author: "Tariq Al-Essa",
    role: { en: "Operations Manager", ar: "مدير العمليات" },
    company: "Al-Essa Healthcare Group",
    location: "Kuwait City",
    rating: 5,
    featured: true,
  },
  {
    id: "kerala-express",
    quote: {
      en: "Quick responses and clear communication throughout our app launch. We're happy with how it turned out.",
      ar: "استجابة سريعة وتواصل واضح طوال إطلاق تطبيق الطلبات الخاص بنا. نحن راضون تمامًا عن النتيجة.",
    },
    author: "Faisal Al-Kandari",
    role: { en: "Partner", ar: "شريك" },
    company: "Kerala Express Group",
    location: "Hawally, Kuwait",
    rating: 5,
    featured: false,
  },
];
