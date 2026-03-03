"use client";
import React from "react";
import { X, User, Phone, MapPin, IdCard, Calendar } from "lucide-react";
import Image from "next/image";

export default function CustomerViewModal({ customer }) {
  if (!customer) return null;

  return (
    <dialog id="view_customer_modal" className="modal ">
      <div className="modal-box w-11/12 max-w-4xl bg-base-100 rounded-8 p-0 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-linear-to-r from-violet-500 via-indigo-600 to-purple-600 p-6 text-primary-content flex justify-between items-center">
          <h3 className="font-black  text-xl flex items-center gap-2">
            <User size={24} /> গ্রাহকের বিস্তারিত তথ্য
          </h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost">
              <X size={20} />
            </button>
          </form>
        </div>
        {/* Content */}
        <div className="px-8 pt-8 grid grid-cols-2 gap-6 items-center justify-center">
          <aside className="space-y-6">
            <DetailCard
              icon={<IdCard className="text-secondary" />}
              label="আইডি"
              value={customer.cust_id}
            />
            <DetailCard
              icon={<User className="text-secondary" />}
              label="নাম"
              value={customer.name}
            />
          </aside>
          <Image
            width={200}
            height={200}
            src={`${customer.image}`}
            alt={`${customer.name}`}
            className="bg-accent/20 rounded-2xl border-2 border-accent shadow shadow-accent/70"
          />
        </div>
        <div className="p-8 grid md:grid-cols-2 gap-4">
          <DetailCard
            icon={<IdCard className="text-secondary" />}
            label="গ্রাহক ক্যাটাগরি"
            value={`${customer.category}`}
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
          <DetailCard
            icon={<Calendar className="text-secondary" />}
            label="জন্ম তারিখ"
            value={customer.dob}
          />
          <DetailCard
            icon={<Calendar className="text-secondary" />}
            label="জন্ম তারিখ"
            value={customer.dob}
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
      <form method="dialog" className="modal-backdrop bg-primary/40">
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
        <p className="text-xs font-bold opacity-70 uppercase">{label}</p>
        <p className="font-bold text-lg text-base-content">{value || "নেই"}</p>
      </div>
    </div>
  );
}
