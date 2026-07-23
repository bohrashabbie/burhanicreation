import React from "react";
import Link from "next/link";
import HeroWave from "@/components/HeroWave";
import ClientMarquee from "@/components/ClientMarquee";
import StatCounter from "@/components/StatCounter";
import WaveDivider from "@/components/WaveDivider";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import ProjectEstimator from "@/components/ProjectEstimator";
import CapabilitiesShowcase from "@/components/CapabilitiesShowcase";
import InteractiveAppShowcase from "@/components/InteractiveAppShowcase";
import BentoGridShowcase from "@/components/BentoGridShowcase";
import { homeServicesTeaser, servicesData } from "@/data/services";
import { projectsData } from "@/data/projects";
import { testimonialsData } from "@/data/testimonials";
import { Sparkles, TrendingUp, Code2, ArrowRight, Quote, Star } from "lucide-react";

export default function HomePage() {
  const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 3);
  const featuredTestimonials = testimonialsData.filter((t) => t.featured);

  return (
    <div className="space-y-0">
      
      {/* Hero Section */}
      <HeroWave />

      {/* Client Logos Marquee */}
      <ClientMarquee />

      {/* Core Agency Offerings */}
      <section className="py-24 bg-surface relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-primary-wash to-gold-wash text-primary text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Core Agency Offerings</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
                Crafting digital assets <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-mid">that drive real growth.</span>
              </h2>
            </div>
            
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-hairline text-ink font-bold text-sm hover:border-primary hover:text-primary transition-all duration-200 shrink-0 shadow-xs"
            >
              <span>Explore All 5 Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 Main Focus Teasers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeServicesTeaser.map((teaser, idx) => {
              const accents = [
                { text: "text-primary", wash: "bg-primary-wash", grad: "group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-mid" },
                { text: "text-primary-mid", wash: "bg-primary-wash", grad: "group-hover:bg-gradient-to-br group-hover:from-primary-mid group-hover:to-primary-deep" },
                { text: "text-gold-deep", wash: "bg-gold-wash", grad: "group-hover:bg-gradient-to-br group-hover:from-gold group-hover:to-gold-hover" },
              ][idx % 3];
              return (
                <div
                  key={teaser.title}
                  className="relative bg-white rounded-3xl p-8 border border-hairline shadow-soft hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-primary-mid to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-2xl ${accents.wash} ${accents.text} flex items-center justify-center ${accents.grad} group-hover:text-white transition-colors duration-300`}>
                      {idx === 0 && <Sparkles className="w-6 h-6" />}
                      {idx === 1 && <TrendingUp className="w-6 h-6" />}
                      {idx === 2 && <Code2 className="w-6 h-6" />}
                    </div>

                    <h3 className="font-display text-2xl font-bold text-ink group-hover:text-primary transition-colors">
                      {teaser.title}
                    </h3>

                    <p className="text-sm text-ink-muted leading-relaxed">
                      {teaser.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-hairline">
                    <Link
                      href={teaser.link}
                      className={`inline-flex items-center gap-2 text-xs font-bold ${accents.text} uppercase tracking-wider group-hover:translate-x-1 transition-transform`}
                    >
                      <span>Know More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Bento Grid Section */}
      <BentoGridShowcase />

      {/* Interactive Mobile Phone UI Showcase */}
      <section className="py-20 bg-surface border-t border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveAppShowcase />
        </div>
      </section>

      {/* Interactive Capabilities Playground */}
      <CapabilitiesShowcase />

      {/* Wave Transition */}
      <WaveDivider />

      {/* Full Services Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-deep">
              End-to-End Capabilities
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
              Tailored for Kuwait & Gulf Enterprises
            </h2>
            <p className="text-base text-ink-muted">
              From interactive UI prototypes to App Store releases and KNET checkout integrations, we manage the entire lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.slice(0, 3).map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Portfolio Teaser */}
      <section className="py-24 bg-surface border-t border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest font-bold text-gold-deep">
                Case Studies
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
                Great design that works.
              </h2>
            </div>
            
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary-mid text-white font-bold text-sm shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-gold/30 hover:from-primary-mid hover:to-gold transition-all duration-300"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Scope Estimator Tool */}
      <section className="py-20 bg-white border-t border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectEstimator />
        </div>
      </section>

      {/* Verified Client Testimonials */}
      <section className="py-24 bg-surface border-t border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-deep">
              Client Feedback
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink">
              Recommended by leading companies across Kuwait.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTestimonials.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-8 border border-hairline space-y-6 flex flex-col justify-between hover:border-primary/40 transition-colors shadow-soft"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <Quote className="w-8 h-8 text-primary/30" />

                  <p className="text-sm text-ink leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-hairline flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-sm text-ink">
                      {item.author}
                    </h4>
                    <p className="text-xs text-ink-muted">
                      {item.role}, <span className="font-semibold text-primary">{item.company}</span>
                    </p>
                  </div>
                  <span className="text-[11px] font-medium text-ink-light">
                    {item.location}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Animated Stats Counter */}
      <StatCounter />

    </div>
  );
}
