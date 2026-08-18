import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80svh] flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-[11px] tracking-[0.22em] text-dim uppercase">404</p>
      <h1 className="mt-4 font-display text-5xl">This route is not mounted.</h1>
      <Link href="/" className="mt-8 font-mono text-[12px] tracking-[0.16em] uppercase text-mute hover:text-ink">
        Return to NITIN.OS
      </Link>
    </div>
  );
}
