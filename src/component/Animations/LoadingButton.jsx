"use client";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export const LoadingButton = ({
  isLoading,
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`btn flex items-center gap-2 transition-all ${className}`}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 size={20} />
        </motion.div>
      ) : null}
      {isLoading ? "প্রসেসিং..." : children}
    </button>
  );
};
