import { motion } from "framer-motion";

const values = [
  { icon: "⚡", title: "Faster triage", desc: "AI categorizes issues in seconds" },
  { icon: "🎯", title: "Smarter assignment", desc: "Match the right tech, every time" },
  { icon: "🛡️", title: "SLA confidence", desc: "Never miss a deadline again" },
  { icon: "👁️", title: "Real-time visibility", desc: "Track every request live" },
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
            <div className="text-3xl mb-3">{v.icon}</div>
            <h3 className="font-semibold text-foreground mb-1">{v.title}</h3>
            <p className="text-sm text-muted-foreground">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
