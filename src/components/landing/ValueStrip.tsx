import { Zap, Target, Shield, Eye } from "lucide-react";

const values = [
  { icon: Zap, title: "Faster triage", desc: "AI categorizes issues in seconds" },
  { icon: Target, title: "Smarter assignment", desc: "Match the right tech, every time" },
  { icon: Shield, title: "SLA confidence", desc: "Never miss a deadline again" },
  { icon: Eye, title: "Real-time visibility", desc: "Track every request live" },
];

export default function ValueStrip() {
  return (
    <section className="py-16 px-6 border-y border-border bg-card/50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 sm:gap-4">
        {values.map((v, i) => (
          <div key={v.title} className="flex items-start gap-3 flex-1">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <v.icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">{v.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{v.desc}</p>
            </div>
            {i < values.length - 1 && (
              <div className="hidden sm:block w-px h-10 bg-border ml-auto" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
