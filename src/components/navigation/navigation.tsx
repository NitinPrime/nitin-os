"use client";

import { navItems } from "@/data/commands";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { Command, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navigation({
  onOpenPalette,
}: {
  onOpenPalette: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["work", "systems", "experience", "about", "contact", "lab", "proof"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open ? "border-b border-line bg-base/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-mono text-[12px] tracking-[0.22em] text-ink">
          {profile.handle}
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                "font-mono text-[11px] tracking-[0.18em] uppercase transition-colors",
                active === item.id ? "text-ink" : "text-mute hover:text-ink",
              )}
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/resume"
            className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute hover:text-ink"
          >
            Resume
          </Link>
          <button
            type="button"
            onClick={onOpenPalette}
            className="inline-flex items-center gap-1.5 rounded-sm border border-line px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-mute uppercase hover:border-line-strong hover:text-ink"
            aria-keyshortcuts="Meta+K Control+K"
          >
            <Command className="size-3" />
            K
          </button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={onOpenPalette}
            className="rounded-sm border border-line p-2 text-mute"
            aria-label="Open command palette"
          >
            <Command className="size-4" />
          </button>
          <button
            type="button"
            className="rounded-sm border border-line p-2 text-ink"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-base md:hidden">
          <nav className="flex flex-col px-5 py-4" aria-label="Mobile">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="border-b border-line py-4 font-mono text-[13px] tracking-[0.18em] uppercase"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/resume"
              className="py-4 font-mono text-[13px] tracking-[0.18em] uppercase"
              onClick={() => setOpen(false)}
            >
              Resume
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
