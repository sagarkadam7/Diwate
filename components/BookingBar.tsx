"use client";

import { useState } from "react";
import { properties } from "@/lib/properties";

function toWhatsAppDigits(phone: string) {
  return phone.replace(/[^\d]/g, "");
}

export default function BookingBar({ defaultSlug }: { defaultSlug?: string }) {
  const [slug, setSlug] = useState(defaultSlug ?? properties[0].slug);
  const selected = properties.find((p) => p.slug === slug) ?? properties[0];

  const handleBook = () => {
    const message = encodeURIComponent(
      `Hi, I'd like to enquire about a stay at ${selected.name}, Lonavala.`
    );
    window.open(
      `https://wa.me/${toWhatsAppDigits(selected.phone)}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="relative z-20 mx-auto w-full max-w-5xl px-4 sm:px-0 sm:-mt-10">
      <div className="bg-ivory/95 backdrop-blur-md shadow-2xl px-5 py-6 sm:px-10 sm:py-7">
        <div className="flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-6">
          {/* Place */}
          <div className="flex-1 min-w-0">
            <label className="tracked-caps text-[10px] text-ink/55 block mb-2">Place</label>
            <div className="flex items-center gap-2.5 border border-stone-dark bg-white px-4 py-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gold-deep shrink-0" aria-hidden="true">
                <path
                  d="M8 15S2.5 9.86 2.5 6.4a5.5 5.5 0 1111 0C13.5 9.86 8 15 8 15z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
                <circle cx="8" cy="6.3" r="2" stroke="currentColor" strokeWidth="1.3" />
              </svg>
              <span className="text-sm text-ink truncate">Lonavala, Maharashtra</span>
            </div>
          </div>

          {/* Hotel */}
          <div className="flex-1 min-w-0">
            <label htmlFor="booking-hotel" className="tracked-caps text-[10px] text-ink/55 block mb-2">
              Hotel
            </label>
            <div className="relative flex items-center gap-2.5 border border-stone-dark bg-white px-4 py-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gold-deep shrink-0" aria-hidden="true">
                <rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.3" />
                <path d="M5 5.5h1M10 5.5h1M5 8.5h1M10 8.5h1M6.5 14v-3h3v3" stroke="currentColor" strokeWidth="1.3" />
              </svg>
              <select
                id="booking-hotel"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full appearance-none bg-transparent text-sm text-ink outline-none cursor-pointer pr-6"
              >
                {properties.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </select>
              <svg
                width="10" height="6" viewBox="0 0 10 6" fill="none"
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ink/50"
                aria-hidden="true"
              >
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </div>
          </div>

          {/* Book Now + Manage Booking */}
          <div className="flex flex-col items-stretch sm:items-center gap-2 sm:shrink-0">
            <button
              type="button"
              onClick={handleBook}
              className="inline-flex items-center justify-center bg-gold-deep hover:bg-forest text-ink hover:text-ivory px-8 py-3.5 tracked-caps text-[11px] font-medium transition-colors whitespace-nowrap"
            >
              Book Now
            </button>
            <a
              href={`tel:${selected.phone.replace(/\s/g, "")}`}
              className="text-center tracked-caps text-[10px] text-ink/55 hover:text-gold-text transition-colors"
            >
              Manage Booking
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
