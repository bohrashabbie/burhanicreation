export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  featured?: boolean;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "waseet-pools",
    quote: "One of the most promising digital & SEO agencies in Kuwait. They matched our business objectives in terms of their services and core competencies, which resulted in a boost for our business. Recommended to all.",
    author: "Eng. Mubarak Al-Fadli",
    role: "Managing Director",
    company: "Waseet Pools Co.",
    location: "Shuwaikh, Kuwait",
    rating: 5,
    featured: true,
  },
  {
    id: "skinnovation",
    quote: "Burhani Creation designed our mobile booking app with extreme precision. The team delivered interactive UI wireframes before writing code, making the whole process effortless and transparent.",
    author: "Dr. Reem Al-Sabah",
    role: "Clinical Director",
    company: "Skinnovation Clinic",
    location: "Salmiya, Kuwait",
    rating: 5,
    featured: true,
  },
  {
    id: "al-essa-health",
    quote: "Their team built our e-commerce site with seamless KNET payment routing and automated inventory updates. Our online order volume grew significantly within the first quarter.",
    author: "Tariq Al-Essa",
    role: "Operations Manager",
    company: "Al-Essa Healthcare Group",
    location: "Kuwait City",
    rating: 5,
    featured: true,
  },
  {
    id: "kerala-express",
    quote: "Fast response, highly skilled developers in Hawally, and clear communication throughout our mobile ordering app launch. We couldn't be happier with the outcome.",
    author: "Faisal Al-Kandari",
    role: "Partner",
    company: "Kerala Express Group",
    location: "Hawally, Kuwait",
    rating: 5,
    featured: false,
  }
];
