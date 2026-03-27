"use client";

import { useRef } from "react";
import { gsap } from "gsap";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltStrength?: number;
}

export default function TiltCard({
  children,
  className = "",
  tiltStrength = 8,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    const glare = glareRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(el, {
      rotateX: -y * tiltStrength,
      rotateY: x * tiltStrength,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });

    if (glare) {
      gsap.to(glare, {
        opacity: 0.08,
        x: `${x * 100}%`,
        y: `${y * 100}%`,
        duration: 0.4,
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
    if (glareRef.current) {
      gsap.to(glareRef.current, { opacity: 0, duration: 0.4 });
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glare effect */}
      <div
        ref={glareRef}
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(129,140,248,0.15), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}
