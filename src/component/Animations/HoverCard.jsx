"use client";
import { motion } from "framer-motion";

export const HoverCard = ({ children, className = "" }) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow:
          "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
};
