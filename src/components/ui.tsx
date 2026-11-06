import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-6 md:px-12 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  tone = "accent",
}: {
  children: ReactNode;
  tone?: "accent" | "muted" | "dark";
}) {
  const color =
    tone === "accent" ? "text-accent" : tone === "dark" ? "text-muted-dark" : "text-muted";
  return (
    <span className={`text-xs font-semibold uppercase tracking-[0.12em] ${color}`}>
      {children}
    </span>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <Container className="flex flex-col gap-4 pb-10 pt-8 md:pt-12">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="max-w-[820px] font-display text-[40px] font-light leading-[1.08] tracking-[-0.02em] md:text-[56px]">
        {title}
      </h1>
      {lede ? (
        <p className="max-w-[640px] text-lg leading-relaxed text-muted">{lede}</p>
      ) : null}
    </Container>
  );
}

export function SectionTitle({
  title,
  note,
  children,
}: {
  title: ReactNode;
  note?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-display text-[32px] font-normal tracking-[-0.01em]">{title}</h2>
      {note ? <span className="text-sm leading-relaxed text-muted">{note}</span> : null}
      {children}
    </div>
  );
}

/** 3 + 9 column split used on inner pages */
export function Split({
  aside,
  children,
  className = "",
}: {
  aside: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Container className={`grid grid-cols-1 gap-6 pb-16 md:grid-cols-12 ${className}`}>
      <div className="md:col-span-3">{aside}</div>
      <div className="md:col-span-9">{children}</div>
    </Container>
  );
}

export function Pill({
  children,
  active = false,
  href,
}: {
  children: ReactNode;
  active?: boolean;
  href?: string;
}) {
  const cls = `rounded-full px-4 py-2.5 text-sm font-medium ${
    active ? "bg-ink text-paper" : "border border-ink hover:bg-ink hover:text-paper"
  }`;
  return href ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <span className={cls}>{children}</span>
  );
}

export function Button({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
}) {
  const cls =
    variant === "solid"
      ? "bg-ink text-paper hover:bg-accent"
      : "border border-ink hover:bg-ink hover:text-paper";
  const external = href.startsWith("http") || href.startsWith("mailto:");
  return external ? (
    <a href={href} className={`rounded px-5 py-3 text-[15px] font-medium ${cls}`}>
      {children}
    </a>
  ) : (
    <Link href={href} className={`rounded px-5 py-3 text-[15px] font-medium ${cls}`}>
      {children}
    </Link>
  );
}

export function Placeholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded border border-dashed border-muted-dark bg-card-deep p-4 text-center text-[13px] leading-snug text-muted ${className}`}
    >
      {label}
    </div>
  );
}
