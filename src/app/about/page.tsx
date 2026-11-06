import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import site from "../../../content/site.json";
import giveback from "../../../content/giveback.json";
import { Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "The long version — building things, giving back, the outdoors, and what Jason Flick cares about.",
};

const toc = [
  { id: "building", label: "Building things" },
  { id: "giving", label: "Giving back" },
  { id: "outside", label: "Outside" },
  { id: "values", label: "What I care about" },
  { id: "ask", label: "Ask me about" },
];

const facts = [
  { big: "~30 yrs", small: "building startups" },
  { big: "16 yrs", small: "Invest Ottawa board" },
  { big: "You.i TV", small: "founder & former CEO" },
  { big: "Ottawa", small: "home base · Banff when I can" },
];

export default function AboutPage() {
  const [thisYear, lastYear, before] = site.wordOfTheYear;
  return (
    <>
      <Container className="grid grid-cols-1 items-end gap-6 pb-10 pt-8 md:grid-cols-12 md:pt-12">
        <div className="flex flex-col gap-5 md:col-span-7">
          <Eyebrow>About</Eyebrow>
          <h1 className="font-display text-[40px] font-light leading-[1.08] tracking-[-0.02em] md:text-[56px]">
            A curious human who happened to build some companies along the way.
          </h1>
          <p className="max-w-[600px] text-lg leading-relaxed text-muted">
            This page is the long version. If you need the short one — for an intro, a panel, a program — the{" "}
            <Link href="/press" className="border-b border-accent text-accent">
              press kit
            </Link>{" "}
            has it ready to copy.
          </p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-md md:col-span-4 md:col-start-9">
          <Image
            src="/images/lake.jpg"
            alt="Jason in front of a mirror-calm mountain lake"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-[center_30%]"
          />
        </div>
      </Container>

      <Container className="pb-14">
        <div className="grid grid-cols-2 border-b border-rule border-t border-t-ink md:grid-cols-4">
          {facts.map((f, i) => (
            <div
              key={f.big}
              className={`flex flex-col gap-1.5 py-5 ${i === 0 ? "pr-5" : "px-5 md:border-l md:border-rule"} ${
                i % 2 === 1 ? "border-l border-rule md:border-l" : ""
              }`}
            >
              <span className="font-display text-[26px] font-light md:text-[30px]">{f.big}</span>
              <span className="text-[13px] text-muted">{f.small}</span>
            </div>
          ))}
        </div>
      </Container>

      <Container className="grid grid-cols-1 gap-6 pb-16 md:grid-cols-12">
        <nav aria-label="On this page" className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium md:col-span-3 md:flex-col md:gap-3.5">
          {toc.map((t) => (
            <a key={t.id} href={`#${t.id}`} className="text-muted hover:text-accent">
              {t.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-12 text-lg leading-[1.65] md:col-span-8">
          <section id="building" className="flex flex-col gap-4">
            <h2 className="font-display text-[32px] font-normal tracking-[-0.01em]">Building things</h2>
            <p>
              I co-founded and ran You.i TV, which grew into a global platform for TV and streaming apps before
              WarnerMedia acquired it in 2020. Before that: N-able Technologies, which went to SolarWinds, and
              Flick Software, which I started during the 2001 Ottawa tech meltdown from the top floor of my
              apartment. [One or two sentences in your voice about what those years were actually like — the
              part a résumé leaves out.]
            </p>
            <p>
              I never stopped building. Right now that looks like physics simulations, a large world model with a
              robot arm attached, a game studio, and an AI companion for a van. Most of it lives under{" "}
              <Link href="/experiment" className="border-b border-accent text-accent">
                Experiment
              </Link>
              .
            </p>
          </section>

          <section id="giving" className="flex flex-col gap-4">
            <h2 className="font-display text-[32px] font-normal tracking-[-0.01em]">Giving back</h2>
            <p>{giveback.lede}</p>
            <p>
              I&apos;ve sat on the board of Invest Ottawa for sixteen years — the city&apos;s entrepreneur-led
              economic development organization. I mentor founders, speak about entrepreneurship whenever someone
              hands me a mic, and do a bit of angel investing. I also serve on the Industry Advisory Board for the
              Bachelor of Entrepreneurship at Carleton&apos;s Sprott School of Business, and on the board of
              DistillerSR. The full list is under{" "}
              <Link href="/all-of-it" className="border-b border-accent text-accent">
                All of it
              </Link>
              .
            </p>
          </section>

          <section id="outside" className="flex flex-col gap-4">
            <h2 className="font-display text-[32px] font-normal tracking-[-0.01em]">Outside</h2>
            <p>
              Fifteen-hour days in the Rockies, a big 4x4 van, and a talent for getting into trouble camping where
              I probably shouldn&apos;t. The photo at the top is from a Banff trip; the one on the home page is
              from another.
            </p>
            <div className="relative mt-2 aspect-[16/7] overflow-hidden rounded-md">
              <Image
                src="/images/hero-rock.jpg"
                alt="Looking down a Banff valley from a boulder on the trail"
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover object-[center_55%]"
              />
            </div>
          </section>

          <section id="values" className="flex flex-col gap-4">
            <h2 className="font-display text-[32px] font-normal tracking-[-0.01em]">What I care about</h2>
            <p>
              Equality — for everybody. It&apos;s the thing underneath the mentoring, the boards, the investing,
              and most of the arguments I&apos;m willing to have.
            </p>
            <p>
              I pick one word a year and try to live it. This year it&apos;s{" "}
              <em className="text-accent">{thisYear.word}</em>. Last year was <em>{lastYear.word}</em>. The year
              before, just <em>{before.word}</em>. You can probably see the direction.
            </p>
          </section>

          <section id="ask" className="flex flex-col gap-4">
            <h2 className="font-display text-[32px] font-normal tracking-[-0.01em]">Ask me about</h2>
            <ul className="flex flex-wrap gap-2.5 text-sm font-medium">
              {site.askMeAbout.map((a) => (
                <li key={a} className="rounded-full border border-ink px-3.5 py-2">
                  {a}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>
    </>
  );
}
