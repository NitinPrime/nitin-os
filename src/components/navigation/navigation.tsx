"use client";

import { navItems } from "@/data/commands";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { Command, FileText, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const socialLinks = [
  { href: profile.github, label: "GitHub", icon: Github, external: true },
  { href: profile.linkedin, label: "LinkedIn", icon: Linkedin, external: true },
  { href: `mailto:${profile.email}`, label: "Email", icon: Mail, external: false },
  { href: profile.resume, label: "Resume", icon: FileText, external: true },
] as const;

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
    const ids = navItems.map((item) => item.id);
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
        scrolled || open ? "border-b border-line bg-base/75 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="shrink-0 font-mono text-[12px] tracking-[0.22em] text-ink">
          {profile.handle}
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                "relative font-mono text-[11px] tracking-[0.18em] uppercase transition-colors",
                active === item.id ? "text-ink" : "text-mute hover:text-ink",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-0.5" aria-label="Contact links">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="inline-flex size-9 items-center justify-center rounded-md text-mute transition-colors hover:bg-white/[0.04] hover:text-ink"
                  aria-label={link.label}
                  title={link.label}
                  {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                </a>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden items-center gap-1.5 rounded-md border border-line px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-mute uppercase hover:border-line-strong hover:text-ink md:inline-flex"
            aria-keyshortcuts="Meta+K Control+K"
          >
            <Command className="size-3" />
            K
          </button>

          <button
            type="button"
            onClick={onOpenPalette}
            className="inline-flex size-9 items-center justify-center rounded-md border border-line text-mute md:hidden"
            aria-label="Open command palette"
          >
            <Command className="size-4" />
          </button>

          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md border border-line text-ink lg:hidden"
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
        <div id="mobile-nav" className="border-t border-line bg-base lg:hidden">
          <nav className="flex flex-col px-5 py-4" aria-label="Mobile">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="border-b border-line py-4 font-mono text-[13px] tracking-[0.18em] uppercase last:border-b-0"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 pt-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2.5 font-mono text-[11px] tracking-[0.12em] uppercase text-mute hover:text-ink"
                    onClick={() => setOpen(false)}
                    {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    <Icon className="size-3.5" strokeWidth={1.75} />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
