import { useState, useCallback } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import FeatureGallery from "@/components/landing/FeatureGallery";
import Team from "@/components/landing/Team";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function Index() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const handleJoinWaitlistClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setWaitlistOpen(true), 400);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onJoinWaitlistClick={handleJoinWaitlistClick} />
      <main>
        <Hero waitlistOpen={waitlistOpen} onWaitlistOpenChange={setWaitlistOpen} />
        <HowItWorks />
        <FeatureGallery />
        <Team />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
