# jasonflick.me

Jason Flick's personal site. *Wired to wonder. Built to experiment. Here for all of it.*

A reference, not a brochure: bios, photos, talks, projects, boards, and what Jason is doing right now — kept current by telling Claude what changed.

## Stack

- **Next.js 16** (App Router, static prerender, Cache Components on)
- **TypeScript**, **Tailwind CSS 4** (design tokens in `src/app/globals.css`)
- **Markdown / MDX** content in `content/`, rendered with `next-mdx-remote`
- Fonts: Fraunces (display) + Inter (body) via `next/font`
- Deploys on **Vercel** from `main`

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks)
npm run lint
```

## Where the content lives

Everything a visitor reads is a plain file under `content/`. Edit the file, commit, and Vercel redeploys in about a minute.

| What | File(s) |
|---|---|
| Name, tagline, intro, email, social links, the three doors, word of the year, "ask me about" | `content/site.json` |
| Projects (Experiment door) | `content/projects/*.md` — frontmatter: `title, summary, status, tags, year, featured, order, image, imageAlt, links` |
| Essays (Wonder door) | `content/essays/*.mdx` — frontmatter: `title, summary, date, tags, draft`. `draft: true` lists it under "In the works" without a public page link |
| Talks, podcasts, news, awards | `content/media.json` |
| Bios (short/medium/long), on-stage intro, press photos, "the facts" | `content/bios.json` |
| Boards, give-back roles, investments | `content/giveback.json` |
| Now page (word of the year, building, reading, where + free text) | `content/now.md` |
| Images | `public/images/` |

`status` for a project is one of `active · ongoing · shipped · acquired · paused · earlier`. Anything in `[square brackets]` is a placeholder Jason still needs to fill.

## Routes

```
/                 home — hero, three doors, Now band, About teaser
/wonder           essays           /wonder/[slug]
/experiment       projects         /experiment/[slug]
/all-of-it        give-back, media teaser, investments, outside, now
/all-of-it/media  talks & media (filters by format and topic)
/about            the long version
/press            press kit — intro, bios, photos, facts, recognition
/now              now page
/contact
```

## Deploy on Vercel

1. Import the `jflick4/jasonflick.me` repo at vercel.com/new (framework auto-detects as Next.js; no env vars needed).
2. Every push to `main` deploys to production; every branch/PR gets a preview URL.
3. Point the domain: in Vercel → Project → Domains add `jasonflick.me` and `www.jasonflick.me`, then at DreamHost set the DNS records Vercel shows (an `A` record for the apex and a `CNAME` for `www`). The old WordPress site stays live until the DNS switch.

## Design

Direction "B" from the design canvas: warm paper `#F4EFE6`, ink `#1C1A17`, one accent — Jason red `#C8372D` — reserved for actions and the current page. Fraunces light for headlines, Inter for everything else. Brand brief and media inventory live in the Claude project.
