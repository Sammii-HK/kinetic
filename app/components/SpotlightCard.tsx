"use client";

import { useMotionValue, motion, useSpring } from "framer-motion";
import { useRef } from "react";

function Card({ title, description }: { title: string; description: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const spotY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 overflow-hidden group cursor-default"
    >
      <motion.div
        className="absolute w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
          x: spotX,
          y: spotY,
          marginLeft: -80,
          marginTop: -80,
        }}
      />
      <h4 className="text-sm font-medium text-white/80 relative">{title}</h4>
      <p className="text-xs text-white/40 mt-1.5 leading-relaxed relative">{description}</p>
    </div>
  );
}

export default function SpotlightCard() {
  return (
    <div className="w-full h-full flex flex-col gap-3 p-4">
      <p className="text-xs text-white/30 text-center">Hover to reveal the spotlight</p>
      <Card
        title="Spring animations"
        description="Physics-based motion with configurable stiffness, damping, and mass."
      />
      <Card
        title="Layout transitions"
        description="Automatic interpolation between any two CSS layouts."
      />
      <Card
        title="Gesture system"
        description="Drag, tap, hover, and pan with velocity tracking."
      />
    </div>
  );
}
