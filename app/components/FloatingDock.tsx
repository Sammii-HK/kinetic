"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

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

const BASE_SIZE = 40;
const MAX_SIZE = 56;
const RADIUS = 100;

function DockIcon({
  icon,
  mouseX,
  index,
  dockLeft,
  dockGap,
  dockPadding,
}: {
  icon: (typeof ICONS)[0];
  mouseX: ReturnType<typeof useMotionValue<number>>;
  index: number;
  dockLeft: number;
  dockGap: number;
  dockPadding: number;
}) {
  // Calculate stable center based on index, not bounding rect
  const stableCenter = dockLeft + dockPadding + index * (BASE_SIZE + dockGap) + BASE_SIZE / 2;

  const distance = useTransform(mouseX, (val) =>
    Math.abs(val - stableCenter)
  );

  const size = useSpring(
    useTransform(distance, [0, RADIUS], [MAX_SIZE, BASE_SIZE]),
    { stiffness: 400, damping: 30, mass: 0.5 }
  );
  const y = useSpring(
    useTransform(distance, [0, RADIUS], [-12, 0]),
    { stiffness: 400, damping: 30, mass: 0.5 }
  );

  return (
    <motion.div
      style={{ width: size, height: size, y }}
      className="rounded-xl flex items-center justify-center cursor-pointer border border-white/10 shrink-0"
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
  const dockRef = useRef<HTMLDivElement>(null);
  const [dockLeft, setDockLeft] = useState(0);

  useEffect(() => {
    const update = () => {
      if (dockRef.current) {
        setDockLeft(dockRef.current.getBoundingClientRect().left);
      }
    };
    update();
    window.addEventListener("resize", update);
    // Recalculate after layout settles
    const timer = setTimeout(update, 100);
    return () => {
      window.removeEventListener("resize", update);
      clearTimeout(timer);
    };
  }, []);

  const gap = 8; // gap-2 = 0.5rem = 8px
  const padding = 12; // px-3 = 0.75rem = 12px

  return (
    <div className="w-full h-full flex flex-col items-center justify-end pb-6 gap-3">
      <p className="text-xs text-white/20 mb-auto mt-8">Hover along the dock</p>

      <motion.div
        ref={dockRef}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-2 px-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm"
        style={{ height: BASE_SIZE + 16, paddingBottom: 8 }}
      >
        {ICONS.map((icon, i) => (
          <DockIcon
            key={icon.label}
            icon={icon}
            mouseX={mouseX}
            index={i}
            dockLeft={dockLeft}
            dockGap={gap}
            dockPadding={padding}
          />
        ))}
      </motion.div>
    </div>
  );
}
