"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/animations/animated-background";
import GlowButton from "@/components/ui/glow-button";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      )
        .fromTo(
          ".hero-word",
          { opacity: 0, y: 40, rotateX: 40 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .fromTo(
          ".hero-scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.1"
        );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center pt-24">
        <div
          className="hero-badge inline-flex items-center gap-2 rounded-full border border-border-light bg-surface/40 px-4 py-1.5 text-xs text-text-secondary mb-8 backdrop-blur-sm opacity-0"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available for new projects
        </div>

        <h1
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
          style={{ perspective: "800px" }}
        >
          <span className="hero-word inline-block opacity-0">I build</span>{" "}
          <span className="hero-word inline-block opacity-0">interfaces</span>
          <br />
          <span className="hero-word inline-block opacity-0">that</span>{" "}
          <span className="hero-word inline-block gradient-text opacity-0">
            convert
          </span>{" "}
          <span className="hero-word inline-block gradient-text opacity-0">
            visitors
          </span>
          <br />
          <span className="hero-word inline-block opacity-0">into</span>{" "}
          <span className="hero-word inline-block opacity-0">customers</span>
        </h1>

        <p className="hero-sub text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed opacity-0">
          Specialized in SaaS dashboards, AI product interfaces, and
          high-converting landing pages. I turn your product vision into
          pixel-perfect, revenue-driving reality.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="hero-cta opacity-0 w-full sm:w-auto">
            <GlowButton href="#contact" cursorText="Chat" className="w-full sm:w-auto">
              Book a Call
            </GlowButton>
          </div>
          <div className="hero-cta opacity-0 w-full sm:w-auto">
            <GlowButton
              href="#work"
              variant="secondary"
              cursorText="Work"
              className="w-full sm:w-auto"
            >
              View My Work
            </GlowButton>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll mt-20 opacity-0">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-border-light mx-auto flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-1.5 rounded-full bg-accent-light"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
