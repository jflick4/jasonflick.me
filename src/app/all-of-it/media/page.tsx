import type { Metadata } from "next";
import Link from "next/link";
import media from "../../../../content/media.json";
import { Container, Eyebrow, PageHeader } from "@/components/ui";
import { MediaBrowser } from "@/components/MediaBrowser";
import { PlayIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Talks & media",
  description: "Talks, podcasts, interviews and the press that followed. Things Jason Flick has said out loud.",
};

export default function MediaPage() {
  const f = media.featured;
  return (
    <>
      <PageHeader
        eyebrow={
          <>
            <Link href="/all-of-it" className="hover:text-accent-deep">
              All of it
            </Link>{" "}
            · Talks &amp; media
          </>
        }
        title="Things I've said out loud."
        lede={
          <>
            Talks, podcasts, interviews and the press that followed. If you want me to say some of it at your
            event, the{" "}
            <Link href="/press" className="border-b border-accent text-accent">
              press kit
            </Link>{" "}
            has what you need.
          </>
        }
      />

      <Container className="pb-10">
        <a
          href={f.href}
          className="grid grid-cols-1 items-center gap-6 rounded-md bg-ink p-7 text-paper md:grid-cols-12 md:p-10"
        >
          <div className="relative flex aspect-[16/9] items-center justify-center rounded border border-dashed border-muted bg-ink-soft md:col-span-7">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
              <PlayIcon size={22} className="text-paper" />
            </span>
            <span className="absolute bottom-3.5 left-4 text-[13px] text-muted-dark">
              [video thumbnail] · {f.duration}
            </span>
          </div>
          <div className="flex flex-col gap-3.5 md:col-span-5">
            <div className="flex items-center gap-2.5">
              <Eyebrow>Talk</Eyebrow>
              <Eyebrow tone="dark">
                · {f.venue} · {f.year}
              </Eyebrow>
            </div>
            <span className="font-display text-[30px] font-light leading-[1.12] tracking-[-0.01em] md:text-[36px]">
              {f.title}
            </span>
            <span className="leading-relaxed text-cream">{f.blurb}</span>
            <span className="mt-1.5 text-sm text-accent">Watch →</span>
          </div>
        </a>
      </Container>

      <Container className="pb-16">
        <MediaBrowser talks={media.talks} podcasts={media.podcasts} news={media.news} />
      </Container>

      <section className="bg-ink text-paper">
        <Container className="flex flex-wrap items-baseline gap-x-10 gap-y-3 py-10">
          <Eyebrow tone="dark">Recognition</Eyebrow>
          <span className="text-[15px] leading-relaxed text-cream">
            {media.awards.map((a) => `${a.title} ${a.year}`).join(" · ")}
          </span>
        </Container>
      </section>
    </>
  );
}
