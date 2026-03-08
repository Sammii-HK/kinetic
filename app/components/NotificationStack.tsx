"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

interface Toast {
  id: number;
  message: string;
  hue: number;
}

const MESSAGES = [
  "Build succeeded",
  "New follower",
  "Payment received",
  "Deploy complete",
  "Message sent",
  "File uploaded",
];

let nextId = 0;

export default function NotificationStack() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const add = useCallback(() => {
    const toast: Toast = {
      id: nextId++,
      message: MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
      hue: Math.floor(Math.random() * 360),
    };
    setToasts((prev) => [toast, ...prev].slice(0, 5));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    }, 3000);
  }, []);

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-4 gap-4">
      <button
        onClick={add}
        className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 transition-colors text-white/70 shrink-0"
      >
        Send notification
      </button>

      <div className="flex-1 w-full max-w-[260px] relative flex flex-col gap-2 overflow-hidden">
        <AnimatePresence initial={false}>
          {toasts.map((toast, i) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: -40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 200, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={() => dismiss(toast.id)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.06] border border-white/[0.08] cursor-pointer hover:bg-white/[0.08] transition-colors"
            >
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: `hsl(${toast.hue}, 70%, 60%)` }}
              />
              <span className="text-sm text-white/70 flex-1">{toast.message}</span>
              <span className="text-white/20 text-xs">x</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {toasts.length === 0 && (
          <p className="text-xs text-white/20 text-center mt-8">
            No notifications
          </p>
        )}
      </div>
    </div>
  );
}
