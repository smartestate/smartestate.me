import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import WaitlistForm from "./WaitlistForm";
import VideoModal from "./VideoModal";
import BlurText from "./BlurText";
import GradientText from "@/components/ui/GradientText";

interface HeroProps {
  waitlistOpen?: boolean;
  onWaitlistOpenChange?: (open: boolean) => void;
}

export default function Hero({ waitlistOpen, onWaitlistOpenChange }: HeroProps) {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const handler = () => setIsSmallScreen(mq.matches);
    handler();
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  const videoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(videoRef, { once: true, margin: "-100px" });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [scrollT, setScrollT] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const lastClient = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    lastClient.current = { x: e.clientX, y: e.clientY };
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  // Keep the floating play label aligned when the page is scrolled or resized
  useEffect(() => {
    if (!hovering) return;
    const onScrollOrResize = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const { x, y } = lastClient.current;
      setCursorPos({ x: x - rect.left, y: y - rect.top });
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [hovering]);

  // Drive card size from scroll position. t: 0 (small) -> 1 (large)
  useEffect(() => {
    const el = cardRef.current || videoRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Start when the element top reaches bottom of viewport (rect.top = vh)
      // End when element top reaches 20% from top of viewport (rect.top = vh*0.2)
      const start = vh;
      const end = vh * 0.2;
      const raw = (start - rect.top) / (start - end);
      const t = Math.min(1, Math.max(0, raw));
      setScrollT(t);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.08] mb-6">
            <div className="leading-[1.08]">
              <div>
                <BlurText text={"Property"} className={"inline-block"} delay={0.02} />
              </div>
              <div>
                <span className="inline-block">
                  <BlurText text={"maintenance, "} className={"inline-block"} delay={0.08} />
                </span>
                <span className="inline-block ml-1">
                  <GradientText colors={["#6155f5", "#99b1ff", "#bcb7fb"]} animationSpeed={8} showBorder={false} className="inline-block">
                    reimagined
                  </GradientText>
                </span>
              </div>
            </div>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Smart Estate uses AI to triage, assign, and track maintenance
            requests — so your team can respond faster and tenants stay happier.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <WaitlistForm variant="hero" externalOpen={waitlistOpen} onOpenChange={onWaitlistOpenChange} />
          </div>
        </motion.div>
      </section>

      {/* Screen 2 — Video */}
      <section className="min-h-screen flex items-center justify-center px-6" ref={videoRef}>
        <motion.div
          ref={cardRef}
          className="relative rounded-2xl bg-card border border-border overflow-hidden aspect-video cursor-pointer"
          initial={{ opacity: 0, width: isSmallScreen ? "90vw" : "20vw" }}
          animate={{
            // opacity slightly improves visibility; width driven by scrollT
            opacity: 0.95,
            width: isSmallScreen ? `90vw` : `${20 + scrollT * 75}vw`,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onMouseEnter={() => {
            setHovering(true);
            document.documentElement.classList.add("hide-ipad-cursor");
          }}
          onMouseLeave={() => {
            setHovering(false);
            document.documentElement.classList.remove("hide-ipad-cursor");
          }}
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
