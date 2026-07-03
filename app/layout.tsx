import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookingProvider } from "@/lib/booking-context";
import BookingModal from "@/components/BookingModal";
import WhatsAppFab from "@/components/WhatsAppFab";

export const metadata: Metadata = {
  title: "Riyo Hospitality | Diwatel Grande Resort & Reviniere Resort and Villa, Lonavala",
  description:
    "A collection of premium business and luxury resorts in Lonavala. Discover Diwatel Grande Resort and Reviniere Resort and Villa — refined stays, signature dining, and event spaces amid the Sahyadri hills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-ivory text-ink">
        <BookingProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <BookingModal />
          <WhatsAppFab />
        </BookingProvider>
      </body>
    </html>
  );
}


