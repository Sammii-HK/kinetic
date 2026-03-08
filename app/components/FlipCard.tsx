"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const CARDS = [
  { front: "Click me", back: "3D flip!", colour: "#3b82f6" },
  { front: "Tap here", back: "Perspective!", colour: "#8b5cf6" },
  { front: "Try me", back: "Smooth!", colour: "#ec4899" },
];

function Flip({ front, back, colour }: { front: string; back: string; colour: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-28 h-36 cursor-pointer"
      style={{ perspective: 600 }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div
          className="absolute inset-0 rounded-xl flex items-center justify-center border border-white/10"
          style={{ backfaceVisibility: "hidden", backgroundColor: colour }}
        >
          <span className="text-white font-medium text-sm">{front}</span>
        </div>
        <div
          className="absolute inset-0 rounded-xl flex items-center justify-center border border-white/10"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: colour,
            filter: "brightness(1.3)",
          }}
        >
          <span className="text-white font-medium text-sm">{back}</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function FlipCard() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
      <p className="text-xs text-white/30">Click to flip</p>
      <div className="flex gap-3">
        {CARDS.map((card) => (
          <Flip key={card.front} {...card} />
        ))}
      </div>
    </div>
  );
}
