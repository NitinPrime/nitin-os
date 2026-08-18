import { type ProjectFrame } from "@/data/projects";

export function ProductFrames({ frames }: { frames: ProjectFrame[] }) {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-dim">Product</h2>
        <ul className="mt-8 space-y-10">
          {frames.map((frame) => (
            <li key={frame.src}>
              <figure className="overflow-hidden border border-line bg-elevated">
                <img
                  src={frame.src}
                  alt={frame.alt}
                  className="h-auto w-full"
                />
              </figure>
              <p className="mt-3 max-w-2xl font-mono text-[12px] leading-relaxed tracking-[0.04em] text-mute">
                {frame.caption}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
