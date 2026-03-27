import AnimatedLink from "@/components/ui/animated-link";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-accent-light">jai</span>
          <span className="text-text-muted">.dev</span> — All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <AnimatedLink href="https://github.com" className="text-sm">
            GitHub
          </AnimatedLink>
          <AnimatedLink href="https://linkedin.com" className="text-sm">
            LinkedIn
          </AnimatedLink>
          <AnimatedLink href="https://x.com" className="text-sm">
            X / Twitter
          </AnimatedLink>
        </div>
      </div>
    </footer>
  );
}
