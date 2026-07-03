"use client";

import { useBooking } from "@/lib/booking-context";

type BookButtonProps = {
  slug?: string;
  className?: string;
  children: React.ReactNode;
};

export default function BookButton({ slug, className, children }: BookButtonProps) {
  const { openBooking } = useBooking();

  return (
    <button
      onClick={() => openBooking(slug)}
      className={`${className} cursor-pointer`}
    >
      {children}
    </button>
  );
}
