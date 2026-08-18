"use client";

import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { FormEvent, useRef, useState } from "react";

type Line = { kind: "in" | "out" | "sys"; text: string };

const HELP = [
  "whoami     identity",
  "stack      domains",
  "projects   selected work",
  "contact    reach Nitin",
  "open       availability",
  "clear      reset",
];

function respond(input: string): string[] {
  const cmd = input.trim().toLowerCase();
  if (!cmd) return [];
  if (cmd === "help" || cmd === "?") return HELP;
  if (cmd === "whoami") {
    return [`${profile.fullName} · ${profile.title}`, profile.line];
  }
  if (cmd === "stack") return [...profile.tags];
  if (cmd === "projects") return projects.map((p) => `${p.code}  ${p.title}`);
  if (cmd === "contact") {
    return [profile.email, profile.phone, profile.github, profile.linkedin];
  }
  if (cmd === "open") return [`status · ${profile.availability}`];
  if (cmd === "clear") return ["__CLEAR__"];
  return [`command not found: ${input}`, "type help"];
}

export function InspectCli() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "sys", text: "NITIN.OS inspect — type help" },
  ]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next = value;
    const out = respond(next);
    if (out[0] === "__CLEAR__") {
      setLines([{ kind: "sys", text: "NITIN.OS inspect — type help" }]);
    } else {
      setLines((prev) => [
        ...prev,
        { kind: "in", text: `› ${next}` },
        ...out.map((text) => ({ kind: "out" as const, text })),
      ]);
    }
    setValue("");
  }

  return (
    <div
      className="border border-line bg-surface p-5 sm:p-7"
      onClick={() => inputRef.current?.focus()}
    >
      <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent">Experiment 02</p>
      <h3 className="mt-2 font-display text-2xl">Inspect</h3>
      <div className="mt-5 h-56 overflow-auto font-mono text-[12px] leading-6">
        {lines.map((line, i) => (
          <p key={i} className={line.kind === "in" ? "text-ink" : "text-mute"}>
            {line.text}
          </p>
        ))}
      </div>
      <form onSubmit={onSubmit} className="mt-3 flex items-center gap-2 border-t border-line pt-3">
        <span className="font-mono text-dim">›</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-transparent font-mono text-[13px] outline-none"
          aria-label="Inspect command"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
