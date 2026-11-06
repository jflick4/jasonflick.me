import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/content";
import { Container, Eyebrow, Placeholder } from "@/components/ui";
import { Markdown } from "@/components/Markdown";
import { statusLabel } from "@/components/ProjectCard";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.meta.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return p ? { title: p.meta.title, description: p.meta.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { meta, content } = project;
  const live = meta.status === "active" || meta.status === "ongoing";

  return (
    <>
      <Container className="flex flex-col gap-4 pb-8 pt-8 md:pt-12">
        <Link href="/experiment" className="text-sm text-muted hover:text-accent">
          ← Experiment
        </Link>
        <div className="flex items-center gap-2.5">
          <Eyebrow tone={live ? "accent" : "muted"}>{statusLabel(meta.status)}</Eyebrow>
          <Eyebrow tone="muted">· {meta.tags.join(" · ")}</Eyebrow>
          {meta.year ? <Eyebrow tone="muted">· {meta.year}</Eyebrow> : null}
        </div>
        <h1 className="max-w-[820px] font-display text-[40px] font-light leading-[1.08] tracking-[-0.02em] md:text-[56px]">
          {meta.title}
        </h1>
        <p className="max-w-[680px] text-lg leading-relaxed text-muted">{meta.summary}</p>
      </Container>

      <Container className="grid grid-cols-1 gap-8 pb-20 md:grid-cols-12">
        <div className="md:col-span-8">
          {meta.image ? (
            <figure className="mb-8">
              <div className="relative aspect-[16/10] overflow-hidden rounded-md">
                <Image src={meta.image} alt={meta.imageAlt ?? meta.title} fill priority sizes="(max-width: 768px) 100vw, 66vw" className="object-cover" />
              </div>
              {meta.imageAlt ? <figcaption className="mt-2 text-[13px] text-muted">{meta.imageAlt}</figcaption> : null}
            </figure>
          ) : (
            <Placeholder label={meta.imageAlt ? `[${meta.imageAlt}]` : "[image]"} className="mb-8 aspect-[16/9]" />
          )}
          <Markdown source={content} />
        </div>
        {meta.links?.length ? (
          <aside className="flex flex-col gap-3 md:col-span-3 md:col-start-10">
            <Eyebrow tone="muted">Links</Eyebrow>
            <ul className="flex flex-col gap-2 text-[15px]">
              {meta.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="border-b border-accent text-accent hover:text-accent-deep">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </Container>
    </>
  );
}
