import React from "react";
import Image from "next/image";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
}

export default function Logo({
  variant = "light",
  size = "md",
  className = "",
  showText = true,
}: LogoProps) {
  const dimensions = {
    sm: { symbol: 30, text: "text-sm", subtext: "text-[7px]" },
    md: { symbol: 38, text: "text-base", subtext: "text-[8px]" },
    lg: { symbol: 50, text: "text-xl", subtext: "text-[10px]" },
  }[size];

  const isDark = variant === "dark";
  const textColor = isDark ? "text-white" : "text-slate-700";
  const subtextColor = isDark ? "text-brand-light" : "text-brand";

  return (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Brand symbol — the interlocking B/C mark */}
      <Image
        src={isDark ? "/logo-symbol-dark.png" : "/logo-symbol.png"}
        alt="Burhani Creation logo"
        width={399}
        height={439}
        className="shrink-0 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        style={{ height: dimensions.symbol }}
        priority
      />

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`font-display font-bold uppercase tracking-[0.08em] ${dimensions.text} ${textColor}`}
          >
            Burhani Creation
          </span>
          <span
            className={`uppercase font-semibold tracking-[0.3em] mt-1 ${dimensions.subtext} ${subtextColor}`}
          >
            Think Beyond the Wave
          </span>
        </div>
      )}
    </div>
  );
}
