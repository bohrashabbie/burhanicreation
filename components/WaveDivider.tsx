"use client";

import React from "react";
import { motion } from "framer-motion";

interface WaveDividerProps {
  className?: string;
  flip?: boolean;
}

export default function WaveDivider({ className = "", flip = false }: WaveDividerProps) {
  return (
    <div className={`w-full overflow-hidden leading-none select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-8 sm:h-12 md:h-16 ${flip ? "rotate-180" : ""}`}
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 30C150 10 350 50 600 30C850 10 1050 50 1200 30V60H0V30Z"
          fill="#F6F7FF"
        />
        <motion.path
          d="M0 30C150 10 350 50 600 30C850 10 1050 50 1200 30"
          stroke="#2151F5"
          strokeWidth="1.5"
          strokeOpacity="0.3"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.3 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}
