"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

function AnimatedDigit({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 100, damping: 20, mass: 0.5 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

export default function ElasticCounter() {
  const [count, setCount] = useState(0);

  const presets = [
    { label: "0", value: 0 },
    { label: "100", value: 100 },
    { label: "1,000", value: 1000 },
    { label: "9,999", value: 9999 },
    { label: "Random", value: -1 },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-4">
      <div className="text-5xl font-bold tabular-nums bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        <AnimatedDigit value={count} />
      </div>

      <div className="flex gap-2 flex-wrap justify-center">
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={() =>
              setCount(p.value === -1 ? Math.floor(Math.random() * 10000) : p.value)
            }
            className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/40 hover:bg-white/10 transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setCount((c) => Math.max(0, c - 1))}
          className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white/60 text-lg transition-colors"
        >
          −
        </button>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white/60 text-lg transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
