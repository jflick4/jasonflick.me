"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayIcon } from "./Icons";

/** Click-to-play YouTube embed: thumbnail first, player only after a tap. */
export function YouTube({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded bg-ink-soft">
      {play ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlay(true)}
          aria-label={`Play: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          <Image
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent shadow-lg transition-transform group-hover:scale-105">
              <PlayIcon size={24} className="text-paper" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
