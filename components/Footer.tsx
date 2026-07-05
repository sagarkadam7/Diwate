"use client";

import Image from "next/image";
import Link from "next/link";
import { properties } from "@/lib/properties";
import { useBooking } from "@/lib/booking-context";

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "TripAdvisor", href: "https://tripadvisor.com" },
];

export default function Footer() {
  const { openBooking } = useBooking();

  return (
    <footer id="contact" className="bg-forest text-ivory">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-10">
          <Image
            src="/images/logo/crest-final.png"
            alt="Riyo Hospitality crest"
            width={745}
            height={462}
            className="h-14 sm:h-16 w-auto object-contain mx-auto mb-5"
          />
          <h2 className="font-display text-3xl sm:text-4xl">Plan Your Stay</h2>
        </div>

        <div className="grid gap-10 sm:gap-8 sm:grid-cols-2">
          {properties.map((p) => (
            <div
              key={p.slug}
              className="border border-ivory/15 px-6 py-8 sm:px-8 sm:py-9 text-center sm:text-left"
            >
              <h3 className="font-display text-xl sm:text-2xl text-gold-pale mb-5">{p.name}</h3>
              <div className="space-y-2.5 text-sm font-light text-ivory/85">
                <p>
                  <a href={`tel:${p.phone.replace(/\s/g, "")}`} className="hover:text-gold transition-colors">
                    {p.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${p.email}`} className="hover:text-gold transition-colors">
                    {p.email}
                  </a>
                </p>
                <p>
                  <a
                    href={p.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-colors"
                  >
                    View on map
                  </a>
                </p>
              </div>
              <button
                onClick={() => openBooking(p.slug)}
                className="mt-6 inline-flex items-center gap-2 text-[11px] tracked-caps text-gold border-b border-gold pb-1 hover:text-ivory hover:border-ivory transition-colors cursor-pointer"
              >
                Enquire Now
              </button>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-ivory/15 pt-8">
          <p className="text-xs text-ivory/50 font-light order-2 sm:order-1">
            &copy; {new Date().getFullYear()} Riyo Hospitality. All rights reserved.
          </p>
          <div className="flex items-center gap-6 order-1 sm:order-2 tracked-caps text-[10px] text-ivory/70">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
