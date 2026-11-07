import type { Metadata } from "next";
import Link from "next/link";
import site from "../../../content/site.json";
import { Container, Eyebrow, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Founders, builders, organizers, and curious people — say hi.",
};

const reasons = [
  {
    title: "You're building something",
    body: "Founders and builders first. If you're early, stuck, or about to raise or sell, I've probably been where you are. Tell me what you're making and what's hard.",
  },
  {
    title: "You want me on a stage or a mic",
    body: "Talks, panels, podcasts. Mostly lessons learned, shared so the next founder can skip a few scars: selling a company, building with AI, art + technology, Ottawa. The press kit has bios and photos ready to go.",
  },
  {
    title: "You've got a strange idea",
    body: "Physics, consciousness, game engines, robots doing things robots shouldn't. These get answered first.",
  },
  {
    title: "You just want to say hi",
    body: "Also good. Especially if it involves a trail I haven't done.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Building something? Say hi."
        lede="One inbox, read by me. I answer founders and strange ideas first, and everything eventually."
      />
      <Container className="grid grid-cols-1 gap-10 pb-20 md:grid-cols-12">
        <div className="flex flex-col gap-6 md:col-span-5">
          <a
            href={`mailto:${site.email}`}
            className="self-start rounded bg-ink px-6 py-4 font-display text-[22px] text-paper hover:bg-accent"
          >
            {site.email}
          </a>
          <div className="flex flex-col gap-2 text-[15px]">
            <Eyebrow tone="muted">Elsewhere</Eyebrow>
            <a href={site.social.linkedin} className="text-accent hover:text-accent-deep">LinkedIn</a>
            <Link href="/press" className="text-accent hover:text-accent-deep">Press kit</Link>
          </div>
          <p className="text-sm leading-relaxed text-muted">{site.location}</p>
        </div>
        <ul className="flex flex-col border-t border-ink md:col-span-7">
          {reasons.map((r) => (
            <li key={r.title} className="flex flex-col gap-2 border-b border-rule py-6">
              <span className="font-display text-[24px] font-normal leading-tight">{r.title}</span>
              <span className="text-[16px] leading-relaxed text-muted">{r.body}</span>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
