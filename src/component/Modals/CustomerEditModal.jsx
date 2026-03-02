"use client";
import React from "react";
import { X, Save } from "lucide-react";

export default function CustomerEditModal({ customer, onSave }) {
  if (!customer) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData.entries());
    onSave(updatedData); // মেইন পেজে ডাটা পাঠাবে
  };

  return (
    <dialog id="edit_customer_modal" className="modal">
      <div className="modal-box w-11/12 max-w-3xl bg-base-100 rounded-[2rem]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-black text-xl text-warning">তথ্য সংশোধন করুন</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost">
              <X />
            </button>
          </form>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label font-bold text-xs opacity-60">নাম</label>
            <input
              name="name"
              defaultValue={customer.name}
              className="input input-bordered rounded-xl"
              required
            />
          </div>
          <div className="form-control">
            <label className="label font-bold text-xs opacity-60">মোবাইল</label>
            <input
              name="mobile"
              defaultValue={customer.mobile}
              className="input input-bordered rounded-xl"
              required
            />
          </div>
          <div className="form-control">
            <label className="label font-bold text-xs opacity-60">
              পিতার নাম
            </label>
            <input
              name="fatherName"
              defaultValue={customer.fatherName}
              className="input input-bordered rounded-xl"
            />
          </div>
          <div className="form-control">
            <label className="label font-bold text-xs opacity-60">ঠিকানা</label>
            <input
              name="address"
              defaultValue={customer.address}
              className="input input-bordered rounded-xl"
            />
          </div>

          <div className="md:col-span-2 mt-6 flex gap-2">
            <button
              type="submit"
              className="btn btn-warning flex-1 rounded-xl font-bold"
            >
              <Save size={18} /> আপডেট করুন
            </button>
            <form method="dialog" className="flex-1">
              <button className="btn btn-outline w-full rounded-xl">
                বাতিল
              </button>
            </form>
          </div>
        </form>
      </div>
    </dialog>
  );
}
