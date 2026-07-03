import Hero from "@/components/Hero";
import BookingBar from "@/components/BookingBar";
import GroupIntro from "@/components/GroupIntro";
import HighlightsStrip from "@/components/HighlightsStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <BookingBar />
      <div id="our-story">
        <GroupIntro />
      </div>
      <HighlightsStrip />
    </>
  );
}
