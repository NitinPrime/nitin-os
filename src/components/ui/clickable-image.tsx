"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function ClickableImage({
  src,
  alt,
  caption,
  className,
  wrapperClassName,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  wrapperClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const lightbox =
    open && mounted
      ? createPortal(
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-8">
            <button
              type="button"
              aria-label="Close image"
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label={alt}
              className="relative z-10 flex h-[92vh] w-[96vw] max-w-[1400px] flex-col"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-0 right-0 z-20 rounded-sm bg-black/50 p-2 text-mute transition-colors hover:text-ink"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
              <img
                src={src}
                alt={alt}
                className="h-full w-full object-contain"
              />
              {caption ? (
                <p className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-4 font-mono text-[11px] tracking-[0.08em] text-mute sm:px-6">
                  {caption}
                </p>
              ) : null}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group block w-full cursor-zoom-in overflow-hidden border-0 bg-transparent p-0 text-left ${wrapperClassName ?? ""}`}
        aria-label={`View ${alt}`}
      >
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-200 group-hover:opacity-90 ${className ?? ""}`}
        />
      </button>
      {lightbox}
    </>
  );
}
