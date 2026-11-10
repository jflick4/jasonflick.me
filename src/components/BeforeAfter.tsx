"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Drag-to-compare image slider. Both images must share an aspect ratio.
 * Usable from MDX: <BeforeAfter before="/a.jpg" after="/b.jpg" beforeLabel="Telescope" afterLabel="SkyTruth" />
 */
export function BeforeAfter({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  alt = "",
  aspect = "16 / 9",
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt?: string;
  aspect?: string;
}) {
  const [pos, setPos] = useState(50);
  return (
    <figure className="my-6">
      <div className="relative w-full select-none overflow-hidden rounded-md bg-ink" style={{ aspectRatio: aspect }}>
        <Image src={after} alt={`${alt} — ${afterLabel}`} fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={before} alt={`${alt} — ${beforeLabel}`} fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-paper/90" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-paper shadow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M9 5l-5 7 5 7M15 5l5 7-5 7" />
            </svg>
          </span>
        </div>
        <span className="pointer-events-none absolute left-3 top-3 rounded bg-ink/70 px-2 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-paper">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded bg-accent/90 px-2 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-paper">
          {afterLabel}
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      {alt ? <figcaption className="mt-2 text-[13px] text-muted">{alt} — drag to compare</figcaption> : null}
    </figure>
  );
}
