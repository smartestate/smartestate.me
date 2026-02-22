import { motion } from "framer-motion";
import { Zap, Target, Shield, Eye, MessageSquareText, Brain, Users, Activity, Bell, BarChart3 } from "lucide-react";
import ScrollVelocity from "./ScrollVelocity";

const features = [
  { title: "Faster triage", desc: "AI categorizes issues in seconds.", icon: Zap },
  { title: "Smarter assignment", desc: "Match the right tech, every time.", icon: Target },
  { title: "Multimedia ticket intake", desc: "Text, photos, videos — tenants choose how to report.", icon: MessageSquareText },
  { title: "AI auto-categorization & urgency", desc: "Instantly classify and prioritize every issue.", icon: Brain },
  { title: "Real-time status tracking", desc: "Tenants and managers see live progress updates.", icon: Activity },
  { title: "SLA monitoring & escalation", desc: "Automated alerts before deadlines hit.", icon: Bell },
  { title: "Analytics & reporting", desc: "Dashboards that surface actionable insights.", icon: BarChart3 },
];

export default function FeatureGallery() {
  // split feature titles into two roughly equal lines
  const half = Math.ceil(features.length / 2);
  const topTitles = features.slice(0, half).map((f) => f.title).join(' ✦ ');
  const bottomTitles = features.slice(half).map((f) => f.title).join(' ✦ ');

  return (
    <section id="features" className="py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading intentionally removed as requested */}

          {/* headings stay constrained */}
      </div>

        {/* full-bleed marquee */}
        <div aria-hidden className="w-full">
          <ScrollVelocity texts={[topTitles, bottomTitles]} velocity={80} className="text-lg md:text-2xl" />
        </div>
    </section>
  );
}
