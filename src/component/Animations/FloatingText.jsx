"use client";
import { motion } from "framer-motion";

export const FloatingText = ({ children, className = "" }) => {
  return (
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
