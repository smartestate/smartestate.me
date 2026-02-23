import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassSurface from "@/components/ui/GlassSurface";
import ShinyText from "../ui/ShinyText";

const links: { label: string; href: string }[] = [
  { label: "Market Research Survey", href: "/market-research-survey" },
];

interface NavbarProps {
  onJoinWaitlistClick?: () => void;
}

export default function Navbar({ onJoinWaitlistClick }: NavbarProps): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 left-6 right-6 z-50 pointer-events-auto"
      aria-label="Main navigation"
    >
      <GlassSurface className="w-full mx-auto max-w-7xl pointer-events-auto relative" borderRadius={24}>
        <div className="w-full px-6 h-14 md:h-18 flex items-center justify-between relative">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="Smart Estate" className="w-8 h-8 object-cover" />
            <span className="font-semibold text-foreground text-lg">Smart Estate</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <motion.button
              onClick={() => { window.location.href = "/market-research-survey"; }}
              className="rounded-full bg-primary text-primary-foreground font-medium cursor-pointer whitespace-nowrap px-5 py-2 text-sm"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <ShinyText
                text="Market Research Survey"
                speed={5}
                delay={0}
                color="#b5b5b5"
                shineColor="#ffffff"
                spread={110}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
              />
            </motion.button>
          </div>

          {/* Mobile toggle inside surface so it sits within the expanded header */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 md:hidden z-10">
            <button
              className="text-foreground cursor-pointer bg-transparent p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

          {/* Mobile menu (placed inside the surface so the header expands) */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="md:hidden w-full border-t border-border mt-4 pt-4 pb-6 space-y-3 pointer-events-auto px-6"
                role="menu"
              >
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm text-muted-foreground hover:text-foreground py-2"
                  >
                    {l.label}
                  </a>
                ))}

                <div className="pt-2">
                  <motion.button
                    onClick={() => {
                      setMobileOpen(false);
                      window.location.href = "/market-research-survey";
                    }}
                    className="rounded-full bg-primary text-primary-foreground font-medium cursor-pointer whitespace-nowrap px-4 py-2 text-sm"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ShinyText
                      text="Market Research Survey"
                      speed={5}
                      delay={0}
                      color="#b5b5b5"
                      shineColor="#ffffff"
                      spread={110}
                      direction="left"
                      yoyo={false}
                      pauseOnHover={false}
                    />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
      </GlassSurface>

      
    </motion.nav>
  );
}
