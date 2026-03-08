"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const STEPS = ["Details", "Config", "Review", "Deploy"];

export default function ProgressSteps() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 p-4">
      <div className="flex items-center gap-0 w-full max-w-[280px]">
        {STEPS.map((step, i) => (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="relative flex flex-col items-center">
              <motion.div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border-2 z-10"
                animate={{
                  backgroundColor: i <= current ? "rgba(59,130,246,1)" : "rgba(255,255,255,0.04)",
                  borderColor: i <= current ? "rgba(59,130,246,1)" : "rgba(255,255,255,0.1)",
                  color: i <= current ? "#fff" : "rgba(255,255,255,0.3)",
                  scale: i === current ? 1.15 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {i < current ? "✓" : i + 1}
              </motion.div>
              <motion.span
                className="absolute -bottom-5 text-[10px] whitespace-nowrap"
                animate={{
                  color: i <= current ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)",
                }}
              >
                {step}
              </motion.span>
            </div>

            {i < STEPS.length - 1 && (
              <div className="flex-1 h-0.5 bg-white/[0.06] mx-1 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-blue-500"
                  animate={{ width: i < current ? "100%" : "0%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 transition-colors text-white/70 disabled:opacity-30"
        >
          Back
        </button>
        <button
          onClick={() => setCurrent((c) => Math.min(STEPS.length - 1, c + 1))}
          disabled={current === STEPS.length - 1}
          className="text-xs px-3 py-1.5 rounded-full bg-blue-500/80 hover:bg-blue-500 transition-colors text-white disabled:opacity-30"
        >
          Next
        </button>
        <button
          onClick={() => setCurrent(0)}
          className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/40"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
