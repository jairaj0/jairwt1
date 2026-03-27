"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/*
 * 4-Layer premium hero background
 *
 * L1 — Gradient blobs (GSAP float + yoyo, GPU-only transforms)
 * L2 — Grid with subtle parallax on mouse
 * L3 — Floating particles (GSAP random drift)
 * L4 — Cursor radial glow (lerp-follow via GSAP ticker)
 *
 * All animation uses transform + opacity only — 60fps safe.
 */

// Deterministic particle positions so SSR matches client
const PARTICLES = [
  { x: 8,  y: 12, s: 2,   o: 0.25 },
  { x: 15, y: 55, s: 1.5, o: 0.18 },
  { x: 22, y: 30, s: 2.5, o: 0.3  },
  { x: 32, y: 78, s: 1,   o: 0.15 },
  { x: 40, y: 18, s: 2,   o: 0.22 },
  { x: 48, y: 62, s: 1.5, o: 0.2  },
  { x: 55, y: 40, s: 3,   o: 0.28 },
  { x: 62, y: 85, s: 1,   o: 0.15 },
  { x: 70, y: 25, s: 2,   o: 0.25 },
  { x: 78, y: 50, s: 1.5, o: 0.18 },
  { x: 85, y: 15, s: 2,   o: 0.22 },
  { x: 90, y: 70, s: 1,   o: 0.15 },
  { x: 35, y: 45, s: 2.5, o: 0.2  },
  { x: 58, y: 22, s: 1.5, o: 0.18 },
  { x: 75, y: 65, s: 2,   o: 0.25 },
  { x: 18, y: 80, s: 1.5, o: 0.17 },
  { x: 45, y: 90, s: 1,   o: 0.12 },
  { x: 82, y: 38, s: 2.5, o: 0.22 },
];

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    const grid = gridRef.current;
    if (!container || !glow || !grid) return;

    const blobs = container.querySelectorAll<HTMLDivElement>(".hero-blob");
    const particles = container.querySelectorAll<HTMLDivElement>(".hero-particle");

    // --- Cursor state (lerp-smoothed) ---
    const mouse = { x: 0.5, y: 0.5 };   // normalised 0–1
    const smooth = { x: 0.5, y: 0.5 };   // lerped value

    const ctx = gsap.context(() => {
      // ─── L1: Blob floating ───────────────────────────────
      gsap.to(blobs[0], {
        x: 70, y: 50,
        duration: 16, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to(blobs[1], {
        x: -55, y: -40,
        duration: 20, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to(blobs[2], {
        x: 40, y: -55,
        duration: 14, repeat: -1, yoyo: true, ease: "sine.inOut",
      });

      // ─── L3: Particle floating ──────────────────────────
      particles.forEach((p, i) => {
        gsap.to(p, {
          y: `random(-18, 18)`,
          x: `random(-12, 12)`,
          duration: 3 + (i % 4) * 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.15,
        });
      });
    }, container);

    // ─── GSAP ticker: smooth cursor follow ────────────────
    const LERP = 0.07; // low = smooth trail, high = snappy

    const tickerFn = () => {
      smooth.x += (mouse.x - smooth.x) * LERP;
      smooth.y += (mouse.y - smooth.y) * LERP;

      // L4: Cursor glow — follows smoothly
      gsap.set(glow, {
        x: smooth.x * window.innerWidth,
        y: smooth.y * window.innerHeight,
      });

      // L2: Grid subtle parallax
      const gx = (smooth.x - 0.5) * 12;
      const gy = (smooth.y - 0.5) * 12;
      gsap.set(grid, { x: gx, y: gy });

      // L1: Blob parallax offset (layered depth)
      blobs.forEach((blob, i) => {
        const depth = (i + 1) * 0.35;
        gsap.set(blob, {
          "--px": `${(smooth.x - 0.5) * 24 * depth}px`,
          "--py": `${(smooth.y - 0.5) * 24 * depth}px`,
        });
      });

      // L3: Particles react to cursor proximity
      particles.forEach((p) => {
        const rect = p.getBoundingClientRect();
        const px = rect.left + rect.width / 2;
        const py = rect.top + rect.height / 2;
        const cx = smooth.x * window.innerWidth;
        const cy = smooth.y * window.innerHeight;
        const dist = Math.hypot(px - cx, py - cy);
        const maxDist = 250;
        if (dist < maxDist) {
          const strength = 1 - dist / maxDist;
          const angle = Math.atan2(py - cy, px - cx);
          gsap.to(p, {
            "--rx": `${Math.cos(angle) * strength * 10}px`,
            "--ry": `${Math.sin(angle) * strength * 10}px`,
            opacity: 0.15 + strength * 0.4,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(p, {
            "--rx": "0px",
            "--ry": "0px",
            duration: 1.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });
    };

    gsap.ticker.add(tickerFn);

    // ─── Mouse event ──────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      ctx.revert();
      gsap.ticker.remove(tickerFn);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* ── L2: Grid with parallax ─────────────────────── */}
      <div
        ref={gridRef}
        className="absolute -inset-4 will-change-transform"
      >
        <div className="absolute inset-0 grid-bg opacity-[0.45]" />
        {/* Horizontal accent lines */}
        <div
          className="absolute left-0 right-0 top-[30%] h-px opacity-[0.04]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }}
        />
        <div
          className="absolute left-0 right-0 top-[70%] h-px opacity-[0.03]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)" }}
        />
      </div>

      {/* ── Noise texture ──────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── L1: Gradient blobs ─────────────────────────── */}
      <div
        className="hero-blob absolute top-[10%] left-[15%] w-[550px] h-[550px] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, rgba(99,102,241,0.03) 50%, transparent 70%)",
          filter: "blur(60px)",
          translate: "var(--px, 0) var(--py, 0)",
        }}
      />
      <div
        className="hero-blob absolute bottom-[5%] right-[10%] w-[480px] h-[480px] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0.02) 50%, transparent 70%)",
          filter: "blur(80px)",
          translate: "var(--px, 0) var(--py, 0)",
        }}
      />
      <div
        className="hero-blob absolute top-[35%] left-[40%] w-[600px] h-[600px] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 60%)",
          filter: "blur(50px)",
          translate: "var(--px, 0) var(--py, 0)",
        }}
      />

      {/* ── L3: Floating particles ─────────────────────── */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="hero-particle absolute rounded-full bg-accent-light will-change-transform"
          style={{
            width: p.s,
            height: p.s,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.o,
            translate: "var(--rx, 0) var(--ry, 0)",
          }}
        />
      ))}

      {/* ── L4: Cursor radial glow ─────────────────────── */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] rounded-full will-change-transform pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.03) 35%, transparent 65%)",
          filter: "blur(40px)",
          translate: "-50% -50%",
          top: 0,
          left: 0,
        }}
      />

      {/* ── Vignette ───────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 35%, rgba(6,6,10,0.9) 100%)",
        }}
      />
    </div>
  );
}
