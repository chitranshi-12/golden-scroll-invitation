import { useState, useCallback } from "react";
import EnvelopeOpening from "@/components/wedding/EnvelopeOpening";
import HeroSection from "@/components/wedding/HeroSection";
import StorySection from "@/components/wedding/StorySection";
import GallerySection from "@/components/wedding/GallerySection";
import ScheduleSection from "@/components/wedding/ScheduleSection";
import VenueSection from "@/components/wedding/VenueSection";
import RSVPSection from "@/components/wedding/RSVPSection";
import FooterSection from "@/components/wedding/FooterSection";

const Index = () => {
  const [envelopeDone, setEnvelopeDone] = useState(false);

  const handleEnvelopeComplete = useCallback(() => {
    setEnvelopeDone(true);
  }, []);

  return (
    <div className="min-h-screen bg-wedding-ivory">
      {!envelopeDone && <EnvelopeOpening onComplete={handleEnvelopeComplete} />}
      <HeroSection />
      <StorySection />
      <GallerySection />
      <ScheduleSection />
      <VenueSection />
      <RSVPSection />
      <FooterSection />
    </div>
  );
};

export default Index;
