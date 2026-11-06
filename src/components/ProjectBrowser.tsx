"use client";

import { useState } from "react";
import type { ProjectMeta } from "@/lib/content";
import { ProjectCard } from "./ProjectCard";

export function ProjectBrowser({ projects, tags }: { projects: ProjectMeta[]; tags: string[] }) {
  const [tag, setTag] = useState<string | null>(null);
  const shown = tag ? projects.filter((p) => p.tags.includes(tag)) : projects;
  const pill = (active: boolean) =>
    `rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
      active ? "bg-ink text-paper" : "border border-ink hover:bg-ink hover:text-paper"
    }`;

  return (
    <>
      <div className="flex flex-wrap gap-2.5 pb-8" role="group" aria-label="Filter projects">
        <button type="button" className={pill(tag === null)} onClick={() => setTag(null)} aria-pressed={tag === null}>
          All
        </button>
        {tags.map((t) => (
          <button key={t} type="button" className={pill(tag === t)} onClick={() => setTag(t)} aria-pressed={tag === t}>
            {t}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {shown.map((p) => (
          <ProjectCard key={p.slug} meta={p} />
        ))}
        {shown.length === 0 ? <p className="text-muted">Nothing tagged that yet.</p> : null}
      </div>
    </>
  );
}
