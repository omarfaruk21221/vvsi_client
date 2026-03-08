"use client";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import {
  User,
  Phone,
  Lock,
  CheckCircle,
  MapPin,
  CreditCard,
  Calendar,
  Briefcase,
} from "lucide-react";
import ImageUploadField from "@/component/Global/ImageUploadField";
import InputField from "@/component/Global/InputField";
import SelectField from "@/component/Global/SelectField";
import RegisterBanner from "@/component/Bannars/RegisterBanner";
import { RevealText } from "@/component/Animations/RevealText";
import { FadeIn } from "@/component/Animations/FadeIn";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "সাধারণ",
      status: "Pending",
    },
  });

  // ইমেজ আপলোড করার জন্য আলাদা ক্লিন ফাংশন
  const uploadToImgBB = async (fileList) => {
    if (!fileList || !fileList[0]) return "";

    try {
      const imgFormData = new FormData();
      imgFormData.append("image", fileList[0]);

      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!apiKey) throw new Error("API Key পাওয়া যায়নি");

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: imgFormData,
        },
      );

      const result = await response.json();
      if (result.success) return result.data.url;
      throw new Error(result.error?.message || "ইমেজ আপলোড ব্যর্থ হয়েছে");
    } catch (error) {
      console.error("ImgBB Upload Error:", error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const [profileUrl, nidFrontUrl, nidBackUrl] = await Promise.all([
        uploadToImgBB(data.image),
        uploadToImgBB(data.nidPdfFornt),
        uploadToImgBB(data.nidPdfBackpart),
      ]);

      const finalPayload = {
        ...data,
        image: profileUrl,
        nidPdfFornt: nidFrontUrl,
        nidPdfBackpart: nidBackUrl,
      };
      console.log("register data", finalPayload);
      const res = await axiosInstance.post("/register", finalPayload);

      if (res.status === 201 || res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "নিবন্ধন সফল!",
          text: "আপনার অ্যাকাউন্টটি সফলভাবে তৈরি হয়েছে।",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ঠিক আছে",
        }).then(() => {
          router.push("/");
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "দুঃখিত...",
        text:
          err.response?.data?.message ||
          err.message ||
          "রেজিস্ট্রেশন ব্যর্থ হয়েছে",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary/45 shadow-xl group relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/50 via-secondary/30 to-primary/50 opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent rounded-full blur-[60px] animate-pulse" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-warning rounded-full blur-[60px] animate-pulse" />

      <div className="w-11/12 md:w-10/12 grid grid-cols-1 md:grid-cols-12 justify-between items-stretch rounded-4xl bg-base-100/40 backdrop-blur-md shadow-2xl z-10 overflow-hidden border border-white/20">
        {/* Left Side: Banner */}
        <aside className="hidden md:block md:col-span-4 bg-primary/10">
          <RegisterBanner />
        </aside>

        {/* Right Side: Form */}
        <aside className="col-span-1 md:col-span-8 p-6 lg:p-10 overflow-y-auto max-h-[90vh] custom-scrollbar">
          <div className="mb-10">
            <RevealText className="text-2xl lg:text-4xl font-black italic uppercase tracking-tighter bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent py-2">
              সদস্য নিবন্ধন ফরম
            </RevealText>
            <FadeIn>
              <div className="h-1.5 w-20 bg-primary mt-2 rounded-full" />
            </FadeIn>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* Section: Personal Info */}
            <section className="space-y-6">
              <header className="flex items-center gap-2 bg-accent/20 rounded-full py-2 px-4 w-fit">
                <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                <h3 className="font-bold text-sm uppercase tracking-widest text-accent-content">
                  ব্যক্তিগত তথ্য
                </h3>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                  label="ক্যাটাগরি"
                  name="category"
                  icon={<Briefcase size={18} />}
                  options={[
                    { label: "সাধারণ", value: "সাধারণ" },
                    { label: "মালিক", value: "মালিক" },
                    { label: "ম্যানেজার", value: "ম্যানেজার" },
                    { label: "কারিগর", value: "কারিগর" },
                  ]}
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="পুরো নাম"
                  name="name"
                  icon={<User size={18} />}
                  placeholder="যেমন: ওমর ফারুক"
                  register={register}
                  errors={errors}
                  required="আপনার নাম লিখুন"
                />
                <InputField
                  label="পিতার নাম"
                  name="fatherName"
                  icon={<User size={18} />}
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="মাতার নাম"
                  name="motherName"
                  icon={<User size={18} />}
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="NID নম্বর"
                  name="nidNumber"
                  icon={<CreditCard size={18} />}
                  placeholder="আপনার এনআইডি নম্বর"
                  register={register}
                  errors={errors}
                  required="NID নম্বর প্রয়োজন"
                />
                <InputField
                  label="জন্ম তারিখ"
                  name="dob"
                  type="date"
                  icon={<Calendar size={18} />}
                  register={register}
                  errors={errors}
                />
              </div>
            </section>

            {/* Section: Security */}
            <section className="space-y-6">
              <header className="flex items-center gap-2 bg-primary/20 rounded-full py-2 px-4 w-fit">
                <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <h3 className="font-bold text-sm uppercase tracking-widest text-primary-content">
                  পরিচয় ও নিরাপত্তা
                </h3>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="মোবাইল নম্বর"
                  name="mobile"
                  icon={<Phone size={18} />}
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
              </div>
              <InputField
                label="পূর্ণ ঠিকানা"
                name="address"
                icon={<MapPin size={18} />}
                placeholder="গ্রাম, ইউনিয়ন, জেলা"
                register={register}
                errors={errors}
              />
            </section>

            {/* Section: Documents */}
            <section className="space-y-6">
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary/70 flex items-center gap-3">
                <span className="w-8 h-1 bg-primary/30" /> ছবি ও ডকুমেন্ট
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                <div className="md:col-span-5">
                  <ImageUploadField
                    label="প্রোফাইল ছবি"
                    name="image"
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    required
                    heightClass="h-full min-h-[320px]"
                  />
                </div>

                <div className="md:col-span-7 flex flex-col gap-4">
                  <ImageUploadField
                    label="NID সামনের অংশ"
                    name="nidPdfFornt"
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    heightClass="h-[152px]"
                  />
                  <ImageUploadField
                    label="NID পিছনের অংশ"
                    name="nidPdfBackpart"
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    heightClass="h-[152px]"
                  />
                </div>
              </div>
            </section>

            {/* Footer Actions */}
            <footer className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-base-content/10">
              <p className="text-base-content/60 text-sm font-medium">
                আগেই একাউন্ট আছে?{" "}
                <Link
                  href="/login"
                  className="text-primary font-bold hover:underline underline-offset-4"
                >
                  লগইন করুন
                </Link>
              </p>
              <button
                disabled={loading}
                type="submit"
                className={`btn btn-primary btn-lg rounded-2xl px-10 shadow-2xl transition-all duration-300 ${loading ? "opacity-70" : "hover:scale-105 active:scale-95"}`}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  <span className="flex items-center gap-2 italic font-bold">
                    নিবন্ধন সম্পন্ন করুন <CheckCircle size={20} />
                  </span>
                )}
              </button>
            </footer>
          </form>
        </aside>
      </div>
    </div>
  );
}
