import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "gold" | "silver" | "neutral";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, tone = "neutral", ...props }, ref) => {
    const toneClasses =
      tone === "gold"
        ? "border-gold-400/60 text-gold-400"
        : tone === "silver"
        ? "border-silver-300/60 text-silver-300"
        : "border-white/20 text-zinc-200";

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs tracking-wide uppercase bg-black/40",
          toneClasses,
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

