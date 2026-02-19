import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const DOT_SPACING = 28;
const DOT_RADIUS = 2;
const INFLUENCE_RADIUS = 120;
const PUSH_STRENGTH = 15;

export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const mouse = mouseRef.current;
    const cols = Math.floor(width / DOT_SPACING);
    const rows = Math.floor(height / DOT_SPACING);
    const offsetX = (width - cols * DOT_SPACING) / 2;
    const offsetY = (height - rows * DOT_SPACING) / 2;

    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        let x = offsetX + c * DOT_SPACING;
        let y = offsetY + r * DOT_SPACING;

        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < INFLUENCE_RADIUS) {
          const force = (1 - dist / INFLUENCE_RADIUS) * PUSH_STRENGTH;
          const angle = Math.atan2(dy, dx);
          x += Math.cos(angle) * force;
          y += Math.sin(angle) * force;
        }

        const alpha = dist < INFLUENCE_RADIUS ? 0.4 + 0.4 * (1 - dist / INFLUENCE_RADIUS) : 0.2;
        ctx.beginPath();
        ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(245, 90%, 65%, ${alpha})`;
        ctx.fill();
      }
    }

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      const ctx = canvas.getContext("2d");
      ctx?.scale(dpr, dpr);
    };

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", handleLeave);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  // Respect reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      cancelAnimationFrame(animRef.current);
    }
  }, []);

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            FlowState builds products that scale
          </h2>
          <p className="text-muted-foreground text-lg">Developers achieve new heights</p>
        </motion.div>
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-card border border-border">
          <canvas ref={canvasRef} className="absolute inset-0" />
        </div>
      </div>
    </section>
  );
}
