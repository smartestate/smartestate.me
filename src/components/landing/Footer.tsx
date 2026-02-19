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
            {["Download", "Product", "Docs", "Changelog", "Press", "Releases"].map((l) => (
              <a key={l} href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l}
              </a>
            ))}
          </div>
          <div className="space-y-3">
            {["Blog", "Pricing", "Use Cases"].map((l) => (
              <a key={l} href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="px-6 pb-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[clamp(3rem,10vw,9rem)] font-black text-foreground/[0.06] leading-none tracking-tighter select-none">
            Smartest State
          </h2>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground">FlowState</span>
          <div className="flex gap-6">
            {["About", "Team", "Privacy", "Terms"].map((l) => (
              <a key={l} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
