import Image from "next/image";
import Link from "next/link";
import Divider from "./Divider";
import Eyebrow from "./Eyebrow";
import { properties } from "@/lib/properties";

export default function GroupIntro() {
  return (
    <section className="bg-ivory py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 text-center">
        <Eyebrow>Welcome to Riyo Hospitality</Eyebrow>
        <h2 className="font-display text-3xl sm:text-5xl text-forest leading-tight">
          Rest, Rejoice, and Reconnect in the Hills of Lonavala
        </h2>
        <Divider className="my-6" />
        <p className="text-[15px] sm:text-base leading-relaxed text-ink/75 font-light max-w-3xl mx-auto">
          Lonavala has always been the breath of life for Mumbai and Pune &ndash; valleys shrouded in mist, forts and the aroma of chikki in the air. We have two resorts that exist right here in Lonavala &ndash; Diwatel Grande Resort for business meets and grand celebrations, and Reviniere Resort and Villa for privacy and personal get-togethers. But regardless of which resort you visit, you can be sure of the same level of luxury and hospitality.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-6 mt-14 sm:mt-16 grid gap-6 sm:gap-8 sm:grid-cols-2">
        {properties.map((p) => (
          <Link
            key={p.slug}
            href={`/resorts/${p.slug}`}
            className="group relative block overflow-hidden aspect-[4/5] sm:aspect-[3/4]"
          >
            <Image
              src={p.cardImage}
              alt={p.name}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="tracked-caps text-[10px] text-gold-pale mb-2">{p.location}</p>
              <h3 className="font-display text-2xl sm:text-3xl text-ivory">{p.name}</h3>
              <p className="mt-1 text-sm text-ivory/80 font-light">{p.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] tracked-caps text-gold border-b border-gold pb-1 group-hover:text-ivory group-hover:border-ivory transition-colors">
                Explore Resort
                <svg width="12" height="9" viewBox="0 0 12 9" fill="none" aria-hidden="true">
                  <path d="M0 4.5h11M7.5 1l3.5 3.5L7.5 8" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
