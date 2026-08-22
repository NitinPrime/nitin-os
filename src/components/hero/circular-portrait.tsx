import { profile } from "@/data/profile";

export function CircularPortrait() {
  return (
    <div className="relative mx-auto flex w-full max-w-[22rem] items-center justify-center lg:max-w-none lg:justify-end">
      {/* Soft ambient glow */}
      <div
        className="pointer-events-none absolute size-[85%] rounded-full bg-[radial-gradient(circle,rgba(125,211,192,0.28)_0%,transparent_68%)] blur-2xl"
        aria-hidden
      />

      {/* Gradient ring */}
      <div className="relative aspect-square w-[min(100%,22rem)] rounded-full bg-[conic-gradient(from_210deg,#7dd3c0_0%,#c4b5a0_35%,#7dd3c0_70%,#5a9e94_100%)] p-[3px] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="size-full overflow-hidden rounded-full bg-base p-[3px]">
          <div className="relative size-full overflow-hidden rounded-full bg-elevated">
            <img
              src={profile.photo}
              alt={`${profile.fullName}, software engineer`}
              width={640}
              height={640}
              className="size-full object-cover object-[center_12%]"
            />
            {/* Subtle bottom fade into the site */}
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_115%,rgba(7,8,10,0.35)_0%,transparent_55%)]"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}
