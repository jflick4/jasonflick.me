"use client";

import { useMemo, useState } from "react";
import { PlayIcon } from "./Icons";

type Talk = { title: string; venue: string; year: number; kind: string; topics: string[]; href: string | null };
type Podcast = { show: string; title: string; year: number; topics: string[]; href: string; featured?: boolean };
type News = { outlet: string; year: number; title: string; href: string; featured?: boolean };

type Format = "all" | "talks" | "podcasts" | "news";

export function MediaBrowser({
  talks,
  podcasts,
  news,
}: {
  talks: Talk[];
  podcasts: Podcast[];
  news: News[];
}) {
  const [format, setFormat] = useState<Format>("all");
  const [topic, setTopic] = useState<string>("Everything");

  const topics = useMemo(() => {
    const s = new Set<string>();
    [...talks, ...podcasts].forEach((i) => i.topics.forEach((t) => s.add(t)));
    return ["Everything", ...s];
  }, [talks, podcasts]);

  const byTopic = <T extends { topics: string[] }>(xs: T[]) =>
    topic === "Everything" ? xs : xs.filter((x) => x.topics.includes(topic));

  const showTalks = (format === "all" || format === "talks") && byTopic(talks).length > 0;
  const showPods = (format === "all" || format === "podcasts") && byTopic(podcasts).length > 0;
  const showNews = (format === "all" || format === "news") && topic === "Everything";

  const pill = (active: boolean) =>
    `rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
      active ? "bg-ink text-paper" : "border border-ink hover:bg-ink hover:text-paper"
    }`;
  const formats: { key: Format; label: string }[] = [
    { key: "all", label: "All" },
    { key: "talks", label: "Talks" },
    { key: "podcasts", label: "Podcasts" },
    { key: "news", label: "In the news" },
  ];

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter by format">
          {formats.map((f) => (
            <button
              key={f.key}
              type="button"
              className={pill(format === f.key)}
              onClick={() => setFormat(f.key)}
              aria-pressed={format === f.key}
            >
              {f.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2.5 text-sm text-muted">
          <span>Topic</span>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="rounded border border-rule bg-white px-3 py-2.5 text-sm text-ink"
          >
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>

      {showTalks ? (
        <section className="flex flex-col gap-5">
          <div className="flex items-baseline justify-between border-b border-ink pb-3">
            <h2 className="font-display text-[32px] font-normal tracking-[-0.01em]">Talks &amp; panels</h2>
            <span className="text-sm text-muted">Newest first</span>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {byTopic(talks).map((t, i) => {
              const inner = (
                <>
                  <div className="flex aspect-[16/9] items-center justify-center rounded border border-dashed border-muted-dark bg-card-deep text-[13px] text-muted">
                    {t.href ? <PlayIcon size={28} /> : "[photo from the night]"}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    {t.kind} · {t.year}
                  </span>
                  <span className="font-display text-[22px] font-normal leading-[1.2]">{t.title}</span>
                  <span className="text-sm leading-relaxed text-muted">{t.venue}</span>
                </>
              );
              const cls = "flex flex-col gap-3 rounded-md bg-card p-6 transition-colors hover:bg-card-deep";
              return t.href ? (
                <a key={i} href={t.href} className={cls}>
                  {inner}
                </a>
              ) : (
                <div key={i} className={cls}>
                  {inner}
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {showPods ? (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="flex flex-col gap-2 md:col-span-3">
            <h2 className="font-display text-[32px] font-normal tracking-[-0.01em]">Podcasts &amp; interviews</h2>
            <span className="text-sm leading-relaxed text-muted">
              Mostly the You.i TV story, told a few different ways. Start with the first one.
            </span>
          </div>
          <ul className="flex flex-col border-t border-ink text-[16px] md:col-span-9">
            {byTopic(podcasts).map((p, i) => (
              <li key={i}>
                <a
                  href={p.href}
                  className="grid grid-cols-[48px_minmax(0,1fr)] items-center gap-4 border-b border-rule py-4 hover:text-accent md:grid-cols-[48px_72px_minmax(0,1fr)_140px] md:gap-5"
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded ${
                      p.featured ? "bg-accent text-paper" : "bg-card text-ink"
                    }`}
                  >
                    <PlayIcon />
                  </span>
                  <span className="hidden text-[13px] text-muted md:block">{p.year}</span>
                  <span>
                    <span className="font-medium">{p.show}</span>{" "}
                    <span className="text-muted">— {p.title}</span>
                    <span className="text-muted md:hidden"> · {p.year}</span>
                  </span>
                  <span className="hidden text-right text-[13px] text-muted md:block">{p.topics[0]}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {showNews ? (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="flex flex-col gap-2 md:col-span-3">
            <h2 className="font-display text-[32px] font-normal tracking-[-0.01em]">In the news</h2>
            <span className="text-sm leading-relaxed text-muted">
              What other people wrote. The two OBJ profiles are the ones to read.
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-9">
            {news.map((n, i) => (
              <a
                key={i}
                href={n.href}
                className="flex flex-col gap-2 rounded-md border border-rule bg-white p-5 transition-colors hover:border-ink"
              >
                <span
                  className={`text-xs font-semibold uppercase tracking-[0.1em] ${
                    n.featured ? "text-accent" : "text-muted"
                  }`}
                >
                  {n.outlet} · {n.year}
                </span>
                <span className="font-display text-[20px] leading-[1.25]">{n.title}</span>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
