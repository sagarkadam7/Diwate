"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { heroSlides } from "@/lib/properties";

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative h-[92vh] min-h-[560px] w-full overflow-hidden bg-forest">
      {heroSlides.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt="A resort of Riyo Hospitality in Lonavala"
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/60" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
        <h1 className="font-display text-ivory text-[2.5rem] leading-[1.08] sm:text-6xl md:text-7xl max-w-4xl drop-shadow-lg">
          Two Resorts. <span className="text-gold">One Standard of Luxury.</span>
        </h1>
        <div className="mt-9 flex flex-col sm:flex-row gap-4 w-full max-w-md sm:max-w-none sm:w-auto">
          <a
            href="/resorts/diwatel-grande-resort"
            className="inline-flex items-center justify-center bg-ivory text-forest px-8 py-4 tracked-caps text-[11px] font-semibold hover:bg-gold hover:text-ink transition-all duration-300 shadow-md border border-transparent"
          >
            Diwatel Grande Resort
          </a>
          <a
            href="/resorts/reviniere-resort-and-villa"
            className="inline-flex items-center justify-center bg-ivory text-forest px-8 py-4 tracked-caps text-[11px] font-semibold hover:bg-gold hover:text-ink transition-all duration-300 shadow-md border border-transparent"
          >
            Reviniere Resort and Villa
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 sm:bottom-20 inset-x-0 z-10 flex justify-center gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-[3px] rounded-full transition-all duration-500 ${
              i === index ? "w-10 bg-gold" : "w-6 bg-ivory/40 hover:bg-ivory/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
