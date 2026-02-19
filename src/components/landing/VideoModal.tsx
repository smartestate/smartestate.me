import { motion, AnimatePresence } from "framer-motion";

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
}

export default function VideoModal({ open, onClose }: VideoModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-4xl aspect-video rounded-2xl bg-card border border-border overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent">
              <p className="text-muted-foreground text-sm">Video placeholder — embed your intro here</p>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center text-foreground hover:bg-background transition cursor-pointer"
              aria-label="Close video"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
