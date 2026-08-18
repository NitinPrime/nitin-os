"use client";

import { BootSequence } from "@/components/boot/boot-sequence";
import { CommandPalette } from "@/components/command-palette/command-palette";
import { Navigation } from "@/components/navigation/navigation";
import { ScrollProgress } from "@/components/navigation/scroll-progress";
import { useEffect, useState } from "react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [palette, setPalette] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPalette((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[120] focus:bg-ink focus:px-3 focus:py-2 focus:text-base"
      >
        Skip to content
      </a>
      <BootSequence />
      <Navigation onOpenPalette={() => setPalette(true)} />
      <ScrollProgress />
      <CommandPalette open={palette} onOpenChange={setPalette} />
      {children}
    </>
  );
}
