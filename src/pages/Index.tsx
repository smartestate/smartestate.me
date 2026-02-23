import { useEffect } from "react";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import FeatureGallery from "@/components/landing/FeatureGallery";
import Team from "@/components/landing/Team";
import FAQ from "@/components/landing/FAQ";
import EmbeddedWaitlist from "@/components/landing/EmbeddedWaitlist";
// import Footer from "@/components/landing/Footer";
export default function Index({ waitlistOpen, onWaitlistOpenChange }: { waitlistOpen: boolean; onWaitlistOpenChange: (open: boolean) => void }) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('waitlist') === '1') {
          // Open waitlist after mount
          onWaitlistOpenChange(true);
          // clean up the param so repeated loads don't auto-open
          params.delete('waitlist');
          const newUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : '');
          window.history.replaceState({}, '', newUrl);
        }
      }
    } catch (e) {
      // ignore
    }
  }, [onWaitlistOpenChange]);
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero waitlistOpen={waitlistOpen} onWaitlistOpenChange={onWaitlistOpenChange} />
        <EmbeddedWaitlist />
        <HowItWorks />
        <FeatureGallery />
        <Team />
        <FAQ />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
