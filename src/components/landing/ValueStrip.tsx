import { motion } from "framer-motion";
import { Zap, Target, Shield, Eye } from "lucide-react";

const values = [
  { icon: Zap, title: "Faster triage", desc: "AI categorizes issues in seconds" },
  { icon: Target, title: "Smarter assignment", desc: "Match the right tech, every time" },
  { icon: Shield, title: "SLA confidence", desc: "Never miss a deadline again" },
  { icon: Eye, title: "Real-time visibility", desc: "Track every request live" },
];

export default function ValueStrip() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="rounded-2xl bg-card border border-border p-6 hover-lift"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <v.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{v.title}</h3>
            <p className="text-sm text-muted-foreground">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
