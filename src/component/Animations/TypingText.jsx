"use client";
import { motion } from "framer-motion";

export const TypingText = ({ text, className = "" }) => {
  // টেক্সটকে শব্দে ভাগ করা যাতে শব্দগুলো মাঝখান দিয়ে না ভেঙে যায়
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 5 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }} // বারবার অ্যানিমেশন না হওয়ার জন্য
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="whitespace-nowrap flex mr-[0.25em]">
          {Array.from(word).map((char, charIndex) => (
            <motion.span key={charIndex} variants={child}>
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};
