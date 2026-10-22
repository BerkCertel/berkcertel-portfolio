import { MARQUEE_ITEMS } from "@/constants/tech-stack";

/**
 * Endless strip of big muted tech names split by small rotated brand squares.
 * The list is rendered twice and shifted by -50%, so the loop is seamless. Decorative.
 */
export function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-line [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] py-[18px]"
    >
      <div className="flex w-max animate-marquee gap-12">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-12 font-display text-[28px] font-semibold tracking-[-0.03em] whitespace-nowrap text-subtle after:size-[9px] after:rotate-45 after:rounded-[2px] after:bg-brand after:content-[''] max-[760px]:text-[22px]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
