import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertySection from "@/components/PropertySection";
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
    title: `${property.name} | ${property.location} | Diwate Hospitality`,
    description: property.intro,
  };
}

export default async function ResortPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) notFound();

  return <PropertySection property={property} />;
}
