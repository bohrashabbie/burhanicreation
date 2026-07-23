import React from "react";
import { cn } from "@/lib/cn";

export default function SectionHeading({
  eyebrow,
  heading,
  subtext,
  align = "start",
  className,
}: {
  eyebrow?: string;
  heading: React.ReactNode;
  subtext?: string;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div className={cn("space-y-3 max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] text-gold-deep font-semibold">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink tracking-tight leading-tight">
        {heading}
      </h2>
      {subtext && <p className="text-ink-muted text-base leading-relaxed">{subtext}</p>}
    </div>
  );
}
