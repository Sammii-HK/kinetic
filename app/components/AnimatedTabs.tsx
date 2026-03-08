"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const TABS = [
  {
    id: "spring",
    label: "Spring",
    content: "Spring animations use physics-based motion with stiffness, damping, and mass parameters for natural movement.",
    colour: "#3b82f6",
  },
  {
    id: "tween",
    label: "Tween",
    content: "Tween animations interpolate between values over a fixed duration using easing curves like ease-in-out.",
    colour: "#8b5cf6",
  },
  {
    id: "inertia",
    label: "Inertia",
    content: "Inertia animations decelerate from an initial velocity, simulating friction. Great for flick gestures.",
    colour: "#ec4899",
  },
  {
    id: "keyframes",
    label: "Keyframes",
    content: "Keyframe animations step through multiple values with configurable timing for complex sequences.",
    colour: "#14b8a6",
  },
];

export default function AnimatedTabs() {
  const [active, setActive] = useState(TABS[0].id);
  const current = TABS.find((t) => t.id === active)!;

  return (
    <div className="w-full h-full flex flex-col p-4 gap-4">
      <div className="flex gap-1 bg-white/[0.03] rounded-lg p-1 relative">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className="relative flex-1 py-2 text-xs font-medium z-10 transition-colors"
            style={{ color: active === tab.id ? "#fff" : "rgba(255,255,255,0.4)" }}
          >
            {active === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-0 rounded-md"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative">{tab.label}</span>
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex-1 rounded-lg bg-white/[0.03] border border-white/[0.06] p-4 flex flex-col gap-3"
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: current.colour }}
        />
        <p className="text-sm text-white/60 leading-relaxed">
          {current.content}
        </p>
      </motion.div>
    </div>
  );
}
