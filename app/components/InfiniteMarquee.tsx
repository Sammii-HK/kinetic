"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const ITEMS = [
  "Spring", "Tween", "Inertia", "Keyframes", "Layout",
  "Gesture", "Scroll", "Morph", "Stagger", "Parallax",
];

function MarqueeRow({ reverse, speed }: { reverse?: boolean; speed: number }) {
  const items = [...ITEMS, ...ITEMS];

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex gap-3 shrink-0"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-white/50 whitespace-nowrap shrink-0"
          >
            {item}
          </div>
        ))}
      </motion.div>
      <motion.div
        className="flex gap-3 shrink-0 ml-3"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-white/50 whitespace-nowrap shrink-0"
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function InfiniteMarquee() {
  const [speed, setSpeed] = useState(20);

  return (
    <div className="w-full h-full flex flex-col justify-center gap-4 overflow-hidden p-4">
      <MarqueeRow speed={speed} />
      <MarqueeRow speed={speed * 1.3} reverse />
      <MarqueeRow speed={speed * 0.8} />

      <div className="flex gap-2 justify-center mt-2">
        {[
          { label: "Slow", value: 30 },
          { label: "Normal", value: 20 },
          { label: "Fast", value: 10 },
        ].map((s) => (
          <button
            key={s.label}
            onClick={() => setSpeed(s.value)}
            className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
              speed === s.value
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/40 hover:bg-white/10"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
