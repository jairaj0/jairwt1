"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import Reveal from "@/components/animations/reveal";
import GlowButton from "@/components/ui/glow-button";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const blobs = container.querySelectorAll<HTMLDivElement>(".about-blob");
    const ring = container.querySelector<HTMLDivElement>(".about-ring");

    const ctx = gsap.context(() => {
      // Blob floating — slow, organic, infinite
      gsap.to(blobs[0], {
        x: 25, y: -20, scale: 1.08,
        duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to(blobs[1], {
        x: -20, y: 15, scale: 0.95,
        duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to(blobs[2], {
        x: 15, y: 20, scale: 1.05,
        duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut",
      });

      // Ring rotation — very slow
      if (ring) {
        gsap.to(ring, {
          rotation: 360,
          duration: 40,
          repeat: -1,
          ease: "none",
        });
      }
    }, container);

    // Hover: scale up image + intensify glow
    const imgEl = container.querySelector<HTMLDivElement>(".about-img");
    const onEnter = () => {
      gsap.to(imgEl, { scale: 1.04, duration: 0.5, ease: "power2.out" });
      blobs.forEach(b => gsap.to(b, { opacity: 0.9, duration: 0.5 }));
    };
    const onLeave = () => {
      gsap.to(imgEl, { scale: 1, duration: 0.6, ease: "power2.out" });
      blobs.forEach(b => gsap.to(b, { opacity: 0.6, duration: 0.6 }));
    };

    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      ctx.revert();
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section id="about" className="py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Reveal direction="left">
            <div ref={containerRef} className="relative group">
              <div className="aspect-[4/5] rounded-2xl bg-surface border border-border overflow-hidden relative">
                {/* Grid pattern */}
                <div className="absolute inset-0 grid-bg opacity-20" />

                {/* ─── GSAP animated background blobs ─── */}
                <div
                  className="about-blob absolute top-[10%] left-[15%] w-[55%] h-[55%] rounded-full opacity-60 will-change-transform"
                  style={{
                    background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
                    filter: "blur(50px)",
                  }}
                />
                <div
                  className="about-blob absolute bottom-[15%] right-[10%] w-[50%] h-[50%] rounded-full opacity-60 will-change-transform"
                  style={{
                    background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
                    filter: "blur(60px)",
                  }}
                />
                <div
                  className="about-blob absolute top-[40%] left-[30%] w-[45%] h-[45%] rounded-full opacity-60 will-change-transform"
                  style={{
                    background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)",
                    filter: "blur(45px)",
                  }}
                />

                {/* Rotating decorative ring */}
                <div className="about-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full border border-dashed border-accent/10 will-change-transform" />

                {/* Profile image — transparent PNG sits on top */}
                <div className="about-img absolute inset-0 flex items-end justify-center will-change-transform">
                  <Image
                    src="/images/profile.webp"
                    alt="Jai Rawat — Frontend Developer & Product Designer"
                    width={800}
                    height={800}
                    quality={90}
                    className="w-[90%] h-auto object-contain drop-shadow-[0_10px_40px_rgba(99,102,241,0.15)]"
                    sizes="(max-width: 768px) 90vw, 45vw"
                  />
                </div>

                {/* Hover overlay — subtle glow */}
                <div className="absolute inset-0 bg-accent/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Outer decorative glows */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-accent/8 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none" />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-accent-light text-sm font-medium tracking-wider uppercase mb-3">
              About Me
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-[1.15]">
              I turn product ideas
              <br />
              into revenue machines
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                I&apos;m a frontend developer and product designer who
                specializes in building interfaces for SaaS products and AI
                tools. I don&apos;t just write code — I obsess over conversion
                rates, user flows, and the micro-interactions that make people
                trust your product.
              </p>
              <p>
                Over the past 3+ years, I&apos;ve worked with startups and
                businesses across 8 countries, delivering 40+ projects that
                drove real business results — not just pretty screens.
              </p>
              <p>
                My sweet spot? Taking complex, powerful products and making them
                feel effortless. If your product is great under the hood but
                your users aren&apos;t sticking around, we should talk.
              </p>
            </div>
            <div className="mt-8">
              <GlowButton href="https://calendly.com/jairwt" external cursorText="Book">
                Work With Me
              </GlowButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
