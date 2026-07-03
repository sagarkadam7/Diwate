"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function LightboxGrid({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, prev, next]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActiveIndex(i)}
            aria-label={`Open photo ${i + 1} of ${images.length}`}
            className="relative aspect-square overflow-hidden group"
          >
            <Image
              src={src}
              alt={`${alt} photo ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-ink/95 flex items-center justify-center px-4 py-8 sm:px-10"
          onClick={close}
        >
          <button
            aria-label="Close"
            onClick={close}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 h-10 w-10 flex items-center justify-center text-ivory"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M2 2l18 18M20 2L2 20" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>

          <button
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 sm:left-6 h-11 w-11 flex items-center justify-center text-ivory"
          >
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
              <path d="M12 1L2 11l10 10" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>

          <div
            className="relative w-full max-w-4xl aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={`${alt} photo ${activeIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 sm:right-6 h-11 w-11 flex items-center justify-center text-ivory"
          >
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
              <path d="M2 1l10 10L2 21" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>

          <p className="absolute bottom-4 sm:bottom-6 inset-x-0 text-center text-ivory/60 text-xs tracked-caps">
            {activeIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
