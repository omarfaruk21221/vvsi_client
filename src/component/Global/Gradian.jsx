import React from "react";

const Gradian = ({ children, className = "" }) => {
  return (
    <div
      className={`flex items-center justify-center bg-primary/45 shadow-xl group relative overflow-hidden ${className}`}
    >
      {/* Background Overlays */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/50 via-secondary/30 to-primary/50 opacity-50 transition-opacity duration-500 group-hover:opacity-80" />

      {/* Animated Orbs */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent rounded-full blur-[60px] animate-pulse" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-warning rounded-full blur-[60px] animate-pulse" />

      {/* Content Container */}
      <div className="relative z-10 w-full flex justify-center">{children}</div>
    </div>
  );
};

export default Gradian;
