"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const SECTIONS = [
  {
    title: "Spring animations",
    content: "Spring physics use stiffness, damping, and mass to create natural motion. Higher stiffness means snappier movement, while lower damping allows more oscillation.",
  },
  {
    title: "Layout animations",
    content: "Framer Motion can animate between different CSS layouts automatically. Just add the layout prop and it handles the interpolation between positions and sizes.",
  },
  {
    title: "Gesture handling",
    content: "Built-in support for drag, tap, hover, and pan gestures. Velocity tracking enables physics-based interactions like flick-to-dismiss.",
  },
  {
    title: "Exit animations",
    content: "AnimatePresence tracks components being removed from the React tree, allowing them to animate out before being unmounted. No more instant disappearing.",
  },
];

export default function Accordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="w-full h-full flex flex-col p-4 gap-1 overflow-hidden">
      {SECTIONS.map((section, i) => (
        <div key={i} className="rounded-lg overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-3 py-2.5 bg-white/[0.04] hover:bg-white/[0.06] transition-colors text-left"
          >
            <span className="text-sm text-white/70">{section.title}</span>
            <motion.span
              animate={{ rotate: open === i ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="text-white/30 text-xs"
            >
              ▼
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="overflow-hidden"
              >
                <p className="px-3 py-3 text-xs text-white/40 leading-relaxed bg-white/[0.02] border-t border-white/[0.04]">
                  {section.content}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
