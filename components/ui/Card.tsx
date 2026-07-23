import React from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  [key: string]: unknown;
}

export default function Card({ className, children, as: Tag = "div", ...rest }: CardProps) {
  return (
    <Tag
      className={cn(
        "bg-card border border-hairline rounded-lg transition-colors duration-200 hover:border-ink/30",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
