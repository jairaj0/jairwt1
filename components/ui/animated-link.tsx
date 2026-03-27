"use client";

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedLink({
  href,
  children,
  className = "",
}: AnimatedLinkProps) {
  return (
    <a
      href={href}
      className={`relative inline-block text-text-secondary hover:text-foreground transition-colors group ${className}`}
    >
      {children}
      <span className="absolute bottom-0 left-0 h-px w-0 bg-accent-light group-hover:w-full transition-all duration-300 ease-out" />
    </a>
  );
}
