import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEssay, getEssays, formatDate } from "@/lib/content";
import { Container, Eyebrow } from "@/components/ui";
import { Markdown } from "@/components/Markdown";

export function generateStaticParams() {
  return getEssays({ includeDrafts: true }).map((e) => ({ slug: e.meta.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = getEssay(slug);
  return e ? { title: e.meta.title, description: e.meta.summary, openGraph: { type: "article" } } : {};
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) notFound();
  const { meta, content } = essay;

  return (
    <article>
      <Container className="flex flex-col gap-4 pb-10 pt-8 md:pt-12">
        <Link href="/wonder" className="text-sm text-muted hover:text-accent">
          ← Wonder
        </Link>
        <div className="flex items-center gap-2.5">
          {meta.draft ? <Eyebrow>Draft</Eyebrow> : null}
          <Eyebrow tone="muted">
            {meta.draft ? "· " : ""}
            {formatDate(meta.date)} · {meta.tags.join(" · ")}
          </Eyebrow>
        </div>
        <h1 className="max-w-[820px] font-display text-[40px] font-light leading-[1.08] tracking-[-0.02em] md:text-[56px]">
          {meta.title}
        </h1>
        <p className="max-w-[680px] font-display text-[22px] font-light leading-[1.4] text-muted">{meta.summary}</p>
      </Container>
      <Container className="pb-20">
        <Markdown source={content} className="max-w-[720px]" />
      </Container>
    </article>
  );
}
