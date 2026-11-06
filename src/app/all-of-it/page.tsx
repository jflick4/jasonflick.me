import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import giveback from "../../../content/giveback.json";
import media from "../../../content/media.json";
import site from "../../../content/site.json";
import { getMarkdown } from "@/lib/content";
import { Container, Eyebrow, PageHeader, Split, SectionTitle, Button } from "@/components/ui";
import { PlayIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "All of it",
  description: "People, give-back, talks, boards, summits, and whatever's next. Here for all of it.",
};

export default function AllOfItPage() {
  const now = getMarkdown("now.md").data as { word: string; building: string; where: string; updated: string };
  const featuredPods = media.podcasts.slice(0, 3);
  const [thisYear] = site.wordOfTheYear;

  return (
    <>
      <PageHeader
        eyebrow="All of it"
        title="Here for all of it."
        lede="The people part. Boards and mentoring, talks and media, the mountains and the van, and what I'm actually doing right now."
      />

      {/* Jump links */}
      <Container className="flex flex-wrap gap-2.5 pb-10 text-sm font-medium">
        {[
          ["#give-back", "Give-back & boards"],
          ["/all-of-it/media", "Talks & media"],
          ["#investments", "Investments"],
          ["#outside", "Outside"],
          ["/now", "Now"],
        ].map(([href, label]) => (
          <Link key={href} href={href} className="rounded-full border border-ink px-4 py-2.5 hover:bg-ink hover:text-paper">
            {label}
          </Link>
        ))}
      </Container>

      {/* Give-back */}
      <Split
        aside={
          <SectionTitle title="Give-back & boards" note={giveback.lede}>
            <span id="give-back" />
          </SectionTitle>
        }
      >
        <ul className="flex flex-col border-t border-ink">
          {giveback.roles.map((r) => (
            <li
              key={r.org}
              className="grid grid-cols-1 gap-1 border-b border-rule py-5 md:grid-cols-[minmax(0,1fr)_120px] md:gap-6"
            >
              <div className="flex flex-col gap-1">
                <span className="font-display text-[22px] font-normal leading-tight">
                  {r.href ? (
                    <a href={r.href} className="hover:text-accent">
                      {r.org}
                    </a>
                  ) : (
                    r.org
                  )}
                </span>
                <span className="text-[15px] text-muted">{r.role}</span>
                {r.note ? <span className="mt-1 text-[15px] leading-relaxed">{r.note}</span> : null}
              </div>
              <span className="text-sm text-muted md:text-right">{r.since}</span>
            </li>
          ))}
        </ul>
      </Split>

      {/* Talks & media teaser */}
      <section className="bg-ink text-paper">
        <Container className="grid grid-cols-1 gap-8 py-14 md:grid-cols-12">
          <div className="flex flex-col gap-4 md:col-span-4">
            <Eyebrow tone="dark">Talks &amp; media</Eyebrow>
            <span className="font-display text-[32px] font-light leading-[1.12]">Things I&apos;ve said out loud.</span>
            <span className="leading-relaxed text-cream">
              A TEDx, a few podcasts about selling a company, and the press that followed.
            </span>
            <div className="mt-2">
              <Button href="/all-of-it/media" variant="outline">
                <span className="text-paper">All talks &amp; media →</span>
              </Button>
            </div>
          </div>
          <ul className="flex flex-col border-t border-muted md:col-span-8">
            <li>
              <a href={media.featured.href} className="grid grid-cols-[48px_minmax(0,1fr)] items-center gap-4 border-b border-muted py-4 hover:text-accent">
                <span className="flex h-12 w-12 items-center justify-center rounded bg-accent text-paper">
                  <PlayIcon />
                </span>
                <span>
                  <span className="font-medium">{media.featured.venue}</span>{" "}
                  <span className="text-cream">— {media.featured.title} · {media.featured.year}</span>
                </span>
              </a>
            </li>
            {featuredPods.map((p, i) => (
              <li key={i}>
                <a href={p.href} className="grid grid-cols-[48px_minmax(0,1fr)] items-center gap-4 border-b border-muted py-4 hover:text-accent">
                  <span className="flex h-12 w-12 items-center justify-center rounded bg-ink-soft text-paper">
                    <PlayIcon />
                  </span>
                  <span>
                    <span className="font-medium">{p.show}</span>{" "}
                    <span className="text-cream">— {p.title} · {p.year}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Investments */}
      <Split
        className="pt-16"
        aside={
          <SectionTitle
            title="Investments"
            note="A short list, on purpose. Mostly companies I also show up for."
          >
            <span id="investments" />
          </SectionTitle>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {giveback.investments.map((inv) => {
            const inner = (
              <>
                <span className="font-display text-[22px] font-normal leading-tight">{inv.name}</span>
                <span className="text-[14px] text-muted">{inv.role}</span>
                <span className="text-[15px] leading-relaxed">{inv.note}</span>
              </>
            );
            const cls = "flex flex-col gap-1.5 rounded-md bg-card p-6 transition-colors hover:bg-card-deep";
            return inv.href ? (
              inv.href.startsWith("/") ? (
                <Link key={inv.name} href={inv.href} className={cls}>
                  {inner}
                </Link>
              ) : (
                <a key={inv.name} href={inv.href} className={cls}>
                  {inner}
                </a>
              )
            ) : (
              <div key={inv.name} className={cls}>
                {inner}
              </div>
            );
          })}
        </div>
      </Split>

      {/* Outside */}
      <Split
        aside={
          <SectionTitle
            title="Outside"
            note="Banff summits, a 4x4 van, and the trouble that follows. Photos, mostly."
          >
            <span id="outside" />
          </SectionTitle>
        }
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-md">
            <Image
              src="/images/hero-rock.jpg"
              alt="Looking down a Banff valley from the trail"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover object-[center_55%]"
            />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-md md:aspect-auto">
            <Image
              src="/images/lake.jpg"
              alt="Jason at a mountain lake"
              fill
              sizes="(max-width: 768px) 50vw, 30vw"
              className="object-cover object-[center_30%]"
            />
          </div>
        </div>
      </Split>

      {/* Now */}
      <section className="border-t border-rule">
        <Container className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Eyebrow tone="muted">Now</Eyebrow>
            <Link href="/now" className="font-display text-[26px] font-light leading-tight hover:text-accent">
              {new Date(now.updated).toLocaleDateString("en-CA", { month: "long", year: "numeric" })} →
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <Eyebrow tone="muted">Word of the year</Eyebrow>
            <span className="font-display text-[26px] font-light italic text-accent">{thisYear.word}</span>
          </div>
          <div className="flex flex-col gap-2">
            <Eyebrow tone="muted">Building</Eyebrow>
            <span className="leading-relaxed">{now.building}</span>
          </div>
          <div className="flex flex-col gap-2">
            <Eyebrow tone="muted">Where</Eyebrow>
            <span className="leading-relaxed">{now.where}</span>
          </div>
        </Container>
      </section>
    </>
  );
}
