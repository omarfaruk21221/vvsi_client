"use client";
import { motion } from "framer-motion";

export const TypingText = ({ text, className = "" }) => {
  const letters = Array.from(text);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      className={`flex flex-wrap ${className}`}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 5 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.1, delay: index * 0.05 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};
