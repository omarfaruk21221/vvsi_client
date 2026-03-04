"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Phone,
  MapPin,
  Camera,
  Layers,
  IdCard,
  Save,
  Image as ImageIcon,
  Info,
  Hash,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import Swal from "sweetalert2";
import AddCustomerBanner from "@/component/Dashboard/AddCustomerBanner";
import { FadeIn } from "@/component/Animations/FadeIn";

export default function AddCustomer() {
  const [previews, setPreviews] = useState({
    profile: null,
    front: null,
    back: null,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: { customer_category: "সাধারণ" },
  });

  const fetchNewId = async () => {
    try {
      const res = await axiosInstance.get("/max_cust_id");
      setValue("cust_id", String((res.data ? parseInt(res.data, 10) : 0) + 1));
    } catch (error) {
      setValue("cust_id", "1");
    }
  };

  useEffect(() => {
    fetchNewId();
  }, [setValue]);

  const handleFile = (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [type]: reader.result }));
        const fieldMap = {
          profile: "customer_image",
          front: "nid_front",
          back: "nid_back",
        };
        setValue(fieldMap[type], file);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    // ১. ইমেজ আপলোড করার হেল্পার ফাংশন
    const uploadToImgBB = async (file) => {
      if (!file || !(file instanceof File)) return ""; // ফাইল না থাকলে খালি স্ট্রিং দেবে

      const formData = new FormData();
      formData.append("image", file);

      try {
        // আপনার .env.local ফাইলে NEXT_PUBLIC_IMGBB_API_KEY=3ac01831eeaad4edcbe2e6f25d124043 সেট করুন
        const apiKey =
          process.env.NEXT_PUBLIC_IMGBB_API_KEY ||
          "3ac01831eeaad4edcbe2e6f25d124043";

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: formData,
          },
        );

        const result = await response.json();
        if (result.success) {
          return result.data.url; // ইমেজের সরাসরি অনলাইন লিঙ্ক
        } else {
          throw new Error("ImgBB upload failed");
        }
      } catch (error) {
        console.error("Image Upload Error:", error);
        return "";
      }
    };

    try {
      // লোডিং স্টেট দেখানো (SweetAlert2)
      Swal.fire({
        title: "অপেক্ষা করুন...",
        text: "তথ্য ও ছবি আপলোড হচ্ছে",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // ২. প্যারালালভাবে ৩টি ইমেজই আপলোড করা (সময় বাঁচানোর জন্য)
      const [profileUrl, nidFrontUrl, nidBackUrl] = await Promise.all([
        uploadToImgBB(data.customer_image),
        uploadToImgBB(data.nid_front),
        uploadToImgBB(data.nid_back),
      ]);

      // ৩. ব্যাকএন্ডের রিকোয়ারমেন্ট অনুযায়ী ডাটা অবজেক্ট তৈরি
      const finalPayload = {
        category: data.customer_category,
        name: data.full_name,
        fatherName: data.father_name,
        motherName: data.mother_name,
        mobile: data.mobile_phone,
        dob: data.dob || "",
        nidNumber: data.nid_number,
        address: data.address,
        image: profileUrl, // ImgBB Profile Link
        nid_front: nidFrontUrl, // ImgBB NID Front Link
        nid_back: nidBackUrl, // ImgBB NID Back Link
        cust_id: Number(data.cust_id),
      };

      // ৪. আপনার এক্সপ্রেস ব্যাকএন্ডে JSON ডাটা পাঠানো
      const res = await axiosInstance.post("/add_customers", finalPayload);

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "সফল!",
          text: "নতুন গ্রাহক সফলভাবে নিবন্ধিত হয়েছে।",
          confirmButtonColor: "var(--p)",
        });

        // ফরম রিসেট এবং প্রিভিউ ক্লিয়ার করা
        reset();
        setPreviews({ profile: null, front: null, back: null });
        fetchNewId(); // পরবর্তী আইডির জন্য
      }
    } catch (error) {
      console.error("Submission Error:", error);
      Swal.fire({
        icon: "error",
        title: "ব্যর্থ",
        text:
          error.response?.data?.message ||
          "সার্ভারে ডাটা পাঠানো যায়নি। আবার চেষ্টা করুন।",
      });
    }
  };

  return (
    <FadeIn>
      <div className="min-h-screen py-8 px-4">
        <AddCustomerBanner></AddCustomerBanner>
        <div className="max-w-11/12 mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            {/* --- Left Side: Main Form (Col-8) --- */}
            <div className="lg:col-span-8 space-y-6">
              <div className="card bg-base-100 shadow-sm border border-base-300 rounded-3xl p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {/* Section: Header & ID */}
                  <div className="md:col-span-2 flex justify-between items-center border-b border-base-200 pb-4 mb-2">
                    <h2 className="text-xl font-black flex items-center gap-2 text-base-content">
                      <User className="text-primary" size={34} /> নতুন গ্রাহক
                      তথ্য
                    </h2>
                    <div className="flex items-center gap-2 bg-warning px-4 py-2 rounded-xl border border-primary/20 cursor-pointer">
                      <Hash size={14} className="text-primary" />
                      <span className="text-sm font-black text-primary uppercase">
                        আইডি:{" "}
                      </span>
                      <input
                        {...register("cust_id")}
                        className="bg-transparent border-none w-12 text-xs font-black text-primary focus:outline-none"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2  border-t border-base-200">
                    <p className="bg-secondary/20 py-2 text-center rounded-2xl text-md uppercase text-secondary font-bold tracking-[0.2rem]">
                      বাক্তিগত তথ্য
                    </p>
                  </div>

                  {/* Compact Fields */}
                  <InputField
                    label="গ্রাহকের নাম"
                    name="full_name"
                    icon={<User />}
                    placeholder="নাম লিখুন"
                    register={register}
                    errors={errors}
                    required="নাম আবশ্যক"
                  />

                  <div className="form-control w-full">
                    <label className="label py-1 font-bold text-xs text-primary/75 uppercase tracking-wider">
                      ক্যাটাগরি
                    </label>
                    <select
                      {...register("customer_category")}
                      className="select select-sm select-bordered bg-primary/10 border-none rounded-xl h-11 font-bold focus:ring-2 ring-primary/20"
                    >
                      <option>সাধারণ</option>
                      <option>হকার</option>
                      <option>সেলসম্যান</option>
                    </select>
                  </div>

                  <InputField
                    label="মোবাইল নম্বর"
                    name="mobile_phone"
                    icon={<Phone />}
                    placeholder="০১XXXXXXXXX"
                    register={register}
                    errors={errors}
                    required="নম্বর দিন"
                  />
                  <InputField
                    label="এনআইডি নম্বর"
                    name="nid_number"
                    icon={<IdCard />}
                    placeholder="NID নম্বর"
                    register={register}
                    errors={errors}
                    required="NID দিন"
                  />

                  <div className="md:col-span-2  border-t border-base-200">
                    <p className="bg-secondary/20 py-2 text-center rounded-2xl text-md uppercase text-secondary font-bold tracking-[0.2rem]">
                      পারিবারিক তথ্য ও ঠিকানা
                    </p>
                  </div>

                  <InputField
                    label="পিতার নাম"
                    name="father_name"
                    placeholder="পিতার নাম"
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="মাতার নাম"
                    name="mother_name"
                    placeholder="মাতার নাম"
                    register={register}
                    errors={errors}
                  />

                  <div className=" form-control">
                    <label className="label py-1 font-bold text-xs text-primary/75 uppercase  tracking-wider ">
                      বর্তমান ঠিকানা
                    </label>
                    <br />
                    <textarea
                      {...register("address", { required: "ঠিকানা আবশ্যক" })}
                      className="textarea textarea-sm bg-primary/10 border-none rounded-xl min-h-15 v font-bold p-4 focus:ring-2 ring-primary/20"
                      placeholder="পূর্ণ ঠিকানা..."
                    ></textarea>
                  </div>
                </div>
              </div>

              <button
                disabled={isSubmitting}
                className="btn btn-primary w-full h-14 rounded-2xl shadow-lg shadow-primary/20 font-black uppercase tracking-widest border-none"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save size={18} /> তথ্য সংরক্ষণ করুন
                  </span>
                )}
              </button>
            </div>

            {/* --- Right Side: Image Uploads (Col-4) --- */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
              <div className="card bg-base-100 shadow-sm border border-base-300 rounded-3xl p-6">
                <p className="text-[11px] font-black uppercase tracking-widest text-center opacity-40 mb-6">
                  প্রোফাইল ও নথিপত্র
                </p>

                {/* Profile Photo */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-36 h-36 group">
                    <div className="w-full h-full rounded-[2.5rem] bg-base-200 border-2 border-dashed border-base-300 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-primary">
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
                        <div className="text-center opacity-30">
                          <Camera size={28} className="mx-auto mb-1" />
                          <span className="text-[9px] font-black uppercase">
                            ছবি দিন
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* NID Grid */}
                <div className="grid grid-cols-1 gap-4 pt-6 border-t border-base-200">
                  <NIDUpload
                    preview={previews.front}
                    label="NID সামনের অংশ"
                    onChange={(e) => handleFile(e, "front")}
                  />
                  <NIDUpload
                    preview={previews.back}
                    label="NID পিছনের অংশ"
                    onChange={(e) => handleFile(e, "back")}
                  />
                </div>

                <div className="mt-6 flex items-start gap-3 p-4 bg-info/5 rounded-2xl border border-info/10 opacity-80">
                  <Info size={18} className="text-info mt-0.5" />
                  <p className="text-xs font-bold text-info leading-tight italic">
                    স্পষ্ট ছবি আপলোড করা বাধ্যতামূলক।
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </FadeIn>
  );
}

// --- Internal Small Components ---

function InputField({
  label,
  icon,
  name,
  register,
  errors,
  required,
  placeholder,
}) {
  return (
    <div className="form-control w-full">
      <label className="label py-1 font-bold text-xs text-primary/75 uppercase  tracking-wider flex items-center gap-1">
        {icon && React.cloneElement(icon, { size: 12 })} {label}
      </label>
      <input
        {...register(name, { required })}
        placeholder={placeholder}
        className={`input input-sm bg-primary/10 border-none rounded-xl h-11 font-bold focus:ring-2 ring-primary/20 transition-all ${
          errors[name] ? "ring-error/30" : ""
        }`}
      />
      {errors[name] && (
        <span className="text-[9px] text-error font-bold mt-1 px-1 tracking-wide uppercase italic leading-none">
          ! {errors[name].message}
        </span>
      )}
    </div>
  );
}

function NIDUpload({ preview, label, onChange }) {
  return (
    <div className="relative h-24 bg-base-200/50 rounded-2xl border-2 border-dashed border-base-300 flex items-center justify-center overflow-hidden hover:border-primary transition-all group">
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 z-20 cursor-pointer"
        onChange={onChange}
      />
      {preview ? (
        <Image src={preview} alt="NID" fill className="object-cover" />
      ) : (
        <div className="text-center opacity-30 group-hover:opacity-60 transition-opacity">
          <ImageIcon size={18} className="mx-auto" />
          <span className="text-[8px] font-black uppercase tracking-widest mt-1 block">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
