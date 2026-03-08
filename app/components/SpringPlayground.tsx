"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";

export default function SpringPlayground() {
  const [stiffness, setStiffness] = useState(200);
  const [damping, setDamping] = useState(20);
  const [mass, setMass] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness, damping, mass });
  const springY = useSpring(y, { stiffness, damping, mass });

  // Spring line stretches from centre to ball position
  const lineX = useTransform(springX, (v) => v);
  const lineY = useTransform(springY, (v) => v);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Spring canvas */}
      <div
        ref={containerRef}
        className="flex-1 relative flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* Spring line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.line
            x1="50%"
            y1="50%"
            x2={useTransform(lineX, (v) => `calc(50% + ${v}px)`)}
            y2={useTransform(lineY, (v) => `calc(50% + ${v}px)`)}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
        </svg>

        {/* Anchor dot */}
        <div className="absolute w-3 h-3 rounded-full bg-white/30" />

        {/* Draggable ball */}
        <motion.div
          drag
          dragElastic={0}
          dragMomentum={false}
          onDrag={(_, info) => {
            x.set(info.offset.x);
            y.set(info.offset.y);
          }}
          onDragEnd={() => {
            x.set(0);
            y.set(0);
          }}
          style={{ x: springX, y: springY }}
          className="w-14 h-14 rounded-full bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.4)] z-10"
          whileTap={{ scale: 1.1 }}
        />
      </div>

      {/* Controls */}
      <div className="grid grid-cols-3 gap-3 p-4 pt-2">
        {[
          { label: "Stiffness", value: stiffness, set: setStiffness, min: 10, max: 1000 },
          { label: "Damping", value: damping, set: setDamping, min: 1, max: 100 },
          { label: "Mass", value: mass, set: setMass, min: 0.1, max: 10, step: 0.1 },
        ].map(({ label, value, set, min, max, step }) => (
          <div key={label} className="flex flex-col gap-1">
            <div className="flex justify-between text-xs text-white/40">
              <span>{label}</span>
              <span className="font-mono">{typeof value === "number" && value % 1 !== 0 ? value.toFixed(1) : value}</span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              step={step || 1}
              value={value}
              onChange={(e) => set(parseFloat(e.target.value))}
              className="w-full accent-blue-500 h-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
