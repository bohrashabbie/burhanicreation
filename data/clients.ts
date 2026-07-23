import { Bilingual } from "@/lib/i18n";

export interface ClientLogo {
  id: string;
  name: string;
  industry: Bilingual;
  symbol: string;
}

export const clientsData: ClientLogo[] = [
  { id: "al-essa", name: "Al-Essa Group", industry: { en: "Healthcare & Medical", ar: "الرعاية الصحية والطبية" }, symbol: "AE" },
  { id: "virtus", name: "Virtus Holding", industry: { en: "Corporate & Investment", ar: "الشركات والاستثمار" }, symbol: "VH" },
  { id: "skinnovation", name: "Skinnovation Clinic", industry: { en: "Derma & Wellness", ar: "العناية بالبشرة والعافية" }, symbol: "SC" },
  { id: "waseet-pools", name: "Waseet Pools Co.", industry: { en: "Engineering & Pools", ar: "الهندسة والمسابح" }, symbol: "WP" },
  { id: "kerala-express", name: "Kerala Express", industry: { en: "F&B Hospitality", ar: "الضيافة والمطاعم" }, symbol: "KE" },
  { id: "gulf-retail", name: "Gulf Retail Partners", industry: { en: "Retail & E-commerce", ar: "التجزئة والتجارة الإلكترونية" }, symbol: "GR" },
  { id: "rifai-complex", name: "Al-Rifai Enterprise", industry: { en: "Real Estate & Commercial", ar: "العقارات والتجاري" }, symbol: "RE" },
  { id: "beacon-kw", name: "Beacon Logistics", industry: { en: "Supply Chain & Logistics", ar: "سلسلة التوريد واللوجستيات" }, symbol: "BL" },
  { id: "oasis-tech", name: "Oasis Tech Kuwait", industry: { en: "IT & Telecommunications", ar: "تقنية المعلومات والاتصالات" }, symbol: "OT" },
];
