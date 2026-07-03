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
            alt="A resort of Diwate Hospitality in Lonavala"
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/50" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
        <p className="tracked-caps text-[11px] sm:text-xs text-gold-pale mb-5">
          Lonavala, Maharashtra
        </p>
        <h1 className="font-display text-ivory text-[2.5rem] leading-[1.08] sm:text-6xl md:text-7xl max-w-4xl">
          Two Resorts. One Standard of Grace.
        </h1>
        <p className="mt-6 max-w-xl text-sm sm:text-base text-ivory/85 font-light">
          Diwatel Grande Resort and Reviniere Resort and Villa — a small collection of premium
          stays in the hills of Lonavala.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-4 w-full max-w-md sm:max-w-none sm:w-auto">
          <a
            href="/resorts/diwatel-grande-resort"
            className="inline-flex items-center justify-center border border-ivory px-7 py-3.5 tracked-caps text-[11px] font-medium text-ivory hover:bg-ivory hover:text-forest transition-colors"
          >
            Diwatel Grande Resort
          </a>
          <a
            href="/resorts/reviniere-resort-and-villa"
            className="inline-flex items-center justify-center border border-gold bg-gold px-7 py-3.5 tracked-caps text-[11px] font-medium text-ink hover:bg-gold-deep hover:border-gold-deep transition-colors"
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
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-7 bg-gold" : "w-1.5 bg-ivory/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
