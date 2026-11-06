import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex flex-col gap-5 py-24">
      <h1 className="font-display text-[48px] font-light leading-none">Off the trail.</h1>
      <p className="max-w-[520px] text-lg text-muted">
        That page doesn&apos;t exist — or it did and I moved it while reorganizing the van.
      </p>
      <Link href="/" className="self-start rounded bg-ink px-5 py-3 text-paper hover:bg-accent">
        Back home
      </Link>
    </Container>
  );
}
