"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const ICONS = [
  { label: "Home", emoji: "🏠", hue: 220 },
  { label: "Search", emoji: "🔍", hue: 280 },
  { label: "Music", emoji: "🎵", hue: 340 },
  { label: "Photos", emoji: "📷", hue: 160 },
  { label: "Mail", emoji: "✉️", hue: 30 },
  { label: "Calendar", emoji: "📅", hue: 200 },
  { label: "Notes", emoji: "📝", hue: 50 },
  { label: "Settings", emoji: "⚙️", hue: 0 },
];

function DockIcon({
  icon,
  mouseX,
}: {
  icon: (typeof ICONS)[0];
  mouseX: ReturnType<typeof useMotionValue<number>>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return 200;
    return Math.abs(val - (rect.left + rect.width / 2));
  });

  const rawScale = useTransform(distance, [0, 80, 200], [1.6, 1.2, 1]);
  const scale = useSpring(rawScale, { stiffness: 400, damping: 25 });
  const rawY = useTransform(distance, [0, 80, 200], [-12, -4, 0]);
  const y = useSpring(rawY, { stiffness: 400, damping: 25 });

  return (
    <motion.div
      ref={ref}
      style={{ scale, y }}
      className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer border border-white/10"
      title={icon.label}
      whileTap={{ scale: 0.9 }}
    >
      <div
        className="w-full h-full rounded-xl flex items-center justify-center text-lg"
        style={{ backgroundColor: `hsla(${icon.hue}, 60%, 40%, 0.5)` }}
      >
        {icon.emoji}
      </div>
    </motion.div>
  );
}

export default function FloatingDock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="w-full h-full flex flex-col items-center justify-end pb-6 gap-3">
      <p className="text-xs text-white/20 mb-auto mt-8">Hover along the dock</p>

      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex gap-2 px-3 py-2 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm"
      >
        {ICONS.map((icon) => (
          <DockIcon key={icon.label} icon={icon} mouseX={mouseX} />
        ))}
      </motion.div>
    </div>
  );
}
