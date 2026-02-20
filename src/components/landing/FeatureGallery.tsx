import { motion } from "framer-motion";
import { Zap, Target, Shield, Eye, MessageSquareText, Brain, Users, Activity, Bell, BarChart3 } from "lucide-react";

const features = [
  { title: "Faster triage", desc: "AI categorizes issues in seconds.", icon: Zap },
  { title: "Smarter assignment", desc: "Match the right tech, every time.", icon: Target },
  { title: "SLA confidence", desc: "Never miss a deadline again.", icon: Shield },
  { title: "Real-time visibility", desc: "Track every request live.", icon: Eye },
  { title: "Multimedia ticket intake", desc: "Text, photos, videos — tenants choose how to report.", icon: MessageSquareText },
  { title: "AI auto-categorization & urgency", desc: "Instantly classify and prioritize every issue.", icon: Brain },
  { title: "Smart technician matching", desc: "Skills, schedule, and location-aware dispatch.", icon: Users },
  { title: "Real-time status tracking", desc: "Tenants and managers see live progress updates.", icon: Activity },
  { title: "SLA monitoring & escalation", desc: "Automated alerts before deadlines hit.", icon: Bell },
  { title: "Analytics & reporting", desc: "Dashboards that surface actionable insights.", icon: BarChart3 },
];

export default function FeatureGallery() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          style={{ opacity: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Features</h2>
          <p className="text-muted-foreground text-lg">Everything you need for modern property maintenance.</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.06 }}
              style={{ opacity: 0 }}
              className="group rounded-2xl bg-card border border-border p-4 sm:p-6 hover-lift"
            >
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
