"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// SVG paths for different shapes (all fit in a 200x200 viewBox)
const SHAPES: Record<string, { path: string; colour: string }> = {
  Circle: {
    path: "M100,20 A80,80 0 1,1 99.9,20 Z",
    colour: "#3b82f6",
  },
  Star: {
    path: "M100,10 L120,75 L190,75 L135,115 L155,180 L100,145 L45,180 L65,115 L10,75 L80,75 Z",
    colour: "#f59e0b",
  },
  Blob: {
    path: "M140,30 C180,40 190,80 185,110 C180,150 160,180 120,185 C80,190 40,170 25,140 C10,110 15,70 35,45 C55,20 100,20 140,30 Z",
    colour: "#ec4899",
  },
  Hexagon: {
    path: "M100,15 L175,55 L175,135 L100,175 L25,135 L25,55 Z",
    colour: "#22c55e",
  },
  Diamond: {
    path: "M100,10 L185,100 L100,190 L15,100 Z",
    colour: "#8b5cf6",
  },
};

export default function MorphingShapes() {
  const [shape, setShape] = useState("Circle");
  const current = SHAPES[shape];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-4">
      <svg viewBox="0 0 200 200" className="w-48 h-48">
        <motion.path
          d={current.path}
          fill={current.colour}
          animate={{
            d: current.path,
            fill: current.colour,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            mass: 1.2,
          }}
          style={{ filter: `drop-shadow(0 0 20px ${current.colour}40)` }}
        />
      </svg>

      <div className="flex gap-2 flex-wrap justify-center">
        {Object.keys(SHAPES).map((s) => (
          <button
            key={s}
            onClick={() => setShape(s)}
            className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
              shape === s
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/40 hover:bg-white/10"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
