import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Divider from "@/components/Divider";
import Eyebrow from "@/components/Eyebrow";
import LightboxGrid from "@/components/LightboxGrid";
import BookButton from "@/components/BookButton";
import { properties } from "@/lib/properties";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) return {};
  return {
    title: `${property.dining.name} | Dining at ${property.name} Lonavala`,
    description: property.dining.description,
  };
}

export default async function DiningDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) notFound();

  const otherProperty = properties.find((p) => p.slug !== slug);

  // Custom details for the dining venues to display on the page
  const cuisineType = slug === "diwatel-grande-resort" 
    ? "Indian, Chinese, Continental, and Local Maharashtrian" 
    : "Home-Style Indian, Regional Favorites & Customizable Menus";

  const timings = slug === "diwatel-grande-resort" 
    ? "7:00 AM – 11:00 PM (All-day dining)" 
    : "8:00 AM – 10:30 PM (On request campfire dining)";

  const diningFeatures = slug === "diwatel-grande-resort"
    ? ["Indoor Air-Conditioned Seating", "Al-Fresco Garden Deck", "Private Dining Rooms", "Buffet & A-La-Carte Options"]
    : ["Poolside Dining Area", "Private Villa Kitchen Setup", "Barbecue & Bonfire Grills", "Customized Group Menus"];

  return (
    <>
      {/* Hero section */}
      <div className="relative h-[48vh] min-h-[340px] sm:h-[58vh] w-full overflow-hidden">
        <Image
          src={property.dining.image}
          alt={`${property.dining.name} restaurant space`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-5">
          <Eyebrow>{property.name}</Eyebrow>
          <h1 className="font-display text-ivory text-4xl sm:text-6xl mt-2">
            {property.dining.name}
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-gold-pale tracked-caps font-medium">
            Fine Dining in Lonavala
          </p>
        </div>
      </div>

      {/* Main Dining Info */}
      <div className="bg-ivory py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            
            {/* Left Column: Description & Details */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] tracked-caps text-gold-text font-semibold">The Gastronomy</span>
              <h2 className="font-display text-3xl sm:text-4xl text-forest font-bold leading-tight">
                Refined Culinary Experiences
              </h2>
              <Divider className="my-4 !justify-start" />
              <p className="text-sm sm:text-base text-ink/75 leading-relaxed font-light">
                {property.dining.description}
              </p>
              <p className="text-sm text-ink/70 leading-relaxed font-light">
                Our kitchen utilizes locally sourced organic ingredients, fresh herbs, and hand-ground spices to bring out the authentic flavors of the Sahyadri region, alongside well-curated global cuisines.
              </p>

              {/* Booking CTA block */}
              <div className="pt-6">
                <BookButton
                  slug={property.slug}
                  className="inline-flex items-center gap-2 bg-gold-deep hover:bg-forest text-ink hover:text-ivory px-8 py-3.5 tracked-caps text-[11px] font-medium transition-colors"
                >
                  Book a Table Now
                </BookButton>
              </div>
            </div>

            {/* Right Column: Restaurant Specs Panel */}
            <div className="lg:col-span-5 bg-stone/45 border border-stone-dark/30 rounded-lg p-6 sm:p-8 space-y-6">
              <h3 className="font-display text-xl text-forest font-semibold border-b border-stone-dark/40 pb-3">
                Venue Overview
              </h3>
              
              <div className="space-y-4">
                <div>
                  <span className="block text-[10px] text-ink/50 uppercase tracking-wider font-semibold">Cuisine Type</span>
                  <span className="text-sm text-ink font-medium mt-1 block">{cuisineType}</span>
                </div>
                
                <div>
                  <span className="block text-[10px] text-ink/50 uppercase tracking-wider font-semibold">Operating Hours</span>
                  <span className="text-sm text-ink font-medium mt-1 block">{timings}</span>
                </div>

                <div>
                  <span className="block text-[10px] text-ink/50 uppercase tracking-wider font-semibold">Venue Features</span>
                  <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink/75">
                    {diningFeatures.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 bg-gold-deep rounded-full shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Gallery Section */}
          <div className="mt-20 sm:mt-28">
            <div className="text-center mb-10">
              <Eyebrow>Gallery</Eyebrow>
              <h3 className="font-display text-3xl sm:text-4xl text-forest font-bold">
                Ambience & Culinary Art
              </h3>
              <Divider className="mt-5" />
            </div>

            <LightboxGrid images={property.diningGallery} alt={`${property.dining.name} photos`} />
          </div>

          {/* Alternate Dining Picker Link */}
          {otherProperty && (
            <div className="mt-20 sm:mt-28 border-t border-stone-dark/40 pt-16 text-center">
              <p className="tracked-caps text-[11px] text-gold-text mb-3">
                Explore Dining at our alternative property
              </p>
              <Link
                href={`/dining/${otherProperty.slug}`}
                className="font-display text-2xl sm:text-3xl text-forest hover:text-gold-deep transition-colors block font-semibold"
              >
                {otherProperty.dining.name} at {otherProperty.name} &rarr;
              </Link>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
