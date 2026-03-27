"use client";

import SectionHeading from "@/components/ui/section-heading";
import TiltCard from "@/components/ui/tilt-card";
import Reveal from "@/components/animations/reveal";

const testimonials = [
  {
    quote:
      "Jai transformed our clunky dashboard into something our users actually love. Onboarding completion went up 52% in the first month. Worth every penny.",
    name: "Alex R.",
    role: "CEO, DataFlow AI",
    avatar: "A",
  },
  {
    quote:
      "We tried 3 developers before Jai. He was the first one who actually understood our product and built a landing page that converts. Our CPA dropped by 68%.",
    name: "Sarah K.",
    role: "Head of Growth, CloudSync",
    avatar: "S",
  },
  {
    quote:
      "Not just a developer — a product thinker. Jai pushed back on bad ideas and suggested better ones. Our AI tool went from 30% to 67% retention after his redesign.",
    name: "Marcus T.",
    role: "Founder, WriteAI",
    avatar: "M",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Testimonials"
          title="What clients say"
          description="Don't take my word for it — here's what people I've worked with have to say."
          className="mb-16"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <TiltCard className="h-full" tiltStrength={5}>
                <div className="relative rounded-2xl border border-border bg-surface/30 p-8 h-full flex flex-col backdrop-blur-sm">
                  {/* Subtle top glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, j) => (
                      <svg
                        key={j}
                        className="w-4 h-4 text-amber-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center text-accent-light text-sm font-semibold">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{t.name}</div>
                      <div className="text-xs text-text-muted">{t.role}</div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
