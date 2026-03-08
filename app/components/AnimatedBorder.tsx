"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const STYLES = [
  { label: "Rainbow", colours: "red, orange, yellow, green, cyan, blue, violet, red" },
  { label: "Ocean", colours: "#0ea5e9, #06b6d4, #14b8a6, #0ea5e9" },
  { label: "Sunset", colours: "#f97316, #ef4444, #ec4899, #f97316" },
  { label: "Neon", colours: "#22c55e, #3b82f6, #8b5cf6, #22c55e" },
];

export default function AnimatedBorder() {
  const [style, setStyle] = useState(0);
  const [speed, setSpeed] = useState(3);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5 p-4">
      <div className="relative rounded-2xl p-[2px] overflow-hidden">
        <motion.div
          className="absolute inset-[-50%]"
          style={{
            background: `conic-gradient(from 0deg, ${STYLES[style].colours})`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        />
        <div className="relative rounded-[14px] bg-zinc-950 px-8 py-6 flex flex-col items-center gap-2">
          <span className="text-white/80 text-sm font-medium">Animated border</span>
          <span className="text-white/30 text-xs">Rotating conic gradient</span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap justify-center">
        {STYLES.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setStyle(i)}
            className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
              style === i
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/40 hover:bg-white/10"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        {[
          { label: "Slow", value: 6 },
          { label: "Normal", value: 3 },
          { label: "Fast", value: 1 },
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
