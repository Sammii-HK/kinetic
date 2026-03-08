"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
  hue: number;
}

let nextId = 0;

export default function ParticleBurst() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const burst = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const count = 12 + Math.floor(Math.random() * 8);
    const baseHue = Math.random() * 360;

    const newParticles: Particle[] = Array.from({ length: count }, () => ({
      id: nextId++,
      x,
      y,
      angle: Math.random() * Math.PI * 2,
      distance: 40 + Math.random() * 80,
      size: 3 + Math.random() * 6,
      hue: baseHue + Math.random() * 60 - 30,
    }));

    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.some((np) => np.id === p.id))
      );
    }, 800);
  }, []);

  return (
    <div
      className="w-full h-full relative overflow-hidden cursor-crosshair"
      onClick={burst}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-xs text-white/30">Click anywhere for particles</p>
      </div>

      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: `hsl(${p.hue}, 80%, 65%)`,
            }}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{
              scale: [0, 1.5, 0],
              x: Math.cos(p.angle) * p.distance,
              y: Math.sin(p.angle) * p.distance,
              opacity: [1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
