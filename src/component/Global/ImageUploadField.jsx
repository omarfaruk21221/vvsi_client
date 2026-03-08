"use client";
import React, { useState, useEffect } from "react";
import { Camera, X, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ImageUploadField = ({
  label,
  name,
  register,
  errors,
  setValue,
  width,
  height,
  watch,
  placeholder,
  required = false,
  className = "",
  heightClass = "",
  ...props
}) => {
  const [preview, setPreview] = useState(null);
  const fileValue = watch(name);

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
      className={`form-control ${className}`}
    >
      {label && (
        <label className="label">
          <span
            className={`label-text font-bold italic uppercase tracking-wider text-[11px] ${preview ? "text-success" : "text-base-content/70"}`}
          >
            {label} {required && <span className="text-error">*</span>}
          </span>
        </label>
      )}

      <div className="relative group h-full">
        <AnimatePresence mode="wait">
          {!preview ? (
            <motion.label
              key="upload-box"
              className={`relative flex flex-col items-center justify-center w-full ${heightClass} border-2 border-dashed rounded-[2.5rem] cursor-pointer transition-all duration-300
                ${errors[name] ? "border-error bg-error/5" : "border-base-300 bg-base-100/50 hover:border-primary hover:bg-primary/5"}`}
            >
              <div className="flex flex-col items-center justify-center text-center p-4">
                <div className="p-4 bg-primary/10 rounded-full mb-3 group-hover:scale-110 transition-all">
                  <Camera className="text-primary" size={28} />
                </div>
                <p className="text-[10px] font-black text-base-content/50 uppercase tracking-[0.2em]">
                  {placeholder || "ছবি আপলোড"}
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                {...register(name, { required })}
                {...props}
              />
            </motion.label>
          ) : (
            <motion.div
              key="preview-box"
              className={`relative w-full ${heightClass} rounded-[2.5rem] overflow-hidden border-2 border-success/30 shadow-xl`}
            >
              <Image
                width={width || 500}
                height={height || 500}
                src={preview}
                alt="Preview"
                className="w-full h-full  object-fill"
              />
              <div className="absolute top-4 right-4 bg-success text-white p-1.5 rounded-full z-10">
                <CheckCircle size={14} />
              </div>
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={handleRemove}
                  className="btn btn-circle btn-error btn-sm shadow-xl"
                >
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ImageUploadField;
