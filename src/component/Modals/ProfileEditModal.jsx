"use client";
import { ImageIcon, Save, X } from "lucide-react";
import React from "react";

export default function ProfileEditModal({ user, onSave }) {
  if (!user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const rawData = Object.fromEntries(formData.entries());
    const updatedData = {};
    Object.keys(rawData).forEach((key) => {
      if (rawData[key] !== user[key] && rawData[key].trim() !== "") {
        updatedData[key] = rawData[key];
      } else {
        updatedData[key] = user[key];
      }
    });
    onSave(updatedData);
  };

  return (
    <dialog
      id="edit_User_modal"
      className="modal modal-bottom sm:modal-middle  z-999"
    >
      <div className="modal-box w-11/12 max-w-2xl bg-base-100 rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-base-300">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="font-black text-2xl text-warning uppercase italic tracking-tighter">
              প্রোফাইল আপডেট
            </h3>
            <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">
              আপনার তথ্য পরিবর্তন করুন
            </p>
          </div>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost bg-base-200 hover:bg-error hover:text-base-100 transition-all">
              <X size={20} />
            </button>
          </form>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-black text-xs opacity-60 uppercase">
                  ইউজার নেম
                </span>
              </label>
              <input
                type="text"
                name="username"
                defaultValue={user?.username}
                placeholder="আপনার নাম"
                className="input input-bordered w-full rounded-2xl bg-base-200/50 border-base-300 focus:border-warning focus:outline-none font-bold"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-black text-xs opacity-60 uppercase">
                  মোবাইল নম্বর (পরিবর্তনযোগ্য নয়)
                </span>
              </label>
              <input
                type="text"
                name="mobile"
                defaultValue={user?.mobile}
                readOnly
                className="input input-bordered w-full rounded-2xl bg-base-300 opacity-60 cursor-not-allowed font-bold"
              />
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-black text-xs opacity-60 uppercase flex items-center gap-2">
                <ImageIcon size={14} /> প্রোফাইল ইমেজ লিঙ্ক (ImgBB)
              </span>
            </label>
            <input
              type="text"
              name="image"
              defaultValue={user?.image}
              placeholder="https://i.ibb.co/..."
              className="input input-bordered w-full rounded-2xl bg-base-200/50 border-base-300 focus:border-warning focus:outline-none font-medium text-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              type="submit"
              className="btn btn-warning flex-1 rounded-2xl font-black text-lg shadow-lg shadow-warning/20 gap-2 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Save size={20} /> তথ্য সেভ করুন
            </button>

            <form method="dialog" className="flex-1">
              <button className="btn btn-outline btn-ghost w-full rounded-2xl font-bold border-base-300">
                বাতিল
              </button>
            </form>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
