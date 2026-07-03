import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Divider from "@/components/Divider";
import Eyebrow from "@/components/Eyebrow";
import { properties } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Gallery | Riyo Hospitality",
  description: "Choose a resort to view its full photo gallery.",
};

export default function GalleryPickerPage() {
  return (
    <>
      <div className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-5 sm:px-6 text-center bg-forest text-ivory">
        <Eyebrow>Gallery</Eyebrow>
        <h1 className="font-display text-4xl sm:text-6xl">Choose a Resort</h1>
        <Divider className="mt-6 mb-4" />
        <p className="text-sm sm:text-base text-ivory/70 font-light max-w-xl mx-auto">
          Select a property below to browse its complete photo gallery.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-6 -mt-10 sm:-mt-14 pb-20 sm:pb-28 grid gap-6 sm:gap-8 sm:grid-cols-2">
        {properties.map((p) => (
          <Link
            key={p.slug}
            href={`/gallery/${p.slug}`}
            className="group relative block overflow-hidden aspect-[4/5] sm:aspect-[3/4] shadow-xl"
          >
            <Image
              src={p.cardImage}
              alt={p.name}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="tracked-caps text-[10px] text-gold-pale mb-2">
                {p.gallery.length} Photos
              </p>
              <h2 className="font-display text-2xl sm:text-3xl text-ivory">{p.name}</h2>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] tracked-caps text-gold border-b border-gold pb-1 group-hover:text-ivory group-hover:border-ivory transition-colors">
                View Gallery
                <svg width="12" height="9" viewBox="0 0 12 9" fill="none" aria-hidden="true">
                  <path d="M0 4.5h11M7.5 1l3.5 3.5L7.5 8" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
