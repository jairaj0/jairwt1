import Reveal from "@/components/animations/reveal";

interface SectionHeadingProps {
  label: string;
  title: string | React.ReactNode;
  description?: string;
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <Reveal className={className}>
      <p className="text-accent-light text-sm font-medium tracking-wider uppercase mb-3">
        {label}
      </p>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="text-text-secondary max-w-xl text-lg leading-relaxed">
          {description}
        </p>
      )}
    </Reveal>
  );
}
