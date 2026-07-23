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
    sm: { container: 38, text: "text-base", subtext: "text-[9px]" },
    md: { container: 46, text: "text-lg", subtext: "text-[10px]" },
    lg: { container: 60, text: "text-2xl", subtext: "text-xs" },
  }[size];

  const textColor = variant === "dark" ? "text-white" : "text-slate-900";
  const subtextColor = variant === "dark" ? "text-brand-light font-semibold" : "text-brand font-bold";

  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Circular brand emblem */}
      <div
        className="relative shrink-0 rounded-full overflow-hidden shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105"
        style={{ width: dimensions.container, height: dimensions.container }}
      >
        <Image
          src="/logo-bc.png"
          alt="Burhani Creation logo"
          width={120}
          height={120}
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-display font-extrabold tracking-tight ${dimensions.text} ${textColor}`}>
            Burhani<span className="text-brand">.</span>Creation
          </span>
          <span className={`uppercase tracking-[0.18em] ${dimensions.subtext} ${subtextColor}`}>
            Digital Agency
          </span>
        </div>
      )}
    </div>
  );
}
