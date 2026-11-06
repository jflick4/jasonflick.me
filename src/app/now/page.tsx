import type { Metadata } from "next";
import site from "../../../content/site.json";
import { getMarkdown } from "@/lib/content";
import { Container, Eyebrow, PageHeader } from "@/components/ui";
import { Markdown } from "@/components/Markdown";

export const metadata: Metadata = {
  title: "Now",
  description: "What Jason Flick is actually doing right now — building, reading, where he is, and the word of the year.",
};

export default function NowPage() {
  const { data, content } = getMarkdown("now.md");
  const d = data as { updated: string; word: string; building: string; reading: string; where: string };
  const updated = new Date(d.updated).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });

  return (
    <>
      <PageHeader eyebrow={`Now · updated ${updated}`} title="What I'm doing right now." />

      <Container className="pb-12">
        <div className="grid grid-cols-2 gap-8 rounded-md bg-ink p-7 text-paper md:grid-cols-4 md:p-10">
          <div className="flex flex-col gap-2">
            <Eyebrow tone="dark">Word of the year</Eyebrow>
            <span className="font-display text-[28px] font-light italic text-accent">{d.word}</span>
            <span className="text-[13px] text-muted-dark">
              {site.wordOfTheYear.slice(1).map((w) => `${w.year} · ${w.word}`).join("   ")}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <Eyebrow tone="dark">Building</Eyebrow>
            <span className="leading-relaxed">{d.building}</span>
          </div>
          <div className="flex flex-col gap-2">
            <Eyebrow tone="dark">Reading</Eyebrow>
            <span className="leading-relaxed">{d.reading}</span>
          </div>
          <div className="flex flex-col gap-2">
            <Eyebrow tone="dark">Where</Eyebrow>
            <span className="leading-relaxed">{d.where}</span>
          </div>
        </div>
      </Container>

      <Container className="pb-20">
        <Markdown source={content} className="max-w-[720px]" />
      </Container>
    </>
  );
}
