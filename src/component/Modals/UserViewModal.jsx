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
  FileText,
} from "lucide-react";
import Image from "next/image";

/**
 * UserViewModal Component
 * UI Features: Theme-based Colors, Glassmorphism, NID Preview
 */
export default function UserViewModal({ user }) {
  if (!user) return null;

  return (
    <dialog
      id="view_customer_modal"
      className="modal modal-bottom sm:modal-middle backdrop-blur-md"
    >
      <div className="modal-box w-11/12 max-w-5xl bg-base-100 rounded-[3rem] p-0 overflow-hidden shadow-2xl border border-base-300 flex flex-col max-h-[92vh] relative">
        {/* --- Background Theme Accents --- */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[100px] rounded-full z-0 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[100px] rounded-full z-0 pointer-events-none"></div>

        {/* --- Header Section --- */}
        <div className="relative z-10 shrink-0 px-8 py-5 flex justify-between items-center bg-base-100/60 backdrop-blur-md border-b border-base-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-content shadow-lg shadow-primary/20">
              <Crown size={20} />
            </div>
            <h3 className="font-black text-xl uppercase italic tracking-tighter text-base-content">
              ইউজার প্রোফাইল
            </h3>
          </div>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost hover:bg-error hover:text-error-content transition-all">
              <X size={20} />
            </button>
          </form>
        </div>

        {/* --- Main Content --- */}
        <div className="relative z-10 overflow-y-auto grow custom-scrollbar p-6 md:p-10">
          {/* User Hero Section */}
          <div className="flex flex-col md:flex-row items-center gap-10 mb-10 bg-base-200/50 p-8 rounded-[2.5rem] border border-base-300 shadow-sm">
            <div className="relative group shrink-0">
              <div className="absolute inset-0 bg-primary rounded-[2.5rem] blur-xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative w-44 h-44 rounded-[2.5rem] overflow-hidden border-[6px] border-base-100 shadow-xl bg-base-300">
                <Image
                  width={300}
                  height={300}
                  src={user.image || "/cartoon.png"}
                  alt={user.name}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="absolute -top-3 -right-3 inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-content rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg z-20">
                <Zap size={14} fill="currentColor" />
                {user.category || "Premium"}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-neutral text-neutral-content rounded-2xl shadow-md">
                <Fingerprint size={20} className="text-primary animate-pulse" />
                <span className="font-bold tracking-widest text-sm uppercase">
                  আইডি: {user.user_id || user.cust_id}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-base-content uppercase tracking-tighter leading-tight italic">
                {user.name}
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                <div className="badge badge-success badge-outline py-4 px-6 font-bold uppercase tracking-widest text-[10px] gap-2">
                  <ShieldCheck size={14} /> {user.status || "Active"}
                </div>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <ThemeGlassCard
              icon={Phone}
              label="মোবাইল"
              value={user.mobile}
              type="primary"
            />
            <ThemeGlassCard
              icon={User}
              label="পিতা"
              value={user.fatherName}
              type="secondary"
            />
            <ThemeGlassCard
              icon={IdCard}
              label="এনআইডি"
              value={user.nidNumber}
              type="accent"
            />
            <ThemeGlassCard
              icon={Calendar}
              label="জন্ম তারিখ"
              value={user.dob}
              type="info"
            />
          </div>

          {/* Address Section */}
          <div className="mb-10 p-6 rounded-[2rem] border border-base-300 bg-base-200/30">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-primary/10 text-primary rounded-2xl shrink-0">
                <MapPin size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-1">
                  বর্তমান ঠিকানা
                </p>
                <p className="text-xl font-bold text-base-content italic">
                  {user.address || "ঠিকানা পাওয়া যায়নি"}
                </p>
              </div>
            </div>
          </div>

          {/* NID Preview Section */}
          <div className="bg-base-200/50 p-8 rounded-[2.5rem] border border-base-300">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="text-primary" />
              <h4 className="font-black text-lg uppercase italic tracking-tighter text-base-content">
                পরিচয়পত্র কপি
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <NIDCard side="Front" src={user.nidPdfFornt} />
              <NIDCard side="Back" src={user.nidPdfBackpart} />
            </div>
          </div>
        </div>

        {/* --- Footer --- */}
        <div className="relative z-10 p-6 bg-base-200/80 backdrop-blur-xl border-t border-base-300 shrink-0">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex gap-10">
              <div className="text-center sm:text-left">
                <p className="text-[10px] font-black uppercase opacity-50 tracking-widest mb-1">
                  জয়েনিং ডেট
                </p>
                <p className="text-lg font-black text-base-content">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("bn-BD")
                    : "N/A"}
                </p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-[10px] font-black uppercase opacity-50 tracking-widest mb-1">
                  অ্যাকাউন্ট টাইপ
                </p>
                <p className="text-lg font-black text-primary uppercase">
                  {user.category || "USER"}
                </p>
              </div>
            </div>

            <form method="dialog" className="w-full sm:w-auto">
              <button className="btn btn-neutral btn-md w-full sm:px-10 rounded-2xl font-black uppercase tracking-widest shadow-xl">
                বন্ধ করুন
              </button>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}

/**
 * Theme-based Glass Card
 */
function ThemeGlassCard({ icon: Icon, label, value, type }) {
  const colorMap = {
    primary: "text-primary bg-primary/10 border-primary/20",
    secondary: "text-secondary bg-secondary/10 border-secondary/20",
    accent: "text-accent bg-accent/10 border-accent/20",
    info: "text-info bg-info/10 border-info/20",
  };

  return (
    <div className="group relative p-4 rounded-2xl border border-base-300 bg-base-100 hover:border-primary/50 transition-all duration-300 flex items-center gap-4">
      <div
        className={`w-11 h-11 rounded-xl shrink-0 flex items-center justify-center shadow-sm ${colorMap[type]}`}
      >
        <Icon size={20} />
      </div>
      <div className="overflow-hidden">
        <p className="text-[9px] font-black opacity-50 uppercase tracking-widest mb-0.5">
          {label}
        </p>
        <p className="text-sm font-bold text-base-content truncate">
          {value || "N/A"}
        </p>
      </div>
    </div>
  );
}

/**
 * NID Image Sub-component
 */
function NIDCard({ side, src }) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] font-black opacity-50 uppercase tracking-widest ml-2">
        NID {side}
      </p>
      <div className="relative aspect-[1.6/1] rounded-2xl overflow-hidden shadow-lg border-4 border-base-100 group">
        <Image
          src={src || "https://i.ibb.co.com/mrgsh0vY/nid-placeholder.png"}
          alt={`NID ${side}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  );
}
