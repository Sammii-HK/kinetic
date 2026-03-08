"use client";

import { useState, useEffect, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
const WORDS = ["Kinetic", "Motion", "Spring", "Physics", "Gesture", "Animate"];

function useScramble(target: string, speed = 30) {
  const [display, setDisplay] = useState(target);
  const [scrambling, setScrambling] = useState(false);

  const scramble = useCallback(() => {
    setScrambling(true);
    let frame = 0;
    const totalFrames = target.length * 3;

    const interval = setInterval(() => {
      frame++;
      const resolved = Math.floor((frame / totalFrames) * target.length);

      setDisplay(
        target
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < resolved) return target[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplay(target);
        setScrambling(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [target, speed]);

  return { display, scramble, scrambling };
}

export default function TextScramble() {
  const [wordIndex, setWordIndex] = useState(0);
  const { display, scramble, scrambling } = useScramble(WORDS[wordIndex]);

  useEffect(() => {
    scramble();
  }, [wordIndex, scramble]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-4">
      <div className="text-4xl font-mono font-bold text-white/90 h-12 flex items-center">
        {display.split("").map((char, i) => (
          <span
            key={i}
            className={char !== WORDS[wordIndex][i] ? "text-white/30" : ""}
          >
            {char}
          </span>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap justify-center">
        {WORDS.map((word, i) => (
          <button
            key={word}
            onClick={() => setWordIndex(i)}
            disabled={scrambling}
            className={`text-xs px-2.5 py-1 rounded-full transition-colors disabled:opacity-30 ${
              wordIndex === i
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/40 hover:bg-white/10"
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      <button
        onClick={scramble}
        disabled={scrambling}
        className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 transition-colors text-white/70 disabled:opacity-30"
      >
        Replay
      </button>
    </div>
  );
}
