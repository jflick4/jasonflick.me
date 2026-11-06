import type { Metadata } from "next";
import Link from "next/link";
import { getEssays, formatDate } from "@/lib/content";
import { Container, Eyebrow, PageHeader, Split, SectionTitle, Button } from "@/components/ui";
import book from "../../../content/book.json";

export const metadata: Metadata = {
  title: "Wonder",
  description: "Essays, physics, consciousness, and the questions Jason Flick can't put down.",
};

export default function WonderPage() {
  const published = getEssays();
  const drafts = getEssays({ includeDrafts: true }).filter((e) => e.meta.draft);

  return (
    <>
      <PageHeader
        eyebrow="Wonder"
        title="Wired to wonder."
        lede="Essays and notes on physics, consciousness, building things, and the questions I can't put down. Written slowly. Updated when I change my mind."
      />

      {/* The book */}
      <Container className="pb-14">
        <div className="grid grid-cols-1 items-center gap-6 rounded-md bg-ink p-7 text-paper md:grid-cols-12 md:p-10">
          <div className="flex flex-col gap-4 md:col-span-8">
            <div className="flex items-center gap-2.5">
              <Eyebrow>{book.eyebrow}</Eyebrow>
              <Eyebrow tone="dark">· {book.status}</Eyebrow>
            </div>
            <span className="font-display text-[34px] font-light leading-[1.1] tracking-[-0.01em] md:text-[44px]">
              {book.title}
            </span>
            <p className="text-[17px] leading-relaxed text-cream">{book.blurb}</p>
            <p className="text-[14px] text-muted-dark">{book.note}</p>
          </div>
          <div className="flex md:col-span-4 md:justify-end">
            <Button href={book.cta.href} variant="outline">
              <span className="text-paper">{book.cta.label}</span>
            </Button>
          </div>
        </div>
      </Container>

      <Container className="pb-16">
        {published.length ? (
          <ul className="flex flex-col border-t border-ink">
            {published.map((e) => (
              <li key={e.meta.slug}>
                <Link
                  href={`/wonder/${e.meta.slug}`}
                  className="grid grid-cols-1 gap-2 border-b border-rule py-7 hover:text-accent md:grid-cols-12 md:gap-6"
                >
                  <span className="text-sm text-muted md:col-span-3">
                    {formatDate(e.meta.date)}
                    <span className="block text-[13px]">{e.meta.tags.join(" · ")}</span>
                  </span>
                  <span className="flex flex-col gap-2 md:col-span-8">
                    <span className="font-display text-[28px] font-normal leading-[1.15] tracking-[-0.01em]">
                      {e.meta.title}
                    </span>
                    <span className="text-[16px] leading-relaxed text-muted">{e.meta.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-md bg-card p-8">
            <p className="font-display text-[24px] font-light leading-snug">
              Nothing published yet. The first few are in the works, below.
            </p>
          </div>
        )}
      </Container>

      {drafts.length ? (
        <Split
          aside={<SectionTitle title="In the works" note="Titles I've committed to. Hold me to them." />}
        >
          <ul className="flex flex-col border-t border-ink">
            {drafts.map((e) => (
              <li key={e.meta.slug} className="flex flex-col gap-1.5 border-b border-rule py-5">
                <span className="flex items-center gap-2.5">
                  <Eyebrow tone="muted">Draft</Eyebrow>
                  <Eyebrow tone="muted">· {e.meta.tags.join(" · ")}</Eyebrow>
                </span>
                <span className="font-display text-[24px] font-normal leading-[1.15]">{e.meta.title}</span>
                <span className="text-[15px] leading-relaxed text-muted">{e.meta.summary}</span>
              </li>
            ))}
          </ul>
        </Split>
      ) : null}
    </>
  );
}
