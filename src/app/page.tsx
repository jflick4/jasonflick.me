import Image from "next/image";
import Link from "next/link";
import site from "../../content/site.json";
import { getProjects, getEssays, getMarkdown } from "@/lib/content";
import { Container, Eyebrow, Button } from "@/components/ui";
import { doorIcons } from "@/components/Icons";
import giveback from "../../content/giveback.json";
import book from "../../content/book.json";

export default function Home() {
  const projects = getProjects().filter((p) => p.meta.status === "active").slice(0, 3);
  const essays = getEssays({ includeDrafts: true }).slice(0, 3);
  const now = getMarkdown("now.md").data as { word: string; building: string; where: string; updated: string };
  const [thisYear, ...pastYears] = site.wordOfTheYear;

  const doorItems: Record<string, { label: string; href: string }[]> = {
    wonder: [
      { label: `${book.eyebrow}: ${book.title}`, href: "/wonder" },
      ...essays.slice(0, 2).map((e) => ({ label: e.meta.title, href: e.meta.draft ? "/wonder" : `/wonder/${e.meta.slug}` })),
    ],
    experiment: projects.map((p) => ({ label: p.meta.title, href: `/experiment/${p.meta.slug}` })),
    "all-of-it": [
      { label: `${giveback.roles[0].org} — ${giveback.roles[0].since} on the board`, href: "/all-of-it#give-back" },
      { label: "Talks & media", href: "/all-of-it/media" },
      { label: "Out in the world — travel, summits, the trouble", href: "/all-of-it#outside" },
    ],
  };

  return (
    <>
      {/* HERO */}
      <section className="relative h-[560px] md:h-[720px]">
        <Image
          src="/images/hero-rock.jpg"
          alt="Jason sitting on a boulder, looking out over a Banff valley"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(28,26,23,0.42) 0%, rgba(28,26,23,0.05) 45%, rgba(244,239,230,0) 70%, rgba(244,239,230,1) 100%)",
          }}
        />
        <Container className="relative pt-12 md:pt-[72px]">
          <h1 className="rise max-w-[640px] font-display text-[40px] font-light leading-[1.08] tracking-[-0.02em] text-white [text-shadow:0_1px_24px_rgba(0,0,0,0.25)] md:text-[64px]">
            {site.tagline.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
        </Container>
      </section>

      {/* INTRO */}
      <Container className="rise-2 flex flex-wrap items-end justify-between gap-6 pb-14 pt-2">
        <p className="max-w-[720px] font-display text-[22px] font-light leading-[1.35] md:text-[26px]">
          {site.intro}
        </p>
        <p className="text-sm text-muted">{site.location}</p>
      </Container>

      {/* THREE DOORS */}
      <Container className="grid grid-cols-1 gap-6 pb-[72px] md:grid-cols-3">
        {site.doors.map((d) => {
          const Icon = doorIcons[d.key as keyof typeof doorIcons];
          return (
            <Link
              key={d.key}
              href={d.href}
              className="group flex min-h-[360px] flex-col gap-[18px] rounded-md border-t-4 border-accent bg-card p-8 transition-colors hover:bg-card-deep"
            >
              <span className="flex items-center gap-2">
                <Icon size={16} />
                <Eyebrow>{d.label}</Eyebrow>
              </span>
              <span className="font-display text-[30px] font-normal leading-[1.15] tracking-[-0.01em]">
                {d.line}
              </span>
              <span className="text-[15px] leading-relaxed text-muted">{d.blurb}</span>
              <ul className="mt-auto flex flex-col gap-2.5 text-[15px] leading-snug">
                {doorItems[d.key].map((it, i) => (
                  <li key={i} className="border-t border-rule pt-2.5 group-hover:text-ink">
                    {it.label}
                  </li>
                ))}
              </ul>
            </Link>
          );
        })}
      </Container>

      {/* NOW */}
      <section className="bg-ink text-paper">
        <Container className="grid grid-cols-2 gap-8 py-14 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Eyebrow tone="dark">Now</Eyebrow>
            <Link href="/now" className="font-display text-[28px] font-light leading-tight hover:text-accent">
              {new Date(now.updated).toLocaleDateString("en-CA", { month: "long", year: "numeric" })}
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <Eyebrow tone="dark">Word of the year</Eyebrow>
            <span className="font-display text-[28px] font-light italic leading-tight text-accent">
              {thisYear.word}
            </span>
            <span className="text-[13px] text-muted-dark">
              {pastYears.map((p) => `${p.year} · ${p.word}`).join("   ")}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <Eyebrow tone="dark">Building</Eyebrow>
            <span className="leading-relaxed">{now.building}</span>
          </div>
          <div className="flex flex-col gap-2">
            <Eyebrow tone="dark">Where</Eyebrow>
            <span className="leading-relaxed">{now.where}</span>
          </div>
        </Container>
      </section>

      {/* ABOUT */}
      <Container className="grid grid-cols-1 items-center gap-6 py-[72px] md:grid-cols-12">
        <div className="relative aspect-[4/5] overflow-hidden rounded-md md:col-span-4">
          <Image
            src="/images/lake.jpg"
            alt="Jason, smiling, in front of a mirror-calm mountain lake"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-[center_30%]"
          />
        </div>
        <div className="flex flex-col gap-5 md:col-span-7 md:col-start-6">
          <Eyebrow tone="muted">About</Eyebrow>
          <p className="font-display text-[26px] font-light leading-[1.3] tracking-[-0.01em] md:text-[30px]">
            I&apos;ve spent most of my life building companies. These days I follow my curiosity, help other
            people build theirs, and try hard not to miss a sunset. The thing I care about most is equality
            — for everybody.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Button href="/about">Full story</Button>
            <Button href="/press" variant="outline">
              Press kit — bios, headshots, logos
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
