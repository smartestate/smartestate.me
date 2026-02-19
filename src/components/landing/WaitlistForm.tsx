import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const companyTypes = ["Real Estate Company", "Maintenance Company", "Other"];

const ConfettiPiece = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full"
    style={{
      left: `${x}%`,
      top: 0,
      backgroundColor: ["hsl(245,90%,65%)", "hsl(265,90%,70%)", "hsl(180,70%,60%)", "hsl(40,95%,65%)"][
        Math.floor(Math.random() * 4)
      ],
    }}
    initial={{ y: -10, opacity: 1, rotate: 0 }}
    animate={{ y: 60, opacity: 0, rotate: 360 }}
    transition={{ duration: 1, delay, ease: "easeOut" }}
  />
);

interface WaitlistFormProps {
  variant?: "nav" | "hero";
}

export default function WaitlistForm({ variant = "hero" }: WaitlistFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [companyType, setCompanyType] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted) {
      const t = setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
        setForm({ name: "", email: "", company: "" });
        setCompanyType("");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [submitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isNav = variant === "nav";

  return (
    <div ref={ref} className="relative">
      <AnimatePresence mode="wait">
        {!isOpen && !submitted ? (
          <motion.button
            key="btn"
            layoutId={`waitlist-${variant}`}
            onClick={() => setIsOpen(true)}
            className={`rounded-full bg-primary text-primary-foreground font-medium cursor-pointer whitespace-nowrap ${
              isNav ? "px-5 py-2 text-sm" : "px-8 py-3.5 text-base"
            }`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Join Waitlist
          </motion.button>
        ) : submitted ? (
          <motion.div
            key="success"
            layoutId={`waitlist-${variant}`}
            className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground px-8 py-4 text-center font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            🎉 You're on the list!
            {Array.from({ length: 12 }).map((_, i) => (
              <ConfettiPiece key={i} delay={i * 0.05} x={Math.random() * 100} />
            ))}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            layoutId={`waitlist-${variant}`}
            onSubmit={handleSubmit}
            className="rounded-2xl bg-card border border-border shadow-xl p-5 space-y-3"
            initial={{ width: isNav ? 140 : 180 }}
            animate={{ width: isNav ? 320 : 380 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-foreground">Join the waitlist</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground text-lg leading-none cursor-pointer"
              >
                ×
              </button>
            </div>
            <motion.input
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              type="text"
              placeholder="Full name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <motion.input
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <motion.input
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              type="text"
              placeholder="Company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <motion.select
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
              required
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="" disabled>
                Company type
              </option>
              {companyTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </motion.select>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              type="submit"
              className="w-full rounded-lg bg-primary text-primary-foreground font-medium py-2.5 text-sm cursor-pointer hover:opacity-90 transition-opacity"
            >
              Request access
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
