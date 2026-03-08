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
import AddCustomerBannar from "@/component/Bannars/AddCustomerBanner";

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
    <div className="min-h-[90vh]  overflow-hidden">
      <div>
        <AddCustomerBannar />
      </div>
      <div className=" z-10 overflow-hidden">
        {/* from Side: Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-11/12 mx-auto space-y-10 grid grid-cols-1 md:grid-cols-12 justify-between items-start gap-10 mb-10"
        >
          {/* Section: Personal Info */}
          <section className="md:col-span-8 min-h-[100vh]: space-y-6 bg-primary/15 rounded-4xl p-6 md:p-8">
            <header>
              <RevealText className="text-xl lg:text-2xl font-black italic uppercase tracking-tighter bg-linear-to-r from-primary via-secondary to--primary  bg-clip-text text-transparent py-2">
                নিবন্ধন ফরম
              </RevealText>
              <FadeIn>
                <div className="h-1.5 w-20 bg-primary mt-2 rounded-full" />
              </FadeIn>
            </header>

            {/* input fields  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="ক্যাটাগরি"
                name="category"
                icon={<Briefcase size={18} />}
                options={[
                  { label: "সাধারণ", value: "সাধারণ" },
                  { label: "হকার", value: "হকার" },
                  { label: "সেলসম্যান", value: "সেলসম্যান" },
                ]}
                register={register}
                errors={errors}
              />
              <SelectField
                label="বক্সের আবেদন "
                name="boxApplication"
                icon={<Briefcase size={18} />}
                options={[
                  { label: "না", value: "না" },
                  { label: "হ্যা", value: "হ্যা" },
                ]}
                register={register}
                errors={errors}
              />
              <InputField
                label="গ্রাহকের নাম"
                name="name"
                icon={<User size={18} />}
                placeholder="মোঃ ওমর ফারুক"
                register={register}
                errors={errors}
                required="গ্রাহকের নাম লিখুন"
              />

              <InputField
                label="গ্রাহকের পিতার নাম"
                name="fatherName"
                icon={<User size={18} />}
                register={register}
                errors={errors}
                placeholder="পিতার নাম"
              />
              <InputField
                label="গ্রাহকের মাতার নাম"
                name="motherName"
                icon={<User size={18} />}
                register={register}
                errors={errors}
                placeholder={"মাতার নাম"}
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

              <InputField
                label="মোবাইল নম্বর"
                name="mobile"
                icon={<Phone size={18} />}
                placeholder="017XXXXXXXX"
                register={register}
                errors={errors}
                required="মোবাইল নম্বর আবশ্যক"
              />
              <div className="md:col-span-2">
                <InputField
                  label="পূর্ণ ঠিকানা"
                  name="address"
                  icon={<MapPin size={18} />}
                  placeholder="গ্রাম, ইউনিয়ন, জেলা"
                  register={register}
                  errors={errors}
                  className="h-10"
                />
              </div>
            </div>
            <div></div>
          </section>
          {/* Section: Documents */}
          <section className="space-y-2 md:col-span-4 p-6 bg-primary/15 md:p-8 rounded-4xl shadow-xl">
            <header>
              <RevealText className="text-xl lg:text-2xl font-black italic uppercase tracking-tighter bg-linear-to-r from-primary via-secondary to--primary  bg-clip-text text-transparent py-2">
                ছবি আপলোড করুন
              </RevealText>
              <FadeIn>
                <div className="h-1.5 w-20 bg-primary mt-2 rounded-full" />
              </FadeIn>
            </header>
            <ImageUploadField
              label="প্রোফাইল ছবি"
              name="image"
              register={register}
              watch={watch}
              setValue={setValue}
              errors={errors}
              required
              heightClass="h-[200px]"
            />

            <ImageUploadField
              label="NID সামনের অংশ"
              name="nidPdfFornt"
              register={register}
              watch={watch}
              setValue={setValue}
              errors={errors}
              heightClass=""
            />
            <ImageUploadField
              label="NID পিছনের অংশ"
              name="nidPdfBackpart"
              register={register}
              watch={watch}
              setValue={setValue}
              errors={errors}
              heightClass=""
            />
          </section>
        </form>
      </div>
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
    </div>
  );
}
