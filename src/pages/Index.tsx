import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ValueStrip from "@/components/landing/ValueStrip";
import HowItWorks from "@/components/landing/HowItWorks";
import FeatureGallery from "@/components/landing/FeatureGallery";
import DotField from "@/components/landing/DotField";
import Team from "@/components/landing/Team";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <ValueStrip />
        <HowItWorks />
        <FeatureGallery />
        <DotField />
        <Team />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
