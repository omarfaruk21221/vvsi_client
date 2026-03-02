"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "image") {
          if (data.image[0]) formData.append("image", data.image[0]);
        } else {
          formData.append(key, data[key]);
        }
      });

      const res = await axiosInstance.post("/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        alert("অ্যাকাউন্ট তৈরি সফল!");
        router.push("/login");
      }
    } catch (err) {
      alert(err.response?.data?.message || "সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4 transition-colors duration-300">
      <div className="max-w-5xl w-full bg-base-100 rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-base-300">
        {/* Left Side: Brand Visual (Uses Primary Theme Color) */}
        <div className="lg:w-1/2 bg-primary text-primary-content p-12 flex flex-col justify-center items-center text-center space-y-6">
          <div className="text-8xl animate-bounce">🍦</div>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">
            Bhai Bhai Super
          </h1>
          <p className="text-lg opacity-90 font-medium">
            আমাদের ফ্যাক্টরি ম্যানেজমেন্ট সিস্টেমে আপনাকে স্বাগতম। একাউন্ট তৈরি
            করে কাজ শুরু করুন।
          </p>
          <div className="flex gap-2">
            <span className="badge badge-outline badge-lg opacity-80">
              Premium Quality
            </span>
            <span className="badge badge-outline badge-lg opacity-80">
              Fast Delivery
            </span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:w-1/2 p-8 lg:p-12 bg-base-100">
          <h2 className="text-3xl font-bold text-primary mb-6 italic">
            নতুন একাউন্ট
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base-content">
                  পুরো নাম
                </span>
              </label>
              <input
                {...register("username", { required: "নাম আবশ্যক" })}
                className="input input-bordered w-full focus:input-primary bg-base-200 text-base-content"
                placeholder="ওমর ফারুক"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base-content">
                  মোবাইল নম্বর
                </span>
              </label>
              <input
                {...register("mobile", { required: "নম্বর আবশ্যক" })}
                className="input input-bordered w-full focus:input-primary bg-base-200 text-base-content"
                placeholder="017XXXXXXXX"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base-content">
                  পাসওয়ার্ড
                </span>
              </label>
              <input
                type="password"
                {...register("password", { required: "পাসওয়ার্ড আবশ্যক" })}
                className="input input-bordered w-full focus:input-primary bg-base-200 text-base-content"
                placeholder="••••••••"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base-content">
                  প্রোফাইল ছবি
                </span>
              </label>
              <input
                type="file"
                {...register("image")}
                className="file-input file-input-bordered file-input-primary w-full bg-base-200"
              />
            </div>

            <button
              disabled={loading}
              className={`btn btn-primary w-full text-lg mt-4 shadow-lg shadow-primary/20`}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "একাউন্ট তৈরি করুন"
              )}
            </button>
          </form>

          <div className="divider text-base-content opacity-30 text-xs">
            অথবা
          </div>

          <p className="text-center text-base-content">
            আগেই একাউন্ট আছে?{" "}
            <Link href="/login" className="link link-primary font-bold italic">
              লগইন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
