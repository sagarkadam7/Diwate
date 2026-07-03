"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { properties } from "@/lib/properties";
import { useBooking } from "@/lib/booking-context";

const navLinks = [
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { openBooking } = useBooking();

  // Mobile navigation accordion states
  const [mobileResortsOpen, setMobileResortsOpen] = useState(true);
  const [mobileDiningOpen, setMobileDiningOpen] = useState(false);
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);

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
              {/* Resorts Dropdown */}
              <div className="group relative">
                <button className="flex items-center gap-1 py-2 cursor-pointer hover:text-gold transition-colors">
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

              {/* Dining Dropdown with Photos */}
              <div className="group relative">
                <button className="flex items-center gap-1 py-2 cursor-pointer hover:text-gold transition-colors">
                  Dining
                  <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true">
                    <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </button>
                <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200 ease-out absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[455px]">
                  <div className="bg-forest text-ivory shadow-2xl p-4 normal-case tracking-normal border-t-2 border-gold grid grid-cols-2 gap-4">
                    {properties.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/dining/${p.slug}`}
                        className="group/item block overflow-hidden rounded"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden rounded mb-2 border border-gold-pale/10">
                          <Image
                            src={p.dining.image}
                            alt={`Dining at ${p.name}`}
                            fill
                            sizes="210px"
                            className="object-cover transition-transform duration-500 group-hover/item:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/25 group-hover/item:bg-transparent transition-colors" />
                        </div>
                        <span className="block text-xs font-semibold text-ivory group-hover/item:text-gold transition-colors font-display text-center leading-tight">
                          {p.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Events Dropdown with Photos */}
              <div className="group relative">
                <button className="flex items-center gap-1 py-2 cursor-pointer hover:text-gold transition-colors">
                  Events
                  <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true">
                    <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </button>
                <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200 ease-out absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[455px]">
                  <div className="bg-forest text-ivory shadow-2xl p-4 normal-case tracking-normal border-t-2 border-gold grid grid-cols-2 gap-4">
                    {properties.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/events/${p.slug}`}
                        className="group/item block overflow-hidden rounded"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden rounded mb-2 border border-gold-pale/10">
                          <Image
                            src={p.eventsGallery[0] || p.facilities[0].image}
                            alt={`Events at ${p.name}`}
                            fill
                            sizes="210px"
                            className="object-cover transition-transform duration-500 group-hover/item:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/25 group-hover/item:bg-transparent transition-colors" />
                        </div>
                        <span className="block text-xs font-semibold text-ivory group-hover/item:text-gold transition-colors font-display text-center leading-tight">
                          {p.name}
                        </span>
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
              <button
                onClick={() => openBooking()}
                className="hidden sm:inline-flex items-center bg-gold-deep hover:bg-forest text-ink hover:text-ivory px-5 py-2.5 tracked-caps text-[11px] font-medium transition-colors cursor-pointer"
              >
                Book Now
              </button>
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
        <nav className="flex flex-col px-6 py-6 gap-3">
          
          {/* Mobile resorts accordion */}
          <div>
            <button
              onClick={() => setMobileResortsOpen((v) => !v)}
              className="w-full flex items-center justify-between py-3 border-b border-stone-dark/60 text-forest font-display text-xl cursor-pointer"
            >
              <span>Our Resorts</span>
              <svg
                width="12" height="8" viewBox="0 0 12 8" fill="none"
                className={`text-gold transition-transform duration-200 ${mobileResortsOpen ? "rotate-180" : ""}`}
              >
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <div className={`mt-2 space-y-2 overflow-hidden transition-all duration-300 ${mobileResortsOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
              {properties.map((p) => (
                <Link
                  key={p.slug}
                  href={`/resorts/${p.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-2 bg-stone/30 rounded border border-stone-dark/10 hover:border-gold transition-colors"
                >
                  <div className="relative w-14 h-10 overflow-hidden rounded shrink-0">
                    <Image src={p.heroImage} alt={p.name} fill className="object-cover" />
                  </div>
                  <span className="text-sm font-display font-medium text-ink">{p.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile dining accordion */}
          <div>
            <button
              onClick={() => setMobileDiningOpen((v) => !v)}
              className="w-full flex items-center justify-between py-3 border-b border-stone-dark/60 text-forest font-display text-xl cursor-pointer"
            >
              <span>Dining</span>
              <svg
                width="12" height="8" viewBox="0 0 12 8" fill="none"
                className={`text-gold transition-transform duration-200 ${mobileDiningOpen ? "rotate-180" : ""}`}
              >
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <div className={`mt-2 space-y-2 overflow-hidden transition-all duration-300 ${mobileDiningOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
              {properties.map((p) => (
                <Link
                  key={p.slug}
                  href={`/dining/${p.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-2 bg-stone/30 rounded border border-stone-dark/10 hover:border-gold transition-colors"
                >
                  <div className="relative w-14 h-10 overflow-hidden rounded shrink-0">
                    <Image src={p.dining.image} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gold-text uppercase tracking-wider font-semibold font-body">
                      {p.dining.name}
                    </span>
                    <span className="text-sm font-display text-ink font-medium leading-none mt-0.5">{p.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile events accordion */}
          <div>
            <button
              onClick={() => setMobileEventsOpen((v) => !v)}
              className="w-full flex items-center justify-between py-3 border-b border-stone-dark/60 text-forest font-display text-xl cursor-pointer"
            >
              <span>Events & Lawns</span>
              <svg
                width="12" height="8" viewBox="0 0 12 8" fill="none"
                className={`text-gold transition-transform duration-200 ${mobileEventsOpen ? "rotate-180" : ""}`}
              >
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <div className={`mt-2 space-y-2 overflow-hidden transition-all duration-300 ${mobileEventsOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
              {properties.map((p) => (
                <Link
                  key={p.slug}
                  href={`/events/${p.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-2 bg-stone/30 rounded border border-stone-dark/10 hover:border-gold transition-colors"
                >
                  <div className="relative w-14 h-10 overflow-hidden rounded shrink-0">
                    <Image src={p.eventsGallery[0] || p.facilities[0].image} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gold-text uppercase tracking-wider font-semibold font-body">
                      Event Spaces
                    </span>
                    <span className="text-sm font-display text-ink font-medium leading-none mt-0.5">{p.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3.5 border-b border-stone-dark/40 tracked-caps text-xs text-ink/90 font-medium"
            >
              {l.label}
            </Link>
          ))}

          <button
            onClick={() => {
              setOpen(false);
              openBooking();
            }}
            className="mt-6 inline-flex items-center justify-center border border-forest bg-forest text-ivory px-5 py-3.5 tracked-caps text-[11px] font-medium cursor-pointer"
          >
            Book Now
          </button>
        </nav>
      </div>
    </>
  );
}
