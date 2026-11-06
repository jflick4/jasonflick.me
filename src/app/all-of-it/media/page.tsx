import type { Metadata } from "next";
import Link from "next/link";
import media from "../../../../content/media.json";
import { Container, Eyebrow, PageHeader } from "@/components/ui";
import { MediaBrowser } from "@/components/MediaBrowser";
import { YouTube } from "@/components/YouTube";

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
        <div className="grid grid-cols-1 items-center gap-6 rounded-md bg-ink p-7 text-paper md:grid-cols-12 md:p-10">
          <div className="md:col-span-7">
            <YouTube id={f.youtubeId} title={`${f.title} — ${f.venue}`} />
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
            <a href={f.href} className="mt-1.5 text-sm text-accent hover:text-paper">
              Watch on YouTube →
            </a>
          </div>
        </div>
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
