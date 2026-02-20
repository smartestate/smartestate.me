import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import WaitlistForm from "./WaitlistForm";
import VideoModal from "./VideoModal";

interface HeroProps {
  waitlistOpen?: boolean;
  onWaitlistOpenChange?: (open: boolean) => void;
}

export default function Hero({ waitlistOpen, onWaitlistOpenChange }: HeroProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(videoRef, { once: true, margin: "-100px" });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <>
      {/* Screen 1 — Copy */}
      <section id="product" className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm text-accent-foreground font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Now under development
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.08] mb-6">
            Property maintenance,{" "}
            <span className="text-gradient">reimagined</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Smart Estate uses AI to triage, assign, and track maintenance
            requests — so your team can respond faster and tenants stay happier.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              See how it works →
            </a>
            <WaitlistForm variant="hero" externalOpen={waitlistOpen} onOpenChange={onWaitlistOpenChange} />
          </div>
        </motion.div>
      </section>

      {/* Screen 2 — Video */}
      <section className="min-h-screen flex items-center justify-center px-6" ref={videoRef}>
        <motion.div
          ref={cardRef}
          className="relative w-full max-w-5xl rounded-2xl bg-card border border-border overflow-hidden aspect-video cursor-pointer shadow-lg"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          style={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setModalOpen(true)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent to-primary/5" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="hsl(245,90%,65%)" className="ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {hovering && (
            <motion.div
              className="hidden lg:flex absolute pointer-events-none items-center gap-2 bg-foreground text-background rounded-full px-4 py-2 text-xs font-medium shadow-lg"
              animate={{ x: cursorPos.x - 50, y: cursorPos.y - 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 200, mass: 0.5 }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play intro
            </motion.div>
          )}

          <div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2 bg-foreground text-background rounded-full px-4 py-2 text-xs font-medium">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play intro
            </div>
          </div>
        </motion.div>
      </section>

      <VideoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
