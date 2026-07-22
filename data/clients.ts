export interface ClientLogo {
  id: string;
  name: string;
  industry: string;
  logoSvgText?: string;
  symbol: string;
}

export const clientsData: ClientLogo[] = [
  {
    id: "al-essa",
    name: "Al-Essa Group",
    industry: "Healthcare & Medical",
    symbol: "AE",
  },
  {
    id: "virtus",
    name: "Virtus Holding",
    industry: "Corporate & Investment",
    symbol: "VH",
  },
  {
    id: "skinnovation",
    name: "Skinnovation Clinic",
    industry: "Derma & Wellness",
    symbol: "SC",
  },
  {
    id: "waseet-pools",
    name: "Waseet Pools Co.",
    industry: "Engineering & Pools",
    symbol: "WP",
  },
  {
    id: "kerala-express",
    name: "Kerala Express",
    industry: "F&B Hospitality",
    symbol: "KE",
  },
  {
    id: "gulf-retail",
    name: "Gulf Retail Partners",
    industry: "Retail & E-commerce",
    symbol: "GR",
  },
  {
    id: "rifai-complex",
    name: "Al-Rifai Enterprise",
    industry: "Real Estate & Commercial",
    symbol: "RE",
  },
  {
    id: "beacon-kw",
    name: "Beacon Logistics",
    industry: "Supply Chain & Logistics",
    symbol: "BL",
  },
  {
    id: "oasis-tech",
    name: "Oasis Tech Kuwait",
    industry: "IT & Telecommunications",
    symbol: "OT",
  },
];
