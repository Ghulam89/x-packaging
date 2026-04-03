import Link from "next/link";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { getNotFoundMessages } from "@/lib/not-found-messages";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you are looking for does not exist or may have been moved. Return to X Custom Packaging to browse custom boxes and packaging.",
  robots: {
    index: false,
    follow: true,
  },
};

export default async function NotFound() {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "/";
  const m = getNotFoundMessages(pathname);

  return (
    <main className="relative isolate min-h-[60vh] overflow-hidden bg-gradient-to-b from-slate-50 via-white to-[#f8fafc] py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[#213554]/[0.06] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-[#EE334B]/[0.07] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <p className="font-mono text-sm font-semibold tracking-[0.2em] text-[#213554]/80">
          {m.codeLabel}
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#0a0a0a] sm:text-4xl md:text-[2.5rem] md:leading-tight">
          {m.title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-neutral-600">
          {m.description}
        </p>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href={m.primaryHref}
            className="inline-flex items-center justify-center rounded-full bg-[#EE334B] px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#d62d44] hover:shadow-lg focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#EE334B]"
          >
            {m.primaryLabel}
          </Link>
          <Link
            href={m.secondaryHref}
            className="inline-flex items-center justify-center rounded-full border-2 border-[#213554] bg-white px-8 py-3.5 text-sm font-bold text-[#213554] transition-all hover:bg-[#213554] hover:text-white focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#EE334B]"
          >
            {m.secondaryLabel}
          </Link>
        </div>

        <p className="mt-10 text-sm text-neutral-500">
          Need help?{" "}
          <Link
            href="/contact-us"
            className="font-semibold text-[#213554] underline decoration-[#213554]/30 underline-offset-2 transition-colors hover:text-[#EE334B] hover:decoration-[#EE334B]/40"
          >
            Contact our team
          </Link>
        </p>
      </div>
    </main>
  );
}
