"use client";
import React from "react";
import { motion } from "framer-motion";
import { HelpCircle, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import { FadeIn } from "../Animations/FadeIn";
import Image from "next/image";
import { RevealText } from "../Animations/RevealText";

const RegisterBanner = () => {
  return (
    <FadeIn>
      <div className="relative w-full lg:h-[90vh] overflow-hidden bg-primary/40 rounded-4xl border border-base-200 shadow-sm mb-10 p-8 lg:p-10 flex flex-col justify-between group">
        {/* Background Decorative - ইউনিক আভা */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[80px] -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-[80px] -ml-20 -mb-20"></div>

        {/* --- Top Section: স্বাগতম --- */}
        <div className="relative z-10 flex flex-col gap-1">
          <div className="overflow-hidden">
            <RevealText className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-none">
              স্বাগতম
            </RevealText>
          </div>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 1 }}
            className="h-1 bg-secondary rounded-full mt-2"
          />
          <div className=" absolute right-0 top-1 animate-bounce">
            <Image
              width={100}
              height={100}
              src="/catoon.png"
              alt="brand-logo"
              className="w-full h-full drop-shadow-2xl"
            />
          </div>
          {/* --- sub heading --  */}
          <div className="mt-10 inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/30">
            <UserCheck size={12} className="text-secondary" />
            <span className="text-mg font-black uppercase tracking-widest text-primary/80">
              নতুন সদস্য নিবন্ধন
            </span>
          </div>
        </div>
        {/* --- Middle Section: লোগো ও ব্র্যান্ড --- */}
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-black italic t leading-none text-primary">
            ভাই ভাই
          </h1>
          <h2 className="text-3xl lg:text-4xl font-black italic tracking-tighter uppercase text-accent mt-1">
            সুপার আইসক্রিম
          </h2>
        </div>
        <div className="relative pl-6">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-primary to-transparent rounded-full" />

          <p className="text-neutral/70 text-sm font-bold italic leading-relaxed max-w-sm">
            চলুন সৎভাবে ব্যবসা করি; কিয়ামতের দিন নবীগণ, সিদ্দিকগণ এবং শহীদগণের
            সঙ্গী হই
          </p>
        </div>
        {/* --- Bottom Section: মেসেজ ও কন্টাক্ট --- */}
        <div className="flex items-center gap-2 text-neutral/50">
          <HelpCircle size={16} />
          <span className="text-sm font-bold uppercase tracking-widest italic">
            যোগাযোগ: ০১৭XX-XXXXXX
          </span>
        </div>
      </div>
    </FadeIn>
  );
};

export default RegisterBanner;
