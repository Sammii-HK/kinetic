"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Ball {
  id: number;
  x: number;
  hue: number;
  size: number;
  delay: number;
}

let nextId = 0;

export default function GravityBalls() {
  const [balls, setBalls] = useState<Ball[]>([]);

  const drop = () => {
    const newBalls: Ball[] = Array.from({ length: 5 }, (_, i) => ({
      id: nextId++,
      x: 15 + Math.random() * 70,
      hue: Math.random() * 360,
      size: 12 + Math.random() * 20,
      delay: i * 0.08,
    }));
    setBalls((prev) => [...prev, ...newBalls].slice(-30));
  };

  const clear = () => setBalls([]);

  return (
    <div className="w-full h-full flex flex-col p-4 gap-3">
      <div className="flex gap-2 justify-center">
        <button
          onClick={drop}
          className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 transition-colors text-white/70"
        >
          Drop balls
        </button>
        <button
          onClick={clear}
          className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/40"
        >
          Clear
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02]">
        {balls.map((ball) => (
          <motion.div
            key={ball.id}
            className="absolute rounded-full origin-bottom"
            style={{
              width: ball.size,
              height: ball.size,
              left: `${ball.x}%`,
              backgroundColor: `hsl(${ball.hue}, 70%, 60%)`,
              boxShadow: `0 0 12px hsla(${ball.hue}, 70%, 60%, 0.3)`,
              bottom: 0,
            }}
            initial={{ bottom: "100%", scaleX: 1, scaleY: 1 }}
            animate={{
              bottom: [
                "100%",   // start
                "0%",     // hit ground
                "25%",    // bounce 1
                "0%",     // hit ground
                "10%",    // bounce 2
                "0%",     // hit ground
                "3%",     // bounce 3
                "0%",     // settle
              ],
              scaleY: [
                1,        // falling
                0.6,      // squash on impact
                1,        // stretch up
                0.75,     // squash
                1,        // stretch
                0.85,     // squash
                1,        // stretch
                1,        // settle
              ],
              scaleX: [
                1,
                1.3,
                1,
                1.2,
                1,
                1.1,
                1,
                1,
              ],
            }}
            transition={{
              duration: 1.4,
              delay: ball.delay,
              times: [0, 0.3, 0.5, 0.6, 0.72, 0.8, 0.88, 1],
              ease: [
                [0.55, 0, 1, 0.45],  // gravity fall
                [0.33, 1, 0.68, 1],  // bounce up
                [0.55, 0, 1, 0.45],  // fall
                [0.33, 1, 0.68, 1],  // bounce up
                [0.55, 0, 1, 0.45],  // fall
                [0.33, 1, 0.68, 1],  // bounce up
                [0.55, 0, 1, 0.45],  // settle
              ],
            }}
          />
        ))}

        {balls.length === 0 && (
          <p className="absolute inset-0 flex items-center justify-center text-xs text-white/20">
            Click drop to release balls
          </p>
        )}
      </div>
    </div>
  );
}
