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
  Info,
  ShieldCheck,
  Camera,
} from "lucide-react";
import Image from "next/image";
import InputField from "@/component/Global/InputField";
import SelectField from "@/component/Global/SelectField";

export default function RegisterPage() {
  const [previews, setPreviews] = useState({
    profile: null,
    front: null,
    back: null,
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { category: "হকার", status: "Pendding" },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ইমেজ প্রিভিউ হ্যান্ডেলার (আপনার AddCustomer স্টাইলে)
  const handleFile = (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [type]: reader.result }));
        const fieldMap = {
          profile: "image",
          front: "nidPdfFornt",
          back: "nidPdfBackpart",
        };
        setValue(fieldMap[type], e.target.files); // সরাসরি ফাইল অবজেক্ট সেট করা
      };
      reader.readAsDataURL(file);
    }
  };

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
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-4 lg:p-12 selection:bg-primary selection:text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl w-full bg-base-100 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col lg:flex-row border border-base-200"
      >
        {/* বাম পাশ: ব্র্যান্ডিং (প্রফেশনাল লুক) */}
        <div className="lg:w-4/12 bg-primary p-12 flex flex-col justify-between text-primary-content relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

          <div className="relative z-10 text-center lg:text-left">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl mb-8 mx-auto lg:mx-0">
              🍦
            </div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
              Bhai Bhai <br /> <span className="text-white/70">Super</span>
            </h1>
            <p className="mt-6 text-sm font-bold opacity-80 leading-relaxed italic">
              ফ্যাক্টরি ম্যানেজমেন্ট ইকোসিস্টেমে স্বাগতম। সঠিক তথ্য প্রদান করে
              আপনার সদস্যপদ নিশ্চিত করুন।
            </p>
          </div>

          <div className="relative z-10 mt-10">
            <div className="flex items-center gap-3 bg-black/10 p-4 rounded-2xl border border-white/10">
              <ShieldCheck size={20} className="text-white" />
              <p className="text-[11px] font-bold uppercase tracking-wider italic">
                Trusted Identity Verification
              </p>
            </div>
          </div>
        </div>

        {/* ডান পাশ: মেইন ফরম (AddCustomer ইন্সপায়ার্ড) */}
        <div className="lg:w-8/12 p-8 lg:p-12 max-h-[90vh] overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center border-b border-base-200 pb-6 mb-8">
            <div>
              <h2 className="text-2xl font-black text-base-content italic uppercase tracking-tight">
                সদস্য নিবন্ধন
              </h2>
              <p className="text-[10px] font-black text-primary/50 uppercase tracking-[0.3em] mt-1">
                Registration Form
              </p>
            </div>
            <div className="bg-primary/10 px-4 py-2 rounded-xl border border-primary/20">
              <span className="text-xs font-black text-primary italic uppercase tracking-widest">
                New Member
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* প্রোফাইল ইমেজ সেকশন */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative w-32 h-32 group">
                <div className="w-full h-full rounded-[2rem] bg-primary/5 border-2 border-dashed border-primary/20 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-primary group-hover:bg-primary/10">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 z-20 cursor-pointer"
                    onChange={(e) => handleFile(e, "profile")}
                  />
                  {previews.profile ? (
                    <Image
                      src={previews.profile}
                      alt="P"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-center opacity-40 group-hover:opacity-100 transition-opacity">
                      <Camera size={24} className="mx-auto mb-1 text-primary" />
                      <span className="text-[9px] font-black uppercase text-primary">
                        ছবি দিন
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {errors.image && (
                <p className="text-error text-[10px] font-bold mt-2 uppercase italic">
                  ! ছবি আপলোড করুন
                </p>
              )}
            </div>

            {/* ব্যক্তিগত তথ্য গ্রিড */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
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
                placeholder="নাম লিখুন"
                register={register}
                errors={errors}
                required="নাম আবশ্যক"
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
                placeholder="০১XXXXXXXXX"
                register={register}
                errors={errors}
                required="মোবাইল আবশ্যক"
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

            {/* পরিচয় ও এনআইডি তথ্য */}
            <div className="space-y-6">
              <p className="bg-secondary/10 py-2.5 text-center rounded-2xl text-[11px] uppercase text-secondary font-black tracking-[0.25rem] border border-secondary/10">
                পরিচয় ও এনআইডি তথ্য
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <InputField
                  label="NID নম্বর"
                  name="nidNumber"
                  icon={<CreditCard />}
                  placeholder="এনআইডি নম্বর"
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
            </div>

            {/* এনআইডি ডকুমেন্ট আপলোড (AddCustomer স্টাইলে) */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 px-1">
                <Info size={14} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-base-content/40">
                  এনআইডি কপি আপলোড
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NIDPreviewBox
                  preview={previews.front}
                  label="সামনের অংশ"
                  onChange={(e) => handleFile(e, "front")}
                />
                <NIDPreviewBox
                  preview={previews.back}
                  label="পিছনের অংশ"
                  onChange={(e) => handleFile(e, "back")}
                />
              </div>
            </div>

            <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-6 border-t border-base-200">
              <p className="text-sm font-bold text-base-content/50">
                আগেই একাউন্ট আছে?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:underline italic font-black ml-1"
                >
                  লগইন করুন
                </Link>
              </p>
              <button
                disabled={loading}
                className="btn btn-primary w-full lg:w-auto px-10 h-16 rounded-2xl shadow-xl shadow-primary/20 font-black italic text-lg uppercase tracking-tighter"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <span className="flex items-center gap-2">
                    নিবন্ধন সম্পন্ন করুন <CheckCircle size={22} />
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// এনআইডি আপলোড বক্স কম্পোনেন্ট (AddCustomer থেকে এনস্পায়ারড)
function NIDPreviewBox({ preview, label, onChange }) {
  return (
    <div className="relative h-32 bg-primary/5 rounded-2xl border-2 border-dashed border-primary/20 flex items-center justify-center overflow-hidden hover:border-primary transition-all group">
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 z-20 cursor-pointer"
        onChange={onChange}
      />
      {preview ? (
        <Image src={preview} alt="NID" fill className="object-cover" />
      ) : (
        <div className="text-center opacity-30 group-hover:opacity-100 transition-opacity">
          <Camera size={20} className="mx-auto text-primary" />
          <span className="text-[9px] font-black uppercase tracking-widest mt-2 block text-primary">
            NID {label}
          </span>
        </div>
      )}
    </div>
  );
}
