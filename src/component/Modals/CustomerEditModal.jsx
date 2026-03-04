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

export default function CustomerEditModal({ customer, onSave }) {
  if (!customer) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const modal = document.getElementById("edit_customer_modal");
    const formData = new FormData(e.target);
    const updatedFields = {};

    Object.fromEntries(formData.entries());
    for (let [key, value] of formData.entries()) {
      if (value.trim() !== (customer[key]?.toString() || "")) {
        updatedFields[key] = value.trim();
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      Swal.fire({ title: "কোনো পরিবর্তন নেই!", icon: "info", target: modal });
      return;
    }

    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "আপডেট",
      target: modal,
    }).then((result) => {
      if (result.isConfirmed) {
        onSave(updatedFields);
      }
    });
  };

  return (
    <dialog
      id="edit_customer_modal"
      className="modal modal-bottom sm:modal-middle backdrop-blur-md"
    >
      {/* key={customer._id} ensures the form resets with new data */}
      <div
        key={customer._id}
        className="modal-box w-11/12 max-w-2xl bg-base-100 rounded-3xl p-0 overflow-hidden shadow-2xl border border-base-300 flex flex-col max-h-[90vh]"
      >
        <div className="relative z-10 shrink-0 px-6 py-5 flex justify-between items-center bg-base-100/60 border-b border-base-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-warning flex items-center justify-center text-warning-content shadow-lg shadow-warning/20">
              <Edit3 size={24} />
            </div>
            <div>
              <h3 className="font-black text-xl md:text-2xl uppercase text-base-content leading-none">
                তথ্য সংশোধন
              </h3>
              <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest mt-1">
                Update Record
              </p>
            </div>
          </div>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost">
              <X size={20} />
            </button>
          </form>
        </div>

        <div className="relative z-10 overflow-y-auto grow p-6 md:p-10">
          <form
            id="customerUpdateForm"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-base-200 rounded-xl border border-base-300 mb-6">
              <Fingerprint size={16} className="text-primary" />
              <span className="text-xs font-black opacity-60">
                ID: {customer?.cust_id}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <EditInput
                icon={User}
                label="কাস্টমারের নাম"
                name="name"
                defaultValue={customer?.name}
              />
              <EditInput
                icon={Phone}
                label="মোবাইল নম্বর"
                name="mobile"
                defaultValue={customer?.mobile}
              />
              <EditInput
                icon={PenTool}
                label="পিতার নাম"
                name="fatherName"
                defaultValue={customer?.fatherName}
              />
              <EditInput
                icon={IdCard}
                label="এনআইডি নম্বর"
                name="nidNumber"
                defaultValue={customer?.nidNumber}
              />
              <div className="md:col-span-2 space-y-2">
                <label className="flex items-center gap-2 font-black text-[11px] opacity-50 uppercase">
                  <MapPin size={14} /> ঠিকানা
                </label>
                <textarea
                  name="address"
                  defaultValue={customer?.address}
                  className="textarea textarea-bordered w-full rounded-2xl bg-base-200/50 font-bold min-h-20 p-4 focus:outline-none focus:border-warning"
                ></textarea>
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 bg-base-200/30 border-t border-base-200 flex flex-col sm:flex-row gap-4">
          <button
            form="customerUpdateForm"
            type="submit"
            className="btn btn-lg flex-1 bg-warning text-warning-content border-none rounded-2xl font-black uppercase shadow-xl shadow-warning/20"
          >
            <Save size={20} /> আপডেট সেভ করুন
          </button>
          <form method="dialog" className="flex-1">
            <button className="btn btn-lg w-full bg-base-200 border-none rounded-2xl font-black uppercase tracking-widest">
              বাতিল
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

function EditInput({ icon: Icon, label, name, defaultValue }) {
  return (
    <div className="form-control w-full space-y-2">
      <label className="flex items-center gap-2 font-black text-[11px] opacity-50 uppercase tracking-widest">
        <Icon size={14} /> {label}
      </label>
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        className="input input-bordered w-full h-14 rounded-2xl bg-base-200/50 font-bold px-5 focus:border-warning"
        required
      />
    </div>
  );
}
