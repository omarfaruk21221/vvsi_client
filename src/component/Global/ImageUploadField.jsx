"use client";
import React, { useState, useEffect } from "react";
import { Camera, X, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // ইম্পোর্ট করা হয়েছে
import Image from "next/image";

const ImageUploadField = ({
  label,
  name,
  register,
  errors,
  setValue,
  watch,
  required = false,
  className = "",
  ...props
}) => {
  const [preview, setPreview] = useState(null);
  const fileValue = watch(name);

  // ফাইল সিলেক্ট করলে প্রিভিউ জেনারেট করা
  useEffect(() => {
    if (fileValue && fileValue.length > 0 && typeof fileValue !== "string") {
      const file = fileValue[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (typeof fileValue === "string" && fileValue !== "") {
      setPreview(fileValue);
    } else {
      setPreview(null);
    }
  }, [fileValue]);

  const handleRemove = (e) => {
    e.preventDefault();
    setPreview(null);
    setValue(name, null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`form-control w-full ${className}`}
    >
      <label className="label">
        <span
          className={`label-text font-bold ${preview ? "text-success" : "text-base-content/70"}`}
        >
          {label} {required && <span className="text-error">*</span>}
        </span>
      </label>

      <div className="relative group">
        <AnimatePresence mode="wait">
          {!preview ? (
            <motion.label
              key="upload-box"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`relative flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-[2.5rem] cursor-pointer transition-all duration-300
                ${errors[name] ? "border-error bg-error/5" : "border-base-300 bg-base-100/50 hover:border-primary hover:bg-primary/5"}`}
            >
              <div className="flex flex-col items-center justify-center text-center p-4">
                <div className="p-4 bg-primary/10 rounded-full mb-3 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <Camera className="text-primary" size={28} />
                </div>
                <p className="text-xs font-black text-base-content/50 uppercase tracking-widest">
                  ছবি আপলোড করুন
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                {...register(name, { required: required })}
                {...props}
              />
            </motion.label>
          ) : (
            <motion.div
              key="preview-box"
              initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full h-44 rounded-[2.5rem] overflow-hidden border-2 border-success/30 shadow-2xl shadow-success/5"
            >
              <Image
                width={100}
                height={100}
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />

              {/* Success Badge Animation */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-4 right-4 bg-success text-white p-1.5 rounded-full shadow-lg"
              >
                <CheckCircle size={16} />
              </motion.div>

              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button
                  type="button"
                  onClick={handleRemove}
                  className="btn btn-circle btn-error btn-sm shadow-xl hover:scale-110 transition-transform"
                >
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {errors[name] && (
        <motion.p
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-error text-[11px] font-black mt-2 ml-4 flex items-center gap-1"
        >
          <AlertCircle size={12} /> {errors[name]?.message || "ছবি আবশ্যক"}
        </motion.p>
      )}
    </motion.div>
  );
};

export default ImageUploadField;
