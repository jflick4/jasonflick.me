import Link from "next/link";
import Image from "next/image";
import type { ProjectMeta } from "@/lib/content";
import { Eyebrow } from "./ui";

const STATUS_LABEL: Record<ProjectMeta["status"], string> = {
  active: "Active",
  ongoing: "Ongoing",
  shipped: "Shipped",
  acquired: "Acquired",
  paused: "Paused",
  earlier: "Earlier",
};

export function statusLabel(s: ProjectMeta["status"]) {
  return STATUS_LABEL[s];
}

export function ProjectCard({ meta }: { meta: ProjectMeta }) {
  const live = meta.status === "active" || meta.status === "ongoing";
  return (
    <Link
      href={`/experiment/${meta.slug}`}
      className="flex min-h-[300px] flex-col gap-3.5 rounded-md bg-card p-7 transition-colors hover:bg-card-deep"
    >
      {meta.image ? (
        <div className="relative aspect-[16/10] overflow-hidden rounded">
          <Image src={meta.image} alt={meta.imageAlt ?? meta.title} fill sizes="33vw" className="object-cover" />
        </div>
      ) : (
        <div className="flex aspect-[16/10] items-end rounded bg-card-deep p-4">
          <span className="font-display text-[40px] font-light leading-none text-muted">{meta.title.charAt(0)}</span>
        </div>
      )}
      <div className="flex items-center gap-2.5">
        <Eyebrow tone={live ? "accent" : "muted"}>{STATUS_LABEL[meta.status]}</Eyebrow>
        <Eyebrow tone="muted">· {meta.tags.join(" · ")}</Eyebrow>
      </div>
      <span className="font-display text-[26px] font-normal leading-[1.15]">{meta.title}</span>
      <span className="text-[15px] leading-relaxed text-muted">{meta.summary}</span>
    </Link>
  );
}
