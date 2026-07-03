import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Divider from "@/components/Divider";
import Eyebrow from "@/components/Eyebrow";
import LightboxGrid from "@/components/LightboxGrid";
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
    title: `${property.name} Gallery | Riyo Hospitality`,
    description: `Browse ${property.gallery.length} photos of ${property.name} in ${property.location}.`,
  };
}

export default async function ResortGalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) notFound();

  const otherProperty = properties.find((p) => p.slug !== slug);

  return (
    <>
      <div className="pt-28 sm:pt-36 pb-12 sm:pb-16 px-5 sm:px-6 text-center bg-forest text-ivory">
        <Eyebrow>{property.location}</Eyebrow>
        <h1 className="font-display text-4xl sm:text-6xl">{property.name}</h1>
        <Divider className="mt-6 mb-4" />
        <p className="text-sm sm:text-base text-ivory/70 font-light">
          {property.gallery.length} photos
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-14 sm:py-20">
        <LightboxGrid images={property.gallery} alt={property.name} />
      </div>

      {otherProperty && (
        <div className="border-t border-stone-dark py-12 sm:py-16 text-center px-5">
          <p className="tracked-caps text-[11px] text-gold-text mb-3">Looking for the other resort?</p>
          <Link
            href={`/gallery/${otherProperty.slug}`}
            className="font-display text-2xl sm:text-3xl text-forest hover:text-gold-deep transition-colors"
          >
            View {otherProperty.name} Gallery &rarr;
          </Link>
        </div>
      )}
    </>
  );
}
