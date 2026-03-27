"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const offset = {
      up:    { y: 28, x: 0 },
      down:  { y: -28, x: 0 },
      left:  { y: 0, x: 28 },
      right: { y: 0, x: -28 },
    }[direction];

    // Set initial state immediately
    gsap.set(el, { opacity: 0, ...offset });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.7,
          delay,
          ease: "power2.out",
          clearProps: "transform", // clean up after animation
        });
      },
    });

    // Safety fallback: if element is already visible on mount, reveal it
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.7,
        delay: delay + 0.1,
        ease: "power2.out",
        clearProps: "transform",
      });
    }

    return () => {
      trigger.kill();
    };
  }, [delay, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
