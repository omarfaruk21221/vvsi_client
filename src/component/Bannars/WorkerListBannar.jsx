"use client";
import React from "react";
import { Users, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn } from "../Animations/FadeIn"; // আপনার এনিমেশন পাথ অনুযায়ী ঠিক করে নিন
import { RevealText } from "../Animations/RevealText";

export default function WorkerListBanner({
  totalCustomers,
  filteredCount,
  title1,
  title2,
  icon,
}) {
  return (
    <FadeIn>
      <div className="relative overflow-hidden bg-primary/15 rounded-[2.5rem] border border-base-300 shadow-xl mb-10 group">
        {/* --- Background Dynamic Effects --- */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-base-100 to-secondary/10 opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>

        {/* Animated Glow Orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-[60px]"></div>

        <div className="relative px-8 py-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* --- Left Content Section --- */}
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative w-20 h-20 rounded-4xl bg-linear-to-tr from-primary to-secondary p-1 shadow-lg shadow-primary/20"
            >
              <div className="w-full h-full rounded-[1.9rem] bg-base-100 flex items-center justify-center">
                {icon}
              </div>
              <div className="absolute -top-2 -right-2 bg-warning p-1.5 rounded-lg shadow-md animate-bounce">
                <Sparkles size={14} className="text-base-100 fill-base-100" />
              </div>
            </motion.div>

            <div className="space-y-1">
              <RevealText className="text-3xl md:text-5xl font-black text-base-content py-3 tracking-tighter">
                {title1}
                {"  "}
                <span className="text-primary underline decoration-primary/20 decoration-4 underline-offset-4">
                  {title2}
                </span>
              </RevealText>

              <p className="text-xs font-bold text-base-content/50 uppercase tracking-[0.3em]">
                ভাই ভাই সুপার আইস্ক্রিম • ২০২৬
              </p>

              <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
                <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-success/10 text-success text-[10px] font-black uppercase border border-success/20 backdrop-blur-md">
                  <ShieldCheck size={14} /> ডাটা সুরক্ষিত ও আপডেট
                </span>
              </div>
            </div>
          </div>

          {/* --- Right Stats Card Section --- */}
          <FadeIn>
            <div className="flex items-center gap-8 bg-base-100/40 backdrop-blur-2xl border border-white/20 p-6 rounded-[2.5rem] shadow-2xl group-hover:translate-y-[-5px] transition-transform duration-500">
              {/* Total Card */}
              <div className="text-center">
                <p className="text-4xl font-black text-primary leading-none">
                  {totalCustomers}
                </p>
                <p className="text-[10px] text-base-content/50 uppercase font-black tracking-widest mt-2">
                  মোট গ্রাহক
                </p>
              </div>

              <div className="h-10 w-1 bg-primary/20 rounded-full"></div>

              {/* Filtered Card */}
              <div className="text-center">
                <p className="text-4xl font-black text-secondary leading-none">
                  {filteredCount}
                </p>
                <p className="text-[10px] text-base-content/50 uppercase font-black tracking-widest mt-2">
                  ফিল্টার্ড
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* --- Bottom Animated Progress Line --- */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-base-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="h-full bg-linear-to-r from-primary via-indigo-500 to-secondary opacity-70"
          />
        </div>
      </div>
    </FadeIn>
  );
}
