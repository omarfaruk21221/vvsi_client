"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Users,
  Phone,
  CreditCard,
  MapPin,
  Upload,
  Camera,
  UserPlus,
  Layers,
  IdCardIcon,
} from "lucide-react";
import Image from "next/image";
import { FadeIn } from "@/component/Animations/FadeIn";
import { StaggerContainer } from "@/component/Animations/StaggerContainer";
import { StaggerItem } from "@/component/Animations/StaggerItem";
import { AnimatedButton } from "@/component/Animations/AnimatedBtn";
import axiosInstance from "@/lib/axios";
import Swal from "sweetalert2";
import Link from "next/link";

export default function AddCustomer() {
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      customer_category: "সাধারণ",
    },
  });

  // আইডি জেনারেশন লজিক (১০ এর পর ১১ হওয়ার জন্য)
  const fetchNewId = async () => {
    try {
      const res = await axiosInstance.get("/max_cust_id");
      // res.data সরাসরি নাম্বার বা স্ট্রিং যাই হোক, তাকে ইন্টিজারে রূপান্তর
      const currentMaxId = res.data ? parseInt(res.data, 10) : 0;
      const nextId = currentMaxId + 1;

      setValue("cust_id", String(nextId));
    } catch (error) {
      console.error("Error fetching ID:", error);
      setValue("cust_id", "1"); // এরর হলে ১ দিয়ে শুরু হবে
    }
  };

  useEffect(() => {
    fetchNewId();
  }, [setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("customer_image", file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("category", data.customer_category);
      formData.append("name", data.full_name);
      formData.append("fatherName", data.father_name);
      formData.append("motherName", data.mother_name);
      formData.append("mobile", data.mobile_phone);
      formData.append("dob", data.dob || "");
      formData.append("nidNumber", data.nid_number);
      formData.append("address", data.address);
      formData.append("cust_id", data.cust_id);

      if (data.customer_image) {
        formData.append("customerImage", data.customer_image);
      }
      if (data.nid_upload?.[0]) {
        formData.append("nidFile", data.nid_upload[0]);
      }

      const response = await axiosInstance.post("/add_customers", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "সফল হয়েছে!",
          text: "গ্রাহকের তথ্য সংরক্ষিত হয়েছে।",
          customClass: {
            popup:
              "bg-base-100 text-base-content border border-base-300 rounded-[2rem]",
            title: "text-base-content font-bold",
            confirmButton: "btn btn-primary px-8 rounded-xl",
          },
          buttonsStyling: false,
        });
        reset();
        setImagePreview(null);
        await fetchNewId(); // ফর্ম সেভ হওয়ার পর নতুন আইডি নিয়ে আসা
      }
    } catch (error) {
      // ডুপ্লিকেট ডাটা বা সার্ভার এরর হ্যান্ডেলিং
      Swal.fire({
        icon: "error",
        title: "ব্যর্থ হয়েছে!",
        text: error.response?.data?.message || "সার্ভারে সমস্যা হয়েছে।",
        customClass: {
          popup:
            "bg-base-100 text-base-content border border-base-300 rounded-[2rem]",
          confirmButton: "btn btn-error px-8 rounded-xl",
        },
        buttonsStyling: false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 flex items-center justify-center">
      <FadeIn direction="up" distance={40}>
        <div className="w-full max-w-4xl bg-base-100 border border-base-300 rounded-[2.5rem] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-primary p-8 flex flex-col md:flex-row justify-between items-center gap-4 text-primary-content">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center shadow-lg">
                <UserPlus className="text-secondary-content w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight uppercase">
                  গ্রাহক নিবন্ধন ফরম
                </h2>
                <p className="opacity-80 text-sm font-medium">
                  সঠিক তথ্য দিয়ে ফরমটি পূরণ করুন
                </p>
              </div>
            </div>
            <Link
              className="btn btn-accent btn-sm md:btn-md rounded-xl"
              href="/dashboard/customer-list"
            >
              কাস্টোমারের তালিকা
            </Link>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12">
            <StaggerContainer staggerBy={0.08}>
              {/* Image Upload */}
              <StaggerItem>
                <div className="flex flex-col items-center mb-10">
                  <div className="relative group">
                    <div className="w-40 h-40 rounded-[3rem] bg-base-200 border-2 border-dashed border-base-300 flex items-center justify-center overflow-hidden hover:border-secondary cursor-pointer transition-all">
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer z-20"
                        onChange={handleImageChange}
                      />
                      {imagePreview ? (
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <Camera className="w-8 h-8 text-primary mx-auto mb-1" />
                          <span className="text-[10px] text-base-content/50 font-black uppercase">
                            ছবি দিন
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </StaggerItem>

              {/* Input Fields Grid */}
              <StaggerItem>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                  <InputField
                    icon={<IdCardIcon />}
                    label="আইডি নম্বর"
                    name="cust_id"
                    register={register}
                    errors={errors}
                    readOnly={true}
                    className="bg-base-300/50 cursor-not-allowed"
                  />

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-base-content/60 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Layers size={14} className="text-secondary" /> গ্রাহক
                      ক্যাটাগরি
                    </label>
                    <select
                      {...register("customer_category", {
                        required: "ক্যাটাগরি আবশ্যক",
                      })}
                      className="select select-bordered w-full bg-base-200 border-2 border-base-300 rounded-[1.2rem] focus:border-secondary font-bold"
                    >
                      <option value="সাধারণ">সাধারণ</option>
                      <option value="হকার">হকার</option>
                      <option value="সেলসম্যান">সেলসম্যান</option>
                    </select>
                  </div>

                  <InputField
                    icon={<User />}
                    label="গ্রাহকের নাম"
                    name="full_name"
                    placeholder="নাম লিখুন"
                    register={register}
                    errors={errors}
                    required="নাম আবশ্যক"
                  />

                  <InputField
                    icon={<Phone />}
                    label="মোবাইল নম্বর"
                    name="mobile_phone"
                    placeholder="01xxxxxxxxx"
                    register={register}
                    errors={errors}
                    required="মোবাইল নম্বর দিন"
                    pattern={{
                      value: /^[0-9]{11}$/,
                      message: "সঠিক ১১ ডিজিটের নম্বর দিন",
                    }}
                  />

                  <InputField
                    icon={<Users />}
                    label="পিতার নাম"
                    name="father_name"
                    placeholder="পিতার নাম"
                    register={register}
                    errors={errors}
                    required="পিতার নাম দিন"
                  />

                  <InputField
                    icon={<CreditCard />}
                    label="NID নম্বর"
                    name="nid_number"
                    placeholder="ন্যাশনাল আইডি"
                    register={register}
                    errors={errors}
                    required="NID নম্বর দিন"
                  />
                </div>
              </StaggerItem>

              {/* Address */}
              <StaggerItem>
                <div className="mb-8">
                  <label className="text-[10px] font-black text-base-content/60 uppercase tracking-widest ml-1 mb-2 block flex items-center gap-2">
                    <MapPin size={14} className="text-secondary" /> ঠিকানা
                  </label>
                  <textarea
                    {...register("address", { required: "ঠিকানা আবশ্যক" })}
                    className="textarea textarea-bordered w-full bg-base-200 border-2 border-base-300 rounded-[1.5rem] focus:border-secondary min-h-[80px]"
                    placeholder="সম্পূর্ণ ঠিকানা লিখুন..."
                  />
                  {errors.address && (
                    <p className="text-error text-[10px] font-bold mt-1 ml-2">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </StaggerItem>

              {/* Action Buttons */}
              <StaggerItem>
                <div className="flex flex-col md:flex-row gap-6 items-end">
                  <div className="flex-1 w-full">
                    <label className="text-[10px] font-black text-base-content/60 uppercase ml-1 mb-2 block flex items-center gap-2 text-secondary">
                      <Upload size={14} /> NID আপলোড (ঐচ্ছিক)
                    </label>
                    <input
                      type="file"
                      {...register("nid_upload")}
                      className="file-input file-input-bordered file-input-secondary w-full bg-base-200 rounded-xl"
                    />
                  </div>
                  <AnimatedButton
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full md:w-auto md:px-12 h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl"
                  >
                    {isSubmitting ? "সংরক্ষণ হচ্ছে..." : "তথ্য সেভ করুন"}
                  </AnimatedButton>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </form>
        </div>
      </FadeIn>
    </div>
  );
}

// Input Component
function InputField({
  icon,
  label,
  name,
  type = "text",
  placeholder,
  register,
  errors,
  required,
  readOnly,
  className,
  pattern,
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-base-content/60 uppercase tracking-widest ml-1 flex items-center gap-2">
        {React.cloneElement(icon, { size: 14, className: "text-secondary" })}{" "}
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          {...register(name, { required, pattern })}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`input input-bordered w-full bg-base-200 border-2 ${
            errors[name] ? "border-error" : "border-base-300"
          } rounded-[1.2rem] focus:bg-base-100 focus:border-secondary transition-all text-sm font-bold ${className}`}
        />
        {errors[name] && (
          <p className="text-error text-[10px] mt-1 font-bold ml-2">
            {errors[name].message}
          </p>
        )}
      </div>
    </div>
  );
}
