import { AnimatedButton } from "@/component/Animations/AnimatedBtn";
import { AnimatedNumber } from "@/component/Animations/AnimatedNumber";
import { FadeIn } from "@/component/Animations/FadeIn";
import { FloatingText } from "@/component/Animations/FloatingText";
import { HoverCard } from "@/component/Animations/HoverCard";
import { LoadingButton } from "@/component/Animations/LoadingButton";
import { MagneticButton } from "@/component/Animations/MagneticButton";
import { RevealText } from "@/component/Animations/RevealText";
import { ShinyButton } from "@/component/Animations/ShinyButton";
import { StaggerContainer } from "@/component/Animations/StaggerContainer";
import { StaggerItem } from "@/component/Animations/StaggerItem";
import { TypingText } from "@/component/Animations/TypingText";
import React from "react";

const ThemeDemo = () => {
  return (
    <div className=" mx-10">
      <FloatingText className="text-3xl  py-4">Themes Color</FloatingText>
      <div className=" w-full grid grid-cols-8 justify-between items-center gap-4 ">
        <div className="bg-base-100 text-base-content h-20 ">base-100</div>
        <div className="bg-base-200 text-base-content h-20 ">base-200</div>
        <div className="bg-base-300 text-base-content h-20 ">base-300</div>

        <div className="bg-primary hover:primary-focus text-primary-content h-20 ">
          primary
        </div>
        <div className="bg-secondary hover:secondary-focus text-secondary-content  h-20 ">
          secondary
        </div>
        <div className="bg-accent hover:accent-focus text-accent-content  h-20 ">
          accent
        </div>
        <div className="bg-neutral hover:neutral-focus text-neutral-content h-20 ">
          neutral
        </div>
        <div className="bg-info hover:info-focus text-info-content h-20 ">
          info
        </div>
        <div className="bg-success hover:success-focus text-success-content h-20 ">
          success
        </div>
        <div className="bg-warning hover:warning-focus text-warning-content h-20 ">
          warning
        </div>
        <div className="bg-error hover:error-focus text-error-content h-20 ">
          error
        </div>
      </div>

      <RevealText className="text-3xl  py-4" delay={1}>
        {" "}
        Buttons
      </RevealText>
      <section className=" grid grid-cols-6 gap-4 justify-between items-center">
        <ShinyButton>ShinyButton</ShinyButton>
        <AnimatedButton>AnimatedButton</AnimatedButton>
        <LoadingButton>LoadingButton</LoadingButton>
        <MagneticButton>MagneticButton</MagneticButton>
        <AnimatedButton>AnimatedButton</AnimatedButton>
      </section>

      <RevealText className="text-3xl  py-4" delay={1}>
        {" "}
        Gradien color
      </RevealText>
      <section className=" grid grid-cols-6 gap-4 justify-between items-center">
        {/* ব্যানার স্টাইল */}
        <FadeIn direction="down" className="md:col-span-2">
          <div className="h-44 w-full bg-linear-to-r from-[#0F4C81] via-[#1E3A8A] to-[#3B82F6] rounded-[30px] p-8 text-white shadow-xl flex flex-col justify-center">
            <h2 className="text-3xl font-black italic">Bhai Bhai Super</h2>
            <p className="opacity-80">
              ম্যানেজমেন্ট ড্যাশবোর্ডে আপনাকে স্বাগতম
            </p>
          </div>
        </FadeIn>

        {/* ছোট কার্ড ১ */}
        <div className="p-6 rounded-2xl bg-linear-to-bl to-accent from-info text-white shadow-lg">
          <p className="font-medium opacity-90">দৈনিক বিক্রয়</p>
          <h3 className="text-2xl font-bold">৳ ৪৫,০০০</h3>
        </div>

        {/* ছোট কার্ড ২ */}
        <div className="p-6 rounded-2xl bg-linear-to-tr from-primary to-secondary text-white shadow-lg">
          <p className="font-medium opacity-90">primay and secondary</p>
          <p className="font-medium opacity-90">primay and secondary</p>
        </div>
      </section>

      {/* <TypingText>Cards</TypingText> */}
      <FadeIn>Cards</FadeIn>
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 py-5">
        {/* কার্ড ১: দৈনিক বিক্রয় */}
        <StaggerItem>
          <HoverCard className="bg-white p-6 rounded-2xl border-l-4 border-primary shadow-sm">
            <p className="text-gray-500">আজকের মোট বিক্রয়</p>
            <h2 className="text-3xl font-black text-primary">
              ৳<AnimatedNumber value={45600} />
            </h2>
          </HoverCard>
        </StaggerItem>

        {/* কার্ড ২: দৈনিক খরচ */}
        <StaggerItem>
          <HoverCard className="bg-white p-6 rounded-2xl border-l-4 border-error shadow-sm">
            <p className="text-gray-500">আজকের খরচ</p>
            <h2 className="text-3xl font-black text-error">
              ৳<AnimatedNumber value={12500} />
            </h2>
          </HoverCard>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
};

export default ThemeDemo;
