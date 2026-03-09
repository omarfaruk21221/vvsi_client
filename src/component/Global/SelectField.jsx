"use client";
import React from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const SelectField = ({
  label,
  name,
  options = [], // [{label: 'হকার', value: 'হকার'}]
  icon,
  register,
  defaultValue,
  errors,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`form-control w-full ${className}`}
    >
      <label className="label">
        <span className="label-text font-bold text-base-content/70">
          {label} {required && <span className="text-error">*</span>}
        </span>
      </label>

      <div className="relative group">
        {/* আইকন থাকলে তা বাম পাশে দেখাবে */}
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary z-10 transition-colors duration-300">
            {React.cloneElement(icon, { size: 20 })}
          </div>
        )}

        <select
          defaultValue={{ defaultValue }}
          {...register(name, { required: required })}
          {...props}
          className={`select select-bordered w-full bg-base-200/50 backdrop-blur-sm rounded-2xl 
            transition-all duration-300 border-base-300 appearance-none
            focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none
            ${icon ? "pl-12" : "pl-5"} 
            ${errors[name] ? "border-error" : "hover:border-primary/50"}
            font-medium text-base-content`}
        >
          {options.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* ড্রপডাউন অ্যারো */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-base-content/30 group-focus-within:text-primary transition-colors">
          <ChevronDown size={20} />
        </div>
      </div>

      {/* এরর মেসেজ */}
      {errors[name] && (
        <p className="text-error text-[11px] font-bold mt-1.5 ml-2 italic">
          {errors[name]?.message || "এটি বাছাই করা আবশ্যক"}
        </p>
      )}
    </motion.div>
  );
};

export default SelectField;
