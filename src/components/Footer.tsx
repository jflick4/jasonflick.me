import Link from "next/link";
import site from "../../content/site.json";

// Evaluated once at build time (keeps the page fully static).
const YEAR = new Date().getFullYear();

export function Footer({
  heading = "Building something? Say hi.",
}: {
  heading?: string;
}) {
  return (
    <footer id="contact" className="mt-auto border-t border-rule">
      <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-end justify-between gap-6 px-6 pb-10 pt-12 md:px-12">
        <div className="flex flex-col gap-2.5">
          <span className="font-display text-[28px] font-light">{heading}</span>
          <a href={`mailto:${site.email}`} className="text-accent hover:text-accent-deep">
            {site.email}
          </a>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-muted">
          <a href={site.social.linkedin} className="hover:text-ink" rel="me">
            LinkedIn
          </a>
          <Link href="/press" className="hover:text-ink">
            Press kit
          </Link>
          <Link href="/now" className="hover:text-ink">
            Now
          </Link>
          <span>© {YEAR} Jason Flick</span>
        </div>
      </div>
    </footer>
  );
}
