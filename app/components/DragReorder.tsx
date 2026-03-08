"use client";

import { Reorder } from "framer-motion";
import { useState } from "react";

const INITIAL = [
  { id: "1", label: "Drag to reorder", hue: 220 },
  { id: "2", label: "Spring physics", hue: 280 },
  { id: "3", label: "Smooth transitions", hue: 340 },
  { id: "4", label: "Layout animation", hue: 160 },
  { id: "5", label: "Gesture-driven", hue: 30 },
];

export default function DragReorder() {
  const [items, setItems] = useState(INITIAL);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 gap-3">
      <p className="text-xs text-white/30">Drag items to rearrange</p>
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        className="flex flex-col gap-2 w-full max-w-[260px]"
      >
        {items.map((item) => (
          <Reorder.Item
            key={item.id}
            value={item}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] cursor-grab active:cursor-grabbing select-none"
            whileDrag={{
              scale: 1.03,
              boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
              backgroundColor: "rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="w-1.5 h-8 rounded-full shrink-0"
              style={{ backgroundColor: `hsl(${item.hue}, 70%, 60%)` }}
            />
            <span className="text-sm text-white/70">{item.label}</span>
            <span className="ml-auto text-white/20 text-xs">⠿</span>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
