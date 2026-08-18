"use client";

import { CommandPalette } from "@/components/command-palette/command-palette";
import { Navigation } from "@/components/navigation/navigation";
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
      <Navigation onOpenPalette={() => setPalette(true)} />
      <CommandPalette open={palette} onOpenChange={setPalette} />
      {children}
    </>
  );
}
