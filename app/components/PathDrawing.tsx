"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const PATHS = {
  Signature: "M10,80 Q40,10 70,80 T130,80 T190,80",
  Star: "M100,10 L120,75 L190,75 L135,115 L155,180 L100,145 L45,180 L65,115 L10,75 L80,75 Z",
  Spiral: "M100,100 C100,60 140,60 140,100 C140,150 50,150 50,100 C50,40 160,40 160,100 C160,170 30,170 30,100",
  Wave: "M10,100 C30,40 50,160 70,100 C90,40 110,160 130,100 C150,40 170,160 190,100",
  Heart: "M100,40 C100,20 70,10 50,30 C20,60 30,90 100,160 C170,90 180,60 150,30 C130,10 100,20 100,40",
};

export default function PathDrawing() {
  const [shape, setShape] = useState<keyof typeof PATHS>("Signature");
  const [key, setKey] = useState(0);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-4">
      <svg viewBox="0 0 200 200" className="w-48 h-48">
        <motion.path
          key={`${shape}-${key}`}
          d={PATHS[shape]}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex gap-2 flex-wrap justify-center">
        {Object.keys(PATHS).map((s) => (
          <button
            key={s}
            onClick={() => { setShape(s as keyof typeof PATHS); setKey((k) => k + 1); }}
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
