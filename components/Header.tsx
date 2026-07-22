"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Phone, MessageSquare } from "lucide-react";
import { siteConfig } from "@/data/site";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F6F7FF]/90 backdrop-blur-md shadow-sm border-b border-[#E3E6F7] py-3.5"
          : "bg-[#F6F7FF]/70 backdrop-blur-sm border-b border-[#E3E6F7]/60 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#2151F5] via-[#7B3FF2] to-[#E5389E] flex items-center justify-center text-white font-bold text-xl shadow-md shadow-[#2151F5]/25 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#E5389E]/30 transition-all duration-300">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#2151F5] via-[#7B3FF2] to-[#E5389E] blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300 -z-10" />
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-extrabold tracking-tight text-[#10122B] group-hover:text-[#2151F5] transition-colors">
                Burhani Creation
              </span>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-[#E5389E] -mt-1">
                Think Beyond the Wave
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-white/80 p-1.5 rounded-full border border-[#E3E6F7] shadow-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-[#2151F5] font-semibold"
                      : "text-[#4B4F72] hover:text-[#10122B] hover:bg-[#EAF0FF]/50"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-gradient-to-r from-[#EAF0FF] to-[#FDEAF7] rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={siteConfig.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-[#E3E6F7] bg-white text-[#10122B] hover:text-[#2151F5] hover:border-[#2151F5]/40 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <a
              href="#request-quote"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#2151F5] to-[#7B3FF2] text-white font-semibold text-sm shadow-md shadow-[#2151F5]/25 hover:shadow-lg hover:shadow-[#E5389E]/30 hover:from-[#1638C2] hover:to-[#E5389E] transition-all duration-300 active:scale-95 overflow-hidden"
            >
              <span>Get a Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl border border-[#E3E6F7] bg-white text-[#10122B] focus:outline-none focus:ring-2 focus:ring-[#2151F5]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-b border-[#E3E6F7] bg-[#F6F7FF] px-4 pt-3 pb-6 shadow-xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 rounded-xl font-medium text-base transition-colors ${
                      isActive
                        ? "bg-[#EAF0FF] text-[#2151F5] font-semibold"
                        : "text-[#4B4F72] hover:bg-white hover:text-[#10122B]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-3 mt-2 border-t border-[#E3E6F7] flex flex-col gap-3">
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#E3E6F7] bg-white text-[#10122B] font-medium"
                >
                  <Phone className="w-4 h-4 text-[#2151F5]" />
                  <span>Call {siteConfig.contact.phone}</span>
                </a>
                <a
                  href="#request-quote"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#2151F5] to-[#7B3FF2] text-white font-semibold shadow-md"
                >
                  <span>Get a Quote</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
