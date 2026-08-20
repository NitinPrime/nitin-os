import { isNeeded } from "@/data/profile";
import { cn } from "@/lib/utils";

export function Needed({ value }: { value?: string }) {
  if (!isNeeded(value) && value) return <>{value}</>;
  return (
    <span className="text-needed" title="Editable placeholder — fill from src/data">
      [CONTENT NEEDED]
    </span>
  );
}

export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-mute uppercase", className)}>
      <span className="text-dim">{index}</span>
      <span className="h-px w-6 bg-line-strong" aria-hidden />
      {children}
    </p>
  );
}
