import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT = path.join(process.cwd(), "content");

export type ProjectStatus = "active" | "ongoing" | "shipped" | "acquired" | "earlier" | "paused";

export interface ProjectMeta {
  slug: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  tags: string[];
  year?: string;
  featured?: boolean;
  order?: number;
  image?: string;
  imageAlt?: string;
  links?: { label: string; href: string }[];
}

export interface EssayMeta {
  slug: string;
  title: string;
  summary: string;
  date: string; // ISO
  tags: string[];
  draft?: boolean;
}

export interface Doc<M> {
  meta: M;
  content: string;
}

function readDir(dir: string) {
  const full = path.join(CONTENT, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => /\.(md|mdx)$/.test(f))
    .map((f) => {
      const raw = fs.readFileSync(path.join(full, f), "utf8");
      const { data, content } = matter(raw);
      const slug = f.replace(/\.(md|mdx)$/, "");
      return { slug, data, content: stripNotes(content) };
    });
}

const STATUS_RANK: Record<ProjectStatus, number> = {
  active: 0,
  ongoing: 1,
  shipped: 2,
  acquired: 3,
  paused: 4,
  earlier: 5,
};

export function getProjects(): Doc<ProjectMeta>[] {
  return readDir("projects")
    .map(({ slug, data, content }) => ({
      meta: { tags: [], status: "earlier", ...(data as Partial<ProjectMeta>), slug } as ProjectMeta,
      content,
    }))
    .sort((a, b) => {
      const o = (a.meta.order ?? 99) - (b.meta.order ?? 99);
      if (o !== 0) return o;
      return STATUS_RANK[a.meta.status] - STATUS_RANK[b.meta.status];
    });
}

export function getProject(slug: string) {
  return getProjects().find((p) => p.meta.slug === slug) ?? null;
}

export function getEssays({ includeDrafts = false } = {}): Doc<EssayMeta>[] {
  return readDir("essays")
    .map(({ slug, data, content }) => ({
      meta: { tags: [], ...(data as Partial<EssayMeta>), slug } as EssayMeta,
      content,
    }))
    .filter((e) => includeDrafts || !e.meta.draft)
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}

export function getEssay(slug: string) {
  return getEssays({ includeDrafts: true }).find((e) => e.meta.slug === slug) ?? null;
}

/** Strip editorial notes like "[Jason: …]" / "[Draft. …]" so they never render publicly. */
export function stripNotes(md: string) {
  return md
    .replace(/^\s*\[(?:Jason|Draft)[^\]]*\]\s*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function getMarkdown(file: string): { data: Record<string, unknown>; content: string } {
  const raw = fs.readFileSync(path.join(CONTENT, file), "utf8");
  const { data, content } = matter(raw);
  return { data, content: stripNotes(content) };
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}

export function allTags(items: { meta: { tags: string[] } }[]) {
  const s = new Set<string>();
  items.forEach((i) => i.meta.tags.forEach((t) => s.add(t)));
  return [...s];
}
