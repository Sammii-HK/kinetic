"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const PHRASES = [
  "Spring physics make everything feel alive.",
  "Gesture-driven interfaces feel natural.",
  "Layout animations handle the hard parts.",
  "Framer Motion makes React move.",
];

export default function Typewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const phrase = PHRASES[phraseIndex];

  const tick = useCallback(() => {
    if (!deleting) {
      if (charIndex < phrase.length) {
        setCharIndex((c) => c + 1);
      } else {
        setTimeout(() => setDeleting(true), 1500);
        return;
      }
    } else {
      if (charIndex > 0) {
        setCharIndex((c) => c - 1);
      } else {
        setDeleting(false);
        setPhraseIndex((p) => (p + 1) % PHRASES.length);
      }
    }
  }, [charIndex, deleting, phrase.length]);

  useEffect(() => {
    const speed = deleting ? 30 : 50 + Math.random() * 40;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, deleting]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-6">
      <div className="text-lg font-mono text-white/80 min-h-[56px] max-w-[280px] text-center">
        {phrase.slice(0, charIndex)}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, repeatType: "reverse" }}
          className="inline-block w-[2px] h-5 bg-blue-400 ml-0.5 align-middle"
        />
      </div>

      <div className="flex gap-1.5">
        {PHRASES.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-colors"
            style={{
              backgroundColor: i === phraseIndex ? "rgba(59,130,246,0.8)" : "rgba(255,255,255,0.1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
