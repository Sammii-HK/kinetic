"use client";

import { motion, useSpring } from "framer-motion";
import { useState, useCallback } from "react";

const TRAIL_COUNT = 12;

function TrailDot({ index, x, y }: { index: number; x: number; y: number }) {
  const delay = index * 0.03;
  const springConfig = { stiffness: 200 - index * 10, damping: 20 + index * 2 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  sx.set(x);
  sy.set(y);

  const size = 16 - index;
  const hue = (index * 30) % 360;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        x: sx,
        y: sy,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        backgroundColor: `hsla(${hue}, 80%, 65%, ${1 - index * 0.07})`,
      }}
    />
  );
}

export default function CursorTrail() {
  const [pos, setPos] = useState({ x: 150, y: 150 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-xs text-white/20">Move your cursor</p>
      </div>

      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <TrailDot key={i} index={i} x={pos.x} y={pos.y} />
      ))}
    </div>
  );
}
