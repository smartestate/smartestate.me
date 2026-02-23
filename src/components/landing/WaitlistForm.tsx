import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PartyPopper } from "lucide-react";
import ShinyText from "../ui/ShinyText";

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
  externalOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function WaitlistForm({ variant = "hero", externalOpen, onOpenChange }: WaitlistFormProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [companyType, setCompanyType] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;

  const setIsOpen = (val: boolean) => {
    if (onOpenChange) onOpenChange(val);
    setInternalOpen(val);
  };

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

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const YOUFORM_WEBHOOK = (import.meta.env.VITE_YOUFORM_WEBHOOK as string) || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload = {
      name: form.name,
      email: form.email,
      company: form.company,
      companyType,
    };

    try {
      if (YOUFORM_WEBHOOK) {
        // Send as form-encoded key/value pairs which YouForm expects
        await fetch(YOUFORM_WEBHOOK, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(payload as Record<string, string>),
        }).then((r) => {
          if (!r.ok) throw new Error(`status=${r.status}`);
        });
      } else {
        // No webhook configured — simulate success (local dev)
        console.warn("VITE_YOUFORM_WEBHOOK not set — skipping remote submit");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("waitlist submit error", err);
      setError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const isNav = variant === "nav";

  return (
    <div ref={ref} className="relative">
      <AnimatePresence mode="wait">
          {!isOpen && !submitted ? (
          <motion.button
            key="btn"
            onClick={() => setIsOpen(true)}
            className={`rounded-full bg-primary text-primary-foreground font-medium cursor-pointer whitespace-nowrap ${
              isNav ? "px-5 py-2 text-sm" : "px-8 py-3.5 text-base"
            }`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <ShinyText
              text="✨ Join Waitlist"
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
        ) : submitted ? (
          <motion.div
            key="success"
            className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground px-8 py-4 text-center font-medium flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <PartyPopper className="w-5 h-5" />
            You're on the list!
            {Array.from({ length: 12 }).map((_, i) => (
              <ConfettiPiece key={i} delay={i * 0.05} x={Math.random() * 100} />
            ))}
          </motion.div>
        ) : (
          <motion.form
            key="form"
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
                onClick={() => {
                  setIsOpen(false);
                  // Give layout a moment to update, then ask the global cursor to recompute
                  setTimeout(() => document.dispatchEvent(new Event("recompute-cursor")), 40);
                }}
                className="text-muted-foreground hover:text-foreground text-lg leading-none cursor-pointer"
              >
                ×
              </button>
              {/* When closing, ask the global cursor to recompute its snap target
                  after the layout change so the custom cursor doesn't stay
                  stuck in the snapped (ballooned) state. */}
              
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
