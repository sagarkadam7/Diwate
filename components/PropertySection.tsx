import Image from "next/image";
import Link from "next/link";
import Divider from "./Divider";
import Eyebrow from "./Eyebrow";
import BookingBar from "./BookingBar";
import type { Property } from "@/lib/properties";

export default function PropertySection({ property }: { property: Property }) {
  const reverse = false;

  return (
    <section id={property.slug} className="scroll-mt-16">
      {/* Property intro banner */}
      <div className="relative h-[46vh] min-h-[320px] sm:h-[56vh] w-full overflow-hidden">
        <Image
          src={property.heroImage}
          alt={`${property.name} exterior`}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-5">
          <p className="tracked-caps text-[11px] text-gold-pale mb-3">{property.location}</p>
          <h2 className="font-display text-ivory text-4xl sm:text-6xl">{property.name}</h2>
          <p className="mt-3 text-sm sm:text-base text-ivory/85 font-light">{property.tagline}</p>
        </div>
      </div>

      <BookingBar defaultSlug={property.slug} />

      <div className="bg-ivory py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 text-center">
          <p className="text-[15px] sm:text-base leading-relaxed text-ink/75 font-light">
            {property.intro}
          </p>
        </div>

        {/* Rooms */}
        <div className="mx-auto max-w-6xl px-5 sm:px-6 mt-16 sm:mt-20">
          <div className="text-center mb-10 sm:mb-14">
            <Eyebrow>Stay</Eyebrow>
            <h3 className="font-display text-3xl sm:text-4xl text-forest">
              Where Every Stay Feels Like a Retreat
            </h3>
            <Divider className="mt-5" />
          </div>
          <div className="grid gap-8 sm:gap-6 sm:grid-cols-3">
            {property.rooms.map((room) => (
              <div key={room.name} className="group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h4 className="font-display text-xl text-forest mt-5">{room.name}</h4>
                <p className="tracked-caps text-[10px] text-gold-text mt-1.5">
                  {room.size} &middot; {room.occupancy}
                </p>
                <p className="mt-3 text-sm text-ink/70 font-light leading-relaxed">
                  {room.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dining */}
        <div id={`${property.slug}-dining`} className="mx-auto max-w-6xl px-5 sm:px-6 mt-20 sm:mt-28">
          <div
            className={`flex flex-col ${
              reverse ? "sm:flex-row-reverse" : "sm:flex-row"
            } items-center gap-8 sm:gap-14`}
          >
            <div className="relative w-full sm:w-1/2 aspect-[4/3]">
              <Image
                src={property.dining.image}
                alt={property.dining.name}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="w-full sm:w-1/2 text-center sm:text-left">
              <Eyebrow>Savour</Eyebrow>
              <h3 className="font-display text-3xl sm:text-4xl text-forest">
                {property.dining.name}
              </h3>
              <p className="mt-4 text-sm sm:text-base text-ink/70 font-light leading-relaxed">
                {property.dining.description}
              </p>
            </div>
          </div>
        </div>

        {/* Facilities */}
        <div className="mx-auto max-w-6xl px-5 sm:px-6 mt-20 sm:mt-28">
          <div className="text-center mb-10 sm:mb-14">
            <Eyebrow>Amenities</Eyebrow>
            <h3 className="font-display text-3xl sm:text-4xl text-forest">
              Facilities That Turn Stays Into Stories
            </h3>
            <Divider className="mt-5" />
          </div>
          <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
            {property.facilities.map((f) => (
              <div key={f.name} className="text-center">
                <div className="relative aspect-square overflow-hidden rounded-full sm:rounded-none mx-auto max-w-[160px] sm:max-w-none">
                  <Image
                    src={f.image}
                    alt={f.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <h4 className="font-display text-base sm:text-lg text-forest mt-4">{f.name}</h4>
                {f.hours && (
                  <p className="tracked-caps text-[9px] sm:text-[10px] text-ink/50 mt-1">
                    {f.hours}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Gallery teaser — full gallery lives on its own route */}
        <div className="mx-auto max-w-6xl px-5 sm:px-6 mt-20 sm:mt-28">
          <div className="text-center mb-10">
            <Eyebrow>Gallery</Eyebrow>
            <h3 className="font-display text-3xl sm:text-4xl text-forest">
              Glimpses of {property.name}
            </h3>
            <Divider className="mt-5" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {property.gallery.slice(0, 5).map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden ${
                  i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                }`}
              >
                <Image
                  src={src}
                  alt={`${property.name} gallery photo ${i + 1}`}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href={`/gallery/${property.slug}`}
              className="inline-flex items-center gap-2 border border-forest px-7 py-3 tracked-caps text-[11px] font-medium text-forest hover:bg-forest hover:text-ivory transition-colors"
            >
              View Full Gallery ({property.gallery.length} Photos)
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
