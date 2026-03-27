"use client";

import { useLenis } from "@/components/animations/smooth-scroll";
import { useCallback } from "react";

interface GlowButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  cursorText?: string;
  className?: string;
}

export default function GlowButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: GlowButtonProps) {
  const lenis = useLenis();

  const base =
    "relative inline-flex items-center justify-center px-7 py-3.5 rounded-full font-medium text-sm transition-all duration-200 overflow-hidden select-none";

  const variants = {
    primary:
      "bg-accent text-white hover:bg-accent-light hover:shadow-[0_0_28px_rgba(99,102,241,0.4)] hover:scale-[1.04] active:scale-[0.97]",
    secondary:
      "border border-border-light text-foreground hover:bg-surface-light hover:border-accent/25 hover:scale-[1.04] active:scale-[0.97]",
  };

  const isInternal = href.startsWith("#");

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!isInternal) return; // let external links work normally
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(href, { offset: -80, duration: 1.2 });
      } else {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [href, isInternal, lenis],
  );

  return (
    <a
      href={href}
      data-cursor
      onClick={isInternal ? handleClick : undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
