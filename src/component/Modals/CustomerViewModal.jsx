"use client";
import React from "react";
import {
  X,
  User,
  Phone,
  MapPin,
  IdCard,
  Calendar,
  ShieldCheck,
  Zap,
  Crown,
  Fingerprint,
} from "lucide-react";
import Image from "next/image";

/**
 * CustomerViewModal Component
 * UI Features: Glassmorphism, Mesh Gradients, Compact Info Cards
 */
export default function CustomerViewModal({ customer }) {
  if (!customer) return null;

  return (
    <dialog
      id="view_customer_modal"
      className="modal modal-bottom sm:modal-middle backdrop-blur-xl"
    >
      <div className="modal-box w-11/12 max-w-5xl bg-base-100/80 rounded-[3.5rem] p-0 overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] border border-white/20 flex flex-col max-h-[92vh] relative">
        {/* --- Background Mesh Gradients --- */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full z-0 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full z-0 pointer-events-none"></div>

        {/* --- Header Section --- */}
        <div className="relative z-10 shrink-0 px-8 py-5 flex justify-between items-center bg-white/40 backdrop-blur-md border-b border-base-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/30">
              <Crown size={20} />
            </div>
            <h3 className="font-black text-xl uppercase italic tracking-tighter text-base-content leading-none">
              গ্রাহক প্রোফাইল
            </h3>
          </div>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost bg-base-200/50 hover:bg-error hover:text-white transition-all border-none">
              <X size={20} />
            </button>
          </form>
        </div>

        {/* --- Main Content (Scrollable) --- */}
        <div className="relative z-10 overflow-y-auto grow custom-scrollbar p-6 md:p-10">
          {/* Profile Hero Section */}
          <div className="flex flex-col md:flex-row items-center gap-10 mb-10 bg-white/30 p-8 rounded-[3rem] border border-white/40 shadow-sm">
            {/* Image Container with Floating Category */}
            <div className="relative group shrink-0">
              <div className="absolute inset-0 bg-linear-to-tr from-primary to-secondary rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative w-44 h-44 rounded-[3rem] overflow-hidden border-[6px] border-white shadow-2xl bg-base-300">
                <Image
                  width={300}
                  height={300}
                  src={customer.image || "https://i.ibb.co.com/jPvqvwG3"}
                  alt={customer.name}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Floating Category Badge on Image */}
              <div className="absolute -top-3 -right-3 inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary to-secondary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 border-2 border-white z-20 animate-pulse">
                <Zap size={14} fill="currentColor" />
                {customer.category || "Premium User"}
              </div>
            </div>

            {/* Profile Identity Details */}
            <div className="flex-1 text-center md:text-left space-y-4 overflow-hidden pt-2">
              {/* Highlighted ID Capsule */}
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-linear-to-r from-primary to-secondary text-white rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all cursor-default">
                <Fingerprint size={20} className="animate-pulse" />
                <span className="font-black tracking-[0.2em] text-sm uppercase">
                  আইডি: {customer.cust_id}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-base-content uppercase tracking-tighter leading-tight truncate">
                {customer.name}
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                <div className="px-4 py-1.5 bg-success/10 text-success rounded-full text-[10px] font-black uppercase tracking-widest border border-success/10 flex items-center gap-2">
                  <ShieldCheck size={14} /> ভেরিফাইড গ্রাহক
                </div>
              </div>
            </div>
          </div>

          {/* --- Compact Info Cards Grid --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <CompactGlassCard
              icon={Phone}
              label="মোবাইল নম্বর"
              value={customer.mobile}
              gradient="from-blue-500 to-cyan-400"
            />
            <CompactGlassCard
              icon={User}
              label="পিতার নাম"
              value={customer.fatherName}
              gradient="from-violet-500 to-purple-400"
            />
            <CompactGlassCard
              icon={IdCard}
              label="এনআইডি নম্বর"
              value={customer.nidNumber}
              gradient="from-rose-500 to-orange-400"
            />
            <CompactGlassCard
              icon={Calendar}
              label="জন্ম তারিখ"
              value={customer.dob}
              gradient="from-emerald-500 to-teal-400"
            />

            {/* Address Card (Full Width) */}
            <div className="lg:col-span-4 relative group overflow-hidden p-6 rounded-2xl border border-white/40 bg-white/30 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative z-10 flex items-center gap-6">
                <div className="p-4 bg-linear-to-br from-primary to-secondary text-white rounded-2xl shadow-lg shrink-0">
                  <MapPin size={28} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.2em] mb-1">
                    বর্তমান ও স্থায়ী ঠিকানা
                  </p>
                  <p className="text-xl font-bold text-base-content leading-tight truncate italic">
                    {customer.address || "ঠিকানা পাওয়া যায়নি"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Footer Status Bar --- */}
        <div className="relative z-10 p-6 bg-white/60 backdrop-blur-xl border-t border-base-200 shrink-0">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex gap-10">
              <div className="text-center sm:text-left">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">
                  Account Balance
                </p>
                <p className="text-2xl font-black text-primary leading-none">
                  ৳ ১২,৫০০.০০
                </p>
              </div>
              <div className="w-1 h-8 bg-base-300/50 hidden sm:block"></div>
              <div className="text-center sm:text-left">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">
                  Account Status
                </p>
                <p className="text-2xl font-black text-success leading-none flex items-center gap-2">
                  Active <ShieldCheck size={20} />
                </p>
              </div>
            </div>

            <form method="dialog" className="w-full sm:w-auto">
              <button className="btn btn-md w-full sm:px-10 bg-linear-to-r from-primary to-secondary text-base-100 border-none rounded-xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all">
                প্রোফাইল বন্ধ করুন
              </button>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}

/**
 * Compact Info Card Sub-component
 */
function CompactGlassCard({ icon: Icon, label, value, gradient }) {
  return (
    <div className="group relative p-4 rounded-2xl border border-base-300 bg-base-200  backdrop-blur-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex items-center gap-4">
      {/* Side Accent Line */}
      <div
        className={`absolute top-0 left-0 w-1 h-full bg-linear-to-b ${gradient}`}
      ></div>

      {/* Icon Box */}
      <div
        className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center bg-linear-to-br ${gradient} text-white shadow-lg group-hover:scale-110 transition-transform`}
      >
        <Icon size={18} />
      </div>

      {/* Text Data */}
      <div className="overflow-hidden">
        <p className="text-[9px] font-black opacity-40 uppercase tracking-widest mb-0.5 whitespace-nowrap">
          {label}
        </p>
        <p className="text-sm font-bold text-base-content truncate leading-none">
          {value || "N/A"}
        </p>
      </div>
    </div>
  );
}
