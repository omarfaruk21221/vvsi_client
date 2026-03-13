"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import {
  User,
  Phone,
  CheckCircle,
  MapPin,
  CreditCard,
  Calendar,
  Briefcase,
  Fingerprint,
} from "lucide-react";
import ImageUploadField from "@/component/Global/ImageUploadField";
import InputField from "@/component/Global/InputField";
import SelectField from "@/component/Global/SelectField";
import { RevealText } from "@/component/Animations/RevealText";
import { FadeIn } from "@/component/Animations/FadeIn";
import Swal from "sweetalert2";
import AddCustomerBannar from "@/component/Bannars/AddCustomerBanner";

export default function AddCutomerPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "সাধারণ",
      status: "",
      boxApplication: "না",
      cust_id: "",
    },
  });

  const fetchAndSetId = async () => {
    try {
      const res = await axiosInstance.get("/max_cust_id");
      const maxId = parseInt(res.data) || 0;
      setValue("cust_id", maxId + 1);
    } catch (err) {
      console.error("ID Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchAndSetId();
  }, []);

  const uploadToImgBB = async (fileList) => {
    if (!fileList || !fileList[0]) return "";
    try {
      const imgFormData = new FormData();
      imgFormData.append("image", fileList[0]);
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: imgFormData,
        },
      );
      const result = await response.json();
      return result.success ? result.data.url : "";
    } catch (error) {
      return "";
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    Swal.fire({
      title: "তথ্য যাচাই করা হচ্ছে...",
      html: "অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // ১. ছবিগুলো আপলোড করা
      const [profileUrl, nidFrontUrl, nidBackUrl] = await Promise.all([
        uploadToImgBB(data.image),
        uploadToImgBB(data.nidPdfFornt),
        uploadToImgBB(data.nidPdfBackpart),
      ]);

      // ২. আপনার ব্যাকএন্ড মডেল অনুযায়ী Nested Payload তৈরি
      const payload = {
        cust_id: Number(data.cust_id),
        name: data.name,
        mobile: data.mobile,
        boxApplication: data.boxApplication,
        role: data.category, // ক্যাটাগরিকে রোল হিসেবে পাঠানো হচ্ছে
        status: "Active",
        details: {
          fatherName: data.fatherName || "",
          motherName: data.motherName || "",
          dob: data.dob || "",
          address: data.address || "",
          image: profileUrl,
          nidNumber: data.nidNumber || "",
          nidPdfFornt: nidFrontUrl,
          nidPdfBackpart: nidBackUrl,
        },
      };

      const res = await axiosInstance.post("/add_customers", payload);

      if (res.status === 201 || res.status === 200) {
        Swal.fire({
          icon: "success",
          title: `<span style="color: #10b981">নিবন্ধন সফল হয়েছে!</span>`,
          html: `গ্রাহক <b>${data.name}</b> এর আইডি: #${data.cust_id}`,
          confirmButtonColor: "#3b82f6",
        }).then(() => {
          reset();
          fetchAndSetId();
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "ব্যর্থ হয়েছে",
        text: err.response?.data?.message || "সার্ভারে সমস্যা হয়েছে",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] overflow-hidden bg-base-100">
      <AddCustomerBannar />
      <div className="z-10 overflow-hidden mb-10">
        <FadeIn>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-11/12 mx-auto space-y-10 grid grid-cols-1 md:grid-cols-12 justify-between items-start gap-10"
          >
            {/* Left Side: Form Fields */}
            <section className="min-h-[90vh] md:col-span-8 space-y-6 bg-primary/15 backdrop-blur-md rounded-4xl p-6 md:p-8 border border-primary/10 shadow-xl relative">
              <div className="absolute top-6 right-6 bg-primary/10 px-6 py-3 rounded-2xl border border-primary/20 flex items-center gap-3 select-none pointer-events-none">
                <Fingerprint className="text-primary animate-pulse" size={24} />
                <div>
                  <p className="text-sm uppercase font-bold text-primary/70 leading-none">
                    গ্রাহকের আইডি
                  </p>
                  <input
                    {...register("cust_id")}
                    readOnly
                    tabIndex="-1"
                    className="bg-transparent border-none p-0 m-0 font-black text-xl text-primary outline-none w-16"
                  />
                </div>
              </div>

              <header>
                <RevealText className="text-xl lg:text-2xl font-black italic uppercase tracking-tighter bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent py-2">
                  নিবন্ধন ফরম
                </RevealText>
                <div className="h-1 w-25 bg-primary mt-2 rounded-full" />
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-primary p-2">
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
                  label="বক্সের আবেদন"
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
                  placeholder="মাতার নাম"
                />
                <InputField
                  label="NID নম্বর"
                  name="nidNumber"
                  icon={<CreditCard size={18} />}
                  placeholder="আপনার এনআইডি নম্বর"
                  register={register}
                  errors={errors}
                  required="NID নম্বর প্রয়োজন"
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
                    placeholder="গ্রাম, ইউনিয়ন, জেলা"
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  disabled={loading}
                  type="submit"
                  className={`w-full btn btn-primary btn-lg rounded-2xl shadow-2xl transition-all duration-300 font-bold italic flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105 active:scale-95 text-base-100"}`}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    <>
                      নিবন্ধন সম্পন্ন করুন <CheckCircle size={20} />
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* Right Side: Uploads */}
            <section className="min-h-[90vh] space-y-4 md:col-span-4 p-6 bg-primary/15 md:p-8 rounded-4xl shadow-xl border border-primary/10">
              <header>
                <RevealText className="text-xl lg:text-2xl font-black italic uppercase tracking-tighter bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent py-2">
                  ছবি আপলোড করুন
                </RevealText>
                <div className="h-1.5 w-20 bg-primary mt-2 rounded-full" />
              </header>

              <div className="space-y-4">
                <ImageUploadField
                  label="প্রোফাইল ছবি"
                  name="image"
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  required
                  heightClass="h-[180px] rounded-2xl"
                />
                <ImageUploadField
                  label="NID সামনের অংশ"
                  name="nidPdfFornt"
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  heightClass="h-[100px] rounded-xl"
                />
                <ImageUploadField
                  label="NID পিছনের অংশ"
                  name="nidPdfBackpart"
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  heightClass="h-[100px] rounded-xl"
                />
              </div>
            </section>
          </form>
        </FadeIn>
      </div>
    </div>
  );
}
