"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/section-heading";
import GlowButton from "@/components/ui/glow-button";
import {
  DashboardMockup,
  LandingPageMockup,
  AIWritingMockup,
} from "@/components/ui/mockups";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "AI Analytics Dashboard",
    category: "SaaS Product",
    problem:
      "A growing AI startup had powerful analytics under the hood, but their dashboard was cluttered, slow, and causing a 35% drop-off during onboarding. Users couldn't find the insights that mattered.",
    solution:
      "Redesigned the entire dashboard from scratch — simplified navigation, added real-time data visualizations, built an intuitive AI insights panel, and optimized for sub-second load times.",
    results: [
      { metric: "52%", label: "Onboarding completion increase" },
      { metric: "60%", label: "Faster time-to-insight" },
      { metric: "Series A", label: "Closed within 3 months" },
    ],
    tech: ["Next.js", "Tailwind", "D3.js", "WebSockets"],
    Mockup: DashboardMockup,
    accentFrom: "from-indigo-500/10",
    accentTo: "to-purple-500/10",
  },
  {
    title: "SaaS Landing Page Redesign",
    category: "High-Converting Landing Page",
    problem:
      "A B2B SaaS tool was spending $15k/month on ads but converting at just 1.2%. Their landing page was generic, had weak CTAs, and didn't communicate value above the fold.",
    solution:
      "Built a conversion-focused landing page with benefit-driven copy, social proof strategically placed, animated product demos, and a frictionless signup flow with progressive disclosure.",
    results: [
      { metric: "3.8%", label: "Conversion rate (from 1.2%)" },
      { metric: "68%", label: "Lower cost per acquisition" },
      { metric: "$40k/mo", label: "Scaled ad spend profitably" },
    ],
    tech: ["Next.js", "Framer Motion", "Tailwind", "Vercel"],
    Mockup: LandingPageMockup,
    accentFrom: "from-emerald-500/10",
    accentTo: "to-cyan-500/10",
  },
  {
    title: "AI Writing Tool Interface",
    category: "AI Product UI",
    problem:
      "An AI writing assistant had powerful GPT-4 capabilities but the interface felt like a developer tool. Non-technical users were churning within the first week — 70% never came back.",
    solution:
      "Designed a clean, distraction-free writing environment with inline AI suggestions, real-time collaboration features, and a guided onboarding flow that taught users through doing.",
    results: [
      { metric: "67%", label: "7-day retention (from 30%)" },
      { metric: "4x", label: "Average session time" },
      { metric: "#2", label: "Product Hunt launch" },
    ],
    tech: ["React", "Tailwind", "OpenAI API", "WebSockets"],
    Mockup: AIWritingMockup,
    accentFrom: "from-violet-500/10",
    accentTo: "to-pink-500/10",
  },
];

/* ─── Lazy-mount mockup when scrolled into view ────────────── */
function MockupContainer({ Mockup }: { Mockup: React.ComponentType }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "50px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-xl overflow-hidden border border-border bg-[#080810] mb-6"
    >
      <div className="aspect-video sm:aspect-[16/9] lg:aspect-[16/8] transform scale-[0.99] sm:scale-100 origin-center">
        {mounted ? <Mockup /> : <div className="w-full h-full" />}
      </div>
    </div>
  );
}

/* ─── Animated count-up for result metrics ─────────────────── */
function AnimatedMetric({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(value);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
    if (!match) return; // non-numeric like "Series A"

    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr.replace(/,/g, ""));
    const hasDecimal = numStr.includes(".");
    const decimals = hasDecimal ? numStr.split(".")[1].length : 0;
    const hasComma = numStr.includes(",");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              let formatted = hasDecimal
                ? obj.val.toFixed(decimals)
                : Math.round(obj.val).toString();
              if (hasComma) {
                formatted = Number(formatted).toLocaleString("en-US", {
                  minimumFractionDigits: decimals,
                  maximumFractionDigits: decimals,
                });
              }
              setDisplay(`${prefix}${formatted}${suffix}`);
            },
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <div ref={ref}>{display}</div>;
}

/* ─── Main Component ───────────────────────────────────────── */
export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll<HTMLElement>(".work-card");
      gsap.set(cards, { y: 80, opacity: 0 });

      ScrollTrigger.create({
        trigger: grid,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-20 sm:py-24 md:py-32 relative"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 lg:px-20">
        <SectionHeading
          label="Selected Work"
          title={
            <>
              Results that speak louder
              <br />
              than portfolios
            </>
          }
          description="Every project is a story of transformation. Here's how I helped clients turn struggling products into growth engines."
          className="mb-12 sm:mb-16"
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((project) => {
            const { Mockup } = project;
            return (
              <article
                key={project.title}
                className="work-card group relative rounded-2xl border border-border bg-surface/20 overflow-hidden transition-all duration-500 hover:border-border-light flex flex-col"
              >
                {/* Hover gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.accentFrom} ${project.accentTo} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                />

                <div className="relative p-5 sm:p-6 flex flex-col flex-1">
                  {/* Header */}
                  <div className="mb-5">
                    <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-accent-light bg-accent/10 border border-accent/15 px-2.5 py-0.5 rounded-full mb-3">
                      {project.category}
                    </span>
                    <h3 className="text-lg sm:text-xl lg:text-lg font-bold leading-tight">
                      {project.title}
                    </h3>
                  </div>

                  {/* Mockup — lazy mounted on scroll */}
                  <MockupContainer Mockup={Mockup} />

                  {/* Problem / Solution — always stacked in grid */}
                  <div className="space-y-4 mb-5">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400/70 shrink-0" />
                        <h4 className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                          The Problem
                        </h4>
                      </div>
                      <p className="text-text-secondary text-xs leading-relaxed line-clamp-3">
                        {project.problem}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/70 shrink-0" />
                        <h4 className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                          The Solution
                        </h4>
                      </div>
                      <p className="text-text-secondary text-xs leading-relaxed line-clamp-3">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mb-5 mt-auto">
                    <h4 className="text-[10px] font-semibold text-accent-light uppercase tracking-wider mb-3">
                      The Results
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {project.results.map((r) => (
                        <div
                          key={r.label}
                          className="text-center p-2.5 sm:p-3 rounded-lg bg-accent/[0.04] border border-accent/10"
                        >
                          <div className="text-base sm:text-lg lg:text-base font-bold text-foreground mb-0.5">
                            <AnimatedMetric value={r.metric} />
                          </div>
                          <div className="text-[9px] sm:text-[10px] text-text-muted leading-snug">
                            {r.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-surface-light border border-border text-text-secondary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mid-page CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-text-secondary mb-6">
            Want results like these for your product?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlowButton href="https://calendly.com/jairwt" external>
              Start a Project
            </GlowButton>
            <GlowButton href="#services" variant="secondary">
              See All Services
            </GlowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
