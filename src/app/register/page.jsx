"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  Lock,
  CheckCircle,
  MapPin,
  CreditCard,
  Calendar,
  Briefcase,
  ShieldCheck,
} from "lucide-react";
import ImageUploadField from "@/component/Global/ImageUploadField";
import InputField from "@/component/Global/InputField";
import SelectField from "@/component/Global/SelectField";
import RegisterBanner from "@/component/Bannars/RegisterBanner";
// import UseTime from "@/component/Animations/UseTime";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { category: "হকার", status: "Pendding" },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (["image", "nidPdfFornt", "nidPdfBackpart"].includes(key)) {
          if (data[key] && data[key][0]) formData.append(key, data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      });

      const res = await axiosInstance.post("/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201 || res.status === 200) {
        alert("নিবন্ধন সফল হয়েছে!");
        router.push("/login");
      }
    } catch (err) {
      alert(err.response?.data?.message || "রেজিস্ট্রেশন করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary/45  shadow-xl group ">
      {/* Background Theme Gradient Layer */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/50 via-secondary/30 to-primary/50 opacity-50  group-hover:opacity-80 transition-opacity duration-500"></div>
      {/* Decorative Animated Circles */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent rounded-full blur-[60px] animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-warning blur-[60px] animate-pulse rounded-full blur-0"></div>

      <div className="w-10/12  grid grid-cols-1 md:grid-cols-12 justify-between items-center rounded-4xl bg-base-content/10 shadow ">
        {/* Left Side: Professional Branding */}
        <aside className="col-span-4 max-h-[90vh]">
          <RegisterBanner />
        </aside>
        {/* Right Side: Structured Form */}
        <aside className=" col-span-8  p-8 lg:p-16  overflow-y-auto max-h-[90vh]">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight italic">
              সদস্য নিবন্ধন ফরম
            </h2>
            <div className="h-1.5 w-20 bg-primary mt-3 rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            {/* Section 1: Profile Image */}
            <section>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span className="w-6 h-[1px] bg-slate-200"></span> প্রোফাইল ছবি
              </h3>
              <div className="flex justify-start">
                <ImageUploadField
                  name="image"
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  required="ছবি প্রয়োজন"
                />
              </div>
            </section>

            {/* Section 2: Personal Details */}
            <section className="space-y-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span className="w-6 h-[1px] bg-slate-200"></span> ব্যক্তিগত
                তথ্য
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                <SelectField
                  label="ক্যাটাগরি"
                  name="category"
                  icon={<Briefcase />}
                  options={[
                    { label: "হকার", value: "হকার" },
                    { label: "ডিলার", value: "ডিলার" },
                  ]}
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="পুরো নাম"
                  name="name"
                  icon={<User />}
                  placeholder="যেমন: ওমর ফারুক"
                  register={register}
                  errors={errors}
                  required="নাম দিন"
                />
                <InputField
                  label="পিতার নাম"
                  name="fatherName"
                  icon={<User />}
                  placeholder="পিতার নাম"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="মাতার নাম"
                  name="motherName"
                  icon={<User />}
                  placeholder="মাতার নাম"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="মোবাইল নম্বর"
                  name="mobile"
                  icon={<Phone />}
                  placeholder="017XXXXXXXX"
                  register={register}
                  errors={errors}
                  required="মোবাইল নম্বর দিন"
                />
                <InputField
                  label="জন্ম তারিখ"
                  name="dob"
                  type="date"
                  icon={<Calendar />}
                  register={register}
                  errors={errors}
                />
              </div>
            </section>

            {/* Section 3: Identity & Security */}
            <section className="space-y-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span className="w-6 h-[1px] bg-slate-200"></span> পরিচয় ও
                নিরাপত্তা
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                <InputField
                  label="NID নম্বর"
                  name="nidNumber"
                  icon={<CreditCard />}
                  placeholder="আপনার এনআইডি নম্বর"
                  register={register}
                  errors={errors}
                  required="NID আবশ্যক"
                />
                <InputField
                  label="গোপন পাসওয়ার্ড"
                  name="password"
                  type="password"
                  icon={<Lock />}
                  placeholder="••••••••"
                  register={register}
                  errors={errors}
                  required="পাসওয়ার্ড দিন"
                />
              </div>
              <InputField
                label="পূর্ণ ঠিকানা"
                name="address"
                icon={<MapPin />}
                placeholder="গ্রাম, ইউনিয়ন, জেলা"
                register={register}
                errors={errors}
              />
            </section>

            {/* Section 4: Document Upload */}
            <section className="space-y-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span className="w-6 h-1 bg-slate-200"></span> এনআইডি কপি আপলোড
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ImageUploadField
                  label="NID (Front)"
                  name="nidPdfFornt"
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                />
                <ImageUploadField
                  label="NID (Back)"
                  name="nidPdfBackpart"
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                />
              </div>
            </section>

            {/* Action Area */}
            <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-100">
              <p className="text-slate-500 text-sm font-medium">
                আগেই একাউন্ট আছে?{" "}
                <Link
                  href="/login"
                  className="text-primary font-bold hover:underline"
                >
                  লগইন করুন
                </Link>
              </p>
              <button
                disabled={loading}
                className="btn btn-primary btn-lg rounded-2xl px-12 h-16 min-w-[200px] shadow-xl shadow-primary/20 flex items-center gap-3 italic"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    নিবন্ধন সম্পন্ন করুন <CheckCircle size={20} />
                  </>
                )}
              </button>
            </div>
          </form>
        </aside>
      </div>
    </div>
  );
}
