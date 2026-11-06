import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import bios from "../../../content/bios.json";
import media from "../../../content/media.json";
import { Container, Eyebrow, PageHeader, SectionTitle, Split, Placeholder } from "@/components/ui";
import { CopyButton } from "@/components/CopyButton";

export const metadata: Metadata = {
  title: "Press kit",
  description: "Bios in three lengths, photos, and the facts — everything you need to introduce Jason Flick.",
};

export default function PressPage() {
  const bioRows = [
    { key: "Short", words: "≈ 25 words", text: bios.short },
    { key: "Medium", words: "≈ 80 words", text: bios.medium },
    { key: "Long", words: "≈ 200 words", text: bios.long },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Press kit"
        title="Everything you need to introduce me, in one place."
        lede="Bios in three lengths, photos you're welcome to use, and the one-paragraph intro for the host. Copy anything. If you need something that isn't here, just ask."
      />

      {/* On-stage intro */}
      <Container className="pb-12">
        <div className="grid grid-cols-1 items-start gap-6 rounded-md bg-ink p-7 text-paper md:grid-cols-12 md:p-10">
          <div className="flex flex-col gap-2 md:col-span-3">
            <Eyebrow tone="dark">Read this on stage</Eyebrow>
            <span className="text-[13px] text-muted-dark">≈ {bios.introSeconds} seconds</span>
          </div>
          <p className="font-display text-[20px] font-light leading-[1.45] md:col-span-8 md:text-[24px]">
            &ldquo;{bios.intro}&rdquo;
          </p>
          <div className="md:col-span-1 md:justify-self-end">
            <CopyButton text={bios.intro} label="Copy intro" dark />
          </div>
        </div>
      </Container>

      {/* Bios */}
      <Split
        aside={<SectionTitle title="Bios" note="Pick a length. All three are current as of November 2026." />}
      >
        <div className="flex flex-col border-t border-ink">
          {bioRows.map((b) => (
            <div
              key={b.key}
              className="grid grid-cols-1 items-start gap-4 border-b border-rule py-6 md:grid-cols-[160px_minmax(0,1fr)_44px] md:gap-6"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[15px] font-semibold">{b.key}</span>
                <span className="text-[13px] text-muted">{b.words}</span>
              </div>
              <p className="text-[17px] leading-relaxed">{b.text}</p>
              <CopyButton text={b.text} label={`Copy ${b.key.toLowerCase()} bio`} />
            </div>
          ))}
        </div>
      </Split>

      {/* Photos */}
      <Split
        aside={
          <SectionTitle title="Photos" note="Free to use with a program, article, or event listing. Credit not required." />
        }
      >
        <div id="photos" className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {bios.photos.map((p) => (
            <div key={p.src} className="flex flex-col gap-2.5">
              <a
                href={p.src}
                download
                className="relative block aspect-[4/5] overflow-hidden rounded-md"
                aria-label={`Download ${p.label}`}
              >
                <Image
                  src={p.src}
                  alt={p.label}
                  fill
                  sizes="(max-width: 640px) 100vw, 30vw"
                  className="object-cover"
                  style={{ objectPosition: p.position }}
                />
              </a>
              <span className="text-sm font-medium">{p.label}</span>
              <span className="text-[13px] text-muted">
                {p.detail} ·{" "}
                <a href={p.src} download className="text-accent hover:text-accent-deep">
                  download
                </a>
              </span>
            </div>
          ))}
          <div className="flex flex-col gap-2.5">
            <Placeholder
              label="[Studio headshot — square, neutral background, for programs and name cards]"
              className="aspect-[4/5]"
            />
            <span className="text-sm font-medium">Headshot — studio</span>
            <span className="text-[13px] text-muted">[to shoot]</span>
          </div>
        </div>
      </Split>

      {/* Facts */}
      <Split
        aside={<SectionTitle title="The facts" note="For slides, name cards, and the person who has to spell it right." />}
      >
        <dl className="grid grid-cols-1 gap-x-10 border-t border-ink md:grid-cols-2">
          {bios.facts.map((f) => (
            <div key={f.label} className="flex justify-between gap-4 border-b border-rule py-3.5 text-[16px]">
              <dt className="text-muted">{f.label}</dt>
              <dd className="text-right font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Split>

      {/* Recognition */}
      <Split
        aside={
          <SectionTitle title="Recognition" note="In case the program needs a line of it.">
            <Link href="/all-of-it/media" className="mt-2 text-sm text-accent hover:text-accent-deep">
              All talks &amp; media →
            </Link>
          </SectionTitle>
        }
      >
        <ul className="flex flex-col border-t border-ink">
          {media.awards.map((a, i) => (
            <li key={i} className="grid grid-cols-[72px_minmax(0,1fr)] gap-4 border-b border-rule py-3.5 text-[16px]">
              <span className="text-sm text-muted">{a.year}</span>
              <span>
                <span className="font-medium">{a.title}</span>
                <span className="text-muted">
                  {" "}
                  — {a.by}
                  {a.for ? ` · ${a.for}` : ""}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Split>
    </>
  );
}
