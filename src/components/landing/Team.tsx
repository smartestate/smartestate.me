import { motion } from "framer-motion";

const members = [
  { name: "Sahil Saleem", id: "8564735", role: "Project Lead" },
  { name: "Shreyans Saha", id: "8546009", role: "Front-end Developer" },
  { name: "Muhammad Moiz", id: "8553762", role: "Documentation / BA" },
  { name: "Inigo Monson", id: "8341874", role: "Back-end Developer" },
  { name: "Aaron Braganza", id: "8283412", role: "AI/ML Engineer" },
  { name: "Bhoomika Sangtani", id: "8117044", role: "UI/UX Designer" },
];

export default function Team() {
  return (
    <section id="team" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Meet the team</h2>
          <p className="text-muted-foreground text-lg">The people behind FlowState</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl bg-card border border-border p-6 text-center hover-lift"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-primary">
                {m.name.split(" ").map(n => n[0]).join("")}
              </div>
              <h3 className="font-semibold text-foreground">{m.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{m.id}</p>
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
