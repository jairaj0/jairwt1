"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 40, suffix: "+", label: "Projects Delivered" },
  { value: 15, suffix: "+", label: "Global Clients" },
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const counters = el.querySelectorAll<HTMLSpanElement>(".counter-value");

    counters.forEach((counter, i) => {
      const target = stats[i].value;
      const obj = { val: 0 };

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 1.5,
            delay: i * 0.15,
            ease: "power2.out",
            onUpdate: () => {
              counter.textContent = Math.round(obj.val).toString();
            },
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return (
    <section ref={ref} className="relative py-20 border-y border-border">
      {/* Subtle glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                <span className="counter-value">0</span>
                <span className="text-accent-light">{stat.suffix}</span>
              </div>
              <div className="text-sm text-text-muted group-hover:text-text-secondary transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
}
