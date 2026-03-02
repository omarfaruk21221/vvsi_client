"use client";
import { motion } from "framer-motion";

export const RevealText = ({ children, delay = 0, className = "" }) => {
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        className={className}
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1], delay }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    </div>
  );
};
