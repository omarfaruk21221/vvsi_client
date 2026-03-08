"use client";
import React from "react";
import { motion } from "framer-motion";

const InputField = ({
  label,
  name,
  icon,
  placeholder,
  register,
  errors,
  required = false,
  type = "text",
  className = "", // কাস্টম ক্লাসের জন্য
  labelClass = "",
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`form-control w-full ${className}`}
    >
      {/* Label Section */}
      <label className="label">
        <span
          className={`label-text font-bold text-base-content/70 ${labelClass}`}
        >
          {label} {required && <span className="text-error">*</span>}
        </span>
      </label>

      {/* Input Container */}
      <div className="relative group">
        {/* Icon Section */}
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 group-focus-within:text-primary transition-colors duration-300">
            {React.cloneElement(icon, { size: 18 })}
          </div>
        )}

        {/* Input Field */}
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, { required: required })}
          className={`input input-bordered w-full bg-base-300/50 backdrop-blur-sm rounded-2xl 
            transition-all duration-300 border-base-300
            focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none
            ${icon ? "pl-12" : "pl-5"} 
            ${errors[name] ? "border-error focus:ring-error/10" : "hover:border-primary/50"}
            font-medium placeholder:text-base-content/30`}
          {...props}
        />
      </div>

      {/* Error Message */}
      {errors[name] && (
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-error text-[11px] font-bold mt-1.5 ml-2 flex items-center gap-1"
        >
          <span className="w-1 h-1 rounded-full bg-error animate-pulse" />
          {errors[name]?.message || required}
        </motion.p>
      )}
    </motion.div>
  );
};

export default InputField;
