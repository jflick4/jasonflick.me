"use client";

import { useState } from "react";
import { CopyIcon, CheckIcon } from "./Icons";

export function CopyButton({
  text,
  label,
  dark = false,
}: {
  text: string;
  label: string;
  dark?: boolean;
}) {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      /* clipboard unavailable — nothing to do */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={done ? "Copied" : label}
      title={done ? "Copied" : label}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded border transition-colors ${
        dark
          ? "border-muted-dark text-paper hover:bg-paper hover:text-ink"
          : "border-ink text-ink hover:bg-ink hover:text-paper"
      }`}
    >
      {done ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}
