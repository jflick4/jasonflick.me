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
  const isCompany = (p: (typeof all)[number]) => p.meta.tags.includes("Companies");
  const projects = all.filter((p) => !isCompany(p));
  const companies = all.filter(isCompany);
  const featured = projects.find((p) => p.meta.featured) ?? projects[0];
  const grid = projects.filter((p) => p !== featured).map((p) => p.meta);
  const projectTags = allTags(projects);

  return (
    <>
      <PageHeader
        eyebrow="Experiment"
        title="Built to experiment."
        lede="Companies, robots, world models, physics sims, and a van. Some of these made money. Most of them made me happy. All of them taught me something."
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
        <ProjectBrowser projects={grid} tags={projectTags} />
      </Container>

      {companies.length ? (
        <Split
          aside={
            <SectionTitle
              title="Companies"
              note="The businesses. Two I run, one I help own, two I sold for nine figures, and the one I started it all with."
            />
          }
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {companies.map((c) => {
              const live = c.meta.status === "active" || c.meta.status === "ongoing";
              return (
                <Link
                  key={c.meta.slug}
                  href={`/experiment/${c.meta.slug}`}
                  className="flex flex-col gap-2.5 rounded-md bg-card p-6 transition-colors hover:bg-card-deep"
                >
                  <div className="flex items-center gap-2.5">
                    <Eyebrow tone={live ? "accent" : "muted"}>{statusLabel(c.meta.status)}</Eyebrow>
                    {c.meta.year ? <Eyebrow tone="muted">· {c.meta.year}</Eyebrow> : null}
                  </div>
                  <span className="font-display text-[26px] font-normal leading-[1.15]">{c.meta.title}</span>
                  <span className="text-[15px] leading-relaxed text-muted">{c.meta.summary}</span>
                </Link>
              );
            })}
          </div>
        </Split>
      ) : null}
    </>
  );
}
