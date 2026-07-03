"use client";

import { useState, useEffect } from "react";
import { useBooking } from "@/lib/booking-context";
import { properties } from "@/lib/properties";

function toWhatsAppDigits(phone: string) {
  return phone.replace(/[^\d]/g, "");
}

export default function BookingModal() {
  const { isOpen, closeBooking, selectedSlug, setSelectedSlug } = useBooking();

  // Form states
  const [slug, setSlug] = useState(properties[0].slug);
  const [roomName, setRoomName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  // UI Flow states
  // "form" | "loading" | "success"
  const [step, setStep] = useState<"form" | "loading" | "success">("form");
  const [loadingText, setLoadingText] = useState("Verifying room availability...");
  const [bookingId, setBookingId] = useState("");

  const selectedProperty = properties.find((p) => p.slug === slug) ?? properties[0];

  // Sync selected slug from context
  useEffect(() => {
    if (selectedSlug) {
      setSlug(selectedSlug);
    }
  }, [selectedSlug]);

  // Sync room options when resort changes
  useEffect(() => {
    if (selectedProperty) {
      setRoomName(selectedProperty.rooms[0]?.name || "");
    }
  }, [selectedProperty]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut || !guestName || !guestPhone || !guestEmail) {
      alert("Please fill in all details.");
      return;
    }

    setStep("loading");
    setLoadingText("Verifying room availability...");

    // Generate simulated confirmation number
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const prefix = slug === "diwatel-grande-resort" ? "DG" : "RV";
    setBookingId(`${prefix}-${randomNum}`);

    // Loading stages animation
    setTimeout(() => {
      setLoadingText("Securing your luxury suite...");
      setTimeout(() => {
        setLoadingText("Generating confirmation pass...");
        setTimeout(() => {
          setStep("success");
        }, 1200);
      }, 1200);
    }, 1200);
  };

  const handleWhatsAppSend = () => {
    const message = encodeURIComponent(
      `*Luxury Stay Enquiry - Riyo Hospitality*\n\n` +
      `*Booking ID:* ${bookingId}\n` +
      `*Resort:* ${selectedProperty.name}\n` +
      `*Room Type:* ${roomName}\n` +
      `*Check-in:* ${checkIn}\n` +
      `*Check-out:* ${checkOut}\n` +
      `*Guests:* ${adults} Adults, ${children} Children\n` +
      `*Guest Name:* ${guestName}\n` +
      `*Phone:* ${guestPhone}\n` +
      `*Email:* ${guestEmail}\n\n` +
      `Please confirm availability for these dates.`
    );

    window.open(
      `https://wa.me/${toWhatsAppDigits(selectedProperty.phone)}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const resetAndClose = () => {
    setStep("form");
    setCheckIn("");
    setCheckOut("");
    setGuestName("");
    setGuestEmail("");
    setGuestPhone("");
    setAdults("2");
    setChildren("0");
    closeBooking();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/65 backdrop-blur-md transition-opacity duration-300"
        onClick={step !== "loading" ? resetAndClose : undefined}
      />

      {/* Modal Dialog */}
      <div className="relative bg-ivory w-full max-w-lg mx-auto shadow-2xl rounded-lg overflow-hidden border border-gold-pale/30 z-10 transition-all duration-300">
        
        {/* Header decoration */}
        <div className="h-1.5 w-full bg-gradient-to-r from-gold via-gold-deep to-forest" />

        {/* Modal Close Button */}
        {step !== "loading" && (
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 text-ink/40 hover:text-ink/90 transition-colors p-1"
            aria-label="Close booking modal"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        )}

        {/* Content Stages */}
        <div className="px-6 py-8 sm:p-8">
          {step === "form" && (
            <div>
              <div className="text-center mb-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-text font-medium block mb-1">
                  Enquire & Stay
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-forest font-semibold">
                  Reserve Your Retreat
                </h3>
                <p className="text-xs text-ink/50 mt-1 font-light">
                  Lonavala's signature luxury experience is just a reservation away.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Hotel Selection */}
                <div>
                  <label htmlFor="modal-hotel" className="block text-[10px] uppercase tracking-wider text-ink/60 mb-1.5 font-medium">
                    Resort Property
                  </label>
                  <select
                    id="modal-hotel"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full bg-white border border-stone-dark px-3.5 py-2.5 text-xs text-ink rounded outline-none focus:border-gold-deep transition-colors"
                  >
                    {properties.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name} ({p.location})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dynamic Room Selection */}
                <div>
                  <label htmlFor="modal-room" className="block text-[10px] uppercase tracking-wider text-ink/60 mb-1.5 font-medium">
                    Preferred Room / Suite
                  </label>
                  <select
                    id="modal-room"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="w-full bg-white border border-stone-dark px-3.5 py-2.5 text-xs text-ink rounded outline-none focus:border-gold-deep transition-colors"
                  >
                    {selectedProperty.rooms.map((room) => (
                      <option key={room.name} value={room.name}>
                        {room.name} ({room.size})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="modal-checkin" className="block text-[10px] uppercase tracking-wider text-ink/60 mb-1.5 font-medium">
                      Check-In Date
                    </label>
                    <input
                      id="modal-checkin"
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-white border border-stone-dark px-3.5 py-2 text-xs text-ink rounded outline-none focus:border-gold-deep transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-checkout" className="block text-[10px] uppercase tracking-wider text-ink/60 mb-1.5 font-medium">
                      Check-Out Date
                    </label>
                    <input
                      id="modal-checkout"
                      type="date"
                      required
                      min={checkIn || new Date().toISOString().split("T")[0]}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-white border border-stone-dark px-3.5 py-2 text-xs text-ink rounded outline-none focus:border-gold-deep transition-colors"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="modal-adults" className="block text-[10px] uppercase tracking-wider text-ink/60 mb-1.5 font-medium">
                      Adults
                    </label>
                    <select
                      id="modal-adults"
                      value={adults}
                      onChange={(e) => setAdults(e.target.value)}
                      className="w-full bg-white border border-stone-dark px-3.5 py-2 text-xs text-ink rounded outline-none focus:border-gold-deep transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} Adult{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="modal-children" className="block text-[10px] uppercase tracking-wider text-ink/60 mb-1.5 font-medium">
                      Children (Under 12)
                    </label>
                    <select
                      id="modal-children"
                      value={children}
                      onChange={(e) => setChildren(e.target.value)}
                      className="w-full bg-white border border-stone-dark px-3.5 py-2 text-xs text-ink rounded outline-none focus:border-gold-deep transition-colors"
                    >
                      {[0, 1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>
                          {n} Child{n !== 1 ? "ren" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="space-y-3 pt-2 border-t border-stone-dark/40">
                  <p className="text-[10px] uppercase tracking-widest text-gold-text font-semibold">
                    Guest Contact Details
                  </p>
                  <div>
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-white border border-stone-dark px-3.5 py-2.5 text-xs text-ink rounded outline-none focus:border-gold-deep transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full bg-white border border-stone-dark px-3.5 py-2.5 text-xs text-ink rounded outline-none focus:border-gold-deep transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-white border border-stone-dark px-3.5 py-2.5 text-xs text-ink rounded outline-none focus:border-gold-deep transition-colors"
                    />
                  </div>
                </div>

                {/* Book Now Button */}
                <button
                  type="submit"
                  className="w-full mt-6 bg-gold-deep hover:bg-forest text-ink hover:text-ivory py-3.5 px-4 rounded text-[11px] font-medium tracking-[0.2em] uppercase transition-colors shadow-md hover:shadow-lg cursor-pointer"
                >
                  Verify and Book Stay
                </button>
              </form>
            </div>
          )}

          {/* Loading Animation Stage */}
          {step === "loading" && (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="relative mb-6">
                <div className="h-16 w-16 rounded-full border-4 border-gold-pale/30 border-t-gold-deep animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="h-3 w-3 bg-forest rounded-full animate-ping" />
                </div>
              </div>
              <h4 className="font-display text-xl text-forest font-semibold mb-2 animate-pulse">
                Processing Request
              </h4>
              <p className="text-xs text-ink/60 font-light max-w-xs leading-relaxed transition-all duration-300">
                {loadingText}
              </p>
            </div>
          )}

          {/* Success Screen Stage */}
          {step === "success" && (
            <div className="text-center py-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-300 animate-bounce">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-700">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <span className="text-[10px] uppercase tracking-[0.25em] text-green-700 font-semibold block mb-1">
                Room Reserved Successfully
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-forest font-bold mb-4">
                Your Stay is Secured!
              </h3>

              {/* simulated receipt */}
              <div className="bg-stone/60 border border-stone-dark/50 rounded-lg p-5 text-left mb-6 font-body text-xs text-ink/80 space-y-2.5 shadow-inner">
                <div className="flex justify-between border-b border-stone-dark/30 pb-2">
                  <span className="font-bold text-forest">Booking ID:</span>
                  <span className="font-mono text-gold-text font-bold">{bookingId}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-[10px] text-ink/50 uppercase block">Resort</span>
                    <span className="font-medium">{selectedProperty.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink/50 uppercase block">Room Class</span>
                    <span className="font-medium">{roomName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink/50 uppercase block">Arrival</span>
                    <span className="font-medium">{checkIn}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink/50 uppercase block">Departure</span>
                    <span className="font-medium">{checkOut}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink/50 uppercase block">Guests</span>
                    <span className="font-medium">{adults} Adults, {children} Children</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink/50 uppercase block">Guest Name</span>
                    <span className="font-medium truncate block">{guestName}</span>
                  </div>
                </div>
                <div className="border-t border-stone-dark/30 pt-2.5 flex justify-between items-center text-[11px] text-ink/65 italic">
                  <span>*Simulated reservation booking</span>
                  <span className="text-green-700 font-bold font-mono">CONFIRMED</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleWhatsAppSend}
                  className="flex-1 bg-green-700 hover:bg-green-800 text-ivory py-3 px-4 rounded text-[10px] tracking-wider uppercase font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.847.002-2.63-1.02-5.101-2.877-6.96C16.598 1.94 14.12 .915 11.493.915c-5.438 0-9.863 4.414-9.865 9.85-.001 1.761.47 3.483 1.365 5.02L1.97 20.39l4.677-1.236z" />
                  </svg>
                  Sync to WhatsApp
                </button>
                <button
                  onClick={resetAndClose}
                  className="flex-1 border border-stone-dark hover:bg-stone text-ink py-3 px-4 rounded text-[10px] tracking-wider uppercase font-semibold transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
