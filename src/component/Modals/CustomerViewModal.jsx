"use client";
import React from "react";
import { X, User, Phone, MapPin, IdCard, Calendar } from "lucide-react";

export default function CustomerViewModal({ customer }) {
  if (!customer) return null;

  return (
    <dialog id="view_customer_modal" className="modal">
      <div className="modal-box w-11/12 max-w-2xl bg-base-100 rounded-[2rem] p-0 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-primary p-6 text-primary-content flex justify-between items-center">
          <h3 className="font-black text-xl flex items-center gap-2">
            <User size={24} /> গ্রাহকের বিস্তারিত তথ্য
          </h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost">
              <X size={20} />
            </button>
          </form>
        </div>

        {/* Content */}
        <div className="p-8 grid md:grid-cols-2 gap-6">
          <DetailCard
            icon={<IdCard className="text-secondary" />}
            label="কাস্টোমার আইডি"
            value={`#${customer.cust_id}`}
          />
          <DetailCard
            icon={<User className="text-secondary" />}
            label="নাম"
            value={customer.name}
          />
          <DetailCard
            icon={<Phone className="text-secondary" />}
            label="মোবাইল"
            value={customer.mobile}
          />
          <DetailCard
            icon={<User className="text-secondary" />}
            label="পিতার নাম"
            value={customer.fatherName}
          />
          <DetailCard
            icon={<IdCard className="text-secondary" />}
            label="এনআইডি নম্বর"
            value={customer.nidNumber}
          />
          <DetailCard
            icon={<Calendar className="text-secondary" />}
            label="জন্ম তারিখ"
            value={customer.dob}
          />
          <div className="md:col-span-2">
            <DetailCard
              icon={<MapPin className="text-secondary" />}
              label="ঠিকানা"
              value={customer.address}
            />
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop bg-black/50">
        <button>close</button>
      </form>
    </dialog>
  );
}

function DetailCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-base-200 rounded-2xl">
      <div className="p-2 bg-base-100 rounded-lg shadow-sm">{icon}</div>
      <div>
        <p className="text-[10px] font-bold opacity-50 uppercase">{label}</p>
        <p className="font-bold text-base-content">{value || "নেই"}</p>
      </div>
    </div>
  );
}
