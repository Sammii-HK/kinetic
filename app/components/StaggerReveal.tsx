"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState } from "react";

const ITEMS = [
  "Spring physics", "Layout animations", "Gesture handling",
  "Scroll-driven motion", "SVG morphing", "Stagger timing",
  "Drag interactions", "Shared layouts",
];

const VARIANTS: Record<string, Variants> = {
  "Fade up": {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  "Scale in": {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  "Slide right": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  "Blur in": {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
};

export default function StaggerReveal() {
  const [variant, setVariant] = useState("Fade up");
  const [key, setKey] = useState(0);

  const current = VARIANTS[variant];

  return (
    <div className="w-full h-full flex flex-col p-4 gap-3">
      <div className="flex gap-2 flex-wrap">
        {Object.keys(VARIANTS).map((v) => (
          <button
            key={v}
            onClick={() => { setVariant(v); setKey((k) => k + 1); }}
            className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
              variant === v
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/40 hover:bg-white/10"
            }`}
          >
            {v}
          </button>
        ))}
        <button
          onClick={() => setKey((k) => k + 1)}
          className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/40 hover:bg-white/10 transition-colors ml-auto"
        >
          Replay
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-1.5 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.06, delayChildren: 0.1 },
              },
            }}
            className="flex flex-col gap-1.5"
          >
            {ITEMS.map((item, i) => (
              <motion.div
                key={item}
                variants={current}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06]"
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    backgroundColor: `hsl(${(i * 45) % 360}, 70%, 60%)`,
                  }}
                />
                <span className="text-sm text-white/70">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
