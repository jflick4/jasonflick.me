import type { Metadata } from "next";
import Link from "next/link";
import { getProjects, allTags } from "@/lib/content";
import { Container, Eyebrow, PageHeader, Split, SectionTitle, Placeholder } from "@/components/ui";
import { ProjectBrowser } from "@/components/ProjectBrowser";
import { statusLabel } from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Experiment",
  description: "Companies, robots, game engines, physics sims, and a van. Built to experiment.",
};

export default function ExperimentPage() {
  const all = getProjects();
  const tags = allTags(all);
  const featured = all.find((p) => p.meta.featured) ?? all[0];
  const grid = all.filter((p) => p !== featured && p.meta.status !== "earlier").map((p) => p.meta);
  const earlier = all.filter((p) => p.meta.status === "earlier");

  return (
    <>
      <PageHeader
        eyebrow="Experiment"
        title="Built to experiment."
        lede="Companies, robots, game engines, physics sims, and a van. Some of these made money. Most of them made me happy. All of them taught me something."
      />

      {featured ? (
        <Container className="pb-8">
          <Link
            href={`/experiment/${featured.meta.slug}`}
            className="grid grid-cols-1 items-center gap-6 rounded-md bg-ink p-7 text-paper md:grid-cols-12 md:p-10"
          >
            <div className="flex flex-col gap-3.5 md:col-span-7">
              <div className="flex items-center gap-2.5">
                <Eyebrow>{statusLabel(featured.meta.status)}</Eyebrow>
                <Eyebrow tone="dark">· {featured.meta.tags.join(" · ")}</Eyebrow>
              </div>
              <span className="font-display text-[32px] font-light leading-[1.1] tracking-[-0.01em] md:text-[40px]">
                {featured.meta.title}
              </span>
              <span className="text-[17px] leading-relaxed text-cream">{featured.meta.summary}</span>
              <span className="mt-1.5 text-sm text-accent">Read the notes →</span>
            </div>
            <div className="md:col-span-5">
              <Placeholder
                label={featured.meta.imageAlt ? `[${featured.meta.imageAlt}]` : "[image]"}
                className="aspect-[4/3] border-muted bg-ink-soft text-muted-dark"
              />
            </div>
          </Link>
        </Container>
      ) : null}

      <Container className="pb-16">
        <ProjectBrowser projects={grid} tags={tags} />
      </Container>

      {earlier.length ? (
        <Split
          aside={
            <SectionTitle
              title="Earlier"
              note="Companies, side quests, and things that didn't survive contact with reality."
            />
          }
        >
          <ul className="flex flex-col border-t border-ink text-[16px]">
            {earlier.map((p) => (
              <li key={p.meta.slug}>
                <Link
                  href={`/experiment/${p.meta.slug}`}
                  className="grid grid-cols-[96px_minmax(0,1fr)] items-baseline gap-4 border-b border-rule py-4 hover:text-accent md:grid-cols-[120px_minmax(0,1fr)_140px]"
                >
                  <span className="text-sm text-muted">{p.meta.year ?? ""}</span>
                  <span>
                    <span className="font-medium">{p.meta.title}</span>{" "}
                    <span className="text-muted">— {p.meta.summary}</span>
                  </span>
                  <span className="hidden text-right text-[13px] text-muted md:block">
                    {p.meta.tags.join(" · ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Split>
      ) : null}
    </>
  );
}
