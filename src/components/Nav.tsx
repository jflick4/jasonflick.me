"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import site from "../../content/site.json";
import { doorIcons } from "./Icons";

const utility = [
  { label: "About", href: "/about" },
  { label: "Press kit", href: "/press" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="w-full">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-12"
      >
        <Link
          href="/"
          className="font-display text-[22px] font-medium tracking-tight hover:text-accent"
          onClick={() => setOpen(false)}
        >
          Jason Flick
        </Link>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded md:hidden"
          aria-expanded={open}
          aria-controls="primary-links"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>

        <div
          id="primary-links"
          className={`${open ? "flex" : "hidden"} w-full flex-col gap-4 pt-2 text-[15px] font-medium md:flex md:w-auto md:flex-row md:items-center md:gap-7 md:pt-0`}
        >
          {site.doors.map((d) => {
            const Icon = doorIcons[d.key as keyof typeof doorIcons];
            const active = isActive(d.href);
            return (
              <Link
                key={d.key}
                href={d.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 pb-0.5 hover:text-accent ${
                  active ? "border-b-2 border-accent" : ""
                }`}
              >
                <Icon size={16} />
                {d.label}
              </Link>
            );
          })}
          {utility.map((u) => (
            <Link
              key={u.href}
              href={u.href}
              onClick={() => setOpen(false)}
              className={`pb-0.5 hover:text-accent ${
                isActive(u.href) ? "border-b-2 border-accent text-ink" : "text-muted"
              }`}
            >
              {u.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
