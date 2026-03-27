"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Don't run on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const show = () => {
      if (!isVisible.current) {
        isVisible.current = true;
        gsap.to([ring, dot], { opacity: 1, duration: 0.3 });
      }
    };

    const hide = () => {
      isVisible.current = false;
      gsap.to([ring, dot], { opacity: 0, duration: 0.3 });
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      // Snap dot instantly
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      show();
    };

    // Lerp ring on ticker
    const ticker = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;
      gsap.set(ring, { x: pos.current.x, y: pos.current.y });
    };

    gsap.ticker.add(ticker);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    // Hover state: expand ring + add glow — NO blur, NO backdrop-filter
    const onHoverEnter = () => {
      gsap.to(ring, {
        width: 48,
        height: 48,
        borderColor: "rgba(129, 140, 248, 0.6)",
        boxShadow: "0 0 16px rgba(99, 102, 241, 0.35)",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onHoverLeave = () => {
      gsap.to(ring, {
        width: 32,
        height: 32,
        borderColor: "rgba(129, 140, 248, 0.25)",
        boxShadow: "0 0 0px rgba(99, 102, 241, 0)",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onHoverEnter);
      el.addEventListener("mouseleave", onHoverLeave);
    });

    return () => {
      gsap.ticker.remove(ticker);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverEnter);
        el.removeEventListener("mouseleave", onHoverLeave);
      });
    };
  }, []); // empty deps — runs once, stable refs throughout

  return (
    <>
      {/* Ring — lerped, lags slightly behind for feel */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block rounded-full border opacity-0"
        style={{
          width: 32,
          height: 32,
          borderColor: "rgba(129, 140, 248, 0.25)",
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      />
      {/* Dot — snaps instantly to cursor */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block rounded-full opacity-0"
        style={{
          width: 5,
          height: 5,
          background: "#818cf8",
          boxShadow: "0 0 8px rgba(99,102,241,0.6)",
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      />
    </>
  );
}
