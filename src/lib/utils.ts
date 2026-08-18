export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const BOOT_KEY = "nitin-os-booted";

export function hasBooted() {
  if (typeof window === "undefined") return true;
  try {
    return sessionStorage.getItem(BOOT_KEY) === "1";
  } catch {
    return true;
  }
}

export function markBooted() {
  try {
    sessionStorage.setItem(BOOT_KEY, "1");
  } catch {
    // private mode / blocked storage
  }
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
}
