"use client";

import Reveal from "@/components/animations/reveal";
import SectionHeading from "@/components/ui/section-heading";
import GlowButton from "@/components/ui/glow-button";
import { DashboardMockup, LandingPageMockup, AIWritingMockup } from "@/components/ui/mockups";

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

export default function CaseStudies() {
  return (
    <section id="work" className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-6xl px-6">
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
          className="mb-16"
        />

        <div className="space-y-20">
          {projects.map((project, i) => {
            const { Mockup } = project;
            return (
              <Reveal key={project.title} delay={0}>
                <article className={`group relative rounded-2xl border border-border bg-surface/20 overflow-hidden transition-all duration-500 hover:border-border-light`}>
                  {/* Subtle hover gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.accentFrom} ${project.accentTo} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                  <div className="relative p-8 sm:p-10">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
                      <span className="text-xs font-semibold uppercase tracking-widest text-accent-light bg-accent/10 border border-accent/15 px-3 py-1 rounded-full w-fit">
                        {project.category}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold">
                        {project.title}
                      </h3>
                    </div>

                    {/* Problem / Solution */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-8">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400/70 shrink-0" />
                          <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                            The Problem
                          </h4>
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {project.problem}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/70 shrink-0" />
                          <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                            The Solution
                          </h4>
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    {/* SVG Mockup */}
                    <div className="rounded-xl overflow-hidden border border-border mb-8 bg-[#080810]">
                      <div className="aspect-[16/7]">
                        <Mockup />
                      </div>
                    </div>

                    {/* Results */}
                    <div className="mb-6">
                      <h4 className="text-xs font-semibold text-accent-light uppercase tracking-wider mb-4">
                        The Results
                      </h4>
                      <div className="grid grid-cols-3 gap-3 sm:gap-4">
                        {project.results.map((r) => (
                          <div
                            key={r.label}
                            className="text-center p-4 rounded-xl bg-accent/[0.04] border border-accent/10"
                          >
                            <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                              {r.metric}
                            </div>
                            <div className="text-xs text-text-muted leading-snug">
                              {r.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1 rounded-full bg-surface-light border border-border text-text-secondary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Mid-page CTA */}
        <div className="mt-16 text-center">
          <p className="text-text-secondary mb-6">
            Want results like these for your product?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlowButton href="#contact">Start a Project</GlowButton>
            <GlowButton href="#services" variant="secondary">
              See All Services
            </GlowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
