"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { FadeIn } from "../Animations/FadeIn";
import Link from "next/link";
import MyLogo from "../MyLogo";

const RegisterBanner = () => {
  return (
    <FadeIn>
      <div className="relative w-full md:h-[90vh] overflow-hidden bg-primary/15 rounded-4xl border border-base-300 shadow-xl mb-10 group">
        {/* Decorative Animated Circles */}
        <div className="absolute top-2 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 rounded-full blur-[60px]"></div>
        {/* ----- conent --- */}
        <div className=" animate-bounce my-10 mx-10">
          <MyLogo />
        </div>
      </div>
    </FadeIn>
    // <div className="rounded-4xl">
    //   {/* ব্যাকগ্রাউন্ডে খুব হালকা একটি গ্রেডিয়েন্ট শেড */}
    //   <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(59,130,246,0.1)_0%,transparent_50%)]" />

    //   {/* ১. লোগো বা ব্র্যান্ড মার্ক */}
    //   <div className="relative z-10">
    //     <motion.div
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       className="flex items-center gap-2 mb-16"
    //     ></motion.div>

    //     {/* . মেইন স্লোগান  */}
    //     <motion.div
    //       initial={{ y: 20, opacity: 0 }}
    //       animate={{ y: 0, opacity: 1 }}
    //       transition={{ delay: 0.2 }}
    //       className="space-y-4"
    //     ></motion.div>
    //   </div>
    // </div>
  );
};

export default RegisterBanner;
