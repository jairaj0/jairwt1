"use client";

import Reveal from "@/components/animations/reveal";
import GlowButton from "@/components/ui/glow-button";

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Reveal direction="left">
            <div className="relative group">
              <div className="aspect-[4/5] rounded-2xl bg-surface border border-border overflow-hidden relative">
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-text-muted">
                    <svg
                      className="w-16 h-16 mx-auto mb-3 opacity-20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                    <span className="text-xs">Your Photo</span>
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Decorative glow */}
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
              <GlowButton href="#contact" cursorText="Chat">
                Work With Me
              </GlowButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
