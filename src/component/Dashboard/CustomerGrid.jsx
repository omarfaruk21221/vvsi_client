import React from "react";
import Image from "next/image";
import { Eye, Edit, Trash2, User2Icon, Phone, MapPin } from "lucide-react";
import { FadeIn } from "../Animations/FadeIn";

export default function CustomerGrid({ customers, onEdit, onDelete, onView }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
      {customers.map((customer) => (
        <FadeIn key={customer._id}>
          <div className="bg-primary/15 rounded-[2.5rem] p-6 border border-base-300  hover:shadow-2xl hover:border-primary/30 shadow-md shadow-primary transition-all group relative overflow-hidden">
            {/* ID Badge */}
            <div className="absolute top-4 right-4">
              <span className="badge badge-primary font-black px-3 py-3 shadow-lg shadow-primary/20">
                #{customer.cust_id}
              </span>
            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="avatar shadow-xl rounded-3xl overflow-hidden ring-4 ring-base-200 mb-4 group-hover:ring-primary/10 transition-all">
                <div className="h-20 w-20 bg-base-300 flex items-center justify-center">
                  {/* মডেল অনুযায়ী image এখন details অবজেক্টের ভেতরে */}
                  {customer.details?.image ? (
                    <Image
                      src={customer.details.image}
                      alt="IMG"
                      width={80}
                      height={80}
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <User2Icon size={40} className="opacity-20 text-primary" />
                  )}
                </div>
              </div>
              <h3 className="font-black text-xl text-base-content group-hover:text-primary transition-colors line-clamp-1">
                {customer.name}
              </h3>
              {/* category এর বদলে role ব্যবহার করা হয়েছে */}
              <span
                className={`badge badge-sm font-bold uppercase mt-1 ${
                  customer.role === "হকার"
                    ? "badge-accent"
                    : customer.role === "সেলসম্যান"
                      ? "badge-info"
                      : "badge-ghost"
                }`}
              >
                {customer.role || "সাধারণ"}
              </span>
            </div>

            {/* Info Section */}
            <div className="space-y-3 mb-6 text-sm">
              {/* মোবাইল নম্বর */}
              <div className="flex items-center gap-3 text-base-content/70">
                <Phone size={14} className="text-primary" />
                <span className="font-bold">{customer.mobile}</span>
              </div>
              {/* ঠিকানা - details অবজেক্ট থেকে */}
              <div className="flex items-start gap-3 text-base-content/60">
                <MapPin size={14} className="text-secondary mt-1 shrink-0" />
                <span className="line-clamp-2">
                  {customer.details?.address || "ঠিকানা দেওয়া নেই"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center bg-primary p-2 rounded-2xl border border-primary">
              <button
                onClick={() => onView(customer)}
                className="btn btn-ghost btn-circle btn-sm text-info hover:bg-info/20"
                title="দেখুন"
              >
                <Eye size={18} />
              </button>
              <button
                onClick={() => onEdit(customer)}
                className="btn btn-ghost btn-circle btn-sm text-warning hover:bg-warning/20"
                title="এডিট"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => onDelete(customer._id)}
                className="btn btn-ghost btn-circle btn-sm text-error hover:bg-error/20"
                title="ডিলিট"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
