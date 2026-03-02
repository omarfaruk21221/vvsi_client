"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-200 transition-colors duration-300">
      <div className="bg-base-100 p-8 rounded-2xl shadow-xl w-full max-w-md border border-base-300">
        <div className="text-center mb-8">
          <div className="text-5xl mb-2">🍦</div>
          <h1 className="text-3xl font-black text-primary italic uppercase tracking-tight">
            Bhai Bhai Super
          </h1>
          <p className="text-secondary font-medium">অ্যাকাউন্টে লগইন করুন</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-base-content">
                মোবাইল নম্বর
              </span>
            </label>
            <input
              {...register("mobile", { required: "মোবাইল নম্বর দিন" })}
              className={`input input-bordered w-full focus:input-primary bg-base-200 text-base-content ${errors.mobile ? "input-error" : ""}`}
              placeholder="017XXXXXXXX"
            />
            {errors.mobile && (
              <span className="text-error text-xs mt-1">
                {errors.mobile.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-base-content">
                পাসওয়ার্ড
              </span>
            </label>
            <input
              type="password"
              {...register("password", { required: "পাসওয়ার্ড দিন" })}
              className={`input input-bordered w-full focus:input-primary bg-base-200 text-base-content ${errors.password ? "input-error" : ""}`}
              placeholder="••••••••"
            />
            {errors.password && (
              <span className="text-error text-xs mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          {error && (
            <div className="alert alert-error py-2 shadow-sm">
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full text-lg font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "লগইন করুন"
            )}
          </button>

          <div className="text-center mt-4">
            <p className="text-sm">
              একাউন্ট নেই?
              <Link
                href="/register"
                className="link link-secondary ml-2 font-bold italic"
              >
                Register Here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
