"use client";

import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

const LAYERS = [
  { id: "client", label: "Client", ms: 12 },
  { id: "edge", label: "Edge", ms: 38 },
  { id: "api", label: "API", ms: 64 },
  { id: "db", label: "Store", ms: 41 },
  { id: "out", label: "Response", ms: 18 },
] as const;

export function RequestLab() {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const [log, setLog] = useState<string[]>(["idle · waiting for request"]);

  const total = useMemo(
    () => (step < 0 ? 0 : LAYERS.slice(0, step + 1).reduce((s, l) => s + l.ms, 0)),
    [step],
  );

  function send() {
    if (running) return;
    setRunning(true);
    setStep(-1);
    setLog(["GET /systems · dispatched"]);
    let i = 0;
    const tick = () => {
      setStep(i);
      setLog((prev) => [...prev, `${LAYERS[i].label.toLowerCase()} · ${LAYERS[i].ms}ms`]);
      i += 1;
      if (i < LAYERS.length) {
        window.setTimeout(tick, 380);
      } else {
        window.setTimeout(() => {
          setLog((prev) => [...prev, "200 OK · path complete"]);
          setRunning(false);
        }, 280);
      }
    };
    window.setTimeout(tick, 240);
  }

  return (
    <div className="border border-line bg-surface p-5 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent">Experiment 01</p>
          <h3 className="mt-2 font-display text-2xl">Request path</h3>
        </div>
        <button
          type="button"
          onClick={send}
          disabled={running}
          className="rounded-sm bg-ink px-4 py-2 font-mono text-[11px] tracking-[0.16em] uppercase text-base disabled:opacity-40"
        >
          {running ? "In flight" : "Send request"}
        </button>
      </div>

      <ol className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {LAYERS.map((layer, i) => (
          <li key={layer.id} className="text-center">
            <div
              className={cn(
                "mx-auto h-16 border transition-colors",
                i <= step ? "border-accent bg-accent/10" : "border-line",
              )}
            />
            <p className="mt-2 font-mono text-[10px] tracking-[0.12em] uppercase text-dim">{layer.label}</p>
          </li>
        ))}
      </ol>

      <p className="mt-6 font-mono text-xs text-mute">
        Simulated latency · {total}ms elapsed
        <span className="text-dim"> — illustrative, not a benchmark</span>
      </p>

      <pre className="mt-4 max-h-36 overflow-auto font-mono text-[11px] leading-6 text-dim">
        {log.map((line) => `> ${line}`).join("\n")}
      </pre>
    </div>
  );
}
