import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ArrowLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] uppercase text-mute transition-colors hover:text-ink",
        className,
      )}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
      <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
