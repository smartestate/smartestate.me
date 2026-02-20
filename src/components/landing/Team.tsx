import { motion } from "framer-motion";

const members = [
  { name: "Sahil Saleem", role: "Project Lead" },
  { name: "Shreyans Saha", role: "Front-end Developer" },
  { name: "Muhammad Moiz", role: "Documentation / BA" },
  { name: "Inigo Monson", role: "Back-end Developer" },
  { name: "Aaron Braganza", role: "AI/ML Engineer" },
  { name: "Bhoomika Sangtani", role: "UI/UX Designer" },
];

export default function Team() {
  return (
    <section id="team" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          style={{ opacity: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Meet the team</h2>
          <p className="text-muted-foreground text-lg">The people behind Smart Estate</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08 }}
              style={{ opacity: 0 }}
              className="rounded-2xl bg-card border border-border p-4 sm:p-6 text-center hover-lift"
            >
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent mx-auto mb-3 sm:mb-4 flex items-center justify-center text-xl sm:text-2xl font-bold text-primary">
                {m.name.split(" ").map(n => n[0]).join("")}
              </div>
              <h3 className="font-semibold text-foreground">{m.name}</h3>
              <span className="inline-block mt-3 rounded-full bg-accent text-accent-foreground text-xs font-medium px-3 py-1">
                {m.role}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
