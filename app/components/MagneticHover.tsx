"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

function MagneticButton({ label, colour }: { label: string; colour: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.3);
    y.set(dy * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-3 rounded-xl cursor-pointer text-white font-medium text-sm border border-white/10 select-none"
      role="button"
      tabIndex={0}
    >
      <span
        className="block w-full h-full"
        style={{ textShadow: `0 0 20px ${colour}` }}
      >
        {label}
      </span>
    </motion.div>
  );
}

export default function MagneticHover() {
  const buttons = [
    { label: "Hover me", colour: "#3b82f6" },
    { label: "I'm magnetic", colour: "#8b5cf6" },
    { label: "Try me too", colour: "#ec4899" },
    { label: "Smooth spring", colour: "#14b8a6" },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5 p-4">
      <p className="text-xs text-white/30">Move your cursor near the buttons</p>
      <div className="grid grid-cols-2 gap-4">
        {buttons.map((b) => (
          <MagneticButton key={b.label} {...b} />
        ))}
      </div>
    </div>
  );
}
