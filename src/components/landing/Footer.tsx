import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between gap-12">
        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground">Experience liftoff</h3>
        </div>
        <div className="flex gap-16">
          <div className="space-y-3">
            {[
              { label: "Download", to: "/download" },
              { label: "Product", to: "/#product" },
              { label: "Docs", to: "/docs" },
              { label: "Changelog", to: "/changelog" },
              { label: "Press", to: "/press" },
              { label: "Releases", to: "/releases" },
            ].map((l) => (
              <Link key={l.label} to={l.to} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="space-y-3">
            {[
              { label: "Updates", to: "/updates" },
              { label: "Pricing", to: "/pricing" },
            ].map((l) => (
              <Link key={l.label} to={l.to} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="px-6 pb-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[clamp(4rem,15vw,13rem)] font-black text-foreground/20 leading-[0.85] tracking-tighter select-none whitespace-nowrap">
            Smart Estate
          </h2>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground">Smart Estate</span>
          <div className="flex gap-6">
            {[
              { label: "About", to: "/about" },
              { label: "Team", to: "/#team" },
              { label: "Privacy", to: "/privacy" },
              { label: "Terms", to: "/terms" },
            ].map((l) => (
              <Link key={l.label} to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
