import React from "react";

const Gradian = (children) => {
  return (
    <div className="relative overflow-hidden bg-primary/15 rounded-4xl border border-base-300 shadow-xl mb-10 group">
      {/* Background Theme Gradient Layer */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-base-100 to-secondary/10 opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>

      {/* Decorative Animated Circles */}
      <div className="absolute top-[-40px] right-[-40px] w-48 h-48 bg-primary/20 rounded-full blur-[60px] animate-pulse"></div>
      <div className="absolute bottom-[-30px] left-[-20px] w-32 h-32 bg-secondary/20 rounded-full blur-[40px]"></div>

      <div className="relative px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {children}
      </div>
    </div>
  );
};

export default Gradian;
