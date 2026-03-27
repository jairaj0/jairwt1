"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "@/components/animations/smooth-scroll";

const links = [
  { label: "Work", target: "#work" },
  { label: "Services", target: "#services" },
  { label: "Process", target: "#process" },
  { label: "About", target: "#about" },
];

const NAVBAR_OFFSET = -80; // px above section to account for fixed nav

export default function Navbar() {
  const lenis = useLenis();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const scrollTo = useCallback(
    (target: string) => {
      setMobileOpen(false);
      if (lenis) {
        lenis.scrollTo(target, { offset: NAVBAR_OFFSET, duration: 1.2 });
      } else {
        // Fallback if Lenis hasn't initialised yet
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: "power2.out" },
    );
  }, []);

  return (
    <nav
      ref={navRef}
      style={{ opacity: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? "glass" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        {/* Logo — scrolls to top */}
        <button
          onClick={() => {
            if (lenis) lenis.scrollTo(0, { duration: 1.2 });
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-lg font-semibold tracking-tight"
        >
          <span className="text-accent-light">jai</span>
          <span className="text-text-muted">.dev</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <button
              key={link.target}
              onClick={() => scrollTo(link.target)}
              className="relative px-3 py-2 text-sm text-text-secondary hover:text-foreground transition-colors duration-200 group"
            >
              {link.label}
              <span className="absolute bottom-1 left-3 right-3 h-px bg-accent-light origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            className="ml-4 bg-accent hover:bg-accent-light text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:scale-[1.03] active:scale-[0.97]"
          >
            Let&apos;s Talk
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-8 h-8 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <span
            className={`absolute block w-5 h-px bg-foreground transition-all duration-300 ${mobileOpen ? "rotate-45" : "-translate-y-1.5"}`}
          />
          <span
            className={`absolute block w-5 h-px bg-foreground transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`absolute block w-5 h-px bg-foreground transition-all duration-300 ${mobileOpen ? "-rotate-45" : "translate-y-1.5"}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-border glass"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {links.map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollTo(link.target)}
                  className="text-text-secondary hover:text-foreground py-3 text-base transition-colors duration-200 text-left"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#contact")}
                className="mt-3 bg-accent hover:bg-accent-light text-white px-5 py-3 rounded-full text-center text-sm font-medium transition-colors"
              >
                Let&apos;s Talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
