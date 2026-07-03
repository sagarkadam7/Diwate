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
    title: `Banquet Lawns & Events at ${property.name} Lonavala`,
    description: `Host weddings, family get-togethers, and corporate events at ${property.name}. Browse facilities and photos.`,
  };
}

export default async function EventsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) notFound();

  const otherProperty = properties.find((p) => p.slug !== slug);

  // Custom details for event venues to display on the page
  const lawnCapacity = slug === "diwatel-grande-resort" 
    ? "Up to 500+ guests (Large banquet lawns & indoor conference halls)" 
    : "Up to 50-80 guests (Boutique poolside deck and private villa lawns)";

  const eventTypes = slug === "diwatel-grande-resort" 
    ? "Corporate Offsites, Weddings, Receptions, Conferences & Family Gala Gatherings" 
    : "Intimate Birthday Bash, Poolside Sunset Parties, Private Family Anniversaries & Corporate Board retreats";

  const cateringSpecs = slug === "diwatel-grande-resort"
    ? "In-house gourmet catering (Veg/Non-Veg multi-cuisine buffet spreads)"
    : "Customized live counters, poolside barbecue grill setup, custom party menus";

  const eventSpecs = slug === "diwatel-grande-resort"
    ? ["Sound & AV Equipment Available", "Valet Parking Services", "Power Backup Support", "Bridal Changing Rooms"]
    : ["Private Villa Takeover Option", "Outdoor Campfire & Barbecue Grid", "DJ Sound Setup Permitted", "Ambient Night Lighting"];

  return (
    <>
      {/* Hero section */}
      <div className="relative h-[48vh] min-h-[340px] sm:h-[58vh] w-full overflow-hidden">
        <Image
          src={property.eventsGallery[0] || property.facilities[0].image}
          alt={`Events at ${property.name}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-5">
          <Eyebrow>{property.name}</Eyebrow>
          <h1 className="font-display text-ivory text-4xl sm:text-6xl mt-2">
            Celebrations & Meets
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-gold-pale tracked-caps font-medium">
            Signature Event Spaces in Lonavala
          </p>
        </div>
      </div>

      {/* Main Events Info */}
      <div className="bg-ivory py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            
            {/* Left Column: Description & Details */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] tracked-caps text-gold-text font-semibold">The Settings</span>
              <h2 className="font-display text-3xl sm:text-4xl text-forest font-bold leading-tight">
                Crafting Memories Under Lonavala Skies
              </h2>
              <Divider className="my-4 !justify-start" />
              <p className="text-sm sm:text-base text-ink/75 leading-relaxed font-light">
                Whether you're organizing a focused corporate board brainstorming session, a destination wedding celebration, or a cozy campfire anniversary party, Diwate Hospitality offers refined venues tailored to host your moments.
              </p>
              <p className="text-sm text-ink/70 leading-relaxed font-light">
                Our team takes care of styling layouts, customized banquet menus, audio-visual coordinate requirements, and power support so you can focus entirely on your guests.
              </p>

              {/* Booking CTA block */}
              <div className="pt-6">
                <BookButton
                  slug={property.slug}
                  className="inline-flex items-center gap-2 bg-gold-deep hover:bg-forest text-ink hover:text-ivory px-8 py-3.5 tracked-caps text-[11px] font-medium transition-colors"
                >
                  Enquire About Packages
                </BookButton>
              </div>
            </div>

            {/* Right Column: Event Specs Panel */}
            <div className="lg:col-span-5 bg-stone/45 border border-stone-dark/30 rounded-lg p-6 sm:p-8 space-y-6">
              <h3 className="font-display text-xl text-forest font-semibold border-b border-stone-dark/40 pb-3">
                Venue Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <span className="block text-[10px] text-ink/50 uppercase tracking-wider font-semibold">Capacity Limit</span>
                  <span className="text-sm text-ink font-medium mt-1 block">{lawnCapacity}</span>
                </div>
                
                <div>
                  <span className="block text-[10px] text-ink/50 uppercase tracking-wider font-semibold">Best Suited For</span>
                  <span className="text-sm text-ink font-medium mt-1 block">{eventTypes}</span>
                </div>

                <div>
                  <span className="block text-[10px] text-ink/50 uppercase tracking-wider font-semibold">Catering Capabilities</span>
                  <span className="text-sm text-ink font-medium mt-1 block">{cateringSpecs}</span>
                </div>

                <div>
                  <span className="block text-[10px] text-ink/50 uppercase tracking-wider font-semibold">Event Perks</span>
                  <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink/75">
                    {eventSpecs.map((feat) => (
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
                Moments of Celebrations
              </h3>
              <Divider className="mt-5" />
            </div>

            <LightboxGrid images={property.eventsGallery} alt={`Event celebration photos at ${property.name}`} />
          </div>

          {/* Alternate Events Picker Link */}
          {otherProperty && (
            <div className="mt-20 sm:mt-28 border-t border-stone-dark/40 pt-16 text-center">
              <p className="tracked-caps text-[11px] text-gold-text mb-3">
                Explore Event Spaces at our alternate resort
              </p>
              <Link
                href={`/events/${otherProperty.slug}`}
                className="font-display text-2xl sm:text-3xl text-forest hover:text-gold-deep transition-colors block font-semibold"
              >
                Event Spaces at {otherProperty.name} &rarr;
              </Link>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
