import { motion } from "framer-motion";
import { Smartphone, Bot, Wrench, CheckCircle } from "lucide-react";

const steps = [
  { num: "01", title: "Tenants submit issue", desc: "Text, photo, or video — any format works.", icon: Smartphone },
  { num: "02", title: "AI categorizes + urgency", desc: "Instant triage with smart categorization.", icon: Bot },
  { num: "03", title: "Smart technician matching", desc: "Skills, availability, and proximity considered.", icon: Wrench },
  { num: "04", title: "Track & close with audit trail", desc: "Full visibility from start to finish.", icon: CheckCircle },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          style={{ opacity: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How it works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From ticket to resolution in four simple steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.12 }}
              style={{ opacity: 0 }}
              className="relative"
            >
              <span className="text-4xl md:text-6xl font-bold text-primary/10 absolute -top-2 -left-1">{s.num}</span>
              <div className="relative pt-8 md:pt-12">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
              {i < 3 && (
                <div className="hidden md:block absolute top-16 -right-4 text-border text-2xl">→</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
