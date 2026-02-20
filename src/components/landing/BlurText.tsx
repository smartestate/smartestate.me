import React from "react";
import { motion } from "framer-motion";

interface BlurTextProps {
  text: string;
  highlight?: string;
  className?: string;
  highlightClassName?: string;
  delay?: number;
}

export default function BlurText({
  text,
  highlight,
  className = "",
  highlightClassName = "",
  delay = 0,
}: BlurTextProps) {
  const parent = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: 0.02,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: -6, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: "easeOut" } },
  };

  // If a highlight substring is given, split into three segments
  let segments: Array<{ text: string; highlight?: boolean }> = [{ text }];
  if (highlight) {
    const idx = text.indexOf(highlight);
    if (idx !== -1) {
      const before = text.slice(0, idx);
      const middle = text.slice(idx, idx + highlight.length);
      const after = text.slice(idx + highlight.length);
      segments = [];
      if (before) segments.push({ text: before });
      segments.push({ text: middle, highlight: true });
      if (after) segments.push({ text: after });
    }
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={parent}
      aria-hidden={false}
    >
      {segments.map((seg, si) => (
        <span key={si} className={seg.highlight ? highlightClassName : undefined}>
          {Array.from(seg.text).map((char, i) => (
            <motion.span
              key={si + "-" + i + "-" + char}
              variants={child}
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}
