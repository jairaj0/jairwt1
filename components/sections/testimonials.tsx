"use client";

import SectionHeading from "@/components/ui/section-heading";

// ─── Real Fiverr reviews ────────────────────────────────────
const reviews = [
  {
    name: "johnmay88",
    country: "Italy",
    tag: "Web3 Project",
    text: "Outstanding work, dude knows what he's doing, best web3 developer I met here on Fiverr.",
    repeat: true,
  },
  {
    name: "shadow_offer",
    country: "South Korea",
    tag: "Web3 Project",
    text: "He is a pro... very satisfied with results and attitude.",
    repeat: true,
  },
  {
    name: "lucasdenali",
    country: "UAE",
    tag: "SaaS UI",
    text: "Exceptional experience! Professionalism and code expertise are top level.",
  },
  {
    name: "maxvolovikov",
    country: "USA",
    tag: "Landing Page",
    text: "Great timing and good communication skills.",
  },
  {
    name: "ixdesignstudios",
    country: "USA",
    tag: "SaaS UI",
    text: "Top notch work. Very professional and creative.",
  },
  {
    name: "renologgi",
    country: "Sweden",
    tag: "SaaS UI",
    text: "Exceeded expectations with professional and bug-free code.",
  },
  {
    name: "thriv3withme",
    country: "USA",
    tag: "Landing Page",
    text: "Delivered ahead of time... dynamic and reliable.",
  },
  {
    name: "mobidown",
    country: "Algeria",
    tag: "Web3 Project",
    text: "Reliable, professional, fast. Highly recommended for Web3 work.",
  },
  {
    name: "annalilii",
    country: "France",
    tag: "Web3 Project",
    text: "Exceptional expertise in Web3 integration. Highly recommend.",
  },
  {
    name: "johnmay88",
    country: "Italy",
    tag: "Landing Page",
    text: "I'm thrilled with the Web3 crypto landing page... sleek, modern, highly functional. Highly recommend.",
    repeat: true,
  },
];

// Split into two rows
const row1 = reviews.slice(0, 5);
const row2 = reviews.slice(5);

// ─── Star SVG ───────────────────────────────────────────────
function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Testimonial card ───────────────────────────────────────
function TestimonialCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="group relative w-[340px] shrink-0 rounded-2xl border border-white/[0.07] bg-[#0f0f16]/60 backdrop-blur-sm p-6 transition-all duration-300 hover:border-accent/20 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(99,102,241,0.08)]">
      {/* Top edge glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <Stars />

      <p className="text-[13px] text-[#c8c8d0] leading-relaxed mt-4 mb-5">
        &ldquo;{review.text}&rdquo;
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-accent/12 border border-accent/20 flex items-center justify-center text-accent-light text-xs font-semibold uppercase">
            {review.name[0]}
          </div>
          <div>
            <div className="text-sm font-medium text-[#e0e0e6]">
              {review.name}
              {review.repeat && (
                <span className="ml-1.5 text-[9px] text-emerald-400/70 font-normal">Repeat Client</span>
              )}
            </div>
            <div className="text-[11px] text-[#5c5c6b]">{review.country}</div>
          </div>
        </div>
        <span className="text-[9px] text-accent-light/50 bg-accent/[0.06] border border-accent/10 px-2 py-0.5 rounded-full">
          {review.tag}
        </span>
      </div>
    </div>
  );
}

// ─── Marquee row ────────────────────────────────────────────
// Pure CSS infinite scroll — no JS, no re-renders, 60fps
function MarqueeRow({
  items,
  direction = "left",
  speed = 35,
}: {
  items: typeof reviews;
  direction?: "left" | "right";
  speed?: number;
}) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      className="group/marquee flex overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="flex gap-5 shrink-0 group-hover/marquee:[animation-play-state:paused]"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((review, i) => (
          <TestimonialCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}

// ─── Main section ───────────────────────────────────────────
export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32 border-t border-border overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 mb-14">
        <SectionHeading
          label="Testimonials"
          title="Trusted by clients worldwide"
          description="Real reviews from real projects. Here's what clients say after working with me."
        />
      </div>

      {/* Dual marquee rows — opposite directions */}
      <div className="space-y-5">
        <MarqueeRow items={row1} direction="left" speed={40} />
        <MarqueeRow items={row2} direction="right" speed={45} />
      </div>

      {/* Fiverr badge */}
      <div className="mt-10 text-center">
        <span className="text-[11px] text-[#5c5c6b]">
          All reviews verified on{" "}
          <a
            href="https://www.fiverr.com/blockweb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-light/60 hover:text-accent-light transition-colors"
          >
            Fiverr
          </a>
        </span>
      </div>
    </section>
  );
}
