"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// All shapes use exactly 8 cubic bezier segments for smooth morphing
const SHAPES: Record<string, { path: string; colour: string }> = {
  Circle: {
    path: "M100,20 C144,20 180,56 180,100 C180,144 144,180 100,180 C56,180 20,144 20,100 C20,56 56,20 100,20 C100,20 100,20 100,20 C100,20 100,20 100,20 C100,20 100,20 100,20 C100,20 100,20 100,20 Z",
    colour: "#3b82f6",
  },
  Star: {
    path: "M100,10 C100,10 120,75 120,75 C120,75 190,75 190,75 C190,75 135,115 135,115 C135,115 155,180 155,180 C155,180 100,145 100,145 C100,145 45,180 45,180 C45,180 65,115 65,115 C65,115 10,75 10,75 C10,75 80,75 80,75 Z",
    colour: "#f59e0b",
  },
  Blob: {
    path: "M140,30 C160,35 180,50 185,80 C190,110 180,140 165,160 C150,180 125,190 100,185 C75,180 55,170 40,155 C25,140 15,120 15,100 C15,80 20,60 35,45 C50,30 70,22 90,22 C110,22 125,25 140,30 Z",
    colour: "#ec4899",
  },
  Hexagon: {
    path: "M100,15 C100,15 137,35 175,55 C175,55 175,95 175,135 C175,135 137,155 100,175 C100,175 62,155 25,135 C25,135 25,95 25,55 C25,55 62,35 100,15 C100,15 100,15 100,15 C100,15 100,15 100,15 Z",
    colour: "#22c55e",
  },
  Diamond: {
    path: "M100,10 C120,30 152,65 185,100 C185,100 152,135 120,170 C120,170 110,180 100,190 C90,180 80,170 80,170 C80,170 48,135 15,100 C15,100 48,65 80,30 C80,30 90,20 100,10 C100,10 100,10 100,10 Z",
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
