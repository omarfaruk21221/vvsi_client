"use client";
import React from "react";
import { UserPlus, Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { CgUserList } from "react-icons/cg";
import Link from "next/link";
import { FadeIn } from "../Animations/FadeIn";

export default function UniqueGradientBanner() {
  return (
    <FadeIn>
      <div className="relative overflow-hidden bg-primary/15 rounded-4xl border border-base-300 shadow-xl mb-10 group">
        {/* Background Theme Gradient Layer */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-base-100 to-secondary/10 opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>

        {/* Decorative Animated Circles */}
        <div className="absolute top-[-40px] right-[-40px] w-48 h-48 bg-primary/20 rounded-full blur-[60px] animate-pulse"></div>
        <div className="absolute bottom-[-30px] left-[-20px] w-32 h-32 bg-secondary/20 rounded-full blur-[40px]"></div>

        <div className="relative px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Section: Branding & Title */}
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-20 h-20 rounded-[2rem] bg-gradient-to-tr from-primary to-secondary p-[2px] shadow-lg shadow-primary/20"
            >
              <div className="w-full h-full rounded-[1.9rem] bg-base-100 flex items-center justify-center">
                <UserPlus size={32} className="text-primary" />
              </div>
              {/* Small Floating Icon */}
              <div className="absolute -top-2 -right-2 bg-warning p-1.5 rounded-lg shadow-md animate-bounce">
                <Sparkles size={12} className="text-white fill-white" />
              </div>
            </motion.div>

            <FadeIn>
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-base-content tracking-tighter">
                  নতুন গ্রাহক{" "}
                  <span className="text-primary underline decoration-primary/20 decoration-4 underline-offset-4">
                    নিবন্ধন
                  </span>
                </h1>
                <p className="text-xs font-bold text-base-content/50 uppercase tracking-[0.3em]">
                  Smart Customer Portal • 2026
                </p>
                <div className="flex items-center justify-center md:justify-start gap-3 mt-3">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-black uppercase">
                    <ShieldCheck size={16} /> নিরাপদ ডাটাবেস
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Section: Interactive Status Card */}
          <div className="relative">
            <Link
              href={"/dashboard/customer-list"}
              className=" btn bg-primary/15 hover:bg-primary/30  backdrop-blur-2xl border border-base-300 p-2 rounded-4xl shadow-2xl flex items-center gap-4 group-hover:translate-y-[-5px] py-2 transition-transform duration-300"
            >
              <div className=" rounded-2xl bg-linear-to-br from-primary to-secondary flex items-center justify-center text-base-100 font-black shadow-lg">
                <CgUserList className="text-4xl p-1" />
              </div>
              <div>
                <p className="text-md font-black text-base-content">
                  গ্রাহকের তালিকা
                </p>
              </div>
            </Link>
            {/* Decorative Dot */}
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-secondary rounded-full blur-md opacity-50"></div>
          </div>
        </div>

        {/* Bottom Progress Bar Decoration */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-base-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2 }}
            className="h-full bg-linear-to-r from-primary to-secondary opacity-60"
          />
        </div>
      </div>
    </FadeIn>
  );
}
