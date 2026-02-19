import { motion } from "framer-motion";

const features = [
  { title: "Multimedia ticket intake", desc: "Text, photos, videos — tenants choose how to report.", gradient: "from-primary/20 to-accent" },
  { title: "AI auto-categorization & urgency", desc: "Instantly classify and prioritize every issue.", gradient: "from-accent to-primary/10" },
  { title: "Smart technician matching", desc: "Skills, schedule, and location-aware dispatch.", gradient: "from-primary/10 to-accent" },
  { title: "Real-time status tracking", desc: "Tenants and managers see live progress updates.", gradient: "from-accent to-primary/15" },
  { title: "SLA monitoring & escalation", desc: "Automated alerts before deadlines hit.", gradient: "from-primary/15 to-accent" },
  { title: "Analytics & reporting", desc: "Dashboards that surface actionable insights.", gradient: "from-accent to-primary/20" },
];

export default function FeatureGallery() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Features</h2>
          <p className="text-muted-foreground text-lg">Everything you need for modern property maintenance.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-2xl bg-card border border-border overflow-hidden hover-lift"
            >
              <div className={`aspect-video bg-gradient-to-br ${f.gradient} flex items-center justify-center`}>
                <div className="w-16 h-12 rounded-lg bg-background/60 border border-border/50" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
