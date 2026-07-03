"use client";

import React, { createContext, useContext, useState } from "react";

type BookingContextType = {
  isOpen: boolean;
  openBooking: (slug?: string) => void;
  closeBooking: () => void;
  selectedSlug: string;
  setSelectedSlug: (slug: string) => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState("");

  const openBooking = (slug?: string) => {
    if (slug) {
      setSelectedSlug(slug);
    }
    setIsOpen(true);
  };

  const closeBooking = () => setIsOpen(false);

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        openBooking,
        closeBooking,
        selectedSlug,
        setSelectedSlug,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
