"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/section-heading";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "I dive deep into your product, users, and goals. Understanding the problem is 80% of the solution. We align on scope, timeline, and what success looks like.",
  },
  {
    number: "02",
    title: "UI/UX Design",
    description:
      "Wireframes to high-fidelity mockups. Every pixel has a purpose — guiding users toward conversion. You review, we iterate, until it's perfect.",
  },
  {
    number: "03",
    title: "Development",
    description:
      "Clean, performant code using modern tools. I build with scalability in mind so your product grows with you. Regular check-ins keep us aligned.",
  },
  {
    number: "04",
    title: "Delivery",
    description:
      "Deployed, tested, and optimized. I hand off clean code with documentation, and provide support to make sure everything runs smoothly post-launch.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const ctx = gsap.context(() => {
      // Animate the vertical flowing line
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 1,
          },
        }
      );

      // Stagger step reveals
      gsap.fromTo(
        section.querySelectorAll(".process-step"),
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-24 sm:py-32 border-t border-border relative overflow-hidden"
    >
      {/* Data flow background lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-accent/[0.04] to-transparent"
            style={{ left: `${15 + i * 18}%` }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Process"
          title={
            <>
              How we work together
            </>
          }
          description="A transparent, collaborative process designed to deliver exceptional results — on time, every time."
          className="mb-16"
        />

        <div className="relative">
          {/* Animated progress line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden lg:block">
            <div
              ref={lineRef}
              className="w-full h-full bg-gradient-to-b from-accent via-accent-light to-accent/30 origin-top"
              style={{ transformOrigin: "top" }}
            />
          </div>

          <div className="space-y-12 lg:pl-20">
            {steps.map((step) => (
              <div
                key={step.number}
                className="process-step relative opacity-0"
              >
                {/* Dot on timeline */}
                <div className="absolute -left-[calc(5rem+4.5px)] top-2 w-[9px] h-[9px] rounded-full bg-accent border-2 border-background hidden lg:block" />

                <div className="group rounded-2xl border border-border bg-surface/30 p-8 transition-all duration-500 hover:border-accent/20 hover:bg-surface/50">
                  <span className="text-4xl font-bold text-accent/15 mb-3 block font-mono">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-accent-light transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
