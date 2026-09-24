import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  className = "",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={className}>
      {eyebrow && <p className="eyebrow mb-5 opacity-70">{eyebrow}</p>}
      <Tag className="font-display text-headline font-bold tracking-display">{title}</Tag>
    </Reveal>
  );
}
