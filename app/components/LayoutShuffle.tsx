"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const COLOURS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
  "#14b8a6", "#f43f5e", "#a855f7", "#6366f1",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function LayoutShuffle() {
  const [items, setItems] = useState(() =>
    COLOURS.map((colour, i) => ({ id: `tile-${i}`, colour }))
  );
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="w-full h-full flex flex-col p-4 gap-3">
      <div className="flex justify-end">
        <button
          onClick={() => setItems(shuffle(items))}
          className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 transition-colors text-white/70"
        >
          Shuffle
        </button>
      </div>

      <div className="flex-1 relative">
        {/* Grid */}
        <div className="grid grid-cols-4 gap-2 h-full">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layoutId={item.id}
              onClick={() => setExpanded(item.id)}
              className="rounded-lg cursor-pointer"
              style={{ backgroundColor: item.colour, opacity: 0.85 }}
              whileHover={{ scale: 1.05, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
          ))}
        </div>

        {/* Expanded overlay */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-10"
              initial={{ backgroundColor: "rgba(0,0,0,0)" }}
              animate={{ backgroundColor: "rgba(0,0,0,0.6)" }}
              exit={{ backgroundColor: "rgba(0,0,0,0)" }}
              onClick={() => setExpanded(null)}
            >
              <motion.div
                layoutId={expanded}
                className="w-3/4 h-3/4 rounded-2xl"
                style={{
                  backgroundColor: items.find((i) => i.id === expanded)?.colour,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
