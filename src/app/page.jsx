"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import Gradian from "@/component/Global/Gradian";
import { FadeIn } from "@/component/Animations/FadeIn";
import MyLogo from "@/component/MyLogo";
import { Lock, LogIn, PhoneCall, UserCheck } from "lucide-react";
import InputField from "@/component/Global/InputField";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.post("/login", data);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "লগইন ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FadeIn>
      <Gradian className="min-h-screen">
        <div className=" p-8 rounded-2xl shadow-xl w-full max-w-md shadow-primary/50">
          {/* login bannar  */}
          <FadeIn>
            <section className="w-full mx-auto my-8">
              <div className="flex justify-center">
                <MyLogo />
              </div>
              {/* --- sub heading --  */}
              <div className="mt-4 w-full text-center inline-flex justify-center items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/30">
                <LogIn size={18} className="text-primary" />
                <span className="text-center text-lg font-black uppercase tracking-[.2rem] text-primary/80">
                  অ্যাকাউন্টে লগইন করুন
                </span>
              </div>
            </section>
          </FadeIn>
          <FadeIn>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <InputField
                label="মোবাইল নম্বর"
                name="mobile"
                icon={<PhoneCall size={18} />}
                placeholder="017XXXXXXXX"
                register={register}
                errors={errors}
                required="মোবাইল নম্বর আবশ্যক"
              />
              <InputField
                label="গোপন পাসওয়ার্ড"
                name="password"
                type="password"
                icon={<Lock size={18} />}
                placeholder="••••••••"
                register={register}
                errors={errors}
                required="পাসওয়ার্ড দিন"
              />

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary rounded-4xl w-full text-lg font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "লগইন করুন"
                )}
              </button>

              <div className="text-center mt-4">
                <p className="text-md text-primary font-black">
                  একাউন্ট নেই?
                  <Link
                    href="/register"
                    className=" link text-base-100 pl-2 hover:text-primary italic"
                  >
                    নুতন অ্যাকাউন্টে নিবন্ধন করুন
                  </Link>
                </p>
              </div>
            </form>
          </FadeIn>
        </div>
      </Gradian>
    </FadeIn>
  );
}
