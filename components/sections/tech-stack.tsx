"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/section-heading";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Framer Motion", category: "Animation" },
  { name: "GSAP", category: "Animation" },
  { name: "REST APIs", category: "Integration" },
  { name: "WebSockets", category: "Real-time" },
  { name: "Figma", category: "Design" },
  { name: "Vercel", category: "Deployment" },
];

export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".tech-badge"),
        { opacity: 0, scale: 0.8, y: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Floating particles
      el.querySelectorAll<HTMLDivElement>(".float-particle").forEach(
        (particle) => {
          gsap.to(particle, {
            y: `random(-20, 20)`,
            x: `random(-10, 10)`,
            duration: `random(3, 6)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 sm:py-32 border-t border-border relative overflow-hidden">
      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { l: 12, t: 15 }, { l: 28, t: 45 }, { l: 45, t: 22 },
          { l: 62, t: 70 }, { l: 78, t: 35 }, { l: 88, t: 58 },
          { l: 20, t: 80 }, { l: 55, t: 88 }, { l: 35, t: 55 },
          { l: 72, t: 18 }, { l: 48, t: 42 }, { l: 15, t: 65 },
        ].map((pos, i) => (
          <div
            key={i}
            className="float-particle absolute w-1 h-1 rounded-full bg-accent/20"
            style={{ left: `${pos.l}%`, top: `${pos.t}%` }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Tech Stack"
          title="Built with modern tools"
          description="I use the latest, battle-tested technologies to build fast, scalable, and maintainable products."
          className="mb-16"
        />

        <div className="flex flex-wrap gap-3">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="tech-badge group flex items-center gap-3 rounded-full border border-border bg-surface/40 px-5 py-3 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5 hover:scale-[1.05] cursor-default backdrop-blur-sm opacity-0"
            >
              <span className="text-sm font-medium text-foreground">
                {tech.name}
              </span>
              <span className="text-xs text-text-muted group-hover:text-accent-light transition-colors">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
