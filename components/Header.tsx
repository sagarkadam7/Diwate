"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { properties } from "@/lib/properties";

const navLinks = [
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // BUG FIX: the header previously went fully bg-transparent when !solid,
  // meaning the gold crest and ivory text sat directly on whatever hero photo
  // was showing with zero guaranteed contrast — on brighter/warm-toned hero
  // frames the mark became unreadable. A permanent scrim removes that
  // dependency entirely: nav content always sits on a dark wash pre-scroll,
  // and on a solid ivory bar post-scroll. There is no more "invisible" state.
  const solid = scrolled || open || !isHome;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          solid
            ? "bg-ivory/95 backdrop-blur shadow-sm"
            : "bg-gradient-to-b from-ink/70 via-ink/35 to-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <Image
                src="/images/logo/crest-final.png"
                alt="Diwate Hospitality crest"
                width={745}
                height={462}
                className="h-9 sm:h-11 w-auto object-contain"
                priority
              />
              <span
                className={`font-display text-lg sm:text-xl tracking-wide leading-none ${
                  solid ? "text-forest" : "text-ivory"
                }`}
              >
                Diwate Hospitality
              </span>
            </Link>

            {/* Desktop nav */}
            <nav
              className={`hidden lg:flex items-center gap-8 tracked-caps text-[11px] font-medium ${
                solid ? "text-ink" : "text-ivory"
              }`}
            >
              <div className="group relative">
                <button className="flex items-center gap-1 py-2">
                  Our Resorts
                  <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true">
                    <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </button>
                <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200 ease-out absolute left-1/2 -translate-x-1/2 top-full pt-3 w-64">
                  <div className="bg-forest text-ivory shadow-2xl py-3 normal-case tracking-normal border-t-2 border-gold">
                    {properties.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/resorts/${p.slug}`}
                        className="block px-5 py-2.5 text-sm hover:bg-forest-light hover:text-gold transition-colors"
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="py-2 hover:text-gold transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/#contact"
                className="hidden sm:inline-flex items-center bg-gold-deep hover:bg-forest text-ink hover:text-ivory px-5 py-2.5 tracked-caps text-[11px] font-medium transition-colors"
              >
                Book Now
              </Link>
              <button
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className={`lg:hidden flex h-10 w-10 items-center justify-center ${
                  solid ? "text-forest" : "text-ivory"
                }`}
              >
                {open ? (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M2 2l18 18M20 2L2 20" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M2 5h18M2 11h18M2 17h18" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-ink/50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 z-50 bg-ivory transition-transform duration-300 ease-out overflow-y-auto ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col px-6 py-8 gap-1">
          <p className="tracked-caps text-[11px] text-gold-text mb-2">Our Resorts</p>
          {properties.map((p) => (
            <Link
              key={p.slug}
              href={`/resorts/${p.slug}`}
              onClick={() => setOpen(false)}
              className="py-3 border-b border-stone-dark text-forest font-display text-xl"
            >
              {p.name}
            </Link>
          ))}
          <div className="h-4" />
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 border-b border-stone-dark tracked-caps text-xs text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center border border-forest bg-forest text-ivory px-5 py-3.5 tracked-caps text-[11px] font-medium"
          >
            Book Now
          </Link>
        </nav>
      </div>
    </>
  );
}
