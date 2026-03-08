"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  // Each layer moves at a different speed relative to scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-y-auto relative"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="h-[250%] relative">
        {/* Background layer — slowest */}
        <motion.div
          className="absolute inset-x-0 top-0 h-full"
          style={{ y: bgY }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 via-purple-950/30 to-transparent" />
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: 2 + (i % 3) * 2,
                height: 2 + (i % 3) * 2,
                left: `${(i * 17 + 5) % 100}%`,
                top: `${(i * 13 + 3) % 80}%`,
              }}
            />
          ))}
        </motion.div>

        {/* Mid layer — medium speed */}
        <motion.div
          className="absolute inset-x-0 top-0 h-full"
          style={{ y: midY }}
        >
          {[
            { x: "15%", y: "20%", size: 60, colour: "rgba(139,92,246,0.15)" },
            { x: "70%", y: "35%", size: 80, colour: "rgba(59,130,246,0.12)" },
            { x: "40%", y: "55%", size: 50, colour: "rgba(236,72,153,0.12)" },
            { x: "80%", y: "70%", size: 70, colour: "rgba(20,184,166,0.12)" },
            { x: "25%", y: "80%", size: 45, colour: "rgba(249,115,22,0.12)" },
          ].map((shape, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: shape.x,
                top: shape.y,
                width: shape.size,
                height: shape.size,
                backgroundColor: shape.colour,
                filter: "blur(1px)",
              }}
            />
          ))}
        </motion.div>

        {/* Foreground layer — fastest */}
        <motion.div
          className="absolute inset-x-0 top-[15%] flex flex-col items-center gap-4 px-6"
          style={{ y: fgY, opacity: textOpacity, scale: textScale }}
        >
          <h3 className="text-2xl font-bold text-white/90 text-center">
            Scroll down
          </h3>
          <p className="text-sm text-white/40 text-center max-w-[200px]">
            Each layer moves at a different speed
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-white/30 text-xl"
          >
            ↓
          </motion.div>
        </motion.div>

        {/* Foreground content that scrolls through */}
        <motion.div
          className="absolute inset-x-0 top-[60%] flex flex-col items-center gap-6 px-6"
          style={{ y: fgY }}
        >
          {["Parallax", "Scroll-linked", "Multi-layer"].map((text, i) => (
            <div
              key={text}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white/60"
            >
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
