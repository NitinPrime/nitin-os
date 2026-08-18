"use client";

import { commands, type Command } from "@/data/commands";
import { fuzzyFilter } from "@/lib/fuzzy";
import { scrollToId } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function runCommand(command: Command) {
  if (command.action.type === "section") {
    scrollToId(command.action.id);
    return;
  }
  window.open(command.action.href, "_blank", "noopener,noreferrer");
}

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const hits = useMemo(
    () =>
      fuzzyFilter(commands, query, (c) => [c.label, c.hint, c.id, ...c.keywords]),
    [query],
  );

  const close = useCallback(() => {
    setQuery("");
    setIndex(0);
    onOpenChange(false);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setIndex((i) => Math.min(i + 1, Math.max(hits.length - 1, 0)));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      }
      if (event.key === "Enter") {
        event.preventDefault();
        const hit = hits[index];
        if (hit) {
          runCommand(hit.item);
          close();
        }
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hits, index, close]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[18vh]">
      <button
        type="button"
        aria-label="Close command palette"
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-lg overflow-hidden rounded-md border border-line bg-surface shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
      >
        <div className="border-b border-line px-4 py-3">
          <p className="mb-2 font-mono text-[10px] tracking-[0.22em] text-dim uppercase">NITIN.OS / command</p>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            placeholder="Search projects, experience, resume…"
            className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-dim"
            aria-autocomplete="list"
            aria-controls="command-results"
          />
        </div>
        <ul id="command-results" role="listbox" className="max-h-80 overflow-y-auto py-2">
          {hits.length === 0 ? (
            <li className="px-4 py-6 font-mono text-xs text-dim">No matches.</li>
          ) : (
            hits.map((hit, i) => (
              <li key={hit.item.id} role="option" aria-selected={i === index}>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left ${
                    i === index ? "bg-white/5 text-ink" : "text-mute hover:bg-white/5 hover:text-ink"
                  }`}
                  onMouseEnter={() => setIndex(i)}
                  onClick={() => {
                    runCommand(hit.item);
                    close();
                  }}
                >
                  <span className="text-sm">{hit.item.label}</span>
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim">
                    {hit.item.hint}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
        <p className="border-t border-line px-4 py-2 font-mono text-[10px] tracking-[0.14em] text-dim uppercase">
          ↑↓ navigate · enter open · esc close
        </p>
      </div>
    </div>
  );
}
