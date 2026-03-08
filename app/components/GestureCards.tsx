"use client";

import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";

const CARDS = [
  { id: 1, colour: "#3b82f6", label: "Drag me" },
  { id: 2, colour: "#8b5cf6", label: "Swipe left or right" },
  { id: 3, colour: "#ec4899", label: "Flick to dismiss" },
  { id: 4, colour: "#14b8a6", label: "Try a fast swipe" },
  { id: 5, colour: "#f97316", label: "Velocity matters" },
];

function Card({
  card,
  onDismiss,
  style,
}: {
  card: (typeof CARDS)[0];
  onDismiss: () => void;
  style?: React.CSSProperties;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      style={{ x, rotate, opacity, ...style }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.velocity.x) > 300 || Math.abs(info.offset.x) > 120) {
          const direction = info.offset.x > 0 ? 1 : -1;
          x.set(direction * 300);
          onDismiss();
        }
      }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="absolute w-56 h-72 rounded-2xl cursor-grab active:cursor-grabbing flex items-center justify-center shadow-2xl"
      whileTap={{ scale: 1.02 }}
    >
      <div
        className="w-full h-full rounded-2xl flex flex-col items-center justify-center gap-2 border border-white/10"
        style={{ backgroundColor: card.colour }}
      >
        <span className="text-white font-medium text-lg">{card.label}</span>
        <span className="text-white/50 text-xs">Card {card.id}</span>
      </div>
    </motion.div>
  );
}

export default function GestureCards() {
  const [cards, setCards] = useState(CARDS);

  const dismiss = (id: number) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const reset = () => setCards(CARDS);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="relative w-56 h-72 flex items-center justify-center">
        <AnimatePresence>
          {cards.map((card, i) => (
            <Card
              key={card.id}
              card={card}
              onDismiss={() => dismiss(card.id)}
              style={{
                zIndex: cards.length - i,
                scale: 1 - i * 0.04,
                y: i * -8,
              }}
            />
          ))}
        </AnimatePresence>

        {cards.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/30 text-sm"
          >
            All gone!
          </motion.p>
        )}
      </div>

      {cards.length < CARDS.length && (
        <button
          onClick={reset}
          className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 transition-colors text-white/70"
        >
          Reset
        </button>
      )}
    </div>
  );
}
