"use client";
import { motion } from "framer-motion";

export const ShinyButton = ({ children, className = "" }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden group btn btn-primary ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
      />
    </motion.button>
  );
};
