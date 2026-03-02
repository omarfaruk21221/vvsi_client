"use client";
import { motion } from "framer-motion";

export const StaggerContainer = ({
  children,
  delayChildren = 0.1,
  staggerBy = 0.1,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            delayChildren: delayChildren,
            staggerChildren: staggerBy,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};
