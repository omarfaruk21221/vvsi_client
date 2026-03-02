"use client";
import { motion } from "framer-motion";

export const FadeIn = ({ children, delay = 0, direction = "up" }) => {
  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }} // স্ক্রিনে একবার আসলে আর এনিমেশন হবে না
      transition={{
        duration: 0.6,
        delay: delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};
