import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EmbeddedWaitlist from "@/components/landing/EmbeddedWaitlist";
import FeatureGallery from "@/components/landing/FeatureGallery";
import FAQ from "@/components/landing/FAQ";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import ShinyText from "@/components/ui/ShinyText";
import Team from "@/components/landing/Team";

interface IndexProps {
  waitlistOpen: boolean;
  onWaitlistOpenChange: (open: boolean) => void;
}

export default function Index({ waitlistOpen, onWaitlistOpenChange }: IndexProps): JSX.Element {
  const [showSurveyNotice, setShowSurveyNotice] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('waitlist') === '1') {
      onWaitlistOpenChange(true);
      params.delete('waitlist');
      const newUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : '');
      window.history.replaceState({}, '', newUrl);
    }
  }, [onWaitlistOpenChange]);
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero waitlistOpen={waitlistOpen} onWaitlistOpenChange={onWaitlistOpenChange} />
        <HowItWorks />
        <FeatureGallery />
        <Team />
        <FAQ />
        <EmbeddedWaitlist />
      </main>
      {showSurveyNotice && (
        <div className="fixed right-6 bottom-6 w-80 max-w-xs bg-white/95 border border-border rounded-lg shadow-lg p-3 z-50">
          <div className="flex items-start gap-3">
            <div className="flex-1 text-sm">
              We're running a short market research survey to help shape Smart Estate. Your feedback will directly influence features and roadmap.
            </div>
            <button aria-label="Close notice" onClick={() => setShowSurveyNotice(false)} className="text-muted-foreground">
              ✕
            </button>
          </div>
          <div className="mt-3 flex items-center justify-end">
            <motion.button
              onClick={() => { window.location.href = "/market-research-survey"; }}
              className="rounded-full bg-primary text-primary-foreground font-medium cursor-pointer whitespace-nowrap px-5 py-2 text-sm"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <ShinyText
                text="Start survey"
                speed={5}
                delay={0}
                color="#b5b5b5"
                shineColor="#ffffff"
                spread={110}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
              />
            </motion.button>
          </div>
        </div>
      )}
      {/* <Footer /> */}
    </div>
  );
}

