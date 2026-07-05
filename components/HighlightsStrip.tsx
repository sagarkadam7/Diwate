import Image from "next/image";
import Divider from "./Divider";
import Eyebrow from "./Eyebrow";

const highlights = [
  { name: "Luxury Rooms", image: "/images/diwate/diwate-07.jpg" },
  { name: "Swimming Pool", image: "/images/diwate/diwate-13.jpg" },
  { name: "Scenic View", image: "/images/diwate/diwate-12.jpg" },
  { name: "Private Balconies", image: "/images/revinerr/reviniere-13.jpg" },
];

export default function HighlightsStrip() {
  return (
    <section className="bg-stone py-16 sm:py-24">
      <div className="text-center mb-10 sm:mb-14 px-5">
        <Eyebrow>Across The Collection</Eyebrow>
        <h2 className="font-display text-3xl sm:text-4xl text-forest">
          Key Highlights of Your Stay
        </h2>
        <Divider className="mt-5" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {highlights.map((h) => (
          <div key={h.name} className="relative group aspect-square overflow-hidden">
            <Image
              src={h.image}
              alt={h.name}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/55 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <h3 className="font-display text-lg sm:text-2xl text-ivory text-center">
                {h.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
