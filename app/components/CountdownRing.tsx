"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

export default function CountdownRing() {
  const [duration, setDuration] = useState(10);
  const [running, setRunning] = useState(false);
  const progress = useSpring(1, { stiffness: 50, damping: 20, restDelta: 0.005 });
  const display = useTransform(progress, (v) => Math.ceil(v * duration));
  const strokeDashoffset = useTransform(progress, (v) => 283 * (1 - v));

  const start = useCallback(() => {
    progress.set(1);
    setRunning(true);
    progress.set(0);
  }, [progress]);

  useEffect(() => {
    if (!running) return;
    const unsub = progress.on("change", (v) => {
      if (v <= 0.01) setRunning(false);
    });
    return unsub;
  }, [running, progress]);

  const reset = () => {
    setRunning(false);
    progress.jump(1);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5 p-4">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="4"
          />
          <motion.circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="283"
            style={{ strokeDashoffset }}
          />
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span className="text-3xl font-bold text-white/80 tabular-nums">
            {display}
          </motion.span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={start}
          disabled={running}
          className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 transition-colors text-white/70 disabled:opacity-30"
        >
          Start
        </button>
        <button
          onClick={reset}
          className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 transition-colors text-white/70"
        >
          Reset
        </button>
      </div>

      <div className="flex gap-2">
        {[5, 10, 30].map((d) => (
          <button
            key={d}
            onClick={() => { setDuration(d); reset(); }}
            className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
              duration === d
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/40 hover:bg-white/10"
            }`}
          >
            {d}s
          </button>
        ))}
      </div>
    </div>
  );
}
