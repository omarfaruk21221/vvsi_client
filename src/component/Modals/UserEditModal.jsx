"use client";
import React from "react";
import Swal from "sweetalert2";
import {
  X,
  Save,
  User,
  Phone,
  MapPin,
  IdCard,
  Edit3,
  PenTool,
  Fingerprint,
} from "lucide-react";

export default function UserEditModal({ user, onSave }) {
  if (!user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const modal = document.getElementById("edit_user_modal");
    const formData = new FormData(e.target);
    const updatedFields = {};

    for (let [key, value] of formData.entries()) {
      // আগের ডাটার সাথে তুলনা করে শুধু পরিবর্তিত অংশ নেওয়া হচ্ছে
      if (value.trim() !== (user[key]?.toString() || "")) {
        updatedFields[key] = value.trim();
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      Swal.fire({
        title: "কোনো পরিবর্তন নেই!",
        text: "আপনি কোনো তথ্য পরিবর্তন করেননি।",
        icon: "info",
        target: modal,
        confirmButtonColor: "var(--fallback-p,oklch(var(--p)))",
      });
      return;
    }

    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "ইউজারের তথ্য আপডেট করা হবে!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, আপডেট করুন",
      cancelButtonText: "বাতিল",
      confirmButtonColor: "var(--fallback-p,oklch(var(--p)))",
      target: modal,
    }).then((result) => {
      if (result.isConfirmed) {
        onSave(updatedFields);
      }
    });
  };

  return (
    <dialog
      id="edit_user_modal"
      className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
    >
      <div
        key={user._id}
        className="modal-box w-11/12 max-w-2xl bg-base-100 rounded-[2.5rem] p-0 overflow-hidden shadow-2xl border border-base-300 flex flex-col max-h-[90vh]"
      >
        {/* Header - Theme Based Primary Background */}
        <div className="relative z-10 shrink-0 px-8 py-6 flex justify-between items-center bg-base-200/50 border-b border-base-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-content shadow-lg shadow-primary/20">
              <Edit3 size={24} />
            </div>
            <div>
              <h3 className="font-black text-xl md:text-2xl uppercase tracking-tighter text-base-content leading-none">
                ইউজার তথ্য সংশোধন
              </h3>
              <p className="text-[10px] font-black opacity-50 uppercase tracking-[0.2em] mt-1">
                Edit User Credentials
              </p>
            </div>
          </div>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost hover:bg-error hover:text-error-content transition-all border-none">
              <X size={20} />
            </button>
          </form>
        </div>

        {/* Form Body */}
        <div className="relative z-10 overflow-y-auto grow custom-scrollbar p-6 md:p-10">
          <form
            id="userUpdateForm"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* ID Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-neutral text-neutral-content rounded-2xl mb-4 shadow-sm">
              <Fingerprint size={16} className="text-primary animate-pulse" />
              <span className="text-xs font-black tracking-widest uppercase">
                ইউজার আইডি: {user?.user_id || user?.cust_id}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EditInput
                icon={User}
                label="ইউজারের নাম"
                name="name"
                defaultValue={user?.name}
              />
              <EditInput
                icon={Phone}
                label="মোবাইল নম্বর"
                name="mobile"
                defaultValue={user?.mobile}
              />
              <EditInput
                icon={PenTool}
                label="পিতার নাম"
                name="fatherName"
                defaultValue={user?.fatherName}
              />
              <EditInput
                icon={IdCard}
                label="এনআইডি নম্বর"
                name="nidNumber"
                defaultValue={user?.nidNumber}
              />

              <div className="md:col-span-2 space-y-2">
                <label className="flex items-center gap-2 font-black text-[11px] opacity-50 uppercase tracking-[0.2em] ml-2">
                  <MapPin size={14} className="text-primary" /> বর্তমান ও স্থায়ী
                  ঠিকানা
                </label>
                <textarea
                  name="address"
                  defaultValue={user?.address}
                  placeholder="পুরো ঠিকানা এখানে লিখুন..."
                  className="textarea textarea-bordered w-full rounded-2xl bg-base-200/50 font-bold min-h-24 p-5 focus:textarea-primary focus:outline-none transition-all text-base-content"
                ></textarea>
              </div>
            </div>
          </form>
        </div>

        {/* Action Footer */}
        <div className="p-6 md:p-8 bg-base-200/80 border-t border-base-300 flex flex-col sm:flex-row gap-4">
          <button
            form="userUpdateForm"
            type="submit"
            className="btn btn-lg flex-1 btn-primary rounded-2xl font-black uppercase shadow-xl shadow-primary/20 gap-3"
          >
            <Save size={20} /> তথ্য আপডেট করুন
          </button>
          <form method="dialog" className="flex-1">
            <button className="btn btn-lg w-full btn-ghost bg-base-300/50 hover:bg-base-300 rounded-2xl font-black uppercase tracking-widest">
              বাতিল
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

/**
 * Reusable Input Component for Edit Form
 */
function EditInput({ icon: Icon, label, name, defaultValue }) {
  return (
    <div className="form-control w-full space-y-2 group">
      <label className="flex items-center gap-2 font-black text-[11px] opacity-50 uppercase tracking-[0.3em] ml-2 group-focus-within:text-primary transition-colors">
        <Icon size={14} /> {label}
      </label>
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        autoComplete="off"
        className="input input-bordered w-full h-15 rounded-2xl bg-base-200/50 font-bold px-6 focus:input-primary focus:outline-none transition-all text-base-content border-base-300"
        required
      />
    </div>
  );
}
