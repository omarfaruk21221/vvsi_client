"use client";
import { useState, useCallback } from "react";
import axiosInstance from "./axios";
import { toast } from "react-toastify";

export default function useCustomerForm() {
  const [formData, setFormData] = useState({
    আইডি: "",
    নাম: "",
    ঠিকানা: "",
    ফোন: "",
    মোবাইল_নম্বর: "",
    গ্রাহক_ধরন: "General",
    ছবি: null,
    নিডপিডিএফ: null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: e.target.files[0] }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.নাম) newErrors.নাম = "নাম প্রয়োজন";
    if (!formData.মোবাইল_নম্বর)
      newErrors.মোবাইল_নম্বর = "মোবাইল নম্বর প্রয়োজন";
    if (!formData.ছবি) newErrors.ছবি = "ছবি প্রয়োজন";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const data = new FormData();
    console.log(data);
    // ডাটা অ্যাপেন্ড করা
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axiosInstance.post("/customers/add", data);
      if (response.status === 201) {
        toast.success("গ্রাহক সফলভাবে ডাটাবেসে সেভ হয়েছে!");
        console.log("✅ সফল প্রতিক্রিয়া:", response.data);
        resetForm();
        return true;
      }
    } catch (error) {
      console.error("❌ এরর বিস্তারিত:", error);

      // 404 Error - Endpoint না থাকলে
      if (error.response?.status === 404) {
        toast.error(
          "⚠️ সার্ভার এন্ডপয়েন্ট পাওয়া যায়নি। ব্যাকএন্ড সেটআপ চেক করুন।",
        );
        console.warn(
          "🔴 404 Error: /customers/add endpoint পাওয়া যায়নি\nসার্ভারে এই এন্ডপয়েন্ট তৈরি করুন বা axios baseURL চেক করুন।",
        );
      }
      // 500 Error - সার্ভার এরর
      else if (error.response?.status === 500) {
        toast.error("সার্ভার ত্রুটি (500)। দয়া করে পরে চেষ্টা করুন।");
        console.error("🔴 500 Error:", error.response.data);
      }
      // 400 Error - খারাপ রিকোয়েস্ট
      else if (error.response?.status === 400) {
        toast.error(
          error.response.data?.message || "অনুগ্রহ করে সঠিক তথ্য পূরণ করুন।",
        );
        console.error("🔴 400 Error:", error.response.data);
      }
      // নেটওয়ার্ক এরর
      else if (error.code === "ERR_NETWORK") {
        toast.error(
          "🌐 নেটওয়ার্ক সংযোগ ব্যর্থ। সার্ভার চালু আছে কিনা চেক করুন।",
        );
        console.error("🔴 নেটওয়ার্ক Error:", {
          baseURL: "http://localhost:5000",
          endpoint: "/customers/add",
          message: error.message,
        });
      }
      // Timeout
      else if (error.code === "ECONNABORTED") {
        toast.error("⏱️ অনুরোধ সময়সীমা অতিক্রম করেছে। পরে চেষ্টা করুন।");
      }
      // অন্যান্য এরর
      else {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "সার্ভারে সমস্যা হয়েছে",
        );
        console.error("🔴 অন্যান্য Error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      আইডি: "",
      নাম: "",
      ঠিকানা: "",
      ফোন: "",
      মোবাইল_নম্বর: "",
      গ্রাহক_ধরন: "General",
      ছবি: null,
      নিডপিডিএফ: null,
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    resetForm,
  };
}
