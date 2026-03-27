"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlowButton from "@/components/ui/glow-button";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 sm:py-32 border-t border-border relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="cta-content relative mx-auto max-w-3xl px-6 text-center opacity-0">
        <p className="text-accent-light text-sm font-medium tracking-wider uppercase mb-3">
          Start a Project
        </p>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
          Ready to build something
          <br />
          <span className="gradient-text">that actually converts?</span>
        </h2>
        <p className="text-text-secondary text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Let&apos;s talk about your product. Whether it&apos;s a new SaaS
          dashboard, an AI tool interface, or a landing page that needs to
          perform — I&apos;ll make it happen.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <GlowButton
            href="https://calendly.com/jairwt"
            external
            cursorText="Book"
          >
            Book a Free Call
          </GlowButton>
          <GlowButton
            href="https://wa.me/918789528633"
            variant="secondary"
            external
            cursorText="Chat"
          >
            WhatsApp Me
          </GlowButton>
          <GlowButton
            href="https://www.fiverr.com/blockweb?public_mode=true"
            variant="secondary"
            external
            cursorText="Hire"
          >
            Hire on Fiverr
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
