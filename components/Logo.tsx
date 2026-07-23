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
    sm: { container: 36, text: "text-base", subtext: "text-[9px]" },
    md: { container: 44, text: "text-lg", subtext: "text-[10px]" },
    lg: { container: 56, text: "text-2xl", subtext: "text-xs" },
  }[size];

  const textColor = variant === "dark" ? "text-white" : "text-slate-900";
  const subtextColor = variant === "dark" ? "text-amber-400 font-semibold" : "text-amber-600 font-bold";
  
  const iconBg = variant === "dark" 
    ? "bg-slate-900/90 border-slate-700/80 shadow-md ring-1 ring-white/10" 
    : "bg-white border-slate-200/90 shadow-sm ring-1 ring-slate-900/5";

  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* High-Resolution Emblem Container */}
      <div
        className={`relative flex items-center justify-center rounded-xl border p-1.5 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg shrink-0 ${iconBg}`}
        style={{ width: dimensions.container, height: dimensions.container }}
      >
        <Image
          src="/logo-icon.png"
          alt="Burhani Creation Logo Mark"
          width={80}
          height={80}
          className="object-contain w-full h-full drop-shadow-sm"
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-display font-extrabold tracking-tight ${dimensions.text} ${textColor}`}>
            Burhani<span className="text-amber-500">.</span>Creation
          </span>
          <span className={`uppercase tracking-[0.18em] ${dimensions.subtext} ${subtextColor}`}>
            Digital Agency
          </span>
        </div>
      )}
    </div>
  );
}
